import type { Metadata } from "next";
import { cookies } from "next/headers";
import { localizePath } from "@/lib/i18nRoutes";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/investments";
  const esPath = localizePath(path, "es");
  const title = en ? "investments" : "inversiones";
  const description = en ? "Real estate opportunities with an architectural vision and development potential." : "Oportunidades inmobiliarias con visión arquitectónica y potencial de desarrollo.";
  return { title, description, alternates: { canonical: en ? `/en${path}` : esPath, languages: { "es-CR": esPath, en: `/en${path}`, "x-default": esPath } }, openGraph: { title: `${title} | vork studio`, description, url: en ? `/en${path}` : esPath } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
