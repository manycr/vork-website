"use client";

export function BackFloat({ href = "/" }: { href?: string }) {
  return (
    <a
      href={href}
      aria-label="volver"
      title="volver"
      className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/82 text-lg text-black shadow-[0_6px_30px_rgba(0,0,0,.08)] backdrop-blur-xl transition duration-300 hover:-translate-x-1 hover:bg-black hover:text-white"
    >
      ←
    </a>
  );
}
