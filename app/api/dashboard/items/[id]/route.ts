import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { slugify } from "@/lib/slug";
function auth(request: Request){return request.headers.get("x-dashboard-password")===process.env.DASHBOARD_PASSWORD}

export async function PATCH(request: Request,{params}:{params:Promise<{id:string}>}){
 if(!auth(request)) return NextResponse.json({error:"no autorizado"},{status:401});
 const {id}=await params; const body=await request.json();
 const payload={...body, slug: body.slug || slugify(body.title || "untitled"), services: body.services?String(body.services).split(",").map((x:string)=>x.trim()).filter(Boolean):[], gallery: body.gallery?String(body.gallery).split("\n").map((x:string)=>x.trim()).filter(Boolean):[], updated_at:new Date().toISOString()};
 const {data,error}=await getSupabaseAdmin().from("cms_items").update(payload).eq("id",id).select("*").single();
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({item:data});
}
export async function DELETE(request: Request,{params}:{params:Promise<{id:string}>}){
 if(!auth(request)) return NextResponse.json({error:"no autorizado"},{status:401});
 const {id}=await params; const {error}=await getSupabaseAdmin().from("cms_items").delete().eq("id",id);
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({ok:true});
}
