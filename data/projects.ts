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
      "REST APIs"
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
    slug: "security-assessments",
    title: "Web Application Security Assessments",
    tagline:
      "Independent penetration testing and bug bounty hunting — 15+ findings reported.",
    category: "Security",
    status: "Ongoing",
    featured: true,
    year: 2024,
    role: "Independent Security Researcher",
    technologies: ["Burp Suite", "OWASP Top 10", "Python", "TLS/SSL", "JWT"],
    overview:
      "Independent security work spanning freelance penetration tests and bug bounty hunting, focused on web application vulnerabilities aligned with the OWASP Top 10.",
    problem:
      "Production web applications routinely ship with authentication, authorization, and injection flaws that automated scanners miss and teams don't have time to hunt down.",
    solution:
      "Manual, methodology-driven assessments: mapping attack surface, testing auth and session handling, probing for injection and access-control issues with Burp Suite, and writing reproducible reports with clear remediation steps.",
    architecture: [
      "Recon and attack-surface mapping per engagement",
      "Manual testing guided by OWASP Top 10 categories",
      "Burp Suite tooling with custom Python scripts where needed",
      "Reproducible findings with severity ratings and remediation guidance",
    ],
    challenges: [
      {
        title: "Reporting that gets fixes shipped",
        detail:
          "A finding is only valuable if a developer can reproduce and fix it quickly — clear proof-of-concept steps and remediation advice matter as much as the discovery.",
      },
      {
        title: "Staying inside scope",
        detail:
          "Bug bounty and client engagements demand strict scope discipline; the methodology enforces testing boundaries at every step.",
      },
    ],
    lessons: [
      "Building software makes you a better attacker; attacking makes you a better builder.",
      "Most real-world findings are broken access control, not exotic exploits.",
    ],
    metrics: [
      { label: "Vulnerabilities reported", value: "15+" },
      { label: "Methodology", value: "OWASP Top 10" },
    ],
    links: {
    },
    screenshots: [
      {
        alt: "Security assessment workflow",
        caption: "TODO: add sanitized report excerpt or lab screenshot.",
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
