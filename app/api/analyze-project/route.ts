import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { generateProjectReport } from "@/lib/openaiReport";
import type { EstimatorPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as EstimatorPayload;
    const report = await generateProjectReport(payload);
    const supabase = getSupabaseAdmin();
    const { data: lead, error } = await supabase.from("leads").insert({
      name: payload.name, email: payload.email, phone: payload.phone, country_code: payload.countryCode,
      project_type: payload.projectType, location_zone: payload.zone, area: payload.area, finish_level: payload.finish,
      service_needed: payload.service, goal: payload.goal, budget_range: payload.budget, urgency: payload.urgency,
      complexity: report.complexity, lead_score: report.leadScore, ai_summary: report.internalSummary
    }).select("id").single();
    if (error) throw error;
    await supabase.from("ai_reports").insert({ lead_id: lead.id, report });
    return NextResponse.json({ report, leadId: lead.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "no se pudo guardar" }, { status: 500 });
  }
}
