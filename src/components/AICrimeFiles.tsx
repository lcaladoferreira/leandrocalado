import { containmentCopy, containmentHref, containmentImage } from "../aiCrimeExplainers";
import { whistleblowingCopy, whistleblowingHref, whistleblowingImage } from "../agentWhistleblowingExplainer";
import { museSentinelCopy, museSentinelHref, museSentinelImage } from "../metaMuseSentinelExplainer";
import { harnessChecklistCopy, harnessChecklistHref, harnessChecklistImage } from "../harnessSecurityChecklist";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Fingerprint, ShieldAlert } from "lucide-react";
import { Language } from "../translations";
import {
  AI_CRIME_BASE_PATH,
  AI_CRIME_BOOK_COVER,
  AI_CRIME_BOOK_URL,
  AICrimeCase,
  aiCrimeCases,
  getAICrimeCase,
  getLocalizedAICrimePath,
} from "../aiCrimeData";
import { aiCrimeUi, localizeAICrimeCase, localizeAICrimeCases } from "../aiCrimeI18n";

interface AICrimeFilesProps {
  isDark: boolean;
  language: Language;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const AI_CRIME_VIDEO_URL = "https://www.youtube.com/watch?v=oZKzn44G0Hw";
const AI_CRIME_VIDEO_EMBED_URL = "https://www.youtube.com/embed/oZKzn44G0Hw";

const trackBookClick = (placement: string) => {
  const analytics = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  analytics?.("event", "amazon_book_click", {
    book_asin: "B0HHHDL9TB",
    placement,
  });
};

function DocumentaryVideo({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? "my-10" : "my-14"} overflow-hidden border border-red-500/25 bg-[#101010]`}>
      <div className="aspect-video w-full bg-black">
        <iframe
          className="h-full w-full"
          src={AI_CRIME_VIDEO_EMBED_URL}
          title="Nobody Told It to Lie — AI Crime Files documentary"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-red-400">Watch the case</p>
          <p className="mt-1 text-sm text-zinc-400">The true story behind <em>Nobody Told It to Lie</em>.</p>
        </div>
        <a
          href={AI_CRIME_VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 border border-red-500/40 px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-widest text-red-400 transition-colors hover:bg-red-600 hover:text-white"
        >
          Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

function BookCTA({ language, compact = false }: { language: Language; compact?: boolean }) {
  const t = aiCrimeUi[language];
  return (
    <aside className={`relative overflow-hidden border border-red-500/25 bg-gradient-to-br from-red-950/35 via-[#111] to-[#0b0b0b] ${compact ? "p-6" : "p-8 sm:p-10"}`}>
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-red-600/10 blur-3xl" />
      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center">
        {!compact && (
          <img
            src={AI_CRIME_BOOK_COVER}
            alt={`Nobody Told It to Lie, Leandro Calado`}
            className="w-32 shrink-0 border border-white/15 shadow-2xl shadow-red-950/50"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}
        <div>
          <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-red-400">{t.bookEyebrow}</p>
          <h2 className="font-serif text-2xl font-light italic leading-tight text-white sm:text-3xl">Nobody Told It to Lie</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            {t.bookDescription}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={AI_CRIME_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              data-mcp-action="buy-ai-crime-files-book"
              data-mcp-description="Open the official Amazon page for Nobody Told It to Lie by Leandro Calado"
              onClick={() => trackBookClick(compact ? "article_inline" : "feature")}
              className="inline-flex items-center gap-2 bg-red-600 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-500"
            >
              {t.readAmazon} <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{t.bookMeta}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function EvidenceBadge({ kind, language }: { kind: "Primary" | "Independent"; language: Language }) {
  const t = aiCrimeUi[language];
  return (
    <span className={`shrink-0 border px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-widest ${
      kind === "Primary" ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" : "border-sky-500/30 bg-sky-500/5 text-sky-400"
    }`}>
      {kind === "Primary" ? t.primarySource : t.independentSource}
    </span>
  );
}

function CaseCard({ item, language, onNavigate }: { key?: string; item: AICrimeCase; language: Language; onNavigate: (path: string) => void }) {
  const t = aiCrimeUi[language];
  const href = getLocalizedAICrimePath(`${AI_CRIME_BASE_PATH}/${item.slug}`, language);
  return (
    <article className="group flex h-full flex-col border border-white/10 bg-[#101010] transition-all hover:-translate-y-1 hover:border-red-500/40">
      <div className="border-b border-white/10 p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-red-400">{t.caseLabel} {item.caseNumber}</span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-600">{t.verifiedFile}</span>
        </div>
        <h2 className="font-serif text-2xl font-light italic leading-tight text-white transition-colors group-hover:text-red-400">{item.shortTitle}</h2>
        <p className="mt-3 text-xs leading-relaxed text-zinc-400">{item.excerpt}</p>
      </div>
      <div className="grid grid-cols-3 border-b border-white/10">
        {item.metrics.map((metric) => (
          <div key={metric.label} className="border-r border-white/10 p-3 last:border-r-0">
            <strong className="block font-mono text-sm text-white">{metric.value}</strong>
            <span className="mt-1 block text-[8px] uppercase leading-tight tracking-wide text-zinc-600">{metric.label}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => onNavigate(href)}
        className="mt-auto flex w-full cursor-pointer items-center justify-between p-5 text-left font-mono text-[9px] font-bold uppercase tracking-widest text-red-400 transition-colors hover:bg-red-500/5"
      >
        {t.openFile} <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}

function CrimeIndex({ language, onNavigate }: { language: Language; onNavigate: (path: string) => void }) {
  const t = aiCrimeUi[language];
  const cases = localizeAICrimeCases(aiCrimeCases, language);
  return (
    <div className="bg-[#090909] text-zinc-100">
      <header className="relative overflow-hidden border-b border-red-500/20 px-6 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(239,68,68,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,.18) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-7 flex items-center gap-3">
            <Fingerprint className="h-5 w-5 text-red-500" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-red-400">{t.heroEyebrow}</span>
          </div>
          <h1 className="max-w-4xl font-serif text-5xl font-light italic leading-[0.94] text-white sm:text-7xl lg:text-8xl">{t.archiveName}</h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t.heroDescription}
          </p>
          <div className="mt-9 flex flex-wrap gap-3 font-mono text-[9px] font-bold uppercase tracking-widest">
            <span className="border border-white/10 bg-white/[0.03] px-3 py-2 text-zinc-400">{t.noFiction}</span>
            <span className="border border-white/10 bg-white/[0.03] px-3 py-2 text-zinc-400">{t.noHypothetical}</span>
            <span className="border border-white/10 bg-white/[0.03] px-3 py-2 text-zinc-400">{t.sourcesAttached}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <DocumentaryVideo />

        <section aria-labelledby="case-files-title">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-red-400">{t.investigations}</p>
              <h2 id="case-files-title" className="mt-2 font-serif text-3xl font-light italic text-white sm:text-4xl">{t.readFiles}</h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-zinc-500">{t.evidencePromise}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cases.map((item) => <CaseCard key={item.slug} item={item} language={language} onNavigate={onNavigate} />)}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="harness-analysis-title">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-amber-400">Harness Engineering</p>
          <h2 id="harness-analysis-title" className="mt-2 font-serif text-3xl font-light italic text-white">Technical analysis and prevention</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {[{ copy: harnessChecklistCopy[language], href: harnessChecklistHref(language), image: harnessChecklistImage }, { copy: museSentinelCopy[language], href: museSentinelHref(language), image: museSentinelImage }, { copy: containmentCopy[language], href: containmentHref(language), image: containmentImage }, { copy: whistleblowingCopy[language], href: whistleblowingHref(language), image: whistleblowingImage }].map((entry) => (
              <a key={entry.href} href={entry.href} className="group overflow-hidden border border-white/10 bg-[#101010] transition-colors hover:border-amber-500/40">
                <img src={entry.image} width="1600" height="900" loading="lazy" alt={entry.copy.alt} className="aspect-video w-full object-cover" />
                <div className="p-6"><p className="text-xs text-amber-400">{"label" in entry.copy ? entry.copy.label : entry.copy.eyebrow}</p><h3 className="mt-3 font-serif text-2xl text-white group-hover:text-amber-300">{entry.copy.title}</h3><p className="mt-3 text-sm leading-relaxed text-zinc-400">{entry.copy.description}</p></div>
              </a>
            ))}
          </div>
        </section>

        <section className="my-20 grid gap-8 border-y border-white/10 py-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <ShieldAlert className="h-7 w-7 text-red-500" />
            <h2 className="mt-5 font-serif text-3xl font-light italic text-white">{t.archiveCriteria}</h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {t.criteria.map((text, index) => (
              <li key={text} className="border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-[9px] font-bold text-red-400">0{index + 1}</span>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-20" aria-labelledby="ai-crime-faq-title">
          <h2 id="ai-crime-faq-title" className="font-serif text-3xl font-light italic text-white">{t.faqTitle}</h2>
          <div className="mt-7 grid gap-4">
            {t.faq.map((item) => <details key={item.question} className="border border-white/10 bg-white/[0.02] p-5"><summary className="cursor-pointer font-serif text-lg text-white">{item.question}</summary><p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.answer}</p></details>)}
          </div>
        </section>

        <BookCTA language={language} />
      </main>
    </div>
  );
}

function CrimeArticle({ item, language, onNavigate }: { item: AICrimeCase; language: Language; onNavigate: (path: string) => void }) {
  const t = aiCrimeUi[language];
  const archivePath = getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language);
  return (
    <article className="bg-[#090909] text-zinc-100">
      <header className="border-b border-white/10 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <button onClick={() => onNavigate(archivePath)} className="mb-10 flex cursor-pointer items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-red-400">
            <ArrowLeft className="h-3.5 w-3.5" /> {t.allFiles}
          </button>
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.22em]">
            <span className="bg-red-600 px-3 py-1.5 text-white">{t.caseLabel} {item.caseNumber}</span>
            <span className="text-red-400">{t.verifiedInvestigation}</span>
          </div>
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-zinc-500">{item.kicker}</p>
          <h1 className="font-serif text-4xl font-light italic leading-[1.02] text-white sm:text-6xl">{item.title}</h1>
          <p className="mt-7 max-w-3xl text-base leading-relaxed text-zinc-400">{item.excerpt}</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
            <span>{t.by} Leandro Calado</span>
            <span>{t.published} {item.published}</span>
            <span>{t.incident} {item.eventDate}</span>
          </div>
          {item.featuredImage && (
            <figure className="mt-10 overflow-hidden border border-white/10 bg-[#101010]">
              <img
                src={item.featuredImage.url}
                alt={item.title}
                width={item.featuredImage.width}
                height={item.featuredImage.height}
                className="aspect-video w-full object-cover"
                fetchPriority="high"
              />
            </figure>
          )}
          {item.caseNumber === "001" && <DocumentaryVideo compact />}
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-20">
        <div className="min-w-0">
          <section className="mb-12 grid grid-cols-3 border border-white/10" aria-label={t.caseMetrics}>
            {item.metrics.map((metric) => (
              <div key={metric.label} className="border-r border-white/10 p-4 last:border-r-0 sm:p-5">
                <strong className="block font-mono text-base text-white sm:text-xl">{metric.value}</strong>
                <span className="mt-1 block text-[8px] uppercase leading-tight tracking-wide text-zinc-600">{metric.label}</span>
              </div>
            ))}
          </section>

          {item.sections.map((section, index) => (
            <section key={section.heading} className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-[9px] font-bold text-red-500">0{index + 1}</span>
                <h2 className="font-serif text-2xl font-light italic text-white sm:text-3xl">{section.heading}</h2>
              </div>
              <div className="space-y-5 text-[15px] leading-7 text-zinc-300">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets && (
                <ul className="mt-6 space-y-3 border-l border-red-500/40 pl-5 text-sm leading-relaxed text-zinc-400">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {index === 1 && item.caseNumber === "001" && <div className="mt-9"><BookCTA language={language} compact /></div>}
            </section>
          ))}

          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="font-serif text-3xl font-light italic text-white">{t.evidenceDesk}</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">{t.evidenceIntro}</p>
            <div className="mt-6 space-y-3">
              {item.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-red-500/40">
                  <div>
                    <span className="block text-sm text-zinc-200">{source.label}</span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-zinc-600">{source.publisher}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EvidenceBadge kind={source.kind} language={language} />
                    <ExternalLink className="h-4 w-4 shrink-0 text-red-400" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          <aside className="mt-10 grid gap-5 md:grid-cols-2">
            {[{ copy: harnessChecklistCopy[language], href: harnessChecklistHref(language), image: harnessChecklistImage }, { copy: museSentinelCopy[language], href: museSentinelHref(language), image: museSentinelImage }, { copy: containmentCopy[language], href: containmentHref(language), image: containmentImage }, { copy: whistleblowingCopy[language], href: whistleblowingHref(language), image: whistleblowingImage }].map((entry) => (
              <div key={entry.href} className="border border-white/10 p-6"><p className="text-xs uppercase text-red-400">{"label" in entry.copy ? entry.copy.label : entry.copy.eyebrow}</p><a href={entry.href} className="mt-2 block font-serif text-2xl text-white underline">{entry.copy.title}</a><p className="mt-3 text-sm text-zinc-400">{entry.copy.description}</p></div>
            ))}
          </aside>
          <div className="mt-14"><BookCTA language={language} /></div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-white/10 bg-[#101010] p-5">
            <div className="mb-5 flex items-center gap-2 text-red-400"><Fingerprint className="h-4 w-4" /><span className="font-mono text-[9px] font-bold uppercase tracking-widest">{t.classification}</span></div>
            <dl className="space-y-5">
              <div><dt className="font-mono text-[8px] uppercase tracking-widest text-zinc-600">{t.criminalConduct}</dt><dd className="mt-1 text-xs leading-relaxed text-zinc-300">{item.criminalConduct}</dd></div>
              <div><dt className="font-mono text-[8px] uppercase tracking-widest text-zinc-600">{t.autonomy}</dt><dd className="mt-1 text-xs leading-relaxed text-zinc-300">{item.autonomy}</dd></div>
              <div><dt className="font-mono text-[8px] uppercase tracking-widest text-zinc-600">{t.legalStatus}</dt><dd className="mt-1 text-xs leading-relaxed text-zinc-300">{item.legalStatus}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}

export function AICrimeSpotlight({ language, onNavigate }: { language: Language; onNavigate: (path: string) => void }) {
  const t = aiCrimeUi[language];
  const cases = localizeAICrimeCases(aiCrimeCases, language);
  return (
    <section className="border-t border-red-500/20 bg-[#090909] px-6 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <div className="mb-5 flex items-center gap-3 text-red-400"><Fingerprint className="h-5 w-5" /><span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em]">{t.spotlightEyebrow}</span></div>
          <h2 className="font-serif text-4xl font-light italic leading-tight sm:text-5xl">{t.spotlightTitle}</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400">{t.spotlightText}</p>
          <button onClick={() => onNavigate(getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language))} className="mt-7 inline-flex cursor-pointer items-center gap-2 border border-red-500/40 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-red-400 transition-all hover:bg-red-600 hover:text-white">{t.enterArchive} <ArrowRight className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {cases.map((item) => (
            <button key={item.slug} onClick={() => onNavigate(getLocalizedAICrimePath(`${AI_CRIME_BASE_PATH}/${item.slug}`, language))} className="group cursor-pointer border border-white/10 bg-white/[0.02] p-5 text-left transition-colors hover:border-red-500/40">
              <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-red-400">{t.caseLabel} {item.caseNumber}</span>
              <strong className="mt-4 block font-serif text-lg font-light italic leading-tight text-white group-hover:text-red-400">{item.shortTitle}</strong>
              <span className="mt-6 flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-zinc-600"><BookOpen className="h-3 w-3" /> {t.readFile}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AICrimeFiles({ language, currentPath, onNavigate }: AICrimeFilesProps) {
  const item = getAICrimeCase(currentPath);
  const localizedItem = item ? localizeAICrimeCase(item, language) : undefined;
  return localizedItem ? <CrimeArticle item={localizedItem} language={language} onNavigate={onNavigate} /> : <CrimeIndex language={language} onNavigate={onNavigate} />;
}
