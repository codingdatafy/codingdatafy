"use client";

import Link from 'next/link';

/**
 * Custom 404 Error Page.
 * This component is rendered when a user navigates to a non-existent route.
 * It follows the project's global design system for consistency.
 */
export default function NotFound() {
  return (
    <div id="content">
      <main id="main">
        <article id="article">
          <header id="article-header">
            {/* Semantic H1 for accessibility and SEO branding */}
            <h1 id="article-title">404 - Page Not Found</h1>
          </header>
          
          <div id="article-main" className="error-container">
            <p>
              Oops! The documentation page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="action-links">
              {/* Primary navigation action */}
              <Link href="/" className="btn-home">
                Return to Homepage
              </Link>
              
              <span style={{ margin: '0 10px' }}>or</span>
              
              {/* Secondary navigation action to keep users on site */}
              <Link href="/languages" className="btn-languages">
                Explore Languages
              </Link>
            </div>
          </div>
        </article>
      </main>
      
      {/* Component-level styles for 404-specific layout */}
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
          color: rgb(50, 205, 50); /* Matches the CodingDatafy brand lime green */
        }
        .btn-languages {
           text-decoration: underline;
           color: inherit;
        }
      `}</style>
    </div>
  );
}