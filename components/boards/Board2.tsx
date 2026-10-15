import { Board } from "@/components/layout/Board";
import { Column } from "@/components/layout/Column";
import { projects, requireProject } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Board2() {
  const actura = requireProject("actura");
  const optimizer = requireProject("portfolio-optimizer");
  const bookItQuick = requireProject("book-it-quick");

  return (
    <Board
      id="work"
      gutter="normal"
      className="scroll-mt-20"
      header={
        <div className="border-b border-border pb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {"// SELECTED WORK"}
          </span>
        </div>
      }
    >
      {/* Hidden anchor element for #projects backward compatibility */}
      <span id="projects" className="sr-only" />

      {/* Variety (Left Column, ~42% width) — Supporting Projects & The Full-Stack Bridge */}
      <Column role="variety" className="lg:w-[42%] flex-1 h-full">
        <div className="flex h-full flex-col justify-between gap-5 lg:gap-6">
          {/* Portfolio Optimizer — Algorithmic Allocation & Risk */}
          <Link
            href={`/projects/${optimizer.slug}`}
            className="card-link group flex flex-1 flex-col justify-between overflow-hidden rounded-card border border-border bg-surface card-shadow"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                <span className="text-fg-subtle">Quantitative allocation</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-bold text-accent-strong">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  LIVE TOOL
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-fg transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                {optimizer.title}
              </h3>

              {/* What it is & What problem it solves */}
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-fg-muted sm:text-[15px]">
                Calculates the Markowitz Efficient Frontier to discover mathematically optimal asset weights, stress-testing allocations with 10,000 Monte Carlo paths and tail-risk metrics (VaR/CVaR 95%).
              </p>

              {/* What Dio built */}
              <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-border pt-3 font-mono text-xs text-fg-subtle">
                <span className="font-semibold text-fg">Built:</span>
                <span>SciPy SLSQP optimization · 10,000-path stochastic engine</span>
              </div>
            </div>

            {/* Stylized Efficient Frontier Chart Graphic */}
            <div className="relative h-[150px] w-full overflow-hidden border-t border-border bg-[#0f1b2d]">
              <div className="absolute top-3 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-[#7a8aa0]">
                EFFICIENT FRONTIER · MAX SHARPE
              </div>

              <div className="absolute top-3 right-4 z-10 font-mono text-[10px] uppercase tracking-widest text-[#c8e2f5]">
                OPTIMAL W*
              </div>

              <svg
                viewBox="0 0 320 150"
                className="absolute inset-0 h-full w-full select-none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Grid lines */}
                <line x1="0" y1="40" x2="320" y2="40" stroke="#1f2f47" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="320" y2="80" stroke="#1f2f47" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="320" y2="120" stroke="#1f2f47" strokeDasharray="3 3" />
                <line x1="80" y1="0" x2="80" y2="150" stroke="#1f2f47" strokeDasharray="3 3" />
                <line x1="160" y1="0" x2="160" y2="150" stroke="#1f2f47" strokeDasharray="3 3" />
                <line x1="240" y1="0" x2="240" y2="150" stroke="#1f2f47" strokeDasharray="3 3" />

                {/* Monte Carlo Cloud points */}
                <circle cx="85" cy="125" r="2" fill="#7a8aa0" opacity="0.35" />
                <circle cx="105" cy="110" r="2" fill="#7a8aa0" opacity="0.45" />
                <circle cx="120" cy="120" r="2" fill="#7a8aa0" opacity="0.35" />
                <circle cx="135" cy="95" r="2" fill="#7a8aa0" opacity="0.55" />
                <circle cx="150" cy="105" r="2" fill="#7a8aa0" opacity="0.45" />
                <circle cx="165" cy="85" r="2" fill="#7a8aa0" opacity="0.55" />
                <circle cx="180" cy="92" r="2" fill="#7a8aa0" opacity="0.45" />
                <circle cx="205" cy="78" r="2" fill="#7a8aa0" opacity="0.55" />
                <circle cx="225" cy="72" r="2" fill="#7a8aa0" opacity="0.45" />
                <circle cx="250" cy="68" r="2" fill="#7a8aa0" opacity="0.55" />

                {/* Hyperbolic Efficient Frontier Curve */}
                <path
                  d="M 40 140 Q 80 80 135 52 T 300 32"
                  fill="none"
                  stroke="#c2410c"
                  strokeWidth="2.5"
                />

                {/* Optimal Sharpe Point */}
                <circle cx="135" cy="52" r="4.5" fill="#c2410c" />
                <circle cx="135" cy="52" r="8" fill="#c2410c" opacity="0.3" />
              </svg>
            </div>
          </Link>

          {/* Book-it-quick — The Software Engineering Ledger Bridge */}
          <Link
            href={`/projects/${bookItQuick.slug}`}
            className="card-link group flex flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                <span>Software engineering bridge</span>
                <span className="font-normal">SDUST · CHINA</span>
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-fg transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                {bookItQuick.title}
              </h3>

              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-fg-muted sm:text-[15px]">
                An enterprise-grade double-entry financial ledger enforcing strict transactional consistency, automated multi-currency conversion, and zero decimal loss.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-3 font-mono text-xs">
              <span className="text-fg-subtle">Java · Spring Boot · Vue · MySQL</span>
              <span className="flex items-center gap-1 font-semibold text-accent transition-transform duration-200 group-hover:translate-x-1">
                case study <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </Link>

          {/* Pinned Floor — Perfectly Aligned on Bottom with Actura */}
          <div className="mt-auto border-t border-border pt-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-fg-muted transition-colors hover:text-accent"
            >
              <span>all {projects.length} projects, incl. games</span>
              <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </Column>

      {/* Anchor (Right Column, ~58% width) — Actura Flagship Engineering Platform */}
      <Column role="anchor" className="lg:w-[58%] shrink-0 h-full">
        <Link
          href={`/projects/${actura.slug}`}
          className="card-link group relative flex min-h-[520px] lg:min-h-[660px] h-full w-full flex-col justify-between overflow-hidden rounded-card border border-border bg-[#0a121e] card-shadow"
        >
          {/* Top HUD: Technical Signpost */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0a121e]/85 px-6 py-4 backdrop-blur-md sm:px-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd2bd]">
                ACTUARIAL CASH-FLOW SIMULATION ENGINE
              </span>
            </div>
            <span className="hidden font-mono text-[11px] uppercase tracking-wider text-[#9ec5e6] sm:inline">
              VUE 3 · FASTAPI · DOCKER
            </span>
          </div>

          {/* Cover Screenshot: DAG graph prominently displayed with clear visibility */}
          <div className="relative min-h-[280px] lg:min-h-[420px] flex-1 w-full overflow-hidden bg-[#0a121e]">
            {actura.coverImage ? (
              <Image
                src={actura.coverImage}
                alt={actura.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top opacity-95 transition-transform duration-700 group-hover:scale-[1.015]"
              />
            ) : (
              <div className="bg-grid absolute inset-0 opacity-40" />
            )}
            {/* Subtle bottom gradient strictly behind the transition to the text panel, not covering the image */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a121e] to-transparent pointer-events-none" />
          </div>

          {/* Integrated Readout Panel: What it is, Problem solved, What Dio built */}
          <div className="relative z-20 border-t border-white/15 bg-[#0a121e]/95 p-6 backdrop-blur-md sm:p-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    FLAGSHIP SYSTEM
                  </span>
                  <span className="font-mono text-xs text-white/50">· 2026</span>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {actura.title}
              </h3>

              {/* What it is & Problem it solves */}
              <p className="max-w-[62ch] text-sm leading-relaxed text-[#c8e2f5] sm:text-[15px]">
                Calculates Best Estimate Liabilities (BEL) and regulatory solvency by evaluating future cash-flow dependencies across thousands of insurance policies under stochastic interest-rate and mortality scenarios.
              </p>

              {/* What Dio built */}
              <div className="mt-1 flex flex-col justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                <p className="font-mono text-xs leading-relaxed text-white/80">
                  <strong className="font-semibold text-accent">What I built:</strong> The Directed Acyclic Graph (DAG) dependency execution engine in Python/FastAPI and the interactive Vue 3 parameter workbench.
                </p>

                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-[background-color,transform] duration-200 group-hover:translate-x-1 group-hover:bg-accent-strong">
                    read case study <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Column>
    </Board>
  );
}
