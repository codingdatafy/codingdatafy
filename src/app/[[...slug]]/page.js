import { getPageData } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Script from 'next/script';

// Base URL for Canonical links (SEO)
const BASE_URL = 'https://www.codingdatafy.com';

/**
 * Dynamic Metadata Generation for SEO
 * Ensures every page has a title, canonical URL, and meta description.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) return {};

  // Construct the canonical URL for SEO indexing
  const currentPath = slug ? `/${slug.join('/')}` : '';
  const canonicalUrl = `${BASE_URL}${currentPath}`;

  return {
    // Appends brand name to the title for better recognition
    title: data.meta.title ? `${data.meta.title} | CodingDatafy` : "CodingDatafy",
    
    // Fallback description to ensure 100/100 SEO score if Markdown is missing description
    description: data.meta.description || "Explore comprehensive and easy-to-follow documentation for various programming languages. Master coding with our detailed guides, syntax references, and practical examples at CodingDatafy.",
    
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Universal Page Component: Renders Markdown content, Sidebars, and dynamic assets
 */
export default async function Page({ params }) {
  const { slug } = await params;
  const data = await getPageData(slug);

  // If page doesn't exist, trigger Next.js 404
  if (!data) notFound();

  return (
    <div id="content">
      {/* Dynamic Style Injection: 
        Uses precedence="high" to hoist the link to <head>, preventing FOUC and improving SEO.
      */}
      {data.meta.style && (
        <link 
          rel="stylesheet" 
          href={`/styles/${data.meta.style}`} 
          precedence="high" 
        />
      )}

      {/* Sidebar Section: Rendered only if sidebar content is available */}
      {data.sidebarHtml && (
        <aside id="sidebar" dangerouslySetInnerHTML={{ __html: data.sidebarHtml }} />
      )}

      {/* Main Content Area */}
      <main id="main">
        <article id="article">
          <header id="article-header">
            <h1 id="article-title">{data.meta.title}</h1>
          </header>
          
          {/* Main article body converted from Markdown to HTML */}
          <div id="article-main" dangerouslySetInnerHTML={{ __html: data.contentHtml }} />

          <footer id="article-footer">
            {/* Display Last Updated date if provided in Frontmatter */}
            {data.meta.date && (
              <p>
                <time dateTime={data.meta.date}>Last Updated: {data.meta.date}</time>
              </p>
            )}
          </footer>
        </article>
      </main>

      {/* Global Site Script: 
        Loaded after the page becomes interactive to optimize TBT and LCP metrics.
      */}
      <Script 
        src="/scripts/codingdatafy.js" 
        strategy="afterInteractive" 
      />
    </div>
  );
}