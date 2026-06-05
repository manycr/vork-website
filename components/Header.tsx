"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 grid h-16 grid-cols-[auto_1fr_auto] items-center gap-8 px-[7vw] transition-all duration-500 ${
        scrolled
          ? "h-14 border-b border-black/5 bg-[#f4f0e8]/72 text-black backdrop-blur-xl"
          : "bg-gradient-to-b from-black/35 to-transparent text-white"
      }`}
    >
      <a href="/" className="font-semibold tracking-tight">
        <span className="text-xl font-black lowercase">vork</span>
        <span className="text-sm font-light lowercase">studio</span>
      </a>

      <nav className="hidden justify-center gap-7 text-[0.74rem] font-semibold lowercase tracking-[-0.01em] md:flex">
        <a href="/#servicios">servicios</a>
        <a href="/projects">proyectos</a>
        <a href="/properties">properties</a>
        <a href="/#estimador">evaluación ai</a>
        <a href="/#contacto">contacto</a>
      </nav>

      <a
        href="https://www.instagram.com/vorkstudiocr/"
        target="_blank"
        rel="noreferrer"
        className="hidden text-[0.74rem] font-semibold lowercase md:block"
      >
        @vorkstudiocr
      </a>
    </header>
  );
}
