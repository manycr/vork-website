import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getPublishedItems } from "@/lib/cms";
import { localizePath } from "@/lib/i18nRoutes";

export default async function PropertiesPage() {
  const properties = await getPublishedItems("property");

  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const en = lang === "en";
  const services = en
    ? [
        ["property intake", "we learn about the property, review the available information and define its value proposition."],
        ["presentation", "we prepare the listing and organize the visual and commercial material needed to present it clearly."],
        ["promotion", "we publish and promote the property through the appropriate digital channels and manage qualified inquiries."],
        ["guidance", "we coordinate visits, negotiation and the relevant commercial, technical and documentation support through closing."],
      ]
    : [
        ["captación", "conocemos la propiedad, revisamos la información disponible y definimos su propuesta de valor."],
        ["presentación", "preparamos la publicación y organizamos el material visual y comercial necesario para presentarla con claridad."],
        ["difusión", "publicamos y promocionamos la propiedad en los canales digitales adecuados y gestionamos consultas calificadas."],
        ["acompañamiento", "coordinamos visitas, negociación y la asesoría comercial, técnica y documental pertinente hasta el cierre."],
      ];

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="px-[7vw] pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[1050px]">
            <div>
              <h1 className="max-w-[1000px] text-[clamp(3.2rem,7.2vw,8rem)] font-normal lowercase leading-[.94] tracking-[-0.065em] sm:leading-[.92]">
                {en
                  ? "properties with guidance from listing to closing."
                  : "propiedades con acompañamiento de principio a fin."}
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] leading-7 text-neutral-500">
                {en
                  ? "we represent, present and market properties through a clear real estate strategy."
                  : "captamos, presentamos y comercializamos propiedades con una estrategia inmobiliaria clara."}
              </p>
            </div>
            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-neutral-500">
              {en
                ? "we help owners bring their properties to market and guide buyers through the search and evaluation process."
                : "ayudamos a propietarios a llevar sus inmuebles al mercado y acompañamos a compradores durante la búsqueda y evaluación."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-[7vw] pb-24">
        <div className="mx-auto grid max-w-[1500px] gap-x-10 gap-y-12 border-y border-neutral-200 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, description], index) => (
            <article key={title}>
              <p className="text-[12px] text-neutral-400">0{index + 1}</p>
              <h2 className="mt-4 text-[24px] font-normal lowercase tracking-[-0.04em]">{title}</h2>
              <p className="mt-3 text-[15px] leading-6 text-neutral-500">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-[7vw] pb-28">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="mb-10 text-[clamp(2.6rem,4vw,4.5rem)] font-normal lowercase tracking-[-0.055em]">
            {en ? "available properties." : "propiedades disponibles."}
          </h2>
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
                  <h3 className="mt-4 text-[26px] font-normal lowercase tracking-[-0.04em]">
                    {item.title}
                  </h3>
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

      <BackFloat href={localizePath("/", lang)} language={lang} />
    </main>
  );
}
