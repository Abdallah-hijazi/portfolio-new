import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "automotive-digital-ecosystem",
    title: "Automotive Digital Ecosystem",
    tagline:
      "Automotive e-commerce platforms, dealership management systems, and vehicle inventory solutions.",
    category: "Web Application",
    status: "Production",
    featured: true,
    year: 2025,
    role: "Web Developer @ Compu-vision",
    technologies: [
      "PHP",
      "Next.js",
      "Node.js",
      "JavaScript",
      "MySQL",
      "REST APIs",
      "TypeScript",
      "next-intl",
      "React Query",
      "Tailwind CSS"
    ],
    overview:
      "A collection of automotive platforms developed for dealerships and vehicle retailers in Qatar, including Jetour Qatar, Kaiyi Qatar, MHero Qatar, and Al Waha Cars. My work ranged from building complete dealership management systems and customer-facing websites to enhancing existing platforms with new features, performance improvements, and backend integrations.",
    problem:
      "Automotive businesses required digital platforms capable of handling complex dealership operations, including vehicle inventory management, reservations, test drives, online sales, stock tracking, and customer engagement. They also needed highly interactive vehicle experiences and reliable performance under production workloads.",
    solution:
      "Developed and enhanced multiple automotive solutions by building custom CMS platforms, customer-facing websites, and backend services. Implemented inventory and dealership management features, optimized application performance, improved payment workflows, and delivered interactive vehicle experiences such as animated 360-degree car views with configurable color options.",
    architecture: [
      "Custom PHP-based CMS and dealership management systems for inventory, sales, reservations, and vehicle operations.",
      "Next.js frontends and Node.js backend services for modern automotive websites.",
      "RESTful APIs connecting customer-facing applications with dealership management systems.",
    "MySQL database architecture optimized for inventory management and high-traffic automotive catalogs.",
    "Interactive media delivery system supporting 360-degree vehicle visualization and dynamic color selection."
    ],
    challenges: [
      {
        title: "Delivering immersive vehicle experiences",
        detail:
          "Building dynamic 360-degree vehicle viewers with animated transitions and real-time color switching required careful optimization to maintain smooth performance across devices."
      },
      {
        title: "Managing complex dealership operations",
        detail:
          "The CMS platforms had to support inventory management, vehicle movement tracking, maintenance records, reservations, and stock automation while remaining intuitive for dealership staff."
      },
      {
        title: "Performance and scalability",
        detail:
          "Large image assets, interactive media, and vehicle catalogs required extensive performance optimization to ensure fast loading times and a seamless user experience."
      },
      {
        title: "Reliable payment and booking flows",
        detail:
          "Maintaining secure payment processing and reservation systems required handling edge cases, fixing existing integration issues, and ensuring accurate transaction and redirect behavior."
      }
    ],
    lessons: [
      "Performance optimization becomes critical when applications rely heavily on interactive media and large visual assets.",
      "Small details in calculations, redirects, and inventory data can significantly impact business operations.",
      "Automotive management systems require careful data modeling to accurately represent vehicle lifecycles and dealership workflows.",
      "Secure payment and booking experiences depend on rigorous testing of every edge case and user journey."
    ],
    metrics: [
      { label: "Platforms", value: "4 Automotive Systems" },
      { label: "Technologies", value: "PHP, Next.js & Node.js" },
      { label: "Focus", value: "Dealership Management & E-Commerce" }
    ],
    links: {
      websites: [
        {
          label: "Kaiyi Qatar",
          url: "https://www.kaiyiqatar.com"
        },
        {
          label: "MHero Qatar",
          url: "https://www.mheroqatar.com"
        },
        {
          label: "Al Waha Cars",
          url: "https://www.alwahacars.com"
        }
      ]
    },
    screenshots: [
      {
        alt: "Automotive platform storefront",
        caption: "",
      },
    ],
    modes: ["developer"],
  },
  {
    slug: "gymnastics-competition-platform",
    title: "Gymnastics Competition Management System",
    tagline:
      "Laravel backend powering athlete registration, live scoring, and rankings.",
    category: "Backend & APIs",
    status: "Delivered",
    featured: true,
    year: 2025,
    role: "Backend Developer @ Cutting Edge",
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs", "CMS"],
    overview:
      "A competition management platform for gymnastics events. I designed the backend architecture, built the scoring and ranking APIs, and implemented a custom CMS so administrators can run events without engineering help.",
    problem:
      "Gymnastics competitions were managed with manual spreadsheets: athlete registration, judge scoring, and rankings were slow, error-prone, and impossible to update in real time during an event.",
    solution:
      "Designed a Laravel backend with clean domain boundaries — registration, scoring algorithms, and ranking logic — exposed through RESTful APIs, plus a custom CMS that lets administrators manage events, athletes, and results efficiently.",
    architecture: [
      "Laravel MVC backend with dedicated services for registration, scoring, and ranking",
      "Relational schema (MySQL) optimized for fast standings recalculation",
      "REST endpoints for real-time ranking updates during live events",
      "Custom CMS layer for event and result administration",
    ],
    challenges: [
      {
        title: "Scoring rules as an algorithm",
        detail:
          "Gymnastics scoring involves specific rules for aggregating judge scores; encoding them precisely — and keeping rankings correct as scores stream in — was the core of the system.",
      },
      {
        title: "Query performance under event-day load",
        detail:
          "Standings pages hammer the database during events. Optimizing the relational schema and queries kept ranking retrieval fast without caching complexity.",
      },
    ],
    lessons: [
      "Domain logic isolated in services keeps a Laravel codebase testable as rules grow.",
      "Schema design up front is cheaper than query fixes after launch.",
    ],
    metrics: [
      { label: "Delivery", value: "On schedule" },
      { label: "Admin ops", value: "Fully self-serve CMS" },
    ],
    links: {},
    linksNote: "Private CMS — not publicly shared.",
    screenshots: [
      {
        alt: "Competition scoring dashboard",
        caption: "TODO: add a real screenshot of the scoring dashboard.",
      },
    ],
    modes: ["developer"],
  },
  {
    slug: "interphase-frontend-optimization",
    title: "Interphase Frontend Platform",
    tagline:
      "Figma-to-production interfaces, QA foundations, and a measured 25% faster page load.",
    category: "Web Application",
    status: "Delivered",
    featured: true,
    year: 2024,
    role: "Front-End Developer @ Interphase",
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Figma",
      "Responsive Design",
      "QA",
      "Agile",
    ],
    overview:
      "Frontend work on a product still in testing before launch: converting Figma designs into responsive interfaces, optimizing page load, and helping establish QA testing scopes and deliverables. I left before the public release, but the role also exposed me to Agile delivery alongside Waterfall-style planning.",
    problem:
      "Pages loaded slowly and the UI drifted from design across devices and browsers. The product was pre-launch, so quality had to be proven through structured testing — not yet through live user traffic.",
    solution:
      "Applied front-end optimization techniques and pixel-accurate Figma-to-code conversion while collaborating with QA to define testing scopes and deliverables. Worked within Agile sprints and learned how Waterfall-style milestones still shaped parts of the delivery process.",
    architecture: [
      "Component-based UI structure with shared style primitives",
      "Responsive breakpoints validated across devices and browsers",
      "Performance budget applied to images, fonts, and script loading",
      "QA checklists and test deliverables aligned with sprint milestones",
    ],
    challenges: [
      {
        title: "Finding the real bottlenecks",
        detail:
          "A 25% load-time cut came from measuring first — profiling asset weight and render blocking — instead of guessing at micro-optimizations.",
      },
      {
        title: "Design fidelity at every width",
        detail:
          "Matching Figma exactly on one screen is easy; keeping it consistent across browsers and devices required a systematic responsive audit.",
      },
      {
        title: "QA before launch",
        detail:
          "With no production users yet, I helped shape testing scopes and deliverables so the team could catch regressions early — reducing post-launch bugs by 30% in later releases.",
      },
    ],
    lessons: [
      "Performance work is measurement work; the profiler beats intuition.",
      "Defining QA deliverables early pays off even when the product has not shipped yet.",
      "Seeing both Agile and Waterfall in practice makes trade-offs between speed and documentation tangible.",
    ],
    metrics: [
      { label: "Page load time", value: "−25%" },
      { label: "User engagement", value: "+15%" },
      { label: "Post-launch bugs", value: "−30%" },
    ],
    links: {},
    linksNote: "Pre-launch product — no public URL (left before release).",
    screenshots: [
      {
        alt: "Interphase responsive interface",
        caption: "TODO: add a real screenshot.",
      },
    ],
    modes: ["developer"],
  },
  {
    slug: "multilingual-ecommerce",
    title: "Multilingual E-Commerce Platforms",
    tagline:
      "Freelance storefronts with payments, auth, and localized catalogs.",
    category: "E-Commerce",
    status: "Delivered",
    featured: false,
    year: 2023,
    role: "Freelance Full-Stack Developer",
    technologies: ["Laravel", "Node.js", "MySQL", "REST APIs", "Payment APIs", "OAuth/JWT"],
    overview:
      "A series of freelance e-commerce builds — part of 10+ delivered applications — including multilingual storefronts with integrated payment services and authentication providers.",
    problem:
      "Small businesses needed localized online stores with real payments and account systems, but off-the-shelf builders couldn't handle their catalog logic or language requirements.",
    solution:
      "Built custom storefronts on Laravel and Node.js with optimized SQL for catalog queries, integrated third-party payment and authentication APIs, and structured the content model for multiple languages from day one.",
    architecture: [
      "Laravel / Node.js backends with MVC structure and REST APIs",
      "Localized content model for multilingual catalogs",
      "Third-party integrations: payment services and OAuth/JWT auth providers",
      "Optimized SQL queries and schema design for high-traffic pages",
    ],
    challenges: [
      {
        title: "Localization beyond translation",
        detail:
          "Multilingual commerce touches currencies, address formats, and RTL layouts — the data model had to treat locale as a first-class concern.",
      },
      {
        title: "Integrating providers safely",
        detail:
          "Every third-party payment or auth provider has its own failure modes; wrapping them behind internal interfaces kept the platforms stable.",
      },
    ],
    lessons: [
      "Schema decisions made for locale support early save painful migrations later.",
      "Freelance delivery teaches scope discipline: ship the core flow flawlessly first.",
    ],
    metrics: [
      { label: "Applications delivered", value: "10+" },
      { label: "Clients", value: "20+" },
    ],
    links: {
    },
    screenshots: [
      {
        alt: "Multilingual storefront",
        caption: "TODO: add a real screenshot.",
      },
    ],
    modes: ["developer"],
  },
  {
    slug: "ai-voice-ordering",
    title: "AI Voice Ordering Platform",
    tagline:
      "Customers order by voice or chat; an OpenAI-powered assistant turns it into a structured order.",
    category: "Data & AI",
    status: "Production",
    featured: true,
    year: 2026,
    role: "Full-Stack Developer @ Compu-vision",
    technologies: [
      "Node.js",
      "Express",
      "OpenAI API",
      "Socket.io",
      "FFmpeg",
      "Firebase",
      "MySQL",
      "React",
      "Vite",
      "Tailwind CSS",
    ],
    overview:
      "A food-ordering platform made of an Express API, a customer-facing React menu/store, an admin CMS and a real-time chat service. I built the AI ordering flow end to end: the assistant reads a free-text or spoken request, matches it to menu items, and produces an order the kitchen can act on.",
    problem:
      "Customers wanted to order the way they talk — \"two chicken sandwiches, no garlic\" — by text or voice message, and the business wanted those orders to land in the same pipeline as normal ones.",
    solution:
      "An OpenAI-backed assistant that maps natural language to menu items, quantities and modifiers, tolerates typos, and asks back when something is ambiguous. Voice messages are recorded in the browser, converted server-side with FFmpeg, transcribed (speech-to-text) and answered with text-to-speech. Orders, chat and status updates flow over Socket.io with Firebase push notifications.",
    architecture: [
      "Express API with MySQL, JWT auth and role-based access for admin, staff and customers",
      "OpenAI integration for order extraction — item matching, quantity and typo handling",
      "Speech-to-text and text-to-speech pipeline with FFmpeg audio conversion",
      "Socket.io live chat and order status; Firebase Cloud Messaging for push",
      "React + Vite menu and store (i18next, Recharts dashboards, in-browser voice recording)",
      "Scheduled jobs (node-cron) for order lifecycle housekeeping",
    ],
    challenges: [
      {
        title: "Turning messy language into a valid order",
        detail:
          "Users misspell items, mix languages and leave out quantities. The extraction step validates every item against the live menu instead of trusting the model's output.",
      },
      {
        title: "Audio from every device",
        detail:
          "Browser recordings arrive in different codecs; normalising them with FFmpeg before transcription made voice ordering reliable across phones.",
      },
    ],
    lessons: [
      "Treat LLM output as untrusted input — validate it against your own data before it touches business logic.",
      "Real-time features need clear state ownership: the server is the source of truth for an order, sockets only notify.",
    ],
    metrics: [
      { label: "Inputs", value: "Text + voice" },
      { label: "Services", value: "API · store · CMS · chat" },
    ],
    links: {},
    linksNote: "Client project — source is private.",
    screenshots: [{ alt: "AI ordering chat", caption: "" }],
    modes: ["developer", "ai"],
  },
  {
    slug: "clinic-management-billing",
    title: "Clinic Management & Billing System",
    tagline:
      "Invoicing, signed receipts, recurring charges and multi-currency income reports for a physiotherapy clinic.",
    category: "Backend & APIs",
    status: "Production",
    featured: true,
    year: 2026,
    role: "Full-Stack Developer @ Compu-vision",
    technologies: [
      "Fastify",
      "Sequelize",
      "MySQL",
      "JWT",
      "Swagger",
      "React",
      "Redux Toolkit",
      "Material UI",
      "CASL",
      "jsPDF",
    ],
    overview:
      "An API and admin CMS that runs a clinic's front office and finances. I owned most of the billing domain from June to November 2026 — invoices, manual receipts with signatures, internal referrals, recurring billing and the reporting dashboard.",
    problem:
      "The clinic billed in more than one currency, split income between practitioners, and needed paper-equivalent receipts — none of which a generic invoicing tool handled.",
    solution:
      "A Fastify + Sequelize API with JWT/Passport auth and Swagger documentation, and a React CMS with CASL role-based permissions so reception, practitioners and management each see only what they should. Reports compute currency-aware totals and per-practitioner income splits; receipts are generated as signed PDFs.",
    architecture: [
      "Fastify API: JWT, Passport, rate limiting, Helmet, Swagger/OpenAPI docs",
      "Sequelize models over MySQL for patients, sessions, invoices, receipts and referrals",
      "React admin with Redux Toolkit, Material UI and CASL permission checks",
      "PDF generation (jsPDF) for invoices and signed receipts",
      "Socket.io notifications between front desk and practitioners",
    ],
    challenges: [
      {
        title: "Money in two currencies",
        detail:
          "Reports had to reconcile payments recorded in different currencies and split them correctly between practitioners — the rules live in one tested place on the server.",
      },
      {
        title: "Authorization that matches the org chart",
        detail:
          "CASL abilities mirror real roles, and every sensitive route is checked server-side too — the UI hiding a button is not access control.",
      },
    ],
    lessons: [
      "Financial features need server-side authority for every number the UI shows.",
      "Role-based access is easiest to get right when it's declared once and enforced in both layers.",
    ],
    metrics: [
      { label: "Commits", value: "30+" },
      { label: "Domain", value: "Billing & reporting" },
    ],
    links: {},
    linksNote: "Client project — source is private.",
    screenshots: [{ alt: "Clinic billing dashboard", caption: "" }],
    modes: ["developer"],
  },
  {
    slug: "headless-cms-websites",
    title: "Headless CMS + Next.js Websites",
    tagline:
      "A reusable Fastify API + React CMS + Next.js stack behind several corporate and NGO websites.",
    category: "Web Application",
    status: "Production",
    featured: false,
    year: 2026,
    role: "Full-Stack Developer @ Compu-vision",
    technologies: [
      "Next.js",
      "TypeScript",
      "next-intl",
      "React Query",
      "Zustand",
      "NextAuth",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "Ant Design",
    ],
    overview:
      "Most of the company's content sites share one architecture: a Fastify API, a React admin CMS and a multilingual Next.js front end. I've built and maintained several of them — a technology company site with products and project maps, a scouts organisation site, and a car-brand site — from data model to pixel fixes.",
    problem:
      "Clients need to edit everything (pages, products, categories, banners) in Arabic and English without a developer, while the public site stays fast and SEO-friendly.",
    solution:
      "Content is modelled in the API and edited in the CMS; Next.js renders it with next-intl routing, React Query caching and Zustand for UI state. Feature flags in the CMS (e.g. turning a Donate button off) change the layout without a deploy.",
    architecture: [
      "Fastify API with Sequelize (MySQL/PostgreSQL), Joi validation, JWT and Redis",
      "React + Vite CMS with Ant Design, Chart.js and product / category management",
      "Next.js front end with next-intl (Arabic/English), React Query, Zustand and Swiper",
      "Image upload pipeline and per-device banner images",
    ],
    challenges: [
      {
        title: "RTL without a second codebase",
        detail:
          "Every layout had to work mirrored for Arabic; i18n routing and logical CSS properties kept one component tree.",
      },
    ],
    lessons: [
      "A shared stack across clients pays off only if the content model stays flexible.",
    ],
    links: {},
    linksNote: "Client projects — sources are private.",
    screenshots: [{ alt: "CMS-driven website", caption: "" }],
    modes: ["developer"],
  },
  {
    slug: "garage-erp-accounting",
    title: "Garage ERP & Accounting",
    tagline:
      "Job cards, supplier invoices, vouchers and exchange-rate-aware accounting for auto-repair businesses.",
    category: "Web Application",
    status: "Production",
    featured: false,
    year: 2026,
    role: "Full-Stack Developer @ Compu-vision",
    technologies: ["Laravel", "PHP", "Blade", "MySQL"],
    overview:
      "Laravel systems for auto-repair garages. I built the accounting side: job invoices, supplier invoices, receipts that settle several invoices at once, payment vouchers with remaining balances, official invoice numbering and exchange-rate handling.",
    problem:
      "Garages juggle customer jobs, parts bought from suppliers and payments in two currencies — and need official, sequentially numbered invoices for tax purposes.",
    solution:
      "Accounting modules on top of the existing job-card system, with server-side calculation of balances, official prefixes for numbered invoices, and exchange-rate snapshots on every voucher.",
    architecture: [
      "Laravel MVC with Blade views and MySQL",
      "Invoice, receipt, voucher and supplier models with balance reconciliation",
      "Exchange-rate snapshotting per transaction",
    ],
    challenges: [
      {
        title: "One receipt, many invoices",
        detail:
          "A customer payment can settle several invoices partially; the allocation logic had to keep every remaining balance exact.",
      },
    ],
    lessons: ["Accounting code is mostly edge cases — write them down before writing code."],
    links: {},
    linksNote: "Client project — source is private.",
    screenshots: [{ alt: "Garage accounting", caption: "" }],
    modes: ["developer"],
  },
  {
    slug: "laravel-bagisto-store",
    title: "Laravel E-Commerce Store (Bagisto)",
    tagline:
      "Elasticsearch-backed catalogue, redesigned cart and checkout, promotions and delivery rules.",
    category: "E-Commerce",
    status: "Production",
    featured: false,
    year: 2026,
    role: "Full-Stack Developer @ Compu-vision",
    technologies: ["Laravel", "Bagisto", "Elasticsearch", "MySQL", "Vite", "Spatie"],
    overview:
      "A hardware/tools e-commerce store on Bagisto (Laravel). Over 30 commits I worked on the storefront and admin: catalogue filters, cart quantity rules, checkout and cart redesign, promotion history, delivery-charge display and performance.",
    problem:
      "A large catalogue needed fast filtering and a checkout that customers actually finish.",
    solution:
      "Elasticsearch-powered filtering, response caching and sitemap generation (Spatie packages), and a redesigned cart and checkout aligned to the client's 1920×1080 designs.",
    architecture: [
      "Bagisto (Laravel) with the REST API package",
      "Elasticsearch for catalogue search and filters",
      "Spatie response cache, sitemap and newsletter integrations",
    ],
    challenges: [
      {
        title: "Customising a framework without forking it",
        detail:
          "Changes were made through Bagisto's package system so the store can still take upstream updates.",
      },
    ],
    lessons: ["Performance work starts with measuring the slow query, not with caching everything."],
    links: {},
    linksNote: "Client project — source is private.",
    screenshots: [{ alt: "E-commerce storefront", caption: "" }],
    modes: ["developer"],
  },
  {
    slug: "network-sniffer",
    title: "Basic Network Sniffer",
    tagline: "A Python + Scapy packet sniffer with a Tkinter GUI for inspecting live IP/TCP traffic.",
    category: "Security",
    status: "Delivered",
    featured: false,
    year: 2024,
    role: "Author",
    technologies: ["Python", "Scapy", "Tkinter", "Threading"],
    overview:
      "A small learning tool that captures packets on the local interface and shows source, destination, ports and payload in a desktop window.",
    problem:
      "Understanding what actually crosses the wire is the base of network security — and Wireshark hides the mechanics.",
    solution:
      "Scapy's sniff() runs on a background thread, filters IP/TCP packets, decodes the payload and streams results into a Tkinter interface without freezing it.",
    architecture: [
      "Scapy capture loop on a worker thread",
      "IP/TCP layer parsing and payload decoding",
      "Tkinter GUI with start/stop controls",
    ],
    challenges: [
      {
        title: "Keeping the GUI responsive",
        detail: "Capture runs off the UI thread and pushes results back safely.",
      },
    ],
    lessons: ["Building a tool teaches the protocol better than using one."],
    links: { github: "https://github.com/Abdallah-hijazi/Basic-Network-Sniffer" },
    screenshots: [{ alt: "Network sniffer GUI", caption: "" }],
    modes: ["security"],
  },
  {
    slug: "security-assessments",
    title: "Bug Bounty & Vulnerability Research",
    tagline:
      "HackerOne research on authorized programs — a High-severity DoD DIB-VDP finding resolved, 4 badges.",
    category: "Security",
    status: "Ongoing",
    featured: true,
    year: 2026,
    role: "Independent Security Researcher",
    technologies: ["Burp Suite", "OWASP Top 10", "Python", "Node.js", "nuclei", "Semgrep", "CVSS v3.1"],
    overview:
      "Policy-bound security research on HackerOne (DoD DIB-VDP, HPE VDP, CoinMate) and freelance web assessments. My report to the U.S. DoD Cyber Crime Center's Defense Industrial Base VDP was triaged High and resolved in November 2026, earning four HackerOne badges.",
    problem:
      "Large scopes (one program had 1,090 in-scope assets) and strict rules of engagement: the work is finding the one real issue without generating noise, breaking anything, or reporting false positives.",
    solution:
      "A written methodology: extract scope and rules first, map the attack surface from passive OSINT, form one hypothesis at a time, prove it with the minimum number of requests, use controls to rule out benign explanations, and write the report with CVSS, CWE, reproduction steps and remediation.",
    architecture: [
      "Scope parsing and passive subdomain enumeration (crt.sh, CertSpotter, Wayback, urlscan)",
      "Live-host fingerprinting, then targeted bug-class sweeps instead of blind scanning",
      "Two-account (A vs B) authorization matrices for IDOR / BOLA testing",
      "Hypothesis log with evidence, false-positive analysis and remediation per finding",
    ],
    challenges: [
      {
        title: "Proving impact without overreaching",
        detail:
          "Independent lines of evidence plus a non-vulnerable control system, using the minimum traffic needed — around 70 requests for the whole proof. Details stay private under the program's disclosure policy.",
      },
      {
        title: "Saying no to your own findings",
        detail:
          "Sixteen promising leads on one program were disproved and documented; one of my own submitted reports was retracted when testing showed the takeover wasn't possible.",
      },
    ],
    lessons: [
      "Building software makes you a better attacker; attacking makes you a better builder.",
      "Most real-world findings are broken access control, not exotic exploits.",
      "\"Unclaimed\" is not \"claimable\" — test the mechanism before asserting impact.",
    ],
    metrics: [
      { label: "DIB-VDP", value: "High · Resolved" },
      { label: "HackerOne badges", value: "4" },
      { label: "Black-box findings", value: "19 validated" },
    ],
    links: {
      websites: [
        { label: "HackerOne profile", url: "https://hackerone.com/abdallah-hijazi" },
      ],
    },
    screenshots: [
      {
        alt: "Security research workflow",
        caption: "",
      },
    ],
    modes: ["security"],
  },
  {
    slug: "portfolio-os",
    title: "Portfolio OS (This Site)",
    tagline:
      "A multi-identity portfolio that switches between four themed workspaces.",
    category: "Portfolio",
    status: "Production",
    featured: true,
    year: 2026,
    role: "Designer & Developer",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Fuse.js",
      "shadcn/ui",
    ],
    overview:
      "The site you are looking at: a statically exported Next.js application where navigation between professional identities feels like switching operating systems — including a simulated terminal, an analytics dashboard, and a global command palette.",
    problem:
      "One person, four professional identities — developer, security practitioner, data enthusiast, trainer — and a single-page template can't present any of them credibly.",
    solution:
      "An app-like portfolio with a mode system: each identity gets its own themed workspace with purpose-built UI (glassmorphism, terminal emulator, data dashboard, timeline), unified by a shared design system, global search, and keyboard-first navigation.",
    architecture: [
      "Next.js 15 App Router with output:export — fully static, GitHub Pages ready",
      "Mode context drives a CSS-variable theme system with per-mode accents",
      "Feature-sliced structure: features/terminal, features/search, features/modes",
      "Fuse.js search index built from typed data files at module load",
      "Framer Motion transitions gated behind prefers-reduced-motion",
    ],
    challenges: [
      {
        title: "OS-feel without OS-weight",
        detail:
          "Boot sequences, scanlines, and glitch transitions had to stay under strict performance budgets — everything is CSS/SVG driven with no heavy libraries.",
      },
      {
        title: "A terminal with no server",
        detail:
          "The security workspace terminal parses and executes commands entirely client-side against the same typed data that powers the rest of the site.",
      },
    ],
    lessons: [
      "A design-token mode system scales better than per-page theming.",
      "Static export forces healthy constraints: no runtime APIs, no excuses for slow pages.",
    ],
    metrics: [
      { label: "Backend required", value: "None" },
      { label: "Identities", value: "4 modes" },
    ],
    links: {
      github: "https://github.com/Abdallah-hijazi",
      // TODO(owner): point to the exact repo once pushed.
    },
    screenshots: [
      {
        alt: "Portfolio OS mode switching",
        caption: "Four workspaces, one design system.",
      },
    ],
    modes: ["developer", "security", "ai", "teaching"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const allTechnologies = [
  ...new Set(projects.flatMap((p) => p.technologies)),
].sort();

export const allCategories = [...new Set(projects.map((p) => p.category))];

export const allStatuses = [...new Set(projects.map((p) => p.status))];
