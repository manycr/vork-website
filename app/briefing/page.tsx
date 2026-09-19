import { Header } from "@/components/Header";
import { Estimator } from "@/components/Estimator";

export default function BriefingPage() {
  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="px-[7vw] pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-[1500px]">
          <a href="/" className="inline-flex text-sm lowercase text-neutral-400 transition hover:text-black">
            ← volver
          </a>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h1 className="section-title max-w-[920px]">
              una entrada clara para iniciar tu proyecto.
            </h1>
            <p className="section-copy max-w-xl lg:pb-2">
              cuéntanos qué quieres hacer. organizamos la información para darte una primera lectura del proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[7vw] pb-24">
        <div className="mx-auto max-w-[1500px]">
          <Estimator />
        </div>
      </section>
    </main>
  );
}
