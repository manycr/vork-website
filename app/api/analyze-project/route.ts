import { NextResponse } from "next/server";
import type { EstimatorPayload } from "@/lib/types";
import { generateProjectReport } from "@/lib/openaiReport";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendLeadEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as EstimatorPayload;

    if (!payload.name || !payload.email || !payload.phone) {
      return NextResponse.json({ error: "Nombre, correo y WhatsApp son requeridos." }, { status: 400 });
    }

    const report = await generateProjectReport(payload);

    let leadId: string | null = null;

    try {
      const supabase = getSupabaseAdmin();

      const { data: lead, error: leadError } = await supabase
        .from("leads")
        .insert({
          name: payload.name,
          email: payload.email,
          phone: `${payload.countryCode || ''} ${payload.phone}`.trim(),
          project_type: payload.projectType,
          location_zone: payload.zone,
          area: payload.area,
          finish_level: payload.finish,
          service_needed: payload.service,
          goal: payload.goal,
          budget_range: payload.budget,
          urgency: payload.urgency,
          complexity: report.complexity,
          lead_score: report.leadScore,
          ai_summary: report.internalSummary
        })
        .select("id")
        .single();

      if (leadError) throw leadError;
      leadId = lead.id;

      await supabase.from("ai_reports").insert({
        lead_id: leadId,
        report
      });
    } catch (dbError) {
      console.error("Supabase error:", dbError);
    }

    try {
      await sendLeadEmails(payload, report);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ report, leadId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo generar el análisis." }, { status: 500 });
  }
}
