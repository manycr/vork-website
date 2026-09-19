import type { EstimatorPayload } from "./types";

/*
  VORK — motor económico preliminar.

  REFERENCIA DE CONSTRUCCIÓN
  ₡365.000/m² corresponde a la referencia VC03 utilizada como punto técnico
  inicial. No se presenta como una tabla oficial CFIA de precios de mercado.

  HONORARIOS
  Los porcentajes de abajo corresponden al Arancel de Servicios Profesionales
  de Consultoría para Edificaciones publicado por CFIA:
  - estudios preliminares: mínimo 0,5%
  - anteproyecto: 1% (1,5% si se contrata únicamente esa etapa)
  - planos y especificaciones: 4%
  - presupuesto por unidades de obra: 0,5%
  - programación: 1%
  - inspección: 3%
  - dirección técnica: 5%
  - administración: mínimo 12%
  Remodelaciones: mínimo 150% de la tarifa normal de cada etapa.

  VORK AI solo suma las etapas asociadas al servicio que el usuario selecciona.
*/

const VC03_REFERENCE_CRC_M2 = 365_000;

function roundTo100k(value: number) {
  return Math.round(value / 100_000) * 100_000;
}

function professionalRate(payload: EstimatorPayload) {
  switch (payload.service) {
    case "concepto":
      return 0.015; // anteproyecto contratado como única etapa
    case "planos":
      return 0.05; // anteproyecto 1% + planos 4%
    case "obra":
      return 0.03; // inspección
    case "integral":
      return 0.08; // anteproyecto 1% + planos 4% + inspección 3%
    case "renders":
      return 0; // servicio adicional, no tarifado aquí como porcentaje de obra
    default:
      return 0;
  }
}

export function estimate(payload: EstimatorPayload) {
  const area = Math.max(20, Number(payload.area) || 20);
  const isHousing = payload.projectType === "vivienda" || payload.projectType === "remodelacion";

  const constructionReference = roundTo100k(area * VC03_REFERENCE_CRC_M2);
  const constructionLow = isHousing ? roundTo100k(constructionReference * 0.9) : 0;
  const constructionHigh = isHousing ? roundTo100k(constructionReference * 1.1) : 0;

  let rate = professionalRate(payload);
  if (payload.projectType === "remodelacion") rate *= 1.5;

  const professionalLow =
    constructionLow && rate ? roundTo100k(constructionLow * rate) : 0;
  const professionalHigh =
    constructionHigh && rate ? roundTo100k(constructionHigh * rate) : 0;

  const totalLow = constructionLow + professionalLow;
  const totalHigh = constructionHigh + professionalHigh;

  let complexity: "Baja" | "Media" | "Alta" = "Media";
  let score = 55;
  const time = "por definir después de la revisión inicial";

  if (area >= 300 || payload.finish === "lujo") {
    complexity = "Alta";
    score += 20;
  } else if (area <= 90 && payload.finish === "basico") {
    complexity = "Baja";
    score -= 5;
  }

  if (payload.service === "integral" || payload.service === "planos") score += 15;
  if (payload.zone === "turistica" || payload.zone === "costera") score += 10;
  if (payload.budget === "bajo" || payload.budget === "sin_definir") score -= 15;

  score = Math.max(0, Math.min(100, score));

  return {
    constructionLow,
    constructionHigh,
    professionalLow,
    professionalHigh,
    totalLow,
    totalHigh,
    complexity,
    score,
    time,
    constructionReference,
    referenceM2: VC03_REFERENCE_CRC_M2,
    professionalRate: rate,
    isHousing,
  };
}
