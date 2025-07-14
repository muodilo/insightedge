import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authToken } from "@/lib/auth/edge";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  try {
    const session = await authToken(request);
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

 
    if (process.env.NODE_ENV === "development") {
      console.log(`Middleware: ${pathname}, Protected: ${isProtected}, Session: ${session ? "exists" : "null"}`);
    }

    if (isProtected && !session) {

      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
  ],
};