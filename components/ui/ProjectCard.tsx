import Link from "next/link";
import type { WebProject } from "@/types/portfolio";
import { Tag } from "@/components/ui/Tag";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: WebProject;
  className?: string;
}

/**
 * Technical Software & Quant Project Card.
 * Styled with crisp pixel borders, real demo links, and zero marketing fluff.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-border bg-surface shadow-[3px_3px_0px_0px_rgba(15,27,45,0.14)] transition-all hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(194,65,12,0.3)]",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} technical breakdown`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View technical details: {project.title}</span>
      </Link>

      {/* Retro Spec Header */}
      <div
        aria-hidden="true"
        className="relative border-b-2 border-border bg-surface-soft px-5 py-3.5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
            <PixelIcon name="layers" size={14} />
            {project.category}
          </span>
          <span className="font-mono text-[11px] font-semibold text-fg-subtle">
            {project.year ? `${project.year} / ` : ""}
            {project.slug}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="relative z-0 flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-mono text-lg font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-fg-muted font-mono">
          {project.shortDescription}
        </p>

        {/* Tech Stack Matrix */}
        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-3 border-t border-border/70 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex items-center gap-1.5 rounded border border-accent bg-accent-soft px-2.5 py-1 text-xs font-mono font-bold text-accent hover:bg-accent hover:text-white transition-colors"
              aria-label={`${project.title} live demo (opens in new tab)`}
            >
              <PixelIcon name="play" size={12} />
              Live Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex items-center gap-1.5 rounded border border-border bg-surface-soft px-2.5 py-1 text-xs font-mono font-medium text-fg-muted hover:border-fg hover:text-fg transition-colors"
              aria-label={`${project.title} GitHub repository (opens in new tab)`}
            >
              <PixelIcon name="github" size={12} />
              Source
            </a>
          )}

          <span className="relative z-20 ml-auto inline-flex items-center gap-1 text-xs font-mono font-bold text-accent">
            Details
            <PixelIcon name="arrow-up-right" size={12} />
          </span>
        </div>
      </div>
    </article>
  );
}