import { Header } from "@/components/Header";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8]">
      <Header />
      <section className="px-[7vw] pb-20 pt-36">
        <div className="mx-auto max-w-5xl">
          <a href="/" className="mb-10 inline-flex text-sm font-black text-neutral-500 transition hover:text-black">← volver</a>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#7d735f]">Portfolio</p>
          <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.07em] md:text-8xl">
            Proyectos, conceptos y visualizaciones.
          </h1>
          <p className="mt-8 max-w-2xl text-neutral-600">
            Una selección de trabajos y líneas de proyecto desarrolladas para comunicar valor arquitectónico, técnico y comercial.
          </p>
        </div>
      </section>

      <section className="grid gap-6 px-[7vw] pb-28 md:grid-cols-3">
        {projects.map((project) => (
          <a key={project.slug} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-[2rem] bg-white/45 shadow-sm transition duration-500 hover:-translate-y-1">
            <div className="h-[420px] bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${project.image}')` }} />
            <div className="p-7">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#7d735f]">{project.category}</p>
              <h2 className="text-3xl font-black tracking-[-0.05em]">{project.title}</h2>
              <p className="mt-3 text-neutral-600">{project.description}</p>
              <span className="mt-6 inline-flex font-black">Ver proyecto →</span>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
