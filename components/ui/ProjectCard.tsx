import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BaseProject, ProjectItem } from "@/types/portfolio";
import { Cloud } from "@/components/pixel/Cloud";
import { cn } from "@/lib/cn";

/** The fields a card needs. A full `ProjectItem` satisfies it. */
export type ProjectCardData = Pick<
  BaseProject,
  "slug" | "title" | "shortDescription" | "category" | "coverImage" | "year" | "tags" | "techStack"
> &
  Pick<ProjectItem, "type">;

interface ProjectCardProps {
  project: ProjectCardData;
  /** Heading level that fits the page outline. */
  heading?: "h2" | "h3";
  /** Load the cover eagerly; set for cards visible on first paint (LCP). */
  eager?: boolean;
}

/**
 * Project card. The whole card is one link to the case study, so there
 * are no nested anchors. The image sits 12px inside the 20px card, which
 * is why its radius is 8px.
 */
export function ProjectCard({ project, heading: Heading = "h3", eager = false }: ProjectCardProps) {
  const stack = (project.techStack ?? project.tags).slice(0, 4).join(", ");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-link group flex h-full flex-col rounded-card border border-border bg-surface p-3 text-fg card-shadow"
    >
      <div className="relative aspect-video overflow-hidden rounded-sm bg-bg-deep">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            fill
            loading={eager ? "eager" : undefined}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            className={cn(
              "object-cover",
              // UI screenshots read best from the top; game art keeps its centred crop.
              project.type === "game" ? "object-center" : "object-top",
            )}
          />
        ) : (
          <Cloud size="md" className="absolute inset-0 m-auto" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-5">
        <div className="flex items-center justify-between gap-4">
          <Heading className="type-item">{project.title}</Heading>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-fg-subtle transition-colors duration-200 group-hover:text-accent"
            aria-hidden
          />
        </div>
        <p className="line-clamp-3 text-pretty text-[15px] leading-relaxed text-fg-muted">
          {project.shortDescription}
        </p>
        <div className="mt-auto flex items-baseline justify-between gap-4 pt-2 text-fg-subtle">
          <p className="type-data">{stack}</p>
          {project.year && <p className="type-data shrink-0">{project.year}</p>}
        </div>
      </div>
    </Link>
  );
}
