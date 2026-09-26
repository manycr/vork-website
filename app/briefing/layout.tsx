import type { Metadata } from "next";
import { cookies } from "next/headers";
import { localizePath } from "@/lib/i18nRoutes";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/briefing";
  const esPath = localizePath(path, "es");
  const description = en ? "Tell us about your project and receive an initial assessment of scope, investment and next steps." : "Cuéntanos sobre tu proyecto y recibe una primera lectura de alcance, inversión y próximos pasos.";
  return { title: "vork briefing", description, alternates: { canonical: en ? `/en${path}` : esPath, languages: { "es-CR": esPath, en: `/en${path}`, "x-default": esPath } }, openGraph: { title: "vork briefing | vork studio", description, url: en ? `/en${path}` : esPath } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
