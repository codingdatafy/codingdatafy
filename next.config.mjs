/** * @type {import('next').NextConfig} 
 * CodingDatafy Main Configuration
 * Managed by CodingDatafy Organization
 */
const nextConfig = {
  // --- CORE SETTINGS ---
  // Enable React Strict Mode for highlighting potential problems in an application
  reactStrictMode: true,
  // Security: Remove the 'X-Powered-By' header to prevent leaking server information
  poweredByHeader: false, 

  // --- IMAGE OPTIMIZATION ---
  // Configured for high-performance delivery and security
  images: {
    dangerouslyAllowSVG: true, // Required for tech logos in documentation
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    // Trust specific remote sources for contributor assets
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },

  // --- BUILD & QUALITY ASSURANCE ---
  // Enforce code quality on production builds while maintaining dev speed
  eslint: { 
    ignoreDuringBuilds: process.env.NODE_ENV === 'development' 
  },
  typescript: { 
    ignoreBuildErrors: process.env.NODE_ENV === 'development' 
  },

  // --- INFRASTRUCTURE & FILE TRACING ---
  experimental: {
    // Ensure all markdown content is correctly traced and bundled during deployment
    outputFileTracingIncludes: {
      '/*': ['./content/**/*'],
    },
  },

  /**
   * Global HTTP Headers for Security and Performance
   * Aligned with Cloudflare WAF and Vercel Edge standards
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Pre-resolve DNS for faster cross-origin resource loading
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // Force HTTPS and include subdomains for maximum security
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // Prevent browsers from MIME-sniffing a response away from the declared content-type
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control how much referrer information is passed during navigation
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Prevent Clickjacking attacks
          { key: 'X-Frame-Options', value: 'DENY' },
          // Strict Permissions Policy to disable unneeded browser features
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ],
      },
    ];
  },
};

export default nextConfig;