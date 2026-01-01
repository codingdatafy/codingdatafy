'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an analytics service or console
    console.error(error);
  }, [error]);

  return (
    <div id="content">
      <main id="main">
        <article id="article">
          <header id="article-header">
            <h1 id="article-title">Something went wrong!</h1>
          </header>
          <div id="article-main" style={{ textAlign: 'center', padding: '50px 20px' }}>
            <p>An unexpected error occurred while loading this page.</p>
            <button
              onClick={() => reset()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: 'rgb(50 205 50)',
                border: 'none',
                color: 'white'
              }}
            >
              Try again
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}