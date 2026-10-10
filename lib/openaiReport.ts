import type { AIReport, EstimatorPayload } from "./types";
import { estimate } from "./scoring";

function crc(value: number) {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(value);
}

function range(low: number, high: number) {
  return low > 0 && high > 0 ? `${crc(low)} – ${crc(high)}` : "requiere revisión";
}

export async function generateProjectReport(
  payload: EstimatorPayload
): Promise<AIReport> {
  const e = estimate(payload);
  const en = payload.language === "en";

  let qualification: AIReport["qualification"] = "Medio";
  if (e.score >= 82) qualification = "Premium";
  else if (e.score >= 68) qualification = "Alto";
  else if (e.score < 42) qualification = "Bajo";

  const englishValue = (value: string) => ({ vivienda: "residential", remodelacion: "renovation", comercial: "commercial", inmobiliario: "real estate", airbnb: "tourism or rental", gam: "the greater metropolitan area", costera: "a coastal area", rural: "a rural area", turistica: "a tourism area", basico: "functional", medio: "mid-range", premium: "premium", lujo: "luxury", propio: "land already owned", compra: "land purchase in progress", busqueda: "currently looking for land", sin_definir: "land not yet defined" } as Record<string, string>)[value] || value;
  const landStatusEs = ({ propio: "ya cuentas con lote o propiedad", compra: "estás en proceso de compra del lote", busqueda: "estás buscando lote", sin_definir: "todavía no has definido el lote" } as Record<string, string>)[payload.landStatus] || "el lote está por definir";
  const landStatusEn = ({ propio: "you already own the land or property", compra: "the land purchase is in progress", busqueda: "you are currently looking for land", sin_definir: "the land has not been defined yet" } as Record<string, string>)[payload.landStatus] || "the land is still to be defined";
  const landNextStep = en
    ? ({ propio: "review the exact property location, site conditions, requirements, references and scope in an initial conversation.", compra: "review the candidate property and its technical conditions before completing the purchase, together with the project requirements and scope.", busqueda: "define the property search criteria according to the project, budget and desired location before advancing the design.", sin_definir: "define the location and property strategy together with the project requirements and scope." } as Record<string, string>)[payload.landStatus]
    : ({ propio: "revisar la ubicación exacta, condiciones del lote, programa de necesidades, referencias y alcance en una conversación inicial.", compra: "revisar el lote considerado y sus condiciones técnicas antes de completar la compra, junto con el programa y el alcance del proyecto.", busqueda: "definir criterios de búsqueda del lote según el proyecto, presupuesto y ubicación deseada antes de avanzar con el diseño.", sin_definir: "definir la estrategia de ubicación y lote junto con el programa de necesidades y el alcance del proyecto." } as Record<string, string>)[payload.landStatus];
  const constructionRange = range(e.constructionLow, e.constructionHigh);
  const professionalFeesRange =
    payload.service === "renders"
      ? (en ? "quoted based on scope" : "se cotiza según alcance")
      : range(e.professionalLow, e.professionalHigh);
  const investmentRange = range(e.totalLow, e.totalHigh);

  return {
    title: en ? "preliminary project assessment" : "lectura preliminar del proyecto",
    complexity: e.complexity,
    leadScore: e.score,
    constructionRange,
    professionalFeesRange,
    otherCosts: en ? "to be determined based on site, studies, permits and scope" : "por determinar según terreno, estudios, permisos y alcance",
    investmentRange,
    estimatedTime: en ? e.time.replace("meses", "months").replace("mes", "month") : e.time,
    clientSummary: en ? `We recorded a ${englishValue(payload.projectType)} project of approximately ${payload.area} m² in ${englishValue(payload.zone)}, with ${englishValue(payload.finish)} finishes; ${landStatusEn}.` : `Registramos un proyecto de ${payload.projectType} de aproximadamente ${payload.area} m², en ${payload.zone}, con un nivel de acabados ${payload.finish}; ${landStatusEs}.`,
    clientMessage: e.isHousing
      ? (en ? `Construction is presented as a preliminary reference based on ₡365,000/m² with a ±10% range. Professional fees are calculated separately based on the selected service and applicable CFIA fee schedule. The total does not yet include studies, permits, special site conditions or other variable costs.` : `La construcción se presenta como una referencia preliminar basada en ₡365.000/m² y un rango de ±10%. Los honorarios profesionales se calculan por separado según el servicio seleccionado y las tarifas aplicables del Arancel CFIA. El total no incluye todavía estudios, permisos, condiciones especiales del terreno ni otros costos variables.`)
      : (en ? "This project type requires a specific review before assigning construction costs. Fees and total investment will be defined once VORK confirms the scope." : "Esta tipología requiere una revisión específica antes de asignar un costo de construcción. Los honorarios y la inversión total se definirán cuando VORK confirme el alcance."),
    visibleNextStep: landNextStep,
    internalSummary: `lead ${qualification}. proyecto ${payload.projectType}, situación del lote ${payload.landStatus}, zona ${payload.zone}, ${payload.area} m², acabados ${payload.finish}, servicio ${payload.service}. referencia de construcción: ${crc(e.constructionReference)}. tasa profesional aplicada: ${(e.professionalRate * 100).toFixed(1)}%.`,
    internalRisks: [
      "la referencia económica no constituye presupuesto ni cotización.",
      "validar tipología constructiva, ubicación exacta, terreno, estudios, permisos y alcance profesional.",
      "los costos por nivel de acabado aún no usan una matriz comercial VORK.",
    ],
    internalRecommendations: [
      "confirmar el alcance profesional antes de emitir una propuesta.",
      "solicitar ubicación exacta, fotos, referencias y programa de necesidades.",
      "si el servicio real incluye dirección técnica, administración, presupuesto u otras etapas, recalcular honorarios según el Arancel CFIA aplicable.",
    ],
    commercialNotes: [
      "mantener score y clasificación exclusivamente en el panel interno.",
      "no presentar el resultado automático como presupuesto definitivo.",
    ],
    qualification,
  };
}
