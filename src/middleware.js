import { NextResponse } from 'next/server';

/**
 * CODINGDATAFY INFRASTRUCTURE MIDDLEWARE
 * * Purpose: 
 * 1. Canonical URL Enforcement: Redirects non-www to www for SEO consistency.
 * 2. Private Content Shield: Protects internal Markdown and configuration files.
 * 3. Security Headers: Implements best practices for web security (Clickjacking, Sniffing).
 * * Note for contributors: 
 * This middleware is optimized for Vercel + Cloudflare (Full Strict) environments.
 * If you change the redirection logic, ensure it matches the Primary Domain in Vercel Settings.
 */

export function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  // 1. CANONICAL URL ENFORCEMENT (Force WWW)
  // Ensures all production traffic is served via https://www.codingdatafy.com
  // We exclude localhost and Vercel preview URLs to prevent development environment issues.
  const isProduction = !hostname.includes('localhost') && !hostname.includes('vercel.app');
  
  if (isProduction && !hostname.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.hostname = `www.${hostname}`;
    return NextResponse.redirect(url, 301);
  }

  // 2. PRIVATE CONTENT SHIELD
  // Denies public access to internal files or directories starting with '_' (e.g., /_content, /_config)
  if (pathname.includes('/_')) {
    return new NextResponse(null, { status: 404 });
  }

  // 3. SECURITY RESPONSE HEADERS
  const response = NextResponse.next();
  
  // X-Frame-Options: Prevents the site from being embedded in iframes (Anti-Clickjacking)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // X-Content-Type-Options: Prevents browsers from interpreting files as a different MIME type
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer-Policy: Controls how much referrer information is passed when navigating away
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Infrastructure Branding: Custom header for debugging and infrastructure verification
  response.headers.set('x-infrastructure', 'codingdatafy-optimized');

  return response;
}

/**
 * Middleware Matcher Configuration
 * Filters out static assets and internal Next.js paths for better performance.
 */
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