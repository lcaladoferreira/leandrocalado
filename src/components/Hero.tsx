import { motion } from "motion/react";
import { BookOpen, ShieldCheck, MapPin, Sparkles, Database, FileText } from "lucide-react";
import { Language, translations } from "../translations";

interface HeroProps {
  isDark: boolean;
  language: Language;
}

export default function Hero({ isDark, language }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.65, ease: "easeOut" } },
  };

  const t = translations[language].hero;

  const titlesPublishedText = 
    language === "pt" ? "116 Títulos Técnicos Publicados" :
    language === "es" ? "116 Títulos Técnicos Publicados" :
    language === "fr" ? "116 Titres Techniques Publiés" :
    language === "it" ? "116 Titoli Tecnici Pubblicati" :
    language === "ja" ? "116件の技術書を出版" :
    "116 Technical Titles Published";

  const engineersUpgradedText = 
    language === "pt" ? "3.600+ Engenheiros Capacitados" :
    language === "es" ? "3.600+ Ingenieros Capacitados" :
    language === "fr" ? "3 600+ Ingénieurs Formés" :
    language === "it" ? "3.600+ Ingegneri Qualificati" :
    language === "ja" ? "3,600人以上のエンジニアを育成" :
    "3,600+ Engineers Upgraded";

  const stats = [
    { value: "116", label: t.published, desc: "Amazon KDP", icon: BookOpen },
    { value: "1.867", label: t.newsletter, desc: "Medium", icon: Sparkles },
    { value: "55+", label: t.publishedArticles, desc: "Jusbrasil", icon: FileText },
    { value: "4", label: t.workingLanguages, desc: "PT, EN, ES, DE", icon: ShieldCheck },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden" id="hero">
      {/* Background gradients aligned with clean modern glow of amber/orange theme */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 ${
            isDark ? "bg-[#F27D26]/5" : "bg-[#F27D26]/10"
          }`}
        />
        <div
          className={`absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-700 ${
            isDark ? "bg-[#F5F5F0]/3" : "bg-[#0A0A0A]/5"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Main Headline content with Light weight serif combo */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Tagline / Indicator with precision border */}
              <motion.div
                variants={itemVariants}
                id="hero-eyebrow"
                className={`flex items-center gap-2 px-3 py-1 text-[9px] uppercase tracking-widest border rounded-sm ${
                  isDark
                    ? "bg-[#0F0F0F] text-[#F27D26] border-[#F27D26]/40"
                    : "bg-white text-[#F27D26] border-[#F27D26]/60"
                }`}
              >
                <MapPin className="w-3 h-3" />
                {t.tagline}
              </motion.div>

              {/* Branded LC Impact Badge */}
              <motion.div
                variants={itemVariants}
                id="hero-impact-badge"
                className={`flex items-center gap-2 px-3 py-0.5 border rounded-sm font-mono ${
                  isDark
                    ? "bg-[#0F0F0F] border-[#F27D26]/30 text-[#e8e6e1]"
                    : "bg-white border-[#F27D26]/40 text-[#0A0A0A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-[8px] border border-[#F27D26] text-[#F27D26] bg-[#F27D26]/10 rounded-sm">
                    LC
                  </span>
                  <span className="font-semibold text-xs text-[#F27D26] tracking-tight">
                    {titlesPublishedText}
                  </span>
                  <span className="text-gray-400 opacity-60 text-[10px]">|</span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {engineersUpgradedText}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Rich Georgia-styled display light italic headline */}
            <motion.h1
              variants={itemVariants}
              id="hero-main-headline"
              className="text-4xl sm:text-5xl md:text-6.5xl leading-[1.08] font-light tracking-tight italic text-left mb-6"
              style={{ fontFamily: "'Georgia', 'Instrument Serif', serif" }}
            >
              {t.headline}<span className="text-[#F27D26]">{t.headlineAlt}</span>
            </motion.h1>

            {/* Subheadline describing the unique value-add */}
            <motion.p
              variants={itemVariants}
              id="hero-subheadline"
              className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-10 ${
                isDark ? "text-[#8E8E8E]" : "text-[#555]"
              }`}
            >
              {t.subheadline}
            </motion.p>

            {/* CTAs with modern Elena premium style buttons */}
            <motion.div variants={itemVariants} id="hero-actions" className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href="#livros"
                id="hero-cta-primary"
                className={`w-full sm:w-auto text-center px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border rounded-sm ${
                  isDark
                    ? "bg-[#F5F5F0] border-[#F5F5F0] text-[#0A0A0A] hover:bg-transparent hover:text-[#F5F5F0]"
                    : "bg-[#0A0A0A] border-[#0A0A0A] text-[#F5F5F0] hover:bg-transparent hover:text-[#0A0A0A]"
                }`}
              >
                {t.ctaLibrary}
              </a>
              <a
                href="#ecossistema"
                id="hero-cta-secondary"
                className={`w-full sm:w-auto text-center px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border rounded-sm ${
                  isDark
                    ? "border-[#8E8E8E] text-[#F5F5F0] hover:border-white hover:bg-white/[0.02]"
                    : "border-[#555] text-[#0A0A0A] hover:border-black hover:bg-black/[0.02]"
                }`}
              >
                {t.ctaEcosystem}
              </a>
            </motion.div>

            <motion.a
              variants={itemVariants}
              href="/harness-engineering/openai-wikimedia-rogue-agents"
              className={`mt-6 block max-w-2xl border-l-2 border-amber-500 pl-4 py-1 transition-opacity hover:opacity-80 ${isDark ? "text-[#F5F5F0]" : "text-[#0A0A0A]"}`}
            >
              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-500">Breaking analysis · Oct 5, 2026</span>
              <strong className="mt-1 block text-sm font-semibold">OpenAI “rogue” agents on Wikimedia — what the incident reveals about Harness Engineering →</strong>
            </motion.a>
          </div>

          {/* Abstract elegant visual layout block or dynamic dashboard mock */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 relative flex items-center justify-center"
          >
            <div
              className={`w-full max-w-[340px] aspect-square rounded-sm p-8 border relative flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
                isDark
                  ? "bg-[#0F0F0F] border-[#2A2A2A] text-[#F5F5F0]"
                  : "bg-white border-[#E5E5DF] text-[#0A0A0A]"
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] ${
                  isDark ? "bg-[#F27D26]/10" : "bg-[#F27D26]/20"
                }`}
              />
              <div className="flex justify-between items-start relative z-10">
                <Database className="w-8 h-8 text-[#F27D26]" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#F27D26]">
                  {t.verified}
                </span>
              </div>

              <div className="relative z-10 my-6">
                <blockquote
                  className={`text-lg leading-relaxed italic text-left ${
                    isDark ? "text-[#8E8E8E]" : "text-[#555]"
                  }`}
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {t.quote}
                </blockquote>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-sm border flex items-center justify-center font-display font-semibold transition-colors ${
                  isDark ? "border-[#2A2A2A] bg-[#151515] text-[#F27D26]" : "border-[#E5E5DF] bg-[#F5F5F0] text-[#F27D26]"
                }`}>
                  LC
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold">Leandro Calado</p>
                  <p className="text-[10px] font-mono opacity-60">
                    USP MBA Data Science
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid formatted to Professional Polish layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          id="hero-stats-panel"
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-20 pt-10 border-t ${
            isDark ? "border-[#2A2A2A]" : "border-[#E5E5DF]"
          }`}
        >
          {stats.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className={`p-2.5 rounded-sm border ${isDark ? "bg-[#0F0F0F] border-[#2A2A2A]" : "bg-white border-[#E5E5DF]"}`}>
                  <IconComp className="w-4 h-4 text-[#F27D26]" />
                </div>
                <div className="text-left">
                  <p className="text-3xl font-light font-display leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest opacity-60">
                    {stat.label}
                  </p>
                  <p className={`text-[11px] ${isDark ? "text-[#8E8E8E]" : "text-[#555]"}`}>
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
