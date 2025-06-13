import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    const isPubicPath = path === '/' || path === '/login' || path === '/signup' || path === '/verifyemail'

    const token= request.cookies.get('token')?.value || ''

  

    if (!isPubicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
 
}
 

export const config = {
  matcher: [
    '/',
    '/homepage',
    '/login',
    '/signup',
    '/verifyemail',
    '/products',
  ]
}