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

  // Índice real: 0, 1, 2, 3...
  const [index, setIndex] = useState(0);

  function next() {
    if (total <= 1) return;

    setIndex((current) => {
      return current === total - 1 ? 0 : current + 1;
    });
  }

  function previous() {
    if (total <= 1) return;

    setIndex((current) => {
      return current === 0 ? total - 1 : current - 1;
    });
  }

  useEffect(() => {
    if (total <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => {
        return current === total - 1 ? 0 : current + 1;
      });
    }, 5500);

    return () => window.clearInterval(timer);
  }, [total]);

  if (!items || total === 0) {
    return (
      <p className="text-sm lowercase opacity-40">
        todavía no hay contenido publicado.
      </p>
    );
  }

  const cardWidth = "62vw";
  const gap = 24;

  const translate = `calc(
    50vw - (${cardWidth} / 2) - ${index} * (${cardWidth} + ${gap}px)
  )`;

  return (
    <div className="relative">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-5">
        <div
          className="flex items-center"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${translate})`,
            transition:
              "transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {items.map((item, cardIndex) => {
            const isActive = cardIndex === index;

            return (
              <a
                key={item.id}
                href={getHref(item)}
                className="group relative block shrink-0 overflow-hidden rounded-[2rem] bg-neutral-100"
                style={{
                  width: cardWidth,
                  height: "min(620px, 65vw)",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
                  style={{
                    backgroundImage: item.cover_image
                      ? `url('${item.cover_image}')`
                      : undefined,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                <div className="absolute bottom-0 left-0 p-7 text-white md:p-10">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                    {item.category || item.type}
                  </p>

                  <h3
                    className={`font-black lowercase leading-none tracking-[-0.055em] transition-all duration-700 ${
                      isActive
                        ? "text-4xl md:text-6xl"
                        : "text-3xl md:text-5xl"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-4 text-xs font-bold lowercase">
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
              className="absolute left-[3vw] top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-black shadow-[0_10px_35px_rgba(0,0,0,.12)] transition-transform duration-300 hover:scale-110"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="siguiente"
              className="absolute right-[3vw] top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-black shadow-[0_10px_35px_rgba(0,0,0,.12)] transition-transform duration-300 hover:scale-110"
            >
              →
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {items.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`ir a ${item.title}`}
                onClick={() => setIndex(dotIndex)}
                className={`h-[3px] rounded-full bg-current transition-all duration-700 ${
                  dotIndex === index
                    ? "w-12 opacity-100"
                    : "w-7 opacity-15 hover:opacity-30"
                }`}
              />
            ))}
          </div>

          <p className="text-xs font-bold tabular-nums opacity-40">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-3 opacity-40">—</span>
            {String(total).padStart(2, "0")}
          </p>
        </div>
      )}
    </div>
  );
}