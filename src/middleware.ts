import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value || "";
  const publicPath = [ "/signup", "/login"]  ;
  const isPublicPath = publicPath.includes(pathname)
  if (isPublicPath && token) {
    return NextResponse.redirect( new URL('/',request.nextUrl))
    
  }
 
  if (!isPublicPath && !token) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*',
  ]
}