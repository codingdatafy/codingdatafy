/** @type {import('next').NextConfig} */
const nextConfig = {
  // CORE SETTINGS
  reactStrictMode: true,
  poweredByHeader: false, // Security: Hide Next.js as the server technology

  // IMAGE OPTIMIZATION
  // Optimized for modern web standards and high-performance delivery via Cloudflare
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'], // AVIF is prioritized for supported browsers
  },

  // BUILD OPTIMIZATIONS
  // Note: We ignore errors during builds to maintain development velocity on the 'develop' branch
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // SECURITY & INFRASTRUCTURE HEADERS
  // These headers are aligned with Cloudflare WAF and Vercel Edge Network
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // HSTS: Enforces HTTPS for 1 year, including subdomains
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;