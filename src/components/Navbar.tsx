import { useState, useEffect } from "react";
import { Moon, Sun, Linkedin, Github } from "lucide-react";
import { motion } from "motion/react";
import { Language, translations } from "../translations";
import { AI_CRIME_BASE_PATH, getLocalizedAICrimePath, normalizeAICrimePath } from "../aiCrimeData";
import { aiCrimeUi } from "../aiCrimeI18n";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Navbar({ isDark, toggleTheme, language, setLanguage, currentPath, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = translations[language].navbar;
  const consultingLabel = language === "pt" ? "Consultoria" :
                          language === "es" ? "Consultoría" :
                          language === "fr" ? "Conseil" :
                          language === "it" ? "Consulenza" :
                          language === "ja" ? "コンサルティング" : "Consulting";

  const navLinks = [
    { label: t.about, href: "/about", path: "/about" },
    { label: t.ecosystem, href: "/start-here", path: "/start-here" },
    { label: t.books, href: "/books", path: "/books" },
    { label: aiCrimeUi[language].seriesLabel, href: getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language), path: getLocalizedAICrimePath(AI_CRIME_BASE_PATH, language) },
    { label: t.articles, href: "/articles", path: "/articles" },
    { label: consultingLabel, href: "/consulting", path: "/consulting" },
  ];

  return (
    <motion.header
      id="main-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
              ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#2A2A2A]"
              : "bg-[#F5F5F0]/90 backdrop-blur-xl border-b border-[#E5E5DF]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="/"
          id="logo-brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/");
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className={`w-8 h-8 border flex items-center justify-center font-bold text-xs transition-colors rounded-sm ${
            isDark ? "border-[#F5F5F0] text-[#F5F5F0] group-hover:border-[#F27D26]" : "border-[#0A0A0A] text-[#0A0A0A] group-hover:border-[#F27D26]"
          }`}>
            LC
          </div>
          <span className="text-xs tracking-[0.25em] uppercase font-semibold hidden sm:inline-block">
            Leandro Calado <span className="opacity-50 text-[10px] font-light">Ferreira</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.path);
              }}
              className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                isDark
                  ? "text-[#8E8E8E] hover:text-[#F5F5F0]"
                  : "text-[#555] hover:text-[#0A0A0A]"
              } font-medium ${currentPath === link.path || (normalizeAICrimePath(link.path) === AI_CRIME_BASE_PATH && normalizeAICrimePath(currentPath).startsWith(`${AI_CRIME_BASE_PATH}/`)) ? "text-[#F27D26] font-bold" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            id="language-select"
            className={`px-2 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm border cursor-pointer focus:outline-none focus:border-[#F27D26] transition-colors ${
              isDark
                ? "bg-[#151515] border-[#2A2A2A] text-[#F5F5F0] hover:bg-[#202020]"
                : "bg-white border-[#E5E5DF] text-[#0A0A0A] hover:bg-slate-50"
            }`}
            aria-label="Selecionar Idioma"
          >
            <option value="pt" className={isDark ? "bg-[#151515] text-[#F5F5F0]" : "bg-white text-[#0A0A0A]"}>PT</option>
            <option value="en" className={isDark ? "bg-[#151515] text-[#F5F5F0]" : "bg-white text-[#0A0A0A]"}>EN</option>
            <option value="es" className={isDark ? "bg-[#151515] text-[#F5F5F0]" : "bg-white text-[#0A0A0A]"}>ES</option>
            <option value="fr" className={isDark ? "bg-[#151515] text-[#F5F5F0]" : "bg-white text-[#0A0A0A]"}>FR</option>
            <option value="it" className={isDark ? "bg-[#151515] text-[#F5F5F0]" : "bg-white text-[#0A0A0A]"}>IT</option>
            <option value="ja" className={isDark ? "bg-[#151515] text-[#F5F5F0]" : "bg-white text-[#0A0A0A]"}>JA</option>
          </select>

          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            className={`p-2 rounded transition-colors border ${
              isDark
                ? "bg-[#151515] border-[#2A2A2A] text-[#F5F5F0] hover:bg-[#202020]"
                : "bg-white border-[#E5E5DF] text-[#0A0A0A] hover:bg-[#E5E5DF]"
            }`}
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="https://www.linkedin.com/in/lcaladoferreira/"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-linkedin-cta"
            className={`p-2 rounded border transition-colors hidden xs:flex ${
              isDark
                ? "bg-[#151515] border-[#2A2A2A] text-[#8E8E8E] hover:text-white"
                : "bg-white border-[#E5E5DF] text-[#555] hover:text-black"
            }`}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/lcaladoferreira"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github-cta"
            className={`p-2 rounded border transition-colors hidden xs:flex ${
              isDark
                ? "bg-[#151515] border-[#2A2A2A] text-[#8E8E8E] hover:text-white"
                : "bg-white border-[#E5E5DF] text-[#555] hover:text-black"
            }`}
            aria-label="GitHub"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          <a
            href="/consulting"
            id="nav-consult-cta"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/consulting");
            }}
            className={`px-5 py-2.5 text-[10px] tracking-widest uppercase transition-all duration-300 rounded font-semibold border ${
              isDark
                ? "border-[#F5F5F0] text-[#F5F5F0] hover:bg-white hover:text-black"
                : "border-[#0A0A0A] text-[#0A0A0A] hover:bg-black hover:text-white"
            }`}
          >
            {consultingLabel}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
