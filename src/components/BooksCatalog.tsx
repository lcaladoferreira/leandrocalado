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

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  officialTitle: string;
  details: string;
  amazon: string;
  featured: string;
  aiCrime: string;
  count: (n: number) => string;
  categories: Record<Category, string>;
  languages: Record<string, string>;
};

const COPY: Record<Language, Copy> = {
  pt: {
    eyebrow: "Biblioteca técnica · Amazon KDP",
    title: "Livros publicados",
    subtitle: "Catálogo de livros sobre IA, agentes, engenharia de dados, cloud, automação, governança, segurança e tecnologia aplicada.",
    note: "Os títulos permanecem exatamente no idioma oficial de publicação. Interface, filtros, idiomas e botões mudam integralmente com o idioma selecionado.",
    officialTitle: "Título oficial",
    details: "Ver detalhes",
    amazon: "Ver na Amazon",
    featured: "Destaque",
    aiCrime: "AI Crime Files",
    count: (n) => `${n} livros exibidos`,
    categories: { all: "Todos", ia: "IA & Agentes", dados: "Dados & Cloud", automacao: "Automação", direito: "Direito & Governo", internacional: "Internacional" },
    languages: { Português: "Português", Inglês: "Inglês", Espanhol: "Espanhol" },
  },
  en: {
    eyebrow: "Technical library · Amazon KDP",
    title: "Published books",
    subtitle: "Books on AI, agents, data engineering, cloud, automation, governance, security, and applied technology.",
    note: "Book titles stay exactly in their official publication language. Interface, filters, language labels, and buttons fully follow the selected language.",
    officialTitle: "Official title",
    details: "View details",
    amazon: "View on Amazon",
    featured: "Featured",
    aiCrime: "AI Crime Files",
    count: (n) => `${n} books shown`,
    categories: { all: "All", ia: "AI & Agents", dados: "Data & Cloud", automacao: "Automation", direito: "Law & Government", internacional: "International" },
    languages: { Português: "Portuguese", Inglês: "English", Espanhol: "Spanish" },
  },
  es: {
    eyebrow: "Biblioteca técnica · Amazon KDP",
    title: "Libros publicados",
    subtitle: "Libros sobre IA, agentes, ingeniería de datos, cloud, automatización, gobernanza, seguridad y tecnología aplicada.",
    note: "Los títulos permanecen exactamente en el idioma oficial de publicación. La interfaz, filtros, idiomas y botones cambian por completo con el idioma seleccionado.",
    officialTitle: "Título oficial",
    details: "Ver detalles",
    amazon: "Ver en Amazon",
    featured: "Destacado",
    aiCrime: "AI Crime Files",
    count: (n) => `${n} libros mostrados`,
    categories: { all: "Todos", ia: "IA y Agentes", dados: "Datos y Cloud", automacao: "Automatización", direito: "Derecho y Gobierno", internacional: "Internacional" },
    languages: { Português: "Portugués", Inglês: "Inglés", Espanhol: "Español" },
  },
  fr: {
    eyebrow: "Bibliothèque technique · Amazon KDP",
    title: "Livres publiés",
    subtitle: "Livres sur l’IA, les agents, l’ingénierie des données, le cloud, l’automatisation, la gouvernance, la sécurité et les technologies appliquées.",
    note: "Les titres restent exactement dans leur langue officielle de publication. L’interface, les filtres, les langues et les boutons suivent entièrement la langue sélectionnée.",
    officialTitle: "Titre officiel",
    details: "Voir les détails",
    amazon: "Voir sur Amazon",
    featured: "À la une",
    aiCrime: "AI Crime Files",
    count: (n) => `${n} livres affichés`,
    categories: { all: "Tous", ia: "IA & Agents", dados: "Données & Cloud", automacao: "Automatisation", direito: "Droit & Gouvernement", internacional: "International" },
    languages: { Português: "Portugais", Inglês: "Anglais", Espanhol: "Espagnol" },
  },
  it: {
    eyebrow: "Biblioteca tecnica · Amazon KDP",
    title: "Libri pubblicati",
    subtitle: "Libri su IA, agenti, data engineering, cloud, automazione, governance, sicurezza e tecnologia applicata.",
    note: "I titoli restano esattamente nella lingua ufficiale di pubblicazione. Interfaccia, filtri, lingue e pulsanti seguono completamente la lingua selezionata.",
    officialTitle: "Titolo ufficiale",
    details: "Vedi dettagli",
    amazon: "Vedi su Amazon",
    featured: "In evidenza",
    aiCrime: "AI Crime Files",
    count: (n) => `${n} libri mostrati`,
    categories: { all: "Tutti", ia: "IA & Agenti", dados: "Dati & Cloud", automacao: "Automazione", diritto: "Diritto & Governo", internazionale: "Internazionale" } as Record<Category,string>,
    languages: { Português: "Portoghese", Inglês: "Inglese", Espanhol: "Spagnolo" },
  },
  ja: {
    eyebrow: "技術ライブラリ · Amazon KDP",
    title: "出版書籍",
    subtitle: "AI、エージェント、データエンジニアリング、クラウド、自動化、ガバナンス、セキュリティ、応用技術に関する書籍です。",
    note: "書名はAmazonの正式な出版言語のまま表示します。インターフェース、フィルター、言語表示、ボタンは選択した言語に完全に切り替わります。",
    officialTitle: "正式書名",
    details: "詳細を見る",
    amazon: "Amazonで見る",
    featured: "注目",
    aiCrime: "AI Crime Files",
    count: (n) => `${n}冊を表示`,
    categories: { all: "すべて", ia: "AI・エージェント", dados: "データ・クラウド", automacao: "自動化", direito: "法律・行政", internacional: "国際" },
    languages: { Português: "ポルトガル語", Inglês: "英語", Espanhol: "スペイン語" },
  },
};

const LANGS: Language[] = ["pt", "en", "es", "fr", "it", "ja"];
const CATEGORIES: Category[] = ["all", "ia", "dados", "automacao", "direito", "internacional"];

export default function BooksCatalog({ isDark, language, onNavigate, onLanguageChange }: BooksCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const t = COPY[language];

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
        <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Language selector">
          {LANGS.map((lang) => (
            <button key={lang} type="button" onClick={() => onLanguageChange(lang)} className={`px-3 py-2 border font-mono text-[10px] font-black tracking-widest cursor-pointer ${language === lang ? "bg-[#F27D26] border-[#F27D26] text-white" : isDark ? "bg-[#111] border-[#333] text-[#AAA] hover:border-[#F27D26]" : "bg-white border-[#DDD] text-[#666] hover:border-[#F27D26]"}`}>
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
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
