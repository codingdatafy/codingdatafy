import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Fetches the last commit date for a specific file from GitHub API
 * @param {string} filePath - Path to the file in the repo
 */
async function getGitHubLastUpdated(filePath) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/codingdatafy/codingdatafy/commits?path=${filePath}&page=1&per_page=1`,
      {
        next: { revalidate: 3600 } // Cache results for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      // Returns the date in YYYY-MM-DD format
      return data[0].commit.committer.date.split('T')[0];
    }
  } catch (error) {
    console.error("Failed to fetch GitHub date for:", filePath, error);
  }
  
  // Fallback: Using a static date or null instead of current date 
  // to avoid misleading users when the API fails.
  return "2026-01-01"; 
}

/**
 * Main function to fetch and process page content
 * @param {string[]} slugArray - URL segments from Next.js
 */
export async function getPageData(slugArray) {
  // 1. Resolve the file path: join slugs or default to 'index'
  const relativePath = slugArray && slugArray.length > 0 ? slugArray.join('/') : 'index';
  
  let fullPath = path.join(contentDirectory, relativePath, 'index.md');
  let repoPath = `content/${relativePath}/index.md`;

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDirectory, `${relativePath}.md`);
    repoPath = `content/${relativePath}.md`;
  }

  // Return null if page doesn't exist to trigger 404
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  // 2. Extract Automatic Date from GitHub API
  const autoDate = await getGitHubLastUpdated(repoPath);

  // 3. Read and Parse Markdown Content
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // 4. Convert Markdown to HTML 
  const processedContent = await remark()
    .use(html, { sanitize: false }) 
    .process(content);
  const contentHtml = processedContent.toString();

  // 5. Sidebar Logic: Find the closest _sidebar.md
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
      date: data.date || autoDate,
      ...data
    },
  };
}