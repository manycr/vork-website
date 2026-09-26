export type SiteLanguage = "es" | "en";

const spanishRoutes: Array<[string, string]> = [
  ["/studio/projects", "/studio/proyectos"],
  ["/studio/visuals", "/studio/visualizaciones"],
  ["/investments", "/inversiones"],
  ["/properties", "/propiedades"],
  ["/briefing", "/diagnostico"],
  ["/build", "/construccion"],
  ["/about", "/nosotros"],
];

export function localizePath(path: string, language: SiteLanguage): string {
  if (path === "/") return language === "en" ? "/en" : "/";
  if (language === "en") return `/en${path}`;
  const match = spanishRoutes.find(([internal]) => path === internal || path.startsWith(`${internal}/`));
  return match ? path.replace(match[0], match[1]) : path;
}

export function internalPathFromSpanish(path: string): string {
  const match = spanishRoutes.find(([, spanish]) => path === spanish || path.startsWith(`${spanish}/`));
  return match ? path.replace(match[1], match[0]) : path;
}

export function isLegacyEnglishPath(path: string): boolean {
  return spanishRoutes.some(([internal]) => path === internal || path.startsWith(`${internal}/`));
}
