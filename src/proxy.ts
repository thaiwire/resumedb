import { NextResponse, type NextRequest } from "next/server";

import { getProxyAuthContext } from "@/config/supabase-proxy-config";

const AUTH_PAGES = new Set(["/login", "/register"]);

const isAdminRoute = (pathname: string) => pathname.startsWith("/admin");
const isUserRoute = (pathname: string) => pathname.startsWith("/user");

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user, role } = await getProxyAuthContext(request);

  if ((isAdminRoute(pathname) || isUserRoute(pathname)) && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute(pathname) && user && role !== "admin") {
    const userUrl = request.nextUrl.clone();
    userUrl.pathname = "/user/template";
    userUrl.search = "";
    return NextResponse.redirect(userUrl);
  }

  if (isUserRoute(pathname) && user && role === "admin") {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin/dashboard";
    adminUrl.search = "";
    return NextResponse.redirect(adminUrl);
  }

  if (AUTH_PAGES.has(pathname) && user) {
    const destination = role === "admin" ? "/admin/dashboard" : "/user/template";
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = destination;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/login", "/register", "/admin/:path*", "/user/:path*"],
};
