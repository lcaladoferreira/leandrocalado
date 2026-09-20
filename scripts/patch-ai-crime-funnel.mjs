import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve("dist");
const FUNNEL_PATH = "/ai-crime-files/who-is-liable-when-ai-commits-a-crime";
const FUNNEL_URL = `https://leandrocaladoferreira.com${FUNNEL_PATH}`;
// Preserve direct purchase links; the quiz is an optional resource.
const LASTMOD = "2026-09-20";

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

console.log("AI Crime discovery metadata updated; direct Amazon links preserved.");
