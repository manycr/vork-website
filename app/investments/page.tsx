import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getPublishedItems } from "@/lib/cms";

export default async function InvestmentsPage() {
  const items = await getPublishedItems("investment");

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="px-[7vw] pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
            <div>
              <h1 className="max-w-[1050px] text-[clamp(4.5rem,7.2vw,8rem)] font-normal lowercase leading-[.9] tracking-[-0.065em]">
                oportunidades conceptuales para capital privado.
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] leading-7 text-neutral-500">
                inversiones con visión arquitectónica en mercados estratégicos.
              </p>
            </div>

            <p className="max-w-md text-[16px] leading-7 text-neutral-500 lg:pb-2">
              seleccionamos y estructuramos oportunidades inmobiliarias con potencial de desarrollo,
              diseño y rentabilidad a largo plazo.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[7vw] pb-28">
        <div className="mx-auto max-w-[1500px]">
          {items.length > 0 ? (
            <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item: any) => (
                <a
                  key={item.id || item.slug}
                  href={`/investments/${item.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-100">
                    <img
                      src={item.cover_image || ""}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-5">
                    <div>
                      <h2 className="text-[26px] font-normal lowercase tracking-[-0.045em]">
                        {item.title}
                      </h2>

                      {item.price && (
                        <p className="mt-1 text-[17px] font-medium tracking-[-0.02em]">
                          {item.price}
                        </p>
                      )}

                      <p className="mt-2 text-[13px] text-neutral-400">
                        {[item.location, item.area, item.category].filter(Boolean).join(" · ")}
                      </p>
                    </div>

                    <span className="mt-2 text-2xl font-light transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400">no hay oportunidades publicadas en este momento.</p>
          )}
        </div>
      </section>

      <BackFloat />
    </main>
  );
}
