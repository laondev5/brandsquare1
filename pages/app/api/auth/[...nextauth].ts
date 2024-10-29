import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"
import { Session } from "next-auth"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("No user found")
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
   strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page path
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: string | number | any }) {
      try {
        if (session.user && token.sub) {
          session.user.id = token.sub
        }
        return session
      } catch (error) {
        console.error("Error in session callback:", error) // Log the error for debugging
        throw new Error("Session callback error") // Throw a new error to indicate failure
      }
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
