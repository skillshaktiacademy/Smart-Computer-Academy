import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockCoursesData } from './src/features/public-site/data/coursesData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://www.smartcomputeracademy.in';

const staticPages = [
  '',
  '/about',
  '/contact',
  '/courses',
  '/gallery',
  '/franchise',
  '/student-result',
  '/verify-certificate',
  '/enquiry'
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  // 1. Static Pages
  staticPages.forEach((page) => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  });

  // 2. Dynamic Course Pages
  mockCoursesData.forEach((course) => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/courses/${course.slug}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    if (course.image) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${course.image.startsWith('http') ? course.image : SITE_URL + course.image}</image:loc>\n`;
      xml += `      <image:title>${course.title}</image:title>\n`;
      xml += '    </image:image>\n';
    }
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Sitemap generated successfully at: ${outputPath}`);
}

generateSitemap();
