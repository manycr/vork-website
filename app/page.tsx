import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import CMSCarousel from "@/components/CMSCarousel";
import { Contact } from "@/components/Contact";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
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
  investments_title: "conceptos para activar capital, tierra y visión.",
  investments_text:
    "barn houses, casas de retiro, complejos deportivos, centros de salud y destinos turísticos conceptuales.",
  visuals_title: "visualización como parte de vork studio.",
  brand_title: "una marca, cuatro líneas.",
  studio_text: "arquitectura, visualización y desarrollo conceptual.",
  build_text: "ejecución y construcción, próximamente.",
  properties_text: "selección y desarrollo de oportunidades inmobiliarias.",
  investments_text_card: "oportunidades conceptuales para inversionistas.",
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

  const content = { ...defaults, ...storedContent };

  return (
    <main className="bg-white text-[#101010]">
      <Header />

      <HeroSlider
        primaryButton={content.hero_primary_button}
        secondaryButton={content.hero_secondary_button}
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
            <h2 className="section-title max-w-[850px]">{content.briefing_title}</h2>
            <p className="section-copy max-w-xl lg:pb-2">{content.briefing_text}</p>
          </div>
          <Estimator />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="section-title mb-10 max-w-[820px]">{content.projects_title}</h2>
          <CMSCarousel items={projects} label="ver proyecto" />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="section-title mb-10 max-w-[820px]">{content.visuals_title}</h2>
          <CMSCarousel items={visuals} label="ver visualización" />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <h2 className="section-title max-w-[900px]">{content.investments_title}</h2>
            <p className="section-copy max-w-xl lg:pb-1">{content.investments_text}</p>
          </div>
          <CMSCarousel items={investments} label="ver oportunidad" />
        </div>
      </section>

      <section className="px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="section-title mb-14 max-w-[800px]">{content.brand_title}</h2>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["studio", content.studio_text, "/studio"],
              ["construcción", content.build_text, "/build"],
              ["propiedades", content.properties_text, "/properties"],
              ["inversiones", content.investments_text_card, "/investments"],
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

      <footer className="bg-[#101010] text-white">
        <Contact />
      </footer>
      <WhatsAppFloat />
    </main>
  );
}
