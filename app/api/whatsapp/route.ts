import { createHmac, timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type Language = "es" | "en";
type Stage = "await_language" | "await_area" | "handed_off";
type Area = "studio" | "investments" | "properties" | "construction";

type WebhookMessage = {
  id: string;
  from: string;
  type?: string;
  text?: { body?: string };
  interactive?: {
    button_reply?: { id?: string; title?: string };
    list_reply?: { id?: string; title?: string };
  };
};

type WebhookPayload = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: WebhookMessage[];
      };
    }>;
  }>;
};

const languageMenu = [
  "Hola, gracias por contactar a vork.",
  "",
  "Para comenzar, selecciona el idioma en el que deseas ser atendido:",
  "",
  "1. Español",
  "2. English",
].join("\n");

const areaMenus: Record<Language, string> = {
  es: [
    "¿En cuál área de vork estás interesado?",
    "",
    "1. Studio",
    "2. Inversiones",
    "3. Propiedades",
    "4. Construcción",
    "",
    "Responde únicamente con el número de la opción.",
  ].join("\n"),
  en: [
    "Which vork area are you interested in?",
    "",
    "1. Studio",
    "2. Investments",
    "3. Properties",
    "4. Construction",
    "",
    "Please reply with the number of your preferred option.",
  ].join("\n"),
};

const areaByChoice: Record<string, Area> = {
  "1": "studio",
  "2": "investments",
  "3": "properties",
  "4": "construction",
};

const areaLabels: Record<Language, Record<Area, string>> = {
  es: {
    studio: "studio",
    investments: "inversiones",
    properties: "propiedades",
    construction: "construcción",
  },
  en: {
    studio: "studio",
    investments: "investments",
    properties: "properties",
    construction: "construction",
  },
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function verifyMetaSignature(rawBody: string, signature: string | null) {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret || !signature?.startsWith("sha256=")) return false;

  const expected = `sha256=${createHmac("sha256", appSecret).update(rawBody).digest("hex")}`;
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

function extractText(message: WebhookMessage) {
  return (
    message.text?.body ||
    message.interactive?.button_reply?.id ||
    message.interactive?.button_reply?.title ||
    message.interactive?.list_reply?.id ||
    message.interactive?.list_reply?.title ||
    ""
  ).trim();
}

function normalizeChoice(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function extractMessages(payload: WebhookPayload) {
  return (payload.entry || []).flatMap((entry) =>
    (entry.changes || []).flatMap((change) => change.value?.messages || [])
  );
}

async function sendWhatsAppText(to: string, body: string) {
  const graphVersion = requiredEnv("WHATSAPP_GRAPH_VERSION");
  const phoneNumberId = requiredEnv("WHATSAPP_PHONE_NUMBER_ID");
  const accessToken = requiredEnv("WHATSAPP_ACCESS_TOKEN");

  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { preview_url: false, body },
      }),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`WhatsApp API request failed (${response.status}): ${details}`);
  }
}

async function setConversation(
  waId: string,
  stage: Stage,
  language: Language | null,
  area: Area | null
) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("whatsapp_conversations").upsert(
    {
      wa_id: waId,
      stage,
      language,
      area,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "wa_id" }
  );

  if (error) throw error;
}

async function processMessage(message: WebhookMessage) {
  if (!message.id || !message.from) return;

  const supabase = getSupabaseAdmin();
  const { error: claimError } = await supabase
    .from("whatsapp_processed_messages")
    .insert({ message_id: message.id, wa_id: message.from });

  if (claimError?.code === "23505") return;
  if (claimError) throw claimError;

  try {
    const text = normalizeChoice(extractText(message));
    const resetRequested = ["menu", "inicio", "start", "reiniciar"].includes(text);

    const { data: conversation, error: conversationError } = await supabase
      .from("whatsapp_conversations")
      .select("language, stage, updated_at")
      .eq("wa_id", message.from)
      .maybeSingle();

    if (conversationError) throw conversationError;

    const lastUpdated = conversation?.updated_at
      ? new Date(conversation.updated_at).getTime()
      : 0;
    const expiredHandoff =
      conversation?.stage === "handed_off" &&
      Date.now() - lastUpdated > 24 * 60 * 60 * 1000;

    if (!conversation || resetRequested || expiredHandoff) {
      await setConversation(message.from, "await_language", null, null);
      await sendWhatsAppText(message.from, languageMenu);
      return;
    }

    if (conversation.stage === "handed_off") return;

    if (conversation.stage === "await_language") {
      let language: Language | null = null;
      if (["1", "es", "espanol", "spanish"].includes(text)) language = "es";
      if (["2", "en", "english", "ingles"].includes(text)) language = "en";

      if (!language) {
        await sendWhatsAppText(
          message.from,
          "Por favor responde 1 para Español o 2 for English."
        );
        return;
      }

      await setConversation(message.from, "await_area", language, null);
      await sendWhatsAppText(message.from, areaMenus[language]);
      return;
    }

    const language: Language = conversation.language === "en" ? "en" : "es";
    const area = areaByChoice[text];

    if (!area) {
      await sendWhatsAppText(message.from, areaMenus[language]);
      return;
    }

    await setConversation(message.from, "handed_off", language, area);
    const label = areaLabels[language][area];
    const confirmation =
      language === "es"
        ? `Perfecto, elegiste *${label}*. Cuéntanos brevemente qué necesitas. Una persona del equipo de vork continuará contigo por aquí.`
        : `Perfect, you selected *${label}*. Please briefly tell us what you need. A member of the vork team will continue with you here.`;

    await sendWhatsAppText(message.from, confirmation);
  } catch (error) {
    await supabase
      .from("whatsapp_processed_messages")
      .delete()
      .eq("message_id", message.id);
    throw error;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token &&
    challenge &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!verifyMetaSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  try {
    for (const message of extractMessages(payload)) {
      await processMessage(message);
    }
    return Response.json({ received: true });
  } catch (error) {
    console.error("WhatsApp webhook processing failed", error);
    return Response.json({ received: false }, { status: 500 });
  }
}
