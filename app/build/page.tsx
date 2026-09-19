import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="flex min-h-[100svh] items-center px-[7vw] pb-20 pt-28">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="max-w-[940px]">
            <h1 className="text-[clamp(4rem,7vw,8rem)] font-normal lowercase leading-[.88] tracking-[-0.07em]">
              construcción.
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-7 text-neutral-500">
              ejecución, coordinación y supervisión de obra.
            </p>
            <p className="mt-12 text-[13px] lowercase text-neutral-350">
              próximamente
            </p>
          </div>
        </div>
      </section>

      <BackFloat />
    </main>
  );
}
