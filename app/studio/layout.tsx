import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const path = "/studio";
  const title = en ? "projects and visualizations" : "proyectos y visualizaciones";
  const description = en ? "Architecture projects and visualizations developed by vork studio." : "Proyectos de arquitectura y visualizaciones desarrollados por vork studio.";
  return { title, description, alternates: { canonical: en ? `/en${path}` : path, languages: { "es-CR": path, en: `/en${path}`, "x-default": path } }, openGraph: { title: `${title} | vork studio`, description, url: en ? `/en${path}` : path } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
