"use client";

import Link from 'next/link';

// Custom 404 page following the global design system
export default function NotFound() {
  return (
    <div id="content">
      <main id="main">
        <article id="article">
          <header id="article-header">
            {/* Using a clear, semantic H1 for screen readers and SEO */}
            <h1 id="article-title">404 - Page Not Found</h1>
          </header>
          
          <div id="article-main" className="error-container">
            <p>
              Oops! The documentation page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="action-links">
              <Link href="/" className="btn-home">
                Return to Homepage
              </Link>
              <span style={{ margin: '0 10px' }}>or</span>
              <Link href="/languages" className="btn-languages">
                Explore Languages
              </Link>
            </div>
          </div>
        </article>
      </main>
      
      {/* Scope specific styles if not adding to global CSS */}
      <style jsx>{`
        .error-container {
          text-align: center;
          padding: 80px 20px;
        }
        .action-links {
          margin-top: 30px;
        }
        .btn-home {
          font-weight: bold;
          text-decoration: underline;
          color: rgb(50, 205, 50); /* Match your themeColor */
        }
      `}</style>
    </div>
  );
}