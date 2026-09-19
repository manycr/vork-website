import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";

export default async function BuildPage() {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="flex min-h-[100svh] items-center px-[7vw] pb-20 pt-28">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="max-w-[940px]">
            <h1 className="text-[clamp(4rem,7vw,8rem)] font-normal lowercase leading-[.88] tracking-[-0.07em]">
              {en ? "construction." : "construcción."}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-7 text-neutral-500">
              {en ? "construction, project coordination and site supervision." : "ejecución, coordinación y supervisión de obra."}
            </p>
            <div className="mt-14 max-w-xl border-t border-neutral-200 pt-7">
              <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-normal leading-tight tracking-[-0.045em]">
                {en ? "From design to construction." : "Del proyecto a la obra."}
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-7 text-neutral-500">
                {en
                  ? "More on our approach to construction and site supervision, coming soon."
                  : "Próximamente, más sobre nuestro enfoque de construcción y supervisión."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <BackFloat />
    </main>
  );
}
