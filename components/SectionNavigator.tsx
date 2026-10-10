"use client";

import { usePathname } from "next/navigation";
import { ArrowIcon } from "@/components/ArrowIcon";
import { internalPathFromSpanish, localizePath } from "@/lib/i18nRoutes";

const sections = [
  { path: "/studio", es: "studio", en: "studio", esCopy: "proyectos y visualizaciones", enCopy: "projects and visualizations" },
  { path: "/investments", es: "inversiones", en: "investments", esCopy: "capital, desarrollo y operación", enCopy: "capital, development and operation" },
  { path: "/properties", es: "propiedades", en: "properties", esCopy: "inmuebles y acompañamiento", enCopy: "real estate and guidance" },
  { path: "/build", es: "construcción", en: "construction", esCopy: "coordinación y obra", enCopy: "coordination and construction" },
  { path: "/about", es: "nosotros", en: "about", esCopy: "personas y forma de trabajar", enCopy: "people and our approach" },
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
        className={`group flex min-h-[132px] flex-1 items-center gap-5 rounded-[22px] border border-white/12 bg-white/[0.035] px-6 py-6 transition duration-500 hover:border-white/30 hover:bg-white/[0.09] md:px-8 ${direction === "right" ? "justify-end text-right" : ""}`}
      >
        {direction === "left" && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white text-black transition duration-500 group-hover:-translate-x-1">
            <ArrowIcon direction="left" className="h-5 w-5" />
          </span>
        )}
        <span>
          <span className="block text-[10px] lowercase tracking-[.12em] text-white/35">{hint}</span>
          <span className="mt-2 block text-[clamp(1.45rem,2.7vw,2.8rem)] lowercase tracking-[-.045em] text-white">{label}</span>
          <span className="mt-1 block max-h-0 overflow-hidden text-xs lowercase text-white/45 opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100">{copy}</span>
        </span>
        {direction === "right" && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white text-black transition duration-500 group-hover:translate-x-1">
            <ArrowIcon className="h-5 w-5" />
          </span>
        )}
      </a>
    );
  };

  return (
    <section aria-label={language === "en" ? "Browse sections" : "Navegar por secciones"} className="px-[7vw] pb-6 pt-12">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 sm:flex-row">
        {item(previous, "left")}
        {item(next, "right")}
      </div>
    </section>
  );
}
