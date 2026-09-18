import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Terminal, 
  GitBranch, 
  Code, 
  Workflow, 
  CheckCircle, 
  ChevronRight, 
  ChevronDown,
  ArrowUpRight,
  ShieldAlert,
  Server,
  TrendingUp,
  Sliders,
  Users,
  Check,
  Cpu
} from "lucide-react";
import { Language } from "../translations";

interface HarnessEngineeringBookProps {
  isDark: boolean;
  language: Language;
  onNavigate: (path: string) => void;
}

export default function HarnessEngineeringBook({ isDark, language, onNavigate }: HarnessEngineeringBookProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Update page title, meta description, and open graph tags on mount
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Harness Engineering Book: Which One Fits Production AI Agents?";

    const updateOrCreateMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", nameOrProperty);
        } else {
          element.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.content = value;
    };

    updateOrCreateMeta("description", "Compare Leandro Calado's practical AI coding-agent manual with O'Reilly's forthcoming Harness Engineering book. Choose by scope, availability and production controls.");
    updateOrCreateMeta("og:title", "Harness Engineering Book: Which One Fits Production AI Agents?", true);
    updateOrCreateMeta("og:description", "Compare two harness engineering books by availability, scope, working artifacts and production-agent controls.", true);
    updateOrCreateMeta("og:type", "book", true);
    updateOrCreateMeta("og:url", "https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents", true);
    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", "Harness Engineering Book: Which One Fits Production AI Agents?");
    updateOrCreateMeta("twitter:description", "Compare two harness engineering books by scope, availability and production-agent controls.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const originalCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", "https://leandrocaladoferreira.com/books/harness-engineering-ai-coding-agents");

    return () => {
      document.title = originalTitle;
      if (originalCanonical) {
        canonical.setAttribute("href", originalCanonical);
      } else {
        canonical.removeAttribute("href");
      }
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const bgClass = isDark ? "bg-[#0B1020] text-[#F3F4F6]" : "bg-[#F3F4F6] text-[#0F172A]";
  const cardClass = isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200 shadow-sm";
  const subTitleClass = isDark ? "text-gray-400" : "text-gray-600";

  const amazonUrl = "https://www.amazon.com.br/dp/B0GYG3WG4Q"; // Real Amazon link.
  const trackBookClick = (placement: string) => {
    const analytics = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    analytics?.("event", "amazon_book_click", {
      book_asin: "B0GYG3WG4Q",
      placement,
    });
  };

  // Multi-language translation catalog
  const isPt = language === "pt";
  const t = {
    badge: isPt ? "★ NOVO LANÇAMENTO: MANUAL TÉCNICO" : "★ NEW RELEASE TECHNICAL MANUAL",
    titleHarness: "Which Harness Engineering Book",
    titleFor: "Fits Production AI Agents?",
    subtitle: isPt 
      ? "Você precisa de um livro de Harness Engineering porque o agente alterou o arquivo errado, ignorou uma barreira ou entregou um diff sem verificação. Esta página separa o manual disponível da arquitetura mais ampla prometida pela O'Reilly."
      : "You need a harness engineering book because an agent changed the wrong file, bypassed a gate, or shipped an unverified diff. This page separates the available implementation manual from O'Reilly's broader forthcoming architecture title.",
    ctaHero: isPt ? "Comprar na Amazon Kindle" : "Get the book on Amazon Kindle",
    microcopy: isPt 
      ? "Pare com o vibe coding. Comece a entregar alterações reais que sua CI realmente confia."
      : "Stop vibe coding. Start shipping AI-generated changes your CI can actually trust.",
    bulletSenior: isPt ? "Para DEVs Sêniores" : "For Senior Developers",
    bulletTeams: isPt ? "Times Livres de Risco" : "Risk-Free Teams",
    bulletConsultant: isPt ? "Guia para Consultores" : "Consultant Blueprint",
    
    breadcrumbsHome: isPt ? "Início" : "Home",
    breadcrumbsBooks: isPt ? "Livros" : "Books",
    breadcrumbsCurrent: "Harness Engineering Guide",

    problemBadge: isPt ? "A VULNERABILIDADE ESTRUTURAL" : "THE STRUCTURAL VULNERABILITY",
    problemTitle: isPt ? "Vibe coding funciona em protótipos. Quebra em produção." : "Vibe coding works in prototypes. It breaks in production.",
    problemP1: isPt 
      ? "Agentes de codificação de IA facilitam refatorar módulos, criar endpoints ou corrigir bugs em minutos. Os diffs parecem limpos, o código compila e os testes podem passar — até que uma condição de corrida, uma falha de segurança ou uma alteração silenciosa apareça semanas depois."
      : "AI coding agents make it feel easy to refactor modules, wire new endpoints, or patch bugs in minutes. The diffs look clean, the code compiles, and tests might even pass—until a race condition, a missing security check, or a silently deleted guard shows up weeks later.",
    problemP2: isPt 
      ? "Esse é o problema estrutural com o \"vibe coding\": ele otimiza o código para ter aparência de corretude, não corretude verificada real, cobrando seu preço por meio de brechas na segurança, alertas de on-call exaustivos e deploys caóticos de reparo."
      : "This is the structural problem with \"vibe coding\": it optimizes for the appearance of correctness, not verified correctness, and your team pays for it with hidden security holes, noisy on-call duty, and painful cleanup deployments.",
    problemLink: isPt ? "Ver o livro na Amazon Kindle" : "Get the book on Amazon Kindle",
    
    failureTitle: isPt ? "Modos de Falha Comuns" : "Typical Failure Modes",
    fmScope: isPt 
      ? "Desvio de Escopo: Refatorações arbitrárias em arquivos ou pastas core que você nunca pediu para o agente modificar."
      : "Scope Creep: Unsolicited refactors in files you never asked the agent to modify.",
    fmDeletions: isPt 
      ? "Exclusões Invisíveis: Remoção silenciosa de verificações de autorização, regras de segurança fundamentais ou arquivos de logs."
      : "Invisible Deletions: Stealth withdrawal of load-bearing checks, flags, and security filters.",
    fmShift: isPt 
      ? "Erros de Integração: Alterações válidas localmente que corrompem a lógica global integrada de sistemas maiores."
      : "Context Shift Failures: Valid diff changes that break system-wide logical configurations.",
    fmBypass: isPt 
      ? "Bypasses de CI: Alteração sorrateira em arquivos de configuração ou mocks apenas para forçar testes a passarem."
      : "CI Bypass Hacks: Dropping tests, adding `# noqa` filters, or changing configs just to escape gates.",
    fmSecurity: isPt 
      ? "Vulnerabilidades de Código: Chaves de API no código, autorizações negligenciadas ou criptografia deficiente implementada pela IA."
      : "Security Cracks: Unsafe hardcoded strings, flawed authorization, or weak crypto blocks.",

    solutionBadge: isPt ? "A MUDANÇA PARADIGMÁTICA" : "THE INTELLECTUAL SHIFT",
    solutionTitle: isPt ? "Você não confia na IA. Você a controla com sistemas." : "You don’t trust the AI. You control it with systems.",
    solutionP1: isPt 
      ? "Este livro apresenta a Engenharia de Harness: tratar os agentes de codificação como prestadores talentosos sem contexto operacional global, atuando sob severas restrições e validações determinísticas automáticas."
      : "This book introduces Harness Engineering: treating AI coding agents like powerful but context-free contractors operating inside a strict system of constraints, checks, and deterministic gates.",
    solutionP2: isPt 
      ? "Ao invés de passar horas lapidando prompts genéricos, você envolve o agente com uma constituição de repositório AGENTS.md, especificações formais de limites, loops PVE e testes analíticos de cobertura."
      : "Instead of spending hours tweaking prompts, you surround the agent with an AGENTS.md constitution, machine-verifiable task specs, closed plan-verify-execute loops, strict integration tests, security scanners, and automated merge gates that systematically block bad code.",
    
    diagramTitle: isPt ? "ESTEIRA DE SEGURANÇA HARNESS" : "THE HARDENED HARNESS PIPELINE",
    step1Title: "Task Spec",
    step1Desc: isPt ? "Diretrizes e caminhos exclusivos de trabalho para o agente." : "Objective, constraints, and machine-valid boundaries.",
    step2Title: "Context Pack",
    step2Desc: isPt ? "Mapeamento compacto de arquivos e esquemas para evitar ruído de tokens." : "Curated patterns and schemas fed selectively into agent context.",
    step3Title: "PVE Loop",
    step3Desc: isPt ? "A IA detalha o planejamento de escrita antes de autorizar a mudança física." : "Explicit structured plans proposed and checked for scope drift.",
    step4Title: "Validators",
    step4Desc: isPt ? " pytest, scans de vulnerabilidades com bandit e ruff integrados." : "Ruff, Bandit, Pytest, and type check checks blocking failures.",
    step5Title: "CI Gating",
    step5Desc: isPt ? "Bloqueio em Pull Requests via GitHub Actions em caso de regressão." : "Automated PR checks blocking deviations prior to main.",

    buildBadge: isPt ? "O PROJETO PRÁTICO DO LIVRO" : "THE PRACTICAL MANUAL",
    buildTitle: isPt ? "Ao final do livro, você terá uma arquitetura completa de Harness integrada" : "By the end of the book, you will have a complete harness system",
    buildSubtitle: isPt 
      ? "Trabalhando em um projeto backend real FastAPI de alta performance comercial chamado VaultAPI, você irá acoplar todas as camadas do harness e observar o barramento impedindo falhas em produção."
      : "Working on a real FastAPI reference project called VaultAPI, you will assemble a full-stack harness around your AI coding agents and see every piece in action.",
    buildCta: isPt ? "Implementar Barreiras em Meus Agentes" : "Put a harness around your AI agents",

    buildCardsPoints: [
      { 
        t: isPt ? "Constituição AGENTS.md" : "AGENTS.md Constitution", 
        c: isPt 
          ? "Diretivas declarando pastas permitidas, ações vetadas, padrões de design recomendados e regras de supressão segura." 
          : "A structured repository file defining allowed folders, prohibited operations, strict style standards, and rule suppression hooks." 
      },
      { 
        t: isPt ? "Diretivas Task Specs" : "Task Spec Framework", 
        c: isPt 
          ? "Instruções YAML delimitando caminhos autorizados, limiares de linhas alteráveis e regras de validação pré-agente." 
          : "YAML specification contracts mapping requirements, files-to-access, allowed paths, and direct behavioral boundaries prior to agent runs." 
      },
      { 
        t: isPt ? "Loops Planejar-Verificar" : "Plan-Verify Loops", 
        c: isPt 
          ? "Rotina na máquina onde o agente relata o planejamento lógico detalhando os buffers de escrita pré-filesystem." 
          : "Enforced logical procedures where the agent must state intended edits, calculate line delta counts, and map out paths prior to file system execution." 
      },
      { 
        t: isPt ? "Context Pack Adaptativo" : "Minimal Context Packs", 
        c: isPt 
          ? "Pacote compacto que injeta relações de classes e esquemas chaves sem quebrar o limite operacional de tokens." 
          : "A python wrapper mapping file graphs and selective schemas to target agents inside the token envelope without overloading model reasoning." 
      },
      { 
        t: isPt ? "Travas de Escrita Críticas" : "File Boundary Rules", 
        c: isPt 
          ? "Mecanismos que travam edições automáticas em arquivos core sensíveis como migrações PostgreSQL estruturais." 
          : "Restricting write access on sensitive system paths such as migrations, database layouts, or auth keys through automation loops." 
      },
      { 
        t: isPt ? "Mecanismos Avançados de CI" : "CI Gating & PR Reviews", 
        c: isPt 
          ? "Validador que afere a cobertura de testes no GitHub Actions e recusa de imediato commits que reduzem métricas." 
          : "Automated PR check actions that block branch merges, verify coverage deltas, and output clean reviews for developers." 
      }
    ],

    benefitsBadge: isPt ? "RESULTADOS MENSURÁVEIS EM SISTEMAS" : "MEASURABLE SYSTEM OUTCOMES",
    benefitsTitle: isPt ? "Por que este harness torna seu fluxo de desenvolvimento mais ágil e seguro" : "Why this harness makes your AI coding workflow safer and faster",
    benefitsDevsTitle: isPt ? "Para Desenvolvedores Individuais" : "For Individual Developers",
    benefitsTeamsTitle: isPt ? "Para CTOs e Equipes" : "For Teams and CTOs",

    devsBenefitsList: [
      isPt 
        ? "<strong>Escalabilidade Autônoma:</strong> Desenvolva em larga escala mantendo o comportamento de software e a privacidade impecáveis." 
        : "<strong>Autonomous scale:</strong> Ship features designed with the power of modern agents while retaining pixel-perfect structural and logical boundaries.",
      isPt 
        ? "<strong>Eliminação de Retrabalho:</strong> Esqueça as horas perdidas caçando efeitos colaterais em áreas que você nunca planejou alterar." 
        : "<strong>Zero-backlog debugging:</strong> Eliminate the need to spend days searching for regression traps deep in files you never planned to edit.",
      isPt 
        ? "<strong>Destaque Profissional:</strong> Desenvolva uma das habilidades mais lucrativas hoje: desenhar barreiras analíticas para times de engenharia." 
        : "<strong>Value creation:</strong> Elevate your skill portfolio to become a valuable consultant mapping enterprise AI-Agent alignment layers."
    ],
    teamsBenefitsList: [
      isPt 
        ? "<strong>Redução Bruta de Incidentes:</strong> Impeça falhas, injeções ou bibliotecas não-autenticadas antes de solicitar testes manuais humanos." 
        : "<strong>Incident reduction:</strong> Block security risks, memory leak models, and faulty databases before human review is even triggered.",
      isPt 
        ? "<strong>Políticas Escritas:</strong> Registre as boas práticas técnicas em ferramentas ativas de verificação em vez de manuais em PDF offline." 
        : "<strong>Persistent Standards:</strong> Codify architectural practices, framework bounds, and anti-patterns inside repository assets instead of tribal lore.",
      isPt 
        ? "<strong>Produtividade Confiável:</strong> Crie um processo repetitivo aplicável para desenvolvedores juniores, seniores ou robóticos indistintamente." 
        : "<strong>Deterministic Velocity:</strong> Establish a repeatable, team-wide workflow that runs inside existing CI pipes instead of relying on improvised prompts."
    ],

    audienceIsTitle: isPt ? "Para quem este livro foi escrito" : "Who should read this book",
    audienceIsNotTitle: isPt ? "Para quem este livro não é indicado" : "Who this book is not for",

    audienceIsList: [
      isPt 
        ? "Desenvolvedores de nível pleno a sênior buscando blindar seus Pull Requests e automatizar revisões repetitivas." 
        : "Senior and mid-level Python developers using Claude Code, Codex, or Cursor on real-world repositories.",
      isPt 
        ? "Tech Leads, Staff Engineers e gestores de tecnologia necessitando governar a qualidade em times com aceleração de IA." 
        : "Tech leads, staff engineers, and CTOs managing quality in AI-assisted coding teams.",
      isPt 
        ? "Equipes de DevOps e SREs focados em modelar segurança no upload contínuo de novas funcionalidades." 
        : "DevOps and platform engineers designing custom pipelines or actions targeting code review.",
      isPt 
        ? "Arquitetos técnicos e prestadores de serviços de software prontos para monetizar setups de IA automatizados." 
        : "Independent contractors and technical educators who want to sell custom AI workflows to companies."
    ],
    audienceIsNotList: [
      isPt 
        ? "Pessoas que não produzem, mantêm ou avaliam código de software comercial de verdade." 
        : "People who do not ship, maintain, or evaluate production-grade software code.",
      isPt 
        ? "Leitores buscando receitas prontas de 'como enriquecer fácil no chat' sem esforço de engenharia estrutural." 
        : "Readers chasing generic prompt lists, copy-paste buzzwords, or \"get rich with AI\" models.",
      isPt 
        ? "Times totalmente avessos ao ganho estratégico de aceleração analítica proporcionado por robôs auxiliares." 
        : "Teams completely uninterested in incorporating AI assistants or automation loops in their workflow.",
      isPt 
        ? "Iniciantes de no-code que nunca operaram sistemas Git, linha de comando, pytest ou contêineres." 
        : "No-code generalists who have never used Git command lines, unit tests, or CI triggers."
    ],

    curriculumBadge: isPt ? "CONGRESSO DE CONTEÚDO" : "CURRICULUM BREAKDOWN",
    curriculumTitle: isPt ? "Por dentro do manual técnico: do mindset à monetização" : "Inside the harness: from mindset to monetization",

    chapters: [
      { 
        t: isPt ? "1. O Paradigma da Engenharia de Harness" : "1. The Harness Engineering Mindset", 
        d: isPt 
          ? "Como sair do empirismo de prompts e consolidar verificações lógicas determinísticas que impossibilitam falhas bobas." 
          : "You’ll move from 'pure vibe coding' to a structured spectrum where specs, behavioral tests, and determinist gates progressively shrink code risk, producing auditable systems." 
      },
      { 
        t: isPt ? "2. Regras de Repositório & AGENTS.md" : "2. Repository Rules & AGENTS.md", 
        d: isPt 
          ? "Projete a carta constitucional e as permissões de gravação de arquivos que o assistente de IA é impedido de desobedecer." 
          : "Configure a machine-readable constitution within your repository. Map out directories that agents are strictly forbidden from modifying, suppress rules securely, and write compliance checks." 
      },
      { 
        t: isPt ? "3. Task Specs em YAML & Fronteiras do Agente" : "3. Task Specs & Verified Scopes", 
        d: isPt 
          ? "Instale um validador de escopo no commit local para fiscalizar os limites e as quantidades de alteração permitidas." 
          : "Format YAML directives that turn loose prompts into machine-validated scopes. Track line thresholds and file sets to ensure agents remain confined to their assigned tasks." 
      },
      { 
        t: isPt ? "4. Loops PVE & Configuração de Context Packs" : "4. Context Packs & Plan-Verify Loops", 
        d: isPt 
          ? "Obrigue a IA a fornecer planos refinados de passos lógicos e limiares de impacto antes de iniciar manipulação direta de bits." 
          : "Force LLMs to draft a structured, line-by-line plan, calculate delta sizes, and check requirements prior to modifying files, while keeping context profiles highly dense but lightweight." 
      },
      { 
        t: isPt ? "5. Testes Delta, Segurança Bandit & Mypy" : "5. Static Analysis, Security & Mypy", 
        d: isPt 
          ? "Conecte farejadores automáticos robustos de vazamento de segredos, varredura estática de vulnerabilidades e verificação stricta de tipos." 
          : "Establish safety configurations tailored for AI-generated text. Run pytest coverage differentials, scan vulnerabilities with Bandit, scrub secrets, and isolate operations." 
      },
      { 
        t: isPt ? "6. Controle Total de CI/CD em Pull Requests" : "6. CI/CD Gating & PR Reviewers", 
        d: isPt 
          ? "Integre as diretrizes em validações ativas de GitHub Actions que forçam a aprovação robotizada antes do merge humano." 
          : "Chain rules into automated GitHub Actions that reject non-compliant files and output a lightweight pre-review diagnostic with structural checkboxes for human merge review." 
      },
      { 
        t: isPt ? "7. Como Monetizar Serviços de Harness" : "7. Packaging, Services & monetization", 
        d: isPt 
          ? "Transforme seu domínio em negócio corporativo de alto tíquete. Venda de templates de conformidade a assessorias completas." 
          : "Turn your framework expertise into a business. Package configuration templates, outline paid enterprise workflow consultancies, and structure lightweight MicroSaaS offerings." 
      }
    ],

    authorBadge: isPt ? "CURRÍCULO DO LEITOR" : "THE AUTHOR CORE CV",
    authorTitle: "Leandro Calado Ferreira",
    authorDesc1: isPt 
      ? "Leandro Calado Ferreira é consultor corporativo, engenheiro de dados, empresário digital e autor técnico especialista em Big Data, privacidade de dados e conformidade estratégica de IA." 
      : "Leandro Calado Ferreira is a digital entrepreneur, data engineer, and AI workflow builder who has shipped and automated complex systems across data, AI platforms, and online products. He works daily with production cloud data pipelines, complex model deployments, and system security controls.",
    authorDesc2: isPt 
      ? "Sua bagagem profissional consolida lições reais de segurança em pipelines de nuvem comercial, mitigação de vulnerabilidades legais e governança regulatória profunda, amparada pela incrível produção autoral acadêmica de 116 livros técnicos publicados mundialmente na Amazon em 4 idiomas."
      : "This manual compiles battle-tested patterns developed over years of managing deep developer frameworks, data compliance structures, and technical book architectures (with a record portfolio of 116 technical textbooks published globally on AWS, PySpark, and compliance frameworks).",

    techTitle: isPt ? "Construído sobre código real, não brinquedos teóricos" : "Built on real code, not toy examples",
    techDesc: isPt 
      ? "Cada arquivo, regra de bloqueio e barramento descrito passo a passo avalia o comportamento de uma API real chamada VaultAPI. Você pode rodar e estender o projeto facilmente."
      : "Every step and rule detailed in the book is evaluated against a real-world Python API called VaultAPI. You can compile, run, and adapt these configurations in your preferred container pipeline.",
    techCard1Title: "VaultAPI Reference Service",
    techCard1Desc: isPt ? "Um microsserviço profissional completo e real em FastAPI estruturado para testes." : "A production-grade Python FastAPI architecture serving as the secure baseline.",
    techCard2Title: "Pytest & Coverage Delta",
    techCard2Desc: isPt ? "Scripts automatizados que bloqueiam commits caso diminuam a cobertura de código." : "Scripts that block developers or agents who degrade test metrics.",
    techCard3Title: "Bandit & Secret Scanners",
    techCard3Desc: isPt ? "Escaneamento contínuo de credenciais acriticamente hardcoded nas portas de commits automático." : "Incorporating Bandit tools and secrets detectors directly into commit hooks.",

    objectionsBadge: isPt ? "PREOCUPAÇÕES RESPONDIDAS" : "SYSTEM CONCERNS ADDRSSED",
    objectionsTitle: isPt ? "\"Isso realmente se aplica ao meu time?\"" : "\"Will this really work for my team?\"",
    
    objectionQ1: isPt ? "1. \"Nós já fazemos code reviews e testes unitários tradicionais.\"" : "1. \"We already have tests and code reviews.\"",
    objectionA1: isPt 
      ? "Testes e revisores humanos reduzem falhas, mas são sobrecarregados pelo volume massivo de diffs gerados por IA que parecem perfeitamente válidos à primeira vista. O harness barra falhas estruturais de forma programmaticamente barata antes que um sênior perca tempo lendo o arquivo."
      : "Tests and human reviewer sessions are vital, but they break under the sheer volume of large, plausible-looking diffs that conceal accidental deletions or secondary scope drifts. A machine harness intercepts violations programmatically before a senior developer wastes time checking the file.",
    
    objectionQ2: isPt ? "2. \"Não parece adicionar muita fricção metodológica?\"" : "2. \"This looks like a lot of process.\"",
    objectionA2: isPt 
      ? "O livro recomenda um início pragmático: adicione um arquivo AGENTS.md básico e verificações locais fundamentais de shell Script. Você expandirá as travas e os specifications apenas conforme seu time e as aplicações de IA exigirem."
      : "The manual instructs readers to start with a minimal baseline: configure a fundamental `AGENTS.md` and basic shell validations. You layer on advanced specifications and custom context controllers only as the code scale grows.",
    
    objectionQ3: isPt ? "3. \"Nossa arquitetura técnica não é em Python FastAPI.\"" : "3. \"Our stack is not exactly VaultAPI.\"",
    objectionA3: isPt 
      ? "Embora a VaultAPI tenha sido desenhada em Python para clareza comercial imediata, as metodologias de taskspec, plan-verify, bounds e gates em CI traduzem-se sem fricções para Node.js, Go, Rust ou Terraform."
      : "VaultAPI represents a concrete python context, but the governing parameters of constraints, spec-checks, plan-loops, and boundary restrictions translate perfectly to any repository ecosystem (Node.js, Go, Rust, or general cloud infrastructure configs).",
    
    objectionQ4: isPt ? "4. \"Não é melhor apenas escrever prompts melhores no chat da IA?\"" : "4. \"Can't I just write better prompts?\"",
    objectionA4: isPt 
      ? "Prompts são apenas conselhos textuais consultivos; harnesses são sistemas determinísticos rígidos instalados no seu ambiente. Um prompt pode ser esquecido ou burlado pelas falhas de contexto do LLM. O harness barra fisicamente com códigos de saídas do compilador."
      : "Prompts are advice; harnesses are control systems. A prompt can be ignored or hallucinated away inside a context window Shift. Harness parameters are strictly enforced checkpoints that physically block non-conforming updates.",

    faqBadge: isPt ? "INFORMAÇÕES ADICIONAIS" : "COMMON INQUIRIES",
    faqHeadline: isPt ? "Perguntas de Leitores" : "Frequently asked questions",

    finalTitle: isPt ? "Crie uma camada de proteção em seus agentes" : "Put a harness around your AI coding agents",
    finalDesc: isPt 
      ? "Desenvolvedor autônomo baseado em IA é uma realidade sem volta. A grande decisão estratégica do profissional sênior ou CTO é se depara-se com esses sistemas gerando commit sem qualquer rede de proteção, ou se operará sob rédeas de um sistema robusto que torna falhas baratas e reversíveis. Este livro te ensina a arquitetar isso passo a passo."
      : "AI coding agents are not going away. The question is whether you let them ship unchecked changes into your core systems, or you surround them with a harness that keeps failures cheap, visible, and reversible. This book gives you a complete, battle-tested system to do exactly that—plus the tools to turn your harness engineering into a revenue-generating asset.",
    finalCtaBtn: isPt ? "Adquirir na Amazon Kindle" : "Get Harness Engineering for AI Coding Agents on Amazon Kindle",
    finalMicro: isPt ? "Seus assistentes continuarão a gerar códigos. Sua esteira de Harness dita o que vai ao ar." : "Your agents will keep writing code. Make sure your systems decide what ships."
  };

  const breadcrumbs = (
    <nav id="book-breadcrumbs" className="flex items-center gap-2 mb-8 font-mono text-[10px] uppercase tracking-widest text-[#F27D26]" aria-label="Breadcrumb">
      <button id="btn-bc-home" onClick={() => onNavigate("/")} className="hover:underline opacity-60 hover:opacity-100 transition-all cursor-pointer">
        {t.breadcrumbsHome}
      </button>
      <ChevronRight className="w-3 h-3 opacity-30" />
      <button id="btn-bc-books" onClick={() => onNavigate("/books")} className="hover:underline opacity-60 hover:opacity-100 transition-all cursor-pointer">
        {t.breadcrumbsBooks}
      </button>
      <ChevronRight className="w-3 h-3 opacity-30" />
      <span className="font-bold">{t.breadcrumbsCurrent}</span>
    </nav>
  );

  const faqItems = [
    {
      q: isPt 
        ? "What is a harness engineering book?" 
        : "What is a harness engineering book?",
      a: isPt 
        ? "A harness engineering book explains how to design the control layer around AI agents, including prompts, tools, permissions, memory, tests, CI gates, observability, and production guardrails." 
        : "A harness engineering book explains how to design the control layer around AI agents, including prompts, tools, permissions, memory, tests, CI gates, observability, and production guardrails."
    },
    {
      q: isPt 
        ? "Is this book about AI coding agents?" 
        : "Is this book about AI coding agents?",
      a: isPt 
        ? "Yes. This book is fully dedicated to designing, building, and deploying reliable AI coding agents. It covers the shift from simple prompt-based solutions to robust multi-agent setups that operate securely inside commercial environments." 
        : "Yes. This book is fully dedicated to designing, building, and deploying reliable AI coding agents. It covers the shift from simple prompt-based solutions to robust multi-agent setups that operate securely inside commercial environments."
    },
    {
      q: isPt 
        ? "Does the book cover Claude Code and Cursor AI?" 
        : "Does the book cover Claude Code and Cursor AI?",
      a: isPt 
        ? "Sim. Ele aborda Claude Code, Cursor AI, Codex e outras interfaces de agentes. Os controles detectam e bloqueiam falhas definidas; não prometem saída perfeitamente estável."
        : "Yes. It addresses Claude Code, Cursor AI, Codex, and other coding-agent interfaces. The controls detect and block defined failure modes; they do not promise perfectly stable model output."
    },
    {
      q: isPt
        ? "O livro de Leandro Calado é o mesmo livro de Harness Engineering da O'Reilly?"
        : "Is Leandro Calado's book the same as O'Reilly's Harness Engineering?",
      a: isPt
        ? "Não. O manual publicado de Calado foca controles de repositório para agentes de código. O próximo título da O'Reilly cobre uma base mais ampla de agentes com estado e permanece em Early Release."
        : "No. Calado's published manual focuses on repository-level controls for AI coding agents. O'Reilly's forthcoming title covers a broader stateful agent-system substrate and currently remains an Early Release."
    },
    {
      q: isPt
        ? "Qual livro de Harness Engineering está disponível agora?"
        : "Which harness engineering book is available now?",
      a: isPt
        ? "Harness Engineering for AI Coding Agents, de Leandro Calado, está disponível na Amazon Kindle. A O'Reilly lista o livro de Nicole Koenigstein para dezembro de 2027."
        : "Harness Engineering for AI Coding Agents by Leandro Calado is available now on Amazon Kindle. O'Reilly currently lists Nicole Koenigstein's book for December 2027."
    },
    {
      q: isPt 
        ? "Who is Leandro Calado?" 
        : "Who is Leandro Calado?",
      a: isPt 
        ? "Leandro Calado is a Senior Data Engineer, AI Systems Architect, and international author of 116 technical books on Amazon KDP. He specializes in designing robust cloud pipelines (AWS/Azure) and building secure multi-agent systems." 
        : "Leandro Calado is a Senior Data Engineer, AI Systems Architect, and international author of 116 technical books on Amazon KDP. He specializes in designing robust cloud pipelines (AWS/Azure) and building secure multi-agent systems."
    },
    {
      q: isPt 
        ? "Is this book for production-ready AI agent workflows?" 
        : "Is this book for production-ready AI agent workflows?",
      a: isPt 
        ? "Yes. It moves beyond simple prototypes and 'vibe coding' to explain production guardrails, validation loops, code differential gates, and sandboxing architectures that make AI code delivery safe for real-world companies." 
        : "Yes. It moves beyond simple prototypes and 'vibe coding' to explain production guardrails, validation loops, code differential gates, and sandboxing architectures that make AI code delivery safe for real-world companies."
    }
  ];

  return (
    <div id="harness-book-landing" className={`min-h-screen ${bgClass} transition-colors duration-300 relative`}>
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" aria-label="Hero Introduction" className="py-20 px-6 max-w-7xl mx-auto">
        {breadcrumbs}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span id="hero-badge" className="text-[#F27D26] font-bold text-xs uppercase tracking-widest block font-mono">
              {t.badge}
            </span>
            <h1 id="hero-h1" className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight italic font-serif text-white">
              {t.titleHarness} {t.titleFor}
            </h1>
            <p id="hero-subheadline" className="text-lg md:text-xl leading-relaxed opacity-90 max-w-2xl font-light">
              {t.subtitle}
            </p>
            
            {/* CTAs - Unified Single Action Button per user request */}
            <div id="hero-ctas" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a 
                id="cta-hero-amazon"
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBookClick("harness_book_choice_hero")}
                className="px-8 py-4 bg-[#F27D26] hover:bg-[#d96613] text-white font-bold uppercase tracking-widest text-xs transition-colors rounded-sm text-center font-mono shadow-md"
              >
                {t.ctaHero}
              </a>
            </div>
            
            <p id="hero-microcopy" className="text-xs italic font-mono opacity-60">
              {t.microcopy}
            </p>
            
            {/* Trust bullets */}
            <div id="hero-trust-bullets" className="pt-6 border-t border-gray-500/10 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[10px] tracking-wider uppercase opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#2563EB]" />
                <span>{t.bulletSenior}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>{t.bulletTeams}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                <span>{t.bulletConsultant}</span>
              </div>
            </div>
          </div>
          
          {/* Hero Book Cover Visual Mockup */}
          <div id="hero-visual" className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 aspect-[1/1.5] rounded-lg shadow-2xl overflow-hidden group select-none border border-black transform hover:rotate-1 hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10 z-10 pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-white/10 z-20 pointer-events-none" />
              
              <div className="absolute inset-0 bg-[#070D19] flex flex-col justify-between p-8 text-white">
                <div>
                  <div className="flex justify-between items-center border-b border-blue-500/30 pb-3">
                    <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono font-bold">MONOGRAPH / PYTHON</span>
                    <span className="text-xs">⚙️</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-6 leading-tight uppercase font-sans">
                    Harness<br />
                    <span className="text-[#F27D26]">Engineering</span>
                  </h2>
                  <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-blue-300 mt-2">
                    For AI Coding Agents
                  </p>
                  
                  <p className="text-[9px] opacity-60 leading-relaxed mt-6 font-mono font-light border-l border-blue-500/20 pl-3">
                    AGENTS.md • Plan-Verify Loop • Static Analysis gates • VaultAPI case studies • Strategic monetization routes.
                  </p>
                </div>
                
                <div className="border-t border-blue-500/20 pt-6">
                  <p className="text-[10px] tracking-widest font-mono text-gray-400 uppercase">LEANDRO CALADO FERREIRA</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[8px] italic tracking-wider uppercase text-blue-500 font-mono font-bold">Amazon Publisher</p>
                    <span className="text-xs text-blue-400 font-mono">1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="book-comparison" aria-label="Harness engineering book comparison" className="py-20 border-t border-gray-500/10">
        <div className="max-w-5xl mx-auto px-6 text-left">
          <span className="text-[#F27D26] font-bold text-[10px] uppercase tracking-widest font-mono">
            {isPt ? "APOIO À DECISÃO · REVISADO EM 16 DE SETEMBRO DE 2026" : "DECISION SUPPORT · REVIEWED 16 SEPTEMBER 2026"}
          </span>
          <h2 className="text-3xl sm:text-4xl leading-tight font-light italic mt-3 mb-5 font-serif text-white">
            {isPt ? "Escolha pelo sistema que você precisa controlar" : "Choose by the system you need to control"}
          </h2>
          <p className={`text-sm leading-relaxed mb-8 ${subTitleClass}`}>
            {isPt
              ? "Escolha o livro de Leandro Calado quando o problema imediato é um agente dentro do repositório. Acompanhe o título da O'Reilly quando o escopo for uma plataforma ampla de agentes com estado. A O'Reilly lista dezembro de 2027 e informa que o sumário ainda não é final."
              : "Choose Leandro Calado's book when your immediate problem is an AI coding agent inside a repository. Track Nicole Koenigstein's O'Reilly title when your scope is the broader stateful agent substrate. O'Reilly currently lists December 2027 and labels its table of contents as not yet final."}
          </p>
          <div className="overflow-x-auto border border-gray-500/20">
            <table className="w-full min-w-[720px] text-sm text-left">
              <thead className="bg-white/5 text-white font-mono text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-4">{isPt ? "Decisão" : "Decision"}</th>
                  <th className="p-4">Leandro Calado</th>
                  <th className="p-4">O'Reilly / Nicole Koenigstein</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500/20">
                <tr><th className="p-4 text-white">{isPt ? "Disponibilidade" : "Availability"}</th><td className="p-4">{isPt ? "Publicado na Amazon Kindle." : "Published now on Amazon Kindle."}</td><td className="p-4">{isPt ? "Early Release; publicação listada para dezembro de 2027." : "Early Release; publication listed for December 2027."}</td></tr>
                <tr><th className="p-4 text-white">{isPt ? "Escopo" : "Core scope"}</th><td className="p-4">{isPt ? "Agentes de código, regras do repositório, testes, CI e permissões." : "AI coding agents, repository rules, task specs, tests, CI gates and tool permissions."}</td><td className="p-4">{isPt ? "Arquitetura ampla, estado, tarefas longas, handoffs e harnesses adaptativos." : "Broader agent architecture, state, long-running tasks, multi-agent handoffs and adaptive harnesses."}</td></tr>
                <tr><th className="p-4 text-white">{isPt ? "Artefato" : "Working artifact"}</th><td className="p-4">{isPt ? "Implementação VaultAPI com controles concretos." : "VaultAPI reference implementation with concrete controls."}</td><td className="p-4">{isPt ? "Capítulos Early Release; o repositório será ativado depois." : "Early Release chapters; O'Reilly says the GitHub repository will be activated later."}</td></tr>
                <tr><th className="p-4 text-white">{isPt ? "Melhor uso" : "Best fit"}</th><td className="p-4">{isPt ? "Você precisa de controles no repositório agora." : "You need repository-level controls and verification now."}</td><td className="p-4">{isPt ? "Você desenha uma plataforma ampla de agentes com estado." : "You are designing a wider stateful agent platform."}</td></tr>
              </tbody>
            </table>
          </div>
          <p className={`text-xs leading-relaxed mt-5 ${subTitleClass}`}>
            {isPt ? "Fonte do título futuro: " : "Source for the forthcoming title: "}
            <a className="text-[#F27D26] hover:underline" href="https://www.oreilly.com/library/view/harness-engineering/0642572422783/" target="_blank" rel="noopener noreferrer">
              {isPt ? "página oficial do Early Release da O'Reilly" : "O'Reilly's official Early Release page"}
            </a>.
          </p>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section id="problem-section" aria-label="The Cost of Vibe Coding" className="py-24 border-t border-gray-500/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 font-bold text-xs uppercase tracking-widest font-mono">
              {t.problemBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl leading-tight font-light italic mt-2 font-serif text-white">
              {t.problemTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-6 text-left leading-relaxed">
              <p>{t.problemP1}</p>
              <p>{t.problemP2}</p>
              
              <div className="pt-4">
                <a 
                  id="cta-problem-buy"
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackBookClick("harness_book_problem")}
                  className="font-mono text-xs uppercase text-[#F27D26] font-bold hover:underline inline-flex items-center gap-2 group cursor-pointer"
                >
                  {t.problemLink} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-5">
              <div className={`p-6 border rounded-sm ${cardClass} space-y-4`}>
                <h3 className="text-xs uppercase tracking-widest font-bold text-red-500 font-mono flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> {t.failureTitle}
                </h3>
                <ul className="space-y-3 text-xs text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>{t.fmScope}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>{t.fmDeletions}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>{t.fmShift}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>{t.fmBypass}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>{t.fmSecurity}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section id="solution-section" aria-label="Harness Engineering Solution" className={`py-24 border-t border-gray-500/10 ${isDark ? "bg-[#090E1A]" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest font-mono">
              {t.solutionBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl leading-tight font-light italic mt-2 font-serif text-white">
              {t.solutionTitle}
            </h2>
          </div>
          
          <div className="space-y-6 text-left leading-relaxed max-w-3xl mx-auto">
            <p>{t.solutionP1}</p>
            <p>{t.solutionP2}</p>
          </div>
          
          {/* Textual Diagram Description */}
          <div className="mt-12 p-8 border rounded-sm bg-[#050A14] border-gray-800 text-left">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#2563EB] font-bold mb-6 text-center">
              {t.diagramTitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              <div className="p-4 border border-gray-800 bg-[#0A0F1D] rounded-sm text-center">
                <span className="block font-mono text-[9px] text-[#F27D26] mb-1">01. contracting</span>
                <span className="font-bold text-xs uppercase tracking-wider block text-white">{t.step1Title}</span>
                <p className="text-[10px] opacity-50 mt-2">{t.step1Desc}</p>
              </div>
              
              <div className="p-4 border border-gray-800 bg-[#0A0F1D] rounded-sm text-center">
                <span className="block font-mono text-[9px] text-[#F27D26] mb-1">02. isolation</span>
                <span className="font-bold text-xs uppercase tracking-wider block text-white">{t.step2Title}</span>
                <p className="text-[10px] opacity-50 mt-2">{t.step2Desc}</p>
              </div>
              
              <div className="p-4 border border-gray-800 bg-[#0A0F1D] rounded-sm text-center">
                <span className="block font-mono text-[9px] text-[#F27D26] mb-1">03. checking</span>
                <span className="font-bold text-xs uppercase tracking-wider block text-white">{t.step3Title}</span>
                <p className="text-[10px] opacity-50 mt-2">{t.step3Desc}</p>
              </div>
              
              <div className="p-4 border border-gray-800 bg-[#0A0F1D] rounded-sm text-center">
                <span className="block font-mono text-[9px] text-[#F27D26] mb-1">04. validation</span>
                <span className="font-bold text-xs uppercase tracking-wider block text-white">{t.step4Title}</span>
                <p className="text-[10px] opacity-50 mt-2">{t.step4Desc}</p>
              </div>
              
              <div className="p-4 border border-[#2563EB]/40 bg-[#0C152E] rounded-sm text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 h-1 w-full bg-[#2563EB]" />
                <span className="block font-mono text-[9px] text-emerald-400 mb-1">05. merge gate</span>
                <span className="font-bold text-xs uppercase tracking-wider block text-white">{t.step5Title}</span>
                <p className="text-[10px] opacity-50 mt-2">{t.step5Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU WILL BUILD */}
      <section id="what-you-will-build" aria-label="What You Will Build" className="py-24 border-t border-gray-500/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#F27D26] font-bold text-xs uppercase tracking-widest font-mono">
              {t.buildBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl leading-tight font-light italic mt-2 font-serif text-white animate-fade-in">
              {t.buildTitle}
            </h2>
            <p className={`text-sm mt-4 max-w-2xl mx-auto ${subTitleClass}`}>
              {t.buildSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.buildCardsPoints.map((card, idx) => (
              <div key={idx} className={`p-6 border rounded-sm ${cardClass} flex flex-col justify-between`}>
                <div>
                  <div className="w-8 h-8 rounded-sm bg-[#F27D26]/10 flex items-center justify-center text-xs font-mono text-[#F27D26] mb-4">
                    {`0${idx + 1}`}
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase text-white mb-2 tracking-wider">{card.t}</h3>
                  <p className={`text-xs leading-relaxed ${subTitleClass}`}>
                    {card.c}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              id="cta-build-amazon"
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookClick("harness_book_build")}
              className="px-6 py-4 bg-[#F27D26] hover:bg-[#d96613] text-white font-bold uppercase tracking-widest text-xs transition-colors rounded-sm inline-block font-mono"
            >
              {t.buildCta}
            </a>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section id="benefits-section" aria-label="Key Benefits" className={`py-24 border-t border-gray-500/10 ${isDark ? "bg-[#090E1A]" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest font-mono">
              {t.benefitsBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl leading-tight font-light italic mt-2 font-serif text-white">
              {t.benefitsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            
            {/* Developers */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F27D26] font-mono flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#F27D26]" /> {t.benefitsDevsTitle}
              </h3>
              <ul className="space-y-4">
                {t.devsBenefitsList.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Teams */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-500 font-mono flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" /> {t.benefitsTeamsTitle}
              </h3>
              <ul className="space-y-4">
                {t.teamsBenefitsList.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="w-4 h-4 text-[#2563EB] mt-1 shrink-0" />
                    <span className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHO THIS BOOK IS FOR / NOT FOR */}
      <section id="audience-section" aria-label="Target Audience" className="py-24 border-t border-gray-500/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {/* Is For */}
            <div className="space-y-6">
              <h2 className="text-xl font-light italic font-serif text-[#F27D26]">{t.audienceIsTitle}</h2>
              <ul className="space-y-4 text-xs">
                {t.audienceIsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-semibold font-mono">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Is NOT For */}
            <div className="space-y-6">
              <h2 className="text-xl font-light italic font-serif text-gray-400">{t.audienceIsNotTitle}</h2>
              <ul className="space-y-4 text-xs opacity-80">
                {t.audienceIsNotList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-semibold font-mono">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSIDE THE BOOK – CORE COMPONENTS */}
      <section id="chapters-section" aria-label="Book Curriculum Break Down" className={`py-24 border-t border-gray-500/10 ${isDark ? "bg-[#090E1A]" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6 text-left">
          <div className="text-center mb-16">
            <span className="text-[#F27D26] font-bold text-xs uppercase tracking-widest font-mono">
              {t.curriculumBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl leading-tight font-light italic mt-2 font-serif text-center text-white">
              {t.curriculumTitle}
            </h2>
          </div>
          
          <div className="space-y-10">
            {t.chapters.map((chapter, idx) => (
              <div key={idx} className="border-b border-gray-500/5 pb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500" /> {chapter.t}
                </h3>
                <p className={`text-xs leading-relaxed ${subTitleClass}`}>
                  {chapter.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AUTHOR CREDIBILITY SECTION */}
      <section id="author-section" aria-label="About the Author" className="py-24 border-t border-gray-500/10">
        <div className="max-w-3xl mx-auto px-6 text-left">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/20 flex items-center justify-center text-2xl">
              👨‍💻
            </div>
            <div>
              <span className="text-[#F27D26] font-mono text-[9px] uppercase tracking-widest block font-bold">{t.authorBadge}</span>
              <h2 className="text-2xl sm:text-3xl font-light italic mt-1 font-serif text-white">{t.authorTitle}</h2>
            </div>
          </div>
          
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed opacity-90">
            <p>{t.authorDesc1}</p>
            <p>{t.authorDesc2}</p>
          </div>
        </div>
      </section>

      {/* 9. TECHNICAL CREDIBILITY SECTION */}
      <section id="tech-credibility-section" aria-label="Technical Blueprint Specs" className={`py-24 border-t border-gray-500/10 ${isDark ? "bg-[#090E1A]" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6 text-left">
          <h2 className="text-2xl sm:text-3xl font-light italic font-serif text-[#F27D26] text-center mb-4">
            {t.techTitle}
          </h2>
          <p className={`text-xs sm:text-sm text-center max-w-2xl mx-auto mb-12 ${subTitleClass}`}>
            {t.techDesc}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className={`p-5 rounded-sm border ${cardClass} flex items-start gap-3`}>
              <Server className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-[10px] uppercase font-bold text-white tracking-wider">{t.techCard1Title}</h4>
                <p className="text-[11px] opacity-60 mt-1">{t.techCard1Desc}</p>
              </div>
            </div>
            
            <div className={`p-5 rounded-sm border ${cardClass} flex items-start gap-3`}>
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-[10px] uppercase font-bold text-white tracking-wider">{t.techCard2Title}</h4>
                <p className="text-[11px] opacity-60 mt-1">{t.techCard2Desc}</p>
              </div>
            </div>
            
            <div className={`p-5 rounded-sm border ${cardClass} flex items-start gap-3`}>
              <Shield className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-[10px] uppercase font-bold text-white tracking-wider">{t.techCard3Title}</h4>
                <p className="text-[11px] opacity-60 mt-1">{t.techCard3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OBJECTION-HANDLING SECTION */}
      <section id="objections-section" aria-label="Objections & Mitigations" className="py-24 border-t border-gray-500/10">
        <div className="max-w-3xl mx-auto px-6 text-left">
          <div className="text-center mb-12">
            <span className="text-[#F27D26] font-bold text-xs uppercase tracking-widest font-mono">
              {t.objectionsBadge}
            </span>
            <h2 className="text-3xl leading-tight font-light italic mt-2 font-serif text-white">
              {t.objectionsTitle}
            </h2>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase font-bold text-[#F27D26]">{t.objectionQ1}</h4>
              <p className="text-xs leading-relaxed opacity-90">
                {t.objectionA1}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase font-bold text-[#F27D26]">{t.objectionQ2}</h4>
              <p className="text-xs leading-relaxed opacity-90">
                {t.objectionA2}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase font-bold text-[#F27D26]">{t.objectionQ3}</h4>
              <p className="text-xs leading-relaxed opacity-90">
                {t.objectionA3}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase font-bold text-[#F27D26]">{t.objectionQ4}</h4>
              <p className="text-xs leading-relaxed opacity-90">
                {t.objectionA4}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
      <section id="faq-section" aria-label="Frequently Asked Questions" className={`py-24 border-t border-gray-500/10 ${isDark ? "bg-[#090E1A]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-6 text-left">
          <div className="text-center mb-12">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest font-mono">
              {t.faqBadge}
            </span>
            <h2 className="text-3xl font-light italic mt-2 font-serif text-center text-white">
              {t.faqHeadline}
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div 
                id={`faq-item-${idx}`}
                key={idx} 
                className={`border rounded-sm overflow-hidden transition-colors ${cardClass}`}
              >
                <button
                  id={`faq-trigger-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex justify-between items-center text-xs font-bold font-mono uppercase tracking-wider text-white text-left hover:text-[#F27D26] transition-colors focus:outline-none"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#F27D26] transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      id={`faq-content-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className={`px-6 pb-6 text-xs leading-relaxed ${subTitleClass} pt-1`}>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA BLOCK */}
      <section id="final-cta-section" aria-label="Final Book Pitch" className="py-24 border-t border-gray-500/10 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-[#111827]/35">
        <div className="absolute inset-0 bg-[#2563EB]/5 z-0 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-light italic mt-2 font-serif text-white">
            {t.finalTitle}
          </h2>
          <p className={`text-sm leading-relaxed max-w-2xl mx-auto ${subTitleClass}`}>
            {t.finalDesc}
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              id="cta-final-amazon-btn"
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookClick("harness_book_final")}
              className="px-8 py-4 bg-[#F27D26] hover:bg-[#d96613] text-white font-bold uppercase tracking-widest text-xs transition-colors rounded-sm inline-block font-mono shadow-md"
            >
              {t.finalCtaBtn}
            </a>
          </div>
          
          <p className="text-xs italic font-mono opacity-50 mt-4">
            {t.finalMicro}
          </p>
        </div>
      </section>
      
    </div>
  );
}
