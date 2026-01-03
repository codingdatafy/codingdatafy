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

  const currentPath = slug ? `/${slug.join('/')}` : '';
  const canonicalUrl = `${BASE_URL}${currentPath}`;

  return {
    title: data.meta.title ? `${data.meta.title} | CodingDatafy` : "CodingDatafy",
    description: data.meta.description || "Explore comprehensive and easy-to-follow documentation for various programming languages.",
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
      {/* Dynamic Style Injection */}
      {data.meta.style && (
        <link 
          rel="stylesheet" 
          href={`/styles/${data.meta.style}`} 
          precedence="high" 
        />
      )}

      {/* Sidebar Section */}
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

          {/* Footer section updated: Date display removed to simplify UI */}
          <footer id="article-footer">
            {/* Last Updated feature is currently disabled to focus on content growth */}
          </footer>
        </article>
      </main>

      {/* Global Site Script */}
      <Script 
        src="/scripts/codingdatafy.js" 
        strategy="afterInteractive" 
      />
    </div>
  );
}