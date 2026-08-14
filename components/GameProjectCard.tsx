import Link from "next/link";
import { ArrowUpRight, Github, Gamepad2 } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { Tag } from "@/components/Tag";
import { cn } from "@/lib/cn";

interface GameProjectCardProps {
  project: Project;
  githubHandle: string;
  className?: string;
}

/**
 * Game development project card — light theme. Slightly more playful
 * than the standard card (a Gamepad2 icon and an achievement badge)
 * but uses the same white-card-on-sky-blue treatment.
 */
export function GameProjectCard({
  project,
  githubHandle,
  className,
}: GameProjectCardProps) {
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

      <div
        aria-hidden
        className="relative h-40 overflow-hidden border-b border-border bg-surface-soft"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.12) 0%, rgba(220,238,255,0) 55%)",
          }}
        />
        <div className="absolute inset-0 bg-pixel-grid opacity-50" />
        <span
          aria-hidden
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-accent"
        >
          <Gamepad2 className="h-4 w-4" />
        </span>
        <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            {project.category}
          </span>
          <span className="font-mono text-[10px] text-fg-subtle">
            {project.year ?? "—"} · {`/${project.slug}`}
          </span>
        </div>
      </div>

      <div className="relative z-0 flex flex-1 flex-col p-6">
        {project.achievement && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {project.achievement}
          </span>
        )}
        <h3 className="text-lg font-semibold tracking-tight text-fg">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {project.shortDescription}
        </p>

        {project.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center gap-2 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface-soft px-2.5 text-xs text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
              aria-label={`${project.title} — ${githubHandle} on GitHub (opens in new tab)`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              Code
            </a>
          )}
          <span
            className="relative z-20 ml-auto inline-flex h-8 items-center gap-1.5 rounded-full border border-transparent px-2 text-xs font-medium text-accent transition-colors group-hover:border-accent/30"
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
