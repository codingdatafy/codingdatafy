import { getPageData } from "@/lib/markdown";
import { notFound } from "next/navigation";

/**
 * CODINGDATAFY DYNAMIC PAGE RENDERER
 * Purpose: Fetches Markdown content based on the URL slug and renders it into the UI.
 * Features: Metadata generation, Sidebar injection, and Dynamic Style loading.
 */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) return {};

  // Construct page-specific SEO attributes
  const title = data.meta.title;
  const description = data.meta.description || "Master programming with CodingDatafy's expert-led documentation.";

  return {
    title: title, // This will be wrapped by the template in layout.js
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://www.codingdatafy.com/${slug?.join('/') || ''}`,
      siteName: 'CodingDatafy',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await getPageData(slug);

  // Trigger Next.js native 404 if data fetch fails
  if (!data) notFound();

  return (
    <div id="page-container" className="documentation-layout">
      {/* DYNAMIC COMPONENT STYLES
          Loaded only when a specific markdown file requests a custom style. */}
      {data.meta.style && (
        <link 
          rel="stylesheet" 
          href={`/styles/${data.meta.style}`} 
          precedence="high" 
        />
      )}

      {/* SIDEBAR NAVIGATION
          Rendered only if a _sidebar.md exists in the directory. */}
      {data.sidebarHtml && (
        <aside id="sidebar" className="docs-sidebar">
          <nav dangerouslySetInnerHTML={{ __html: data.sidebarHtml }} />
        </aside>
      )}

      {/* PRIMARY CONTENT AREA */}
      <main id="main" className="docs-main">
        <article id="article" className="prose-optimized">
          <header id="article-header">
            <h1 id="article-title">{data.meta.title}</h1>
          </header>
          
          {/* MAIN BODY
              Converted Markdown content with safe HTML injection. */}
          <section 
            id="article-body" 
            dangerouslySetInnerHTML={{ __html: data.contentHtml }} 
          />
        </article>
      </main>
    </div>
  );
}