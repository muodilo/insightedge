

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authToken } from "@/lib/auth/edge";

const protectedRoutes = ["/dashboard", "/dashboard/*"];

export async function middleware(request: NextRequest) {
  const session = await authToken(request);
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
