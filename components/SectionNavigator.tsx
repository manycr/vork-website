"use client";

import { usePathname } from "next/navigation";
import { ArrowIcon } from "@/components/ArrowIcon";
import { internalPathFromSpanish, localizePath } from "@/lib/i18nRoutes";

const sections = [
  { path: "/studio", es: "studio", en: "studio" },
  { path: "/investments", es: "inversiones", en: "investments" },
  { path: "/properties", es: "propiedades", en: "properties" },
  { path: "/build", es: "construcción", en: "construction" },
  { path: "/about", es: "nosotros", en: "about" },
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
    const hint = language === "en"
      ? direction === "left" ? "previous section" : "next section"
      : direction === "left" ? "sección anterior" : "siguiente sección";

    return (
      <a
        href={localizePath(section.path, language)}
        aria-label={`${hint}: ${label}`}
        className={`group relative flex h-14 w-14 items-center overflow-hidden rounded-full border border-white/20 bg-white text-black shadow-[0_10px_35px_rgba(0,0,0,.2)] transition-[width,background-color,border-color] duration-500 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:hover:w-[190px] sm:focus:w-[190px] ${direction === "right" ? "ml-auto flex-row-reverse text-right" : ""}`}
      >
        <span className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center bg-white text-black">
          <ArrowIcon direction={direction} className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
        </span>
        <span className="relative z-20 min-w-[120px] px-4 opacity-0 transition-opacity delay-0 duration-200 group-hover:delay-200 group-hover:opacity-100 group-focus:delay-200 group-focus:opacity-100">
          <span className="block whitespace-nowrap text-[15px] lowercase tracking-[-.025em] text-black">{label}</span>
        </span>
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
