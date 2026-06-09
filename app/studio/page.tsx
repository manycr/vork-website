import { Header } from "@/components/Header";
import { CMSGrid } from "@/components/CMSGrid";
import { getPublishedItems } from "@/lib/cms";

export default async function StudioPage() {
  const projects = await getPublishedItems("project");
  const visuals = await getPublishedItems("visual");
  return (
    <main className="min-h-screen bg-[#f4f0e8]">
      <Header />
      <section className="px-[7vw] pb-24 pt-36">
        <a href="/" className="mb-12 inline-flex text-sm font-black lowercase text-neutral-500">← volver</a>
        <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#7a7468]">vork studio</p>
        <h1 className="max-w-5xl text-6xl font-black lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">proyectos y visualización.</h1>
      </section>
      <section className="px-[7vw] pb-32">
        <h2 className="mb-16 text-5xl font-black lowercase tracking-[-0.065em]">proyectos</h2>
        <CMSGrid items={projects} label="ver proyecto" />
      </section>
      <section className="px-[7vw] pb-32">
        <h2 className="mb-16 text-5xl font-black lowercase tracking-[-0.065em]">visuals</h2>
        <CMSGrid items={visuals} label="ver visualización" />
      </section>
    </main>
  );
}
