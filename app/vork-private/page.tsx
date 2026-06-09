"use client";
import { useState } from "react";import type { CMSItem } from "@/lib/types";
const empty={type:"project",title:"",slug:"",status:"draft",category:"",location:"",year:"",area:"",services:"",summary:"",description:"",concept:"",investment_thesis:"",price:"",featured:false,cover_image:"",gallery:""};
export default function Dashboard(){const[pw,setPw]=useState("");const[tab,setTab]=useState<"items"|"leads">("items");const[items,setItems]=useState<CMSItem[]>([]);const[leads,setLeads]=useState<any[]>([]);const[form,setForm]=useState<any>(empty);const[edit,setEdit]=useState<string|null>(null);const[err,setErr]=useState("");const headers={"x-dashboard-password":pw,"Content-Type":"application/json"};
async function loadItems(){const r=await fetch("/api/dashboard/items",{headers});const d=await r.json();if(!r.ok)return setErr(d.error);setItems(d.items)}
async function loadLeads(){const r=await fetch("/api/dashboard/leads",{headers});const d=await r.json();if(!r.ok)return setErr(d.error);setLeads(d.leads)}
async function save(){const r=await fetch(edit?`/api/dashboard/items/${edit}`:"/api/dashboard/items",{method:edit?"PATCH":"POST",headers,body:JSON.stringify(form)});const d=await r.json();if(!r.ok)return setErr(d.error);setForm(empty);setEdit(null);loadItems()}
async function del(id:string){if(!confirm("eliminar?"))return;await fetch(`/api/dashboard/items/${id}`,{method:"DELETE",headers});loadItems()}

async function uploadFile(file: File, target: "cover" | "gallery") {
  const data = new FormData();
  data.append("file", file);
  const res = await fetch("/api/dashboard/upload", {
    method: "POST",
    headers: { "x-dashboard-password": pw },
    body: data
  });
  const json = await res.json();
  if (!res.ok) return setErr(json.error || "error subiendo imagen");
  if (target === "cover") {
    setForm((current: any) => ({ ...current, cover_image: json.url }));
  } else {
    setForm((current: any) => ({
      ...current,
      gallery: current.gallery ? current.gallery + "\n" + json.url : json.url
    }));
  }
}
function e(item:CMSItem){setEdit(item.id);setForm({...item,services:item.services?.join(", ")||"",gallery:item.gallery?.join("\n")||""});scrollTo({top:0,behavior:"smooth"})}
return <main className="min-h-screen bg-[#101010] px-[7vw] py-12 text-white"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 text-xs font-black lowercase tracking-[0.08em] text-[#f2db9c]">panel privado</p><h1 className="text-5xl font-black lowercase tracking-[-0.06em] md:text-7xl">vork cms privado.</h1></div><a href="/" className="text-sm font-bold text-white/60">volver al sitio</a></div><div className="mb-8 flex max-w-2xl gap-3"><input className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none" type="password" placeholder="contraseña privada" value={pw} onChange={x=>setPw(x.target.value)}/><button className="button" onClick={()=>tab==="items"?loadItems():loadLeads()}>entrar</button></div>{err&&<p className="mb-8 text-red-300">{err}</p>}<div className="mb-8 flex gap-3"><button className={tab==="items"?"button":"button-secondary"} onClick={()=>{setTab("items");loadItems()}}>contenido</button><button className={tab==="leads"?"button":"button-secondary"} onClick={()=>{setTab("leads");loadLeads()}}>leads</button></div>{tab==="items"?<><section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"><h2 className="mb-6 text-2xl font-black lowercase">{edit?"editar":"nuevo contenido"}</h2><div className="grid gap-4 md:grid-cols-2"><Select label="tipo" v={form.type} set={v=>setForm({...form,type:v})} opts={["project","investment","property","visual"]}/><Select label="estado" v={form.status} set={v=>setForm({...form,status:v})} opts={["draft","published"]}/>{["title","slug","category","location","year","area","services","cover_image"].map(k=><Input key={k} label={k} v={form[k]||""} set={v=>setForm({...form,[k]:v})}/>) }

<label className="grid gap-2 text-sm font-bold lowercase text-white/80">
  subir imagen principal
  <input className="dark-field" type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&uploadFile(e.target.files[0],"cover")} />
</label>

{["summary","description","concept","investment_thesis","gallery"].map(k=><Textarea key={k} label={k} v={form[k]||""} set={v=>setForm({...form,[k]:v})}/>) }

<label className="grid gap-2 text-sm font-bold lowercase text-white/80">
  agregar imagen a galería
  <input className="dark-field" type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&uploadFile(e.target.files[0],"gallery")} />
</label><label className="flex items-center gap-3 text-sm font-bold lowercase text-white/80"><input type="checkbox" checked={!!form.featured} onChange={x=>setForm({...form,featured:x.target.checked})}/>destacado en home</label></div><div className="mt-6 flex gap-3"><button className="button" onClick={save}>guardar</button>{edit&&<button className="button-secondary" onClick={()=>{setEdit(null);setForm(empty)}}>cancelar</button>}</div></section><section className="grid gap-4">{items.map(item=><article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><div className="flex flex-wrap justify-between gap-6"><div><p className="mb-2 text-xs font-black lowercase tracking-[0.06em] text-[#f2db9c]">{item.type} · {item.status}</p><h3 className="text-2xl font-black lowercase">{item.title}</h3><p className="mt-2 max-w-2xl text-white/60">{item.summary}</p></div><div className="flex gap-3"><button className="button-secondary h-12" onClick={()=>e(item)}>editar</button><button className="button-secondary h-12" onClick={()=>del(item.id)}>eliminar</button></div></div></article>)}</section></>:<section className="grid gap-4">{leads.map(l=><article key={l.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h2 className="text-2xl font-black lowercase">{l.name}</h2><p className="mt-1 text-white/60">{l.email} · {l.country_code} {l.phone}</p><p className="mt-4 text-[#f2db9c]">score {l.lead_score}/100</p><p className="mt-4 text-white/70">{l.ai_summary}</p></article>)}</section>}</main>}
function Input({label,v,set}:{label:string;v:string;set:(v:string)=>void}){return <label className="grid gap-2 text-sm font-bold lowercase text-white/80">{label}<input className="dark-field" value={v} onChange={e=>set(e.target.value)}/></label>}
function Textarea({label,v,set}:{label:string;v:string;set:(v:string)=>void}){return <label className="grid gap-2 text-sm font-bold lowercase text-white/80">{label}<textarea className="dark-field min-h-32" value={v} onChange={e=>set(e.target.value)}/></label>}
function Select({label,v,set,opts}:{label:string;v:string;set:(v:string)=>void;opts:string[]}){return <label className="grid gap-2 text-sm font-bold lowercase text-white/80">{label}<select className="dark-field" value={v} onChange={e=>set(e.target.value)}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></label>}
