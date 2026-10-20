import { Board } from "@/components/layout/Board";
import { Column } from "@/components/layout/Column";
import { requireProject } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ProjectItem } from "@/types/portfolio";
import { cn } from "@/lib/cn";

/**
 * GitHub / live-demo links for a card. The card itself is an <article> with
 * a full-card overlay <Link> (z-10); these sit above it (z-20) so they stay
 * independently clickable without nesting anchors.
 */
function SecondaryLinks({ project, dark = false }: { project: ProjectItem; dark?: boolean }) {
  const pill = cn(
    "relative z-20 inline-flex h-8 items-center gap-1.5 rounded-full border px-3 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200",
    dark
      ? "border-white/20 bg-white/5 text-white/85 hover:border-accent hover:text-white"
      : "border-border bg-surface-soft text-fg-muted hover:border-accent/40 hover:text-fg",
  );
  return (
    <>
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: GitHub repository (opens in new tab)`}
          className={pill}
        >
          <Github className="h-3.5 w-3.5" aria-hidden />
          Code
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: live demo (opens in new tab)`}
          className={pill}
        >
          Live demo
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      )}
    </>
  );
}

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
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
            {"// SELECTED WORK"}
          </span>
        </div>
      }
    >
      {/* Hidden anchor element for #projects backward compatibility */}
      <span id="projects" className="sr-only" />

      {/* Anchor (Left Column, ~58% width) — Actura flagship; first in DOM so it also leads on mobile */}
      <Column role="anchor" className="lg:w-[58%] shrink-0 lg:h-auto">
        <article className="card-link group relative flex min-h-[520px] lg:min-h-[660px] w-full flex-1 flex-col justify-between overflow-hidden rounded-card border border-border bg-[#0a121e] card-shadow">
          {/* Top HUD: Technical Signpost */}
          <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0a121e]/85 px-6 py-4 backdrop-blur-md sm:px-8">
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
          {/* No backdrop-blur here: it would create a stacking context and trap the z-20 links under the card overlay. */}
          <div className="relative border-t border-white/15 bg-[#0a121e]/95 p-6 sm:p-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    FLAGSHIP · SOLO PROJECT
                  </span>
                  <span className="font-mono text-xs text-white/50">· 2026</span>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {actura.title}
              </h3>

              {/* What it is & Problem it solves */}
              <p className="max-w-[62ch] text-sm leading-relaxed text-[#c8e2f5] sm:text-[15px]">
                Values life-insurance liabilities two ways: a deterministic run projects the Best Estimate Liability (BEL) under fixed best-estimate assumptions, and a Monte Carlo run evaluates cash flows across stochastic interest-rate scenarios to produce a liability distribution with VaR / CVaR.
              </p>

              {/* Measured result (tests/performance/test_benchmark.py, tests/test_portfolio.py) */}
              <p className="font-mono text-xs leading-relaxed text-[#9ec5e6]">
                10,000 Monte Carlo paths in 0.07 s · 10,000-policy portfolio valuation in 0.12 s (Ryzen 7 7735HS)
              </p>

              {/* What Dio built */}
              <div className="mt-1 flex flex-col justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                <p className="font-mono text-xs leading-relaxed text-white/80">
                  <strong className="font-semibold text-accent">What I built (solo):</strong> the FastAPI valuation and DAG execution engine, the Vue 3 / Vue Flow logic workbench with ECharts visualizations, and the Docker setup.
                </p>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <SecondaryLinks project={actura} dark />
                  <Button as="span" size="sm" aria-hidden>
                    Case study
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/projects/${actura.slug}`}
            aria-label={`Open case study: ${actura.title}`}
            className="absolute inset-0 z-10 rounded-card"
          />
        </article>
      </Column>

      {/* Variety (Right Column, ~42% width) — supporting projects; flex-auto cards grow from their content, so nothing is clipped */}
      <Column role="variety" className="lg:w-[42%] flex-1 lg:h-auto">
        <div className="flex flex-1 flex-col gap-5 lg:gap-6">
          {/* Portfolio Optimizer — Algorithmic Allocation & Risk */}
          <article className="card-link group relative flex flex-auto flex-col justify-between overflow-hidden rounded-card border border-border bg-surface card-shadow">
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
                Finds the maximum-Sharpe, long-only allocation with SciPy SLSQP, plots it against 10,000 random-weight portfolios, and reports parametric VaR / CVaR (95%) plus historical stress tests.
              </p>

              {/* What Dio built */}
              <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-border pt-3 font-mono text-xs text-fg-subtle">
                <span className="font-semibold text-fg">Built (solo):</span>
                <span>SLSQP optimizer · frontier chart · backtest &amp; stress tests</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <SecondaryLinks project={optimizer} />
                <Button as="span" size="sm" aria-hidden className="ml-auto">
                  Case study
                </Button>
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

            <Link
              href={`/projects/${optimizer.slug}`}
              aria-label={`Open case study: ${optimizer.title}`}
              className="absolute inset-0 z-10 rounded-card"
            />
          </article>

          {/* Book-it-quick — The Software Engineering Ledger Bridge */}
          <article className="card-link group relative flex flex-auto flex-col justify-between rounded-card border border-border bg-surface p-6 sm:p-8 card-shadow">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                <span>Software engineering bridge</span>
                <span className="font-normal">SDUST · CHINA</span>
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-fg transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                {bookItQuick.title}
              </h3>

              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-fg-muted sm:text-[15px]">
                A personal bookkeeping web app built in a 10-day software production module at SDUST. Money is stored as BigDecimal / DECIMAL(15,2) to avoid floating-point drift, with multi-currency conversion and JWT authentication.
              </p>
            </div>

            <div className="mt-4 border-t border-border pt-3">
              <span className="font-mono text-xs text-fg-subtle">Spring Boot · MyBatis · Vue 3 · Element Plus · MySQL · ECharts</span>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <SecondaryLinks project={bookItQuick} />
                <Button as="span" size="sm" aria-hidden className="ml-auto">
                  Case study
                </Button>
              </div>
            </div>

            <Link
              href={`/projects/${bookItQuick.slug}`}
              aria-label={`Open case study: ${bookItQuick.title}`}
              className="absolute inset-0 z-10 rounded-card"
            />
          </article>

          <Button href="/projects" className="self-start">
            All projects
          </Button>
        </div>
      </Column>
    </Board>
  );
}
