// app/api/auth/[...nextauth]/auth.ts
import { UserRole } from "@/types/next-auth"
//import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"  // Import the singleton instance
import { compare } from "bcryptjs"
//import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  //adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter your email and password");
          }

          const user = await prisma.user.findUnique({
            where: { 
              email: credentials.email.toLowerCase().trim() 
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true
            }
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as UserRole
          };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Authentication failed");
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/error",
    signOut: "/"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
};