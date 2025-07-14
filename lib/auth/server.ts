// server.ts
import { getServerSession } from "next-auth";
import type { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { supabase } from "@/lib/supabase";

// Extend NextAuth types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    email?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          if (!email || !password) return null;

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error || !data.user) {
            console.error("Supabase auth error:", error);
            return null;
          }

          return {
            id: data.user.id,
            email: data.user.email,
            role: data.user.user_metadata?.role || "user",
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  // Add these important production settings
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Handle credentials provider
      if (user?.role) {
        token.role = user.role;
      }

      // Handle OAuth providers
      if (account && account.provider !== "credentials") {
        try {
          if (!token.email && profile?.email) {
            token.email = profile.email;
          }
          const email = token.email ?? "";
          

          const { data: existingUser } = await supabase
            .from('users') // Adjust table name as needed
            .select('role')
            .eq('email', email)
            .single();
          
          token.role = existingUser?.role || (email.endsWith("@gmail.com") ? "user" : "admin");
        } catch (error) {
          console.error("JWT callback error:", error);
          token.role = "user"; // Default fallback
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  
  debug: process.env.NODE_ENV === "development",
};

export const auth = () => getServerSession(authOptions);