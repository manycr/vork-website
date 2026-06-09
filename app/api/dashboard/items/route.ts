import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { slugify } from "@/lib/slug";

function auth(request: Request){return request.headers.get("x-dashboard-password")===process.env.DASHBOARD_PASSWORD}

export async function GET(request: Request){
 if(!auth(request)) return NextResponse.json({error:"no autorizado"},{status:401});
 const {data,error}=await getSupabaseAdmin().from("cms_items").select("*").order("created_at",{ascending:false});
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({items:data});
}

export async function POST(request: Request){
 if(!auth(request)) return NextResponse.json({error:"no autorizado"},{status:401});
 const body=await request.json();
 const payload={...body, slug: body.slug || slugify(body.title || "untitled"), services: body.services?String(body.services).split(",").map((x:string)=>x.trim()).filter(Boolean):[], gallery: body.gallery?String(body.gallery).split("\n").map((x:string)=>x.trim()).filter(Boolean):[]};
 const {data,error}=await getSupabaseAdmin().from("cms_items").insert(payload).select("*").single();
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({item:data});
}
