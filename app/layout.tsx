import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";

const siteUrl = new URL("https://vorkstudio.com");

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  const title = en
    ? "vork studio | architecture, visualization and development"
    : "vork studio | arquitectura, visualización y desarrollo";
  const description = en
    ? "Architecture, construction, real estate and investment platform by vork studio."
    : "Plataforma de arquitectura, construcción, bienes raíces e inversiones de vork studio.";

  return {
    metadataBase: siteUrl,
    title: { default: title, template: "%s | vork studio" },
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: siteUrl, siteName: "vork studio", type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  return (
    <html lang={lang}>
      <body>
        {children}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
