import { Header } from "@/components/Header";
import { Estimator } from "@/components/Estimator";
import { Contact } from "@/components/Contact";
import { projects } from "@/lib/projects";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main>
      <Header />

      <section
        id="inicio"
        className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center px-[7vw] py-32 text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 54%, rgba(16,16,16,.66), rgba(16,16,16,.44) 32%, rgba(16,16,16,.08) 64%), linear-gradient(90deg, rgba(16,16,16,.48), rgba(16,16,16,.18) 50%, rgba(16,16,16,.01) 88%), url('https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90')"
        }}
      >
        <div className="reveal max-w-2xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">
            Arquitectura · Visualización · Obra · Desarrollo
          </p>
          <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.07em] md:text-8xl">
            Arquitectura clara, visual y ejecutable.
          </h1>
          <p className="mt-7 max-w-xl text-white/75">
            Diseño arquitectónico, planos constructivos, visualización 3D y acompañamiento técnico para proyectos residenciales e inmobiliarios.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a className="button" href="#estimador">Estimar mi proyecto →</a>
            <a className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/82 px-6 font-black text-black/82 backdrop-blur-xl transition hover:-translate-y-0.5" href="#servicios">Ver servicios →</a>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-[#f4f0e8] px-[7vw] py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#7d735f]">Servicios</p>
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Una firma integral para diseño, documentación, imagen y obra.
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            ["Anteproyecto arquitectónico", "Distribución, concepto formal, volumetría, fachadas, materialidad base y dirección estética."],
            ["Planos constructivos", "Documentación gráfica para obra: plantas, cortes, elevaciones, detalles, cuadros y especificaciones."],
            ["Renders y visualización 3D", "Imágenes interiores, exteriores y recorridos visuales para presentar, vender o validar decisiones."],
            ["Remodelaciones", "Diagnóstico espacial, rediseño, propuesta visual y documentación para intervenir espacios existentes."],
            ["Supervisión y visitas de obra", "Seguimiento técnico, revisión de avances, validación de criterios y acompañamiento."],
            ["Presentación inmobiliaria", "Narrativa comercial, renders, láminas, material visual y estructura de presentación para preventa."]
          ].map(([title, text], index) => (
            <article key={title} className="rounded-[1.6rem] border border-black/10 bg-white/40 p-8 shadow-sm">
              <span className="mb-14 block text-xs font-black tracking-[0.18em] text-[#7d735f]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-black tracking-[-0.04em]">{title}</h3>
              <p className="mt-3 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="clientes" className="bg-[#101010] px-[7vw] py-28 text-white">
        <div className="max-w-4xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">Para quién trabajamos</p>
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Soluciones claras según el tipo de cliente.
          </h2>
        </div>

        <div className="mt-16 grid border border-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Propietarios", "Para quienes quieren diseñar, construir o remodelar una vivienda con una dirección clara."],
            ["Desarrolladores", "Para proyectos que requieren concepto, estrategia visual, documentación y lectura comercial."],
            ["Inmobiliarias", "Para preventa, material de presentación, renders y comunicación visual."],
            ["Constructores", "Para apoyar obra, presentación técnica, visualización y validación arquitectónica."]
          ].map(([title, text]) => (
            <article key={title} className="min-h-64 border-white/10 bg-white/[0.03] p-8 sm:border-r">
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <Estimator />


      <section id="proyectos" className="bg-[#f4f0e8] px-[7vw] py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#7d735f]">Proyectos</p>
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Arquitectura clara, sobria y vendible.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-neutral-600">
            Explora proyectos, conceptos y visualizaciones preparadas para comunicar valor arquitectónico, técnico y comercial.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-[1.1fr_.9fr]">
          {projects.map((project, index) => (
            <a key={project.slug} href={`/projects/${project.slug}`} className={`group relative min-h-80 overflow-hidden rounded-[2rem] bg-cover bg-center transition duration-500 hover:-translate-y-1 ${index === 0 ? "md:row-span-2 md:min-h-[620px]" : ""}`} style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.72), rgba(0,0,0,.06)), url('${project.image}')` }}>
              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-white/60">{project.category}</p>
                <h3 className="text-2xl font-black tracking-[-0.04em]">{project.title}</h3>
                <p className="mt-2 max-w-md text-white/70">{project.description}</p>
                <span className="mt-6 inline-flex text-sm font-black text-[#f2db9c]">Ver proyecto →</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl justify-center">
          <a href="/projects" className="button-secondary">Ver todos los proyectos</a>
        </div>
      </section>


      <section className="bg-[#101010] px-[7vw] py-28 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">vork</p>
            <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              una marca, dos líneas especializadas.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <a href="/" className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 transition duration-500 hover:-translate-y-1">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">arquitectura</p>
              <h3 className="text-5xl font-black lowercase tracking-[-0.06em]">vork<span className="font-light">studio</span></h3>
              <p className="mt-6 max-w-md text-white/60">diseño arquitectónico, visualización, documentación técnica y acompañamiento de obra.</p>
            </a>

            <a href="/properties" className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 transition duration-500 hover:-translate-y-1">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">próximamente</p>
              <h3 className="text-5xl font-black lowercase tracking-[-0.06em]">vork<span className="font-light">properties</span></h3>
              <p className="mt-6 max-w-md text-white/60">bienes raíces, propiedades seleccionadas y oportunidades inmobiliarias con criterio arquitectónico.</p>
              <span className="mt-8 inline-flex text-sm font-black text-[#f2db9c]">conocer más →</span>
            </a>
          </div>
        </div>
      </section>

<Contact />

      <a
        href="https://wa.me/50600000000?text=Hola%2C%20quiero%20cotizar%20un%20proyecto%20con%20vork%20studio."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-white/80 px-5 py-3 text-sm font-black text-black shadow-2xl backdrop-blur-xl"
      >
        WhatsApp →
      </a>
    </main>
  );
}
