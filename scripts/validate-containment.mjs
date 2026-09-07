import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || 'dist';
const site = 'https://leandrocaladoferreira.com';
const slug = 'ai-agent-containment-failure';
const langs = ['en', 'pt', 'es', 'fr', 'it', 'ja'];
const prefix = (lang) => lang === 'en' ? '' : `/${lang}`;
const route = (lang) => `${prefix(lang)}/ai-crime-files/${slug}`;
const imagePath = `/images/ai-crime-files/${slug}.webp`;
const bytes = fs.readFileSync(path.join(root, imagePath));
assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
// Decode the real WebP bitstream dimensions, rather than trusting HTML declarations.
let dimensions;
for (let offset = 12; offset + 8 <= bytes.length;) {
  const type = bytes.toString('ascii', offset, offset + 4);
  const size = bytes.readUInt32LE(offset + 4);
  const start = offset + 8;
  assert(start + size <= bytes.length, 'Truncated WebP chunk');
  if (type === 'VP8X') dimensions = [1 + bytes.readUIntLE(start + 4, 3), 1 + bytes.readUIntLE(start + 7, 3)];
  if (type === 'VP8 ' && !dimensions) {
    assert.equal(bytes.toString('hex', start + 3, start + 6), '9d012a');
    dimensions = [bytes.readUInt16LE(start + 6) & 0x3fff, bytes.readUInt16LE(start + 8) & 0x3fff];
  }
  if (type === 'VP8L' && !dimensions) {
    const bits = bytes.readUInt32LE(start + 1);
    dimensions = [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
  }
  offset = start + size + (size % 2);
}
assert.deepEqual(dimensions, [1600, 900]);
assert(bytes.length < 300_000, 'Hero exceeds the 300 KB image budget');
assert.deepEqual(bytes, fs.readFileSync(path.join('public', imagePath)), 'Build image differs from committed source');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Duplicate sitemap URLs');
const rewrites = JSON.parse(fs.readFileSync('vercel.json', 'utf8')).rewrites;
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const read = url => fs.readFileSync(path.join(root, url + '.html'), 'utf8');
const getMeta = (html, key) => [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attrs(m[0])).filter(a => a.property === key || a.name === key);
const requiredMeta = {
  'og:type': 'article', 'og:image': site + imagePath, 'og:image:secure_url': site + imagePath,
  'og:image:type': 'image/webp', 'og:image:width': '1600', 'og:image:height': '900',
  'twitter:card': 'summary_large_image', 'twitter:image': site + imagePath,
};
for (const lang of langs) {
  const html = read(route(lang));
  assert(html.includes(`<html lang="${lang}">`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${lang}: one H1 required`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert(html.includes(`<link rel="canonical" href="${site + route(lang)}"`));
  for (const [key, value] of Object.entries(requiredMeta)) {
    const found = getMeta(html, key);
    assert.equal(found.length, 1, `${lang}: ${key} must appear once`);
    assert.equal(found[0].content, value, `${lang}: ${key}`);
  }
  for (const key of ['og:image:alt', 'twitter:image:alt', 'description']) assert(getMeta(html, key)[0]?.content.length > 20, `${lang}: ${key}`);
  assert(getMeta(html, 'robots')[0]?.content.includes('max-image-preview:large'));
  const img = [...html.matchAll(/<img\b[^>]*>/g)].map(m => attrs(m[0])).find(a => a.src === imagePath);
  assert(img && img.width === '1600' && img.height === '900' && img.fetchpriority === 'high' && img.alt.length > 20);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const article = graph.find(g => g['@type'] === 'TechArticle');
  assert(article && article.inLanguage === lang && article.mainEntityOfPage === site + route(lang));
  assert.equal(article.image['@type'], 'ImageObject');
  assert.equal(article.image.url, site + imagePath);
  assert.deepEqual([article.image.width, article.image.height], dimensions);
  assert(graph.some(g => g['@type'] === 'BreadcrumbList'));
  for (const alternate of [...langs, 'x-default']) {
    const dest = route(alternate === 'x-default' ? 'en' : alternate);
    assert(html.includes(`hreflang="${alternate}" href="${site + dest}"`), `${lang}: hreflang ${alternate}`);
    if (alternate !== 'x-default') assert(html.includes(`href="${dest}" hreflang="${alternate}" lang="${alternate}"`), `${lang}: visible language link ${alternate}`);
  }
  assert(sitemapUrls.includes(site + route(lang)));
  for (const name of ['llms.txt', 'llms-full.txt']) assert(fs.readFileSync(path.join(root, name), 'utf8').includes(site + route(lang)));
  const hub = `${prefix(lang)}/ai-crime-files`;
  assert(read(hub).includes(`href="${route(lang)}"`), `${lang}: missing prerendered hub link`);
  for (const item of ['agent-invented-humans-malware-github', 'vibe-hacking-data-extortion', 'ai-orchestrated-cyber-espionage', 'jadepuffer-autonomous-ai-ransomware']) {
    assert(read(`${hub}/${item}`).includes(`href="${route(lang)}"`), `${lang}: missing inbound link from ${item}`);
    assert(html.includes(`href="${hub}/${item}"`), `${lang}: missing related case`);
  }
  assert(html.includes('href="/books/harness-engineering-ai-coding-agents"'));
  assert(html.includes('https://www.amazon.com/dp/B0HHHDL9TB'));
  assert(html.includes('amazon_book_click'));
  // The intended Vercel rewrite must precede the SPA fallback and reach this file.
  const matching = rewrites.find(rule => new RegExp('^' + rule.source.replace(':slug', '[^/]+') + '$').test(route(lang)));
  assert.equal(matching?.destination, `${prefix(lang)}/ai-crime-files/:slug.html`, `${lang}: Vercel route`);
}
console.log(`Validated ${langs.length} articles, ${langs.length} hubs, 24 inbound case links, language navigation, sitemap, llms, schemas and WebP (${dimensions.join('x')}, ${bytes.length} bytes).`);
