import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: Request){
 if(request.headers.get("x-dashboard-password")!==process.env.DASHBOARD_PASSWORD) return NextResponse.json({error:"no autorizado"},{status:401});
 const {data,error}=await getSupabaseAdmin().from("leads").select("*").order("created_at",{ascending:false}).limit(100);
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({leads:data});
}
