import type { EstimatorPayload } from "./types";

export function calculateFallbackEstimate(payload: EstimatorPayload) {
  const baseByService: Record<string, number> = {
    concepto: 9,
    planos: 14,
    renders: 7,
    integral: 23,
    obra: 6
  };

  const finishFactor: Record<string, number> = {
    basico: 0.85,
    medio: 1,
    premium: 1.25,
    lujo: 1.55
  };

  const zoneFactor: Record<string, number> = {
    gam: 1,
    costera: 1.18,
    rural: 1.12,
    turistica: 1.25
  };

  const typeFactor: Record<string, number> = {
    vivienda: 1,
    remodelacion: 1.18,
    comercial: 1.22,
    inmobiliario: 1.38,
    airbnb: 1.32
  };

  const base = baseByService[payload.service] || 10;
  const low = Math.max(
    450,
    Math.round(
      payload.area *
      base *
      (finishFactor[payload.finish] || 1) *
      (zoneFactor[payload.zone] || 1) *
      (typeFactor[payload.projectType] || 1)
    )
  );
  const high = Math.round(low * 1.75);

  let complexity: "Baja" | "Media" | "Alta" = "Media";
  let time = "3 – 5 semanas";
  let leadScore = 55;

  if (high > 6500 || payload.projectType === "inmobiliario" || payload.finish === "lujo") {
    complexity = "Alta";
    time = "6 – 10 semanas";
    leadScore += 25;
  }

  if (high < 1800 && payload.service === "renders") {
    complexity = "Baja";
    time = "1 – 3 semanas";
    leadScore -= 10;
  }

  if (payload.zone === "turistica" || payload.zone === "costera") leadScore += 10;
  if (payload.service === "integral" || payload.service === "planos") leadScore += 15;
  if (payload.budget === "sin_definir" || payload.budget === "bajo") leadScore -= 15;
  if (payload.urgency === "inmediata") leadScore -= 8;

  leadScore = Math.max(0, Math.min(100, leadScore));

  return {
    low,
    high,
    complexity,
    time,
    leadScore
  };
}
