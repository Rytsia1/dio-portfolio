import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Gamepad2, Layers, Cpu, Wrench, Zap } from "lucide-react";
import type { ProjectItem } from "@/types/portfolio";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: ProjectItem;
  githubHandle: string;
  /** Load the cover eagerly; set for cards visible on first paint (LCP). */
  eager?: boolean;
  className?: string;
}

/**
 * Project card used for every project on the /projects archive.
 *
 * Header: the cover image (or a soft gradient fallback) with the category,
 * year, and slug overlaid, plus a type icon (gamepad for games, stack for
 * software). Body: optional achievement badge, title, summary, a game-only
 * "Tech Stack" panel (engine, asset tools, core mechanics), tags, and the
 * Code / Case study footer.
 */
export function ProjectCard({ project, githubHandle, eager = false, className }: ProjectCardProps) {
  const hasEngine = Boolean(project.engine);
  const hasAssets = Boolean(project.assetsTools?.length);
  const hasMechanics = Boolean(project.coreMechanics?.length);
  const hasTechStack = hasEngine || hasAssets || hasMechanics;
  const TypeIcon = project.type === "game" ? Gamepad2 : Layers;
  const badges = project.techStack?.slice(0, 6) ?? project.tags.slice(0, 5);

  return (
    <article
      className={cn(
        "card-link group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface",
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
        className="relative h-44 overflow-hidden border-b border-border bg-surface-soft"
      >
        {project.coverImage ? (
          <>
            <Image
              src={project.coverImage}
              alt={`${project.title} cover image`}
              fill
              loading={eager ? "eager" : undefined}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-105",
                // UI screenshots read best from the top; game art keeps its centred crop.
                project.type === "game" ? "object-center" : "object-top",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fg/80 via-fg/20 to-transparent" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(194,65,12,0.12) 0%, rgba(220,238,255,0) 55%)",
              }}
            />
            <div className="absolute inset-0 bg-pixel-grid opacity-50" />
          </>
        )}
        <span
          aria-hidden
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-surface/90 text-orange-700 backdrop-blur-sm card-shadow-soft"
        >
          <TypeIcon className="h-4 w-4" />
        </span>
        <div className="absolute inset-x-5 bottom-4 flex items-center justify-between gap-3">
          <span
            className={cn(
              "font-mono text-[10px] font-semibold uppercase tracking-[0.18em]",
              project.coverImage ? "text-white" : "text-orange-700",
            )}
          >
            {project.category}
          </span>
          <span
            className={cn(
              "shrink-0 font-mono text-[10px]",
              project.coverImage ? "text-white/85" : "text-fg-subtle",
            )}
          >
            {project.year ? `${project.year} · ` : ""}
            {`/${project.slug}`}
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

        {/* ── Tech Stack panel (game projects only) ────────────────────── */}
        {hasTechStack && (
          <div className="mt-5 rounded-xl border border-border bg-surface-soft p-3">
            <p
              aria-label="Tech stack"
              className="mb-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-fg-subtle"
            >
              Tech Stack
            </p>

            {(hasEngine || hasAssets) && (
              <div className="flex flex-wrap gap-2">
                {project.engine && (
                  <div
                    className="flex items-center gap-1.5 rounded-lg border border-orange-300 bg-orange-50 px-2.5 py-1.5"
                    title="Game engine"
                  >
                    <Cpu className="h-3 w-3 shrink-0 text-orange-700" aria-hidden />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-orange-800">
                      {project.engine}
                    </span>
                  </div>
                )}

                {project.assetsTools?.map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1.5"
                    title="Asset creation tool"
                  >
                    <Wrench className="h-3 w-3 shrink-0 text-sky-600" aria-hidden />
                    <span className="font-mono text-[11px] font-semibold text-sky-700">
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            )}

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

        {/* ── Tech stack badges (verified techStack, else first tags) ─── */}
        {badges.length > 0 && (
          <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
            {badges.map((tag) => (
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
              aria-label={`${project.title}: ${githubHandle} on GitHub (opens in new tab)`}
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
