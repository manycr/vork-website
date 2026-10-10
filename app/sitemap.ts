import type { MetadataRoute } from "next";
import { getPublishedItems } from "@/lib/cms";
import { localizePath } from "@/lib/i18nRoutes";

const origin = "https://vorkstudio.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/studio", "/build", "/properties", "/investments", "/briefing", "/privacy", "/terms", "/data-deletion"];
  const entries: MetadataRoute.Sitemap = staticRoutes.flatMap((path) => {
    const internalPath = path || "/";
    const esPath = localizePath(internalPath, "es");
    const enPath = localizePath(internalPath, "en");
    return [
    {
      url: `${origin}${esPath === "/" ? "" : esPath}`,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { es: `${origin}${esPath === "/" ? "" : esPath}`, en: `${origin}${enPath}` } },
    },
    {
      url: `${origin}${enPath}`,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { es: `${origin}${esPath === "/" ? "" : esPath}`, en: `${origin}${enPath}` } },
    },
  ];
  });

  try {
    const [projects, properties, investments] = await Promise.all([
      getPublishedItems("project"),
      getPublishedItems("property"),
      getPublishedItems("investment"),
    ]);
    entries.push(
      ...projects.flatMap((item) => (["es", "en"] as const).map((language) => ({ url: `${origin}${localizePath(`/studio/projects/${item.slug}`, language)}`, changeFrequency: "monthly" as const, priority: 0.7 }))),
      ...properties.flatMap((item) => (["es", "en"] as const).map((language) => ({ url: `${origin}${localizePath(`/properties/${item.slug}`, language)}`, changeFrequency: "weekly" as const, priority: 0.7 }))),
      ...investments.flatMap((item) => (["es", "en"] as const).map((language) => ({ url: `${origin}${localizePath(`/investments/${item.slug}`, language)}`, changeFrequency: "weekly" as const, priority: 0.7 }))),
    );
  } catch {
    // Static routes remain discoverable if the CMS is temporarily unavailable.
  }

  return entries;
}
