import OpenAI from "openai";
import type { AIReport, EstimatorPayload } from "./types";
import { calculateFallbackEstimate } from "./scoring";

export async function generateProjectReport(payload: EstimatorPayload): Promise<AIReport> {
  const fallback = calculateFallbackEstimate(payload);

  if (!process.env.OPENAI_API_KEY) {
    return fallbackReport(payload);
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
Eres consultor senior de arquitectura, desarrollo inmobiliario y captación comercial para VORK studio en Costa Rica.

Tu objetivo NO es regalar recomendaciones técnicas al cliente.
Tu objetivo es:
1. Mostrar al cliente una lectura breve, premium y controlada.
2. Guardar recomendaciones, riesgos y notas comerciales solo para VORK.
3. Calificar el lead.

Responde SOLO JSON válido:
{
  "title": string,
  "complexity": "Baja" | "Media" | "Alta",
  "leadScore": number,
  "investmentRange": string,
  "estimatedTime": string,
  "clientSummary": string,
  "clientMessage": string,
  "visibleNextStep": string,
  "internalSummary": string,
  "internalRisks": string[],
  "internalRecommendations": string[],
  "commercialNotes": string[],
  "qualification": "Bajo" | "Medio" | "Alto" | "Premium"
}

Reglas:
- La parte visible para cliente NO debe incluir recomendaciones técnicas detalladas.
- No digas exactamente qué debe resolver, cómo diseñar, qué materiales usar ni qué estrategia aplicar.
- La parte visible debe llevar a una revisión inicial.
- La parte interna sí debe incluir riesgos, oportunidades, recomendaciones de venta y lectura estratégica.
- Usa "rango preliminar de inversión", no "precio".
- No prometas precisión absoluta.
- Tono cliente: premium, breve, claro.
- Tono interno: técnico, estratégico, comercial.

Datos:
${JSON.stringify(payload, null, 2)}

Estimación matemática:
${JSON.stringify(fallback, null, 2)}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.35,
    messages: [
      { role: "system", content: "Responde únicamente JSON válido. No uses markdown." },
      { role: "user", content: prompt }
    ]
  });

  const content = response.choices[0]?.message?.content || "";
  try {
    return JSON.parse(content) as AIReport;
  } catch {
    return fallbackReport(payload);
  }
}

export function fallbackReport(payload: EstimatorPayload): AIReport {
  const estimate = calculateFallbackEstimate(payload);
  const investmentRange = `$${estimate.low.toLocaleString("en-US")} – $${estimate.high.toLocaleString("en-US")}`;

  const internalRisks: string[] = [];
  if (payload.zone === "costera") internalRisks.push("Zona costera: posible aumento de complejidad por humedad, corrosión, logística y selección de materiales.");
  if (payload.zone === "turistica") internalRisks.push("Zona turística: oportunidad comercial alta, pero mayor exigencia visual y diferenciación.");
  if (payload.finish === "lujo") internalRisks.push("Acabados lujo: requiere control de detalle, proveedores y alcance muy delimitado.");
  if (payload.urgency === "inmediata") internalRisks.push("Urgencia inmediata: validar expectativas antes de preparar propuesta.");
  if (payload.budget === "sin_definir" || payload.budget === "bajo") internalRisks.push("Presupuesto débil o indefinido: validar capacidad real de inversión.");
  if (internalRisks.length === 0) internalRisks.push("Riesgo principal: alcance poco definido antes de cotización formal.");

  let qualification: AIReport["qualification"] = "Medio";
  if (estimate.leadScore >= 82) qualification = "Premium";
  else if (estimate.leadScore >= 68) qualification = "Alto";
  else if (estimate.leadScore < 42) qualification = "Bajo";

  return {
    title: "Evaluación preliminar generada",
    complexity: estimate.complexity,
    leadScore: estimate.leadScore,
    investmentRange,
    estimatedTime: estimate.time,
    clientSummary: "La información enviada permite identificar una ruta preliminar de trabajo para el proyecto.",
    clientMessage: "Para entregar una valoración más precisa, VORK studio debe revisar el alcance, la ubicación, las referencias y la etapa actual del proyecto en una sesión inicial.",
    visibleNextStep: "Agendar una revisión inicial con VORK studio.",
    internalSummary: `Lead ${qualification}. Proyecto ${payload.projectType}, zona ${payload.zone}, ${payload.area} m², acabados ${payload.finish}, servicio ${payload.service}. Validar alcance, presupuesto, urgencia y oportunidad comercial antes de cotizar.`,
    internalRisks,
    internalRecommendations: [
      "No enviar recomendaciones técnicas completas antes de reunión.",
      "Solicitar ubicación exacta, fotos, referencias, estado actual y alcance esperado.",
      "Usar la revisión inicial para detectar ticket real, urgencia y capacidad de inversión.",
      "Preparar propuesta por etapas si el alcance aún está poco definido."
    ],
    commercialNotes: [
      payload.service === "integral" ? "Servicio integral: oportunidad de ticket alto." : "Evaluar posibilidad de ampliar el alcance hacia paquete integral.",
      payload.zone === "turistica" || payload.zone === "costera" ? "Zona con potencial para narrativa visual e inmobiliaria." : "Proyecto puede venderse desde claridad técnica y control de proceso.",
      payload.finish === "lujo" || payload.finish === "premium" ? "Cliente sensible a imagen, detalle y experiencia premium." : "Validar si el cliente prioriza precio o proceso."
    ],
    qualification
  };
}
