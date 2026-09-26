import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "proyectos y visualizaciones",
  description: "Proyectos de arquitectura y visualizaciones desarrollados por vork studio.",
  alternates: { canonical: "/studio" },
  openGraph: { title: "proyectos y visualizaciones | vork studio", description: "Proyectos de arquitectura y visualizaciones desarrollados por vork studio.", url: "/studio" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
