import { NextRequest, NextResponse } from "next/server";
import { internalPathFromSpanish, isLegacyEnglishPath, localizePath } from "@/lib/i18nRoutes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const desiredLanguage = isEnglish ? "en" : "es";

  if (!isEnglish && isLegacyEnglishPath(pathname)) {
    const redirected = request.nextUrl.clone();
    redirected.pathname = localizePath(pathname, "es");
    return NextResponse.redirect(redirected, 308);
  }

  const directLegalRoutes = new Set([
    "/privacidad",
    "/eliminar-datos",
    "/en/privacy",
    "/en/data-deletion",
  ]);

  if (
    directLegalRoutes.has(pathname) &&
    request.cookies.get("vork_lang")?.value !== desiredLanguage
  ) {
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = isEnglish
      ? pathname.slice(3) || "/"
      : internalPathFromSpanish(pathname);
    const response = NextResponse.rewrite(rewritten);
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
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = pathname.slice(3) || "/";
    return NextResponse.rewrite(rewritten);
  }

  const internalPath = internalPathFromSpanish(pathname);
  if (internalPath !== pathname) {
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = internalPath;
    return NextResponse.rewrite(rewritten);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
