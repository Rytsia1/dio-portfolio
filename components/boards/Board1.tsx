import { Board } from "@/components/layout/Board";
import { Column } from "@/components/layout/Column";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { Github, Linkedin, ArrowDown, ArrowRight } from "lucide-react";

export function Board1() {
  const domains = [
    {
      title: "Quantitative Systems",
      focus: "Stochastic simulation, Modern Portfolio Theory, 10,000 Monte Carlo paths, and actuarial VaR/CVaR risk engines.",
    },
    {
      title: "Distributed Software",
      focus: "High-throughput APIs, service orchestration, and transactional integrity using FastAPI, Spring Boot, and Vue 3.",
    },
    {
      title: "Data & Computation",
      focus: "Directed Acyclic Graphs (DAG) for dependency evaluation, high-precision financial accounting, and memory efficiency.",
    },
    {
      title: "Game Technology Foundation",
      focus: "Deterministic frame loops, hard hardware limits, and gameplay state machines engineered in Unity C#.",
    },
  ];

  return (
    // Top padding clears the fixed navbar (top-4/6 + h-14) at every breakpoint.
    <Board id="top" gutter="normal" className="pt-24 pb-4 md:pt-28 md:pb-6 lg:pt-28 lg:pb-8">
      {/* Anchor (Left, ~54% width) — Authoritative Identity & Immediate Positioning */}
      <Column role="anchor" className="lg:w-[54%] shrink-0 h-full">
        <div
          className="relative flex h-full min-h-[520px] lg:min-h-[600px] flex-col justify-between overflow-hidden rounded-card border border-border-strong card-shadow"
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
              I build software systems where software engineering, computational modeling, and quantitative thinking meet, bringing the deterministic discipline of game development to financial pipelines and distributed architectures.
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
              </Button>
            </div>
          </div>

          {/* Pinned Action Bar at base with guaranteed high contrast cream on brown */}
          <a
            href="#contact"
            className="group relative z-10 block bg-earth text-[#fff5ed] transition-colors duration-200 hover:bg-earth-deep focus-visible:-outline-offset-4 focus-visible:outline-[#ffd2bd]"
          >
            <div className="h-[5px] w-full bg-grass" />
            <div className="flex items-center justify-between px-6 py-4 sm:px-8">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                connect with dio
              </span>
              <span className="font-mono text-base font-bold text-[#ffd2bd] transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </a>
        </div>
      </Column>

      {/* Right Column (~46% width) — Typographic Statement of Identity (Not 4 feature cards!) */}
      <Column role="variety" className="lg:w-[46%] flex-1 h-full">
        <div className="flex h-full flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow">
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
              <strong className="font-semibold text-fg">Core thesis:</strong> Closed-loop simulation architecture applied to high-throughput financial calculation.
            </p>
            <a
              href="#story"
              className="group inline-flex shrink-0 items-center gap-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-strong"
            >
              <span>trajectory</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>
      </Column>
    </Board>
  );
}
