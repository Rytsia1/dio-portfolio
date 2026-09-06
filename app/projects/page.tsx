import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GameProjectCard } from "@/components/ui/GameProjectCard";
import { Footer } from "@/components/layout/Footer";
import { Decor } from "@/components/pixel/Decor";
import {
  getAllSoftwareAndQuantProjects,
  getAllGameProjects,
} from "@/data/projects";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "Complete portfolio archive across software engineering, quantitative finance, and game technology by Dio Stania Adinata.",
  openGraph: {
    title: `All Projects | ${siteConfig.name}`,
    description:
      "Complete portfolio archive across software engineering, quantitative finance, and game technology.",
    type: "website",
  },
};

export default function ProjectsPage() {
  const software = getAllSoftwareAndQuantProjects();
  const games = getAllGameProjects();

  return (
    <div className="pt-24 sm:pt-28">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 opacity-50"
        />
        <Container className="relative py-12 sm:py-16">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to Home
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Portfolio Archive
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl">
              All Projects
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
              A complete catalogue of work across software engineering, quantitative finance, computational systems, and game technology.
            </p>
          </Reveal>
        </Container>
      </header>

      {/* Main content */}
      <div className="py-14 sm:py-18">
        <Container>
          {/* Section 1: Software & Quant */}
          <section id="software" className="mb-16">
            <Reveal className="mb-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">
                Current Direction
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Software & Quantitative Finance
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-fg-muted sm:text-base">
                Production full-stack applications, numerical methods, stochastic simulations, and risk analytics.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {software.map((project, idx) => (
                <Reveal key={project.slug} delay={idx * 0.05}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* Section 2: Game Technology */}
          <section id="games" className="border-t border-border pt-14">
            <Reveal className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
                    Foundations & Systems
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    Game Technology
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-fg-muted sm:text-base">
                    Interactive systems, gameplay architecture, and mechanics prototyping that built my systems-oriented engineering mindset.
                  </p>
                </div>
                <Decor
                  kind="star"
                  size={24}
                  className="hidden sm:block text-accent/50"
                />
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {games.map((project, idx) => (
                <Reveal key={project.slug} delay={idx * 0.05}>
                  <GameProjectCard
                    project={project}
                    githubHandle={profile.githubHandle}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        </Container>
      </div>

      <Footer />
    </div>
  );
}
