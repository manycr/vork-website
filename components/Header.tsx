"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { localizePath } from "@/lib/i18nRoutes";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const pathname = usePathname();

  useEffect(() => {
    setLanguage(pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es");
  }, [pathname]);

  const changeLanguage = (next: "es" | "en") => {
    const englishInternal = pathname === "/en" ? "/" : pathname.replace(/^\/en(?=\/)/, "");
    const spanishInternal = pathname.startsWith("/en") ? englishInternal : (() => {
      const pairs: Array<[string, string]> = [["/studio/proyectos", "/studio/projects"], ["/studio/visualizaciones", "/studio/visuals"], ["/inversiones", "/investments"], ["/propiedades", "/properties"], ["/diagnostico", "/briefing"], ["/construccion", "/build"], ["/nosotros", "/about"]];
      const match = pairs.find(([publicPath]) => pathname === publicPath || pathname.startsWith(`${publicPath}/`));
      return match ? pathname.replace(match[0], match[1]) : pathname;
    })();
    const destination = localizePath(spanishInternal, next);
    window.location.assign(`${destination}${window.location.hash}`);
  };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const localize = (href: string) => localizePath(href, language);
  const links = [
    { href: "/studio", label: "studio" },
    { href: "/investments", label: language === "es" ? "inversiones" : "investments" },
    { href: "/properties", label: language === "es" ? "propiedades" : "properties" },
    { href: "/build", label: language === "es" ? "construcción" : "construction" },
    { href: "/about", label: language === "es" ? "nosotros" : "about" },
    { href: "/#vork-ai", label: "vork ai" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[68px] transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-black/[0.06] bg-white/95 text-[#101010] shadow-[0_1px_18px_rgba(0,0,0,.025)] backdrop-blur-2xl"
          : "bg-white/55 text-[#101010] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between gap-3 px-[7vw]">
        <a href={localize("/")} className="shrink-0 text-[20px] font-semibold lowercase tracking-[-0.055em]">
          vork<span className="font-normal">studio</span>
        </a>

        <nav className="hidden items-center gap-8 text-[12px] font-medium lowercase lg:flex" aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
          {links.map((link) => (
            <a key={link.href} href={localize(link.href)} className="transition-opacity hover:opacity-40">{link.label}</a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 lg:gap-4">
          <div role="group" aria-label="language / idioma" className="relative flex h-9 shrink-0 items-center rounded-full border border-black/10 bg-black/[0.035] p-[3px] shadow-[inset_0_1px_2px_rgba(0,0,0,.035)]">
            <span aria-hidden="true" className={`pointer-events-none absolute inset-y-[3px] left-[3px] w-[43px] rounded-full bg-[#171717] shadow-[0_2px_7px_rgba(0,0,0,.15)] transition-transform duration-300 ease-out ${language === "en" ? "translate-x-[43px]" : "translate-x-0"}`} />
            {(["es", "en"] as const).map((lang) => (
              <button key={lang} type="button" lang={lang} onClick={() => changeLanguage(lang)} aria-pressed={language === lang}
                aria-label={lang === "es" ? "Cambiar a español" : "Switch to English"}
                className={`relative z-10 flex h-[29px] w-[43px] items-center justify-center rounded-full text-[10px] font-semibold tracking-[.08em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${language === lang ? "text-white" : "text-black/45 hover:text-black"}`}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="https://www.instagram.com/vorkstudiocr/" target="_blank" rel="noreferrer" className="hidden text-[12px] font-medium lowercase transition-opacity hover:opacity-40 sm:block">
            @vorkstudiocr
          </a>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 lg:hidden"
            aria-label={menuOpen ? (language === "es" ? "Cerrar menú" : "Close menu") : (language === "es" ? "Abrir menú" : "Open menu")}
            aria-controls="vork-mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="flex w-[17px] flex-col gap-[5px]" aria-hidden="true">
              <span className={`h-px w-full bg-current transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="vork-mobile-navigation"
        aria-label={language === "es" ? "Navegación móvil" : "Mobile navigation"}
        className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] flex-col overflow-y-auto border-b border-black/10 bg-white/95 px-[7vw] py-5 shadow-[0_16px_32px_rgba(0,0,0,.07)] backdrop-blur-2xl lg:hidden`}
      >
        {links.map((link) => (
          <a key={link.href} href={localize(link.href)} onClick={() => setMenuOpen(false)} className="border-b border-black/[0.07] py-4 text-[17px] font-medium lowercase tracking-[-.02em] last:border-b-0">
            {link.label}
          </a>
        ))}
        <a href="https://www.instagram.com/vorkstudiocr/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="py-4 text-[13px] lowercase text-black/60 sm:hidden">@vorkstudiocr</a>
      </nav>
    </header>
  );
}
