import { NextResponse } from 'next/server';

/**
 * CODINGDATAFY LIGHTWEIGHT MIDDLEWARE
 * Focuses only on logic that Infrastructure (Cloudflare/Vercel) cannot handle.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. SHIELD INTERNAL FILES
  // Protects private components (_sidebar.md) and raw markdown files.
  // This is essential to prevent users from accessing raw data.
  if (pathname.includes('/_') || pathname.endsWith('.md')) {
    return new NextResponse(null, { status: 404 });
  }

  // 2. PASS-THROUGH
  // Everything else (Redirection, HSTS, SSL) is handled by Cloudflare/Vercel settings.
  return NextResponse.next();
}

/**
 * Performance Optimization: Only run middleware for documentation pages.
 */
export const config = {
  matcher: [
    /*
     * Match all paths except static assets to minimize Edge Function invocations.
     */
    '/((?!api|_next/static|_next/image|images|scripts|styles|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};