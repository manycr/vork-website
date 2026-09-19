"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");
  useEffect(() => { setLanguage(document.cookie.includes("vork_lang=en") ? "en" : "es"); }, []);
  const changeLanguage = (next: "es" | "en") => { document.cookie = `vork_lang=${next};path=/;max-age=31536000;samesite=lax`; setLanguage(next); window.location.reload(); };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[68px] transition-all duration-500 ${
        scrolled
          ? "border-b border-black/[0.06] bg-white/82 text-[#101010] shadow-[0_1px_18px_rgba(0,0,0,.025)] backdrop-blur-2xl"
          : "bg-white/55 text-[#101010] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between px-[7vw]">
        <a href="/" className="shrink-0 text-[20px] font-semibold lowercase tracking-[-0.055em]">
          vork<span className="font-normal">studio</span>
        </a>

        <nav className="hidden items-center gap-8 text-[12px] font-medium lowercase lg:flex">
          <a href="/studio" className="transition-opacity hover:opacity-40">studio</a>
          <a href="/investments" className="transition-opacity hover:opacity-40">{language === "es" ? "inversiones" : "investments"}</a>
          <a href="/properties" className="transition-opacity hover:opacity-40">{language === "es" ? "propiedades" : "properties"}</a>
          <a href="/build" className="transition-opacity hover:opacity-40">{language === "es" ? "construcción" : "construction"}</a>
          <a href="/about" className="transition-opacity hover:opacity-40">{language === "es" ? "nosotros" : "about"}</a>
          <a href="/#vork-ai" className="transition-opacity hover:opacity-40">vork ai</a>
        </nav>

        <div className="flex items-center gap-4">
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
        <a
          href="https://www.instagram.com/vorkstudiocr/"
          target="_blank"
          rel="noreferrer"
          className="text-[12px] font-medium lowercase transition-opacity hover:opacity-40"
        >
          @vorkstudiocr
        </a>
        </div>
      </div>
    </header>
  );
}
