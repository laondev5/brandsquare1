// types/next-auth.d.ts

import { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

export type UserRole = "ADMIN" | "VENDOR" | "CUSTOMER"

declare module "next-auth" {
  interface User {
    id: string
    role: UserRole
    name?: string | null
    email?: string | null
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
      name?: string | null
      email?: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    role: UserRole
    name?: string | null
    email?: string | null
  }
}

export interface AuthCredentials {
  email: string
  password: string
}