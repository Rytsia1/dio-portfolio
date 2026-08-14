import Link from "next/link";
import { ArrowUpRight, Github, Gamepad2, Cpu, Wrench, Zap } from "lucide-react";
import type { GameProject } from "@/types/portfolio";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

interface GameProjectCardProps {
  project: GameProject;
  githubHandle: string;
  className?: string;
}

/**
 * Game development project card — light theme. Slightly more playful
 * than the standard card (a Gamepad2 icon and an achievement badge)
 * but uses the same white-card-on-sky-blue treatment.
 *
 * When the project supplies `engine`, `assetsTools`, and/or
 * `coreMechanics`, a dedicated "Tech Stack" panel is rendered between
 * the description and the general tag list. The engine badge uses the
 * site accent colour so it stands out immediately to recruiters; asset
 * tools use a complementary sky-blue tone; mechanics appear as smaller
 * indigo pills.
 */
export function GameProjectCard({
  project,
  githubHandle,
  className,
}: GameProjectCardProps) {
  const hasEngine = Boolean(project.engine);
  const hasAssets = Boolean(project.assetsTools?.length);
  const hasMechanics = Boolean(project.coreMechanics?.length);
  const hasTechStack = hasEngine || hasAssets || hasMechanics;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all",
        "hover:border-accent/40 hover:card-shadow",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open case study: ${project.title}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Open case study: {project.title}</span>
      </Link>

      {/* ── Card header ──────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="relative h-40 overflow-hidden border-b border-border bg-surface-soft"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(194,65,12,0.12) 0%, rgba(220,238,255,0) 55%)",
          }}
        />
        <div className="absolute inset-0 bg-pixel-grid opacity-50" />
        <span
          aria-hidden
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-orange-700"
        >
          <Gamepad2 className="h-4 w-4" />
        </span>
        <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700">
            {project.category}
          </span>
          <span className="font-mono text-[10px] text-fg-subtle">
            {project.year ?? "—"} · {`/${project.slug}`}
          </span>
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────────────── */}
      <div className="relative z-0 flex flex-1 flex-col p-6">

        {/* Achievement badge */}
        {project.achievement && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-800">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-orange-600" />
            {project.achievement}
          </span>
        )}

        <h3 className="text-lg font-semibold tracking-tight text-fg">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {project.shortDescription}
        </p>

        {/* ── Tech Stack panel ─────────────────────────────────────────── */}
        {hasTechStack && (
          <div className="mt-5 rounded-xl border border-border bg-surface-soft p-3">

            {/* Section label */}
            <p
              aria-label="Tech stack"
              className="mb-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-fg-subtle"
            >
              Tech Stack
            </p>

            {/* Engine + Asset-tool badges ─────────────────────────────── */}
            {(hasEngine || hasAssets) && (
              <div className="flex flex-wrap gap-2">

                {/* Engine: most prominent — deep orange, bold mono (contrast 7.8:1, AAA) */}
                {project.engine && (
                  <div
                    className="flex items-center gap-1.5 rounded-lg border border-orange-300 bg-orange-50 px-2.5 py-1.5"
                    title="Game engine"
                  >
                    <Cpu
                      className="h-3 w-3 shrink-0 text-orange-700"
                      aria-hidden
                    />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-orange-800">
                      {project.engine}
                    </span>
                  </div>
                )}

                {/* Asset tools: sky-blue — visually distinct, still crisp */}
                {project.assetsTools?.map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1.5"
                    title="Asset creation tool"
                  >
                    <Wrench
                      className="h-3 w-3 shrink-0 text-sky-600"
                      aria-hidden
                    />
                    <span className="font-mono text-[11px] font-semibold text-sky-700">
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Core mechanics: small indigo pill tags ─────────────────── */}
            {hasMechanics && (
              <ul
                aria-label="Core mechanics"
                className={cn(
                  "flex flex-wrap gap-1.5",
                  (hasEngine || hasAssets) && "mt-2",
                )}
              >
                {project.coreMechanics!.map((mechanic) => (
                  <li key={mechanic}>
                    <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                      <Zap className="h-2.5 w-2.5 shrink-0" aria-hidden />
                      {mechanic}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── General tech tags ────────────────────────────────────────── */}
        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        {/* ── Footer actions ───────────────────────────────────────────── */}
        <div className="mt-auto flex items-center gap-2 pt-5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface-soft px-2.5 text-xs text-fg-muted transition-colors hover:border-orange-700/40 hover:text-fg"
              aria-label={`${project.title} — ${githubHandle} on GitHub (opens in new tab)`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              Code
            </a>
          )}
          <span
            className="relative z-20 ml-auto inline-flex h-8 items-center gap-1.5 rounded-full border border-transparent px-2 text-xs font-medium text-orange-700 transition-colors group-hover:border-orange-300 group-hover:text-orange-800"
            aria-hidden
          >
            Case study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}