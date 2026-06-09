import { Header } from "@/components/Header";
import { Estimator } from "@/components/Estimator";

export default function BriefingPage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8]">
      <Header />
      <section className="px-[7vw] pb-10 pt-36">
        <a href="/" className="mb-12 inline-flex text-sm font-black lowercase text-neutral-500">← volver</a>
        <p className="mb-5 text-xs font-black lowercase tracking-[0.08em] text-[#7a7468]">vork briefing</p>
        <h1 className="max-w-5xl text-6xl font-black lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">
          una entrada clara para iniciar tu proyecto.
        </h1>
      </section>
      <Estimator />
    </main>
  );
}
