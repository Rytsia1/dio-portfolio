import Image from "next/image";
import Link from "next/link";
import type { GameProject } from "@/types/portfolio";
import { Tag } from "@/components/ui/Tag";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { cn } from "@/lib/cn";

interface GameProjectCardProps {
  project: GameProject;
  githubHandle: string;
  className?: string;
}

/**
 * Arcade & Game Project Showcase Card.
 * Prioritizes playable builds (Itch.io), engine mechanics, and interactive game systems.
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
        "group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-border bg-surface shadow-[3px_3px_0px_0px_rgba(15,27,45,0.14)] transition-all hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(194,65,12,0.3)]",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open game design case study: ${project.title}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Open game case study: {project.title}</span>
      </Link>

      {/* Retro Cartridge / Header Visual */}
      <div
        aria-hidden="true"
        className="relative h-48 overflow-hidden border-b-2 border-border bg-surface-soft"
      >
        {project.coverImage ? (
          <>
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fg/85 via-fg/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-pixel-grid opacity-50" />
        )}

        {/* Arcade Badge */}
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded border-2 border-fg bg-[#6cc04a] text-fg shadow-[2px_2px_0px_0px_#0f1b2d]"
        >
          <PixelIcon name="gamepad" size={16} />
        </span>

        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">
            {project.category}
          </span>
          <span className="font-mono text-[11px] text-white/90 font-medium">
            {project.year ? `${project.year} / ` : ""}
            {project.slug}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-0 flex flex-1 flex-col p-5 sm:p-6">
        {/* Achievement Banner */}
        {project.achievement && (
          <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wide text-accent">
            <PixelIcon name="trophy" size={12} />
            {project.achievement}
          </div>
        )}

        <h3 className="font-mono text-lg font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted font-mono">
          {project.shortDescription}
        </p>

        {/* Game Engine & Architecture Panel */}
        {hasTechStack && (
          <div className="mt-4 rounded border border-border bg-surface-soft p-3">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-fg-subtle">
              [ Engine & Core Mechanics ]
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
              {project.engine && (
                <span className="inline-flex items-center gap-1 rounded bg-[#ffede3] border border-accent/30 px-2 py-1 font-mono text-xs font-bold text-accent">
                  <PixelIcon name="terminal" size={11} />
                  {project.engine}
                </span>
              )}

              {project.assetsTools?.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1 rounded bg-sky-50 border border-sky-200 px-2 py-1 font-mono text-xs font-semibold text-sky-800"
                >
                  <PixelIcon name="images" size={11} />
                  {tool}
                </span>
              ))}

              {project.coreMechanics?.map((mechanic) => (
                <span
                  key={mechanic}
                  className="inline-flex items-center gap-1 rounded bg-surface border border-border px-1.5 py-0.5 font-mono text-[11px] text-fg-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-none bg-accent shrink-0" />
                  {mechanic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* General Tags */}
        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag}>
                <Tag emphasis="game">{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        {/* Action Bar */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5 border-t border-border/70 mt-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex items-center gap-1.5 rounded border border-fg bg-[#6cc04a] px-3 py-1 text-xs font-mono font-bold text-fg shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#5bb339] transition-all"
              aria-label={`Play ${project.title} on Itch.io (opens in new tab)`}
            >
              <PixelIcon name="gamepad" size={13} />
              Play on Itch.io
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex items-center gap-1.5 rounded border border-border bg-surface-soft px-2.5 py-1 text-xs font-mono font-medium text-fg-muted hover:border-fg hover:text-fg transition-colors"
              aria-label={`${project.title} on GitHub ${githubHandle} (opens in new tab)`}
            >
              <PixelIcon name="github" size={12} />
              Code
            </a>
          )}

          <span className="relative z-20 ml-auto inline-flex items-center gap-1 text-xs font-mono font-bold text-accent">
            Design doc
            <PixelIcon name="arrow-up-right" size={12} />
          </span>
        </div>
      </div>
    </article>
  );
}