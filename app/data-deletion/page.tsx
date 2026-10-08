import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  return {
    title: en ? "data deletion instructions" : "eliminación de datos",
    description: en
      ? "Instructions to request deletion of personal data processed by vork."
      : "Instrucciones para solicitar la eliminación de datos personales tratados por vork.",
  };
}

const copy = {
  es: {
    eyebrow: "privacidad",
    title: "eliminación de datos.",
    intro:
      "Puedes solicitar la eliminación de los datos personales que hayas proporcionado a vork mediante el sitio web, WhatsApp u otros canales digitales.",
    stepsTitle: "cómo realizar la solicitud",
    steps: [
      {
        title: "1. envía un correo",
        text: "Escribe a info@vorkstudio.com con el asunto “Solicitud de eliminación de datos”.",
      },
      {
        title: "2. identifica tu información",
        text: "Incluye tu nombre y el correo electrónico o número de WhatsApp utilizado para comunicarte con vork. No envíes contraseñas, códigos de acceso ni información financiera.",
      },
      {
        title: "3. verificación",
        text: "Podemos solicitar información adicional razonable para confirmar tu identidad y evitar la eliminación no autorizada de datos de otra persona.",
      },
      {
        title: "4. eliminación y confirmación",
        text: "Después de verificar la solicitud, eliminaremos o anonimizaremos los datos que no debamos conservar por obligaciones legales, contractuales, contables, de seguridad o para la atención de reclamaciones. Te enviaremos una confirmación cuando el proceso haya finalizado.",
      },
    ],
    noteTitle: "alcance",
    note:
      "La eliminación puede incluir datos de formularios, registros de contacto, conversaciones y preferencias guardadas por la automatización de WhatsApp. La solicitud no elimina información que se encuentre bajo el control independiente de Meta, WhatsApp u otro proveedor; para esos datos debes utilizar las herramientas de privacidad del proveedor correspondiente.",
    policy: "consultar política de privacidad",
  },
  en: {
    eyebrow: "privacy",
    title: "data deletion.",
    intro:
      "You may request deletion of personal data you provided to vork through the website, WhatsApp, or other digital channels.",
    stepsTitle: "how to submit a request",
    steps: [
      {
        title: "1. send an email",
        text: "Email info@vorkstudio.com with the subject “Data deletion request”.",
      },
      {
        title: "2. identify your information",
        text: "Include your name and the email address or WhatsApp number used to contact vork. Do not send passwords, access codes, or financial information.",
      },
      {
        title: "3. verification",
        text: "We may request reasonable additional information to confirm your identity and prevent unauthorized deletion of another person's data.",
      },
      {
        title: "4. deletion and confirmation",
        text: "After verification, we will delete or anonymize information that we are not required to retain for legal, contractual, accounting, security, or claims-related purposes. We will confirm when the process is complete.",
      },
    ],
    noteTitle: "scope",
    note:
      "Deletion may include form submissions, contact records, conversations, and preferences stored by the WhatsApp automation. This request does not delete information independently controlled by Meta, WhatsApp, or another provider; use that provider's privacy tools for such data.",
    policy: "view privacy policy",
  },
};

export default async function DataDeletionPage() {
  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const data = copy[lang];
  const policyPath = lang === "en" ? "/en/privacy" : "/privacidad";

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />
      <article className="mx-auto max-w-[1200px] px-[7vw] pb-28 pt-40 md:pb-36">
        <p className="mb-7 text-xs lowercase tracking-[.12em] text-neutral-500">
          {data.eyebrow}
        </p>
        <h1 className="max-w-[1050px] text-[clamp(3.5rem,8vw,8rem)] font-normal lowercase leading-[.92] tracking-[-.07em]">
          {data.title}
        </h1>
        <p className="mt-14 max-w-[850px] text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.55] text-neutral-700">
          {data.intro}
        </p>

        <section className="mt-20 border-y border-black/10 py-12 md:py-16">
          <h2 className="text-3xl font-normal lowercase tracking-[-.045em]">
            {data.stepsTitle}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {data.steps.map((step) => (
              <div key={step.title} className="border-t border-black/15 pt-5">
                <h3 className="text-xl font-normal lowercase">{step.title}</h3>
                <p className="mt-4 max-w-lg leading-7 text-neutral-600">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-12 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.7fr)] md:gap-14 md:py-16">
          <h2 className="text-xl font-normal lowercase">{data.noteTitle}</h2>
          <p className="max-w-2xl leading-7 text-neutral-600">{data.note}</p>
        </section>

        <div className="flex flex-wrap gap-8">
          <a
            href="mailto:info@vorkstudio.com?subject=Solicitud%20de%20eliminaci%C3%B3n%20de%20datos"
            className="inline-block border-b border-black pb-2 text-lg lowercase"
          >
            info@vorkstudio.com ↗
          </a>
          <a
            href={policyPath}
            className="inline-block border-b border-black/30 pb-2 text-lg lowercase text-neutral-500"
          >
            {data.policy} ↗
          </a>
        </div>
      </article>
      <BackFloat />
    </main>
  );
}
