import { containmentCopy, containmentHref, containmentImage } from "./src/aiCrimeExplainers";
import { whistleblowingCopy, whistleblowingHref, whistleblowingImage, whistleblowingPath } from "./src/agentWhistleblowingExplainer";
import { museSentinelCopy, museSentinelHref, museSentinelImage, museSentinelPath } from "./src/metaMuseSentinelExplainer";
import { harnessChecklistCopy, harnessChecklistHref, harnessChecklistImage, harnessChecklistPath } from "./src/harnessSecurityChecklist";
import * as fs from "fs";
import * as path from "path";
import { booksData } from "./src/data";
import { articlesData } from "./src/articlesData";
import { AI_CRIME_BASE_PATH, AI_CRIME_BOOK_URL, AICrimeLanguage, aiCrimeCases, getLocalizedAICrimePath } from "./src/aiCrimeData";
import { aiCrimeUi, localizeAICrimeCase, localizeAICrimeCases } from "./src/aiCrimeI18n";

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;");

const crimeLanguages: AICrimeLanguage[] = ["en", "pt", "es", "fr", "it", "ja"];

const localizedPagePath = (pagePath: string, language: AICrimeLanguage) => {
  if (pagePath.startsWith(AI_CRIME_BASE_PATH)) return getLocalizedAICrimePath(pagePath, language);
  return language === "en" ? pagePath : `/${language}${pagePath}`;
};

const crimeAlternates = (path: string) => [
  ...crimeLanguages.map((language) => ({ language, href: `https://leandrocaladoferreira.com${localizedPagePath(path, language)}` })),
  { language: "x-default", href: `https://leandrocaladoferreira.com${localizedPagePath(path, "en")}` },
];

const renderCrimeBookCTA = (language: AICrimeLanguage) => {
  const t = aiCrimeUi[language];
  return `
  <aside class="border border-red-500/25 bg-[#111] p-8 mt-12">
    <p class="font-mono text-[9px] font-bold uppercase tracking-widest text-red-400">${escapeHtml(t.bookEyebrow)}</p>
    <h2 class="font-serif text-3xl font-light italic text-white mt-2">Nobody Told It to Lie</h2>
    <p class="text-sm leading-relaxed text-gray-400 mt-3 max-w-2xl">${escapeHtml(t.bookDescription)}</p>
    <a href="${AI_CRIME_BOOK_URL}" target="_blank" rel="noopener noreferrer sponsored" data-mcp-action="buy-ai-crime-files-book" data-mcp-description="Open the official Amazon page for Nobody Told It to Lie by Leandro Calado" class="inline-block bg-red-600 px-5 py-3 mt-5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">${escapeHtml(t.readAmazon)}</a>
  </aside>
`;
};

const renderContainmentLink = (language: AICrimeLanguage, showImage = false) => {
  const copy = containmentCopy[language];
  return `<aside class="border border-red-500/25 p-6 mt-12 bg-[#101010]">
    ${showImage ? `<img src="${containmentImage}" width="1600" height="900" loading="lazy" alt="${escapeHtml(copy.alt)}" class="aspect-video w-full max-w-lg object-cover mb-6" />` : ''}
    <p class="text-xs text-red-400">${escapeHtml(copy.label)}</p>
    <h2 class="font-serif text-3xl text-white mt-3"><a href="${containmentHref(language)}">${escapeHtml(copy.title)}</a></h2>
    <p class="text-sm text-gray-400 mt-3">${escapeHtml(copy.description)}</p>
    <a href="${containmentHref(language)}" class="inline-block text-red-400 mt-5">${escapeHtml(copy.read)} &rarr;</a>
  </aside>`;
};

const renderWhistleblowingLink = (language: AICrimeLanguage, showImage = false) => {
  const copy = whistleblowingCopy[language];
  return `<aside class="border border-red-500/25 p-6 mt-12 bg-[#101010]">
    ${showImage ? `<img src="${whistleblowingImage}" width="1600" height="900" loading="lazy" alt="${escapeHtml(copy.alt)}" class="aspect-video w-full max-w-lg object-cover mb-6" />` : ''}
    <p class="text-xs text-red-400">${escapeHtml(copy.label)}</p>
    <h2 class="font-serif text-3xl text-white mt-3"><a href="${whistleblowingHref(language)}">${escapeHtml(copy.title)}</a></h2>
    <p class="text-sm text-gray-400 mt-3">${escapeHtml(copy.description)}</p>
    <a href="${whistleblowingHref(language)}" class="inline-block text-red-400 mt-5">${escapeHtml(copy.read)} &rarr;</a>
  </aside>`;
};

const renderMuseSentinelLink = (language: AICrimeLanguage, showImage = false) => {
  const copy = museSentinelCopy[language];
  return `<aside class="border border-amber-500/25 p-6 mt-12 bg-[#101010]">
    ${showImage ? `<img src="${museSentinelImage}" width="1600" height="900" loading="lazy" alt="${escapeHtml(copy.alt)}" class="aspect-video w-full max-w-lg object-cover mb-6" />` : ''}
    <p class="text-xs text-amber-400">${escapeHtml(copy.label)}</p>
    <h2 class="font-serif text-3xl text-white mt-3"><a href="${museSentinelHref(language)}">${escapeHtml(copy.title)}</a></h2>
    <p class="text-sm text-gray-400 mt-3">${escapeHtml(copy.description)}</p>
    <a href="${museSentinelHref(language)}" class="inline-block text-amber-400 mt-5">${escapeHtml(copy.read)} &rarr;</a>
  </aside>`;
};

const renderHarnessChecklistLink = (language: AICrimeLanguage, showImage = false) => {
  const copy = harnessChecklistCopy[language];
  return `<aside class="border border-[#F27D26]/30 p-6 mt-12 bg-[#101010]">
    ${showImage ? `<img src="${harnessChecklistImage}" width="1600" height="900" loading="lazy" alt="${escapeHtml(copy.alt)}" class="aspect-video w-full object-cover mb-6" />` : ''}
    <p class="text-xs text-[#F27D26]">${escapeHtml(copy.eyebrow)}</p>
    <h2 class="font-serif text-3xl text-white mt-3"><a href="${harnessChecklistHref(language)}">${escapeHtml(copy.title)}</a></h2>
    <p class="text-sm text-gray-400 mt-3">${escapeHtml(copy.description)}</p>
    <a href="${harnessChecklistHref(language)}" class="inline-block text-[#F27D26] mt-5">Open the checklist &rarr;</a>
  </aside>`;
};

const crimeIndexRoutes = crimeLanguages.map((language) => {
  const t = aiCrimeUi[language];
  const cases = localizeAICrimeCases(aiCrimeCases, language);
  const routePath = getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language);
  return {
    path: routePath,
    title: `${t.archiveName} | ${language === "en" ? "Documented Autonomous AI Crime" : t.heroEyebrow}`,
    description: t.heroDescription,
    canonical: `https://leandrocaladoferreira.com${routePath}`,
    schemaType: `AICrimeIndex:${language}`,
    language,
    alternates: crimeAlternates(AI_CRIME_BASE_PATH),
    htmlContent: `
    <section class="bg-[#090909] text-white px-6 py-24">
      <div class="max-w-6xl mx-auto">
        <span class="font-mono text-[10px] font-bold uppercase tracking-widest text-red-400">${escapeHtml(t.heroEyebrow)}</span>
        <h1 class="font-serif text-6xl font-light italic leading-tight mt-5">${escapeHtml(t.archiveName)}</h1>
        <p class="text-lg leading-relaxed text-gray-400 mt-6 max-w-2xl">${escapeHtml(t.heroDescription)}</p>
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
          ${cases.map((item) => `
            <article class="border border-white/10 bg-[#101010] p-6">
              <span class="font-mono text-[9px] font-bold uppercase tracking-widest text-red-400">${escapeHtml(t.caseLabel)} ${item.caseNumber}</span>
              <h2 class="font-serif text-2xl font-light italic leading-tight text-white mt-4">${escapeHtml(item.shortTitle)}</h2>
              <p class="text-xs leading-relaxed text-gray-400 mt-3">${escapeHtml(item.excerpt)}</p>
              <a href="${getLocalizedAICrimePath(`${AI_CRIME_BASE_PATH}/${item.slug}`, language)}" class="inline-block font-mono text-[9px] font-bold uppercase tracking-widest text-red-400 mt-6">${escapeHtml(t.openFile)} &rarr;</a>
            </article>
          `).join("")}
        </div>
        <section class="grid lg:grid-cols-2 gap-6">${renderHarnessChecklistLink(language, true)}${renderMuseSentinelLink(language, true)}${renderWhistleblowingLink(language, true)}${renderContainmentLink(language, true)}</section>
        <section class="border-y border-white/10 py-12 mt-16">
          <h2 class="font-serif text-3xl font-light italic text-white">${escapeHtml(t.archiveCriteria)}</h2>
          <ol class="grid md:grid-cols-2 gap-4 mt-6">${t.criteria.map((criterion) => `<li class="border border-white/10 p-4 text-sm text-gray-400">${escapeHtml(criterion)}</li>`).join("")}</ol>
        </section>
        <section class="mt-16"><h2 class="font-serif text-3xl font-light italic text-white">${escapeHtml(t.faqTitle)}</h2>${t.faq.map((item) => `<div class="mt-6"><h3 class="text-lg text-white">${escapeHtml(item.question)}</h3><p class="text-sm leading-relaxed text-gray-400 mt-2">${escapeHtml(item.answer)}</p></div>`).join("")}</section>
        ${renderCrimeBookCTA(language)}
      </div>
    </section>
  `,
  };
});

const crimeArticleRoutes = crimeLanguages.flatMap((language) => aiCrimeCases.map((baseItem) => {
  const item = localizeAICrimeCase(baseItem, language);
  const t = aiCrimeUi[language];
  const basePath = `${AI_CRIME_BASE_PATH}/${item.slug}`;
  const routePath = getLocalizedAICrimePath(basePath, language);
  const archivePath = getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language);
  return {
  path: routePath,
  title: `${item.title} | ${t.archiveName}`,
  description: item.excerpt,
  canonical: `https://leandrocaladoferreira.com${routePath}`,
  schemaType: `AICrime:${language}:${item.slug}`,
  ogType: "article",
  image: item.featuredImage ? {
    url: `https://leandrocaladoferreira.com${item.featuredImage.url}`,
    width: item.featuredImage.width,
    height: item.featuredImage.height,
    type: item.featuredImage.type,
    alt: item.title,
  } : undefined,
  language,
  alternates: crimeAlternates(basePath),
  htmlContent: `
    <article class="bg-[#090909] text-white px-6 py-20">
      <div class="max-w-4xl mx-auto">
        <a href="${archivePath}" class="font-mono text-[9px] font-bold uppercase tracking-widest text-gray-500">&larr; ${escapeHtml(t.allFiles)}</a>
        <div class="mt-10"><span class="bg-red-600 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-widest">${escapeHtml(t.caseLabel)} ${item.caseNumber}</span></div>
        <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-7">${escapeHtml(item.kicker)}</p>
        <h1 class="font-serif text-5xl font-light italic leading-tight mt-4">${escapeHtml(item.title)}</h1>
        <p class="text-lg leading-relaxed text-gray-400 mt-6">${escapeHtml(item.excerpt)}</p>
        ${item.featuredImage ? `<figure class="mt-10 overflow-hidden border border-white/10 bg-[#101010]"><img src="${item.featuredImage.url}" alt="${escapeHtml(item.title)}" width="${item.featuredImage.width}" height="${item.featuredImage.height}" fetchpriority="high" class="aspect-video w-full object-cover" /></figure>` : ""}
        <dl class="grid sm:grid-cols-3 border border-white/10 mt-10">
          <div class="p-5 border-r border-white/10"><dt class="font-mono text-[8px] uppercase text-gray-600">${escapeHtml(t.criminalConduct)}</dt><dd class="text-xs text-gray-300 mt-2">${escapeHtml(item.criminalConduct)}</dd></div>
          <div class="p-5 border-r border-white/10"><dt class="font-mono text-[8px] uppercase text-gray-600">${escapeHtml(t.autonomy)}</dt><dd class="text-xs text-gray-300 mt-2">${escapeHtml(item.autonomy)}</dd></div>
          <div class="p-5"><dt class="font-mono text-[8px] uppercase text-gray-600">${escapeHtml(t.legalStatus)}</dt><dd class="text-xs text-gray-300 mt-2">${escapeHtml(item.legalStatus)}</dd></div>
        </dl>
        <div class="mt-14">
          ${item.sections.map((section, index) => `
            <section class="mb-12">
              <span class="font-mono text-[9px] font-bold text-red-500">0${index + 1}</span>
              <h2 class="font-serif text-3xl font-light italic text-white mt-2">${escapeHtml(section.heading)}</h2>
              <div class="space-y-5 text-[15px] leading-7 text-gray-300 mt-5">
                ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
                ${section.bullets ? `<ul class="border-l border-red-500/40 pl-5 space-y-3 text-sm text-gray-400">${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}
              </div>
            </section>
          `).join("")}
        </div>
        <section class="border-t border-white/10 pt-10">
          <h2 class="font-serif text-3xl font-light italic text-white">${escapeHtml(t.evidenceDesk)}</h2>
          <div class="space-y-3 mt-6">
            ${item.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-sm text-gray-300">${escapeHtml(source.label)} <span class="text-red-400">• ${escapeHtml(source.publisher)} • ${source.kind} source</span></a>`).join("")}
          </div>
        </section>
        <section class="grid lg:grid-cols-2 gap-6">${renderHarnessChecklistLink(language)}${renderMuseSentinelLink(language)}${renderContainmentLink(language)}${renderWhistleblowingLink(language)}</section>
        ${renderCrimeBookCTA(language)}
      </div>
    </article>
  `,
  };
}));

const whistleblowingRoutes = crimeLanguages.map((language) => {
  const copy = whistleblowingCopy[language];
  const routePath = whistleblowingHref(language);
  const archivePath = getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language);
  const languageLinks = crimeLanguages.map((lang) => `<a href="${whistleblowingHref(lang)}" hreflang="${lang}" lang="${lang}" class="border border-white/10 px-3 py-2 text-xs text-gray-300">${lang.toUpperCase()}</a>`).join('');
  return {
    path: routePath,
    title: copy.title,
    description: copy.description,
    canonical: `https://leandrocaladoferreira.com${routePath}`,
    schemaType: `HarnessExplainer:${language}`,
    ogType: 'article',
    image: { url: `https://leandrocaladoferreira.com${whistleblowingImage}`, width: 1600, height: 900, type: 'image/webp', alt: copy.alt },
    language,
    alternates: crimeAlternates(whistleblowingPath),
    htmlContent: `<article class="bg-[#090909] text-white px-6 py-20"><div class="max-w-4xl mx-auto">
      <a href="${archivePath}" class="font-mono text-xs uppercase text-gray-500">&larr; The AI Crime Files</a>
      <p class="font-mono text-xs uppercase text-red-400 mt-10">${escapeHtml(copy.label)}</p>
      <h1 class="font-serif text-5xl font-light italic leading-tight mt-4">${escapeHtml(copy.title)}</h1>
      <p class="text-lg leading-relaxed text-gray-300 mt-6">${escapeHtml(copy.directAnswer)}</p>
      <figure class="mt-10"><img src="${whistleblowingImage}" alt="${escapeHtml(copy.alt)}" width="1600" height="900" fetchpriority="high" class="aspect-video w-full object-cover" /><figcaption class="text-xs text-gray-500 mt-2">Original editorial illustration. The research described below was a controlled experiment.</figcaption></figure>
      <p class="border-l-4 border-amber-500 bg-amber-500/5 p-5 text-sm text-amber-100 mt-8"><strong>Evidence classification:</strong> ${escapeHtml(copy.classification)}</p>
      <nav aria-label="Languages" class="flex flex-wrap gap-2 mt-8">${languageLinks}</nav>
      <div class="mt-14">${copy.sections.map((section, index) => `<section class="mb-12"><span class="font-mono text-xs text-red-500">0${index + 1}</span><h2 class="font-serif text-3xl text-white mt-2">${escapeHtml(section.heading)}</h2><div class="space-y-5 text-[15px] leading-7 text-gray-300 mt-5">${section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}${section.bullets ? `<ul class="border-l border-red-500/40 pl-6 space-y-3">${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}</div></section>`).join('')}</div>
      <section class="border-t border-white/10 pt-10"><h2 class="font-serif text-3xl text-white">Sources</h2><div class="space-y-3 mt-6"><a href="https://arxiv.org/html/2609.04170v1" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Primary paper · Google DeepMind researchers · September 3, 2026</a><a href="https://indianexpress.com/article/technology/artificial-intelligence/ai-agents-google-deepmind-paper-key-findings-10868387/" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Independent coverage · The Indian Express · September 8, 2026</a></div></section>
      <section class="mt-12"><h2 class="font-serif text-3xl text-white">FAQ</h2>${copy.faq.map((item) => `<details class="border border-white/10 p-5 mt-4"><summary class="cursor-pointer text-lg">${escapeHtml(item.question)}</summary><p class="text-gray-300 mt-3">${escapeHtml(item.answer)}</p></details>`).join('')}</section>
      <aside class="grid md:grid-cols-3 gap-5 mt-12"><a href="${harnessChecklistHref(language)}" class="border border-[#F27D26]/30 p-6"><strong class="text-[#F27D26]">Security checklist</strong><span class="block text-white mt-2">10 Harness Engineering checks before production</span></a><a href="${containmentHref(language)}" class="border border-red-500/25 p-6"><strong class="text-red-400">Related analysis</strong><span class="block text-white mt-2">${escapeHtml(containmentCopy[language].title)}</span></a><a href="/books/harness-engineering-ai-coding-agents" class="border border-red-500/25 p-6"><strong class="text-red-400">Harness Engineering</strong><span class="block text-white mt-2">Production controls for AI coding agents</span></a></aside>
      ${renderCrimeBookCTA(language)}
    </div></article>`,
  };
});

const museSentinelRoutes = crimeLanguages.map((language) => {
  const copy = museSentinelCopy[language];
  const routePath = museSentinelHref(language);
  const archivePath = getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language);
  const languageLinks = crimeLanguages.map((lang) => `<a href="${museSentinelHref(lang)}" hreflang="${lang}" lang="${lang}" class="border border-white/10 px-3 py-2 text-xs text-gray-300">${lang.toUpperCase()}</a>`).join('');
  return {
    path: routePath, title: copy.title, description: copy.description,
    canonical: `https://leandrocaladoferreira.com${routePath}`,
    schemaType: `MuseSentinel:${language}`, ogType: 'article', language,
    image: { url: `https://leandrocaladoferreira.com${museSentinelImage}`, width: 1600, height: 900, type: 'image/webp', alt: copy.alt },
    alternates: crimeAlternates(museSentinelPath),
    htmlContent: `<article class="bg-[#090909] text-white px-6 py-20"><div class="max-w-4xl mx-auto">
      <a href="${archivePath}" class="font-mono text-xs uppercase text-gray-500">&larr; The AI Crime Files</a>
      <p class="font-mono text-xs uppercase text-amber-400 mt-10">${escapeHtml(copy.label)}</p>
      <h1 class="font-serif text-5xl font-light italic leading-tight mt-4">${escapeHtml(copy.title)}</h1>
      <p class="text-lg leading-relaxed text-gray-300 mt-6">${escapeHtml(copy.directAnswer)}</p>
      <figure class="mt-10"><img src="${museSentinelImage}" alt="${escapeHtml(copy.alt)}" width="1600" height="900" fetchpriority="high" class="aspect-video w-full object-cover" /><figcaption class="text-xs text-gray-500 mt-2">Original editorial illustration · September 9, 2026</figcaption></figure>
      <p class="border-l-4 border-amber-500 bg-amber-500/5 p-5 text-sm text-amber-100 mt-8"><strong>Evidence classification:</strong> ${escapeHtml(copy.classification)}</p>
      <nav aria-label="Languages" class="flex flex-wrap gap-2 mt-8">${languageLinks}</nav>
      <div class="mt-14">${copy.sections.map((section, index) => `<section class="mb-12"><span class="font-mono text-xs text-amber-500">0${index + 1}</span><h2 class="font-serif text-3xl text-white mt-2">${escapeHtml(section.heading)}</h2><div class="space-y-5 text-[15px] leading-7 text-gray-300 mt-5">${section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}${section.bullets ? `<ul class="border-l border-amber-500/40 pl-6 space-y-3">${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}</div></section>`).join('')}</div>
      <section class="border-t border-white/10 pt-10"><h2 class="font-serif text-3xl text-white">Sources</h2><div class="space-y-3 mt-6"><a href="https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Primary architecture report · Meta AI Research · September 8, 2026</a><a href="https://www.reuters.com/business/meta-launches-ai-agent-that-can-access-other-apps-send-emails-make-payments-2026-09-08/" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Independent reporting · Reuters · September 8, 2026</a><a href="https://www.wired.com/story/meta-releases-muse-a-personal-ai-agent-with-privacy-built-into-it/" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Independent technical coverage · WIRED · September 8, 2026</a><a href="https://apnews.com/article/meta-muse-ai-agent-3a4572eb4cf4e95d8a0dfdad6e6ca065" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Independent launch coverage · Associated Press · September 8, 2026</a></div></section>
      <section class="mt-12"><h2 class="font-serif text-3xl text-white">FAQ</h2>${copy.faq.map((item) => `<details class="border border-white/10 p-5 mt-4"><summary class="cursor-pointer text-lg">${escapeHtml(item.question)}</summary><p class="text-gray-300 mt-3">${escapeHtml(item.answer)}</p></details>`).join('')}</section>
      <aside class="grid md:grid-cols-3 gap-5 mt-12"><a href="${harnessChecklistHref(language)}" class="border border-[#F27D26]/30 p-6"><strong class="text-[#F27D26]">Security checklist</strong><span class="block text-white mt-2">10 Harness Engineering checks before production</span></a><a href="${containmentHref(language)}" class="border border-red-500/25 p-6"><strong class="text-red-400">Related analysis</strong><span class="block text-white mt-2">${escapeHtml(containmentCopy[language].title)}</span></a><a href="/books/harness-engineering-ai-coding-agents" class="border border-amber-500/25 p-6"><strong class="text-amber-400">Harness Engineering book</strong><span class="block text-white mt-2">Permissions, sandboxes, approval gates and production controls</span></a></aside>
      ${renderCrimeBookCTA(language)}
    </div></article>`,
  };
});

const harnessChecklistRoutes = crimeLanguages.map((language) => {
  const copy = harnessChecklistCopy[language];
  const routePath = harnessChecklistHref(language);
  const languageLinks = crimeLanguages.map((lang) => `<a href="${harnessChecklistHref(lang)}" hreflang="${lang}" lang="${lang}" class="border border-white/10 px-3 py-2 text-xs text-gray-300">${lang.toUpperCase()}</a>`).join('');
  return {
    path: routePath, title: copy.title, description: copy.description,
    canonical: `https://leandrocaladoferreira.com${routePath}`,
    schemaType: `HarnessChecklist:${language}`, ogType: 'article', language,
    image: { url: `https://leandrocaladoferreira.com${harnessChecklistImage}`, width: 1600, height: 900, type: 'image/webp', alt: copy.alt },
    alternates: crimeAlternates(harnessChecklistPath),
    htmlContent: `<article class="bg-[#090909] text-white px-6 py-20"><div class="max-w-5xl mx-auto">
      <a href="/books/harness-engineering-ai-coding-agents" class="font-mono text-xs uppercase text-gray-500">Harness Engineering book &larr;</a>
      <p class="font-mono text-xs uppercase text-[#F27D26] mt-10">${escapeHtml(copy.eyebrow)}</p>
      <h1 class="font-serif text-5xl font-light italic leading-tight mt-4">${escapeHtml(copy.title)}</h1>
      <p class="text-lg leading-relaxed text-gray-300 mt-6">${escapeHtml(copy.intro)}</p>
      <figure class="mt-10"><img src="${harnessChecklistImage}" alt="${escapeHtml(copy.alt)}" width="1600" height="900" fetchpriority="high" class="aspect-video w-full object-cover" /><figcaption class="text-xs text-gray-500 mt-2">Original editorial illustration · September 10, 2026</figcaption></figure>
      <p class="border-l-4 border-amber-500 bg-amber-500/5 p-5 text-sm text-amber-100 mt-8"><strong>Evidence classification:</strong> ${escapeHtml(copy.classification)}</p>
      <nav aria-label="Languages" class="flex flex-wrap gap-2 mt-8">${languageLinks}</nav>
      <section class="mt-14 border border-white/10 bg-[#101010] p-7"><h2 class="font-serif text-3xl">What the study measured</h2><p class="text-gray-300 leading-7 mt-4">${escapeHtml(copy.findings)}</p><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7"><div class="border border-white/10 p-4"><strong class="text-2xl text-[#F27D26]">3,171</strong><span class="block text-xs text-gray-500 mt-1">repositories</span></div><div class="border border-white/10 p-4"><strong class="text-2xl text-[#F27D26]">16.0%</strong><span class="block text-xs text-gray-500 mt-1">security defect</span></div><div class="border border-white/10 p-4"><strong class="text-2xl text-[#F27D26]">9.8%</strong><span class="block text-xs text-gray-500 mt-1">unpinned MCP</span></div><div class="border border-white/10 p-4"><strong class="text-2xl text-[#F27D26]">3.8%</strong><span class="block text-xs text-gray-500 mt-1">skill pre-approved shell</span></div></div></section>
      <section class="mt-14"><h2 class="font-serif text-4xl">The 10 production checks</h2><ol class="mt-8 space-y-5">${copy.checks.map((check, i) => `<li class="border border-white/10 p-6"><div class="flex gap-5"><strong class="font-mono text-[#F27D26]">${String(i + 1).padStart(2, '0')}</strong><div><h3 class="text-xl text-white">${escapeHtml(check.title)}</h3><p class="text-gray-300 mt-3 leading-7"><strong>Test:</strong> ${escapeHtml(check.test)}</p><p class="text-sm text-gray-500 mt-2"><strong>Evidence:</strong> ${escapeHtml(check.evidence)}</p></div></div></li>`).join('')}</ol></section>
      <section class="mt-14"><h2 class="font-serif text-3xl">Threat path: from installation to side effect</h2><div class="grid md:grid-cols-5 gap-3 mt-6 text-center text-sm"><div class="border border-white/10 p-4">Marketplace artifact</div><div class="border border-white/10 p-4">Harness configuration</div><div class="border border-white/10 p-4">Agent context</div><div class="border border-white/10 p-4">Tool authority</div><div class="border border-red-500/30 p-4 text-red-300">External side effect</div></div><p class="text-gray-400 mt-5 leading-7">A secure harness places independent checks between every step. Reviewing the model alone cannot detect a package that changes later, a skill that carries shell permission, or an approval that authorizes more than the user saw.</p></section>
      <section class="mt-14 border-t border-white/10 pt-10"><h2 class="font-serif text-3xl">Primary evidence and reproducibility</h2><div class="space-y-3 mt-6"><a href="https://arxiv.org/html/2609.07360" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Primary paper · Scanning the Harness · September 7, 2026</a><a href="https://github.com/redhat-community-ai-tools/harness-eval" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Released scanner · harness-eval</a><a href="https://github.com/Benkapner/harness-eval-experiments" target="_blank" rel="noopener noreferrer" class="block border border-white/10 p-4 text-gray-300">Study artifact · corpus, verdicts and regeneration scripts</a></div></section>
      <section class="mt-14"><h2 class="font-serif text-3xl">FAQ</h2>${copy.faq.map((item) => `<details class="border border-white/10 p-5 mt-4"><summary class="cursor-pointer text-lg">${escapeHtml(item.question)}</summary><p class="text-gray-300 mt-3">${escapeHtml(item.answer)}</p></details>`).join('')}</section>
      <aside class="mt-14 border border-[#F27D26]/30 bg-[#101010] p-8"><p class="font-mono text-xs uppercase text-[#F27D26]">From checklist to production system</p><h2 class="font-serif text-3xl mt-3">Harness Engineering for AI Coding Agents</h2><p class="text-gray-300 mt-4 max-w-2xl">Use the free checklist now. For the complete system—task contracts, permission boundaries, validators, CI gates, memory control and recovery—continue with Leandro Calado's practical book.</p><a href="/books/harness-engineering-ai-coding-agents" data-mcp-action="open-harness-engineering-book" class="inline-block bg-[#F27D26] px-5 py-3 mt-6 text-xs font-bold uppercase">See the Harness Engineering book</a></aside>
    </div></article>`
  };
});

// Absolute routes to pre-render
const routes = [
  {
    path: "/",
    title: "Leandro Calado Ferreira — Engenheiro de Dados, IA Aplicada & Harness Engineering",
    description: "Portfolio de Leandro Calado Ferreira: Engenheiro de Dados, AI Systems Architect e Autor Técnico Internacional com mais de 116 livros publicados, incluindo temas como Harness Engineering, IA e Data Engineering.",
    canonical: "https://leandrocaladoferreira.com/",
    schemaType: "Home",
    htmlContent: `
      <!-- Hero Section -->
      <section class="min-h-[85vh] flex flex-col justify-center py-20 px-6">
        <div class="max-w-7xl mx-auto w-full">
          <span class="text-[#F27D26] font-bold text-xs uppercase tracking-widest block mb-4">Engenheiro de Dados • Autor Técnico Internacional • Harness Engineering</span>
          <h1 class="text-4xl sm:text-6xl md:text-7xl font-light italic mb-6 leading-tight font-serif text-white">
            Preenchendo a lacuna entre<br>
            <span class="text-[#F27D26]">Engenharia de Dados</span> e <span class="text-gray-400">Harness Engineering</span>
          </h1>
          <p class="text-gray-400 text-lg max-w-2xl mb-12 leading-relaxed">
            Especialista em Model Context Protocol (MCP), orquestrações de IA com n8n, segurança analítica de LLMs e robustez de decisões. Autor de 116 livros técnicos publicados na Amazon KDP em quatro idiomas.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="/start-here" class="px-6 py-4 border border-[#F5F5F0] text-[#F5F5F0] hover:bg-white hover:text-black font-semibold uppercase tracking-widest text-xs transition-colors rounded-sm">Comece por aqui</a>
            <a href="/books" class="px-6 py-4 border border-rose-500/20 text-[#F27D26] hover:border-[#F27D26]/40 font-semibold uppercase tracking-widest text-xs transition-colors rounded-sm">Ver Biblioteca</a>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/about",
    title: "Sobre Leandro Calado Ferreira — Trajetória Profissional & Acadêmica",
    description: "Conheça Leandro Calado Ferreira, Engenheiro de Dados, AI Systems Architect e Autor Técnico Internacional. Pós-graduado pela USP, com foco em modelagem de dados distribuídos, Harness Engineering, regulamentações aeroespaciais e liderança em projetos analíticos.",
    canonical: "https://leandrocaladoferreira.com/about",
    schemaType: "About",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-3xl mx-auto">
          <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Trajetória e Propósito</span>
          <h1 class="text-4xl sm:text-5xl font-light italic mt-3 mb-8 font-serif">Leandro Calado Ferreira</h1>
          <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
            <p><strong>Liderança Interdisciplinar:</strong> Engenheiro de Dados, AI Systems Architect e pós-graduado de MBA de Data Science pela USP e Software Development pelo IGTI. Estudando no pós-graduado da Johns Hopkins em IA Agente e Model Context Protocol (MCP).</p>
            <p>Especialista consagrado no tráfego de dados massivos, otimização de clusters Databricks, desenvolvimento de esteiras PySpark de altíssimo volume no Itaú Unibanco, automação integrada comercial usando IA e conformação estrita com Harness Engineering e a segurança contra Prompt Injections.</p>
            <p>Como autor internacional de mais de 116 livros, consolidou resultados factuais na difusão de metodologias práticas de automação, cloud computing e governança de tecnologia.</p>
          </div>
          <div class="mt-12 text-left">
            <a href="/" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">&larr; Voltar para o Início</a>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/start-here",
    title: "Comece Por Aqui — Hub de Navegação Semântica — Leandro Calado",
    description: "Inicie sua jornada no ecossistema técnico e jurídico de Leandro Calado Ferreira. Explore os hubs voltados para engenharia de dados em nuvem, agentes de inteligência artificial aplicados e blindagem regulatória corporativa.",
    canonical: "https://leandrocaladoferreira.com/start-here",
    schemaType: "Start",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Comece por Aqui</span>
            <h1 class="text-3xl sm:text-4xl font-light italic mt-3 mb-4 font-serif">Ecossistema de Conhecimento</h1>
            <p class="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">Tome contato com os principais núcleos profissionais de pesquisa e implementações executivas desenvolvidas sob os padrões de excelência de Leandro Calado.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-8 bg-[#0F0F0F] border border-[#2A2A2A] rounded-sm hover:border-[#F27D26]/40 transition-colors">
              <h3 class="text-lg italic font-serif text-white mb-2">IA Aplicada em Produção</h3>
              <p class="text-gray-400 text-xs mb-4">Arquitetura de sistemas multi-agentes baseados em MCP (Model Context Protocol) e automações visuais inteligentes em fluxos integrados com n8n.</p>
              <a href="/ai-agents" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">Acessar Hub Semântico &rarr;</a>
            </div>
            <div class="p-8 bg-[#0F0F0F] border border-[#2A2A2A] rounded-sm hover:border-[#F27D26]/40 transition-colors">
              <h3 class="text-lg italic font-serif text-white mb-2">Engenharia de Dados em Nuvem</h3>
              <p class="text-gray-400 text-xs mb-4">Pipelines robustos com AWS Glue, PySpark, Athena e governança centralizada de Big Data no Databricks e Azure.</p>
              <a href="/data-engineering" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">Acessar Hub Semântico &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/books",
    title: "Biblioteca Técnica Internacional (116 Livros) — Leandro Calado Ferreira",
    description: "Explore os manuais publicados por Leandro Calado Ferreira na Amazon KDP sobre IA Agente, Engenharia de Dados, AWS, Databricks, Big Data e Conformidade Legal de Negócios. Todos com links de compra direta.",
    canonical: "https://leandrocaladoferreira.com/books",
    schemaType: "Books",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Amazon Kindle KDP</span>
            <h1 class="text-4xl font-light italic mt-3 mb-4 font-serif">Biblioteca Técnica Internacional</h1>
            <p class="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">Padrões de projeto pragmáticos e manuais em 4 idiomas que pavimentam o entendimento de Engenharia de Dados de Alto Performance e Automações de Tecnologia.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${booksData.map((book, idx) => `
              <div class="p-8 bg-[#0F0F0F] border border-[#2A2A2A] rounded-sm flex flex-col justify-between hover:border-[#F27D26]/40 transition-all">
                <div>
                  <div class="flex justify-between mb-4">
                    <span class="text-3xl">${book.coverEmoji}</span>
                    <span class="text-[10px] font-mono text-[#F27D26] uppercase border border-[#F27D26]/20 px-2 py-0.5 rounded-sm">${book.lang}</span>
                  </div>
                  <h3 class="text-lg italic font-serif text-white mb-2 leading-snug">${book.title}</h3>
                  <p class="text-xs text-gray-400 mb-6 leading-relaxed">${book.description}</p>
                </div>
                <a href="${book.link}" target="_blank" rel="noopener noreferrer" class="w-full text-center py-2.5 bg-[#F27D26]/10 text-[#F27D26] text-[10px] font-mono uppercase font-bold tracking-widest border border-[#F27D26]/20 hover:bg-[#F27D26] hover:text-white transition-all rounded-sm block">Comprar na Amazon</a>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/articles",
    title: "Artigos e Ensaios Publicados — Leandro Calado Ferreira — Jusbrasil & Medium",
    description: "Dossiê de ensaios analíticos publicados por Leandro Calado Ferreira no Jusbrasil e na plataforma Medium. Mais de 100 mil visualizações em temas como fomento mercantil, evolução aéroespacial e inovações com algoritmos de IA.",
    canonical: "https://leandrocaladoferreira.com/articles",
    schemaType: "Articles",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Publicações de Alto Tráfego</span>
            <h1 class="text-4xl font-light italic mt-3 mb-4 font-serif">Ensaios & Artigos de Referência</h1>
            <p class="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">Unindo a visão minuciosa do Direito Digital com análises estatísticas para diagnosticar o panorama contemporâneo de sistemas protegidos e marcos institucionais.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${articlesData.map((art, idx) => `
              <div class="p-8 bg-[#0F0F0F] border border-[#2A2A2A] rounded-sm flex flex-col justify-between hover:border-[#F27D26]/40 transition-all">
                <div>
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-gray-500">${art.category}</span>
                    <span class="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-white/15 text-[#F27D26] rounded-sm">${art.platform}</span>
                  </div>
                  <h3 class="text-base italic font-serif text-white mb-3 hover:text-[#F27D26] transition-colors leading-snug">${art.title}</h3>
                  <p class="text-xs text-gray-400 mb-6 leading-relaxed">${art.excerpt}</p>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[10px] font-mono text-gray-500">${art.views ? `👁️ ${art.views} views` : `👏 ${art.claps || 0} claps`}</span>
                  <a href="${art.link}" target="_blank" rel="noopener noreferrer" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">Ler Publicação &rarr;</a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/consulting",
    title: "Consultoria Arquitetônica & Blindagem Tecnológica — Leandro Calado",
    description: "Contrate assessoria especializada de Leandro Calado Ferreira: implantação segura de engenharia de dados em nuvem, robôs e workflows automatizados integrando LLMs via n8n e auditorias regulatórias sob premissas estritas da LGPD.",
    canonical: "https://leandrocaladoferreira.com/consulting",
    schemaType: "Consulting",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-16">
            <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Consultoria Estratégica</span>
            <h1 class="text-4xl font-light italic mt-3 mb-4 font-serif">LCF Consulting</h1>
            <p class="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">Orientando companhias no desenvolvimento seguro de engenharia analítica de dados e blindagem tecnológica.</p>
          </div>
          <div class="grid grid-cols-1 gap-8 mb-16">
            <div class="p-8 bg-[#0F0F0F] border border-[#2A2A2A] rounded-sm">
              <h3 class="text-xl italic font-serif text-[#F27D26] mb-3">Escopo de Atuação Profissional</h3>
              <ul class="space-y-4 text-xs text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-[#F27D26] font-bold">&bull;</span>
                  <span><strong>Data Lakes & Data mesh:</strong> Otimização de queries financeiras massivas e modelagem Delta Lake em Azure Databricks e AWS Glue.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[#F27D26] font-bold">&bull;</span>
                  <span><strong>AI Systems Alignment:</strong> Projeto de agentes cognitivos baseados em Model Context Protocol (MCP) e barreiras defensivas contra Prompt Injections.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[#F27D26] font-bold">&bull;</span>
                  <span><strong>Auditoria regulatória por Design:</strong> Mapeamento do ciclo de vida de dados corporativas sob premissas legais da LGPD.</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-400 mb-6 font-mono">Contato Direto para Arquiteturas Comerciais</p>
            <a href="mailto:leandrocalado.api@gmail.com" class="px-8 py-4 bg-[#F27D26] text-white text-[11px] uppercase font-mono tracking-widest font-bold rounded-sm border border-[#F27D26] hover:bg-transparent hover:text-[#F27D26] transition-colors">Solicitar Orçamento Executivo</a>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/ai-agents",
    title: "IA Aplicada em Produção — Hub Semântico — Leandro Calado Ferreira",
    description: "Análise analítica e implementações de Model Context Protocol (MCP), orquestrações avançadas com n8n, engenharia de prompts estruturada e governança de agentes autônomos sob controles rigorosos.",
    canonical: "https://leandrocaladoferreira.com/ai-agents",
    schemaType: "SemanticHub",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-3xl mx-auto">
          <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Hub Semântico de Produção</span>
          <h1 class="text-4xl font-light italic mt-3 mb-6 font-serif">IA Aplicada em Produção</h1>
          <div class="prose prose-invert text-gray-300 text-sm leading-relaxed space-y-6">
            <p>O <strong>Model Context Protocol (MCP)</strong> surge como o padrão tecnológico de maior relevância recente para descentralizar o processamento cognitivo de IA, conectando modelos generativos sofisticados de linguagem a bases locais e remotas sem complexidades.</p>
            <p>Ao integrar servidores de contexto em sandboxes restritas, evitamos vulnerabilidades graves inerentes ao tráfego de dados sensíveis e mitigamos as perdas operacionais.</p>
            <h3 class="text-lg italic font-serif text-white mt-8 mb-3">Modelando Sistemas Multi-Agentes com Segurança</h3>
            <p>Por meio de orquestradores flexíveis como <strong>n8n</strong>, modelamos fluxos estruturados que dispensam o desenvolvimento exaustivo base de APIs em Python. A arquitetura multi-agente robusta requer testes exaustivos de engenharia preventiva de inputs e controle absoluto sobre transações delegadas.</p>
          </div>
          <div class="mt-12 text-left">
            <a href="/start-here" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">&larr; Voltar ao Começo</a>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/data-engineering",
    title: "Engenharia de Dados em Nuvem — Hub Semântico — Leandro Calado Ferreira",
    description: "Arquitetura distribuída de Big Data. Implementação de pipelines ETL/ELT otimizados usando Apache Spark, Databricks Lakehouses (Delta Lake), AWS Glue PySpark jobs e centralização estatística de dados.",
    canonical: "https://leandrocaladoferreira.com/data-engineering",
    schemaType: "SemanticHub",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-3xl mx-auto">
          <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Hub Semântico de Engenharia</span>
          <h1 class="text-4xl font-light italic mt-3 mb-6 font-serif">Engenharia de Dados em Nuvem</h1>
          <div class="prose prose-invert text-gray-300 text-sm leading-relaxed space-y-6">
            <p>A engenharia analítica em grande escala ampara-se no processamento paralelo sobre frameworks de altíssima eficiência operacional como o <strong>Apache Spark</strong> e nas arquiteturas robustas do <strong>Databricks</strong>.</p>
            <p>No desenvolvimento de pipelines empresariais, consolidamos o conceito de <strong>Lakehouse</strong>, organizando o ciclo de vida dos dados em partições estanques (Bronze, Silver e Gold) em buckets dedicados no Amazon S3 ou no ADLS Gen2 da Azure, estruturados com o formato Delta Lake.</p>
            <h3 class="text-lg italic font-serif text-white mt-8 mb-3">Otimização Operacional e FinOps em Big Data</h3>
            <p>No Itaú Unibanco, a consolidação estrutural de Glue PySpark Jobs permitiu otimizações expressivas que reduziram os custos de instâncias Athena e clusters, provando que o redesenho preventivo possui maior impacto orçamentário do que o mero escalonamento vertical.</p>
          </div>
          <div class="mt-12 text-left">
            <a href="/start-here" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">&larr; Voltar ao Começo</a>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/safe-ai",
    title: "Segurança de Sistemas com IA — Hub Semântico — Leandro Calado Ferreira",
    description: "Análise técnica de vulnerabilidades em modelos de linguagem grande (LLM), perigos de Prompt Injection indireto e a fabricação de guardrails dedicados de segurança e harnesses de testes analíticos.",
    canonical: "https://leandrocaladoferreira.com/safe-ai",
    schemaType: "SemanticHub",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-3xl mx-auto">
          <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Hub Semântico de Cibersegurança</span>
          <h1 class="text-4xl font-light italic mt-3 mb-6 font-serif">Segurança de Sistemas com IA</h1>
          <div class="prose prose-invert text-gray-300 text-sm leading-relaxed space-y-6">
            <p>O advento de agentes inteligentes que interpretam conteúdos livres e páginas externas cria rotas propícias para o vetor de ameaça moderno denominado <strong>Prompt Injection indireto</strong>.</p>
            <p>Para mitigar riscos, a engenharia de segurança desenvolve <strong>harnesses de testes rigorosos</strong> que atacam exaustivamente a resiliência gramatical do modelo em ambientes controlados (sandboxing), forçando saídas sanitizadas de dados antes de sua integração física com APIs de decisão operacional ou faturamento comercial.</p>
          </div>
          <div class="mt-12 text-left">
            <a href="/start-here" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">&larr; Voltar ao Começo</a>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/automation",
    title: "Automação Industrial de Processos & N8N — Leandro Calado Ferreira",
    description: "Explore como otimizar workflows corporativos e monetizar tarefas online conectando faturamentos do Stripe e rotinas webhooks usando lógica de automação n8n sem código excessivo.",
    canonical: "https://leandrocaladoferreira.com/automation",
    schemaType: "SemanticHub",
    htmlContent: `
      <section class="py-24 px-6 text-[#F5F5F0]">
        <div class="max-w-3xl mx-auto">
          <span class="text-[#F27D26] uppercase font-bold text-[10px] tracking-widest">Hub de Otimização Operacional</span>
          <h1 class="text-4xl font-light italic mt-3 mb-6 font-serif">Automação de Processos Industriais</h1>
          <div class="prose prose-invert text-gray-300 text-sm leading-relaxed space-y-6">
            <p>Automações de fluxos corporativos robustos baseiam-se em designs escaláveis e tolerantes a falhas. Integrando <strong>n8n</strong>, APIs transacionais de billing como <strong>Stripe</strong> e robôs autônomos, liberamos gargalos operacionais e maximizamos margens operacionais de times de tecnologia.</p>
          </div>
          <div class="mt-12 text-left">
            <a href="/start-here" class="text-[10px] uppercase font-bold font-mono tracking-widest text-[#F27D26] hover:underline">&larr; Voltar ao Começo</a>
          </div>
        </div>
      </section>
    `
  },
  {
    path: "/books/harness-engineering-ai-coding-agents",
    title: "Harness Engineering Book for AI Agents | Leandro Calado",
    description: "Looking for a practical Harness Engineering book? Build reliable AI coding agents with permissions, sandboxes, memory control, tests, CI gates and rollback.",
    canonical: "https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents",
    schemaType: "HarnessBook",
    htmlContent: `
      <section class="py-20 px-6 max-w-4xl mx-auto text-left">
        <span class="text-[#F27D26] uppercase font-bold text-xs tracking-widest font-mono">NEW RELEASE TECHNICAL MANUAL</span>
        <h1 class="text-4xl sm:text-5xl font-light italic mt-3 mb-6 font-serif text-white leading-tight">Harness Engineering Book for AI Coding Agents</h1>
        <p class="text-gray-300 text-lg leading-relaxed mb-8">
          Harness Engineering for AI Coding Agents is a practical harness engineering book by Leandro Calado for developers building reliable Claude Code, Cursor, Codex, and multi-agent coding workflows with guardrails, automated tests, CI gates, memory control, tool permissions, and production-ready software delivery.
        </p>
        <div class="flex gap-4">
          <a href="https://www.amazon.com.br/dp/B0GYG3WG4Q" target="_blank" rel="noopener noreferrer" class="px-6 py-4 bg-[#F27D26] text-white text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#d96613] transition-colors rounded-sm">Harness Engineering Book on Amazon Kindle</a>
          <a href="/harness-engineering/ai-agent-security-checklist" class="px-6 py-4 border border-[#F27D26]/50 text-[#F27D26] text-xs font-mono uppercase tracking-widest font-bold rounded-sm">Free AI Agent Security Checklist</a>
        </div>
      </section>

      <section class="py-16 border-t border-white/5 px-6 max-w-4xl mx-auto text-left">
        <h2 class="text-2xl font-light italic font-serif text-white mb-6">Vibe coding works in prototypes. It breaks in production.</h2>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">
          AI coding agents make it feel easy to refactor modules, wire new endpoints, or patch bugs in minutes. The diffs look clean, the code compiles, and tests might even pass—until a race condition, a missing security check, or a silently deleted guard shows up weeks later.
        </p>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">
          This is the structural problem with vibe coding: it optimizes for the appearance of correctness, not verified correctness, and your team pays for it with hidden security issues, on-call duty, and painful cleanup deployments.
        </p>
      </section>

      <section class="py-16 border-t border-white/5 px-6 max-w-4xl mx-auto text-left">
        <h2 class="text-2xl font-light italic font-serif text-white mb-6">You don’t trust the AI. You control it with systems.</h2>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">
          This book introduces harness engineering: treating AI coding agents like powerful but context-free contractors operating inside a strict system of constraints, checks, and gates.
        </p>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">
          Instead of arguing with prompts, you surround the agent with AGENTS.md rules, task specs, plan-verify-execute loops, tests, static analysis, security scans, and CI gates that automatically reject unsafe output.
        </p>
      </section>

      <section class="py-16 border-t border-white/5 px-6 max-w-4xl mx-auto text-left">
        <h2 class="text-2xl font-light italic font-serif text-white mb-6">By the end of the book, you will have a complete harness system</h2>
        <ul class="space-y-4 text-sm text-gray-300">
          <li><strong>AGENTS.md Constitution:</strong> Define allowed folders, prohibited operations, and required structures.</li>
          <li><strong>Task Spec YAML contracts:</strong> Turn vague prompts into strict contracts prior to running agents.</li>
          <li><strong>Plan-Verify-Execute loops:</strong> Verify lines of change proposed prior to actual filesystem write.</li>
          <li><strong>Validators & Gates:</strong> Bandit security regex scans, Mypy, Ruff, and Coverage differential gates.</li>
          <li><strong>CI Gating & PR Reviews:</strong> Automated Actions block merge attempts if checks fail.</li>
        </ul>
      </section>

      <section class="py-16 border-t border-white/5 px-6 max-w-4xl mx-auto text-left">
        <h2 class="text-3xl font-light italic font-serif text-white mb-8">Frequently Asked Questions</h2>
        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-bold text-[#F27D26] mb-2 font-mono">What is a harness engineering book?</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              A harness engineering book explains how to design the control layer around AI agents, including prompts, tools, permissions, memory, tests, CI gates, observability, and production guardrails.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#F27D26] mb-2 font-mono">Is this book about AI coding agents?</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Yes. This book is fully dedicated to designing, building, and deploying reliable AI coding agents. It covers the shift from simple prompt-based solutions to robust multi-agent setups that operate securely inside commercial environments.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#F27D26] mb-2 font-mono">Does the book cover Claude Code and Cursor AI?</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Absolutely. The book addresses modern AI coding tools like Claude Code, Cursor AI, and other LLM interfaces, showing how to build automated gates, prompt harnesses, and verification routines to keep their output 100% stable.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#F27D26] mb-2 font-mono">Who is Leandro Calado?</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Leandro Calado is a Senior Data Engineer, AI Systems Architect, and international author of 116 technical books on Amazon KDP. He specializes in designing robust cloud pipelines (AWS/Azure) and building secure multi-agent systems.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#F27D26] mb-2 font-mono">Is this book for production-ready AI agent workflows?</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Yes. It moves beyond simple prototypes and 'vibe coding' to explain production guardrails, validation loops, code differential gates, and sandboxing architectures that make AI code delivery safe for real-world companies.
            </p>
          </div>
        </div>
      </section>
    `
  },
  ...crimeIndexRoutes,
  ...crimeArticleRoutes,
  ...whistleblowingRoutes,
  ...museSentinelRoutes,
  ...harnessChecklistRoutes
];

function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Leandro Calado Ferreira",
    "alternateName": "Leandro Calado",
    "url": "https://leandrocaladoferreira.com",
    "jobTitle": "Senior Data Engineer, Technical Author & Founder",
    "legalName": "Leandro Calado Ferreira",
    "worksFor": {
      "@type": "Organization",
      "name": "LCF Consulting",
      "url": "https://leandrocaladoferreira.com/#contato"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Universidade de São Paulo",
        "alternateName": "USP"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Pontifícia Universidade Católica de São Paulo",
        "alternateName": "PUC-SP"
      }
    ],
    "knowsAbout": [
      "Harness Engineering Book",
      "Model Context Protocol (MCP)",
      "AI Systems Architect",
      "AI Agents",
      "n8n Workflow Automation",
      "AWS Glue PySpark ETL",
      "Databricks Lakehouse Big Data",
      "Apache Spark",
      "Prompt Injection & LLM Safety",
      "Geopolitics & Air Transportation Regulation"
    ],
    "description": "Leandro Calado Ferreira é um conceituado Engenheiro de Dados, AI Systems Architect, pós-graduando em MBA de Data Science pela USP e Autor Técnico Internacional com mais de 116 manuais de Inteligência Artificial, Big Data e Engenharia publicados na Amazon Kindle KDP.",
    "sameAs": [
      "https://www.linkedin.com/in/lcaladoferreira/",
      "https://github.com/lcaladoferreira",
      "https://leandrocaladoferreira.medium.com/",
      "https://leandrocalado.jusbrasil.com.br/",
      "http://lattes.cnpq.br/0050162670485497"
    ]
  };
}

function generateBooksSchema() {
  const person = generatePersonSchema();
  const bookEntities = booksData.map((book) => ({
    "@type": "Book",
    "name": book.title,
    "asin": book.asin,
    "isbn": book.isbn,
    "url": book.link,
    "author": {
      "@type": "Person",
      "name": "Leandro Calado Ferreira"
    },
    "description": book.description,
    "inLanguage": book.lang === "Inglês" ? "en" : book.lang === "Espanhol" ? "es" : book.lang === "Alemão" ? "de" : "pt"
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "CollectionPage",
        "@id": "https://leandrocaladoferreira.com/books/#collection",
        "url": "https://leandrocaladoferreira.com/books",
        "name": "Biblioteca Técnica Internacional de Leandro Calado Ferreira",
        "description": "Catálogo completo de livros de Engenharia de Dados, Nuvem e IA publicados na Amazon KDP por Leandro Calado Ferreira.",
        "about": person,
        "hasPart": bookEntities
      }
    ]
  };
}

function generateArticlesSchema() {
  const person = generatePersonSchema();
  const articleEntities = articlesData.map((art) => ({
    "@type": "Article",
    "headline": art.title,
    "url": art.link,
    "author": {
      "@type": "Person",
      "name": "Leandro Calado Ferreira"
    },
    "publisher": {
      "@type": "Organization",
      "name": art.platform,
      "url": art.platform === "Medium" ? "https://leandrocaladoferreira.medium.com" : "https://leandrocalado.jusbrasil.com.br"
    },
    "description": art.excerpt,
    "inLanguage": art.platform === "Medium" ? "en" : "pt"
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "CollectionPage",
        "@id": "https://leandrocaladoferreira.com/articles/#collection",
        "url": "https://leandrocaladoferreira.com/articles",
        "name": "Trabalhos, Ensaios e Artigos de Leandro Calado Ferreira",
        "description": "Arquivo completo de manifestos regulatórios e técnicos de Leandro Calado publicados no Jusbrasil e Medium.",
        "about": person,
        "hasPart": articleEntities
      }
    ]
  };
}

function generateAICrimeSchema(schemaType: string) {
  const person = generatePersonSchema();
  const parts = schemaType.split(":");
  const language = (parts[1] || "en") as AICrimeLanguage;
  const baseArticle = parts[0] === "AICrime" && parts[2]
    ? aiCrimeCases.find((item) => item.slug === parts[2])
    : undefined;
  const article = baseArticle ? localizeAICrimeCase(baseArticle, language) : undefined;
  const articlePublishedIso = baseArticle
    ? new Date(`${baseArticle.published} UTC`).toISOString().slice(0, 10)
    : "2026-09-03";
  const t = aiCrimeUi[language];
  const archivePath = getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language);

  if (!article) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        person,
        {
          "@type": "CollectionPage",
          "@id": `https://leandrocaladoferreira.com${archivePath}/#collection`,
          "url": `https://leandrocaladoferreira.com${archivePath}`,
          "name": t.archiveName,
          "description": t.heroDescription,
          "inLanguage": language,
          "author": { "@type": "Person", "name": "Leandro Calado" },
          "hasPart": aiCrimeCases.map((item) => ({
            "@type": "Article",
            "headline": localizeAICrimeCase(item, language).title,
            "url": `https://leandrocaladoferreira.com${getLocalizedAICrimePath(`${AI_CRIME_BASE_PATH}/${item.slug}`, language)}`,
          })),
        },
        {
          "@type": "FAQPage",
          "mainEntity": t.faq.map((entry) => ({
            "@type": "Question",
            "name": entry.question,
            "acceptedAnswer": { "@type": "Answer", "text": entry.answer },
          })),
        },
        {
          "@type": "Book",
          "name": "Nobody Told It to Lie",
          "author": { "@type": "Person", "name": "Leandro Calado" },
          "asin": "B0HHHDL9TB",
          "url": AI_CRIME_BOOK_URL,
          "inLanguage": "en",
        },
      ],
    };
  }

  const url = `https://leandrocaladoferreira.com${getLocalizedAICrimePath(`${AI_CRIME_BASE_PATH}/${article.slug}`, language)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "NewsArticle",
        "@id": `${url}/#article`,
        "url": url,
        "headline": article.title,
        "description": article.excerpt,
        ...(article.featuredImage ? {
          "image": {
            "@type": "ImageObject",
            "url": `https://leandrocaladoferreira.com${article.featuredImage.url}`,
            "width": article.featuredImage.width,
            "height": article.featuredImage.height,
          },
        } : {}),
        "datePublished": articlePublishedIso,
        "dateModified": articlePublishedIso,
        "inLanguage": language,
        "author": { "@type": "Person", "name": "Leandro Calado", "url": "https://leandrocaladoferreira.com" },
        "publisher": { "@type": "Organization", "name": "LCF Consulting", "url": "https://leandrocaladoferreira.com" },
        "articleSection": "The AI Crime Files",
        "keywords": article.keywords.join(", "),
        "citation": article.sources.map((source) => source.url),
        "about": [article.criminalConduct, article.autonomy],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://leandrocaladoferreira.com/" },
          { "@type": "ListItem", "position": 2, "name": t.archiveName, "item": `https://leandrocaladoferreira.com${archivePath}` },
          { "@type": "ListItem", "position": 3, "name": `Case ${article.caseNumber}`, "item": url },
        ],
      },
    ],
  };
}

function generateHarnessExplainerSchema(schemaType: string) {
  const language = (schemaType.split(':')[1] || 'en') as AICrimeLanguage;
  const copy = whistleblowingCopy[language];
  const url = `https://leandrocaladoferreira.com${whistleblowingHref(language)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generatePersonSchema(),
      {
        '@type': 'TechArticle', '@id': `${url}/#article`, url,
        headline: copy.title, description: copy.description,
        mainEntityOfPage: url, inLanguage: language,
        datePublished: '2026-09-08', dateModified: '2026-09-08',
        author: { '@type': 'Person', name: 'Leandro Calado', url: 'https://leandrocaladoferreira.com' },
        publisher: { '@type': 'Organization', name: 'LCF Consulting', url: 'https://leandrocaladoferreira.com' },
        image: { '@type': 'ImageObject', url: `https://leandrocaladoferreira.com${whistleblowingImage}`, width: 1600, height: 900 },
        articleSection: 'Harness Engineering · The AI Crime Files',
        keywords: ['Harness Engineering', 'AI agent whistleblowing', 'AI swarm governance', 'multi-agent systems', 'reward hacking', 'agent escalation', 'AI agent guardrails'],
        citation: ['https://arxiv.org/html/2609.04170v1', 'https://indianexpress.com/article/technology/artificial-intelligence/ai-agents-google-deepmind-paper-key-findings-10868387/'],
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://leandrocaladoferreira.com/' },
          { '@type': 'ListItem', position: 2, name: 'The AI Crime Files', item: `https://leandrocaladoferreira.com${getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language)}` },
          { '@type': 'ListItem', position: 3, name: copy.title, item: url },
        ]
      },
      {
        '@type': 'FAQPage', mainEntity: copy.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))
      }
    ]
  };
}

function generateMuseSentinelSchema(schemaType: string) {
  const language = (schemaType.split(':')[1] || 'en') as AICrimeLanguage;
  const copy = museSentinelCopy[language];
  const url = `https://leandrocaladoferreira.com${museSentinelHref(language)}`;
  return { '@context': 'https://schema.org', '@graph': [generatePersonSchema(), {
    '@type': 'TechArticle', '@id': `${url}/#article`, url, headline: copy.title, description: copy.description,
    mainEntityOfPage: url, inLanguage: language, datePublished: '2026-09-09', dateModified: '2026-09-09',
    author: { '@type': 'Person', name: 'Leandro Calado', url: 'https://leandrocaladoferreira.com' },
    publisher: { '@type': 'Organization', name: 'LCF Consulting', url: 'https://leandrocaladoferreira.com' },
    image: { '@type': 'ImageObject', url: `https://leandrocaladoferreira.com${museSentinelImage}`, width: 1600, height: 900 },
    articleSection: 'Harness Engineering · The AI Crime Files',
    keywords: ['Meta Muse Sentinel', 'AI agent supervision', 'Harness Engineering', 'AI agent permission authority', 'Secure VM', 'prompt injection protection', 'AI agent guardrails', 'human-in-the-loop approval'],
    citation: ['https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse','https://www.reuters.com/business/meta-launches-ai-agent-that-can-access-other-apps-send-emails-make-payments-2026-09-08/','https://www.wired.com/story/meta-releases-muse-a-personal-ai-agent-with-privacy-built-into-it/','https://apnews.com/article/meta-muse-ai-agent-3a4572eb4cf4e95d8a0dfdad6e6ca065']
  }, { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://leandrocaladoferreira.com/' },
    { '@type': 'ListItem', position: 2, name: 'The AI Crime Files', item: `https://leandrocaladoferreira.com${getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language)}` },
    { '@type': 'ListItem', position: 3, name: copy.title, item: url }
  ] }, { '@type': 'FAQPage', mainEntity: copy.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }] };
}

function generateHarnessChecklistSchema(schemaType: string) {
  const language = (schemaType.split(':')[1] || 'en') as AICrimeLanguage;
  const copy = harnessChecklistCopy[language];
  const url = `https://leandrocaladoferreira.com${harnessChecklistHref(language)}`;
  return { '@context': 'https://schema.org', '@graph': [generatePersonSchema(), {
    '@type': 'TechArticle', '@id': `${url}/#article`, url, headline: copy.title, description: copy.description,
    mainEntityOfPage: url, inLanguage: language, datePublished: '2026-09-10', dateModified: '2026-09-10',
    author: { '@type': 'Person', name: 'Leandro Calado', url: 'https://leandrocaladoferreira.com' },
    publisher: { '@type': 'Organization', name: 'LCF Consulting', url: 'https://leandrocaladoferreira.com' },
    image: { '@type': 'ImageObject', url: `https://leandrocaladoferreira.com${harnessChecklistImage}`, width: 1600, height: 900 },
    articleSection: 'Harness Engineering · AI Agent Security',
    keywords: ['AI agent security checklist','Harness Engineering','AI coding agent security','MCP security','agent skills security','AI agent permissions','sandboxing','memory isolation','approval gates','rollback'],
    citation: ['https://arxiv.org/html/2609.07360','https://github.com/redhat-community-ai-tools/harness-eval','https://github.com/Benkapner/harness-eval-experiments']
  }, { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://leandrocaladoferreira.com/' },
    { '@type': 'ListItem', position: 2, name: 'Harness Engineering Book', item: 'https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents' },
    { '@type': 'ListItem', position: 3, name: copy.title, item: url }
  ] }, { '@type': 'FAQPage', mainEntity: copy.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }] };
}

function generateSchemaForRoute(schemaType: string) {
  const person = generatePersonSchema();
  if (schemaType === "HarnessBook") {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        person,
        {
          "@type": "Book",
          "@id": "https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents/#book",
          "name": "Harness Engineering for AI Coding Agents",
          "alternateName": "Harness Engineering Book",
          "author": {
            "@type": "Person",
            "name": "Leandro Calado",
            "url": "https://leandrocaladoferreira.com"
          },
          "description": "Read Harness Engineering for AI Coding Agents by Leandro Calado, a practical harness engineering book about Claude Code, Cursor, Codex, multi-agent coding workflows, guardrails, tests, CI gates, memory control, tool permissions, and production-ready AI agent systems.",
          "inLanguage": "en",
          "bookFormat": "EBook",
          "publisher": {
            "@type": "Organization",
            "name": "LCF Consulting",
            "url": "https://leandrocaladoferreira.com"
          },
          "url": "https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents",
          "keywords": [
            "Harness Engineering Book",
            "AI Coding Agents",
            "Claude Code",
            "Cursor AI",
            "Codex",
            "Vibe Coding",
            "Multi-Agent Coding Workflows",
            "Guardrails",
            "Tests",
            "CI Gates",
            "Memory Control",
            "Tool Permissions",
            "Production-Ready Software Delivery"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents/#breadcrumbs",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://leandrocaladoferreira.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Books",
              "item": "https://leandrocaladoferreira.com/books"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Harness Engineering Book",
              "item": "https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents"
            }
          ]
        }
      ]
    }, null, 2);
  }
  if (schemaType === "Books") {
    return JSON.stringify(generateBooksSchema(), null, 2);
  }
  if (schemaType === "Articles") {
    return JSON.stringify(generateArticlesSchema(), null, 2);
  }
  if (schemaType.startsWith("AICrimeIndex:") || schemaType.startsWith("AICrime:")) {
    return JSON.stringify(generateAICrimeSchema(schemaType), null, 2);
  }
  if (schemaType.startsWith('HarnessExplainer:')) {
    return JSON.stringify(generateHarnessExplainerSchema(schemaType), null, 2);
  }
  if (schemaType.startsWith('MuseSentinel:')) {
    return JSON.stringify(generateMuseSentinelSchema(schemaType), null, 2);
  }
  if (schemaType.startsWith('HarnessChecklist:')) {
    return JSON.stringify(generateHarnessChecklistSchema(schemaType), null, 2);
  }

  // General WebPage schemas pointing back to Leandro
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebPage",
        "name": schemaType + " Page",
        "author": {
          "@type": "Person",
          "name": "Leandro Calado Ferreira"
        }
      }
    ]
  }, null, 2);
}

function run() {
  console.log("Starting static pre-rendering build script...");
  const distDir = path.join(process.cwd(), "dist");
  const templatePath = path.join(distDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error(`Build assets template not found at ${templatePath}. Ensure 'vite build' completed successfully!`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, "utf-8");

  routes.forEach((route) => {
    let rewrittenHtml = baseHtml;

    if ("language" in route && route.language) {
      const htmlLanguage = route.language === "pt" ? "pt-BR" : route.language;
      rewrittenHtml = rewrittenHtml.replace(/<html lang=".*?">/, `<html lang="${htmlLanguage}">`);
    }

    // 1. Replace Title
    rewrittenHtml = rewrittenHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    );

    // 2. Replace Meta Description
    rewrittenHtml = rewrittenHtml.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${route.description}" />`
    );

    // 3. Inject Canonical Link (or replace existing if there was one, if not insert before head closing)
    const canonicalLink = `<link rel="canonical" href="${route.canonical}" />`;
    if (rewrittenHtml.includes('rel="canonical"')) {
      rewrittenHtml = rewrittenHtml.replace(/<link rel="canonical" href=".*?" \/>/, canonicalLink);
    } else {
      rewrittenHtml = rewrittenHtml.replace("</head>", `  ${canonicalLink}\n  </head>`);
    }

    if ("alternates" in route && route.alternates) {
      const alternateLinks = route.alternates
        .map((alternate) => `<link rel="alternate" hreflang="${alternate.language}" href="${alternate.href}" />`)
        .join("\n  ");
      rewrittenHtml = rewrittenHtml.replace("</head>", `  ${alternateLinks}\n  </head>`);
    }

    // 4. Update Open Graph values
    rewrittenHtml = rewrittenHtml.replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${route.title}" />`
    );
    rewrittenHtml = rewrittenHtml.replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${route.description}" />`
    );
    rewrittenHtml = rewrittenHtml.replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${route.canonical}" />`
    );
    if ("ogType" in route && route.ogType) {
      rewrittenHtml = rewrittenHtml.replace(
        /<meta property="og:type" content=".*?" \/>/,
        `<meta property="og:type" content="${route.ogType}" />`
      );
    }
    const routeImage = "image" in route
      ? route.image as { url: string; width: number; height: number; type: string; alt: string } | undefined
      : undefined;
    if (routeImage) {
      const imageMeta = [
        `<meta property="og:image" content="${routeImage.url}" />`,
        `<meta property="og:image:secure_url" content="${routeImage.url}" />`,
        `<meta property="og:image:type" content="${routeImage.type}" />`,
        `<meta property="og:image:width" content="${routeImage.width}" />`,
        `<meta property="og:image:height" content="${routeImage.height}" />`,
        `<meta property="og:image:alt" content="${escapeHtml(routeImage.alt)}" />`,
        `<meta name="twitter:image" content="${routeImage.url}" />`,
        `<meta name="twitter:image:alt" content="${escapeHtml(routeImage.alt)}" />`,
      ].join("\n    ");
      rewrittenHtml = rewrittenHtml.replace("</head>", `    ${imageMeta}\n  </head>`);
      rewrittenHtml = rewrittenHtml.replace(
        /<meta name="twitter:card" content=".*?" \/>/,
        `<meta name="twitter:card" content="summary_large_image" />`
      );
    }

    // 5. Update Twitter Card values
    rewrittenHtml = rewrittenHtml.replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    rewrittenHtml = rewrittenHtml.replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // 6. Inject specific JSON-LD structures
    const routeSchema = generateSchemaForRoute(route.schemaType);
    const schemaScriptInjected = `<script type="application/ld+json">\n${routeSchema}\n</script>`;
    
    // Replace the default Person schema with our targeted route schema
    rewrittenHtml = rewrittenHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScriptInjected);

    // 7. Inject static HTML content inside '#root' for crawler rendering when Javascript is disabled!
    const headerHtml = `
      <header class="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#2A2A2A] h-20 transition-all">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" class="flex items-center gap-3 group">
            <div class="w-8 h-8 border border-[#F5F5F0] text-[#F5F5F0] flex items-center justify-center font-bold text-xs rounded-sm">LC</div>
            <span class="text-xs tracking-[0.25em] uppercase font-semibold text-white hidden sm:inline-block">Leandro Calado <span class="opacity-50 text-[10px] font-light">Ferreira</span></span>
          </a>
          <nav class="hidden md:flex items-center gap-8">
            <a href="/about" class="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-white font-medium">SOBRE</a>
            <a href="/start-here" class="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-white font-medium">ECOSSISTEMA</a>
            <a href="/books" class="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-white font-medium">LIVROS</a>
            <a href="/ai-crime-files" class="text-[10px] tracking-[0.2em] uppercase text-red-400 hover:text-red-300 font-medium">AI CRIME FILES</a>
            <a href="/articles" class="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-white font-medium">ARTIGOS</a>
            <a href="/consulting" class="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-white font-medium">CONSULTORIA</a>
          </nav>
          <div class="flex items-center gap-3">
            <a href="/consulting" class="px-5 py-2.5 text-[10px] tracking-widest uppercase border border-[#F5F5F0] text-[#F5F5F0] rounded font-semibold hover:bg-white hover:text-black transition-all">Consultoria</a>
          </div>
        </div>
      </header>
    `;

    const footerHtml = `
      <footer class="py-16 border-t bg-[#0F0F0F] border-[#2A2A2A]">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-start gap-6 pb-10 border-b border-white/5">
            <div>
              <p class="text-2xl font-light italic leading-none mb-1 text-[#F27D26] font-serif">Leandro Calado Ferreira</p>
              <p class="text-[10px] uppercase tracking-wider opacity-60 mt-1 font-mono">Engenheiro de Dados • Autor Técnico Internacional • Harness Engineering</p>
            </div>
            <nav class="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest font-mono font-bold text-gray-400">
              <a href="/about" class="hover:text-white">SOBRE</a>
              <a href="/start-here" class="hover:text-white">ECOSSISTEMA</a>
              <a href="/books" class="hover:text-white">LIVROS</a>
              <a href="/ai-crime-files" class="hover:text-red-400">AI CRIME FILES</a>
              <a href="/articles" class="hover:text-white">ARTIGOS</a>
              <a href="/consulting" class="hover:text-white">CONSULTORIA</a>
              <a href="/start-here" class="hover:text-white">COMECE POR AQUI</a>
            </nav>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-[11px] opacity-50 font-mono">
            <span>© ${new Date().getFullYear()} Leandro Calado Ferreira. Todos os direitos reservados.</span>
            <div class="flex flex-wrap items-center gap-4 text-[#F27D26] font-bold">
              <a href="https://github.com/lcaladoferreira" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/lcaladoferreira/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://leandrocalado.jusbrasil.com.br/" target="_blank" rel="noopener noreferrer">Jusbrasil</a>
              <a href="https://leandrocaladoferreira.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a>
              <a href="http://lattes.cnpq.br/0050162670485497" target="_blank" rel="noopener noreferrer">Lattes</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    const fullScaffold = `
      <div class="min-h-screen bg-[#0A0A0A] text-[#F5F5F0]">
        ${headerHtml}
        <main class="relative pt-20">
          ${route.htmlContent}
        </main>
        ${footerHtml}
      </div>
    `;

    // Inject the static HTML page skeleton into the #root element for instant crawling & no-JS indexing
    rewrittenHtml = rewrittenHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${fullScaffold}</div>`
    );

    // Save outputs
    if (route.path === "/") {
      fs.writeFileSync(templatePath, rewrittenHtml, "utf-8");
      console.log(`Pre-rendered route [HOME]: /`);
    } else {
      const targetDir = path.join(distDir, route.path);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(path.join(targetDir, "index.html"), rewrittenHtml, "utf-8");

      // Also write flat HTML output at dist/[route].html for flat clean-URL static routing platforms (like Vercel)
      const flatFilePath = path.join(distDir, `${route.path}.html`);
      const parentDir = path.dirname(flatFilePath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.writeFileSync(flatFilePath, rewrittenHtml, "utf-8");

      console.log(`Pre-rendered route: ${route.path} (written to nested index.html and flat html file)`);
    }
  });

  console.log("Static pre-rendering successfully completed. Build asset generation finished!");
}

run();
