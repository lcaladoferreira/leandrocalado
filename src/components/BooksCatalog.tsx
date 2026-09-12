import { useMemo, useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Language } from "../translations";
import { booksData } from "../data";

interface BooksCatalogProps {
  isDark: boolean;
  language: Language;
  onNavigate: (path: string) => void;
  onLanguageChange: (language: Language) => void;
}

type Category = "all" | "ia" | "dados" | "automacao" | "direito" | "internacional";

const ENGLISH = {
  eyebrow: "Technical library · Amazon KDP",
  title: "Published books",
  subtitle: "Books on AI, agents, data engineering, cloud, automation, governance, security, and applied technology.",
  note: "Book titles remain exactly as officially published on Amazon. This catalog is presented in English only.",
  officialTitle: "Official title",
  details: "View details",
  amazon: "View on Amazon",
  featured: "Featured",
  aiCrime: "AI Crime Files",
  count: (n: number) => `${n} books shown`,
  categories: {
    all: "All",
    ia: "AI & Agents",
    dados: "Data & Cloud",
    automacao: "Automation",
    direito: "Law & Government",
    internacional: "International",
  } as Record<Category, string>,
  languages: {
    Português: "Portuguese",
    Inglês: "English",
    Espanhol: "Spanish",
  } as Record<string, string>,
};

const CATEGORIES: Category[] = ["all", "ia", "dados", "automacao", "direito", "internacional"];

export default function BooksCatalog({ isDark, onNavigate }: BooksCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const t = ENGLISH;

  const catalog = useMemo(() => {
    const aiCrimeBook = {
      id: "ai-crime-files-nobody-told-it-to-lie",
      title: "Nobody Told It to Lie",
      category: "ia",
      asin: "B0HHHDL9TB",
      description: "The AI Crime Files — Case 001",
      lang: "Inglês",
      coverEmoji: "🕵️",
      link: "/ai-crime-files",
    };
    return [aiCrimeBook, ...booksData.filter((book) => book.id !== aiCrimeBook.id)];
  }, []);

  const visible = activeCategory === "all" ? catalog : catalog.filter((book) => book.category === activeCategory);

  return (
    <article className="max-w-7xl mx-auto px-6 py-12">
      <header className="max-w-5xl mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F27D26] font-bold mb-3">{t.eyebrow}</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light italic tracking-tight text-[#F27D26] mb-4" style={{ fontFamily: "'Georgia', serif" }}>{t.title}</h1>
        <p className={`${isDark ? "text-[#A8A8A8]" : "text-[#555]"} text-sm sm:text-base leading-relaxed max-w-3xl`}>{t.subtitle}</p>
        <div className={`mt-5 border-l-2 border-[#F27D26] px-4 py-3 text-xs leading-relaxed ${isDark ? "bg-[#111] text-[#A8A8A8]" : "bg-white text-[#555]"}`}>{t.note}</div>
      </header>

      <div className="flex flex-wrap gap-2 mb-3">
        {CATEGORIES.map((category) => (
          <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`px-3 py-2 border text-[10px] uppercase tracking-widest font-mono font-bold cursor-pointer ${activeCategory === category ? "border-[#F27D26] bg-[#F27D26] text-white" : isDark ? "border-[#333] bg-[#111] text-[#999] hover:border-[#F27D26] hover:text-white" : "border-[#DDD] bg-white text-[#666] hover:border-[#F27D26]"}`}>
            {t.categories[category]}
          </button>
        ))}
      </div>
      <div className={`font-mono text-[10px] uppercase tracking-widest mb-8 ${isDark ? "text-[#666]" : "text-[#888]"}`}>{t.count(visible.length)}</div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map((book) => {
          const aiCrime = book.id === "ai-crime-files-nobody-told-it-to-lie";
          const featured = aiCrime || book.id === "harness-engineering-data-agents-databricks";
          const languageName = t.languages[book.lang] ?? book.lang;
          const categoryName = t.categories[(book.category as Category) || "all"] ?? book.category;
          return (
            <article key={book.id} className={`p-6 border flex flex-col justify-between min-h-[290px] ${featured ? "border-[#F27D26] bg-[#130d08]" : isDark ? "border-[#2A2A2A] bg-[#0F0F0F]" : "border-[#E5E5DF] bg-white"}`}>
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="text-2xl" aria-hidden="true">{book.coverEmoji}</span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {featured && <span className="border border-[#7A3C12] text-[#F27D26] px-2 py-1 font-mono text-[8px] uppercase tracking-widest font-bold">{aiCrime ? t.aiCrime : t.featured}</span>}
                    <span className={`border px-2 py-1 font-mono text-[8px] uppercase tracking-widest ${isDark ? "border-[#333] text-[#999]" : "border-[#DDD] text-[#666]"}`}>{languageName}</span>
                  </div>
                </div>
                <div className={`font-mono text-[8px] uppercase tracking-[0.16em] mb-2 ${isDark ? "text-[#666]" : "text-[#888]"}`}>{t.officialTitle}</div>
                <h2 className="text-xl leading-snug font-light italic mb-3" style={{ fontFamily: "'Georgia', serif" }}>{book.title}</h2>
                {aiCrime && <p className="text-[11px] leading-relaxed text-[#F27D26]">The AI Crime Files — Case 001</p>}
              </div>

              <div className={`mt-6 pt-4 border-t ${isDark ? "border-[#222]" : "border-[#EEE]"}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`font-mono text-[8px] uppercase tracking-wider ${isDark ? "text-[#666]" : "text-[#999]"}`}>ASIN: {book.asin}</span>
                  <span className={`font-mono text-[8px] uppercase tracking-wider ${isDark ? "text-[#666]" : "text-[#999]"}`}>{categoryName}</span>
                </div>
                {book.link.startsWith("/") ? (
                  <button type="button" onClick={() => onNavigate(book.link)} className="w-full px-4 py-3 border border-[#F27D26] text-[#F27D26] hover:bg-[#F27D26] hover:text-white text-[10px] uppercase tracking-widest font-mono font-black flex items-center justify-center gap-2 cursor-pointer">
                    {t.details} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-3 border border-[#F27D26] text-[#F27D26] hover:bg-[#F27D26] hover:text-white text-[10px] uppercase tracking-widest font-mono font-black flex items-center justify-center gap-2">
                    {t.amazon} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </article>
  );
}
