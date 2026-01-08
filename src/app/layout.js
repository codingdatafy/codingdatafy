import "@/styles/codingdatafy.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * CODINGDATAFY ROOT LAYOUT
 * Purpose: Centralizes SEO, Global UI components (Header/Footer), and Performance monitoring.
 * Note: Google Analytics is managed via Cloudflare Zaraz to optimize client-side performance.
 */

export const metadata = {
  title: {
    default: "CodingDatafy | Documentation & Insights",
    template: "%s | CodingDatafy"
  },
  description: "High-performance documentation for 99% of coding languages. Built for developers by CodingDatafy Organization.",
  metadataBase: new URL('https://www.codingdatafy.com'),
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#32CD32', // LimeGreen for brand consistency
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Search Console Verification */}
        <meta name="google-site-verification" content="KZMiUBpTZfkZsUt47NLT88ssUsu9hFOez6aaHVBvLqg" />
        
        {/* Favicon and Identity */}
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body>
        <div id="root">
          {/* APPLICATION HEADER */}
          <header id="header">
            <a href="/" id="logo">
              <img 
                src="/images/logo.png" 
                alt="CodingDatafy Logo" 
                width="368" 
                height="77" 
                priority="true" // Critical for LCP optimization
              />
            </a>
            <nav id="navigation">
              <ul>
                <li><a href="/">Homepage</a></li>
                <li><a href="/languages">Languages</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </nav>
          </header>

          {/* DYNAMIC CONTENT AREA */}
          <main id="main-content">
            {children}
          </main>

          {/* APPLICATION FOOTER */}
          <footer id="footer">
            <nav id="footer-nav">
              <ul id="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/terms-of-use">Terms of Use</a></li>
                <li><a href="/privacy-policy">Privacy policy</a></li>
                <li><a href="/contribute">Contribute</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </nav>
            
            <ul id="social-networks">
              <li>
                <a href="https://github.com/codingdatafy" target="_blank" rel="noopener noreferrer">
                  <img src="/images/github.png" alt="GitHub" width="32" height="32" loading="lazy" />
                </a>
              </li>
            </ul>

            <p id="copyright">
              <small>Copyright © 2026 <strong>CodingDatafy</strong>. All Rights Reserved.</small>
            </p>
          </footer>
        </div>

        {/* PERFORMANCE MONITORING (Vercel Edge) */}
        <Analytics />
        <SpeedInsights />

        {/* DEFERRED CLIENT SCRIPTS */}
        <script src="/scripts/codingdatafy.js" defer></script>
      </body>
    </html>
  );
}