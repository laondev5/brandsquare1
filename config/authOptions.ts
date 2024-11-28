
// authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import { axiosInstance } from "./axios";
import { UserRole } from "@/types/next-auth";
// import { UserRole } from "./types/next-auth"; // Import from your type declaration file

interface AuthResponse {
  token: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      isVerified: boolean;
      role: UserRole;
    };
     status: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await axiosInstance.post<AuthResponse>(
            "https://brandsquare-backend.onrender.com/api/v1/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const user = res?.data.data.user;
          const token = res?.data?.token;
          console.log(token, 'token')
          console.log(user, 'user')

          if (user) {
            return {
              id: user._id, // Changed from _id to id to match NextAuth expectations
              name: user.name,
              email: user.email,
              role: user.role,
              accessToken: token,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60, // 2 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;

        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
        token.exp = expirationTime;
      }
      return token;
    },
    async session({ session, token }) {
      // Transfer the token data to the session object
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.accessToken = token.accessToken;

      return session;
    },
  },
};