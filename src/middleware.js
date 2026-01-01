import { NextResponse } from 'next/server';

/**
 * Middleware to filter requests and handle security
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Prevent access to private content files (starting with _)
  // Example: prevent users from trying to access /_sidebar directly
  if (pathname.includes('/_')) {
    return new NextResponse(null, { status: 404 });
  }

  // 2. Security Headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};