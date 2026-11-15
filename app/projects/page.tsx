import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProjectBrowser } from "@/components/ui/ProjectBrowser";
import { getProjectsByCategory } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Complete portfolio archive across software engineering, quantitative finance, and game technology by Dio Stania Adinata.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "Complete portfolio archive across software engineering, quantitative finance, and game technology.",
    type: "website",
  },
};

export default function ProjectsPage() {
  const groups = getProjectsByCategory();

  // Only the fields a card needs cross to the client, not the case studies.
  const projects = groups
    .flatMap((group) => group.projects)
    .map(({ slug, title, shortDescription, category, coverImage, year, tags, techStack, type }) => ({
      slug,
      title,
      shortDescription,
      category,
      coverImage,
      year,
      tags,
      techStack,
      type,
    }));

  return (
    <>
      <Container className="flex flex-col gap-10 pb-24 pt-14">
        <div className="flex flex-col gap-3">
          <h1 className="type-section">Projects</h1>
          <p className="max-w-[34em] text-pretty text-lg leading-relaxed text-fg-muted">
            {projects.length} projects across quantitative finance, full-stack systems, simulation
            and games.
          </p>
        </div>

        <ProjectBrowser projects={projects} categories={groups.map((group) => group.category)} />
      </Container>
      <Footer />
    </>
  );
}
