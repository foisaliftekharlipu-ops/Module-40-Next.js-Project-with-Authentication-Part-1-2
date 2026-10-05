import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Validate Better Auth session cookies for both HTTP (development) and HTTPS (production)
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // 1. Forward Route Protection: Redirect unauthenticated requests targeting /profile to /signin
  if (!sessionCookie && pathname.startsWith("/profile")) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Reverse Route Protection: Redirect authenticated users away from /signin or /signup to homepage
  if (sessionCookie && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Matcher configuration for route segments intercepted by proxy
export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
