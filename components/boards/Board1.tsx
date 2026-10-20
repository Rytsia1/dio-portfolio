import { Board } from "@/components/layout/Board";
import { Column } from "@/components/layout/Column";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { Github, Linkedin, ArrowDown } from "lucide-react";

export function Board1() {
  const domains = [
    {
      title: "Quantitative Systems",
      focus: "Stochastic simulation, Modern Portfolio Theory, and actuarial liability valuation with VaR / CVaR risk metrics.",
    },
    {
      title: "Backend & Web Systems",
      focus: "REST APIs, relational data models, and interactive web frontends with FastAPI, Spring Boot, Vue 3, and SQL.",
    },
    {
      title: "Data & Computation",
      focus: "Directed Acyclic Graph (DAG) dependency evaluation, exact decimal arithmetic for money, and vectorized NumPy computation.",
    },
    {
      title: "Game Technology Foundation",
      focus: "Gameplay state machines, turn-based battle logic, and simulation loops built in Unity C#.",
    },
  ];

  return (
    // Top padding clears the fixed navbar (top-4/6 + h-14) at every breakpoint.
    <Board id="top" gutter="normal" className="pt-24 pb-4 md:pt-28 md:pb-6 lg:pt-28 lg:pb-8">
      {/* Anchor (Left, ~54% width) — Authoritative Identity & Immediate Positioning */}
      <Column role="anchor" className="lg:w-[54%] shrink-0 lg:h-auto">
        <div
          className="relative flex flex-1 min-h-[520px] lg:min-h-[600px] flex-col justify-between overflow-hidden rounded-card border border-border-strong card-shadow"
          style={{
            background:
              "linear-gradient(180deg, #e6f3ff 0%, #cfe6fa 45%, #b6d7ef 78%, #a8cde8 100%)",
          }}
        >
          {/* Ambient header: Location & Status */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-6 pt-6 sm:px-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-fg-muted">
              SURABAYA, ID · UTC+7
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent backdrop-blur-xs shadow-xs">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              open to work
            </span>
          </div>

          {/* Environmental Pixel Clouds */}
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
            <svg
              width="88"
              height="22"
              viewBox="0 0 24 6"
              shapeRendering="crispEdges"
              className="absolute top-20 right-10 opacity-80"
            >
              <path d="M4,4h16v1h-16z M5,5h14v0.5h-14z" fill="#9ec5e6" />
              <path
                d="M6,0h2v1h-2z M10,0h3v1h-3z M16,0h2v1h-2z M5,1h9v1h-9z M15,1h4v1h-4z M3,2h18v1h-18z M4,3h16v1h-16z"
                fill="#ffffff"
              />
            </svg>
            <svg
              width="68"
              height="18"
              viewBox="0 0 24 6"
              shapeRendering="crispEdges"
              className="absolute top-44 left-8 opacity-70"
            >
              <path d="M3,4h16v1h-16z" fill="#9ec5e6" />
              <path
                d="M4,0h2v1h-2z M9,0h3v1h-3z M15,0h2v1h-2z M3,1h10v1h-10z M14,1h5v1h-5z M2,2h18v1h-18z M3,3h16v1h-16z"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Identity & Core Positioning */}
          <div className="relative z-10 mt-auto flex flex-col justify-end px-6 pb-8 pt-12 sm:px-8">
            <h1 className="text-balance font-extrabold tracking-[-0.035em] text-fg text-[2.6rem] leading-[0.95] sm:text-[3.4rem] lg:text-[4rem]">
              DIO<br />STANIA<br />ADINATA
            </h1>

            <p className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-strong sm:text-[13px]">
              software engineer · quantitative systems
            </p>

            {/* Clear, human positioning statement */}
            <p className="mt-4 max-w-[42ch] text-pretty text-base leading-relaxed text-fg sm:text-lg">
              Final-year Game Technology student at PENS (graduating 2027) building quantitative tools and backend web systems. Seeking Quantitative Developer or Backend / Full-Stack Software Engineering internships and junior roles (remote or hybrid).
            </p>

            {/* Immediate Action Signposts */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="#work" variant="dark" size="md">
                View work
                <ArrowDown className="h-4 w-4" aria-hidden />
              </Button>

              <Button
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="md"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </Button>

              <Button
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="md"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </Button>            </div>
          </div>

          {/* Pinned grass / earth bar at the base, holding the contact CTA */}
          <div className="relative z-10 bg-earth">
            <div className="h-[5px] w-full bg-grass" />
            <div className="flex items-center px-6 py-4 sm:px-8">
              <Button href="#contact">Get in touch</Button>
            </div>
          </div>
        </div>
      </Column>

      {/* Right Column (~46% width) — Typographic Statement of Identity (Not 4 feature cards!) */}
      <Column role="variety" className="lg:w-[46%] flex-1 lg:h-auto">
        <div className="flex flex-1 flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow">
          <div>
            <div className="border-b border-border pb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                AREAS OF PRACTICE
              </span>
            </div>

            <p className="mt-4 text-pretty text-base font-medium leading-relaxed text-fg sm:text-lg">
              A hybrid background combining game technology fundamentals with modern financial software engineering.
            </p>

            {/* The 4 Core Disciplines — Typographic composition with subtle dividers */}
            <div className="mt-6 divide-y divide-border">
              {domains.map((item, index) => (
                <div key={item.title} className="group py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-base font-semibold tracking-tight text-fg transition-colors duration-200 group-hover:text-accent sm:text-lg">
                      {item.title}
                    </h2>
                    <span className="font-mono text-xs font-semibold text-fg-subtle">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-fg-muted">
                    {item.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Grounding Context at Floor */}
          <div className="mt-6 flex flex-col items-start gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-fg-muted">
              <strong className="font-semibold text-fg">Core focus:</strong> Applying simulation logic and structured state management to backend and financial software.
            </p>
            <Button href="#story" variant="secondary" size="sm" className="shrink-0">
              Background
            </Button>
          </div>
        </div>
      </Column>
    </Board>
  );
}
