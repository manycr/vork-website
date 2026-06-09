import type { CMSItem } from "@/lib/types";
function hrefFor(item: CMSItem){
 if(item.type==="visual") return `/studio/visuals/${item.slug}`;
 if(item.type==="project") return `/studio/projects/${item.slug}`;
 if(item.type==="property") return `/properties`;
 return `/${item.type}s/${item.slug}`;
}
export function CMSGrid({items,label="ver más"}:{items:CMSItem[];label?:string}){
 return <div className="grid gap-x-6 gap-y-16 md:grid-cols-3">
  {items.map((item,index)=><a key={item.id} href={hrefFor(item)} className={`group block ${index===0?"md:col-span-2":""}`}>
   <div className={`bg-cover bg-center transition duration-700 group-hover:scale-[.985] ${index===0?"min-h-[680px]":"min-h-[420px]"}`} style={{backgroundImage:`url('${item.cover_image||""}')`}}/>
   <div className="mt-5 grid gap-2"><p className="text-[0.68rem] font-black lowercase tracking-[0.08em] text-[#7a7468]">{item.category||item.type}</p><h2 className="text-3xl font-black lowercase tracking-[-0.055em]">{item.title}</h2><p className="max-w-xl text-sm leading-relaxed text-neutral-600">{item.summary}</p><span className="mt-3 text-sm font-black lowercase">{label} →</span></div>
  </a>)}
 </div>
}
