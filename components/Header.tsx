"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

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
          <a href="/investments" className="transition-opacity hover:opacity-40">inversiones</a>
          <a href="/properties" className="transition-opacity hover:opacity-40">propiedades</a>
          <a href="/build" className="transition-opacity hover:opacity-40">construcción</a>
          <a href="/#vork-ai" className="transition-opacity hover:opacity-40">vork ai</a>
        </nav>

        <a
          href="https://www.instagram.com/vorkstudiocr/"
          target="_blank"
          rel="noreferrer"
          className="text-[12px] font-medium lowercase transition-opacity hover:opacity-40"
        >
          @vorkstudiocr
        </a>
      </div>
    </header>
  );
}
