import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "sobre vork",
  description: "Conoce el enfoque, la filosofía y las personas detrás de vork studio.",
  alternates: { canonical: "/about" },
  openGraph: { title: "sobre vork | vork studio", description: "Conoce el enfoque, la filosofía y las personas detrás de vork studio.", url: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
