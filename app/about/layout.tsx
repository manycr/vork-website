import type { Metadata } from "next";
import { cookies } from "next/headers";
import { localizePath } from "@/lib/i18nRoutes";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/about";
  const esPath = localizePath(path, "es");
  const title = en ? "about vork" : "sobre vork";
  const description = en ? "Meet the approach, philosophy and people behind vork studio." : "Conoce el enfoque, la filosofía y las personas detrás de vork studio.";
  return { title, description, alternates: { canonical: en ? `/en${path}` : esPath, languages: { "es-CR": esPath, en: `/en${path}`, "x-default": esPath } }, openGraph: { title: `${title} | vork studio`, description, url: en ? `/en${path}` : esPath } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
