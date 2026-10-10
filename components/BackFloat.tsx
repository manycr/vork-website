"use client";

import { ArrowIcon } from "@/components/ArrowIcon";

export function BackFloat({ href = "/", language = "es" }: { href?: string; language?: "es" | "en" }) {
  function goBack() {
    try {
      const previous = document.referrer ? new URL(document.referrer) : null;
      if (previous?.origin === window.location.origin) {
        window.history.back();
        return;
      }
    } catch {}

    window.location.assign(href);
  }

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label={language === "en" ? "go back" : "volver"}
      title={language === "en" ? "go back" : "volver"}
      className="group fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-[0_10px_36px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-x-1 hover:border-white/20 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-black"
    >
      <ArrowIcon direction="left" className="h-5 w-5" />
    </button>
  );
}
