import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const userSession = request.cookies.get("user_session");
  const adminSession = request.cookies.get("admin_session");


  // Public routes
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/user")
  ) {
    return NextResponse.next();
  }


  // Home page
  if (pathname === "/") {
    if (!userSession) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    return NextResponse.next();
  }


  // Admin login must stay public
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }


  // Protect admin dashboard
  if (pathname.startsWith("/admin")) {
    if (!adminSession) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }


  // Protect user dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!userSession) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }


  return NextResponse.next();
}


export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
