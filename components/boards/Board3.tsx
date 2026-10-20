import { Board } from "@/components/layout/Board";
import { Column } from "@/components/layout/Column";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

export function Board3() {
  const narrativeSteps = [
    {
      domain: "GAME TECHNOLOGY FOUNDATIONS (PENS)",
      story:
        "Learned object-oriented programming in C#, state machines, turn/tick-based simulation loops, and relational database design for game systems.",
    },
    {
      domain: "BACKEND & WEB ENGINEERING (SDUST EXCHANGE)",
      story:
        "Expanded into full-stack web development using Java (Spring Boot), Python (FastAPI), Vue 3, and SQL—building REST APIs and a bookkeeping app.",
    },
    {
      domain: "EXPLORING QUANTITATIVE & FINANCIAL SOFTWARE",
      story:
        "Started applying simulation logic and numerical libraries (NumPy, SciPy) to financial problems—building an actuarial cash-flow engine (Actura) and a portfolio optimization tool.",
    },
  ];
  const lastStep = narrativeSteps.length - 1;

  const experience = [
    {
      org: "Asah / Dicoding",
      when: "NOW",
      role: "AI Full-Stack Developer Apprenticeship",
      href: "https://www.dicoding.com/asah",
      note: "Completing the AI Full-Stack Developer learning path (Dicoding & GoTo), building web applications and integrating LLM/AI APIs into backend services.",
      rail: "border-accent",
    },
    {
      org: "Google",
      when: "NOW",
      role: "Google Student Ambassador",
      href: "https://googlestudentambassador.id/",
      note: "Organizing campus developer workshops, facilitating peer study groups on Google technologies and AI tools, and sharing technical learning resources with students at PENS.",
      rail: "border-accent",
    },
    {
      org: "Shandong University of Science and Technology (SDUST)",
      when: "MAR–JUL 2026",
      role: "Exchange Student — Software Engineering",
      note: "One-semester exchange in Software Engineering in Qingdao, China. Coursework included a 10-day software production module, where I built Book-it-quick.",
      rail: "border-border-strong",
    },
    {
      org: "GECH Surabaya",
      when: "2024 – JAN 2025",
      role: "Junior Game Designer",
      note: "Simulation state machines, battle math, and player state flow.",
      rail: "border-border",
    },
  ];

  const arsenal = [
    { label: "Languages", items: ["Python", "Java", "TypeScript / JavaScript", "C#", "SQL"] },
    { label: "Frameworks", items: ["FastAPI", "Spring Boot", "Vue 3", "Streamlit", "Unity", "Godot"] },
    { label: "Data & Infrastructure", items: ["NumPy", "SciPy", "Plotly", "ECharts", "MySQL", "SQLite", "Docker"] },
  ];

  const card = "rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow";
  const eyebrow = "font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle";
  const inlineLink =
    "rounded-sm text-fg underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent";

  return (
    <Board
      id="story"
      gutter="normal"
      className="scroll-mt-20 pb-8 md:pb-10 lg:pb-10"
      header={
        <div className="border-b border-border pb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
            {"// BACKGROUND"}
          </span>
        </div>
      }
    >
      {/* Anchor (Left Column, ~56% width) — The Connected Story Arc */}
      <Column role="anchor" className="lg:w-[56%] shrink-0 lg:h-auto">
        <div className="flex flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
              LEARNING PATH
            </span>

            <h3 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
              From Game Systems to Backend &amp; Quantitative Tools
            </h3>

            <p className="mt-4 max-w-[60ch] text-pretty text-base leading-relaxed text-fg sm:text-lg">
              Studying Game Technology introduced me to programming through simulation loops, state machines, and probability math. Along the way, I realized the parts I enjoyed most weren&apos;t graphics or level design—they were data modeling, system logic, and numerical simulation.
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
                        idx === lastStep ? "bg-accent scale-115" : "bg-accent/50"
                      }`}
                    />

                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-bold text-accent">
                        0{idx + 1}
                      </span>
                      <h4
                        className={`font-mono text-xs font-bold uppercase tracking-wider sm:text-sm ${
                          idx === lastStep ? "text-accent" : "text-fg"
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
              Different domain, familiar building blocks: clear state rules, structured data, and reproducible calculations.
            </p>
          </div>
        </div>

        {/* Core Arsenal: flex-1 absorbs leftover lg height so Learning Path has no dead band */}
        <div className={`${card} flex-1`}>
          <div className="border-b border-border pb-3">
            <span className={eyebrow}>CORE ARSENAL</span>
          </div>
          <dl className="mt-4 flex flex-col gap-4">
            {arsenal.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-xs font-bold text-accent">{row.label}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {row.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Column>

      {/* Variety (Right Column, ~44% width) — Verified Technical Record */}
      <Column role="variety" className="lg:w-[44%] flex-1 lg:h-auto">
        <div className="flex flex-1 flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow">
          <div>
            <div className="border-b border-border pb-3">
              <span className={eyebrow}>EXPERIENCE</span>
            </div>

            {/* Work History */}
            <div>
              <div className="mt-4 flex flex-col gap-4">
                {experience.map((job) => (
                  <div key={job.org} className={`border-l-2 pl-4 ${job.rail}`}>
                    <div className="flex items-baseline justify-between gap-3 font-mono">
                      <span className="text-xs font-bold text-fg">{job.org}</span>
                      <span
                        className={`shrink-0 text-[11px] font-bold ${
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

        {/* Recognition */}
        <div className={card}>
          <div className="border-b border-border pb-3">
            <span className={eyebrow}>RECOGNITION</span>
          </div>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
            <li>
              ▪ <strong className="text-fg">Gameseed 2025: Top 60 of 122 teams</strong> with the Unity game{" "}
              <Link href="/projects/wacky-whackers" className={inlineLink}>
                Wacky Whackers
              </Link>
              .
            </li>
            <li>
              ▪ <strong className="text-fg">KMIPN 2025 Finalist</strong> with the multiplayer educational simulation game{" "}
              <Link href="/projects/makan-siang-bergizi" className={inlineLink}>
                Makan Siang Bergizi
              </Link>
              .
            </li>
            <li>
              ▪ <strong className="text-fg">SDUST Exchange Award (2026)</strong>: scholarship awardee for a one-semester international exchange in Software Engineering at Shandong University of Science and Technology, China.
            </li>
            <li>
              ▪ <strong className="text-fg">Temasek ITE SCALE Programme Award (2025)</strong>: selected as a Temasek Foundation scholarship awardee for a cross-cultural technical and leadership exchange programme in Singapore.
            </li>
          </ul>
        </div>
      </Column>
    </Board>
  );
}
