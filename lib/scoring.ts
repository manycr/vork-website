import type { EstimatorPayload } from "./types";

export function estimate(payload: EstimatorPayload) {
  const base: Record<string, number> = { concepto: 9, planos: 14, renders: 7, integral: 23, obra: 6 };
  const finish: Record<string, number> = { basico: .85, medio: 1, premium: 1.25, lujo: 1.55 };
  const zone: Record<string, number> = { gam: 1, costera: 1.18, rural: 1.12, turistica: 1.25 };
  const low = Math.max(450, Math.round(payload.area * (base[payload.service] || 10) * (finish[payload.finish] || 1) * (zone[payload.zone] || 1)));
  const high = Math.round(low * 1.75);
  let complexity: "Baja" | "Media" | "Alta" = "Media";
  let score = 55;
  let time = "3 – 5 semanas";
  if (high > 6500 || payload.finish === "lujo") { complexity = "Alta"; score += 25; time = "6 – 10 semanas"; }
  if (payload.service === "integral" || payload.service === "planos") score += 15;
  if (payload.zone === "turistica" || payload.zone === "costera") score += 10;
  if (payload.budget === "bajo" || payload.budget === "sin_definir") score -= 15;
  score = Math.max(0, Math.min(100, score));
  return { low, high, complexity, score, time };
}
