import { Header } from "@/components/Header";
import { getItemBySlug, getPublishedItems } from "@/lib/cms";
import { notFound } from "next/navigation";
export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const item = await getItemBySlug(slug); if (!item || item.type !== "project") notFound();const projects = await getPublishedItems("project");
const currentIndex = projects.findIndex((project) => project.slug === slug);
const nextProject =
  projects.length > 1
    ? projects[(currentIndex + 1) % projects.length]
    : null;
 return <main className="min-h-screen bg-white text-[#101010]"><Header/>
  <section className="flex min-h-screen items-end bg-cover bg-center px-[7vw] pb-20 text-white" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.62),rgba(0,0,0,.05)),url('${item.cover_image || ""}')` }}>
   <div className="max-w-5xl"><p className="mb-5 text-xs font-black lowercase tracking-[0.24em] text-white/60">{item.category}</p><h1 className="text-6xl font-black lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">{item.title}</h1></div>
  </section>
  <section className="px-[7vw] py-24"><a href="/studio" className="mb-14 inline-flex text-sm font-black lowercase text-neutral-500">← volver</a><div className="grid gap-16 md:grid-cols-[0.45fr_1fr]"><div className="space-y-5 text-sm"><Info label="ubicación" value={item.location || "por definir"} /><Info label="año" value={item.year || "por definir"} /><Info label="área" value={item.area || "por definir"} /><Info label="servicios" value={item.services?.join(" · ") || "por definir"} /></div><div><h2 className="text-4xl md:text-5xl max-w-4xl font-black lowercase leading-[0.95] tracking-[-0.06em]">{item.concept || item.description}</h2>{item.investment_thesis && <p className="mt-8 max-w-2xl text-neutral-600">{item.investment_thesis}</p>}</div></div></section>
  <section className="grid grid-cols-1 gap-6 px-[7vw] pb-32 md:grid-cols-2 lg:grid-cols-3">{(item.gallery || []).map((image) => <div key={image} className="aspect-square w-full rounded-[2rem] bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />)}</section>
  {nextProject && (
  <section className="px-[7vw] pb-24 pt-16">
    <p className="mb-5 text-xs font-black lowercase tracking-[0.18em] text-black/40">
      siguiente proyecto
    </p>

    <a href={`/studio/projects/${nextProject.slug}`} className="group block">
      <div
        className="aspect-[16/7] w-full rounded-[2rem] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.55), rgba(0,0,0,.05)), url('${nextProject.cover_image || ""}')`,
        }}
      >
        <div className="flex h-full items-end p-8 md:p-12">
          <h2 className="text-5xl font-black lowercase leading-[0.9] tracking-[-0.06em] text-white md:text-7xl">
            {nextProject.title} →
          </h2>
        </div>
      </div>
    </a>
  </section>
)}
 </main>
}
function Info({ label, value }: { label: string; value: string }) {return <div className="border-t border-black/15 pt-4"><p className="text-[0.68rem] font-black lowercase tracking-[0.22em] text-[#7a7468]">{label}</p><p className="mt-2 font-bold">{value}</p></div>}
