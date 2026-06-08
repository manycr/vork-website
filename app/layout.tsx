import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "vork studio | Arquitectura, visualización y obra",
  description:
    "Arquitectura, visualización 3D, planos constructivos, supervisión de obra y estrategia inmobiliaria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VCF8FN39NX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VCF8FN39NX');
          `}
        </Script>
      </body>
    </html>
  );
}