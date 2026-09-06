import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GameProjectCard } from "@/components/ui/GameProjectCard";
import { Decor } from "@/components/pixel/Decor";
import {
  getGameProjects,
  getSoftwareAndQuantProjects,
} from "@/data/projects";
import { profile } from "@/data/profile";

/**
 * Selected Work — curated homepage project section.
 *
 * Web/quant projects are presented first and prominently.
 * One game project is shown in a visually de-emphasised secondary
 * block to demonstrate the origin background without letting it
 * dominate the narrative.
 */
export function Projects() {
  const software = getSoftwareAndQuantProjects();
  // Only show the first (strongest) game project on the homepage.
  const games = getGameProjects().slice(0, 1);

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Projects."
      description="A curated set of things I have built. Current direction first — software engineering and quantitative finance — followed by where I started."
      className="relative border-t border-border"
    >
      <Decor
        kind="arrow"
        size={28}
        className="absolute right-10 top-10 hidden lg:block"
      />

      {/* Software & Quant — primary */}
      <div className="mb-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Current direction</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Software & Quantitative Finance
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-fg-muted sm:text-base">
              Full-stack systems, numerical methods, and the engineering
              behind real financial software.
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

      {/* Game Development — secondary, visually quieter */}
      {games.length > 0 && (
        <div className="border-t border-border pt-10">
          <div className="mb-6">
            <p className="eyebrow text-fg-subtle">Heritage</p>
            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-fg">
              Game Technology
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm text-fg-muted">
              Where I started — the origin of my systems-thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {games.map((project) => (
              <GameProjectCard
                key={project.slug}
                project={project}
                githubHandle={profile.githubHandle}
              />
            ))}
          </div>
        </div>
      )}

      {/* View All link */}
      <div className="mt-10 flex justify-center border-t border-border pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-fg card-shadow-soft"
        >
          View all projects
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}


