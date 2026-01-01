/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better debugging and standard compliance
  reactStrictMode: true,

  // Image optimization settings for social icons and SVG support
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security: Remove the X-Powered-By header
  poweredByHeader: false,

  // Allow production builds to succeed even if there are ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;