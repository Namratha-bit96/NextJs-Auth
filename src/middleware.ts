import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/homepage',
    '/products',
  ];

  const isPublicPath = publicPaths.includes(path);
  const token = request.cookies.get('token')?.value || '';

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next(); // Ensure request proceeds when no redirect
}

export const config = {
  matcher: [
    '/',
    '/homepage',
    '/login',
    '/signup',
    '/verifyemail',
    '/products',
  ],
};
