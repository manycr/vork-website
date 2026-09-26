import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard", "/vork-private", "/api/"] },
    ],
    sitemap: "https://vorkstudio.com/sitemap.xml",
    host: "https://vorkstudio.com",
  };
}
