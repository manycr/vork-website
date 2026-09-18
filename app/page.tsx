import { Header } from "@/components/Header";
import  CMSCarousel  from "@/components/CMSCarousel";
import { Contact } from "@/components/Contact";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getPublishedItems } from "@/lib/cms";

export default async function Home() {
  const projects = await getPublishedItems("project");
  const investments = await getPublishedItems("investment");
  const visuals = await getPublishedItems("visual");

  return (
    <main className="bg-white text-[#101010]">
      <Header />

      <section
        className="relative flex min-h-screen items-center bg-cover bg-center px-[7vw] py-32 text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 54%, rgba(16,16,16,.68), rgba(16,16,16,.42) 32%, rgba(16,16,16,.08) 64%), linear-gradient(90deg, rgba(16,16,16,.52), rgba(16,16,16,.16) 58%, rgba(16,16,16,.02) 92%), url('https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=72')",
        }}
      >
        <div className="max-w-5xl">
          <p className="mb-5 text-xs font-black lowercase tracking-[0.08em] text-white/60">
            vork studio
          </p>

          <h1 className="max-w-5xl text-6xl font-black lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">
            arquitectura, visualización y desarrollo con dirección.
          </h1>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/briefing" className="button-light">
              iniciar proyecto
            </a>

            <a
              href="/studio"
              className="button-light bg-white/20 text-white"
            >
              ver studio
            </a>
          </div>
        </div>
      </section>

      <section className="px-[7vw] py-32">
        <div className="mb-20 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-xs font-black lowercase tracking-[0.08em] text-[#7a7468]">
            proyectos
          </p>

          <h2 className="max-w-4xl text-5xl font-black lowercase leading-[0.92] tracking-[-0.065em] md:text-8xl">
            el portfolio como primer argumento.
          </h2>
        </div>

        <CMSCarousel
          items={projects}
          label="ver proyecto"
        />
      </section>

      <section className="bg-[#101010] px-[7vw] py-32 text-[#f4f0e8]">
        <div className="mb-20 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-xs font-black lowercase tracking-[0.08em] text-white/45">
            vork investments
          </p>

          <div>
            <h2 className="max-w-5xl text-5xl font-black lowercase leading-[0.92] tracking-[-0.065em] md:text-8xl">
              conceptos para activar capital, tierra y visión.
            </h2>

            <p className="mt-8 max-w-2xl text-white/55">
              barn houses, casas de retiro, complejos deportivos,
              centros de salud y destinos turísticos conceptuales.
            </p>
          </div>
        </div>

        <CMSCarousel
          items={investments}
          label="ver oportunidad"
        />
      </section>

      <section className="px-[7vw] py-32">
        <div className="mb-20 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-xs font-black lowercase tracking-[0.08em] text-[#7a7468]">
            visuals
          </p>

          <h2 className="max-w-4xl text-5xl font-black lowercase leading-[0.92] tracking-[-0.065em] md:text-8xl">
            visualización como parte de vork studio.
          </h2>
        </div>

        <CMSCarousel
          items={visuals}
          label="ver visualización"
        />
      </section>

      <section className="bg-[#101010] px-[7vw] py-32 text-[#f4f0e8]">
        <div className="mb-16 max-w-4xl">
          <p className="mb-5 text-xs font-black lowercase tracking-[0.08em] text-white/45">
            vork
          </p>

          <h2 className="text-5xl font-black lowercase leading-[0.92] tracking-[-0.065em] md:text-8xl">
            una marca, cuatro líneas.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            [
              "studio",
              "arquitectura, visualización y desarrollo conceptual.",
              "/studio",
            ],
            [
              "build",
              "ejecución y construcción, próximamente.",
              "/build",
            ],
            [
              "properties",
              "bienes raíces, próximamente.",
              "/properties",
            ],
            [
              "investments",
              "oportunidades conceptuales para inversionistas.",
              "/investments",
            ],
          ].map(([title, text, href]) => (
            <a
              key={title}
              href={href}
              className="min-h-72 border-t border-white/20 py-8 transition hover:opacity-70"
            >
              <h3 className="text-4xl font-black lowercase tracking-[-0.06em]">
                vork<span className="font-light">{title}</span>
              </h3>

              <p className="mt-6 text-sm leading-relaxed text-white/50">
                {text}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-[7vw] py-32">
        <div className="grid gap-10 border-t border-black/15 pt-16 md:grid-cols-[0.55fr_1fr]">
          <p className="text-xs font-black lowercase tracking-[0.08em] text-[#7a7468]">
            vork briefing
          </p>

          <div>
            <h2 className="max-w-4xl text-5xl font-black lowercase leading-[0.92] tracking-[-0.065em] md:text-8xl">
              una forma discreta de iniciar.
            </h2>

            <p className="mt-8 max-w-2xl text-neutral-600">
              completa una lectura preliminar del proyecto. el sistema
              registra el lead y deja el análisis interno en el panel
              privado.
            </p>

            <a href="/briefing" className="button mt-8">
              iniciar briefing
            </a>
          </div>
        </div>
      </section>

      <Contact />
      <WhatsAppFloat />
    </main>
  );
}