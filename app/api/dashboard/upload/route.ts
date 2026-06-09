import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  if (request.headers.get("x-dashboard-password") !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "archivo requerido" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const extension = file.name.split(".").pop() || "jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const path = `cms/${safeName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("media")
      .upload(path, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: false
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "no se pudo subir la imagen" }, { status: 500 });
  }
}
