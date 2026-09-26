import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/about";
  const title = en ? "about vork" : "sobre vork";
  const description = en ? "Meet the approach, philosophy and people behind vork studio." : "Conoce el enfoque, la filosofía y las personas detrás de vork studio.";
  return { title, description, alternates: { canonical: en ? `/en${path}` : path, languages: { "es-CR": path, en: `/en${path}`, "x-default": path } }, openGraph: { title: `${title} | vork studio`, description, url: en ? `/en${path}` : path } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
