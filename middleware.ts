import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Next middleware only runs on matched paths (see config.matcher).
  // Keep route checks minimal and exact to avoid accidental redirects.
  const userSession = request.cookies.get("user_session");

  // Public routes (user)
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api/user/") ||
    pathname.startsWith("/api/auth")
  ) {
    // If someone hits the public landing route, redirect to login when not authenticated
    if (pathname === "/" && !userSession) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // Explicitly allow login/register paths
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect user dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!userSession) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register", "/"],
};


