"use client";

import { usePathname } from "next/navigation";
import { ArrowIcon } from "@/components/ArrowIcon";
import { internalPathFromSpanish, localizePath } from "@/lib/i18nRoutes";

const sections = [
  { path: "/studio", es: "studio", en: "studio", esCopy: "proyectos y visualizaciones", enCopy: "projects and visualizations", image: "/generated/studio-project.svg" },
  { path: "/investments", es: "inversiones", en: "investments", esCopy: "capital, desarrollo y operación", enCopy: "capital, development and operation", image: "/generated/investment-tennis-complex.svg" },
  { path: "/properties", es: "propiedades", en: "properties", esCopy: "inmuebles y acompañamiento", enCopy: "real estate and guidance", image: "/generated/investment-retreat-house.svg" },
  { path: "/build", es: "construcción", en: "construction", esCopy: "coordinación y obra", enCopy: "coordination and construction", image: "/generated/investment-barn-house.svg" },
  { path: "/about", es: "nosotros", en: "about", esCopy: "personas y forma de trabajar", enCopy: "people and our approach", image: "/generated/studio-visual.svg" },
];

export function SectionNavigator({ language }: { language: "es" | "en" }) {
  const pathname = usePathname();
  const withoutLanguage = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const internalPath = internalPathFromSpanish(withoutLanguage);
  const currentIndex = sections.findIndex(
    ({ path }) => internalPath === path || internalPath.startsWith(`${path}/`)
  );

  if (currentIndex < 0) return null;

  const previous = sections[(currentIndex - 1 + sections.length) % sections.length];
  const next = sections[(currentIndex + 1) % sections.length];

  const item = (
    section: (typeof sections)[number],
    direction: "left" | "right"
  ) => {
    const label = language === "en" ? section.en : section.es;
    const copy = language === "en" ? section.enCopy : section.esCopy;
    const hint = language === "en"
      ? direction === "left" ? "previous section" : "next section"
      : direction === "left" ? "sección anterior" : "siguiente sección";

    return (
      <a
        href={localizePath(section.path, language)}
        aria-label={`${hint}: ${label}`}
        className={`group relative flex h-14 w-14 items-center overflow-hidden rounded-full border border-white/20 bg-white text-black shadow-[0_10px_35px_rgba(0,0,0,.2)] transition-[width,background-color,border-color] duration-500 hover:border-white/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:hover:w-[310px] sm:focus:w-[310px] ${direction === "right" ? "ml-auto flex-row-reverse text-right" : ""}`}
      >
        <span className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center bg-white text-black">
          <ArrowIcon direction={direction} className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
        </span>
        <span className="relative z-20 min-w-[205px] px-4 pl-2 pr-4 opacity-0 transition-opacity delay-0 duration-200 group-hover:delay-200 group-hover:opacity-100 group-focus:delay-200 group-focus:opacity-100">
          <span className="block text-[9px] lowercase tracking-[.12em] text-white/55">{hint}</span>
          <span className="mt-0.5 block text-lg lowercase tracking-[-.04em] text-white">{label}</span>
          <span className="block text-[10px] lowercase text-white/60">{copy}</span>
        </span>
        <img src={section.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" />
        <span className="absolute inset-0 bg-black/65 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" />
      </a>
    );
  };

  return (
    <section aria-label={language === "en" ? "Browse sections" : "Navegar por secciones"} className="px-[3vw] py-7">
      <div className="mx-auto grid max-w-[1700px] grid-cols-2 items-center gap-6">
        {item(previous, "left")}
        {item(next, "right")}
      </div>
    </section>
  );
}
