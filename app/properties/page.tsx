import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getPublishedItems } from "@/lib/cms";
import { localizePath } from "@/lib/i18nRoutes";

export default async function PropertiesPage() {
  const properties = await getPublishedItems("property");

  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const en = lang === "en";

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="px-[7vw] pb-14 pt-28 md:pb-18 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <h1 className="max-w-[900px] text-[clamp(4.5rem,7.2vw,8rem)] font-normal lowercase leading-[.92] tracking-[-0.065em]">
            {en ? "properties." : "propiedades."}
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-7 text-neutral-500">
            {en ? "a selection of properties and opportunities informed by architectural thinking." : "selección de propiedades y oportunidades con criterio arquitectónico."}
          </p>
        </div>
      </section>

      <section className="px-[7vw] pb-28">
        <div className="mx-auto max-w-[1500px]">
          {properties.length > 0 ? (
            <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((item: any) => (
                <a
                  key={item.id || item.slug}
                  href={localizePath(`/properties/${item.slug}`, lang)}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-100">
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <h2 className="mt-4 text-[26px] font-normal lowercase tracking-[-0.04em]">
                    {item.title}
                  </h2>
                  {item.price && (
                    <p className="mt-2 text-[18px] font-medium tracking-[-0.025em] text-[#101010]">
                      {item.price}
                    </p>
                  )}
                  <p className="mt-1 text-[13px] text-neutral-400">
                    {[item.location, item.area].filter(Boolean).join(" · ")}
                  </p>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400">{en ? "no properties published at the moment." : "no hay propiedades publicadas en este momento."}</p>
          )}
        </div>
      </section>

      <BackFloat />
    </main>
  );
}
