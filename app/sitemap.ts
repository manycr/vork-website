import type { MetadataRoute } from "next";
import { getPublishedItems } from "@/lib/cms";

const origin = "https://vorkstudio.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/studio", "/build", "/properties", "/investments", "/briefing"];
  const entries: MetadataRoute.Sitemap = staticRoutes.flatMap((path) => [
    {
      url: `${origin}${path}`,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { es: `${origin}${path}`, en: `${origin}/en${path}` } },
    },
    {
      url: `${origin}/en${path}`,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { es: `${origin}${path}`, en: `${origin}/en${path}` } },
    },
  ]);

  try {
    const [projects, properties, investments] = await Promise.all([
      getPublishedItems("project"),
      getPublishedItems("property"),
      getPublishedItems("investment"),
    ]);
    entries.push(
      ...projects.flatMap((item) => ["", "/en"].map((prefix) => ({ url: `${origin}${prefix}/studio/projects/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }))),
      ...properties.flatMap((item) => ["", "/en"].map((prefix) => ({ url: `${origin}${prefix}/properties/${item.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }))),
      ...investments.flatMap((item) => ["", "/en"].map((prefix) => ({ url: `${origin}${prefix}/investments/${item.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }))),
    );
  } catch {
    // Static routes remain discoverable if the CMS is temporarily unavailable.
  }

  return entries;
}
