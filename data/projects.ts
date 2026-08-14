import type { Project } from "@/types/portfolio";

/**
 * Project catalogue.
 *
 * Each project is the single source of truth for both the home-page
 * `ProjectCard` and the `/projects/[slug]` case-study page.
 *
 * Projects are tagged with a `track`:
 *   - "software"  — full-stack / backend / web systems
 *   - "quant"     — quantitative finance
 *   - "game"      — game development (heritage)
 *
 * The home page groups them into two visual sections: Software & Quant
 * first (current direction), Game Development second (heritage).
 *
 * Only verified information from the provided CV / portfolio is
 * populated. Anything missing is marked `TODO:` so it can be filled
 * in later without inventing facts.
 */
export const projects: Project[] = [
  // ─────────────────────────── SOFTWARE / QUANT ───────────────────────────

  {
    slug: "book-it-quick",
    title: "Book-it-quick",
    shortDescription:
      "A full-stack personal online bookkeeping system built during a Software Production Internship.",
    overview:
      "Book-it-quick is a personal online bookkeeping system — track income, expenses, and budgets from a single responsive web app. Built as a production-oriented full-stack project during a software production internship, with a Spring Boot backend, a Vue frontend, and a MySQL data layer.",
    track: "software",
    category: "Full-Stack Engineering",
    year: "2026",
    role: "Full-stack developer (internship project)",
    tags: [
      "Spring Boot",
      "MyBatis",
      "Vue",
      "Element Plus",
      "Axios",
      "MySQL",
      "BCrypt",
      "Token Auth",
      "Apache ECharts",
    ],
    // TODO: Replace with the real repository URL.
    githubUrl: "https://github.com/Rytsia1",
    // TODO: Replace with the real live demo URL once deployed.
    liveUrl: undefined,
    featured: true,
    problem:
      "TODO: Describe the real motivation behind Book-it-quick (e.g. a need to track day-to-day finances without depending on third-party SaaS, or a production-internship brief).",
    solution:
      "TODO: Describe the high-level solution — a Vue single-page app talking to a Spring Boot REST API, persisting data in MySQL, with token-based authentication and BCrypt-hashed credentials.",
    architecture:
      "TODO: Document the architecture in your own words — frontend (Vue + Element Plus + Axios), backend (Spring Boot + MyBatis), database (MySQL), and the auth flow (token-based, BCrypt password hashing).",
    implementation:
      "TODO: List the notable implementation details — e.g. how the REST endpoints are organised, how MyBatis mappers are structured, how Apache ECharts is wired into the dashboard, how the auth token is issued and validated.",
    challenges:
      "TODO: Document the most interesting engineering challenges you ran into while building Book-it-quick.",
    results:
      "TODO: Summarise the outcome (qualitative — no fabricated metrics).",
    lessons:
      "TODO: Note the most valuable lessons from the internship project.",
    highlights: [
      "Full-stack: Spring Boot + MyBatis backend, Vue + Element Plus frontend.",
      "MySQL schema with MyBatis mappers and BCrypt-hashed credentials.",
      "Token-based authentication and a responsive dashboard UI.",
      "Apache ECharts for financial visualisation.",
      "TODO: Add 1–2 more real highlights once you have them.",
    ],
  },
  {
    slug: "options-pricing-engine",
    title: "Options Pricing Engine",
    shortDescription:
      "Numerical pricing of options using Black–Scholes, trees, and Monte Carlo simulation.",
    overview:
      "A pricing engine for European and American style options. Implements closed-form Black–Scholes, binomial / trinomial trees, and Monte Carlo with variance reduction, and validates results against analytical benchmarks.",
    track: "quant",
    category: "Quantitative Finance",
    year: "2026",
    role: "Solo project",
    tags: [
      "Python",
      "Black–Scholes",
      "Monte Carlo",
      "Numerical Methods",
      "Options Pricing",
    ],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the problem this project addresses (e.g. understanding and pricing options correctly without relying on a black-box library).",
    solution:
      "TODO: Describe the solution — e.g. a library of pricing models that share a common interface so they can be compared side by side.",
    architecture:
      "TODO: Describe the architecture — e.g. pricing models behind a common interface, payoff definitions as data, greeks computed via finite differences.",
    implementation:
      "TODO: List notable implementation details — e.g. antithetic variates for Monte Carlo, vectorised numpy loops, unit-tested against known closed-form values.",
    challenges:
      "TODO: Document the most interesting engineering challenges.",
    results:
      "TODO: Summarise the result qualitatively.",
    lessons:
      "TODO: Note the most valuable lessons learned.",
    highlights: [
      "Multiple pricing models behind a unified interface.",
      "Variance-reduced Monte Carlo for path-dependent payoffs.",
      "TODO: Add 1–2 more real highlights once available.",
    ],
  },
  {
    slug: "portfolio-optimizer",
    title: "Portfolio Optimizer",
    shortDescription:
      "A quantitative finance application implementing Modern Portfolio Theory.",
    overview:
      "An end-to-end portfolio construction tool that takes a universe of assets, computes expected returns and the covariance matrix, then runs mean-variance and risk-parity optimisations to produce efficient allocations — visualised as the efficient frontier with the maximum-Sharpe portfolio highlighted.",
    track: "quant",
    category: "Quantitative Finance",
    year: "2026",
    role: "Solo project",
    tags: [
      "Python",
      "NumPy",
      "SciPy",
      "Pandas",
      "Modern Portfolio Theory",
      "Efficient Frontier",
      "Sharpe Ratio",
    ],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the problem this project solves (e.g. helping users build diversified portfolios without a quant background).",
    solution:
      "TODO: Describe the high-level solution — e.g. an interface that ingests historical prices, computes risk/return statistics, and outputs an efficient frontier with the optimal weights highlighted.",
    architecture:
      "TODO: Describe the architecture — e.g. data ingestion → statistical estimation → optimisation solver → visualisation.",
    implementation:
      "TODO: List the notable implementation details — e.g. convex optimisation with cvxpy, Monte Carlo simulation for the efficient frontier, caching of historical data.",
    challenges:
      "TODO: Document the most interesting engineering challenges you ran into.",
    results:
      "TODO: Summarise the result (qualitative — no fabricated metrics).",
    lessons:
      "TODO: Note the most valuable lessons from building this project.",
    highlights: [
      "End-to-end pipeline from raw price data to optimal weights.",
      "Mean-variance and risk-parity optimisers in the same codebase.",
      "Efficient frontier visualisation with the maximum-Sharpe portfolio highlighted.",
      "TODO: Add a real highlight once available.",
    ],
  },

  // ─────────────────────────── GAME DEVELOPMENT ───────────────────────────

  {
    slug: "makan-siang-bergizi",
    title: "Makan Siang Bergizi",
    shortDescription:
      "A cooperative two-player online game about nutrition management — KMIPN 2025 finalist.",
    overview:
      "A cooperative online game where two players work together to manage nutrition in a school-lunch context. Built in Unity with multiplayer functionality. Selected as a KMIPN 2025 finalist.",
    track: "game",
    category: "Game Technology",
    year: "2025",
    role: "TODO: Replace with your actual role (e.g. gameplay programmer, designer)",
    achievement: "KMIPN 2025 Finalist",
    engine: "Unity",
    coreMechanics: ["Co-op Multiplayer", "Online Networking", "Nutrition Management"],
    tags: ["Unity", "C#", "Multiplayer", "Educational", "Co-op"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the design motivation (e.g. making nutrition education engaging through co-op gameplay).",
    solution:
      "TODO: Describe the high-level solution — two-player cooperative loop, nutrition management mechanics, and the multiplayer architecture.",
    architecture:
      "TODO: Describe the technical architecture (e.g. Unity Netcode for GameObjects, dedicated vs. listen server, client-side prediction).",
    implementation:
      "TODO: List notable implementation details — networking, gameplay systems, UI flow, art pipeline.",
    challenges:
      "TODO: Document the most interesting engineering / design challenges.",
    results:
      "Selected as a KMIPN 2025 finalist.",
    lessons:
      "TODO: Note the most valuable lessons from this project.",
    highlights: [
      "Cooperative two-player online gameplay in Unity.",
      "Nutrition management as a core gameplay loop.",
      "Multiplayer functionality with verified networking.",
      "Selected as a KMIPN 2025 finalist.",
    ],
  },
  {
    slug: "wacky-whackers",
    title: "Wacky Whackers",
    shortDescription:
      "A first-person exploration game with turn-based combat — Top 60 at Gameseed 2025.",
    overview:
      "A first-person exploration game with turn-based combat, built in Unity. Reached the Top 60 at Gameseed 2025.",
    track: "game",
    category: "Game Technology",
    year: "2025",
    role: "TODO: Replace with your actual role",
    achievement: "Gameseed 2025 — Top 60",
    engine: "Unity",
    coreMechanics: ["First-Person Exploration", "Turn-Based Combat"],
    tags: ["Unity", "C#", "First-Person", "Turn-Based Combat", "Exploration"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the design motivation behind Wacky Whackers.",
    solution:
      "TODO: Describe the high-level solution — first-person exploration, turn-based combat, and the systems that tie them together.",
    architecture:
      "TODO: Describe the technical architecture.",
    implementation:
      "TODO: List notable implementation details.",
    challenges:
      "TODO: Document the most interesting engineering / design challenges.",
    results:
      "Reached the Top 60 at Gameseed 2025.",
    lessons:
      "TODO: Note the most valuable lessons from this project.",
    highlights: [
      "First-person exploration built in Unity.",
      "Turn-based combat system.",
      "Reached the Top 60 at Gameseed 2025.",
    ],
  },
  {
    slug: "project-moon-sky",
    title: "Project Moon Sky",
    shortDescription:
      "TODO: Replace with a one-sentence summary of Project Moon Sky.",
    overview:
      "TODO: Replace with a paragraph overview of the project — what it is, what engine / stack it uses, and what role you played.",
    track: "game",
    category: "Game Technology",
    year: "TODO: Year",
    role: "TODO: Replace with your actual role",
    tags: ["TODO: Replace with real tags"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem: "TODO: Describe the problem this project addresses.",
    solution: "TODO: Describe the high-level solution.",
    architecture: "TODO: Describe the architecture.",
    implementation: "TODO: List notable implementation details.",
    challenges: "TODO: Document the most interesting engineering challenges.",
    results: "TODO: Summarise the result qualitatively.",
    lessons: "TODO: Note the most valuable lessons learned.",
    highlights: ["TODO: Add 2–3 real highlights once available."],
  },
  {
    slug: "dungeon-of-arcanacious",
    title: "Dungeon of Arcanacious",
    shortDescription:
      "A dungeon-crawling RPG with procedurally generated levels, built in Godot.",
    overview:
      "A dungeon-crawling RPG with RPG systems and procedurally generated levels, built in Godot.",
    track: "game",
    category: "Game Technology",
    year: "TODO: Year",
    role: "TODO: Replace with your actual role",
    engine: "Godot 4",
    assetsTools: ["3ds Max 2018"],
    coreMechanics: ["Procedural Generation", "RPG Systems", "Dungeon Crawling"],
    tags: ["Godot", "GDScript", "Procedural Generation", "RPG", "Dungeon Crawler"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the design motivation behind the procedural dungeons.",
    solution:
      "TODO: Describe the high-level solution — dungeon generation algorithm, RPG systems, progression.",
    architecture:
      "TODO: Describe the technical architecture (GDScript modules, scene tree, data-driven encounters).",
    implementation:
      "TODO: List notable implementation details (e.g. the procedural generation algorithm, save / load, combat math).",
    challenges:
      "TODO: Document the most interesting engineering / design challenges.",
    results: "TODO: Summarise the result qualitatively.",
    lessons: "TODO: Note the most valuable lessons learned.",
    highlights: [
      "Procedurally generated levels in Godot.",
      "Dungeon-crawling RPG systems.",
    ],
  },
  {
    slug: "save-planet",
    title: "Save Planet",
    shortDescription:
      "A cozy adventure game with a robot protagonist focused on narrative and world-building.",
    overview:
      "A cozy adventure game with a robot protagonist, focused on narrative and world-building. Built in Unity. Ongoing project.",
    track: "game",
    category: "Game Technology",
    year: "TODO: Year",
    role: "TODO: Replace with your actual role",
    engine: "Unity",
    coreMechanics: ["Narrative Design", "World-Building"],
    tags: ["Unity", "C#", "Adventure", "Narrative", "World-Building"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the design motivation behind Save Planet.",
    solution:
      "TODO: Describe the high-level solution — narrative structure, robot-protagonist interaction model, world-building systems.",
    architecture: "TODO: Describe the technical architecture.",
    implementation: "TODO: List notable implementation details.",
    challenges: "TODO: Document the most interesting engineering challenges.",
    results: "TODO: Summarise the result (ongoing).",
    lessons: "TODO: Note the most valuable lessons learned so far.",
    highlights: [
      "Cozy adventure tone with a robot protagonist.",
      "Narrative / world-building focus.",
      "Ongoing development in Unity.",
    ],
  },
  {
    slug: "projek-pusmendik",
    title: "Projek Pusmendik",
    shortDescription:
      "TODO: Replace with a one-sentence summary of Projek Pusmendik.",
    overview:
      "TODO: Replace with a paragraph overview of the project.",
    track: "game",
    category: "Game Technology",
    year: "TODO: Year",
    role: "TODO: Replace with your actual role",
    tags: ["TODO: Replace with real tags"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem: "TODO: Describe the problem this project addresses.",
    solution: "TODO: Describe the high-level solution.",
    architecture: "TODO: Describe the architecture.",
    implementation: "TODO: List notable implementation details.",
    challenges: "TODO: Document the most interesting engineering challenges.",
    results: "TODO: Summarise the result qualitatively.",
    lessons: "TODO: Note the most valuable lessons learned.",
    highlights: ["TODO: Add 2–3 real highlights once available."],
  },
  {
    slug: "project-cog",
    title: "Project COG",
    shortDescription:
      "TODO: Replace with a one-sentence summary of Project COG (include only if relevant).",
    overview:
      "TODO: Replace with a paragraph overview of the project.",
    track: "game",
    category: "Game Technology",
    year: "TODO: Year",
    role: "TODO: Replace with your actual role",
    tags: ["TODO: Replace with real tags"],
    githubUrl: "https://github.com/Rytsia1",
    featured: false,
    problem: "TODO: Describe the problem this project addresses.",
    solution: "TODO: Describe the high-level solution.",
    architecture: "TODO: Describe the architecture.",
    implementation: "TODO: List notable implementation details.",
    challenges: "TODO: Document the most interesting engineering challenges.",
    results: "TODO: Summarise the result qualitatively.",
    lessons: "TODO: Note the most valuable lessons learned.",
    highlights: ["TODO: Add 2–3 real highlights once available."],
  },
];

/** Featured projects in the "software / quant" track — shown at the top. */
export function getSoftwareAndQuantProjects(): Project[] {
  return projects.filter(
    (p) => p.featured && (p.track === "software" || p.track === "quant"),
  );
}

/** Featured projects in the "game" track — shown in the second section. */
export function getGameProjects(): Project[] {
  return projects.filter((p) => p.featured && p.track === "game");
}

/** Look up a project by its slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** All slugs, used by `generateStaticParams`. */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
