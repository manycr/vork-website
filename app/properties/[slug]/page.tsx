import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getItemBySlug } from "@/lib/cms";
import { notFound } from "next/navigation";

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getItemBySlug(slug);
  if (!item || item.type !== "property") notFound();

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />

      <section
        className="relative flex min-h-[92svh] items-end overflow-hidden bg-cover bg-center px-[7vw] pb-16 text-white md:pb-20"
        style={{ backgroundImage: `url('${item.cover_image || ""}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/8 to-black/5" />
        <div className="relative z-10 mx-auto w-full max-w-[1500px]">
          <h1 className="max-w-[1050px] text-[clamp(4.5rem,8vw,9rem)] font-normal lowercase leading-[.86] tracking-[-0.07em]">
            {item.title}
          </h1>
          {item.price && (
            <p className="mt-6 text-[clamp(1.6rem,2.6vw,2.8rem)] font-normal tracking-[-0.04em]">
              {item.price}
            </p>
          )}
          {item.summary && (
            <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/78">{item.summary}</p>
          )}
        </div>
      </section>

      <section className="px-[7vw] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.65fr_1.35fr]">
          <div className="grid content-start gap-5">
            <Info label="ubicación" value={item.location || "por definir"} />
            <Info label="área" value={item.area || "por definir"} />
            {item.year && <Info label="año" value={item.year} />}
            {item.price && <Info label="precio" value={item.price} />}
          </div>

          <div>
            <h2 className="max-w-[900px] text-[clamp(2.8rem,5vw,5.7rem)] font-normal lowercase leading-[.93] tracking-[-0.055em]">
              {item.concept || item.description || item.summary}
            </h2>
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
