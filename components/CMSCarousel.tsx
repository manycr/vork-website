"use client";

import { useEffect, useState } from "react";

type CMSItem = {
  id: string;
  type: string;
  slug: string;
  title: string;
  category?: string | null;
  summary?: string | null;
  cover_image?: string | null;
};

function getHref(item: CMSItem) {
  switch (item.type) {
    case "project":
      return `/studio/projects/${item.slug}`;
    case "visual":
      return `/studio/visuals/${item.slug}`;
    case "investment":
      return `/investments/${item.slug}`;
    default:
      return "#";
  }
}

export default function CMSCarousel({
  items,
  label,
}: {
  items: CMSItem[];
  label: string;
}) {
  const total = items?.length || 0;
  const [index, setIndex] = useState(0);

  function next() {
    if (total <= 1) return;
    setIndex((current) => (current === total - 1 ? 0 : current + 1));
  }

  function previous() {
    if (total <= 1) return;
    setIndex((current) => (current === 0 ? total - 1 : current - 1));
  }

  useEffect(() => {
    if (total <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current === total - 1 ? 0 : current + 1));
    }, 6000);

    return () => window.clearInterval(timer);
  }, [total]);

  if (!items || total === 0) {
    return (
      <p className="text-sm lowercase text-neutral-400">
        todavía no hay contenido publicado.
      </p>
    );
  }

  const cardWidth = "min(72vw, 1040px)";
  const gap = 20;
  const translate = `calc(50vw - (${cardWidth} / 2) - ${index} * (${cardWidth} + ${gap}px))`;

  return (
    <div className="relative">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div
          className="flex items-center"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${translate})`,
            transition: "transform 1500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {items.map((item, cardIndex) => {
            const isActive = cardIndex === index;

            return (
              <a
                key={item.id}
                href={getHref(item)}
                className="group relative block shrink-0 overflow-hidden rounded-[1.75rem] bg-neutral-100"
                style={{
                  width: cardWidth,
                  height: "clamp(360px, 48vw, 650px)",
                  opacity: isActive ? 1 : 0.72,
                  transform: isActive ? "scale(1)" : "scale(.97)",
                  transition:
                    "opacity 900ms ease, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-out group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: item.cover_image
                      ? `url('${item.cover_image}')`
                      : undefined,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-7 text-white md:p-10">
                  <h3 className="max-w-[760px] text-[clamp(2.2rem,4.4vw,4.8rem)] font-medium lowercase leading-[.92] tracking-[-0.06em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[13px] font-medium lowercase text-white/85">
                    {label} →
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="anterior"
              className="absolute left-[3vw] top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl text-black shadow-[0_8px_30px_rgba(0,0,0,.10)] backdrop-blur transition hover:scale-105 md:h-14 md:w-14"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="siguiente"
              className="absolute right-[3vw] top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl text-black shadow-[0_8px_30px_rgba(0,0,0,.10)] backdrop-blur transition hover:scale-105 md:h-14 md:w-14"
            >
              →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
