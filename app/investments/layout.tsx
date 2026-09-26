import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/investments";
  const title = en ? "investments" : "inversiones";
  const description = en ? "Real estate opportunities with an architectural vision and development potential." : "Oportunidades inmobiliarias con visión arquitectónica y potencial de desarrollo.";
  return { title, description, alternates: { canonical: en ? `/en${path}` : path, languages: { "es-CR": path, en: `/en${path}`, "x-default": path } }, openGraph: { title: `${title} | vork studio`, description, url: en ? `/en${path}` : path } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
