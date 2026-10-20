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
    shortDescription: "An open-source actuarial valuation platform that evaluates life-insurance cash flows as a Directed Acyclic Graph (DAG), with deterministic Best Estimate Liability (BEL) projections and Monte Carlo risk metrics.",
    overview: "Actura is a solo open-source project for valuing life-insurance liabilities. A FastAPI backend evaluates cash-flow blueprints as a DAG. The deterministic run projects BEL under fixed best-estimate mortality, interest, and lapse assumptions; the stochastic run simulates interest-rate scenarios with a Vasicek economic scenario generator (with optional dynamic lapse) and reports the resulting liability distribution, including the scenario mean BEL, VaR 95%, and CVaR / CTE 95. A Vue 3 frontend provides a node-based logic workbench built with Vue Flow, plus ECharts visualizations, and the stack runs with Docker Compose alongside PostgreSQL.",
    category: "Quantitative Finance",
    year: "2026",
    role: "Solo developer: FastAPI engine, Vue 3 / Vue Flow workbench, ECharts, Docker",
    team: "Solo Project",
    tags: ["Python", "FastAPI", "Vue 3", "Vue Flow", "ECharts", "PostgreSQL", "Docker", "NumPy", "SciPy"],
    techStack: ["Python", "FastAPI", "Vue 3", "PostgreSQL", "NumPy", "SciPy"],
    githubUrl: "https://github.com/Rytsia1/Actura",
    coverImage: "/projects/actura/cover.png",
    // Cover (valuation dashboard) is shown above the case study, so the gallery starts with other screens.
    gallery: [
      { src: "/projects/actura/screen1.png", alt: "Contract Logic Blueprint Builder", caption: "A node-based DAG editor (built with Vue Flow) for designing insurance cash-flow blueprints without writing code." },
      { src: "/projects/actura/screen2.png", alt: "Stress Testing", caption: "Stress-testing module for adjusting risk factors such as interest rates, mortality multipliers, and lapse shocks." }
    ],
    featured: true,
    problem: "Actuarial valuation tools are often spreadsheets or closed systems that are hard to inspect. The goal was a platform where cash-flow structures (mortality decrements, premium schedules, and benefit payments) are designed in a visual editor, while the numbers stay verifiable against analytical results.",
    solution: "A drag-and-drop DAG editor for designing cash-flow blueprints without hand-coding formulas. Each node represents a cash-flow component; edges represent dependencies and sequencing. The engine evaluates the DAG deterministically for a BEL point estimate, and stochastically via Monte Carlo for the liability distribution.",
    architecture: "Decoupled architecture: a Vue 3 SPA for graph interactions and charting, backed by a FastAPI REST API for the valuation engine. PostgreSQL via SQLAlchemy for persistence and Nginx as a reverse proxy. All services run with Docker Compose for a consistent local setup.",
    implementation: "Cash-flow evaluation as a topologically sorted DAG: nodes are typed (premium, benefit, decrement) and evaluated in dependency order using Kahn's algorithm, and cyclic graphs are rejected before evaluation. Monte Carlo paths are generated from a seeded Vasicek interest-rate model with configurable parameters, and risk metrics are computed across the simulated BEL distribution.",
    quantMethodology: "Deterministic run: projects cash flows under fixed best-estimate mortality, interest, and lapse assumptions and discounts them to a single BEL point estimate.\n\nStochastic run: simulates N interest-rate paths with a Vasicek economic scenario generator, optionally with dynamic lapse that responds to market rates. Each path yields its own BEL, so the output is a liability distribution summarised by the scenario mean BEL and tail metrics. Mortality comes from life tables in both runs.\n\nRisk Metrics: VaR 95% (the 95th percentile of the simulated BEL distribution) and CVaR / CTE 95 (the expected BEL given that it exceeds VaR 95%).",
    // TODO(dio): the blueprint unit tests (tests/domain/blueprint/*) currently fail on NodeType.INPUT,
    // so the DAG ordering bullet below avoids claiming test coverage. Fix those tests, then mention them.
    challenges: "• Deterministic vs. stochastic consistency: with interest-rate volatility set to zero, the mean BEL over 10,000 scenarios must match the analytical deterministic value within 2% for three different seeds, and a fixed seed must reproduce the BEL and the full path array exactly.\n• Deterministic accuracy: whole-life and term expected present values are checked against analytical benchmarks to a relative tolerance of 1e-12.\n• DAG evaluation order: nodes are ordered with Kahn's algorithm and graphs containing a cycle are rejected before evaluation; a separate depth-first validator reports the offending cycle path in the editor.",
    results: "• Performance (AMD Ryzen 7 7735HS, 16 GB RAM): 10,000 Monte Carlo paths in 0.07 s and 100,000 paths in 0.80 s (median of 3 runs); a deterministic valuation of a 10,000-policy synthetic portfolio in 0.12 s.\n• Validation: deterministic values match analytical benchmarks to 1e-12; the 10,000-scenario mean BEL stays within the 2% convergence tolerance for three seeds; seeded runs are exactly reproducible.\n• Delivery: open-source on GitHub with a Docker Compose setup (FastAPI, Vue 3 behind Nginx, PostgreSQL).",
    lessons: "Visual, node-based editors are a natural fit for mapping insurance cash-flow logic. Separating the DAG data model from its evaluation engine makes the system easier to test and extend.",
    highlights: [
      "DAG cash-flow engine with topological evaluation order and cycle rejection.",
      "Seeded Monte Carlo interest-rate scenarios (Vasicek) producing a BEL distribution.",
      "Risk analytics: BEL, VaR 95%, and CVaR / CTE 95 across simulated paths.",
      "FastAPI backend with Nginx reverse proxy, run with Docker Compose.",
    ],
  },

  {
    type: "web",
    slug: "book-it-quick",
    title: "Book-it-quick",
    tagline: "Personal Bookkeeping Web App with Exact Decimal Money Handling",
    shortDescription: "A personal bookkeeping web application built during a 10-day software production module at Shandong University of Science and Technology (SDUST), using Spring Boot, MyBatis, Vue 3, Element Plus, MySQL, and ECharts.",
    overview: "Book-it-quick is a personal bookkeeping (income and expense) web application built during a 10-day software production module of my Software Engineering exchange semester at Shandong University of Science and Technology (SDUST), China. A Spring Boot and MyBatis backend stores every monetary amount as BigDecimal in Java and DECIMAL(15,2) in MySQL, so totals never accumulate floating-point drift. The Vue 3 and Element Plus frontend adds recurring bills, multi-currency conversion, savings goals, ECharts dashboards, and JWT-based authentication.",
    category: "Full-Stack & AI Systems",
    year: "2026",
    role: "Full-Stack Developer",
    team: "SDUST exchange program: 10-day software production module",
    tags: ["Spring Boot", "Java 25", "Vue 3", "MyBatis", "MySQL", "Vite", "Element Plus", "ECharts", "JWT & Spring Security", "Pinia", "i18n"],
    techStack: ["Java", "Spring Boot", "Vue 3", "MySQL", "MyBatis", "JWT"],
    githubUrl: "https://github.com/Rytsia1/Book-it-quick",
    coverImage: "/projects/book-it-quick/cover.png",
    gallery: [
      { src: "/projects/book-it-quick/screen1.png", alt: "Financial Dashboard & ECharts Trends", caption: "Financial dashboard with balance KPIs and cash-flow charts." },
      { src: "/projects/book-it-quick/screen2.png", alt: "Multi-Currency & Bill Management", caption: "Bill list with pagination, category filtering, and multi-currency conversion." },
      { src: "/projects/book-it-quick/screen4.png", alt: "Savings Goals & Financial Targets", caption: "Track financial wishlists and seamlessly allocate surplus funds toward each target." }
    ],
    featured: true,
    problem: "Simple bookkeeping apps often store money as floating-point numbers, support only one currency, and handle sessions loosely. The challenge was building a complete bookkeeping app from scratch in 10 working days with exact decimal money handling, token-based authentication, and scheduled background jobs.",
    solution: "Decimal Money Handling: BigDecimal in Java and DECIMAL(15,2) columns in MySQL for every monetary amount (exchange rates use DECIMAL(20,8)), avoiding floating-point drift.\n\nAuthentication: Stateless JWT authentication with rotating SHA-256-hashed refresh tokens, a token denylist, login rate limiting, and USER / ADMIN roles.\n\nScheduled Jobs: Spring @Scheduled tasks for daily exchange-rate sync, recurring monthly bill generation, recycle-bin pruning, and token cleanup.\n\nDashboard & i18n: Vue 3 + Element Plus UI with Apache ECharts charts, persistent dark mode, and runtime switching across 5 languages (English, Indonesian, Japanese, Simplified Chinese, Traditional Chinese).",
    architecture: "Layered Backend Architecture: Strict separation across Security Filters -> Controllers -> Services -> MyBatis Mappers -> MySQL with idempotent migration scripts.\n\nMulti-Currency Pipeline: Automated daily cron syncing live exchange rates via external API, dynamically recalculating dashboard totals across currencies.\n\nSoft-Delete & Audit Pattern: Non-destructive deletion flags with user-facing Recycle Bin recovery and automated retention cleanup.",
    implementation: "Security Layer: BCrypt password hashing, HS256 JWT with role claims, refresh-token rotation chained via replaced_by, and denylist middleware.\n\nQuery Indexing: a composite index on (user_id, bill_date) for paginated transaction queries.\n\nData Visualization: category distribution pie charts and 7-day cash-flow trends with Apache ECharts.",
    quantMethodology: undefined,
    challenges: "Keeping amounts exact across API serialization, database queries, and client-side aggregation.\n\nBuilding the API, authentication, database schema, background jobs, and frontend within the 10-day module.",
    results: "Completed within the 10-day module at SDUST. Open-source on GitHub with architecture documentation.",
    lessons: "Money should be stored and calculated as decimals (BigDecimal / DECIMAL), never float or double.\n\nPatterns such as layered REST services, stateless authentication, and scheduled jobs carry over between game and web projects.",
    highlights: [
      "BigDecimal & DECIMAL(15,2) for every monetary amount.",
      "Stateless JWT auth with refresh token rotation and denylist.",
      "Vue 3 + Element Plus dashboard with 5-locale i18n.",
      "Apache ECharts charts for balances and cash flow.",
      "Spring @Scheduled jobs for daily operations.",
    ],
  },
  {
    type: "web",
    slug: "portfolio-optimizer",
    title: "Stock Portfolio Optimizer",
    tagline: "Quantitative Asset Allocation & Risk Analytics Platform using Modern Portfolio Theory",
    shortDescription: "An interactive Streamlit app that computes maximum-Sharpe, long-only asset allocations with Modern Portfolio Theory and SciPy SLSQP.",
    overview: "A solo Streamlit application for mean-variance portfolio allocation using Modern Portfolio Theory (MPT). It downloads daily prices with yfinance, estimates expected returns and the covariance matrix from history, and finds the maximum-Sharpe allocation under long-only weight caps with SciPy's SLSQP optimizer. The result is plotted against 10,000 random-weight portfolios, summarised with parametric VaR / CVaR, and backtested against SPY and three historical crisis windows.",
    category: "Quantitative Finance",
    year: "2026",
    role: "Developer",
    team: "Solo Project",
    tags: ["Python", "Streamlit", "SciPy (SLSQP)", "NumPy", "Pandas", "Plotly", "yfinance"],
    techStack: ["Python", "Streamlit", "NumPy", "SciPy", "Plotly", "yfinance"],
    githubUrl: "https://github.com/Rytsia1/Portofolio-Optimizer",
    liveUrl: "https://stockportofolio-optimizer.streamlit.app/",
    // Screenshots captured from the live Streamlit app (liveUrl) with its
    // default inputs; the stress-test view uses the built-in 2022 scenario.
    coverImage: "/projects/portfolio-optimizer/cover.png",
    gallery: [
      { src: "/projects/portfolio-optimizer/screen1.png", alt: "Optimization Results & Efficient Frontier", caption: "Optimal asset weights alongside 10,000 random-weight portfolios, with the max-Sharpe portfolio marked." },
      { src: "/projects/portfolio-optimizer/screen2.png", alt: "Historical Backtest & Growth Comparison", caption: "Growth of a $10,000 investment: optimized portfolio vs. equal-weight allocation vs. the SPY benchmark." },
      { src: "/projects/portfolio-optimizer/screen3.png", alt: "Historical Stress Testing & Drawdowns", caption: "Stress test against the SPY benchmark, showing maximum drawdowns during the 2022 Tech Bear Market scenario." }
    ],
    featured: true,
    problem: "Equal-weight or intuition-based allocations ignore how assets move together and how large the downside can get. The goal was an interactive tool that turns mean-variance theory into charts a user can adjust, with clear risk metrics and historical stress tests.",
    solution: "Constrained Optimization: SciPy's Sequential Least Squares Programming (SLSQP) finds the maximum Sharpe ratio allocation with no short-selling and an adjustable per-asset weight cap.\n\nRandom-Portfolio Frontier: 10,000 random-weight portfolios plotted as an interactive Plotly scatter of risk vs. expected return, with the optimal portfolio marked.\n\nParametric Tail Risk: Value at Risk (VaR) and Conditional VaR (CVaR / Expected Shortfall) at a configurable confidence level.\n\nBacktesting & Stress Testing: cumulative growth of the optimized weights against an equal-weight portfolio and the SPY benchmark, plus maximum drawdown during three historical crises (2008 Financial Crisis, COVID-19 Crash, 2022 Tech Bear Market).",
    architecture: "Modular Pipeline: separate modules for data ingestion (yfinance + caching), metrics calculation, SciPy optimization, risk metrics, backtesting, and visualization.\n\nStreamlit UI: sidebar configuration controls, multi-tab result views, and themed Plotly charts.\n\nTwo Entry Points: the Streamlit web app and a standalone CLI runner (main.py).",
    implementation: "Caching: Streamlit @st.cache_data memoizes price downloads, avoiding repeated API calls and rate limits.\n\nData Alignment: forward / backward fill handles non-trading days and gaps across tickers.\n\nInput Validation: the app rejects fewer than two tickers and weight caps that cannot reach a fully invested portfolio.",
    quantMethodology: "Optimization Model: Markowitz mean-variance framework. Expected returns are the mean of simple daily returns and risk comes from their sample covariance matrix, both annualised over 252 trading days.\n\nNumerical Optimization: SciPy SLSQP maximizes the Sharpe ratio (expected excess return / portfolio volatility, risk-free rate default 2%) subject to: (1) weights sum to 1, (2) 0 ≤ wᵢ ≤ cap (long-only, cap adjustable from 0.10 to 1.00).\n\nRandom-Portfolio Frontier: 10,000 portfolios whose weights are uniform random draws normalised to sum to 1. Each portfolio's annualised return and volatility are computed from the same estimates and plotted interactively.\n\nParametric Risk Metrics: VaR and CVaR are computed from the portfolio's annualised expected return and volatility, assuming normally distributed returns (normal quantile for VaR, closed-form normal expected shortfall for CVaR), at a configurable confidence level (default 95%).\n\nBacktest & Stress Testing: optimal weights applied to historical daily returns to simulate cumulative growth from a configurable starting capital. Maximum drawdown is measured in three windows: 2008 Financial Crisis (Oct 2007 – Mar 2009), COVID-19 Crash (Feb – Apr 2020), and the 2022 Tech Bear Market.",
    challenges: "Keeping the app responsive while re-optimizing whenever inputs change, solved by caching price downloads.\n\nPresenting tail risk honestly: parametric CVaR assumes normal returns, so it is shown alongside historical crisis drawdowns rather than on its own.",
    results: "Deployed on Streamlit Community Cloud and open-source on GitHub, with a modular package layout and a CLI runner.",
    limitations: "• Estimation error: Markowitz mean-variance optimization is highly sensitive to errors in the estimated expected returns; small changes in sample means can shift the optimal weights substantially.\n• In-sample results: historical mean returns and sample covariance matrices are noisy and non-stationary, so the frontier, backtest, and stress tests are in-sample results, not out-of-sample guarantees.\n• Data: daily adjusted close prices from Yahoo Finance via yfinance (close prices if adjusted prices are unavailable). The default lookback is the last 5 years up to today, adjustable in the sidebar back to 2000.\n• Constraints enforced: long-only weights 0 ≤ wᵢ ≤ cap (default cap 1.00) and Σ wᵢ = 1.\n• Normality: VaR and CVaR are parametric and assume normally distributed returns, which understates fat-tailed losses.\n• Planned next steps: Ledoit-Wolf covariance shrinkage, transaction-cost penalties, and Black-Litterman priors are not implemented yet.",
    lessons: "Turning financial theory into working software needs careful data cleaning and explicit handling of bad inputs.\n\nExpected Shortfall (CVaR) says more about downside risk than volatility alone, but only as much as its distributional assumptions allow.",
    highlights: [
      "SciPy SLSQP for constrained maximum-Sharpe optimization.",
      "10,000 random-weight portfolios plotted with Plotly.",
      "Parametric VaR & CVaR risk metrics.",
      "Backtesting against SPY and historical crisis stress tests.",
      "Cached yfinance downloads for responsive re-runs.",
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
    tags: ["Python", "Streamlit", "NumPy", "Pandas", "Plotly", "Pytest"],
    techStack: ["Python", "Streamlit", "NumPy", "Pandas", "Plotly", "Pytest"],
    githubUrl: "https://github.com/Rytsia1/Game-Economy-Simulator",
    liveUrl: "https://game-economy-simulator.streamlit.app/",
    // Screenshots captured from the live Streamlit app with its default inputs (seed 42).
    coverImage: "/projects/game-economy-simulator/cover.png",
    gallery: [
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
      "A two-player cooperative online simulation game where players assume distinct roles (a cafeteria chef and a nutritionist) collaborating simultaneously to prepare balanced, nutritious meals for school children with varying dietary needs across Indonesia. Selected as a National Finalist at KMIPN 2025.",
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
    tags: ["Unity", "C#", "Online Co-op", "Asymmetric Gameplay", "Simulation"],
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
        caption: "Chef cooking stations and live food preparation.",
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
      "• Multiplayer Synchronization Layer: Online room matchmaking and client synchronization for kitchen stations, ingredient states, and order progress.\n• Asymmetric Role-Specific UI: Independent UI viewports tailored for each role's distinct workflow.\n• Nutritional Scoring Engine: A scoring formula comparing dish composition against target nutrient quotas.",
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
      "Online multiplayer synchronization via Photon.",
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
      "A 2.5D vertical mobile arcade shooter featuring gesture-based navigation and bullet-time mechanics.",
    overview:
      "A 2.5D vertical mobile arcade shooter where players pilot an advanced space fighter to defend the Moon from an alien armada. Designed natively for mobile touch screens, featuring fluid 1:1 gesture navigation, weapon switching, and an adrenaline-pumping risk-reward near-miss barrel roll mechanic that triggers dynamic slow motion.",
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
      "• Mobile Gesture Recognition Engine: High-tolerance input parsing separating micro-drags, rapid double taps, and directional swipe gestures.\n• Time Dilation Controller: Smooth Time.timeScale interpolation system managing cinematic bullet-time transitions with unscaled audio cues.\n• Object Pooling: Reuses projectiles, lasers, and particle effects instead of instantiating them during play.",
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