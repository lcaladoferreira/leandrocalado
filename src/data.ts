import { Book, Article, TimelineItem, ThemeDomain } from "./types";
import { articlesData } from "./articlesData";

export const booksData: Book[] = [
  // IA & Agentes
  {
    id: "harness-engineering-ai-coding-agents",
    title: "Harness Engineering for AI Coding Agents",
    category: "ia",
    asin: "B0GYG3WG4Q",
    description: "Build production-safe Claude Code, Codex, and Python agent workflows with guardrails, tests, CI gates, and controls that refuse to ship bad AI-generated code.",
    lang: "Inglês",
    coverEmoji: "⚙️",
    link: "/books/harness-engineering-ai-coding-agents"
  },
  {
    id: "harness-engineering-data-agents-databricks",
    title: "Harness Engineering for Data Agents on Databricks",
    category: "dados",
    asin: "B0HHZXPJV1",
    description: "Build reliable agentic data platforms with MCP, Databricks, data contracts, governance, production controls, and multi-agent workflows.",
    lang: "Inglês",
    coverEmoji: "🧱",
    link: "/books/harness-engineering-data-agents-databricks"
  },
  {
    id: "ia-mcp",
    title: "Agentes de IA MCP",
    category: "ia",
    asin: "B0GQHTTRZX",
    description: "Explore o Model Context Protocol (MCP) para conectar modelos de linguagem a bancos de dados, APIs e arquivos de forma segura.",
    lang: "Português",
    coverEmoji: "🤖",
    link: "https://www.amazon.com/dp/B0GQHTTRZX"
  },
  {
    id: "agentic-ai",
    title: "Agentic AI: Build Your First Autonomous Agent System",
    category: "ia",
    asin: "B0F4CQ2B2D",
    isbn: "9798317478797",
    description: "A comprehensive developer's guide to architecture and production-ready autonomous agent pipelines using cutting-edge models.",
    lang: "Inglês",
    coverEmoji: "🧠",
    link: "https://www.amazon.com/dp/B0F4CQ2B2D"
  },
  {
    id: "ai-trading",
    title: "AI Agents Trading",
    category: "ia",
    asin: "B0DZQLZP3X",
    description: "Implementando agentes autônomos de decisão em tempo real para análises preditivas e execução estruturada em mercados de dados.",
    lang: "Inglês",
    coverEmoji: "📈",
    link: "https://www.amazon.com/dp/B0DZQLZP3X"
  },
  {
    id: "ai-agents-n8n",
    title: "AI Agents with n8n",
    category: "ia",
    asin: "B0FLKKVY46",
    description: "Construa agentes de Inteligência Artificial sem complexidade de código excessiva usando fluxos de trabalho visuais estruturados.",
    lang: "Inglês",
    coverEmoji: "⚡",
    link: "https://www.amazon.com/dp/B0FLKKVY46"
  },
  {
    id: "ai-automation-n8n",
    title: "AI Automation with n8n",
    category: "ia",
    asin: "B0DZWG9XGW",
    description: "Guia prático para automatizar tarefas corporativas repetitivas, integrando LLMs e fluxos de dados em produção.",
    lang: "Inglês",
    coverEmoji: "⚙️",
    link: "https://www.amazon.com/dp/B0DZWG9XGW"
  },
  {
    id: "ai-employees",
    title: "AI Employees: How to Automate Gmail, Jira & Figma with MCP Agents",
    category: "ia",
    asin: "B0GND3TLJC",
    description: "Discover how to replace repetitive administrative operations with lightweight autonomous agents powered by MCP standards.",
    lang: "Inglês",
    coverEmoji: "💼",
    link: "https://www.amazon.com/dp/B0GND3TLJC"
  },
  {
    id: "ai-hacks",
    title: "AI Hacks",
    category: "ia",
    asin: "B0DZYP1H5H",
    description: "Atalhos avançados, truques de engenharia de prompt e arquiteturas de software ágeis para maximizar a produtividade diária.",
    lang: "Inglês",
    coverEmoji: "💡",
    link: "https://www.amazon.com/dp/B0DZYP1H5H"
  },
  {
    id: "ai-hustler",
    title: "AI Hustler",
    category: "ia",
    asin: "B0F1DSPPQZ",
    description: "Estratégias pragmáticas de monetização e criação de soluções de software de rápida implantação orientadas a Inteligência Artificial.",
    lang: "Inglês",
    coverEmoji: "🚀",
    link: "https://www.amazon.com/dp/B0F1DSPPQZ"
  },
  {
    id: "master-ai-agents",
    title: "Master AI Agents",
    category: "ia",
    asin: "B0F22SPZB7",
    description: "Dominando a engenharia de sistemas multi-agentes baseados em CrewAI, LangChain e padrões severos de governança corporativa.",
    lang: "Inglês",
    coverEmoji: "🛡️",
    link: "https://www.amazon.com/dp/B0F22SPZB7"
  },
  {
    id: "automate-n8n-mcp",
    title: "Automate AI Agents with n8n and MCP",
    category: "ia",
    asin: "B0F3T4HVZC",
    description: "Aprofunde na orquestração de workflows visuais robustos integrados a servidores Model Context Protocol dedicados.",
    lang: "Inglês",
    coverEmoji: "🔌",
    link: "https://www.amazon.com/dp/B0F3T4HVZC"
  },
  {
    id: "gemini-cli-mcp",
    title: "Gemini CLI and MCP",
    category: "ia",
    asin: "B0GN1F45X8",
    description: "Interface de linha de comando baseada no SDK oficial da Google Cloud, estendida com servidores de contexto MCP locais.",
    lang: "Inglês",
    coverEmoji: "✨",
    link: "https://www.amazon.com/dp/B0GN1F45X8"
  },
 
  // Engenharia de Dados & Cloud
  {
    id: "aws-50-hacks",
    title: "50 Hacks Para Engenheiros de Dados: Certificação AWS",
    category: "dados",
    asin: "B0DTN7W667",
    description: "Um manual condensado com padrões de projeto, segurança e otimização de queries para acelerar sua aprovação na AWS.",
    lang: "Português",
    coverEmoji: "☁️",
    link: "https://www.amazon.com.br/dp/B0DTN7W667"
  },
  {
    id: "aws-glue-python",
    title: "AWS Glue com Python",
    category: "dados",
    asin: "B0DPBTZ578",
    description: "Crie pipelines de ETL robustos, escaláveis e serverless aproveitando o poder do PySpark de forma pragmática e direta.",
    lang: "Português",
    coverEmoji: "🐍",
    link: "https://www.amazon.com.br/dp/B0DPBTZ578"
  },
  {
    id: "aws-sagemaker",
    title: "AWS SageMaker for Beginners",
    category: "dados",
    asin: "B0D7WQ4Y45",
    description: "Guia introdutório para treinar, validar e implantar modelos de Machine Learning robustos na infraestrutura de nuvem Amazon.",
    lang: "Inglês",
    coverEmoji: "📊",
    link: "https://www.amazon.com/dp/B0D7WQ4Y45"
  },
  {
    id: "aws-data-handbook",
    title: "AWS Data Engineer's Handbook",
    category: "dados",
    asin: "B0F8YZ3WVM",
    description: "Comprehensive reference manual detailing data lakes, serverless ingestion, and warehousing design patterns on AWS.",
    lang: "Inglês",
    coverEmoji: "📖",
    link: "https://www.amazon.com/dp/B0F8YZ3WVM"
  },
  {
    id: "etl-databricks",
    title: "ETL com Databricks",
    category: "dados",
    asin: "B0DDSXMDWS",
    description: "Implementando Delta Lake, processamento paralelo sobre Apache Spark e arquiteturas escaláveis de ingestão de dados.",
    lang: "Português",
    coverEmoji: "❄️",
    link: "https://www.amazon.com/dp/B0DDSXMDWS"
  },
  {
    id: "databricks-cert-guide",
    title: "Databricks Data Engineer Certification Guide",
    category: "dados",
    asin: "B0F2NZ6JYL",
    description: "Surgical study resources and complete baseline tests to master the Databricks Associate Data Engineer certification.",
    lang: "Inglês",
    coverEmoji: "🎯",
    link: "https://www.amazon.com/dp/B0F2NZ6JYL"
  },
  {
    id: "azure-pipelines-databricks",
    title: "Implementação de Pipelines no Azure Databricks",
    category: "dados",
    asin: "B0CW18R5F5",
    description: "Integração nativa de Data Factory e Databricks para construir orquestrações de Big Data estáveis e auditáveis em nível comercial.",
    lang: "Português",
    coverEmoji: "🚀",
    link: "https://www.amazon.com.br/dp/B0CW18R5F5"
  },
  {
    id: "data-mesh-kafka",
    title: "Data Mesh with Kafka Guide",
    category: "dados",
    asin: "B0F7V4YHZQ",
    description: "Decentralized data architectures paired with Apache Kafka event streams for highly decoupled, domain-driven topologies.",
    lang: "Inglês",
    coverEmoji: "🌐",
    link: "https://www.amazon.com/dp/B0F7V4YHZQ"
  },
  {
    id: "data-observability-aws",
    title: "Data Observability on AWS",
    category: "dados",
    asin: "B0FLC5QBTQ",
    description: "How to set up data quality guards, data drift monitoring, and lineage tracking on Athena, Glue, and CloudWatch structures.",
    lang: "Inglês",
    coverEmoji: "👁️",
    link: "https://www.amazon.com/dp/B0FLC5QBTQ"
  },
 
  // Automação & Negócios Digitais
  {
    id: "ai-side-hustles",
    title: "AI Side Hustles",
    category: "automacao",
    asin: "B0F4XZX5BQ",
    description: "Descubra como construir serviços escaláveis e automatizar faturamento unindo n8n, Stripe e APIs inteligentes.",
    lang: "Inglês",
    coverEmoji: "💸",
    link: "https://www.amazon.com/dp/B0F4XZX5BQ"
  },
  {
    id: "amazon-seo",
    title: "Amazon SEO Strategy",
    category: "automacao",
    asin: "B0F54D1YV3",
    description: "Como estruturar palavras-chave, metadados e indexação para dominar algoritmos do Kindle Direct Publishing (KDP).",
    lang: "Inglês",
    coverEmoji: "📈",
    link: "https://www.amazon.com/dp/B0F54D1YV3"
  },
  {
    id: "personal-assistant-chatgpt",
    title: "Build Your Own Personal Assistant with ChatGPT",
    category: "automacao",
    asin: "B0F6MLW1WX",
    description: "Projete e configure assistentes autônomos dedicados que otimizam sua rotina acadêmica e de negócios.",
    lang: "Inglês",
    coverEmoji: "🛎️",
    link: "https://www.amazon.com/dp/B0F6MLW1WX"
  },
  {
    id: "essential-n8n",
    title: "Essential n8n Playbook",
    category: "automacao",
    asin: "B0F36KWF8N",
    description: "Aprenda lógica de workflows de dados, tratamento de erros avançados e integrações webhook no orquestrador n8n.",
    lang: "Inglês",
    coverEmoji: "📔",
    link: "https://www.amazon.com/dp/B0F36KWF8N"
  },
  {
    id: "vector-dbs-es",
    title: "Bases de Datos Vectoriales para IA Generativa",
    category: "automacao",
    asin: "B0GXWLWDZP",
    description: "Un recorrido práctico por Pinecone, Milvus y Qdrant enfocado en la construcción de sistemas de recuperación elásticos (RAG).",
    lang: "Espanhol",
    coverEmoji: "📚",
    link: "https://www.amazon.com.br/dp/B0GXWLWDZP"
  },
  {
    id: "image-mastery",
    title: "AI Image Mastery: ComfyUI, FLUX, LoRA, ControlNet",
    category: "automacao",
    asin: "B0F76CGSCM",
    description: "Guia definitivo de geração e controle avançado de imagens sintéticas para diretores de arte e builders de assets digitais.",
    lang: "Inglês",
    coverEmoji: "🎨",
    link: "https://www.amazon.com/dp/B0F76CGSCM"
  },
 
  // Direito, Compliance & Aviação
  {
    id: "chatgpt-lawyers-compliance",
    title: "ChatGPT for Lawyers: Data Privacy & Cybersecurity Compliance 2025",
    category: "direito",
    asin: "B0FNVHDZ4N",
    description: "A regulatory handbook mapping prompt engineering safety guidelines, client privileges, and GDPR/LGPD hazards.",
    lang: "Inglês",
    coverEmoji: "🛡️",
    link: "https://www.amazon.com/dp/B0FNVHDZ4N"
  },
  {
    id: "seguranca-publica",
    title: "A Municipalização da Segurança Pública no Brasil",
    category: "direito",
    asin: "B0D9PZ2GRV",
    description: "Análise federativa do papel institutional das guardas municipais e as políticas públicas de segurança e prevenção urbana.",
    lang: "Português",
    coverEmoji: "⚖️",
    link: "https://www.amazon.com/dp/B0D9PZ2GRV"
  },
  {
    id: "aviacao-brasil",
    title: "A Aviação e a Dependência Econômica Brasileira",
    category: "internacional",
    asin: "B0D9Q23HZX",
    description: "Uma análise estruturada sobre os gargalos regulatórios, de infraestrutura logística e dependência de tecnologia de transporte e defesa.",
    lang: "Português",
    coverEmoji: "✈️",
    link: "https://www.amazon.com.br/dp/B0D9Q23HZX"
  }
];

export { articlesData };

export const timelineData: TimelineItem[] = [
  {
    period: "Mar 2026 – Present",
    role: "Coordenador de pós-graduação",
    organization: "Instituto NTA",
    description: "Coordenação geral e estratégica dos programas de pós-graduação tecnológica, estruturação de grades para engenharia de dados e infraestrutura de ponta.",
    type: "professional",
    location: "São Paulo, Brasil • Remote",
    subType: "Full-time",
    logoText: "NTA"
  },
  {
    period: "2026 – Present",
    role: "Certificate Program in Agentic AI",
    organization: "The Johns Hopkins University",
    description: "Especialização de vanguarda focada em engenharia de IA agente, modelagem avançada de sistemas cognitivos autônomos e arquiteturas baseadas em Model Context Protocol (MCP).",
    type: "academic",
    skills: ["Desenvolvimento de software", "Agentic AI"],
    logoText: "JHU"
  },
  {
    period: "Sep 2025 – Mar 2026",
    role: "Engenheiro de dados",
    organization: "Pátria Cidadania",
    description: "Ingestão escalável e processamento de grandes bases sociais, modelagem analítica robusta de pipelines e implementação de controles de governança de dados públicos.",
    type: "professional",
    location: "São Paulo, São Paulo, Brasil • Remote",
    subType: "Full-time",
    logoText: "PC",
    bullets: [
      "Processamento escalável de bases de dados sociais e consolidação de data lakes corporativos.",
      "Liderança técnica e otimização de queries analíticas de alto volume para entrega pontual de informações estatísticas."
    ]
  },
  {
    period: "May 2024 – Sep 2025",
    role: "MBA em Data Science and Analytics",
    organization: "Universidade de São Paulo (USP)",
    description: "Pós-graduação de excelência com forte rigor em modelagem matemática, inteligência artificial integrada, Big Data e tomada de decisão preditiva baseada em dados reais.",
    type: "academic",
    logoText: "USP",
    skills: ["Data Science", "Analytics"]
  },
  {
    period: "Sep 2024 – Aug 2025",
    role: "Engenheiro de dados",
    organization: "Itaú Unibanco",
    description: "Otimização e governança de dados financeiros em larga escala em ambiente de nuvem corporativa de alta exigência transacional.",
    type: "professional",
    location: "São Paulo, São Paulo, Brazil • Remote",
    subType: "Indirect Contract",
    logoText: "ITAÚ",
    bullets: [
      "Glue Jobs e Athena em alto volume, storage analítico e arquitetura de dados sobre o Amazon S3.",
      "Redesenho de processos e otimizações técnicas que geraram uma economia de mais de 20% no tempo de processamento de pipelines de dados críticos.",
      "Sustentação contínua de esteiras integrando segurança, qualidade e rigoroso controle financeiro e orçamentário de performance."
    ],
    skills: ["Big data", "Athena", "AWS Glue", "S3", "SQL", "Performance Tuning"]
  },
  {
    period: "2024 – Present",
    role: "Autor Técnico Internacional",
    organization: "Amazon KDP",
    description: "Construção de uma biblioteca técnica incomparável de 116 volumes de engenharia prática de dados, automações nativas com IA, segurança de LLMs e conformação regulatória distribuída globalmente.",
    type: "professional",
    logoText: "KDP"
  },
  {
    period: "2022 – Present",
    role: "Fundador",
    organization: "LCF Consulting",
    description: "Liderança consultiva especializada auxiliando companhias no desenho seguro de ecossistemas analíticos, pipelines em nuvem e blindagem regulatória para dados pessoais corporativos sob o rigor da LGPD.",
    type: "professional",
    logoText: "LCF"
  },
  {
    period: "Jul 2022 – Oct 2024",
    role: "Engenheiro de dados",
    organization: "Secretaria de Desenvolvimento Econômico do Estado de São Paulo",
    description: "Ingestão e tratamento analítico de grandes barramentos de informações econômicas estatais e elaboração de modelagens complexas estatísticas.",
    type: "professional",
    location: "São Paulo, São Paulo, Brazil • Remote",
    subType: "Indirect Contract",
    logoText: "SDE-SP",
    bullets: [
      "Esteiras analíticas com Azure Databricks + PySpark de alto rendimento orquestrados via Azure Data Factory; armazenamento com ADLS Gen2 e Delta Lake.",
      "Estabilização e padronização que geraram +25% de eficiência operacional e decréscimo de até 30% em erros de carga de processamento de dados.",
      "Elaboração de relatórios analíticos de fomento econômico e cruzamento de dados estaduais consumidos por diretores e secretários de planejamento."
    ],
    skills: ["ETL", "Unix", "Azure Databricks", "PySpark", "Azure Data Factory", "ADLS Gen2", "Python", "SQL"]
  },
  {
    period: "Jun 2022 – Jan 2023",
    role: "MBA em Desenvolvimento de Software",
    organization: "IGTI",
    description: "Especialização focada em engenharia de sistemas modernos, ciclo de vida de soluções escaláveis em nuvem e adoção rigorosa de metodologias ágeis de desenvolvimento.",
    type: "academic",
    logoText: "IGTI",
    skills: ["Angular", "Agile Methodologies", "Computer Software Engineering"]
  },
  {
    period: "Nov 2021 – Jul 2022",
    role: "Consultor de Proteção de Dados (Data Protection Consultant)",
    organization: "Open Collective",
    description: "Assessoria especializada em governança operacional, conformação com legislações de privacidade transfronteiriças e adequação ágil de sistemas.",
    type: "professional",
    location: "United States • Remote",
    subType: "Contract",
    logoText: "OC",
    bullets: [
      "Atualização em conformidade regulatória rigorosa com as premissas europeias (GDPR) e brasileiras (LGPD) sobre o trâmite de metadados e privacidade do usuário.",
      "Configuração e otimização de estratégias avançadas de metatags e performance de SEO focados na expansão e posicionamento da comunidade lusófona.",
      "Coparticipação em cerimônias de desenvolvimento de software em squads ágeis visando segurança robusta por design (privacy by design)."
    ],
    skills: ["ETL", "Resolução de problemas", "GDPR/LGPD compliance", "SEO", "Agile Sprints"]
  },
  {
    period: "Oct 2019 – Oct 2021",
    role: "Analista de Dados Regulatórios",
    organization: "Junta Comercial do Estado de São Paulo",
    description: "Sustentação de processos analíticos e geração de relatórios de registro empresarial e governança sob a coordenação da Presidência do órgão.",
    type: "professional",
    location: "São Paulo, Brasil • Remote",
    subType: "Full-time",
    logoText: "JUCESP",
    bullets: [
      "Mapeamento, extração de dados e estruturação periódica de relatórios dos principais indicadores de atividade societária comercial (aberturas, fusões, aquisições e baixas).",
      "Modelagem e manutenção de dashboards gerenciais de inteligência usando Power BI e planilhas técnicas avançadas voltadas para o suporte direto da alta gestão.",
      "Auditoria instrumental rigorosa de acervos documentais e veracidade de informações corporativas frente às normativas e regramentos do DREI.",
      "Coordenação analítica e triagem de solicitações processuais de Mandados de Segurança e suporte ao encaminhamento estratégico da Procuradoria Jurídica.",
      "Apoio processual direto na redação, triagem e formatação de atos e resoluções executivas exigindo a assinatura formal e publicação do Presidente."
    ],
    skills: ["ETL", "Dashboards", "Power BI", "Data Analysis", "Compliance", "Mandado de Segurança"]
  },
  {
    period: "2015 – 2021",
    role: "Bacharel em Direito",
    organization: "IESP",
    description: "Graduação oficial voltada ao ambiente regulatório, contencioso corporativo e direito administrativo. Monografia final centrada na estruturação da segurança pública focada no âmbito municipal.",
    type: "academic",
    logoText: "IESP"
  },
  {
    period: "2015 – 2016",
    role: "Pesquisador de Políticas Públicas",
    organization: "Secretaria Municipal de Direitos Humanos de SP",
    description: "Coprodução científica e formulação estatística amostral para o diagnóstico de vulnerabilidades urbanas visando o fomento à justiça social e inclusão civil.",
    type: "professional",
    logoText: "SMDH-SP"
  },
  {
    period: "Jan 2014 – Jan 2015",
    role: "Especialização em Economia",
    organization: "Pontifícia Universidade Católica de São Paulo",
    description: "Estudos formais avançados estruturando as dimensões do desenvolvimento econômico nacional, macroeconomia aplicada e análise quantitativa setorial.",
    type: "academic",
    logoText: "PUC-SP"
  },
  {
    period: "Jun 2008 – Aug 2013",
    role: "Bacharel em Relações Internacionais",
    organization: "Faculdades Integradas Rio Branco",
    description: "Análise analítica de teorias geopolíticas internacionais clássicas, comércio exterior e logística alfandegária. Estudo de graduação focado no modal logístico aéreo nacional.",
    type: "academic",
    logoText: "FIRB"
  }
];

export const themeDomains: ThemeDomain[] = [
  {
    id: "ia-prod",
    title: "IA Aplicada em Produção",
    desc: "Desenvolvimento e deploy do Model Context Protocol (MCP), orquestrações avançadas com n8n, engenharia de prompts e design de agentes sob padrões de controle operacional."
  },
  {
    id: "dados-cloud",
    title: "Engenharia de Dados em Nuvem",
    desc: "Arquitetura e implementação de pipelines ETL/ELT eficientes usando AWS Glue, Databricks, Spark, Athena e governança de dados governamentais ou biográficos na Azure."
  },
  {
    id: "seguranca-ia",
    title: "Segurança de Sistemas com IA",
    desc: "Investigação emergente de riscos ligados a Prompt Injection (injeção indireta de prompts), engenharia de harnesses e construção de guardrails preventivos contra vazamentos de dados."
  },
  {
    id: "automation",
    title: "Automação & Orquestração de Processos",
    desc: "Construção de fluxos corporativos hiperconectados usando n8n, conexões robustas com Webhooks, APIs REST, e integração com Stripe ou faturamentos complexos."
  },
  {
    id: "prod-escala",
    title: "Produção Intelectual em Escala",
    desc: "Valores factuais comprovados em mais de 116 títulos publicados em 4 idiomas na Amazon KDP, complementados com dezenas de ensaios e artigos de altíssimo tráfego no Jusbrasil e Medium."
  },
  {
    id: "geopolitica",
    title: "Geopolítica, Gestão Pública & Economia",
    desc: "Base analítica densa obtida em Direito e Relações Internacionais aplicados para entender segurança pública, transporte aeroespacial e políticas baseadas em evidências sólidas."
  }
];