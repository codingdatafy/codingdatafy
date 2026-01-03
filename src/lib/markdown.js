import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * DEPRECATED: Fetches the last commit date from GitHub API.
 * Currently disabled to focus on content and avoid API rate limits.
 */
async function getGitHubLastUpdated(filePath) {
  // Feature temporarily disabled. 
  // We return null to ensure no misleading date is shown.
  return null;
}

/**
 * Main function to fetch and process page content
 * @param {string[]} slugArray - URL segments from Next.js
 */
export async function getPageData(slugArray) {
  // 1. Resolve the file path: join slugs or default to 'index'
  const relativePath = slugArray && slugArray.length > 0 ? slugArray.join('/') : 'index';
  
  let fullPath = path.join(contentDirectory, relativePath, 'index.md');

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDirectory, `${relativePath}.md`);
  }

  // Return null if page doesn't exist to trigger 404
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  // 2. Read and Parse Markdown Content
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // 3. Convert Markdown to HTML 
  const processedContent = await remark()
    .use(html, { sanitize: false }) 
    .process(content);
  const contentHtml = processedContent.toString();

  // 4. Sidebar Logic: Find the closest _sidebar.md
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

  return {
    slug: relativePath,
    contentHtml,
    sidebarHtml,
    meta: {
      title: data.title || 'CodingDatafy Documentation',
      description: data.description || '',
      style: data.style || '', 
      date: data.date || null,
      ...data
    },
  };
}