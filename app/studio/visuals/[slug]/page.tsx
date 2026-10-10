import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getItemBySlug } from "@/lib/cms";
import { localizePath } from "@/lib/i18nRoutes";
import { notFound } from "next/navigation";

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getItemBySlug(slug);
  if (!item || item.type !== "visual") notFound();
  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <Header />
      <section
        className="flex min-h-screen items-end bg-cover bg-center px-[7vw] pb-20 text-white"
        style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.62),rgba(0,0,0,.05)),url('${item.cover_image || ""}')` }}
      >
        <div className="max-w-5xl">
          <p className="mb-5 text-xs lowercase tracking-[0.24em] text-white/60">{item.category}</p>
          <h1 className="text-6xl font-normal lowercase leading-[0.88] tracking-[-0.075em] md:text-9xl">{item.title}</h1>
        </div>
      </section>

      <section className="px-[7vw] py-24">
        <div className="grid gap-16 md:grid-cols-[0.45fr_1fr]">
          <div className="space-y-5 text-sm">
            <Info label={lang === "en" ? "location" : "ubicación"} value={item.location || (lang === "en" ? "to be defined" : "por definir")} />
            <Info label={lang === "en" ? "year" : "año"} value={item.year || (lang === "en" ? "to be defined" : "por definir")} />
            <Info label={lang === "en" ? "area" : "área"} value={item.area || (lang === "en" ? "to be defined" : "por definir")} />
            <Info label={lang === "en" ? "services" : "servicios"} value={item.services?.join(", ") || (lang === "en" ? "to be defined" : "por definir")} />
          </div>
          <div>
            <h2 className="text-5xl font-normal lowercase leading-[0.95] tracking-[-0.06em]">{item.concept || item.description}</h2>
            {item.investment_thesis && <p className="mt-8 max-w-2xl text-white/55">{item.investment_thesis}</p>}
          </div>
        </div>
      </section>

      <section className="grid gap-6 px-[7vw] pb-32">
        {(item.gallery || []).map((image) => (
          <div key={image} className="min-h-[680px] bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
        ))}
      </section>

      <BackFloat href={localizePath("/studio", lang)} language={lang} />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/15 pt-4">
      <p className="text-[11px] lowercase tracking-[0.16em] text-white/40">{label}</p>
      <p className="mt-2 text-white/80">{value}</p>
    </div>
  );
}
