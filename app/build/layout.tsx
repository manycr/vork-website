import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/build";
  const title = en ? "construction" : "construcción";
  const description = en ? "Construction, project coordination and site supervision by vork studio." : "Ejecución, coordinación y supervisión de obra de vork studio.";
  return { title, description, alternates: { canonical: en ? `/en${path}` : path, languages: { "es-CR": path, en: `/en${path}`, "x-default": path } }, openGraph: { title: `${title} | vork studio`, description, url: en ? `/en${path}` : path } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
