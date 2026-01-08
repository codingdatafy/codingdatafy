import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Centralized content directory path
const contentDirectory = path.join(process.cwd(), 'content');

/**
 * CODINGDATAFY MARKDOWN ENGINE
 * Responsibility: Resolves file paths, parses Frontmatter, and converts Markdown to HTML.
 * Optimized for hierarchical documentation structures.
 */

export async function getPageData(slugArray) {
  // 1. PATH RESOLUTION STRATEGY
  // Converts slug array to a relative string (e.g., ['js', 'array'] -> 'js/array')
  const relativePath = slugArray && slugArray.length > 0 ? slugArray.join('/') : 'index';
  
  // Strategy A: Check for directory-based index (e.g., /languages/javascript/index.md)
  let fullPath = path.join(contentDirectory, relativePath, 'index.md');

  // Strategy B: Check for file-based markdown (e.g., /languages/javascript.md)
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDirectory, `${relativePath}.md`);
  }

  // Graceful exit if no file matches the slug
  if (!fs.existsSync(fullPath)) {
    console.error(`[CodingDatafy Error] Path not found: ${fullPath}`);
    return null;
  }

  try {
    // 2. FILE PARSING
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 3. MARKDOWN TO HTML CONVERSION
    // We disable 'sanitize' to allow custom HTML/Components within markdown if needed.
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // 4. HIERARCHICAL SIDEBAR RESOLUTION
    // Locates the '_sidebar.md' in the current directory to provide contextual navigation.
    let sidebarHtml = null;
    const currentDir = path.dirname(fullPath);
    const sidebarPath = path.join(currentDir, '_sidebar.md');

    if (fs.existsSync(sidebarPath)) {
      const sidebarFile = fs.readFileSync(sidebarPath, 'utf8');
      const processedSidebar = await remark()
        .use(html, { sanitize: false })
        .process(sidebarFile);
      sidebarHtml = processedSidebar.toString();
    }

    // 5. STRUCTURED DATA RETURN
    return {
      slug: relativePath,
      contentHtml,
      sidebarHtml,
      meta: {
        title: data.title || 'CodingDatafy Documentation',
        description: data.description || 'Professional programming documentation and insights.',
        style: data.style || null,
        ...data // Spreading remaining metadata for future-proofing
      },
    };
  } catch (error) {
    console.error(`[CodingDatafy Engine] Processing failed for: ${relativePath}`, error);
    return null;
  }
}