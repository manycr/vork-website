import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "propiedades",
  description: "Selección de propiedades y oportunidades inmobiliarias con criterio arquitectónico.",
  alternates: { canonical: "/properties" },
  openGraph: { title: "propiedades | vork studio", description: "Selección de propiedades y oportunidades inmobiliarias con criterio arquitectónico.", url: "/properties" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
