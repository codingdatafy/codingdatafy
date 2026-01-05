import { NextResponse } from 'next/server';

/**
 * CODINGDATAFY INFRASTRUCTURE MIDDLEWARE
 * Purpose: Handles Canonical URLs, Private Content Protection, and Security Headers.
 * * Note for contributors: This middleware is designed to work behind Cloudflare Proxy.
 * Changing the redirection logic may affect SEO and SSL certificates.
 */
export function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  // 1. CANONICAL URL ENFORCEMENT
  // Redirects www to non-www to ensure SEO consistency across the infrastructure
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    const url = request.nextUrl.clone();
    url.hostname = newHostname;
    return NextResponse.redirect(url, 301);
  }

  // 2. PRIVATE CONTENT SHIELD
  // Prevents direct access to internal Markdown or config files starting with '_'
  if (pathname.includes('/_')) {
    return new NextResponse(null, { status: 404 });
  }

  // 3. SECURITY RESPONSE HEADERS
  const response = NextResponse.next();
  
  // SAMEORIGIN allows the site to be embedded only within itself (prevents Clickjacking)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Branding/Debug Header to verify infrastructure optimization
  response.headers.set('x-infrastructure', 'codingdatafy-optimized');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};