import { Header } from "@/components/Header";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#f4f0e8]">
      <Header />

      <section className="flex min-h-[86vh] items-end bg-cover bg-center px-[7vw] pb-20 text-white" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.72), rgba(0,0,0,.06)), url('${project.image}')` }}>
        <div className="max-w-5xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">{project.category}</p>
          <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.07em] md:text-8xl">{project.title}</h1>
          <p className="mt-8 max-w-2xl text-white/70">{project.description}</p>
        </div>
      </section>

      <section className="px-[7vw] pt-10">
        <a href="/projects" className="inline-flex text-sm font-black text-neutral-500 transition hover:text-black">← volver a proyectos</a>
      </section>

      <section className="grid gap-12 px-[7vw] py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-5 text-sm">
          <Info label="Ubicación" value={project.location} />
          <Info label="Año" value={project.year} />
          <Info label="Área" value={project.area} />
          <Info label="Servicios" value={project.services.join(", ")} />
        </div>
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#7d735f]">Concepto</p>
          <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em]">{project.concept}</h2>
        </div>
      </section>

      <section className="grid gap-6 px-[7vw] pb-28">
        {project.gallery.map((image, index) => (
          <div key={image} className={`min-h-[520px] rounded-[2rem] bg-cover bg-center ${index === 0 ? "md:min-h-[720px]" : ""}`} style={{ backgroundImage: `url('${image}')` }} />
        ))}
      </section>

      <section className="bg-[#101010] px-[7vw] py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">Siguiente paso</p>
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em]">Desarrolla un proyecto con dirección clara.</h2>
          <a href="/#estimador" className="button mt-10">Analizar mi proyecto →</a>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-black/10 pb-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7d735f]">{label}</p>
      <p className="mt-2 text-lg font-bold">{value}</p>
    </div>
  );
}
