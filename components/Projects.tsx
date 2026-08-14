import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { GameProjectCard } from "@/components/GameProjectCard";
import { Decor } from "@/components/pixel/Decor";
import {
  getGameProjects,
  getSoftwareAndQuantProjects,
} from "@/data/projects";
import { profile } from "@/data/profile";

/**
 * Featured projects — light theme. Two visual sections, with a small
 * pixel-art decoration between them. Same content, same structure.
 */
export function Projects() {
  const software = getSoftwareAndQuantProjects();
  const games = getGameProjects();

  return (
    <Section
      id="projects"
      eyebrow="Featured Work"
      title="Projects."
      description="The strongest evidence of what I build. Divided into my current direction (software engineering and quantitative finance) and my heritage (game development)."
      className="relative border-t border-border"
    >
      <Decor
        kind="arrow"
        size={28}
        className="absolute right-10 top-10 hidden lg:block"
      />

      {/* Software & Quant — primary */}
      <div className="mb-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Current direction</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Software & Quantitative Finance
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-fg-muted sm:text-base">
              Where I'm heading — full-stack systems, numerical
              methods, and the engineering behind real financial software.
            </p>
          </div>
        </div>

        {software.length === 0 ? (
          <p className="text-fg-muted">
            No software / quant projects yet. Add some to{" "}
            <code className="font-mono text-fg">data/projects.ts</code>.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {software.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Game Development — secondary */}
      <div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Heritage</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Game Development
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-fg-muted sm:text-base">
              Where I started — game technology and game design, the
              foundation for my systems-thinking and the way I
              approach complex software today.
            </p>
          </div>
        </div>

        {games.length === 0 ? (
          <p className="text-fg-muted">
            No game projects yet. Add some to{" "}
            <code className="font-mono text-fg">data/projects.ts</code>.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
