import { Header } from "@/components/Header";
import { CMSGrid } from "@/components/CMSGrid";
import { getPublishedItems } from "@/lib/cms";

export default async function InvestmentsPage() {
  const items = await getPublishedItems("investment");
  return (
    <main className="min-h-screen bg-[#101010] text-[#f4f0e8]">
      <Header />
      <section className="px-[7vw] pb-24 pt-36">
        <a href="/" className="mb-12 inline-flex text-sm font-black lowercase text-white/50">← volver</a>
        <p className="mb-5 text-xs font-black lowercase tracking-[0.08em] text-white/45">vork investments</p>
        <h1 className="max-w-5xl text-6xl font-black lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">oportunidades conceptuales para capital privado.</h1>
      </section>
      <section className="px-[7vw] pb-32"><CMSGrid items={items} label="ver oportunidad" /></section>
    </main>
  );
}
