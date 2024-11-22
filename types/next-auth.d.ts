// types/next-auth.d.ts

import { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"
//import { PrismaClient } from '@prisma/client'


export type UserRole = "admin" | "vendor" | "customer"



declare module "next-auth" {
 export interface User {
    id: string
    role: UserRole
    name?: string | null
    email?: string | null
    phoneNumber?: string | null
  }

  interface Session extends DefaultSession {
    accessToken: string,
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
export interface User {
  id?: string
  role: UserRole
  name?: string | null
  email?: string | null
  phoneNumber?: string | null
  password?: string | null
}