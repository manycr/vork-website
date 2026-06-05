import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vork studio | Arquitectura, visualización y obra",
  description: "Arquitectura, visualización 3D, planos constructivos, supervisión de obra y estrategia inmobiliaria en Costa Rica."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
