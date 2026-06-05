import { Resend } from "resend";
import type { AIReport, EstimatorPayload } from "./types";

export async function sendLeadEmails(payload: EstimatorPayload, report: AIReport) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return { skipped: true };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL;
  const internalEmail = process.env.VORK_INTERNAL_EMAIL;

  const clientHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;max-width:680px">
      <h1>Tu evaluación preliminar de VORK studio</h1>
      <p>Hola ${payload.name},</p>
      <p>Gracias por completar la evaluación preliminar de tu proyecto.</p>
      <h2>${report.title}</h2>
      <p><strong>Complejidad preliminar:</strong> ${report.complexity}</p>
      <p><strong>Rango preliminar de inversión:</strong> ${report.investmentRange}</p>
      <p><strong>Tiempo preliminar:</strong> ${report.estimatedTime}</p>
      <p>${report.clientSummary}</p>
      <p>${report.clientMessage}</p>
      <p><strong>Siguiente paso:</strong> ${report.visibleNextStep}</p>
      <p>Este resultado es preliminar y no sustituye una revisión técnica formal.</p>
    </div>
  `;

  await resend.emails.send({
    from,
    to: payload.email,
    subject: "Evaluación preliminar de tu proyecto | VORK studio",
    html: clientHtml
  });

  if (internalEmail) {
    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;max-width:760px">
        <h1>Nuevo lead VORK ${report.qualification}</h1>
        <p><strong>Nombre:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>WhatsApp:</strong> ${payload.countryCode || ''} ${payload.phone}</p>
        <p><strong>Tipo:</strong> ${payload.projectType}</p>
        <p><strong>Zona:</strong> ${payload.zone}</p>
        <p><strong>Área:</strong> ${payload.area} m²</p>
        <p><strong>Servicio:</strong> ${payload.service}</p>
        <p><strong>Score:</strong> ${report.leadScore}/100</p>
        <p><strong>Complejidad:</strong> ${report.complexity}</p>
        <h2>Resumen interno</h2>
        <p>${report.internalSummary}</p>
        <h2>Riesgos internos</h2>
        <ul>${report.internalRisks.map((item) => `<li>${item}</li>`).join("")}</ul>
        <h2>Recomendaciones internas</h2>
        <ul>${report.internalRecommendations.map((item) => `<li>${item}</li>`).join("")}</ul>
        <h2>Notas comerciales</h2>
        <ul>${report.commercialNotes.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
    `;

    await resend.emails.send({
      from,
      to: internalEmail,
      subject: `Nuevo lead VORK ${report.qualification}: ${payload.name}`,
      html: internalHtml
    });
  }

  return { skipped: false };
}
