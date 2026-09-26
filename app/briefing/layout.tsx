import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "vork briefing",
  description: "Cuéntanos sobre tu proyecto y recibe una primera lectura de alcance, inversión y próximos pasos.",
  alternates: { canonical: "/briefing" },
  openGraph: { title: "vork briefing | vork studio", description: "Una primera lectura para iniciar tu proyecto con claridad.", url: "/briefing" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
