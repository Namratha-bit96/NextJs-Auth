import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Trust Nginx HTTPS by checking forwarded proto
  const proto = request.headers.get('x-forwarded-proto');
  if (proto === 'http') {
    const url = request.nextUrl;
    url.protocol = 'https:';
    return NextResponse.redirect(url);
  }

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

  return NextResponse.next();
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
