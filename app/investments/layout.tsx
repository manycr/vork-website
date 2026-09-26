import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "inversiones",
  description: "Oportunidades inmobiliarias con visión arquitectónica y potencial de desarrollo.",
  alternates: { canonical: "/investments" },
  openGraph: { title: "inversiones | vork studio", description: "Oportunidades inmobiliarias con visión arquitectónica y potencial de desarrollo.", url: "/investments" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
