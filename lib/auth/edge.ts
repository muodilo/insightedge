import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export const authToken = async (req: NextRequest) => {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // Add logging for debugging in production
    if (process.env.NODE_ENV === "development") {
      console.log("Auth token:", token ? "exists" : "null");
    }
    
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};