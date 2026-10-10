"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";

type Props = {
  primaryButton: string;
  secondaryButton: string;
  images: string[];
  language: "es" | "en";
  titles?: string[];
  subtitle?: string;
};

const spanishTitles = [
  "arquitectura con dirección.",
  "espacios pensados para vivir.",
  "visualizar antes de construir.",
  "de la idea a la obra.",
];

const englishTitles = [
  "architecture with purpose.",
  "spaces designed for living.",
  "visualize before building.",
  "from concept to construction.",
];

export function HeroSlider({
  primaryButton,
  secondaryButton,
  images,
  language,
  titles,
  subtitle,
}: Props) {
  const slides = useMemo(
    () =>
      images
        .filter(Boolean)
        .map((image, index) => ({
          image,
          title: titles?.[index] || (language === "en" ? englishTitles : spanishTitles)[index] || (language === "en" ? englishTitles : spanishTitles)[0],
        })),
    [images, language, titles]
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  function previous() {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((current) => (current + 1) % slides.length);
  }

  if (!slides.length) return null;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-neutral-200">
      {slides.map((slide, slideIndex) => (
        <div
          key={`${slide.image}-${slideIndex}`}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1800ms] ease-out ${
            slideIndex === index
              ? "scale-100 opacity-100"
              : "scale-[1.025] opacity-0"
          }`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/48 via-black/14 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1800px] items-center px-[7vw] pb-20 pt-28">
        <div className="max-w-[900px] text-white">
          <div key={index} className="hero-copy-enter">
            <h1 className="max-w-[880px] text-[clamp(4.25rem,7.1vw,8.2rem)] font-normal lowercase leading-[0.88] tracking-[-0.067em] text-balance">
              {slides[index].title}
            </h1>

            <p className="mt-7 text-[16px] lowercase text-white/78">
              {subtitle || (language === "en" ? "architecture, visualization and development." : "arquitectura, visualización y desarrollo.")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-7">
              <a
                href="#vork-ai"
                className="group inline-flex items-center gap-3 text-[14px] lowercase"
              >
                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                {primaryButton}
              </a>
              <a
                href={language === "en" ? "/en/studio" : "/studio"}
                className="text-[14px] lowercase text-white/72 transition hover:text-white"
              >
                {secondaryButton}
              </a>
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label={language === "en" ? "previous image" : "imagen anterior"}
            onClick={previous}
            className="group absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white shadow-[0_8px_28px_rgba(0,0,0,.18)] backdrop-blur-md transition hover:border-white/60 hover:bg-white hover:text-black md:left-7"
          >
            <ArrowIcon direction="left" className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            aria-label={language === "en" ? "next image" : "imagen siguiente"}
            onClick={next}
            className="group absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white shadow-[0_8px_28px_rgba(0,0,0,.18)] backdrop-blur-md transition hover:border-white/60 hover:bg-white hover:text-black md:right-7"
          >
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="absolute bottom-7 left-[7vw] z-20 flex items-center gap-2">
            {slides.map((_, dotIndex) => (
              <button
                type="button"
                key={dotIndex}
                aria-label={`${language === "en" ? "go to image" : "ir a imagen"} ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={`h-[6px] rounded-full border border-white/80 transition-all duration-500 ${
                  dotIndex === index ? "w-7 bg-white" : "w-[6px] bg-transparent"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
