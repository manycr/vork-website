"use client";

import { usePathname } from "next/navigation";
import { Contact } from "@/components/Contact";
import { ArrowIcon } from "@/components/ArrowIcon";
import { SectionNavigator } from "@/components/SectionNavigator";
import { localizePath } from "@/lib/i18nRoutes";

const PRIVATE_PATHS = ["/vork-private", "/dashboard"];

export function SiteFooter({ language }: { language: "es" | "en" }) {
  const pathname = usePathname();
  const hidden = PRIVATE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (hidden) return null;

  const localize = (href: string) => localizePath(href, language);
  const sectionLinks = [
    [language === "en" ? "home" : "inicio", localize("/")],
    ["studio", localize("/studio")],
    [language === "en" ? "investments" : "inversiones", localize("/investments")],
    [language === "en" ? "properties" : "propiedades", localize("/properties")],
    [language === "en" ? "construction" : "construcción", localize("/build")],
    [language === "en" ? "about" : "nosotros", localize("/about")],
    ["vork ai", `${localize("/")}#vork-ai`],
  ];
  const legalLinks = [
    [language === "en" ? "privacy" : "privacidad", localize("/privacy")],
    [language === "en" ? "terms and conditions" : "términos y condiciones", localize("/terms")],
    [language === "en" ? "data deletion" : "eliminación de datos", localize("/data-deletion")],
  ];

  return (
    <footer className="bg-[#101010] text-white">
      <SectionNavigator language={language} />
      <Contact language={language} />
      <div className="border-t border-white/10 px-[7vw] py-10 md:py-14">
        <div className="mx-auto max-w-[1500px] space-y-12">
          <div>
            <a href={localize("/")} className="text-2xl font-semibold lowercase tracking-[-0.055em]">
              vork<span className="font-normal">studio</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/45">
              {language === "en"
                ? "architecture, development, real estate and investment."
                : "arquitectura, desarrollo, bienes raíces e inversión."}
            </p>
            <div className="mt-6 grid gap-3 text-sm lowercase text-white/70">
              <a href="mailto:info@vorkstudio.com" className="group inline-flex w-fit items-center gap-2 transition hover:text-white">
                info@vorkstudio.com <ArrowIcon direction="up-right" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href="https://www.instagram.com/vorkstudiocr/" target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-2 transition hover:text-white">
                @vorkstudiocr <ArrowIcon direction="up-right" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <nav aria-label={language === "en" ? "Site sections" : "Secciones del sitio"}>
            <p className="mb-4 text-[11px] lowercase tracking-[.12em] text-white/35">
              {language === "en" ? "sections" : "secciones"}
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm lowercase text-white/65">
              {sectionLinks.map(([label, href]) => (
                <a key={href} href={href} className="transition hover:text-white">{label}</a>
              ))}
            </div>
          </nav>

          <nav aria-label={language === "en" ? "Legal information" : "Información legal"}>
            <p className="mb-4 text-[11px] lowercase tracking-[.12em] text-white/35">
              {language === "en" ? "legal" : "legal"}
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm lowercase text-white/65">
              {legalLinks.map(([label, href]) => (
                <a key={href} href={href} className="transition hover:text-white">{label}</a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1500px] flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11px] lowercase text-white/35">
          <p>© {new Date().getFullYear()} vork studio</p>
          <p>{language === "en" ? "Costa Rica" : "Costa Rica"}</p>
        </div>
      </div>
    </footer>
  );
}
