import { authOptions } from "@/config/authOptions";
import NextAuth from "next-auth/next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };