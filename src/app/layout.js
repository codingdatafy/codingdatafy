import "@/styles/codingdatafy.css";

export const metadata = {
  viewport: 'width=device-width, initial-scale=1',
  themeColor: 'rgb(50 205 50)',
  colorScheme: 'only light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
                priority="true" // Similar to loading="eager"
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

          {/* This renders the content + sidebar from page.js */}
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
                  <img src="/images/github.png" alt="GitHub Icon" width="32" height="32" loading="lazy" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/codingdatafy" target="_blank" rel="external noopener noreferrer">
                  <img src="/images/facebook.png" alt="Facebook Icon" width="32" height="32" loading="lazy" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/codingdatafy" target="_blank" rel="external noopener noreferrer">
                  <img src="/images/instagram.png" alt="Instagram Icon" width="32" height="32" loading="lazy" />
                </a>
              </li>
              <li>
                <a href="https://www.x.com/codingdatafy" target="_blank" rel="external noopener noreferrer">
                  <img src="/images/x.png" alt="X Icon" width="32" height="32" loading="lazy" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/codingdatafy" target="_blank" rel="external noopener noreferrer">
                  <img src="/images/linkedin.png" alt="LinkedIn Icon" width="32" height="32" loading="lazy" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@codingdatafy" target="_blank" rel="external noopener noreferrer">
                  <img src="/images/youtube.png" alt="Youtube Icon" width="32" height="32" loading="lazy" />
                </a>
              </li>
            </ul>
            <p id="copyright">
              <small>Copyright © 2025 <span>CodingDatafy</span>. All Rights Reserved.</small>
            </p>
          </footer>
        </div>
        <script src="/scripts/codingdatafy.js"></script>
      </body>
    </html>
  );
}