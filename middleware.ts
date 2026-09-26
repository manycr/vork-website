import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const desiredLanguage = isEnglish ? "en" : "es";

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
