import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve("dist");
const FUNNEL_PATH = "/ai-crime-files/who-is-liable-when-ai-commits-a-crime";
const FUNNEL_URL = `https://leandrocaladoferreira.com${FUNNEL_PATH}`;
const BOOK_ASIN = "B0HHHDL9TB";
const LASTMOD = "2026-09-16";

const labels = {
  en: "Investigate liability before reading",
  pt: "Investigue a responsabilidade antes de ler",
  es: "Investiga la responsabilidad antes de leer",
  fr: "Examinez la responsabilité avant de lire",
  it: "Esamina la responsabilità prima di leggere",
  ja: "読む前に責任の所在を検証する",
};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function languageFor(relativePath) {
  const first = relativePath.split("/")[0];
  return Object.hasOwn(labels, first) ? first : "en";
}

function patchBookAnchors(html, label) {
  const anchorPattern = new RegExp(
    `<a\\s+([^>]*href=["'][^"']*${BOOK_ASIN}[^"']*["'][^>]*)>[\\s\\S]*?<\\/a>`,
    "gi",
  );

  // Keep the original Amazon purchase CTA. Offer the free case as an
  // additional route, never as a replacement for the purchase link.
  return html.replace(anchorPattern, (original) => {
    const freeCase = `<a href="${FUNNEL_PATH}" data-ai-funnel="liability" data-mcp-action="open-ai-liability-case" data-mcp-description="Read the AI liability case and free chapter">${label}</a>`;
    return `${original} ${freeCase}`;
  });
}

let patchedPages = 0;
for (const file of walk(DIST_DIR)) {
  if (!file.endsWith(".html")) continue;
  const relative = path.relative(DIST_DIR, file).split(path.sep).join("/");
  if (!relative.includes("ai-crime-files")) continue;
  if (relative.endsWith("who-is-liable-when-ai-commits-a-crime.html")) continue;

  const original = fs.readFileSync(file, "utf8");
  if (!original.includes(BOOK_ASIN)) continue;

  const patched = patchBookAnchors(original, labels[languageFor(relative)]);
  if (patched !== original) {
    fs.writeFileSync(file, patched);
    patchedPages += 1;
  }
}

const sitemapPath = path.join(DIST_DIR, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  if (!sitemap.includes(`<loc>${FUNNEL_URL}</loc>`)) {
    const entry = `\n  <url>\n    <loc>${FUNNEL_URL}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    sitemap = sitemap.replace(/<\/urlset>\s*$/i, `${entry}</urlset>\n`);
    fs.writeFileSync(sitemapPath, sitemap);
  }
}

const discoveryBlock = `\n\n## AI Crime Files — Liability & Free Chapter\n- ${FUNNEL_URL}\n- Interactive liability case based on Case 001, followed by a complete free chapter from Nobody Told It to Lie.\n`;
for (const filename of ["llms.txt", "llms-full.txt"]) {
  const target = path.join(DIST_DIR, filename);
  if (!fs.existsSync(target)) continue;
  const content = fs.readFileSync(target, "utf8");
  if (!content.includes(FUNNEL_URL)) fs.appendFileSync(target, discoveryBlock);
}

const landingPath = path.join(
  DIST_DIR,
  "ai-crime-files",
  "who-is-liable-when-ai-commits-a-crime.html",
);
if (fs.existsSync(landingPath)) {
  let landing = fs.readFileSync(landingPath, "utf8");
  landing = landing.replace(
    '"author":{"@type":"Person","name":"Leandro Calado"}',
    '"author":{"@type":"Person","name":"Leandro Calado Ferreira","alternateName":"Leandro Calado","url":"https://leandrocaladoferreira.com/"}',
  );
  if (!landing.includes('<meta name="author" content="Leandro Calado Ferreira">')) {
    landing = landing.replace(
      "</head>",
      '<meta name="author" content="Leandro Calado Ferreira"><meta property="og:site_name" content="The AI Crime Files — Leandro Calado Ferreira"></head>',
    );
  }
  landing = landing.replace(
    "<footer>THE AI CRIME FILES · CASE 001 · LEANDRO CALADO</footer>",
    '<footer>THE AI CRIME FILES · CASE 001 · <a href="/">LEANDRO CALADO FERREIRA</a></footer>',
  );
  fs.writeFileSync(landingPath, landing);
}

console.log(`AI Crime funnel patch complete: ${patchedPages} static page(s) updated.`);
