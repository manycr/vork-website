import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getPublishedItems } from "@/lib/cms";
import { localizePath } from "@/lib/i18nRoutes";
import { ArrowIcon } from "@/components/ArrowIcon";

export default async function InvestmentsPage() {
  const items = await getPublishedItems("investment");

  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const en = lang === "en";
  const process = en
    ? [
        ["structure", "we identify opportunities, assess feasibility and define the model for each project."],
        ["capital & partnership", "we incorporate external capital through a project-specific partnership structure, formalized with legal and financial guidance."],
        ["integrated development", "vork coordinates design, permits, construction, brand and marketing under a single direction."],
        ["operation", "once developed, we lead commercialization and the ongoing management of the project."],
      ]
    : [
        ["estructura", "identificamos oportunidades, analizamos su viabilidad y definimos el modelo de cada proyecto."],
        ["capital y sociedad", "incorporamos capital externo mediante una estructura societaria específica para el proyecto, formalizada con asesoría legal y financiera."],
        ["desarrollo integral", "vork coordina diseño, permisos, construcción, marca y marketing bajo una sola dirección."],
        ["operación", "una vez desarrollado, lideramos la comercialización y la administración continua del proyecto."],
      ];

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="px-[7vw] pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
            <div>
              <h1 className="max-w-[1050px] text-[clamp(4rem,7.2vw,8rem)] font-normal lowercase leading-[.9] tracking-[-0.065em]">
                {en
                  ? "projects where capital, design and operation work together."
                  : "proyectos donde capital, diseño y operación trabajan juntos."}
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] leading-7 text-neutral-500">
                {en
                  ? "we structure real estate investment opportunities to turn viable ideas into projects developed and managed by vork."
                  : "estructuramos oportunidades de inversión inmobiliaria para convertir ideas viables en proyectos desarrollados y administrados por vork."}
              </p>
            </div>

            <p className="max-w-md text-[16px] leading-7 text-neutral-500 lg:pb-2">
              {en
                ? "for each opportunity, we assess feasibility, define the participation structure and coordinate the process from concept through operation."
                : "para cada oportunidad, evaluamos la viabilidad, definimos la estructura de participación y coordinamos el proceso desde el concepto hasta la operación."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-[7vw] pb-24">
        <div className="mx-auto grid max-w-[1500px] gap-x-10 gap-y-12 border-y border-neutral-200 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(([title, description], index) => (
            <article key={title}>
              <p className="text-[12px] text-neutral-400">0{index + 1}</p>
              <h2 className="mt-4 text-[24px] font-normal lowercase tracking-[-0.04em]">{title}</h2>
              <p className="mt-3 text-[15px] leading-6 text-neutral-500">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-[7vw] pb-28">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="mb-10 text-[clamp(2.6rem,4vw,4.5rem)] font-normal lowercase tracking-[-0.055em]">
            {en ? "current opportunities." : "oportunidades actuales."}
          </h2>
          {items.length > 0 ? (
            <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item: any) => (
                <a
                  key={item.id || item.slug}
                  href={localizePath(`/investments/${item.slug}`, lang)}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-100">
                    <img
                      src={item.cover_image || ""}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-[26px] font-normal lowercase tracking-[-0.045em]">
                        {item.title}
                      </h3>

                      {item.price && (
                        <p className="mt-1 text-[17px] font-medium tracking-[-0.02em]">
                          {item.price}
                        </p>
                      )}

                      <p className="mt-2 text-[13px] text-neutral-400">
                        {[item.location, item.area, item.category].filter(Boolean).join(" · ")}
                      </p>
                    </div>

                    <span className="mt-2 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon className="h-5 w-5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400">{en ? "no opportunities published at the moment." : "no hay oportunidades publicadas en este momento."}</p>
          )}

          <p className="mt-16 max-w-4xl border-t border-neutral-200 pt-6 text-[12px] leading-5 text-neutral-400">
            {en
              ? "each project is assessed and structured independently. Participation is subject to feasibility studies, due diligence, legal agreements and risk assessment. The information published here does not constitute a public offering or guarantee returns."
              : "cada proyecto se analiza y estructura de forma independiente. La participación está sujeta a estudios de viabilidad, debida diligencia, acuerdos legales y evaluación de riesgos. La información publicada aquí no constituye una oferta pública ni garantiza rendimientos."}
          </p>
        </div>
      </section>

      <BackFloat href={localizePath("/", lang)} language={lang} />
    </main>
  );
}
