import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/briefing";
  const description = en ? "Tell us about your project and receive an initial assessment of scope, investment and next steps." : "Cuéntanos sobre tu proyecto y recibe una primera lectura de alcance, inversión y próximos pasos.";
  return { title: "vork briefing", description, alternates: { canonical: en ? `/en${path}` : path, languages: { "es-CR": path, en: `/en${path}`, "x-default": path } }, openGraph: { title: "vork briefing | vork studio", description, url: en ? `/en${path}` : path } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
