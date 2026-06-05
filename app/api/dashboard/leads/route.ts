import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: Request) {
  const password = request.headers.get("x-dashboard-password");

  if (!process.env.DASHBOARD_PASSWORD || password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("leads")
    .select("*, ai_reports(report)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data });
}
