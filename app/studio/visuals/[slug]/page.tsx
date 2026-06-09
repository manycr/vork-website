import { Header } from "@/components/Header";
import { getItemBySlug } from "@/lib/cms";
import { notFound } from "next/navigation";
export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const item = await getItemBySlug(slug); if (!item || item.type !== "visual") notFound();
 return <main className="min-h-screen bg-#101010 text-#f4f0e8"><Header/>
  <section className="flex min-h-screen items-end bg-cover bg-center px-[7vw] pb-20 text-white" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.62),rgba(0,0,0,.05)),url('${item.cover_image || ""}')` }}>
   <div className="max-w-5xl"><p className="mb-5 text-xs font-black lowercase tracking-[0.24em] text-white/60">{item.category}</p><h1 className="text-6xl font-black lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">{item.title}</h1></div>
  </section>
  <section className="px-[7vw] py-24"><a href="/studio" className="mb-14 inline-flex text-sm font-black lowercase text-white/50">← volver</a><div className="grid gap-16 md:grid-cols-[0.45fr_1fr]"><div className="space-y-5 text-sm"><Info label="ubicación" value={item.location || "por definir"} /><Info label="año" value={item.year || "por definir"} /><Info label="área" value={item.area || "por definir"} /><Info label="servicios" value={item.services?.join(", ") || "por definir"} /></div><div><h2 className="text-5xl font-black lowercase leading-[0.95] tracking-[-0.06em]">{item.concept || item.description}</h2>{item.investment_thesis && <p className="mt-8 max-w-2xl text-neutral-600">{item.investment_thesis}</p>}</div></div></section>
  <section className="grid gap-6 px-[7vw] pb-32">{(item.gallery || []).map((image) => <div key={image} className="min-h-[680px] bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />)}</section>
 </main>
}
function Info({ label, value }: { label: string; value: string }) {return <div className="border-t border-black/15 pt-4"><p className="text-[0.68rem] font-black lowercase tracking-[0.22em] text-[#7a7468]">{label}</p><p className="mt-2 font-bold">{value}</p></div>}
