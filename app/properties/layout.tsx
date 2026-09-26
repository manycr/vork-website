import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/properties";
  const title = en ? "properties" : "propiedades";
  const description = en ? "A selection of properties and real estate opportunities informed by architectural thinking." : "Selección de propiedades y oportunidades inmobiliarias con criterio arquitectónico.";
  return { title, description, alternates: { canonical: en ? `/en${path}` : path, languages: { "es-CR": path, en: `/en${path}`, "x-default": path } }, openGraph: { title: `${title} | vork studio`, description, url: en ? `/en${path}` : path } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
