import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";
import { getSiteContent } from "@/lib/cms";
import { localizePath } from "@/lib/i18nRoutes";

export const dynamic = "force-dynamic";
const copy = {
  es: {
    title: "sobre vork.", tagline: "la arquitectura tiene un lugar.",
    intro: "creemos que la arquitectura debe comenzar por comprender, no por imponer una solución previamente definida.",
    context: "cada persona habita de manera distinta. cada lugar presenta condiciones particulares. cada proyecto merece una respuesta que surja de ambos.",
    approach: "en vork diseñamos espacios con intención. nos tomamos el tiempo de comprender cómo viven las personas, qué necesitan y cómo la arquitectura puede mejorar su relación con los espacios que habitan.",
    philosophy: "no nos interesa repetir una fórmula. creemos en una arquitectura pensada, que responde a su contexto, reconoce su propósito y permite que la vida suceda.",
    closing: "la arquitectura tiene un lugar. y cada lugar merece una arquitectura que le pertenezca.",
    lines: "cuatro líneas, una manera de pensar.", studio: "arquitectura y visualización.", build: "ejecución y coordinación de obra. próximamente.", properties: "oportunidades inmobiliarias.", investments: "desarrollo de oportunidades de inversión.", people: "personas", manuel: "dirección de studio · arquitectura", paulo: "relación con clientes · coordinación técnica", contact: "conversemos sobre tu proyecto", 
  },
  en: {
    title: "about vork.", tagline: "architecture has a place.",
    intro: "we believe architecture should begin with understanding, not with a predefined solution.",
    context: "every person lives differently. every site presents its own conditions. every project deserves a response shaped by both.",
    approach: "at vork, we design spaces with intention. we take the time to understand how people live, what they need, and how architecture can improve their relationship with the spaces they inhabit.",
    philosophy: "we are not interested in repeating a formula. we believe in thoughtful architecture that responds to its context, respects its purpose, and creates room for life to unfold.",
    closing: "architecture has a place. and every place deserves architecture that belongs.",
    lines: "four lines, one approach.", studio: "architecture and visualization.", build: "construction and project coordination. coming soon.", properties: "real estate opportunities.", investments: "investment opportunity development.", people: "people", manuel: "studio direction · architecture", paulo: "client relations · technical coordination", contact: "tell us about your project",
  },
};
const photoHeight = (value: string | undefined) => Math.min(700, Math.max(250, Number(value) || 380));
const photoPosition = (value: string | undefined) => Math.min(100, Math.max(0, Number(value) || 50));

export default async function AboutPage() {
  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const saved = await getSiteContent("home", "main");
  const d = copy[lang];
  const t = (key: keyof typeof d) => saved[`about_${key}_${lang}`] || d[key];
  let extraTeam: { id: string; name_es: string; name_en: string; role_es: string; role_en: string; bio_es?: string; bio_en?: string; image: string; photo_height?: string; photo_position?: string }[] = [];
  try { const parsed = JSON.parse(saved.about_team || "[]"); if (Array.isArray(parsed)) extraTeam = parsed.filter((member) => member && typeof member.id === "string"); } catch {} 
  const team = [
    ...(saved.about_show_manuel === "false" ? [] : [{ id: "manuel", name: saved[`about_name_manuel_${lang}`] || "Manuel Morera", role: t("manuel"), bio: saved[`about_bio_manuel_${lang}`] || "", image: saved.about_image_1 || "", photo_height: saved.about_photo_height_manuel, photo_position: saved.about_photo_position_manuel }]),
    ...(saved.about_show_paulo === "false" ? [] : [{ id: "paulo", name: saved[`about_name_paulo_${lang}`] || "Paulo Chavarría", role: t("paulo"), bio: saved[`about_bio_paulo_${lang}`] || "", image: saved.about_image_2 || "", photo_height: saved.about_photo_height_paulo, photo_position: saved.about_photo_position_paulo }]),
    ...extraTeam.map((member) => ({ id: member.id, name: member[`name_${lang}`] || member.name_es || "", role: member[`role_${lang}`] || member.role_es || "", bio: member[`bio_${lang}`] || member.bio_es || "", image: member.image || "", photo_height: member.photo_height, photo_position: member.photo_position })),
  ];
  return <main className="min-h-screen bg-white text-[#101010]">
    <Header />
    <section className="mx-auto max-w-[1500px] px-[7vw] pb-24 pt-40 md:pb-36">
      <p className="mb-8 text-xs lowercase tracking-[.12em] text-neutral-500">vork studio</p>
      <h1 className="max-w-[1150px] text-[clamp(3.8rem,9vw,9rem)] font-normal lowercase leading-[.9] tracking-[-.075em]">{t("title")}</h1>
      <h2 className="mt-16 max-w-[1000px] text-[clamp(2.4rem,5vw,5.5rem)] font-normal lowercase leading-[1.05] tracking-[-.06em]">{t("tagline")}</h2>
      <div className="mt-20 grid gap-10 text-[clamp(1.05rem,1.55vw,1.4rem)] leading-[1.7] text-neutral-600 md:grid-cols-2 md:gap-20"><p>{t("intro")}<br/><br/>{t("context")}</p><p>{t("approach")}<br/><br/>{t("philosophy")}</p></div>
      <p className="mt-24 max-w-[1000px] text-[clamp(2rem,4vw,4.5rem)] lowercase leading-[1.15] tracking-[-.055em]">{t("closing")}</p>
    </section>
    <section className="border-t border-black/10 px-[7vw] py-24"><div className="mx-auto max-w-[1500px]"><h2 className="mb-14 text-[clamp(2rem,4vw,4.5rem)] lowercase tracking-[-.055em]">{t("lines")}</h2><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{([ ["studio", "/studio"], ["build", "/build"], ["properties", "/properties"], ["investments", "/investments"] ] as const).map(([name,href]) => <a key={name} href={localizePath(href, lang)} className="border-t border-black/20 pt-5"><h3 className="text-2xl lowercase">{name === "build" ? (lang === "es" ? "construcción" : "construction") : name === "properties" ? (lang === "es" ? "propiedades" : "properties") : name === "investments" ? (lang === "es" ? "inversiones" : "investments") : name}</h3><p className="mt-4 text-sm leading-6 text-neutral-500">{t(name)}</p></a>)}</div></div></section>
    <section className="border-t border-black/10 px-[7vw] py-24"><div className="mx-auto max-w-[1500px]"><h2 className="mb-12 text-4xl lowercase tracking-[-.05em]">{t("people")}</h2><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">{team.map((member) => <div key={member.id}>{member.image ? <img src={member.image} alt={member.name} className="mb-6 w-full rounded-[22px] bg-neutral-100 object-cover" style={{ height: `${photoHeight(member.photo_height)}px`, objectPosition: `center ${photoPosition(member.photo_position)}%` }} /> : <div className="mb-6 flex items-center justify-center rounded-[22px] bg-neutral-100 text-sm text-neutral-400" style={{ height: `${photoHeight(member.photo_height)}px` }}>{lang === "es" ? "sin fotografía" : "no photo"}</div>}<h3 className="text-2xl">{member.name}</h3><p className="mt-2 text-sm text-neutral-500">{member.role}</p>{member.bio && <p className="mt-3 max-w-md text-sm leading-6 text-neutral-400">{member.bio}</p>}</div>)}</div><a href={`${localizePath("/", lang)}#vork-ai`} className="mt-20 inline-block border-b border-black pb-2 text-lg lowercase">{t("contact")} ↗</a></div></section>
    <BackFloat href={localizePath("/", lang)} language={lang} />
  </main>;
}
