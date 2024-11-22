import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequestWithAuth } from "next-auth/middleware"
import type { UserRole } from "@/types/next-auth"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl.pathname
    const token = request.nextauth.token
    
    // Define protected paths
    const protectedPaths = ['/admin', '/vendor']
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
    
    // If it's not a protected path, allow access
    if (!isProtectedPath) {
      return NextResponse.next()
    }

    // If it's a protected path and there's no token, redirect to login
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }

    // Role-based routing configuration
    const roleRoutes: Record<UserRole, string> = {
      admin: '/admin',
      vendor: '/vendor',
      customer: '/'
    }

    // Verify role-based access for protected paths
    const userRole = token.role as UserRole
    const allowedPath = roleRoutes[userRole]
    
    if (!pathname.startsWith(allowedPath)) {
      return NextResponse.redirect(new URL(allowedPath, request.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true // We handle authorization in the middleware function
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/vendor/:path*']
}