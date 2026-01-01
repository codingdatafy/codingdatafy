import "@/styles/codingdatafy.css";
// 1. Import Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  viewport: 'width=device-width, initial-scale=1',
  themeColor: 'rgb(50 205 50)',
  colorScheme: 'only light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 2. Google Search Console Verification */}
        <meta name="google-site-verification" content="KZMiUBpTZfkZsUt47NLT88ssUsu9hFOez6aaHVBvLqg" />

        {/* 3. Google Analytics (GA4) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-8GJDFYFWT2`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8GJDFYFWT2');
            `,
          }}
        />

        <link rel="terms-of-service" href="/terms-of-use" />
        <link rel="privacy-policy" href="/privacy-policy" />
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body>
        <div id="root">
          <header id="header">
            <a href="/" id="logo">
              <img 
                src="/images/logo.png" 
                alt="CodingDatafy Logo" 
                width="368" 
                height="77" 
                priority="true" 
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

          {/* Page Content */}
          {children}

          <footer id="footer">
            <ul id="footer-links">
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms-of-use">Terms of Use</a></li>
              <li><a href="/privacy-policy">Privacy policy</a></li>
              <li><a href="/contribute">Contribute</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
            
            <ul id="social-networks">
              <li>
                <a href="https://www.github.com/codingdatafy" target="_blank" rel="external noopener noreferrer">
                  <img src="/images/github.png" alt="GitHub" width="32" height="32" loading="lazy" />
                </a>
              </li>
              {/* other social links */}
            </ul>

            <p id="copyright">
              <small>Copyright © 2026 <span>CodingDatafy</span>. All Rights Reserved.</small>
            </p>
          </footer>
        </div>

        {/* 4. Vercel Analytics Component */}
        <Analytics />

        <script src="/scripts/codingdatafy.js"></script>
      </body>
    </html>
  );
}
