import { Header } from "@/components/Header";
export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-[#101010] text-[#f4f0e8]">
      <Header />
      <section className="flex min-h-screen items-center px-[7vw]">
        <div className="max-w-5xl">
          <p className="mb-6 text-xs font-black lowercase tracking-[0.24em] text-white/45">próximamente</p>
          <h1 className="text-6xl font-black lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">vork build.</h1>
          <p className="mt-8 max-w-2xl text-lg text-white/58">línea de construcción, ejecución y supervisión de obra en desarrollo.</p>
          <a href="/" className="button-light mt-10">volver a vork studio</a>
        </div>
      </section>
    </main>
  );
}
