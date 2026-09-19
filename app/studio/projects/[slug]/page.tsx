import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getItemBySlug, getPublishedItems } from "@/lib/cms";
import { notFound } from "next/navigation";

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getItemBySlug(slug);
  if (!item || item.type !== "project") notFound();

  const projects = await getPublishedItems("project");
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  const nextProject =
    projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : null;

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section
        className="relative flex min-h-[92svh] items-end overflow-hidden bg-cover bg-center px-[7vw] pb-16 text-white md:pb-20"
        style={{ backgroundImage: `url('${item.cover_image || ""}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/8 to-black/5" />
        <div className="relative z-10 mx-auto w-full max-w-[1500px]">
          <h1 className="max-w-[1050px] text-[clamp(4.5rem,8vw,9rem)] font-normal lowercase leading-[.86] tracking-[-0.07em]">
            {item.title}
          </h1>
          {item.summary && (
            <p className="mt-6 max-w-xl text-[16px] leading-7 text-white/78">{item.summary}</p>
          )}
        </div>
      </section>

      <section className="px-[7vw] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.65fr_1.35fr]">
          <div className="grid content-start gap-5">
            <Info label="ubicación" value={item.location || "por definir"} />
            <Info label="año" value={item.year || "por definir"} />
            <Info label="área" value={item.area || "por definir"} />
            <Info label="servicios" value={item.services?.join(" · ") || "por definir"} />
          </div>
          <div>
            <h2 className="max-w-[900px] text-[clamp(2.8rem,5vw,5.7rem)] font-normal lowercase leading-[.93] tracking-[-0.055em]">
              {item.concept || item.description}
            </h2>
            {item.investment_thesis && (
              <p className="mt-8 max-w-2xl text-[17px] leading-7 text-neutral-500">
                {item.investment_thesis}
              </p>
            )}
          </div>
        </div>
      </section>

      {(item.gallery || []).length > 0 && (
        <section className="grid grid-cols-1 gap-5 px-[7vw] pb-28 md:grid-cols-2">
          {(item.gallery || []).map((image) => (
            <div key={image} className="aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-100">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </section>
      )}

      {nextProject && (
        <section className="px-[7vw] pb-28 pt-6">
          <div className="mx-auto max-w-[1500px]">
            <p className="mb-5 text-[13px] lowercase text-neutral-400">siguiente proyecto</p>
            <a href={`/studio/projects/${nextProject.slug}`} className="group block">
              <div className="relative aspect-[16/7] overflow-hidden rounded-[24px]">
                <img
                  src={nextProject.cover_image || ""}
                  alt={nextProject.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                  <h2 className="text-[clamp(2.8rem,5vw,5.8rem)] font-normal lowercase leading-[.9] tracking-[-0.06em] text-white">
                    {nextProject.title} <span className="font-light">→</span>
                  </h2>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      <BackFloat />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-black/10 pt-4">
      <p className="text-[12px] lowercase text-neutral-400">{label}</p>
      <p className="mt-2 text-[17px] leading-6">{value}</p>
    </div>
  );
}
