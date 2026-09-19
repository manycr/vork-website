import { Resend } from "resend";
import type { AIReport, EstimatorPayload } from "./types";

function esc(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendLeadEmails(payload: EstimatorPayload, report: AIReport) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return { skipped: true };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL;
  const internalEmail = process.env.VORK_INTERNAL_EMAIL;

  const clientHtml = `
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:1.6;color:#111;max-width:680px;margin:auto;padding:32px">
      <p style="font-size:14px;color:#777;margin:0 0 32px">vork studio</p>
      <h1 style="font-size:42px;line-height:1.05;letter-spacing:-2px;font-weight:500;margin:0 0 28px">ya entendemos mejor tu proyecto.</h1>
      <p>Hola ${esc(payload.name)},</p>
      <p>${esc(report.clientSummary)}</p>

      <div style="margin:32px 0;padding:24px 0;border-top:1px solid #ddd;border-bottom:1px solid #ddd">
        <p style="margin:0 0 6px;color:#777;font-size:13px">Construcción estimada</p>
        <p style="margin:0 0 22px;font-size:20px">${esc(report.constructionRange)}</p>
        <p style="margin:0 0 6px;color:#777;font-size:13px">Servicios profesionales</p>
        <p style="margin:0 0 22px;font-size:20px">${esc(report.professionalFeesRange)}</p>
        <p style="margin:0 0 6px;color:#777;font-size:13px">Otros costos</p>
        <p style="margin:0 0 22px;font-size:16px">${esc(report.otherCosts)}</p>
        <p style="margin:0 0 6px;color:#777;font-size:13px">Inversión preliminar</p>
        <p style="margin:0 0 22px;font-size:25px">${esc(report.investmentRange)}</p>
        <p style="margin:0 0 6px;color:#777;font-size:13px">Tiempo preliminar</p>
        <p style="margin:0;font-size:18px">${esc(report.estimatedTime)}</p>
      </div>

      <p>${esc(report.clientMessage)}</p>
      <p><strong>Siguiente paso:</strong> ${esc(report.visibleNextStep)}</p>
      <p style="margin-top:32px;color:#777;font-size:12px">
        Esta lectura es preliminar y no constituye una cotización ni un presupuesto de obra.
        Los honorarios definitivos y el valor de la obra deben verificarse según el alcance contratado.
      </p>
    </div>
  `;

  await resend.emails.send({
    from,
    to: payload.email,
    subject: "Tu lectura preliminar | VORK studio",
    html: clientHtml,
  });

  if (internalEmail) {
    const internalHtml = `
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:1.6;color:#111;max-width:760px">
        <h1>Nuevo lead VORK ${esc(report.qualification)}</h1>
        <p><strong>Nombre:</strong> ${esc(payload.name)}</p>
        <p><strong>Email:</strong> ${esc(payload.email)}</p>
        <p><strong>WhatsApp:</strong> ${esc(payload.countryCode)} ${esc(payload.phone)}</p>
        <p><strong>Tipo:</strong> ${esc(payload.projectType)}</p>
        <p><strong>Zona:</strong> ${esc(payload.zone)}</p>
        <p><strong>Área:</strong> ${esc(payload.area)} m²</p>
        <p><strong>Acabados:</strong> ${esc(payload.finish)}</p>
        <p><strong>Servicio:</strong> ${esc(payload.service)}</p>
        <p><strong>Score interno:</strong> ${esc(report.leadScore)}/100</p>
        <p><strong>Clasificación:</strong> ${esc(report.qualification)}</p>
        <p><strong>Construcción:</strong> ${esc(report.constructionRange)}</p>
        <p><strong>Honorarios:</strong> ${esc(report.professionalFeesRange)}</p>
        <p><strong>Inversión preliminar:</strong> ${esc(report.investmentRange)}</p>
        <h2>Resumen interno</h2>
        <p>${esc(report.internalSummary)}</p>
        <h2>Riesgos</h2>
        <ul>${report.internalRisks.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <h2>Recomendaciones</h2>
        <ul>${report.internalRecommendations.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <h2>Notas comerciales</h2>
        <ul>${report.commercialNotes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
    `;
    await resend.emails.send({
      from,
      to: internalEmail,
      subject: `Nuevo lead VORK ${report.qualification}: ${payload.name}`,
      html: internalHtml,
    });
  }

  return { skipped: false };
}
