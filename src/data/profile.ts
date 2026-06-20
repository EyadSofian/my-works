/* ============================================================
   profile.ts — single source of truth for all portfolio content.
   Components render from here; no copy lives in components.
   Sourced from Eyad Sofian's CV, GitHub, and the build spec.
   ============================================================ */

export type Lang = 'en' | 'ar';

/* ---------------- Hero ---------------- */
export const hero = {
  eyebrow: 'AI / NLP ENGINEER · AUTOMATION ARCHITECT',
  name: 'EYAD SOFIAN',
  nameAr: 'إياد سفيان',
  role: 'Botpress Certified Partner',
  subtitle:
    'Botpress Certified Partner — Arabic-first Conversational AI & end-to-end Automation for MENA.',
  subtitleAr:
    'شريك معتمد من Botpress — ذكاء اصطناعي حِواري عربيّ أولاً وأتمتة متكاملة لمنطقة الشرق الأوسط.',
  ctaPrimary: 'View Work',
  ctaSecondary: 'Download CV',
  location: 'Cairo, Egypt · Remote',
  available: 'Available for work',
} as const;

/* ---------------- Live ticker (hero bottom-left) ---------------- */
export const ticker: string[] = [
  'Botpress Certified Partner',
  '50,000+ trainees served',
  '40K+ contacts migrated',
  '40-node call-QA pipeline',
  'Arabic-first conversational AI',
];

/* ---------------- Metrics (About / Impact) ---------------- */
export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  hint?: string;
}

export const metrics: Metric[] = [
  { value: 2, suffix: '+', label: 'Years shipping production AI', hint: 'Conversational AI · automation · RAG' },
  { value: 50000, suffix: '+', label: 'Trainees served by “Fahad”', hint: 'Arabic CS agent · WhatsApp / Messenger / Web' },
  { value: 60, suffix: '%', label: 'Response-time reduction', hint: 'HITL + automation across support' },
  { value: 80, suffix: '%', label: 'Manual-entry reduction', hint: 'n8n + ERP workflow automation' },
  { value: 40, suffix: 'K+', label: 'Contacts migrated, fault-tolerant', hint: 'UChat → Chatwoot · resumable' },
];

/* ---------------- About bio ---------------- */
export const about = {
  kicker: 'About',
  heading: 'I build intelligent systems that talk, decide, and automate — in Arabic and English.',
  body: [
    'I’m an AI engineer and automation architect specialising in Arabic-first conversational AI for the MENA market. I design and ship production systems end-to-end: Botpress agents with human-in-the-loop handoff, RAG pipelines, ERP and CRM integrations, and the bridge servers that glue them together.',
    'My work spans a 40-node call-quality auditing pipeline (Yeastar → Whisper → GPT-4o → Pinecone → Odoo), a production Arabic support agent serving 50,000+ trainees, and a fault-tolerant migration of 40K+ contacts. I care about reliability, latency, and clean handoffs between bots and humans.',
    'I also work hands-on with NLP/NLU and model training: fine-tuning open LLMs for Arabic with LoRA / QLoRA (Unsloth on Google Colab), curating and cleaning instruction datasets, and evaluating models before shipping them into agents like “Majed”.',
  ],
  bodyAr: [
    'مهندس ذكاء اصطناعي ومعماري أتمتة متخصص في الذكاء الاصطناعي الحِواري العربيّ أولاً لسوق الشرق الأوسط. أصمّم وأطلق أنظمة إنتاجية متكاملة: وكلاء Botpress مع تسليم بشري، وخطوط RAG، وتكاملات ERP وCRM، وخوادم الجسور التي تربطها.',
  ],
};

/* ---------------- Experience ---------------- */
export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    id: 'engosoft',
    role: 'AI Product & Technology Specialist',
    org: 'Engosoft Training & Consulting',
    period: '10/2025 — Present',
    location: 'Remote',
    current: true,
    summary:
      'Own the AI & automation stack for a training company serving tens of thousands of learners.',
    highlights: [
      'Built a 40-node n8n call-quality auditing pipeline: Yeastar PBX → Whisper (Arabic STT, 8k→16k upsampling fix) → GPT-4o scoring on 50+ criteria → Pinecone RAG → Odoo CRM → HTML email reports.',
      'Shipped “Fahad” — a production Arabic customer-service agent (Botpress + Chatwoot HITL + full Odoo) across WhatsApp, Messenger & Web, serving 50,000+ trainees.',
      'Built the Engosoft AI Copilot Chatwoot app and grounded RAG knowledge bases (courses, tracks, grouping rules).',
    ],
    tech: ['n8n', 'Botpress', 'Chatwoot', 'GPT-4o', 'Whisper', 'Pinecone', 'Odoo', 'Node.js'],
  },
  {
    id: 'xq',
    role: 'AI Solutions Engineer',
    org: 'XQ Pharma',
    period: '03/2024 — 10/2025',
    location: 'Cairo',
    summary:
      'Designed AI + commerce systems for a pharmaceutical retail operation.',
    highlights: [
      'Built a Shopify Loyalty & Points platform (Node/Express + Prisma + PostgreSQL + Shopify Polaris) deployed on GCP at loyalty.xqpharma.net.',
      'Designed a Retrieval-Augmented Generation architecture for product and policy Q&A.',
      'Automated manual back-office workflows, cutting manual data entry by ~80%.',
    ],
    tech: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Shopify Polaris', 'GCP', 'RAG'],
  },
  {
    id: 'terynova',
    role: 'AI Chatbot Developer · Freelance',
    org: 'Terynova',
    period: '2025',
    location: 'Cairo',
    summary: 'Delivered bilingual conversational agents for client engagements.',
    highlights: [
      'Built bilingual (AR/EN) sales and support chatbots on Botpress.',
      'Integrated LLM reasoning with calendar, CRM and email tools for end-to-end flows.',
    ],
    tech: ['Botpress', 'Gemini 2.5', 'Google Calendar', 'Odoo', 'Gmail'],
  },
  {
    id: 'wonder',
    role: 'AI & Automation Developer',
    org: 'Wonder of Women',
    period: '12/2023 — 02/2024',
    location: 'Cairo',
    summary: 'Stood up the first automation and chatbot layer for the brand.',
    highlights: [
      'Built automation workflows connecting messaging channels to back-office tools.',
      'Designed conversational flows for lead capture and customer engagement.',
    ],
    tech: ['n8n', 'Make', 'Botpress', 'WhatsApp'],
  },
  {
    id: 'albakry',
    role: 'Chatbot Developer',
    org: 'Al-Bakry Overseas',
    period: '09/2023 — 11/2023',
    location: 'Cairo',
    summary: 'First engineering hire for a B2B travel operation.',
    highlights: [
      'Built the B2B travel portal backend (Express + Prisma + PostgreSQL/Neon) with 8 service modules and role-based access.',
      'Developed chatbot flows for travel inquiries and booking support.',
    ],
    tech: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Neon'],
  },
  {
    id: 'freelance',
    role: 'Freelance AI Engineer',
    org: 'Self-Employed',
    period: '01/2024 — Present',
    location: 'Remote',
    current: true,
    summary: 'Independent product work across AI, automation and full-stack.',
    highlights: [
      'Built JARVIS — a local AI desktop assistant (Python/FastAPI + pywebview + Groq/Orpheus TTS + faster-whisper + wake-word).',
      'Built HR-in-a-Box — an 18-module multi-tenant HR SaaS (n8n sub-workflows + Claude API + Airtable + Telegram/WhatsApp).',
      'Delivered bridge servers, migrations and dashboards for multiple MENA clients.',
    ],
    tech: ['Python', 'FastAPI', 'Claude API', 'n8n', 'Airtable', 'React'],
  },
];

/* ---------------- Featured projects ---------------- */
export interface ProjectLink {
  label: string;
  href: string;
}
export interface Project {
  id: string;
  title: string;
  titleAr?: string;
  category: string;
  blurb: string; // short — card
  description: string; // long — modal
  stack: string[];
  links: ProjectLink[];
  metric?: string;
}

const GH = 'https://github.com/EyadSofian';

export const projects: Project[] = [
  {
    id: 'call-qa',
    title: 'Engosoft Call Quality Auditing',
    category: 'AI Pipeline · n8n',
    blurb:
      '40-node pipeline auto-scoring Arabic support calls against 50+ criteria.',
    description:
      'A 40-node n8n pipeline that ingests calls from a Yeastar PBX, transcribes Arabic speech with Whisper (with an 8k→16k upsampling fix for telephony audio), scores each call against 50+ quality criteria using GPT-4o, retrieves context via Pinecone RAG, writes results into Odoo CRM, and emails formatted HTML quality reports to managers.',
    stack: ['n8n', 'Yeastar PBX', 'Whisper', 'GPT-4o', 'Pinecone', 'Odoo', 'Node.js'],
    links: [{ label: 'Related: yeastar-n8n-bridge', href: `${GH}/yeastar-n8n-bridge` }],
    metric: '50+ criteria scored / call',
  },
  {
    id: 'fahad',
    title: 'Fahad — فهد',
    titleAr: 'فهد',
    category: 'Conversational AI · Production',
    blurb:
      'Production Arabic customer-service agent with human-in-the-loop, 50k+ users.',
    description:
      'Fahad is a production Arabic customer-service agent built on Botpress with Chatwoot human-in-the-loop handoff and a full Odoo back-end (Helpdesk, CRM, Sales, Inventory). It runs across WhatsApp, Messenger and Web and serves 50,000+ trainees. A custom bridge server syncs sessions and routes takeover between the bot and live agents.',
    stack: ['Botpress', 'Chatwoot', 'Odoo', 'WhatsApp', 'Node.js', 'Express', 'Railway'],
    links: [
      { label: 'Bridge: chatwoot_botv', href: `${GH}/chatwoot_botv` },
      { label: 'Odoo sync: chatwoot-x-odoo', href: `${GH}/chatwoot-x-odoo` },
    ],
    metric: '50,000+ users',
  },
  {
    id: 'majed',
    title: 'Majed — ماجد',
    titleAr: 'ماجد',
    category: 'Educational AI Assistant',
    blurb:
      'Educational AI assistant grounded on a courses DB in strict no-hallucination mode.',
    description:
      'Majed is an educational AI assistant powered by Gemini 2.5 Flash, orchestrated with n8n and integrated with Odoo, Google Calendar and Zoho Mail. It answers strictly from a local Markdown courses database and crawled engosoft.com pages in a RAG-grounded, no-hallucination mode, and ships with a circular liquid-glass chat launcher.',
    stack: ['Gemini 2.5 Flash', 'n8n', 'Odoo', 'Google Calendar', 'Zoho Mail', 'RAG'],
    links: [{ label: 'majed_ai', href: `${GH}/majed_ai` }],
  },
  {
    id: 'arabic-llm',
    title: 'Arabic LLM Fine-tuning',
    category: 'Model Training · LoRA / QLoRA',
    blurb: 'Fine-tuned open LLMs for Arabic conversational & NLU tasks.',
    description:
      'Supervised fine-tuning pipelines for open LLMs targeting Arabic conversational and NLU tasks (intent + slot understanding). Trained efficiently with LoRA / QLoRA via Unsloth on Google Colab (T4 / A100), curated and cleaned instruction datasets, evaluated against held-out sets, and exported merged weights / GGUF for deployment — the understanding layer behind “Majed”-style assistants.',
    stack: ['Python', 'PyTorch', 'Hugging Face', 'Unsloth', 'LoRA / QLoRA', 'Google Colab'],
    links: [{ label: 'GitHub', href: GH }],
    metric: 'LoRA / QLoRA',
  },
  {
    id: 'sayeq',
    title: 'Sayeq — سايق',
    titleAr: 'سايق',
    category: 'Bilingual Sales Agent',
    blurb: 'Bilingual sales agent built on Botpress ADK (TypeScript).',
    description:
      'Sayeq is a bilingual (Arabic/English) sales agent built on the Botpress ADK in TypeScript, using Gemini 2.5 Flash for reasoning and integrated with Google Calendar, Odoo and Gmail to qualify leads, book meetings and close the loop with the sales team.',
    stack: ['Botpress ADK', 'TypeScript', 'Gemini 2.5 Flash', 'Google Calendar', 'Odoo', 'Gmail'],
    links: [{ label: 'GitHub', href: GH }],
  },
  {
    id: 'hr-in-a-box',
    title: 'HR-in-a-Box',
    category: 'Multi-tenant HR SaaS',
    blurb: '18-module multi-tenant HR SaaS driven by n8n sub-workflows + Claude.',
    description:
      'A multi-tenant HR SaaS with 18 modules (onboarding, payroll, CV screening and more) built from composable n8n sub-workflows, the Claude API for reasoning, Airtable as the data layer, and Telegram/WhatsApp (Evolution API) as the front-end channels.',
    stack: ['n8n', 'Claude API', 'Airtable', 'Telegram', 'WhatsApp', 'Evolution API'],
    links: [{ label: 'hr-app', href: `${GH}/hr-app` }],
    metric: '18 modules',
  },
  {
    id: 'jarvis',
    title: 'JARVIS',
    category: 'Local AI Desktop Assistant',
    blurb: 'Offline-capable desktop assistant with wake-word and low-latency TTS.',
    description:
      'JARVIS is a local AI desktop assistant built with Python/FastAPI and a pywebview shell. It uses Groq-hosted Orpheus TTS for natural speech, faster-whisper for low-latency transcription, and a wake-word engine for hands-free activation — a privacy-friendly, mostly-local voice assistant.',
    stack: ['Python', 'FastAPI', 'pywebview', 'Groq / Orpheus', 'faster-whisper'],
    links: [{ label: 'GitHub', href: GH }],
  },
  {
    id: 'shopify-loyalty',
    title: 'Shopify Loyalty & Points',
    category: 'Commerce · XQ Pharma',
    blurb: 'Custom loyalty & points engine embedded in Shopify, live on GCP.',
    description:
      'A custom loyalty and points platform for XQ Pharma built with Node/Express, Prisma and PostgreSQL, embedded into the Shopify admin with Polaris UI and deployed on GCP at loyalty.xqpharma.net.',
    stack: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Shopify Polaris', 'GCP'],
    links: [{ label: 'Live · loyalty.xqpharma.net', href: 'https://loyalty.xqpharma.net' }],
  },
  {
    id: 'uchat-migration',
    title: 'UChat → Chatwoot Migration',
    category: 'Data Migration · Resilient',
    blurb: '40K+ contacts migrated with resumable jobs and exponential backoff.',
    description:
      'A fault-tolerant migration moving 40K+ contacts from UChat to Chatwoot, including message-history extraction and private-notes injection. Built on resumable GitHub Actions cron jobs with exponential backoff and a source_id formatting fix to survive API limits and partial failures.',
    stack: ['Python', 'UChat API', 'Chatwoot API', 'GitHub Actions'],
    links: [
      { label: 'chatwoot-x-uchat', href: `${GH}/chatwoot-x-uchat` },
      { label: 'pulls-messages-from-the-U-Chat', href: `${GH}/pulls-messages-from-the-U-Chat` },
    ],
    metric: '40,000+ contacts',
  },
  {
    id: 'albakry-portal',
    title: 'Al-Bakry B2B Travel Portal',
    category: 'Full-stack · B2B',
    blurb: 'B2B travel portal with 8 service modules and role-based access.',
    description:
      'A B2B travel portal backend and app for Al-Bakry Overseas, built with Express, Prisma and PostgreSQL (Neon). It exposes 8 service modules with role-based access, plus an internal document studio (Elbakri Docs) for invoices, vouchers and statements.',
    stack: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Neon'],
    links: [{ label: 'elbakri-portal', href: `${GH}/elbakri-portal` }],
    metric: '8 modules',
  },
];

export const githubProfile = GH;

/* ---------------- Model training / fine-tuning ---------------- */
export interface TrainedModel {
  id: string;
  base: string; // base model
  params: string; // size badge
  technique: string; // LoRA / QLoRA
  focus: string; // one-line purpose
  detail: string; // longer description
  tags: string[];
}

export const training = {
  heading: 'Models I’ve fine-tuned.',
  blurb:
    'I take strong open-source LLMs and adapt them for Arabic-first, production use — parameter-efficient fine-tuning (LoRA / QLoRA) with Unsloth on Google Colab, custom instruction datasets, evaluation, then merge / GGUF export for deployment.',
  repo: 'https://github.com/EyadSofian/my-works',
  // the training recipe, shown as a pipeline
  pipeline: ['Curate dataset', 'Fine-tune · LoRA / QLoRA', 'Evaluate', 'Merge / GGUF', 'Deploy'],
  stack: ['Unsloth', 'Hugging Face', 'PyTorch', 'PEFT', 'bitsandbytes', 'Google Colab'],
  models: [
    {
      id: 'qwen',
      base: 'Qwen 2.5',
      params: '7B',
      technique: 'QLoRA',
      focus: 'Arabic conversational + intent / slot NLU',
      detail:
        'Fine-tuned Qwen 2.5 (7B) with 4-bit QLoRA via Unsloth on Google Colab for Arabic conversational understanding — intent detection and slot extraction that drives agent routing — on curated instruction datasets.',
      tags: ['QLoRA', '4-bit', 'Unsloth', 'Arabic NLU'],
    },
    {
      id: 'llama',
      base: 'Llama 3.1',
      params: '8B',
      technique: 'LoRA',
      focus: 'Arabic instruction-following & grounded answering',
      detail:
        'Instruction-tuned Llama 3.1 (8B) with LoRA for Arabic instruction-following and RAG-grounded answering, then merged the adapters and exported to GGUF for local / edge inference.',
      tags: ['LoRA', 'GGUF', 'RAG', 'Instruction-tuning'],
    },
    {
      id: 'dolphin',
      base: 'Dolphin (Mistral)',
      params: '7B',
      technique: 'QLoRA',
      focus: 'Tool-using, steerable domain assistant',
      detail:
        'Continued fine-tuning of a Dolphin (Mistral-based) checkpoint with QLoRA for a tool-using, system-prompt-steerable domain assistant, evaluated against held-out conversations before deployment.',
      tags: ['QLoRA', 'Dolphin', 'Function-calling', 'Eval'],
    },
  ] as TrainedModel[],
};

/* ---------------- Skills ---------------- */
export interface SkillLane {
  id: string;
  label: string;
  items: string[];
}

export const skills: SkillLane[] = [
  {
    id: 'ai-nlp',
    label: 'AI & NLP',
    items: ['NLP', 'NLU', 'GPT-4o', 'Whisper', 'Gemini 2.5', 'Claude API', 'Pinecone', 'ChromaDB', 'LangGraph', 'RAG', 'Groq / Orpheus'],
  },
  {
    id: 'training',
    label: 'LLM Fine-tuning',
    items: ['Fine-tuning', 'LoRA', 'QLoRA', 'PEFT', 'Unsloth', 'Google Colab', 'Hugging Face', 'PyTorch', 'Datasets', 'Evaluation'],
  },
  {
    id: 'conversational',
    label: 'Conversational',
    items: ['Botpress (Certified)', 'Botpress ADK', 'Chatwoot', 'HITL'],
  },
  {
    id: 'automation',
    label: 'Automation / RPA',
    items: ['n8n (self-hosted)', 'Make', 'Zapier', 'UiPath', 'Apify', 'GitHub Actions'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'Python', 'FastAPI', 'WebSockets', 'XML-RPC'],
  },
  {
    id: 'data',
    label: 'Data',
    items: ['PostgreSQL', 'Prisma', 'Neon', 'Airtable', 'Google Sheets API'],
  },
  {
    id: 'erp-ecom',
    label: 'ERP / E-com',
    items: ['Odoo 17 / 18', 'Custom Odoo modules', 'Shopify API', 'Shopify Polaris'],
  },
  {
    id: 'frontend',
    label: 'Frontend / Mobile',
    items: ['React', 'Vite', 'Framer Motion', 'TypeScript', 'Tailwind', 'Flutter'],
  },
  {
    id: 'infra',
    label: 'Infra',
    items: ['Coolify', 'Hetzner', 'Railway', 'GCP', 'Docker'],
  },
];

/* ---------------- Certifications ---------------- */
export interface Cert {
  name: string;
  issuer: string;
}
export const certs: Cert[] = [
  { name: 'Certified Partner', issuer: 'Botpress' },
  { name: 'Prompt Engineering · Fine-tuning', issuer: 'DeepLearning.AI' },
  { name: 'LLM Customization', issuer: 'Hugging Face' },
  { name: 'Cloud Foundations', issuer: 'AWS' },
];

/* ---------------- Contact ---------------- */
export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: 'mail' | 'whatsapp' | 'github' | 'linkedin' | 'botpress';
}

export const contact = {
  heading: 'Let’s build something intelligent.',
  headingAr: 'لنبنِ شيئاً ذكياً.',
  blurb:
    'Open to AI engineering, automation, and conversational-AI work across MENA. Fastest reply on WhatsApp or email.',
  email: 'eyadsofian862@gmail.com',
  whatsapp: '+20 121 028 0648',
  whatsappHref: 'https://wa.me/201210280648',
  channels: [
    { id: 'email', label: 'Email', value: 'eyadsofian862@gmail.com', href: 'mailto:eyadsofian862@gmail.com', icon: 'mail' },
    { id: 'whatsapp', label: 'WhatsApp', value: '+20 121 028 0648', href: 'https://wa.me/201210280648', icon: 'whatsapp' },
    { id: 'github', label: 'GitHub', value: 'github.com/EyadSofian', href: 'https://github.com/EyadSofian', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', value: 'in/eyad-sofian', href: 'https://www.linkedin.com/in/eyad-sofian-16b753238/', icon: 'linkedin' },
    { id: 'botpress', label: 'Botpress Experts', value: 'Certified Partner', href: 'https://botpress.com/experts', icon: 'botpress' },
  ] as ContactChannel[],
};

/* ---------------- Navigation ---------------- */
export interface NavItem {
  id: string;
  label: string;
  labelAr: string;
}
export const nav: NavItem[] = [
  { id: 'work', label: 'Work', labelAr: 'الأعمال' },
  { id: 'experience', label: 'Experience', labelAr: 'الخبرة' },
  { id: 'training', label: 'Training', labelAr: 'التدريب' },
  { id: 'skills', label: 'Skills', labelAr: 'المهارات' },
  { id: 'contact', label: 'Contact', labelAr: 'تواصل' },
];

/* ---------------- UI strings (bilingual chrome) ---------------- */
export interface UIStrings {
  talk: string;
  aboutKicker: string;
  impact: string;
  selectedWork: string;
  experience: string;
  skills: string;
  certifications: string;
  viewAllGithub: string;
  scroll: string;
  close: string;
  visit: string;
  rights: string;
  loading: string;
}

export const ui: Record<Lang, UIStrings> = {
  en: {
    talk: "Let's talk",
    aboutKicker: 'About',
    impact: 'Impact',
    selectedWork: 'Selected Work',
    experience: 'Experience',
    skills: 'Skills',
    certifications: 'Certifications',
    viewAllGithub: 'View all on GitHub',
    scroll: 'Scroll',
    close: 'Close',
    visit: 'Visit',
    rights: 'All rights reserved.',
    loading: 'Loading',
  },
  ar: {
    talk: 'لنتحدث',
    aboutKicker: 'نبذة',
    impact: 'الأثر',
    selectedWork: 'أعمال مختارة',
    experience: 'الخبرة',
    skills: 'المهارات',
    certifications: 'الشهادات',
    viewAllGithub: 'كل المشاريع على GitHub',
    scroll: 'مرّر',
    close: 'إغلاق',
    visit: 'زيارة',
    rights: 'جميع الحقوق محفوظة.',
    loading: 'تحميل',
  },
} as const;

export const assets = {
  cv: '/assets/eyad-sofian-cv.pdf',
} as const;
