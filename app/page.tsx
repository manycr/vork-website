import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import CMSCarousel from "@/components/CMSCarousel";
import { Estimator } from "@/components/Estimator";
import { getPublishedItems, getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

const defaults = {
  hero_image:
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=82",
  hero_image_2:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
  hero_image_3:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=82",
  hero_image_4:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=82",
  hero_primary_button: "iniciar proyecto",
  hero_secondary_button: "ver studio",
  projects_title: "el portfolio como primer argumento.",
  investments_title: "capital, diseño y operación en una misma dirección.",
  investments_text:
    "estructuramos proyectos inmobiliarios para integrar capital externo, desarrollo, comercialización y administración.",
  visuals_title: "visualización como parte de vork studio.",
  brand_title: "una marca, cuatro líneas.",
  studio_text: "arquitectura, visualización y desarrollo conceptual.",
  build_text: "ejecución y construcción, próximamente.",
  properties_text: "captación, promoción y acompañamiento inmobiliario de principio a fin.",
  investments_text_card: "proyectos estructurados para integrar capital externo, desarrollo y operación.",
  briefing_title: "¿qué quieres hacer?",
  briefing_text:
    "cuéntanos tu idea y recibe una lectura preliminar. es el primer paso para convertirla en un proyecto más claro.",
};

export default async function Home() {
  const [projects, investments, visuals, storedContent] = await Promise.all([
    getPublishedItems("project"),
    getPublishedItems("investment"),
    getPublishedItems("visual"),
    getSiteContent("home", "main"),
  ]);

  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const english: Record<string, string> = {
    hero_primary_button: "start a project", hero_secondary_button: "explore studio",
    projects_title: "our work speaks first.",
    investments_title: "capital, design and operation under one direction.",
    investments_text: "we structure real estate projects that integrate external capital, development, commercialization and management.",
    visuals_title: "visualization as part of vork studio.",
    brand_title: "one brand, four disciplines.",
    studio_text: "architecture, visualization and conceptual development.",
    build_text: "construction and project delivery, coming soon.",
    properties_text: "property sourcing, marketing and real estate guidance from listing to closing.",
    investments_text_card: "projects structured to integrate external capital, development and operation.",
    briefing_title: "what would you like to create?",
    briefing_text: "tell us your idea and receive an initial assessment. the first step toward a clearer project.",
  };
  const content = { ...defaults, ...storedContent };
  const t = (key: keyof typeof defaults) => lang === "en" ? (storedContent[`${key}_en`] || english[key] || content[key]) : content[key];

  return (
    <main className="bg-white text-[#101010]">
      <Header />

      <HeroSlider
        language={lang}
        titles={[1, 2, 3, 4].map((number) => storedContent[`hero_title_${number}_${lang}`] || "")}
        subtitle={storedContent[`hero_subtitle_${lang}`] || ""}
        primaryButton={t("hero_primary_button")}
        secondaryButton={t("hero_secondary_button")}
        images={[
          content.hero_image,
          content.hero_image_2,
          content.hero_image_3,
          content.hero_image_4,
        ]}
      />

      <section id="vork-ai" className="px-[7vw] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-20 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h2 className="section-title max-w-[850px]">{t("briefing_title")}</h2>
            <p className="section-copy max-w-xl lg:pb-2">{t("briefing_text")}</p>
          </div>
          <Estimator />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="section-title mb-10 max-w-[820px]">{t("projects_title")}</h2>
          <CMSCarousel items={projects} label={lang === "en" ? "view project" : "ver proyecto"} />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="section-title mb-10 max-w-[820px]">{t("visuals_title")}</h2>
          <CMSCarousel items={visuals} label={lang === "en" ? "view visualization" : "ver visualización"} />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <h2 className="section-title max-w-[900px]">{t("investments_title")}</h2>
            <p className="section-copy max-w-xl lg:pb-1">{t("investments_text")}</p>
          </div>
          <CMSCarousel items={investments} label={lang === "en" ? "view opportunity" : "ver oportunidad"} />
        </div>
      </section>

      <section className="px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="section-title mb-14 max-w-[800px]">{t("brand_title")}</h2>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["studio", t("studio_text"), "/studio"],
              [lang === "en" ? "construction" : "construcción", t("build_text"), "/build"],
              [lang === "en" ? "properties" : "propiedades", t("properties_text"), "/properties"],
              [lang === "en" ? "investments" : "inversiones", t("investments_text_card"), "/investments"],
            ].map(([title, text, href]) => (
              <a key={title} href={href} className="group block transition-opacity duration-300 hover:opacity-50">
                <h3 className="text-[clamp(1.8rem,2.6vw,2.8rem)] font-normal lowercase tracking-[-0.055em]">
                  {title}
                </h3>
                <p className="mt-4 max-w-[280px] text-[15px] leading-6 text-neutral-500">{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
