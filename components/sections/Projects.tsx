import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GameProjectCard } from "@/components/ui/GameProjectCard";
import { Decor } from "@/components/pixel/Decor";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import {
  getGameProjects,
  getSoftwareAndQuantProjects,
} from "@/data/projects";
import { profile } from "@/data/profile";

/**
 * Projects Section.
 * Structured into Software & Quant engineering and Playable Game Design.
 */
export function Projects() {
  const software = getSoftwareAndQuantProjects();
  const games = getGameProjects();

  return (
    <Section
      id="projects"
      eyebrow="Featured Systems & Builds"
      title="Verified Projects"
      description="Live demonstrations, open-source repositories, and playable game design case studies."
      className="relative border-t-2 border-border"
    >
      <Decor
        kind="controller"
        size={28}
        className="absolute right-10 top-10 hidden lg:block opacity-60"
      />

      {/* 1. Software & Quantitative Finance Systems */}
      <div className="mb-14 md:mb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
              <PixelIcon name="code" size={14} />
              [ PRIMARY: FULL-STACK & QUANTITATIVE SYSTEMS ]
            </div>
            <h3 className="mt-1 font-mono text-xl font-bold tracking-tight text-fg sm:text-2xl">
              Software & Quant Engineering
            </h3>
          </div>
          <p className="max-w-xl text-xs text-fg-muted font-mono sm:text-sm">
            High-precision financial ledgers, REST APIs, and SciPy optimization pipelines.
          </p>
        </div>

        {software.length === 0 ? (
          <p className="text-fg-muted font-mono text-sm">
            No software projects registered.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {software.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* 2. Game Development & Design */}
      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2e681c]">
              <PixelIcon name="gamepad" size={14} />
              [ HERITAGE: GAME TECHNOLOGY & INTERACTION ]
            </div>
            <h3 className="mt-1 font-mono text-xl font-bold tracking-tight text-fg sm:text-2xl">
              Game Design & Architecture
            </h3>
          </div>
          <p className="max-w-xl text-xs text-fg-muted font-mono sm:text-sm">
            Unity state machines, gameplay mechanics, and national game jam finalists.
          </p>
        </div>

        {games.length === 0 ? (
          <p className="text-fg-muted font-mono text-sm">
            No game projects registered.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {games.map((project) => (
              <GameProjectCard
                key={project.slug}
                project={project}
                githubHandle={profile.githubHandle}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}