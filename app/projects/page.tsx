import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Footer } from "@/components/layout/Footer";
import { getProjectsByCategory } from "@/data/projects";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "Complete portfolio archive across software engineering, quantitative finance, and game technology by Dio Stania Adinata.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `All Projects | ${siteConfig.name}`,
    description:
      "Complete portfolio archive across software engineering, quantitative finance, and game technology.",
    type: "website",
  },
};

export default function ProjectsPage() {
  const groups = getProjectsByCategory();

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
          {/* One section per category, in PROJECT_CATEGORY_ORDER */}
          {groups.map(({ category, projects }, groupIdx) => {
            return (
              <section
                key={category}
                id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
                className={groupIdx > 0 ? "mt-16 border-t border-border pt-14" : undefined}
              >
                <Reveal className="mb-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {category}
                  </h2>
                </Reveal>

                <div className="grid gap-6 md:grid-cols-2">
                  {projects.map((project, idx) => (
                    <Reveal key={project.slug} delay={idx * 0.05}>
                      <ProjectCard
                        project={project}
                        githubHandle={profile.githubHandle}
                        eager={groupIdx === 0}
                      />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </div>

      <Footer />
    </div>
  );
}
