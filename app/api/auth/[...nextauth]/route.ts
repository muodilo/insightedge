import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/server";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
