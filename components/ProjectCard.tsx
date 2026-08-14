import Link from "next/link";
import { ArrowUpRight, Github, Layers } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { Tag } from "@/components/Tag";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * Reusable project card — light theme. White card on sky-blue, soft
 * shadow, hover lifts the shadow and tints the border orange.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
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
        className="relative h-32 overflow-hidden border-b border-border bg-surface-soft"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,107,53,0.10) 0%, rgba(220,238,255,0) 60%)",
          }}
        />
        <div className="absolute inset-0 bg-pixel-grid opacity-50" />
        <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700">
            <Layers className="h-3 w-3" aria-hidden />
            {project.category}
          </span>
          <span
            aria-hidden
            className="font-mono text-[10px] text-fg-subtle"
          >
            {project.year ? `${project.year} · ` : ""}
            {`/${project.slug}`}
          </span>
        </div>
      </div>

      <div className="relative z-0 flex flex-1 flex-col p-6">
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
              className="relative z-20 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface-soft px-2.5 text-xs text-fg-muted transition-colors hover:border-orange-700/40 hover:text-fg"
              aria-label={`${project.title} — GitHub repository (opens in new tab)`}
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
