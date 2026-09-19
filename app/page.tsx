import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import CMSCarousel from "@/components/CMSCarousel";
import { Contact } from "@/components/Contact";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Estimator } from "@/components/Estimator";
import { getPublishedItems, getSiteContent } from "@/lib/cms";
import type { CSSProperties } from "react";

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

  briefing_title: "¿qué quieres hacer?",
  briefing_text:
    "cuéntanos tu idea y recibe una lectura preliminar. es el primer paso para convertirla en un proyecto más claro.",
  briefing_title_desktop: "72",
  briefing_title_mobile: "48",
  briefing_text_desktop: "16",
  briefing_text_mobile: "15",

  projects_title: "el portfolio como primer argumento.",
  projects_title_desktop: "72",
  projects_title_mobile: "48",

  visuals_title: "visualización como parte de vork studio.",
  visuals_title_desktop: "72",
  visuals_title_mobile: "48",

  investments_title: "conceptos para activar capital, tierra y visión.",
  investments_text:
    "barn houses, casas de retiro, complejos deportivos, centros de salud y destinos turísticos conceptuales.",
  investments_title_desktop: "72",
  investments_title_mobile: "48",
  investments_text_desktop: "16",
  investments_text_mobile: "15",

  brand_title: "una marca, cuatro líneas.",
  brand_title_desktop: "72",
  brand_title_mobile: "48",

  studio_title: "studio",
  studio_text: "arquitectura, visualización y desarrollo conceptual.",
  build_title: "construcción",
  build_text: "ejecución y construcción, próximamente.",
  properties_title: "propiedades",
  properties_text: "selección y desarrollo de oportunidades inmobiliarias.",
  investments_card_title: "inversiones",
  investments_text_card: "oportunidades conceptuales para inversionistas.",
  ecosystem_title_desktop: "44",
  ecosystem_title_mobile: "29",
  ecosystem_text_desktop: "15",
  ecosystem_text_mobile: "15",
};

export default async function Home() {
  const [projects, investments, visuals, storedContent] = await Promise.all([
    getPublishedItems("project"),
    getPublishedItems("investment"),
    getPublishedItems("visual"),
    getSiteContent("home", "main"),
  ]);

  const content = { ...defaults, ...storedContent };

  const responsiveStyle = (mobile: string, desktop: string) =>
    ({
      "--cms-mobile": `${Number(mobile) || 16}px`,
      "--cms-desktop": `${Number(desktop) || 16}px`,
    } as CSSProperties);

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
            <h2 className="cms-responsive-text max-w-[850px] font-normal lowercase tracking-[-0.055em]" style={responsiveStyle(content.briefing_title_mobile, content.briefing_title_desktop)}>{content.briefing_title}</h2>
            <p className="cms-responsive-text max-w-xl leading-relaxed text-neutral-500 lg:pb-2" style={responsiveStyle(content.briefing_text_mobile, content.briefing_text_desktop)}>{content.briefing_text}</p>
          </div>
          <Estimator />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="cms-responsive-text mb-10 max-w-[820px] font-normal lowercase tracking-[-0.055em]" style={responsiveStyle(content.projects_title_mobile, content.projects_title_desktop)}>{content.projects_title}</h2>
          <CMSCarousel items={projects} label="ver proyecto" />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="cms-responsive-text mb-10 max-w-[820px] font-normal lowercase tracking-[-0.055em]" style={responsiveStyle(content.visuals_title_mobile, content.visuals_title_desktop)}>{content.visuals_title}</h2>
          <CMSCarousel items={visuals} label="ver visualización" />
        </div>
      </section>

      <section className="overflow-hidden px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <h2 className="cms-responsive-text max-w-[900px] font-normal lowercase tracking-[-0.055em]" style={responsiveStyle(content.investments_title_mobile, content.investments_title_desktop)}>{content.investments_title}</h2>
            <p className="cms-responsive-text max-w-xl leading-relaxed text-neutral-500 lg:pb-1" style={responsiveStyle(content.investments_text_mobile, content.investments_text_desktop)}>{content.investments_text}</p>
          </div>
          <CMSCarousel items={investments} label="ver oportunidad" />
        </div>
      </section>

      <section className="px-[7vw] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="cms-responsive-text mb-14 max-w-[800px] font-normal lowercase tracking-[-0.055em]" style={responsiveStyle(content.brand_title_mobile, content.brand_title_desktop)}>{content.brand_title}</h2>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [content.studio_title, content.studio_text, "/studio"],
              [content.build_title, content.build_text, "/build"],
              [content.properties_title, content.properties_text, "/properties"],
              [content.investments_card_title, content.investments_text_card, "/investments"],
            ].map(([title, text, href]) => (
              <a key={title} href={href} className="group block transition-opacity duration-300 hover:opacity-50">
                <h3 className="cms-responsive-text font-normal lowercase tracking-[-0.055em]" style={responsiveStyle(content.ecosystem_title_mobile, content.ecosystem_title_desktop)}>
                  {title}
                </h3>
                <p className="cms-responsive-text mt-4 max-w-[280px] leading-6 text-neutral-500" style={responsiveStyle(content.ecosystem_text_mobile, content.ecosystem_text_desktop)}>{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#101010] text-white">
        <Contact />
      </footer>
      <WhatsAppFloat />
      <style>{`
        .cms-responsive-text { font-size: var(--cms-mobile); }
        @media (min-width: 768px) {
          .cms-responsive-text { font-size: var(--cms-desktop); }
        }
      `}</style>
    </main>
  );
}
