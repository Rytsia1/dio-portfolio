import type { GameProject, ProjectCategory, ProjectItem, WebProject } from "@/types/portfolio";

/**
 * Project catalogue.
 *
 * Each project is the single source of truth for both the home-page
 * `ProjectCard` and the `/projects/[slug]`
 * case-study page.
 *
 * Projects are strictly typed as a discriminated union (`ProjectItem`):
 *   - type: "web"   — `WebProject`: full-stack / quant / software systems.
 *                     Game-only fields (engine, coreMechanics, …) are
 *                     typed `never`, so they can't be set by accident.
 *   - type: "game"  — `GameProject`: requires `engine` and
 *                     `coreMechanics` (optionally `assetsTools`), which
 *                     `ProjectCard` renders as a "Tech Stack" panel.
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
    slug: "actura",
    title: "Actura",
    tagline: "Quantitative Risk & Valuation Platform",
    shortDescription: "Quantitative risk and valuation platform for deterministic and stochastic financial projections — combining a DAG-based cash flow engine with Monte Carlo simulation and risk analytics.",
    overview: "Actura is a quantitative risk and valuation platform that combines financial modeling, stochastic simulation, and risk analytics in a production-oriented architecture. It evaluates insurance and financial cash flows as a Directed Acyclic Graph (DAG), supports both deterministic and Monte Carlo stochastic projections, and computes risk metrics including BEL, VaR 95%, and CVaR / CTE 95. The frontend is a Vue 3 SPA paired with a FastAPI backend, containerized with Docker.",
    category: "Quantitative Finance",
    year: "2026",
    role: "Full-Stack Engineer",
    team: "Solo Project",
    tags: ["Python", "Vue 3", "FastAPI", "Docker", "PostgreSQL", "Monte Carlo", "Risk Analytics"],
    techStack: ["Python", "FastAPI", "Vue 3", "PostgreSQL", "NumPy", "SciPy"],
    githubUrl: "https://github.com/Rytsia1/Actura",
    coverImage: "/projects/actura/cover.png",
    gallery: [
      { src: "/projects/actura/cover.png", alt: "Valuation Dashboard", caption: "Real-time stochastic projection, tail risk (CVaR) analysis, and comprehensive reserve profiles." },
      { src: "/projects/actura/screen1.png", alt: "Contract Logic Blueprint Builder", caption: "A visual, node-based DAG (Directed Acyclic Graph) editor for designing insurance cash flow blueprints without writing code." },
      { src: "/projects/actura/screen2.png", alt: "Real-Time Stress Testing", caption: "Interactive stress testing module allowing real-time adjustment of risk factors like interest rates, mortality multipliers, and lapse shocks." }
    ],
    featured: true,
    problem: "Actuarial and financial risk software often lacks modern interfaces and interactive explorability. The challenge was building a platform that could evaluate complex cash flow structures — including mortality decrements, premium schedules, and benefit payments — through an intuitive visual editor while maintaining the mathematical correctness required for risk analytics.",
    solution: "Visual Logic Builder with drag-and-drop DAG editor for designing cash flow blueprints without hand-coding formulas. Each node represents a cash flow component; edges represent dependencies and sequencing. The engine evaluates the DAG deterministically for best-estimate projections, and stochastically via Monte Carlo for risk distribution analysis.",
    architecture: "Decoupled architecture: Vue 3 SPA for graph interactions and charting, backed by a FastAPI REST API for the valuation engine. PostgreSQL via SQLAlchemy for data persistence. Nginx as a reverse proxy. All services containerized with Docker Compose for consistent local and production deployment.",
    implementation: "Cash flow evaluation as a topologically sorted DAG — nodes are typed (premium, benefit, decrement) and evaluated in dependency order. Monte Carlo paths are generated with configurable scenario parameters (interest rate paths, mortality shocks). Risk metrics are computed across the full distribution of projected outcomes.",
    quantMethodology: "Valuation Engine: Cash flows modelled as a DAG, evaluated deterministically for Best Estimate Liability (BEL) and stochastically via Monte Carlo simulation.\n\nStochastic Simulation: N-path Monte Carlo projection using configurable interest rate and decrement scenarios. Each path produces a full cash flow projection; risk metrics are computed across the distribution.\n\nRisk Metrics: VaR 95% (the 95th percentile of projected losses) and CVaR / CTE 95 (Conditional Tail Expectation — the expected loss given that losses exceed the VaR threshold). These metrics provide both point-in-time and tail-risk characterization of projected liabilities.",
    challenges: "Building a high-performance valuation backend capable of evaluating complex DAG structures rapidly while maintaining a responsive visual node editor on the frontend. Ensuring consistent numerical results between the deterministic and stochastic evaluation paths.",
    results: "Fully containerized architecture with reproducible Docker Compose deployment. DAG editor supports complex multi-product cash flow structures. Monte Carlo engine generates stochastic projections and computes BEL, VaR 95%, and CVaR in real time.",
    lessons: "Visual, node-based editors provide a highly intuitive interface for mapping complex financial and insurance logic. Separating the DAG data model from its evaluation engine makes the system far easier to test and extend.",
    highlights: [
      "DAG-based cash flow engine supporting complex multi-product financial structures.",
      "Monte Carlo stochastic projection for full distributional risk analysis.",
      "Risk analytics: BEL, VaR 95%, and CVaR / CTE 95 across simulated paths.",
      "FastAPI backend with Nginx reverse proxy — containerized with Docker Compose.",
    ],
  },

  {
    type: "web",
    slug: "book-it-quick",
    title: "Book-it-quick",
    tagline: "Full-Stack Financial Management System with High-Precision Ledger",
    shortDescription: "Full-stack personal bookkeeping and financial analytics platform, built from scratch during a 10-day software production internship at Shandong University of Science and Technology.",
    overview: "A full-stack, enterprise-grade personal bookkeeping and financial analytics platform developed during an intensive 10-day Software Production Internship at Shandong University of Science and Technology. Engineered from the ground up to eliminate floating-point arithmetic drift, the system integrates high-precision monetary ledgers, automated recurring billing, real-time analytics dashboards, and robust stateless authentication.",
    category: "Full-Stack & AI Systems",
    year: "2026",
    role: "Full-Stack Software Engineer Intern",
    team: "Internship Project (Shandong University of Science and Technology)",
    tags: ["Spring Boot", "Java 25", "Vue 3", "MyBatis", "MySQL", "Vite", "Element Plus", "ECharts", "JWT & Spring Security", "Pinia", "i18n"],
    techStack: ["Java", "Spring Boot", "Vue 3", "MySQL", "MyBatis", "JWT"],
    githubUrl: "https://github.com/Rytsia1/Book-it-quick",
    coverImage: "/projects/book-it-quick/cover.png",
    gallery: [
      { src: "/projects/book-it-quick/screen1.png", alt: "Financial Dashboard & ECharts Trends", caption: "Interactive financial dashboard displaying real-time balance KPIs and cash-flow charts." },
      { src: "/projects/book-it-quick/screen2.png", alt: "Multi-Currency & Bill Management", caption: "High-precision bill ledger with pagination, category filtering, and multi-currency conversion." },
      { src: "/projects/book-it-quick/screen4.png", alt: "Savings Goals & Financial Targets", caption: "Track financial wishlists and seamlessly allocate surplus funds toward each target." }
    ],
    featured: true,
    problem: "Personal finance tools often suffer from floating-point calculation drift, rigid single-currency setups, and vulnerable session management. The challenge was building an end-to-end production-ready financial platform from scratch in just 10 working days, enforcing strict monetary precision (BigDecimal/DECIMAL(15,2)), enterprise auth hygiene, and automated background jobs.",
    solution: "High-Precision Financial Core: End-to-end BigDecimal in Java and DECIMAL(15,2) in MySQL, completely preventing floating-point calculation drift across all monetary operations.\n\nEnterprise Security Architecture: Stateless JWT authentication with rotating SHA-256 refresh tokens, auto-pruning token denylist, login rate limiting, and RBAC (USER/ADMIN).\n\nAutomated Cron Operations: Spring @Scheduled background workers for daily currency exchange sync, recurring monthly bill generation, recycle bin pruning, and token cleanup.\n\nInteractive Dashboard & 5-Locale i18n: Vue 3 + Element Plus UI with Apache ECharts visualization, persistent dark mode, and runtime switching across 5 languages (English, Indonesian, Japanese, Simplified Chinese, Traditional Chinese).",
    architecture: "Layered Backend Architecture: Strict separation across Security Filters -> Controllers -> Services -> MyBatis Mappers -> MySQL with idempotent migration scripts.\n\nMulti-Currency Pipeline: Automated daily cron syncing live exchange rates via external API, dynamically recalculating dashboard totals across currencies.\n\nSoft-Delete & Audit Pattern: Non-destructive deletion flags with user-facing Recycle Bin recovery and automated retention cleanup.",
    implementation: "Security Layer: BCrypt password hashing, HS256 JWT with RBAC claims, token rotation chaining via replaced_by, and denylist middleware.\n\nQuery Optimization: Composite index on (user_id, bill_date) ensuring fast paginated transaction queries.\n\nData Visualization: Real-time category distribution pie charts and 7-day cash-flow trends powered by Apache ECharts.",
    quantMethodology: undefined,
    challenges: "Enforcing strict arithmetic precision across all API serialization, database queries, and client-side aggregations.\n\nBuilding a complete full-stack financial system — API design, authentication, database schema, background jobs, and frontend — within a 10-day production deadline.",
    results: "Successfully engineered and delivered within the 10-day deadline at Shandong University of Science and Technology. Open-source on GitHub with comprehensive test endpoints and architecture documentation.",
    lessons: "Financial software demands strict data integrity (BigDecimal over float/double) and atomic transactions.\n\nCore software engineering patterns—such as modular REST layering, stateless auth hygiene, and automated cron jobs—translate seamlessly across both game engines and web platforms.",
    highlights: [
      "End-to-end BigDecimal & DECIMAL(15,2) precision.",
      "Stateless JWT auth with refresh token rotation and denylist.",
      "Vue 3 + Element Plus dashboard with 5-locale i18n.",
      "Apache ECharts for real-time financial visualization.",
      "Spring @Scheduled cron jobs for daily operations.",
    ],
  },
  {
    type: "web",
    slug: "portfolio-optimizer",
    title: "Stock Portfolio Optimizer",
    tagline: "Quantitative Asset Allocation & Risk Analytics Platform using Modern Portfolio Theory",
    shortDescription: "An interactive quantitative finance web application engineered to compute optimal asset allocations using Modern Portfolio Theory.",
    overview: "An interactive quantitative finance web application engineered to compute optimal asset allocations using Modern Portfolio Theory (MPT). The platform maximizes risk-adjusted returns (Sharpe Ratio) through non-linear constrained optimization (SciPy SLSQP), simulates a 10,000-iteration Monte Carlo Efficient Frontier, computes parametric risk metrics (VaR/CVaR), and stress-tests portfolio resilience against historical market crashes.",
    category: "Quantitative Finance",
    year: "2026",
    role: "Quantitative Software Engineer",
    team: "Solo Project",
    tags: ["Python", "Streamlit", "SciPy (SLSQP)", "Modern Portfolio Theory", "Plotly", "Pandas", "NumPy", "yfinance", "Monte Carlo", "Risk Analytics (VaR/CVaR)"],
    techStack: ["Python", "Streamlit", "NumPy", "SciPy", "Plotly", "yfinance"],
    githubUrl: "https://github.com/Rytsia1/Portofolio-Optimizer",
    liveUrl: "https://stockportofolio-optimizer.streamlit.app/",
    // Screenshots captured from the live Streamlit app (liveUrl) with its
    // default inputs; the stress-test view uses the built-in 2022 scenario.
    coverImage: "/projects/portfolio-optimizer/cover.png",
    gallery: [
      { src: "/projects/portfolio-optimizer/cover.png", alt: "Key Performance Indicators", caption: "Expected return, volatility, max Sharpe ratio, and VaR / CVaR (95%) for the optimized portfolio." },
      { src: "/projects/portfolio-optimizer/screen1.png", alt: "Optimization Results & Efficient Frontier", caption: "Optimal asset weights alongside the Monte Carlo Efficient Frontier, with the max-Sharpe portfolio marked." },
      { src: "/projects/portfolio-optimizer/screen2.png", alt: "Historical Backtest & Growth Comparison", caption: "Growth of a $10,000 investment: optimized portfolio vs. equal-weight allocation vs. the SPY benchmark." },
      { src: "/projects/portfolio-optimizer/screen3.png", alt: "Historical Stress Testing & Drawdowns", caption: "Stress test against the SPY benchmark, showing maximum drawdowns during the 2022 Tech Bear Market scenario." }
    ],
    featured: true,
    problem: "Retail investors and analysts often rely on intuitive or equal-weight allocation strategies that ignore asset covariance and downside tail risk. The challenge was building an interactive, responsive analytical tool that translates complex financial mathematics into real-time interactive charts with defensive data caching and stress-testing capabilities.",
    solution: "Constrained Numerical Optimization: Uses SciPy's Sequential Least Squares Programming (SLSQP) to find the maximum Sharpe Ratio allocation under realistic constraints (no short-selling, custom asset weight caps).\n\nMonte Carlo Efficient Frontier: Generates 10,000 randomized portfolios plotted as an interactive Plotly scatter chart to visualize risk vs. expected return.\n\nParametric Tail-Risk Modeling: Calculates Value at Risk (VaR) and Conditional VaR (CVaR / Expected Shortfall) at configurable confidence intervals.\n\nBacktesting & Stress Testing: Simulates cumulative portfolio growth against benchmarks (SPY) and models drawdown resilience during historical crises (2008 GFC, COVID-19 Crash, 2022 Tech Bear Market).",
    architecture: "Modular Quant Pipeline: Clean separation of concerns between data ingestion (yfinance + caching), metrics calculation, SciPy optimization, and visualization.\n\nStateful Streamlit UI: Full reactive interface with sidebar configuration controls, multi-tab result views, and auto-themed Plotly charts.\n\nDual Execution Engine: Supports both an interactive Streamlit Cloud web deployment and a standalone CLI runner (main.py).",
    implementation: "Performance Caching: Integrated Streamlit @st.cache_data to memoize time-series downloads, avoiding redundant API calls and rate-limiting.\n\nDefensive Data Alignment: Automated forward/backward fill algorithms handling timezone discrepancies and non-trading days across multiple tickers.\n\nVectorized Math: Fast vectorized matrix operations via NumPy and Pandas for sub-second 10k-point Monte Carlo simulations.",
    quantMethodology: "Optimization Model: Markowitz Mean-Variance framework. Expected returns and covariance matrix estimated from historical daily log-returns. Portfolio risk defined as portfolio variance under the covariance matrix.\n\nNumerical Optimization: SciPy SLSQP maximizes Sharpe Ratio (expected excess return / portfolio volatility) subject to: (1) weights sum to 1, (2) all weights >= 0 (long-only, no short-selling), (3) configurable per-asset weight caps.\n\nMonte Carlo Efficient Frontier: 10,000 portfolios with weights drawn uniformly from the weight simplex. Each portfolio's annualised return and volatility are computed from the historical covariance matrix and plotted interactively.\n\nParametric Risk Metrics: VaR at confidence level alpha = the alpha-quantile of the daily return distribution (assumes normality). CVaR / Expected Shortfall = expected loss conditional on loss exceeding VaR — computed as E[R | R < VaR]. Both expressed at configurable confidence intervals (default 95%).\n\nBacktest & Stress Testing: Optimal weights applied to historical daily returns to simulate cumulative portfolio growth. Maximum Drawdown (MDD) measured during three crises: 2008 GFC, COVID-19 Crash (Feb–Apr 2020), 2022 Tech Bear Market.",
    challenges: "Ensuring sub-second real-time responsiveness while computing large covariance matrices and non-linear multi-asset constraints.\n\nAccurately modeling tail-risk metrics (CVaR) to represent realistic downside risk during catastrophic market conditions.",
    results: "Successfully deployed and live on Streamlit Cloud. Open-source on GitHub with complete modular architecture and CLI support.",
    lessons: "Translating financial theory into functional software requires robust data sanitization and defensive exception handling.\n\nExpected Shortfall (CVaR) provides significantly more actionable downside protection insights than standard volatility alone.",
    highlights: [
      "SciPy SLSQP for non-linear constrained optimization.",
      "10k-iteration Monte Carlo Efficient Frontier via Plotly.",
      "Parametric VaR & CVaR risk modeling.",
      "Automated backtesting and historical stress testing.",
      "Performance-optimized with vectorized NumPy math and data caching.",
    ],
  },
  // Source: github.com/Rytsia1/Game-Economy-Simulator (README, requirements.txt, module layout). Solo repo.
  {
    type: "web",
    slug: "game-economy-simulator",
    title: "Game Economy Simulator",
    tagline: "Vectorized Stochastic Simulation & Auto-Tuning for Virtual Game Economies",
    shortDescription: "A Streamlit tool that models a game's gold sources, sinks, and player archetypes with vectorized NumPy simulation, then diagnoses, auto-tunes, and stress-tests the economy.",
    overview: "Game Economy Simulator treats game-economy balancing as a quantitative simulation and optimization problem instead of a spreadsheet exercise. A designer configures gold sources (quests, enemy drops), gold sinks (potions, gear purchases), and a heterogeneous player population, then sees how wealth spreads across player archetypes over time, whether the economy is healthy, inflating, or trapping casual players in poverty, which parameter value approximately hits a target progression milestone, and how the economy behaves under stress scenarios and Monte Carlo variation. Everything runs in a four-tab Streamlit dashboard with no backend, database, or external API calls.",
    category: "Simulation & Analytics",
    year: "2026",
    role: "Software Engineer",
    team: "Solo Project",
    tags: ["Python", "Streamlit", "NumPy", "Pandas", "Plotly", "Pytest", "Monte Carlo", "Stochastic Simulation"],
    techStack: ["Python", "Streamlit", "NumPy", "Pandas", "Plotly", "Pytest"],
    githubUrl: "https://github.com/Rytsia1/Game-Economy-Simulator",
    liveUrl: "https://game-economy-simulator.streamlit.app/",
    // Screenshots captured from the live Streamlit app with its default inputs (seed 42).
    coverImage: "/projects/game-economy-simulator/cover.png",
    gallery: [
      { src: "/projects/game-economy-simulator/cover.png", alt: "Dashboard & Health", caption: "Economy KPIs, the automated health verdict, and gauges for flow ratio, Gini coefficient, and casual fail rate." },
      { src: "/projects/game-economy-simulator/screen1.png", alt: "Monte Carlo Risk Lab", caption: "Monte Carlo fan chart of player wealth with median, 50% and 90% confidence bands (default 50 runs)." },
      { src: "/projects/game-economy-simulator/screen2.png", alt: "Scenario Stress-Test", caption: "Median wealth trajectories across the four economic regimes." }
    ],
    featured: false,
    problem: "Most game economies start life as a spreadsheet, which computes deterministic averages well but hides what matters in play: players don't behave uniformly (a Grinder farms far more than a Casual), drops are random (Poisson quest completions and clipped-Normal enemy drops skew wealth), and pacing depends on a cumulative balance over time rather than a single reward-to-price ratio.",
    solution: "• Dashboard & Health: run the core engine to see wealth curves, archetype breakdowns, and time-to-afford milestones, alongside automated diagnostics (macro flow ratio, Gini coefficient, casual fail rate) with rule-based alert cards and prescriptions.\n• Scenario Stress-Test: four economic regimes (Normal, Gold Rush, Economic Crisis, Demographic Shock) side by side.\n• Monte Carlo Risk Lab: jitters economy parameters across a configurable number of runs (20–200, default 50) and shows P5–P95 confidence fan charts and empirical risk probabilities.\n• Auto-Tuning Lab: a binary-search solver that finds the parameter value that approximately meets a target milestone day.",
    architecture: "• Configuration: EconomyConfig, SimulationConfig, and archetype profiles (Casual, Grinder, Collector, Optimizer) in config/.\n• Simulation core: a vectorized (players × days) engine plus a Monte Carlo risk engine in simulation/.\n• Analytics: the diagnostics rule engine and the binary-search auto-tuner in analytics/.\n• Presentation: Plotly chart builders and health-card renderers in visualization/, wired into a four-tab Streamlit app.",
    implementation: "• Vectorized engine: archetypes are assigned with numpy.random.Generator.choice, and the full players × days activity matrices for quests, enemies, and potions are drawn up front, so the only Python loop runs over days, not players.\n• Diagnostics: the Gini coefficient is computed with a vectorized Lorenz formula on final balances; each check emits a severity-graded alert with a concrete prescription.\n• Auto-tuner: probes run on a smaller population at the midpoint of a search interval, halve the interval on the signed milestone error, and the recommendation is re-validated on the full configured population.\n• Reproducibility: all randomness uses numpy.random.default_rng with a configurable seed.\n• Testing: a Pytest suite of unit and integration tests, plus a CLI validation script.",
    quantMethodology: "Stochastic model: daily quest completions are Poisson draws and enemy drops are clipped Normal draws, scaled per archetype by quest, enemy, potion, and saving multipliers.\n\nHealth metrics: macro flow ratio (total income / total spending) classifies the economy as Balanced, Inflating, or a Poverty Trap; the Gini coefficient measures wealth inequality; the casual fail rate is the share of Casual players who never reach the target milestone.\n\nAuto-tuning: binary search on one parameter, stopping when the milestone error is within one day or the interval narrows to one gold. It assumes a monotonic parameter-to-milestone relationship, which holds in expectation but not strictly under stochastic noise, so the result is an approximate estimate.\n\nRisk analysis: Monte Carlo parameter jitter across 20–200 configurable runs, summarized as P5–P95 fan charts and empirical risk probabilities.",
    challenges: "• Keeping interactive parameter sweeps and multi-run Monte Carlo studies responsive in Streamlit, solved by pre-computing the full income tensor instead of looping over every player on every day (trading some memory for speed).\n• Being honest about the auto-tuner: binary search relies on monotonicity that stochastic noise does not guarantee, so results are presented as approximations and re-validated on the full population.",
    results: "Deployed on Streamlit Community Cloud and open-source on GitHub, with unit and integration tests and a CLI validation script.",
    highlights: [
      "Vectorized players × days NumPy simulation engine.",
      "Economy Doctor diagnostics: flow ratio, Gini coefficient, casual fail rate.",
      "Binary-search auto-tuner for progression milestones.",
      "Four-scenario stress test and Monte Carlo P5–P95 fan charts.",
      "Reproducible runs via seeded numpy.random.default_rng.",
    ],
  },
  // Source: github.com/Aku-Ge-Es-A-Team/churn-graph (docs/PRD.md, package.json, src/). Team project; the
  // "My Contributions" text only covers Dio's own commits and the PRD's "B = Dio (Backend & AI)" ownership.
  {
    type: "web",
    slug: "churn-graph",
    title: "Churn Graph",
    tagline: "Churn Early-Warning Context Graph with Evidence-Cited AI Answers",
    shortDescription: "A Next.js and Neo4j hackathon app that unifies six customer-data sources into one context graph to rank accounts by churn risk, with clickable evidence paths and AI answers that cite graph records.",
    overview: "Churn Graph was built by a three-person team at the Road to PENS Hackathon 2026 for a case-study SaaS company whose customer-success team could not tell which accounts would really churn before renewal: the dashboard health score misjudged accounts, and the evidence was scattered and contradictory across six systems (CRM, email and meetings, product usage, support tickets, contracts and billing, and a decision log). The app loads those sources into a single Neo4j context graph, detects risk signals and places where the sources disagree, ranks accounts by risk with clickable evidence, suggests retention actions with precedents from the decision log, and answers ad-hoc questions with citations back to graph records.",
    category: "Full-Stack & AI Systems",
    year: "2026",
    role: "Backend Developer",
    team: "Hackathon team of 3 (Road to PENS Hackathon 2026)",
    tags: ["TypeScript", "Next.js", "Neo4j", "Cypher", "Vercel AI SDK", "Google Gemini", "Zod", "Bun"],
    techStack: ["Next.js", "TypeScript", "React", "Neo4j", "AI SDK", "Tailwind CSS"],
    githubUrl: "https://github.com/Aku-Ge-Es-A-Team/churn-graph",
    liveUrl: "https://churn-graph.vercel.app/",
    // Screenshots captured from the live deployment (fictional case-study data, snapshot 1 Oct 2026).
    coverImage: "/projects/churn-graph/cover.png",
    gallery: [
      { src: "/projects/churn-graph/cover.png", alt: "Risk Radar Dashboard", caption: "Most at-risk account, accounts needing attention, revenue at risk, and priority renewals." },
      { src: "/projects/churn-graph/screen1.png", alt: "Account Risk Breakdown", caption: "Risk score, renewal window, triggered signals with their weights, and the rule checks behind the level." },
      { src: "/projects/churn-graph/screen2.png", alt: "Evidence Subgraph", caption: "Clickable evidence subgraph linking CRM, email, decision-log, and contract records to the account." }
    ],
    featured: false,
    problem: "The customer-success team relied on a dashboard health score that rated several at-risk accounts as healthy. The signals that explained the risk (a departed champion, a competitor mention, an unkept feature promise, unanswered renewal emails, late payments) lived in separate systems, and some looked negative only out of context, such as a usage drop caused by a sync bug rather than a customer leaving.",
    solution: "• Context graph: six raw sources reconciled by an ETL pipeline and loaded into Neo4j.\n• Risk signals: Cypher rules for patterns such as a departed champion, broken promises, competitor mentions, unanswered outreach, payment risk, and usage anomalies tied to release bugs.\n• Risk ranking: accounts scored and ranked, with evidence paths and source-versus-source comparison cards.\n• Retention actions: suggested actions that reference precedents in the decision log.\n• Ask Graph (Tanya Graph): natural-language questions answered by an LLM that can only use fixed, parameterised graph tools, with every claim checked against the records it cites.",
    architecture: "• Next.js App Router application with API routes for questions (/api/ask), evidence, and health checks.\n• Neo4j AuraDB accessed through neo4j-driver read sessions; signal rules and schema written in Cypher.\n• TypeScript ETL scripts (run with Bun) that clean, resolve, derive, and load the raw CSV / JSONL data into the graph.\n• AI layer built on the Vercel AI SDK with Google Gemini and an OpenAI-compatible fallback provider.\n• Frontend dashboard with a React Flow evidence-subgraph viewer, Recharts usage charts, and shadcn/ui components.",
    contributions: "• Role: Backend Developer. The team's PRD assigns me ownership of Backend & AI, while teammates owned the data-graph / ETL pipeline and the frontend, pitch, and demo. The items below are traceable to my own commits.\n• Backend foundation: integrated the Neo4j driver with a read-session query helper, environment configuration, and a health-check route, plus a Google Gemini connectivity spike.\n• Cypher query guard: a pure validation function that rejects write and other dangerous clauses (matched on word boundaries while ignoring strings and comments), refuses multi-statement queries, and caps LIMIT, layered on top of the driver's read-only sessions; together with Zod schemas for the shared graph types.\n• Citation validator: checks every claim in an AI answer against the registry of records the tools actually returned, discarding any claim whose cited evidence or numbers cannot be matched.\n• Risk scoring and ranking: score = Σ signal weight × a renewal-proximity factor, mapped to risk levels, and flagging accounts the dashboard marks green while the findings rate them high.\n• Initial Ask Graph pipeline: the POST /api/ask route, six fixed parameterised graph tools so the model never writes Cypher, the system prompt, preset questions, and an evaluation script.\n• Testing: each of these shipped with unit tests; several modules were later extended by teammates.",
    results: "Built during the Road to PENS Hackathon 2026 and deployed on Vercel; the source is public on GitHub.",
    highlights: [
      "Six-source customer context graph in Neo4j.",
      "Cypher risk-signal rules and account risk ranking.",
      "LLM answers restricted to fixed, parameterised graph tools.",
      "Citation validator that drops unsupported claims.",
      "Clickable evidence subgraphs in the dashboard.",
    ],
  },

  // ─────────────────────────── GAME DEVELOPMENT ───────────────────────────

  {
    type: "game",
    slug: "wacky-whackers",
    title: "Wacky Whackers: The Ultimate Stick Battle",
    tagline: "Find your stick, Fight with stick",
    shortDescription:
      "A quirky exploration and turn-based stick-battling game (Top 60 national placement at Gameseed 2025), playable on Itch.io.",
    overview:
      "A quirky exploration and turn-based battle game where players roam a village to discover, appraise, and duel with unique wooden sticks in a quest to become the Ultimate Whacker. Built for Gameseed 2025 under the theme 'Real Life Experience', achieving Top 60 national placement.",
    category: "Game Development",
    year: "2025",
    role: "Game Designer",
    achievement: "Gameseed 2025: Top 60",
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
      "A two-player cooperative online simulation game about cooking and nutrition management (KMIPN 2025 finalist).",
    overview:
      "A two-player cooperative online simulation game where players assume distinct roles (a cafeteria chef and a nutritionist) collaborating in real-time to prepare balanced, nutritious meals for school children with varying dietary needs across Indonesia. Selected as a National Finalist at KMIPN 2025.",
    category: "Game Development",
    year: "2025",
    role: "Game Designer",
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
      "Real-time Multiplayer Synchronization via Photon.",
      "Dynamic procedural student generation based on Indonesian demographics.",
      "National Finalist at KMIPN 2025.",
    ],
  },
  {
    type: "game",
    slug: "moon-sky",
    title: "Moon Sky",
    tagline: "2.5D Mobile Arcade Shooter with Tactical Bullet-Time Evading Mechanics",
    shortDescription:
      "A high-octane 2.5D vertical mobile arcade shooter featuring gesture-based navigation and bullet-time mechanics.",
    overview:
      "A high-octane 2.5D vertical mobile arcade shooter where players pilot an advanced space fighter to defend the Moon from an alien armada. Designed natively for mobile touch screens, featuring fluid 1:1 gesture navigation, weapon switching, and an adrenaline-pumping risk-reward near-miss barrel roll mechanic that triggers dynamic slow motion.",
    category: "Game Development",
    year: "2025",
    role: "Game Designer",
    engine: "Unity",
    coreMechanics: [
      "Gesture-Based Navigation",
      "Bullet-Time Evading",
      "Weapon Switching"
    ],
    tags: ["Unity", "C#", "Mobile", "2.5D", "Shmup", "Touch Controls", "Arcade"],
    liveUrl: "https://kanvas-kosong.itch.io/project-pew-pew",
    coverImage: "/projects/moon-sky/cover.png",
    featured: true,
    problem:
      "Mobile shooters often struggle with cumbersome virtual joysticks that obscure screen viewports or feel sluggish. The design challenge was engineering responsive, natural touch-gesture controls paired with a high-stakes evasion mechanic that rewards risky, close-call positioning.",
    solution:
      "• Direct Touch-Drag Navigation: 1:1 finger-following flight controls allowing pinpoint precision dodging without on-screen buttons.\n• Risk-Reward Barrel Roll & Bullet Time: Double-tap dodge roll granting brief invulnerability (i-frames) and triggering slow motion when executed close to enemies.\n• Gesture-Based Weapon Switching: Quick swipe gestures to cycle arsenals on-the-fly to adapt against varied alien armor types.",
    architecture:
      "• Mobile Gesture Recognition Engine: High-tolerance input parsing separating micro-drags, rapid double taps, and directional swipe gestures.\n• Time Dilation Controller: Smooth Time.timeScale interpolation system managing cinematic bullet-time transitions with unscaled audio cues.\n• Zero-Allocation Object Pooling: High-performance memory management for hundreds of active projectiles, lasers, and particle effects.",
    implementation:
      "• ScriptableObject Weapon Architecture: Data-driven weapon profiles controlling spread patterns, fire rates, and visual effects.\n• Mobile Performance Optimization: Batch-rendered 2.5D assets and low-draw-call shaders ensuring a locked 60 FPS on mobile chipsets.\n• Wave Spawner State Machine: Scalable wave spawning system managing increasing formation complexity and enemy assault frequencies.",
    challenges:
      "• Disambiguating rapid drag motions from double-tap evasion triggers during intense bullet hell situations.\n• Maintaining smooth physics calculations and audio transitions during sudden slow-motion time dilation.",
    results:
      "Published and playable on mobile browsers and Android devices via Itch.io.",
    lessons:
      "• Designing around native mobile gestures provides far superior tactile satisfaction than emulated virtual joysticks.\n• Near-miss risk-reward mechanics elevate arcade shooters from simple avoidance into aggressive tactical positioning.",
    highlights: [
      "Natively designed 2.5D mobile arcade shooter.",
      "Custom Gesture Recognition Engine for 1:1 touch control.",
      "High-stakes bullet-time evasion mechanics.",
      "Optimized for 60 FPS performance on mobile."
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
    category: "Game Development",
    year: "In Progress",
    role: "Narrative Designer",
    engine: "Unity",
    coreMechanics: ["Narrative Framework", "Cozy Exploration"],
    tags: ["Unity", "C#", "Adventure", "Narrative", "Exploration"],
    githubUrl: "https://github.com/Rytsia1",
    featured: false,
    problem:
      "A cozy exploration prototype investigating non-violent interaction models, atmospheric pacing, and environmental puzzle-solving in Unity.",
    solution:
      "A custom narrative dialogue framework paired with a robot avatar controller, focusing on atmosphere, pacing, and systemic interactions.",
    architecture: "Modular event-driven architecture decoupling player movement, dialog state trees, and scene triggers.",
    implementation: "Developed in Unity with custom C# character controller, camera framing, and state-machine-driven narrative sequences.",
    challenges: "Balancing slow-paced contemplative exploration with engaging environmental feedback.",
    results: "Exploration prototype under active development.",
    lessons: "Prototyping narrative hooks early helps clarify core gameplay loop boundaries.",
    highlights: [
      "Cozy exploration tone with a robot protagonist.",
      "Narrative framework driving story and world-building.",
      "Ongoing development in Unity.",
    ],
  },
];

/**
 * Featured web projects (software / quant) — shown on the home page.
 */
export function getSoftwareAndQuantProjects(): WebProject[] {
  return projects.filter(
    (p): p is WebProject => p.type === "web" && p.featured,
  );
}

/**
 * Featured game projects — shown on the home page.
 */
export function getGameProjects(): GameProject[] {
  return projects.filter(
    (p): p is GameProject => p.type === "game" && p.featured,
  );
}

/** Section order on the /projects archive. */
export const PROJECT_CATEGORY_ORDER: readonly ProjectCategory[] = [
  "Quantitative Finance",
  "Full-Stack & AI Systems",
  "Simulation & Analytics",
  "Game Development",
];

/**
 * Projects grouped by category for the /projects archive, in
 * `PROJECT_CATEGORY_ORDER`, keeping each project's order in `projects`.
 * Categories with no projects are skipped.
 */
export function getProjectsByCategory(): { category: ProjectCategory; projects: ProjectItem[] }[] {
  return PROJECT_CATEGORY_ORDER.map((category) => ({
    category,
    projects: projects.filter((p) => p.category === category),
  })).filter((group) => group.projects.length > 0);
}

/** Look up a project by its slug. */
export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Like `getProjectBySlug`, but fails the build with the slug name when it's missing. */
export function requireProject(slug: string): ProjectItem {
  const project = getProjectBySlug(slug);
  if (!project) throw new Error(`data/projects.ts: no project with slug "${slug}"`);
  return project;
}

/** All slugs, used by `generateStaticParams`. */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}