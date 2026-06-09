import type { AIReport, EstimatorPayload } from "./types";
import { estimate } from "./scoring";

export async function generateProjectReport(payload: EstimatorPayload): Promise<AIReport> {
  const e = estimate(payload);
  let qualification: AIReport["qualification"] = "Medio";
  if (e.score >= 82) qualification = "Premium";
  else if (e.score >= 68) qualification = "Alto";
  else if (e.score < 42) qualification = "Bajo";

  return {
    title: "evaluación preliminar generada",
    complexity: e.complexity,
    leadScore: e.score,
    investmentRange: `$${e.low.toLocaleString("en-US")} – $${e.high.toLocaleString("en-US")}`,
    estimatedTime: e.time,
    clientSummary: "la información enviada permite identificar una ruta preliminar de trabajo.",
    clientMessage: "para una valoración precisa, vork studio debe revisar alcance, ubicación, referencias y etapa actual en una sesión inicial.",
    visibleNextStep: "agendar una revisión inicial con vork studio.",
    internalSummary: `lead ${qualification}. proyecto ${payload.projectType}, zona ${payload.zone}, ${payload.area} m², acabados ${payload.finish}, servicio ${payload.service}.`,
    internalRisks: ["validar alcance real, presupuesto, urgencia y capacidad de inversión antes de cotizar."],
    internalRecommendations: ["no enviar recomendaciones técnicas completas antes de reunión.", "solicitar ubicación exacta, fotos, referencias y alcance esperado."],
    commercialNotes: ["evaluar posibilidad de ampliar hacia paquete integral.", "priorizar revisión inicial antes de propuesta formal."],
    qualification
  };
}
