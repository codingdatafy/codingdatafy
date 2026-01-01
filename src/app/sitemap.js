import fs from 'fs';
import path from 'path';

/**
 * Configuration for the sitemap generation.
 */
const BASE_URL = 'https://www.codingdatafy.com';
const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Recursively scans the content directory to find all markdown files.
 * Skips files starting with an underscore (e.g., _sidebar.md).
 * * @param {string} dirPath - Current directory path to scan.
 * @param {string[]} arrayOfFiles - Accumulator for file paths.
 * @returns {string[]} List of all valid markdown file paths.
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.md') && !file.startsWith('_')) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

/**
 * Next.js Sitemap Generator (App Router).
 * Automatically generates a sitemap.xml for SEO purposes.
 */
export default function sitemap() {
    const files = getAllFiles(contentDirectory);

    const sitemapEntries = files.map((filePath) => {
        // Convert system file path to a clean URL path
        let relativePath = path.relative(contentDirectory, filePath)
            .replace(/\\/g, '/') // Ensure forward slashes for URLs
            .replace('.md', '')
            .replace(/\/index$/, ''); // Convert 'folder/index' to 'folder'

        // Define the final URL path. If it's the root index, keep it empty.
        const urlPath = relativePath === 'index' ? '' : `/${relativePath}`;
        
        // Retrieve file metadata for the lastModified field
        const stats = fs.statSync(filePath);
        
        /**
         * Dynamic priority logic:
         * - Root page: 1.0
         * - Main Language sections: 0.9
         * - Documentation sub-pages: 0.7
         */
        let priority = 0.7;
        if (urlPath === '') priority = 1.0;
        else if (urlPath.startsWith('/languages') && urlPath.split('/').length <= 3) priority = 0.9;

        return {
            url: `${BASE_URL}${urlPath}`,
            lastModified: stats.mtime.toISOString(), // Correct property and ISO format
            changeFrequency: 'weekly',
            priority: priority,
        };
    });

    return sitemapEntries;
}