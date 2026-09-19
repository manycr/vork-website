import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { generateProjectReport } from "@/lib/openaiReport";
import { sendLeadEmails } from "@/lib/email";
import type { EstimatorPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as EstimatorPayload;

    if (!payload.name?.trim() || !payload.email?.trim()) {
      return NextResponse.json(
        { error: "nombre y correo son requeridos" },
        { status: 400 }
      );
    }

    const report = await generateProjectReport(payload);
    const supabase = getSupabaseAdmin();

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        country_code: payload.countryCode,
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
        ai_summary: report.internalSummary,
      })
      .select("id")
      .single();

    if (error) throw error;

    await supabase.from("ai_reports").insert({
      lead_id: lead.id,
      report,
    });

    try {
      await sendLeadEmails(payload, report);
    } catch (emailError) {
      console.error("No se pudo enviar el correo del lead:", emailError);
    }

    const publicReport = {
      title: report.title,
      complexity: report.complexity,
      constructionRange: report.constructionRange,
      professionalFeesRange: report.professionalFeesRange,
      otherCosts: report.otherCosts,
      investmentRange: report.investmentRange,
      estimatedTime: report.estimatedTime,
      clientSummary: report.clientSummary,
      clientMessage: report.clientMessage,
      visibleNextStep: report.visibleNextStep,
    };

    return NextResponse.json({ report: publicReport, leadId: lead.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "no se pudo procesar el proyecto" },
      { status: 500 }
    );
  }
}
