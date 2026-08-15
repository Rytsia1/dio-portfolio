import type { GameProject, ProjectItem, WebProject } from "@/types/portfolio";

/**
 * Project catalogue.
 *
 * Each project is the single source of truth for both the home-page
 * `ProjectCard` / `GameProjectCard` and the `/projects/[slug]`
 * case-study page.
 *
 * Projects are strictly typed as a discriminated union (`ProjectItem`):
 *   - type: "web"   — `WebProject`: full-stack / quant / software systems.
 *                     Game-only fields (engine, coreMechanics, …) are
 *                     typed `never`, so they can't be set by accident.
 *   - type: "game"  — `GameProject`: requires `engine` and
 *                     `coreMechanics` (optionally `assetsTools`), which
 *                     `GameProjectCard` renders as a "Tech Stack" panel.
 *
 * The `type` literal is the discriminator — narrow with a switch or
 * if-statement on `project.type` to render type-specific UI safely.
 *
 * The home page groups projects into two visual sections: web projects
 * (Software & Quant) first, game projects second.
 *
 * Only verified information from the provided CV / portfolio is
 * populated. Anything missing is marked `TODO:` so it can be filled
 * in later without inventing facts.
 */
export const projects: ProjectItem[] = [

  // ─────────────────────────── WEB / SOFTWARE ─────────────────────────────

  {
    type: "web",
    slug: "book-it-quick",
    title: "Book-it-Quick",
    shortDescription:
      "A full-stack personal online bookkeeping system built during a Software Production Internship.",
    overview:
      "Book-it-Quick is a personal online bookkeeping system — track income, expenses, and budgets from a single responsive web app. Built as a production-oriented full-stack web development project during a software production internship, with a Spring Boot backend, a Vue frontend, and a MySQL data layer.",
    category: "Full-Stack Engineering",
    year: "2026",
    role: "Full-stack developer (internship project)",
    tags: [
      "Full-Stack Web Development",
      "Spring Boot",
      "Vue",
      "Element Plus",
      "MySQL",
      "Token Auth",
      "Apache ECharts",
    ],
    // TODO: Replace with the real repository URL.
    githubUrl: "https://github.com/Rytsia1",
    // TODO: Replace with the real live demo URL once deployed.
    liveUrl: undefined,
    featured: true,
    problem:
      "TODO: Describe the real motivation behind Book-it-Quick (e.g. a need to track day-to-day finances without depending on third-party SaaS, or a production-internship brief).",
    solution:
      "TODO: Describe the high-level solution — a Vue single-page app talking to a Spring Boot REST API, persisting data in MySQL, with token-based authentication and BCrypt-hashed credentials.",
    architecture:
      "TODO: Document the architecture in your own words — frontend (Vue + Element Plus + Axios), backend (Spring Boot + MyBatis), database (MySQL), and the auth flow (token-based, BCrypt password hashing).",
    implementation:
      "TODO: List the notable implementation details — e.g. how the REST endpoints are organised, how MyBatis mappers are structured, how Apache ECharts is wired into the dashboard, how the auth token is issued and validated.",
    challenges:
      "TODO: Document the most interesting engineering challenges you ran into while building Book-it-Quick.",
    results:
      "TODO: Summarise the outcome (qualitative — no fabricated metrics).",
    lessons:
      "TODO: Note the most valuable lessons from the internship project.",
    highlights: [
      "Full-stack: Spring Boot + MyBatis backend, Vue + Element Plus frontend.",
      "MySQL schema with MyBatis mappers and BCrypt-hashed credentials.",
      "Token-based authentication and a responsive dashboard UI.",
      "Apache ECharts for financial visualisation.",
    ],
  },
  {
    type: "web",
    slug: "portfolio-optimizer",
    title: "Stock Portofolio Optimizer",
    shortDescription:
      "A stock portfolio optimisation app built with Python and Streamlit, implementing Modern Portfolio Theory.",
    overview:
      "An end-to-end stock portfolio construction tool with an interactive Streamlit interface. It takes a universe of assets, computes expected returns and the covariance matrix, then runs mean-variance optimisation to produce efficient allocations — visualised as the efficient frontier with the maximum-Sharpe portfolio highlighted.",
    category: "Quantitative Finance",
    year: "2026",
    role: "Solo project",
    tags: [
      "Python",
      "Streamlit",
      "Modern Portfolio Theory",
      "Efficient Frontier",
      "Pandas",
    ],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the problem this project solves (e.g. helping users build diversified stock portfolios without a quant background).",
    solution:
      "TODO: Describe the high-level solution — a Streamlit interface that ingests historical prices, computes risk/return statistics, and outputs an efficient frontier with the optimal weights highlighted.",
    architecture:
      "TODO: Describe the architecture — e.g. data ingestion → statistical estimation → optimisation solver → Streamlit visualisation layer.",
    implementation:
      "TODO: List the notable implementation details — e.g. convex optimisation, Monte Carlo simulation for the efficient frontier, caching of historical data in Streamlit.",
    challenges:
      "TODO: Document the most interesting engineering challenges you ran into.",
    results:
      "TODO: Summarise the result (qualitative — no fabricated metrics).",
    lessons:
      "TODO: Note the most valuable lessons from building this project.",
    highlights: [
      "Interactive Streamlit dashboard for portfolio construction.",
      "End-to-end pipeline from raw price data to optimal weights.",
      "Efficient frontier visualisation with the maximum-Sharpe portfolio highlighted.",
    ],
  },

  // ─────────────────────────── GAME DEVELOPMENT ───────────────────────────

  {
    type: "game",
    slug: "wacky-whackers",
    title: "Wacky Whackers: The Ultimate Stick Battle",
    tagline: "Find your stick, Fight with stick",
    shortDescription:
      "A quirky exploration and turn-based stick-battling game — Top 60 national placement at Gameseed 2025, playable on Itch.io.",
    overview:
      "A quirky exploration and turn-based battle game where players roam a village to discover, appraise, and duel with unique wooden sticks in a quest to become the Ultimate Whacker. Built for Gameseed 2025 under the theme 'Real Life Experience', achieving Top 60 national placement.",
    category: "Game Technology",
    year: "2025",
    role: "Game Designer & Gameplay Programmer",
    achievement: "Gameseed 2025 — Top 60",
    engine: "Unity",
    coreMechanics: [
      "First-Person Exploration",
      "Stick Appraisal",
      "Turn-Based Combat",
    ],
    tags: [
      "Unity",
      "C#",
      "First-Person",
      "Turn-Based Combat",
      "Exploration",
      "Game Jam",
    ],
    liveUrl:
      "https://zenomaru.itch.io/142-kanvas-kosong-student-whacky-whackers-the-ultimate-stick-battle",
    coverImage: "/projects/wacky-whackers/cover.png",
    gallery: [
      {
        src: "/projects/wacky-whackers/screen4.png",
        alt: "Exploration",
        caption: "First-person village roaming and stick hunting.",
      },
      {
        src: "/projects/wacky-whackers/screen5.png",
        alt: "Appraisal",
        caption: "The eccentric NPC appraiser rating stick rarity, stats, and naming lore.",
      },
      {
        src: "/projects/wacky-whackers/screen1.png",
        alt: "Combat",
        caption: "Side-view combat duel arena with strategic options (Attack, Skill, Defense, Dodge).",
      }
    ],
    featured: true,
    problem:
      "Childhood nostalgia often involves turning everyday objects into legendary artifacts—specifically, picking up tree sticks and pretending they are mythical swords. The design challenge was capturing this universal childhood fantasy into an engaging game loop that bridges exploration with tactical combat without losing its comedic charm.",
    solution:
      "• First-Person Exploration: An immersive village roaming mode where players hunt for procedurally scattered or hidden sticks across riverbanks, bushes, and trails.\n• Appraisal System: An eccentric NPC appraiser who rates stick rarity, stats, absurd naming lore, and combat potential.\n• Turn-Based Duel Arena: Side-view combat transitions with strategic options (Attack, Skill, Defense, Dodge) where victory depends on matching stick attributes against rival wielders.",
    architecture:
      "• Camera & Viewport Controller: Seamless switching between first-person navigation and fixed 2.5D side-view framing during combat encounters.\n• Inventory & Stick Data Structure: ScriptableObject-driven architecture storing stick parameters (rarity, stats, flavor lore, and 3D visual anchors).\n• Turn-Based Battle State Machine: Modular combat loop managing turn order, action resolution (Attack/Defense/Skill/Dodge), animation triggers, and damage calculation.",
    implementation:
      "• Gameplay Loop: Integrated dynamic interaction triggers (E to inspect/pickup, G to drop, I to inspect stats) with responsive UI HUD overlays.\n• Combat Timing & Mechanics: Risk-reward defense and dodge mechanics to reward calculated tactical decisions over simple button mashing.\n• Art & Asset Pipeline: Stylized environment coupled with 3D stick variations and expressive retro-inspired visual effects.",
    challenges:
      "• State Transition Consistency: Handling smooth camera, UI, and input switching when transitioning from freeform 3D first-person exploration into grid-locked side-view turn-based battles.\n• Balancing Humor vs Depth: Designing combat modifiers that make absurd sticks mechanically distinctive rather than just purely aesthetic.",
    results:
      "Top 60 National Placement at Gameseed 2025. Published and fully playable on Itch.io.",
    lessons:
      "Grounding game concepts in relatable childhood memories creates instant player empathy. Decoupling item statistics from visual meshes via modular data structures vastly speeds up prototyping and item balancing.",
    highlights: [
      "First-person village exploration with procedurally scattered stick hunting.",
      "Eccentric NPC appraisal system rating stick rarity, stats, and naming lore.",
      "Turn-based duel arena with Attack / Skill / Defense / Dodge actions.",
      "Top 60 National Placement at Gameseed 2025.",
      "Published and fully playable on Itch.io.",
    ],
  },
  {
    type: "game",
    slug: "makan-siang-bergizi",
    title: "Makan Siang Bergizi",
    tagline: "Asymmetric Co-op Nutrition Management & School Lunch Simulation",
    shortDescription:
      "A two-player cooperative online simulation game about cooking and nutrition management — KMIPN 2025 finalist.",
    overview:
      "A two-player cooperative online simulation game where players assume distinct roles—a cafeteria chef and a nutritionist—collaborating in real-time to prepare balanced, nutritious meals for school children with varying dietary needs across Indonesia. Selected as a National Finalist at KMIPN 2025.",
    category: "Game Development",
    year: "2025",
    role: "Game Designer & Multiplayer Programmer",
    achievement: "KMIPN 2025 Finalist",
    engine: "Unity",
    coreMechanics: [
      "Online Cooperative Play",
      "Cooking & Nutrition Management",
      "Asymmetric Gameplay",
    ],
    tags: ["Unity", "C#", "Online Co-op", "Asymmetric Gameplay", "Simulation", "KMIPN 2025 Finalist"],
    liveUrl: "https://zenomaru.itch.io/makansiangbergizi",
    coverImage: "/projects/makan-siang-bergizi/cover.png",
    gallery: [
      {
        src: "/projects/makan-siang-bergizi/screen1.png",
        alt: "Nutritionist Dashboard & Student Profile",
        caption: "Nutritionist HUD analyzing dietary targets and student traits.",
      },
      {
        src: "/projects/makan-siang-bergizi/screen2.png",
        alt: "Cafeteria Kitchen Stations",
        caption: "Chef cooking stations and real-time food preparation.",
      },
      {
        src: "/projects/makan-siang-bergizi/screen3.png",
        alt: "Asymmetric Role Selection",
        caption: "Players must choose between the Chef and Nutritionist (Ahli Gizi) roles before starting.",
      },
    ],
    featured: true,
    problem:
      "Educational games about health and dietary balance often struggle with player engagement due to passive quiz formats. The design challenge was turning complex nutritional guidelines into a fun, fast-paced asymmetric cooperative experience that demands active verbal communication and teamwork.",
    solution:
      "• Asymmetric Cooperative Roles: One player manages the nutritional balance and patient data, while the other executes the physical cooking and meal assembly.\n• Dynamic Student Demographics: Procedural customer generation reflecting diverse dietary restrictions, allergies, and caloric requirements across Indonesian schools.\n• Point-and-Click Time Management: Intuitive interaction mechanics designed for cooperative synchronization under tight time constraints.",
    architecture:
      "• Multiplayer Synchronization Layer: Online room matchmaking and client synchronization for kitchen stations, ingredient states, and order progress.\n• Asymmetric Role-Specific UI: Independent UI viewports tailored for each role's distinct workflow.\n• Nutritional Scoring Engine: Real-time calculation formula comparing dish composition against target nutrient quotas.",
    implementation:
      "• Networked State Management: Deterministic station timers, ingredient transformations, and order submission verification.\n• Data-Driven Recipe Architecture: ScriptableObject database containing nutritional values, recipe combos, and student demographic data.\n• Feedback & Alerts: Dynamic warning systems for overcooked items and order deadlines.",
    challenges:
      "• Synchronizing fast-paced cooking interactions and ingredient transfers reliably across network clients.\n• Balancing the nutritionist role to ensure analytical gameplay felt just as urgent and fun as the physical cooking role.",
    results:
      "National Finalist at KMIPN 2025. Published and playable on Itch.io.",
    lessons:
      "• Asymmetric information distribution naturally drives organic verbal communication and player engagement.\n• Decoupling server-authoritative logic from immediate client-side UI feedback is essential for smooth multiplayer responsiveness.",
    highlights: [
      "Asymmetric Co-op Gameplay between Chef and Nutritionist.",
      "Real-time Multiplayer Synchronization via Proton.",
      "Dynamic procedural student generation based on Indonesian demographics.",
      "National Finalist at KMIPN 2025.",
    ],
  },
  {
    type: "game",
    slug: "project-moon-sky",
    title: "Project : Moon Sky",
    shortDescription:
      "A 2.5D vertical side-scrolling game with touch controls, built in Unity.",
    overview:
      "Project : Moon Sky is a 2.5D vertical side-scrolling game built in Unity, designed around touch controls for mobile play.",
    category: "Game Technology",
    year: "TODO: Year",
    role: "TODO: Replace with your actual role",
    engine: "Unity",
    coreMechanics: ["2.5D Vertical Side-Scrolling", "Touch Controls"],
    tags: ["Unity", "C#", "2.5D", "Side-Scroller", "Mobile", "Touch Controls"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem: "TODO: Describe the design motivation behind Project : Moon Sky.",
    solution:
      "TODO: Describe the high-level solution — the 2.5D vertical side-scrolling structure and the touch-control scheme.",
    architecture: "TODO: Describe the technical architecture.",
    implementation: "TODO: List notable implementation details.",
    challenges: "TODO: Document the most interesting engineering challenges.",
    results: "TODO: Summarise the result qualitatively.",
    lessons: "TODO: Note the most valuable lessons learned.",
    highlights: [
      "2.5D vertical side-scrolling built in Unity.",
      "Touch-first controls designed for mobile play.",
    ],
  },
  {
    type: "game",
    slug: "save-planet",
    title: "Project: Save Planet",
    shortDescription:
      "A cozy exploration game with a robot protagonist, built on a narrative framework in Unity.",
    overview:
      "Project: Save Planet is a cozy exploration game with a robot protagonist, built in Unity on a narrative framework focused on story and world-building. Ongoing project.",
    category: "Game Technology",
    year: "TODO: Year",
    role: "TODO: Replace with your actual role",
    engine: "Unity",
    coreMechanics: ["Narrative Framework", "Cozy Exploration"],
    tags: ["Unity", "C#", "Adventure", "Narrative", "Exploration"],
    githubUrl: "https://github.com/Rytsia1",
    featured: true,
    problem:
      "TODO: Describe the design motivation behind Project: Save Planet.",
    solution:
      "TODO: Describe the high-level solution — the narrative framework, robot-protagonist interaction model, and cozy exploration loop.",
    architecture: "TODO: Describe the technical architecture.",
    implementation: "TODO: List notable implementation details.",
    challenges: "TODO: Document the most interesting engineering challenges.",
    results: "TODO: Summarise the result (ongoing).",
    lessons: "TODO: Note the most valuable lessons learned so far.",
    highlights: [
      "Cozy exploration tone with a robot protagonist.",
      "Narrative framework driving story and world-building.",
      "Ongoing development in Unity.",
    ],
  },
];

/**
 * Featured web projects (software / quant) — shown at the top.
 * The type predicate narrows the union, so callers receive
 * `WebProject[]` and can pass items straight to `ProjectCard`.
 */
export function getSoftwareAndQuantProjects(): WebProject[] {
  return projects.filter(
    (p): p is WebProject => p.type === "web" && p.featured,
  );
}

/**
 * Featured game projects — shown in the second section.
 * The type predicate narrows the union to `GameProject[]`, so items
 * can be passed straight to `GameProjectCard` with full type safety.
 */
export function getGameProjects(): GameProject[] {
  return projects.filter(
    (p): p is GameProject => p.type === "game" && p.featured,
  );
}

/** Look up a project by its slug. */
export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}

/** All slugs, used by `generateStaticParams`. */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}