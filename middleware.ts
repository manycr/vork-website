import { NextRequest, NextResponse } from "next/server";
import { internalPathFromSpanish, isLegacyEnglishPath, localizePath } from "@/lib/i18nRoutes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const desiredLanguage = isEnglish ? "en" : "es";
  const isInternalRewrite = request.headers.get("x-vork-internal-rewrite") === "1";

  const rewriteInternally = (targetPath: string) => {
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = targetPath;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-vork-internal-rewrite", "1");
    return NextResponse.rewrite(rewritten, {
      request: { headers: requestHeaders },
    });
  };

  if (!isEnglish && !isInternalRewrite && isLegacyEnglishPath(pathname)) {
    const redirected = request.nextUrl.clone();
    redirected.pathname = localizePath(pathname, "es");
    return NextResponse.redirect(redirected, 308);
  }

  if (isInternalRewrite) {
    return NextResponse.next();
  }

  const directLegalRoutes = new Set([
    "/privacidad",
    "/terminos-y-condiciones",
    "/eliminar-datos",
    "/en/privacy",
    "/en/terms",
    "/en/data-deletion",
  ]);

  if (
    directLegalRoutes.has(pathname) &&
    request.cookies.get("vork_lang")?.value !== desiredLanguage
  ) {
    const response = rewriteInternally(isEnglish
      ? pathname.slice(3) || "/"
      : internalPathFromSpanish(pathname));
    response.cookies.set("vork_lang", desiredLanguage, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  if (request.cookies.get("vork_lang")?.value !== desiredLanguage) {
    const response = NextResponse.redirect(request.nextUrl);
    response.cookies.set("vork_lang", desiredLanguage, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  if (isEnglish) {
    return rewriteInternally(pathname.slice(3) || "/");
  }

  const internalPath = internalPathFromSpanish(pathname);
  if (internalPath !== pathname) {
    return rewriteInternally(internalPath);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
