import type { MetadataRoute } from "next";
import { getPublishedItems } from "@/lib/cms";

const origin = "https://vorkstudio.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/studio", "/build", "/properties", "/investments", "/briefing"];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  try {
    const [projects, properties, investments] = await Promise.all([
      getPublishedItems("project"),
      getPublishedItems("property"),
      getPublishedItems("investment"),
    ]);
    entries.push(
      ...projects.map((item) => ({ url: `${origin}/studio/projects/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
      ...properties.map((item) => ({ url: `${origin}/properties/${item.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
      ...investments.map((item) => ({ url: `${origin}/investments/${item.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    );
  } catch {
    // Static routes remain discoverable if the CMS is temporarily unavailable.
  }

  return entries;
}
