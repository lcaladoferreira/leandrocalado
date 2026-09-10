import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || 'dist';
const site = 'https://leandrocaladoferreira.com';
const slug = 'ai-agent-security-checklist';
const langs = ['en', 'pt', 'es', 'fr', 'it', 'ja'];
const prefix = (lang) => lang === 'en' ? '' : `/${lang}`;
const route = (lang) => `${prefix(lang)}/harness-engineering/${slug}`;
const imagePath = `/images/harness-engineering/${slug}.webp`;
const bytes = fs.readFileSync(path.join(root, imagePath));

assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
let dimensions;
for (let offset = 12; offset + 8 <= bytes.length;) {
  const type = bytes.toString('ascii', offset, offset + 4);
  const size = bytes.readUInt32LE(offset + 4);
  const start = offset + 8;
  assert(start + size <= bytes.length, 'Truncated WebP chunk');
  if (type === 'VP8X') dimensions = [1 + bytes.readUIntLE(start + 4, 3), 1 + bytes.readUIntLE(start + 7, 3)];
  if (type === 'VP8 ' && !dimensions) dimensions = [bytes.readUInt16LE(start + 6) & 0x3fff, bytes.readUInt16LE(start + 8) & 0x3fff];
  if (type === 'VP8L' && !dimensions) { const bits = bytes.readUInt32LE(start + 1); dimensions = [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1]; }
  offset = start + size + (size % 2);
}
assert.deepEqual(dimensions, [1600, 900]);
assert(bytes.length < 300_000, 'Hero exceeds 300 KB');
assert.deepEqual(bytes, fs.readFileSync(path.join('public', imagePath)), 'Build image differs from committed source');

const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const meta = (html, key) => [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0])).filter((a) => a.property === key || a.name === key);
const read = (url) => fs.readFileSync(path.join(root, url + '.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Duplicate sitemap URLs');

for (const lang of langs) {
  const html = read(route(lang));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${lang}: expected one H1`);
  assert(html.includes(`<link rel="canonical" href="${site + route(lang)}"`));
  assert(meta(html, 'robots')[0]?.content.includes('max-image-preview:large'));
  const required = {
    'og:type': 'article', 'og:image': site + imagePath, 'og:image:secure_url': site + imagePath,
    'og:image:type': 'image/webp', 'og:image:width': '1600', 'og:image:height': '900',
    'twitter:card': 'summary_large_image', 'twitter:image': site + imagePath,
  };
  for (const [key, value] of Object.entries(required)) assert.equal(meta(html, key)[0]?.content, value, `${lang}: ${key}`);
  for (const key of ['description', 'og:image:alt', 'twitter:image:alt']) assert((meta(html, key)[0]?.content || '').length > 20, `${lang}: ${key}`);
  const img = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => attrs(m[0])).find((a) => a.src === imagePath);
  assert(img && img.width === '1600' && img.height === '900' && img.fetchpriority === 'high' && img.alt.length > 20);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const article = graph.find((node) => node['@type'] === 'TechArticle');
  assert(article && article.mainEntityOfPage === site + route(lang) && article.inLanguage === lang);
  assert.equal(article.image.url, site + imagePath);
  assert(graph.some((node) => node['@type'] === 'BreadcrumbList'));
  assert(graph.some((node) => node['@type'] === 'FAQPage'));
  for (const alt of [...langs, 'x-default']) {
    const dest = route(alt === 'x-default' ? 'en' : alt);
    assert(html.includes(`hreflang="${alt}" href="${site + dest}"`), `${lang}: hreflang ${alt}`);
  }
  assert(sitemapUrls.includes(site + route(lang)), `${lang}: sitemap`);
  for (const corpus of ['llms.txt', 'llms-full.txt']) assert(fs.readFileSync(path.join(root, corpus), 'utf8').includes(site + route(lang)));
  assert(html.includes('/books/harness-engineering-ai-coding-agents'));
  assert.equal((html.match(/<li class="border border-white\/10 p-6">/g) || []).length, 10, `${lang}: ten checks`);
  for (const source of ['https://arxiv.org/html/2609.07360','https://github.com/redhat-community-ai-tools/harness-eval','https://github.com/Benkapner/harness-eval-experiments']) assert(html.includes(source), `${lang}: source ${source}`);
}

const book = read('/books/harness-engineering-ai-coding-agents');
assert(book.includes('href="/harness-engineering/ai-agent-security-checklist"'));
assert(book.includes('https://www.amazon.com.br/dp/B0GYG3WG4Q'));
assert(book.includes('<title>Harness Engineering Book for AI Agents | Leandro Calado</title>'));

console.log(`Validated ${langs.length} AI agent security checklists, ten gates each, book cluster, hreflang, sitemap, schemas and WebP (${dimensions.join('x')}, ${bytes.length} bytes).`);
