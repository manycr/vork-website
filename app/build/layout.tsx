import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "construcción",
  description: "Ejecución, coordinación y supervisión de obra de vork studio.",
  alternates: { canonical: "/build" },
  openGraph: { title: "construcción | vork studio", description: "Ejecución, coordinación y supervisión de obra de vork studio.", url: "/build" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
