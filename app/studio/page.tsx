import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getPublishedItems } from "@/lib/cms";

export default async function StudioPage() {
  const [projects, visuals] = await Promise.all([
    getPublishedItems("project"),
    getPublishedItems("visual"),
  ]);

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section className="px-[7vw] pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <h1 className="max-w-[900px] text-[clamp(4.5rem,7.2vw,8rem)] font-normal lowercase leading-[.92] tracking-[-0.065em] text-balance">
            proyectos y visualizaciones.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-7 text-neutral-500">
            arquitectura y representación como parte de un mismo proceso.
          </p>
        </div>
      </section>

      <section className="px-[7vw] pb-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((item: any) => (
              <a key={item.id || item.slug} href={`/studio/projects/${item.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-100">
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <h2 className="mt-4 text-[26px] font-normal lowercase tracking-[-0.04em]">{item.title}</h2>
                {(item.location || item.year) && (
                  <p className="mt-1 text-[13px] text-neutral-400">
                    {[item.location, item.year].filter(Boolean).join(" · ")}
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {visuals.length > 0 && (
        <section className="px-[7vw] pb-28 pt-8">
          <div className="mx-auto max-w-[1500px]">
            <h2 className="mb-10 text-[clamp(3.5rem,5.4vw,6rem)] font-normal lowercase leading-[.95] tracking-[-0.055em]">
              visualizaciones.
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visuals.map((item: any) => (
                <div key={item.id || item.slug} className="group">
                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-100">
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <p className="mt-4 text-[22px] lowercase tracking-[-0.035em]">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <BackFloat />
    </main>
  );
}
