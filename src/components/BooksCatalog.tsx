import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import { Language } from "../translations";
import { booksData } from "../data";

interface BooksCatalogProps {
  isDark: boolean;
  language: Language;
  onNavigate: (path: string) => void;
}

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  all: string;
  ai: string;
  data: string;
  automation: string;
  law: string;
  international: string;
  officialTitle: string;
  language: string;
  category: string;
  details: string;
  amazon: string;
  shown: (n: number) => string;
  featured: string;
  technicalReference: string;
  langNames: Record<string, string>;
  categoryNames: Record<string, string>;
};

const copy: Record<Language, Copy> = {
  pt: {
    eyebrow: "Biblioteca técnica · Amazon KDP",
    title: "Livros publicados",
    subtitle: "Catálogo técnico de IA, agentes, engenharia de dados, cloud, automação, governança e tecnologia aplicada.",
    note: "Os títulos permanecem no idioma oficial de publicação para corresponder exatamente à Amazon. Todo o restante da página acompanha o idioma selecionado.",
    all: "Todos",
    ai: "IA & Agentes",
    data: "Dados & Cloud",
    automation: "Automação",
    law: "Direito & Governo",
    international: "Internacional",
    officialTitle: "Título oficial",
    language: "Idioma",
    category: "Categoria",
    details: "Ver detalhes",
    amazon: "Ver na Amazon",
    shown: (n) => `${n} livros exibidos`,
    featured: "Destaque",
    technicalReference: "Referência técnica publicada",
    langNames: { Português: "Português", Inglês: "Inglês", Espanhol: "Espanhol" },
    categoryNames: { ia: "IA & Agentes", dados: "Dados & Cloud", automacao: "Automação", direito: "Direito & Governo", internacional: "Internacional" },
  },
  en: {
    eyebrow: "Technical library · Amazon KDP",
    title: "Published books",
    subtitle: "Technical catalog covering AI, agents, data engineering, cloud, automation, governance, and applied technology.",
    note: "Book titles remain in their official publication language so they match Amazon exactly. Everything else on the page follows the selected language.",
    all: "All",
    ai: "AI & Agents",
    data: "Data & Cloud",
    automation: "Automation",
    law: "Law & Government",
    international: "International",
    officialTitle: "Official title",
    language: "Language",
    category: "Category",
    details: "View details",
    amazon: "View on Amazon",
    shown: (n) => `${n} books shown`,
    featured: "Featured",
    technicalReference: "Published technical reference",
    langNames: { Português: "Portuguese", Inglês: "English", Espanhol: "Spanish" },
    categoryNames: { ia: "AI & Agents", dados: "Data & Cloud", automacao: "Automation", direito: "Law & Government", internacional: "International" },
  },
  es: {
    eyebrow: "Biblioteca técnica · Amazon KDP",
    title: "Libros publicados",
    subtitle: "Catálogo técnico sobre IA, agentes, ingeniería de datos, cloud, automatización, gobernanza y tecnología aplicada.",
    note: "Los títulos permanecen en el idioma oficial de publicación para coincidir exactamente con Amazon. Todo lo demás sigue el idioma seleccionado.",
    all: "Todos",
    ai: "IA y Agentes",
    data: "Datos y Cloud",
    automation: "Automatización",
    law: "Derecho y Gobierno",
    international: "Internacional",
    officialTitle: "Título oficial",
    language: "Idioma",
    category: "Categoría",
    details: "Ver detalles",
    amazon: "Ver en Amazon",
    shown: (n) => `${n} libros mostrados`,
    featured: "Destacado",
    technicalReference: "Referencia técnica publicada",
    langNames: { Português: "Portugués", Inglês: "Inglés", Espanhol: "Español" },
    categoryNames: { ia: "IA y Agentes", dados: "Datos y Cloud", automacao: "Automatización", direito: "Derecho y Gobierno", internacional: "Internacional" },
  },
  fr: {
    eyebrow: "Bibliothèque technique · Amazon KDP",
    title: "Livres publiés",
    subtitle: "Catalogue technique consacré à l’IA, aux agents, à l’ingénierie des données, au cloud, à l’automatisation et à la gouvernance.",
    note: "Les titres restent dans leur langue officielle de publication afin de correspondre exactement à Amazon. Tout le reste suit la langue sélectionnée.",
    all: "Tous",
    ai: "IA & Agents",
    data: "Données & Cloud",
    automation: "Automatisation",
    law: "Droit & Gouvernement",
    international: "International",
    officialTitle: "Titre officiel",
    language: "Langue",
    category: "Catégorie",
    details: "Voir les détails",
    amazon: "Voir sur Amazon",
    shown: (n) => `${n} livres affichés`,
    featured: "À la une",
    technicalReference: "Référence technique publiée",
    langNames: { Português: "Portugais", Inglês: "Anglais", Espanhol: "Espagnol" },
    categoryNames: { ia: "IA & Agents", dados: "Données & Cloud", automacao: "Automatisation", direito: "Droit & Gouvernement", internacional: "International" },
  },
  it: {
    eyebrow: "Biblioteca tecnica · Amazon KDP",
    title: "Libri pubblicati",
    subtitle: "Catalogo tecnico su IA, agenti, data engineering, cloud, automazione, governance e tecnologia applicata.",
    note: "I titoli restano nella lingua ufficiale di pubblicazione per corrispondere esattamente ad Amazon. Tutto il resto segue la lingua selezionata.",
    all: "Tutti",
    ai: "IA & Agenti",
    data: "Dati & Cloud",
    automation: "Automazione",
    law: "Diritto & Governo",
    international: "Internazionale",
    officialTitle: "Titolo ufficiale",
    language: "Lingua",
    category: "Categoria",
    details: "Vedi dettagli",
    amazon: "Vedi su Amazon",
    shown: (n) => `${n} libri mostrati`,
    featured: "In evidenza",
    technicalReference: "Riferimento tecnico pubblicato",
    langNames: { Português: "Portoghese", Inglês: "Inglese", Espanhol: "Spagnolo" },
    categoryNames: { ia: "IA & Agenti", dados: "Dati & Cloud", automacao: "Automazione", direito: "Diritto & Governo", internacional: "Internazionale" },
  },
  ja: {
    eyebrow: "技術ライブラリ · Amazon KDP",
    title: "出版書籍",
    subtitle: "AI、エージェント、データエンジニアリング、クラウド、自動化、ガバナンス、応用技術の技術書カタログです。",
    note: "Amazonの商品名と正確に一致させるため、書名は出版時の正式言語のまま表示します。それ以外の表示は選択した言語に切り替わります。",
    all: "すべて",
    ai: "AI・エージェント",
    data: "データ・クラウド",
    automation: "自動化",
    law: "法律・行政",
    international: "国際",
    officialTitle: "正式書名",
    language: "言語",
    category: "カテゴリ",
    details: "詳細を見る",
    amazon: "Amazonで見る",
    shown: (n) => `${n}冊を表示`,
    featured: "注目",
    technicalReference: "出版済み技術リファレンス",
    langNames: { Português: "ポルトガル語", Inglês: "英語", Espanhol: "スペイン語" },
    categoryNames: { ia: "AI・エージェント", dados: "データ・クラウド", automacao: "自動化", direito: "法律・行政", internacional: "国際" },
  },
};

const categories = ["all", "ia", "dados", "automacao", "direito", "internacional"] as const;
type CategoryFilter = (typeof categories)[number];

export default function BooksCatalog({ isDark, language, onNavigate }: BooksCatalogProps) {
  const t = copy[language];
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const requested = params.get("category") as CategoryFilter | null;
  const active: CategoryFilter = requested && categories.includes(requested) ? requested : "all";
  const visible = active === "all" ? booksData : booksData.filter((book) => book.category === active);

  const goCategory = (category: CategoryFilter) => {
    const url = category === "all" ? "/books" : `/books?category=${category}`;
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const categoryLabel = (category: CategoryFilter) => {
    if (category === "all") return t.all;
    return t.categoryNames[category] ?? category;
  };

  return (
    <article className="max-w-7xl mx-auto px-6 py-12">
      <header className="max-w-4xl mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F27D26] font-bold mb-3">{t.eyebrow}</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light italic tracking-tight text-[#F27D26] mb-4" style={{ fontFamily: "'Georgia', serif" }}>
          {t.title}
        </h1>
        <p className={`${isDark ? "text-[#A8A8A8]" : "text-[#555]"} text-sm sm:text-base leading-relaxed max-w-3xl`}>{t.subtitle}</p>
        <div className={`mt-5 border-l-2 border-[#F27D26] px-4 py-3 text-xs leading-relaxed ${isDark ? "bg-[#111] text-[#A8A8A8]" : "bg-white text-[#555]"}`}>
          {t.note}
        </div>
      </header>

      <div className="flex flex-wrap gap-2 mb-3" aria-label={t.category}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => goCategory(category)}
            className={`px-3 py-2 border text-[10px] uppercase tracking-widest font-mono font-bold transition-colors cursor-pointer ${
              active === category
                ? "border-[#F27D26] bg-[#F27D26] text-white"
                : isDark
                  ? "border-[#333] bg-[#111] text-[#999] hover:border-[#F27D26] hover:text-white"
                  : "border-[#DDD] bg-white text-[#666] hover:border-[#F27D26] hover:text-black"
            }`}
          >
            {categoryLabel(category)}
          </button>
        ))}
      </div>
      <div className={`font-mono text-[10px] uppercase tracking-widest mb-8 ${isDark ? "text-[#666]" : "text-[#888]"}`}>{t.shown(visible.length)}</div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map((book) => {
          const featured = book.id === "harness-engineering-data-agents-databricks";
          const categoryName = t.categoryNames[book.category] ?? book.category;
          const languageName = t.langNames[book.lang] ?? book.lang;
          return (
            <article key={book.id} className={`p-6 border flex flex-col justify-between min-h-[280px] transition-all ${featured ? "border-[#FF3037]" : isDark ? "border-[#2A2A2A] bg-[#0F0F0F]" : "border-[#E5E5DF] bg-white"}`}>
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="text-2xl" aria-hidden="true">{book.coverEmoji || <BookOpen className="w-6 h-6" />}</span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {featured && <span className="border border-[#6A1E22] text-[#FF3037] px-2 py-1 font-mono text-[8px] uppercase tracking-widest font-bold">{t.featured}</span>}
                    <span className={`border px-2 py-1 font-mono text-[8px] uppercase tracking-widest ${isDark ? "border-[#333] text-[#999]" : "border-[#DDD] text-[#666]"}`}>{languageName}</span>
                  </div>
                </div>

                <div className={`font-mono text-[8px] uppercase tracking-[0.16em] mb-2 ${isDark ? "text-[#666]" : "text-[#888]"}`}>{t.officialTitle}</div>
                <h2 className="text-xl leading-snug font-light italic mb-3" style={{ fontFamily: "'Georgia', serif" }}>{book.title}</h2>
                <p className={`text-[11px] leading-relaxed ${isDark ? "text-[#8E8E8E]" : "text-[#666]"}`}>{t.technicalReference} · {categoryName}</p>
              </div>

              <div className={`mt-6 pt-4 border-t ${isDark ? "border-[#222]" : "border-[#EEE]"}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`font-mono text-[8px] uppercase tracking-wider ${isDark ? "text-[#666]" : "text-[#999]"}`}>ASIN: {book.asin}</span>
                  <span className={`font-mono text-[8px] uppercase tracking-wider ${isDark ? "text-[#666]" : "text-[#999]"}`}>{categoryName}</span>
                </div>
                {book.link.startsWith("/") ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(book.link)}
                    className={`w-full px-4 py-3 border text-[10px] uppercase tracking-widest font-mono font-black flex items-center justify-center gap-2 cursor-pointer transition-colors ${featured ? "border-[#FF3037] text-[#FF3037] hover:bg-[#FF3037] hover:text-white" : "border-[#F27D26] text-[#F27D26] hover:bg-[#F27D26] hover:text-white"}`}
                  >
                    {t.details} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 border border-[#F27D26] text-[#F27D26] hover:bg-[#F27D26] hover:text-white text-[10px] uppercase tracking-widest font-mono font-black flex items-center justify-center gap-2 transition-colors"
                  >
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
