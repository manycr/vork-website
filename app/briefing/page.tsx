import { Header } from "@/components/Header";
import { Estimator } from "@/components/Estimator";
import { cookies } from "next/headers";
import { localizePath } from "@/lib/i18nRoutes";
import { ArrowIcon } from "@/components/ArrowIcon";

export default async function BriefingPage() {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="px-[7vw] pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-[1500px]">
          <a href={localizePath("/", en ? "en" : "es")} className="group inline-flex items-center gap-2 text-sm lowercase text-neutral-400 transition hover:text-black">
            <ArrowIcon direction="left" className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> {en ? "back" : "volver"}
          </a>

          <div className="mt-14 max-w-[920px]">
            <h1 className="section-title max-w-[920px]">
              una entrada clara para iniciar tu proyecto.
            </h1>
            <p className="section-copy mt-6 max-w-xl">
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
