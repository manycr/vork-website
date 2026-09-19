import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

function auth(request: Request) {
  return request.headers.get("x-dashboard-password") === process.env.DASHBOARD_PASSWORD;
}

export async function GET(request: Request) {
  if (!auth(request)) return NextResponse.json({ error: "no autorizado" }, { status: 401 });

  const { data, error } = await getSupabaseAdmin()
    .from("site_content")
    .select("content")
    .eq("page", "home")
    .eq("section", "main")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ content: data?.content || {} });
}

export async function PATCH(request: Request) {
  if (!auth(request)) return NextResponse.json({ error: "no autorizado" }, { status: 401 });

  const body = await request.json();
  const content = body?.content;
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return NextResponse.json({ error: "contenido inválido" }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("site_content")
    .upsert(
      { page: "home", section: "main", content, updated_at: new Date().toISOString() },
      { onConflict: "page,section" }
    )
    .select("content")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ content: data?.content || content });
}
