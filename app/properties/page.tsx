import { Header } from "@/components/Header";

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <Header />

      <section className="grid min-h-screen items-center gap-12 px-[7vw] py-32 md:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#f2db9c]">próximamente</p>
          <h1 className="text-6xl font-black lowercase leading-[0.9] tracking-[-0.07em] md:text-9xl">
            vork<span className="font-light">properties</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/68">
            una futura inmobiliaria boutique enfocada en propiedades seleccionadas, oportunidades de inversión y desarrollos con criterio arquitectónico en costa rica.
          </p>
          <p className="mt-5 max-w-xl text-white/48">
            bienes raíces con visión espacial, lectura de valor y acompañamiento estratégico.
          </p>
          <a href="/" className="button-secondary mt-10 text-white">volver a vork studio</a>
        </div>

        <div
          className="min-h-[620px] rounded-[2rem] bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,0,0,.32), rgba(0,0,0,.02)), url('https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=90')"
          }}
        />
      </section>
    </main>
  );
}
