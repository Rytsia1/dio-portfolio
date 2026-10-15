import { Board } from "@/components/layout/Board";
import { Column } from "@/components/layout/Column";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Board3() {
  const narrativeSteps = [
    {
      domain: "GAME TECHNOLOGY (PENS)",
      story:
        "Started in game development, learning to think in closed simulation loops, optimize memory under strict hardware limits, and enforce deterministic frame budgets.",
    },
    {
      domain: "SOFTWARE ENGINEERING",
      story:
        "Moved into distributed backend engineering. Realized that network sync, concurrency, and transactional APIs run on the exact same principles of latency budgets and state constraints.",
    },
    {
      domain: "DATA & COMPUTATION (SDUST)",
      story:
        "Deepened into computational architecture. Built enterprise ledgers where floating-point loss is unacceptable and dependencies must resolve through Directed Acyclic Graphs (DAGs).",
    },
    {
      domain: "QUANTITATIVE SYSTEMS",
      story:
        "Culminated in stochastic modeling and financial simulation. Evaluating 10,000 Monte Carlo paths and actuarial liabilities using the same deterministic mindset built in game engines.",
    },
  ];

  const experience = [
    {
      org: "Asah / Dicoding",
      when: "NOW",
      role: "AI Full-Stack Developer Apprenticeship",
      href: "https://www.dicoding.com/asah",
      note: "Architecting AI-powered production full-stack systems.",
      rail: "border-accent",
    },
    {
      org: "Google",
      when: "2026",
      role: "Google Student Ambassador",
      href: "https://googlestudentambassador.id/",
      note: "Student technology community role supporting tech learning, engagement, and knowledge sharing among students.",
      rail: "border-accent",
    },
    {
      org: "Shandong Univ. (SDUST)",
      when: "2026",
      role: "Full-Stack Software Engineer Intern",
      note: "Enterprise ledger reconciliation & decimal precision.",
      rail: "border-border-strong",
    },
    {
      org: "GECH Surabaya",
      when: "2024",
      role: "Junior Game Designer",
      note: "Simulation state machines, battle math, and player state flow.",
      rail: "border-border",
    },
  ];

  const arsenal = [
    { label: "Languages", value: "Python · Java · TypeScript · C# · SQL" },
    { label: "Frameworks", value: "FastAPI · Spring Boot · Vue 3 · Unity" },
    { label: "Computing", value: "NumPy · SciPy · Docker Compose" },
  ];

  const subheading = "font-mono text-xs font-bold uppercase tracking-[0.14em] text-fg";

  return (
    <Board
      id="story"
      gutter="normal"
      className="scroll-mt-20 pb-8 md:pb-10 lg:pb-10"
      header={
        <div className="border-b border-border pb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
            {"// THE TRAJECTORY"}
          </span>
        </div>
      }
    >
      {/* Anchor (Left Column, ~56% width) — The Connected Story Arc */}
      <Column role="anchor" className="lg:w-[56%] shrink-0 h-full">
        <div className="flex h-full lg:min-h-[560px] flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
              THE NARRATIVE ARC
            </span>

            <h3 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
              Why an Unusual Trajectory is an Engineering Advantage
            </h3>

            <p className="mt-4 max-w-[60ch] text-pretty text-base leading-relaxed text-fg sm:text-lg">
              Most engineers view game development and quantitative finance as unrelated worlds. In practice, they require the exact same mental models: <strong>latency budgets, deterministic simulation loops, and memory locality.</strong>
            </p>

            {/* The 4-Act Storyline */}
            <div className="mt-6 border-t border-border pt-6">
              <ol className="relative space-y-5 border-l-2 border-accent/40 pl-6 sm:space-y-6">
                {narrativeSteps.map((step, idx) => (
                  <li key={step.domain} className="relative">
                    {/* Visual Spine Node */}
                    <span
                      aria-hidden
                      className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-surface ${
                        idx === 3 ? "bg-accent scale-115" : "bg-accent/50"
                      }`}
                    />

                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-bold text-accent">
                        0{idx + 1}
                      </span>
                      <h4
                        className={`font-mono text-xs font-bold uppercase tracking-wider sm:text-sm ${
                          idx === 3 ? "text-accent" : "text-fg"
                        }`}
                      >
                        {step.domain}
                      </h4>
                    </div>

                    <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-fg-muted sm:text-[15px]">
                      {step.story}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Core Thesis Statement Pinned to Floor */}
          <div className="mt-6 flex items-baseline gap-3 border-t border-border pt-4">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-xs bg-accent" />
            <p className="font-mono text-xs font-bold uppercase tracking-wide text-fg sm:text-[13px]">
              The game-engine mindset is the bedrock the quant systems run on.
            </p>
          </div>
        </div>
      </Column>

      {/* Variety (Right Column, ~44% width) — Verified Technical Record */}
      <Column role="variety" className="lg:w-[44%] flex-1 h-full">
        <div className="flex h-full flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow">
          <div>
            <div className="border-b border-border pb-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                TECHNICAL RECORD
              </span>
            </div>

            {/* Work History */}
            <div className="mt-6">
              <span className={subheading}>EXPERIENCE</span>
              <div className="mt-4 flex flex-col gap-4">
                {experience.map((job) => (
                  <div key={job.org} className={`border-l-2 pl-4 ${job.rail}`}>
                    <div className="flex items-baseline justify-between gap-3 font-mono">
                      <span className="text-xs font-bold text-fg">{job.org}</span>
                      <span
                        className={`text-[11px] font-bold ${
                          job.when === "NOW" ? "text-accent" : "text-fg-subtle"
                        }`}
                      >
                        {job.when}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-fg sm:text-[15px]">
                      {job.href ? (
                        <a
                          href={job.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${job.role} program page (opens in new tab)`}
                          className="group/link inline-flex items-center gap-1 rounded-sm underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                        >
                          {job.role}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-fg-subtle transition-[color,transform] duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent"
                            aria-hidden
                          />
                        </a>
                      ) : (
                        job.role
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                      {job.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-6 border-t border-border pt-4">
              <span className={subheading}>CORE ARSENAL</span>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 font-mono text-xs text-fg-muted sm:text-[13px]">
                {arsenal.map((row) => (
                  <div key={row.label} className="contents">
                    <dt className="font-bold text-accent">{row.label}:</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Recognition */}
            <div className="mt-6 border-t border-border pt-4">
              <span className={subheading}>RECOGNITION</span>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-fg-muted">
                <li>
                  ▪ <strong className="text-fg">Gameseed 2025 Top 60</strong> (
                  <Link
                    href="/projects/wacky-whackers"
                    className="rounded-sm text-fg underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                  >
                    Wacky Whackers
                  </Link>
                  )
                </li>
                <li>▪ <strong className="text-fg">Shandong University</strong> Exchange Awardee</li>
                <li>▪ <strong className="text-fg">Temasek ITE SCALE</strong> Programme Award</li>
              </ul>
            </div>
          </div>

          {/* Location Floor */}
          <div className="mt-6 flex flex-col items-start gap-1 rounded-xl border border-border bg-surface-soft px-4 py-3 font-mono text-xs card-shadow-soft sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="font-bold uppercase tracking-wider text-fg-muted">
              LOCATION
            </span>
            <span className="font-bold uppercase tracking-wider text-fg">
              SURABAYA, ID · REMOTE READY (UTC+7)
            </span>
          </div>
        </div>
      </Column>
    </Board>
  );
}
