import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { Reveal } from "@/components/ui/Reveal";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  projects,
} from "@/data/projects";

/**
 * Pre-render every project at build time. The site is static-first and
 * has no per-request data, so this gives us free SSG.
 */
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: "article",
      images: project.coverImage ? [project.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

/** Pick a CTA label that matches the live-link destination. */
function liveCtaLabel(url: string): string {
  if (url.includes("itch.io")) return "Play on itch.io";
  return "Live demo";
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Adjacent project for "next" navigation, wrapping around the list.
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(idx + 1) % projects.length];

  const meta: [label: string, value: string | undefined][] = [
    ["Role", project.role],
    ["Team", project.team],
    ["Year", project.year],
  ];

  const sections: [title: string, content: string | undefined][] = [
    ["Overview", project.overview],
    ["My contributions", project.contributions],
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["Architecture and core systems", project.architecture],
    ["Technical implementation", project.implementation],
    ["Quantitative methodology", project.quantMethodology],
    ["Challenges", project.challenges],
    ["Results", project.results],
    ["Limitations and assumptions", project.limitations],
    ["Lessons learned", project.lessons],
  ];

  const hasGallery = Boolean(project.gallery?.length);

  return (
    <>
      <article className="pb-24 pt-8">
        <Container className="flex flex-col gap-16">
          <header className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All projects
              </Link>

              <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
                <div className="flex min-w-0 flex-1 basis-[28rem] flex-col gap-3">
                  <h1 className="type-display text-balance">{project.title}</h1>
                  {project.tagline && (
                    <p className="text-lg font-medium leading-snug">{project.tagline}</p>
                  )}
                  <p className="max-w-[38em] text-pretty text-lg leading-relaxed text-fg-muted">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <Button
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      icon="start"
                      aria-label={`View code: ${project.title} on GitHub (opens in new tab)`}
                    >
                      <Github className="h-4 w-4" aria-hidden />
                      View code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant={project.githubUrl ? "secondary" : "primary"}
                      size="lg"
                      icon="end"
                      aria-label={`${liveCtaLabel(project.liveUrl)}: ${project.title} (opens in new tab)`}
                    >
                      {liveCtaLabel(project.liveUrl)}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <dl className="flex flex-wrap gap-x-16 gap-y-4">
              {meta.map(
                ([label, value]) =>
                  value && (
                    <div key={label} className="flex max-w-[24rem] flex-col gap-0.5">
                      <dt className="text-[13px] leading-normal text-fg-subtle">{label}</dt>
                      <dd className="text-[15px] font-medium leading-relaxed tabular-nums">{value}</dd>
                    </div>
                  ),
              )}
              <div className="flex max-w-[34rem] flex-col gap-0.5">
                <dt className="text-[13px] leading-normal text-fg-subtle">Stack</dt>
                <dd className="type-data leading-[1.85]">{project.tags.join(", ")}</dd>
              </div>
            </dl>

            {project.coverImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-card bg-panel card-shadow md:aspect-[21/9]">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-contain"
                  style={project.type === "game" ? { imageRendering: "pixelated" } : undefined}
                />
              </div>
            )}
          </header>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-10 lg:col-span-8">
              {sections.map(
                ([title, content]) =>
                  content && <CaseStudySection key={title} title={title} content={content} />,
              )}
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <aside className="lg:col-span-4">
                <div className="sticky top-28 flex flex-col gap-4">
                  <h2 className="type-item">Highlights</h2>
                  <ul className="flex flex-col">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="border-t border-border-strong py-3 text-sm leading-[1.55] text-fg-muted last:pb-0"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>

          {hasGallery ? (
            <Reveal as="section" className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="type-card">Screens</h2>
                <p className="text-sm leading-[1.55] text-fg-muted">
                  Select an image to see it at full size.
                </p>
              </div>
              <ImageGallery items={project.gallery!} pixelated={project.type === "game"} />
            </Reveal>
          ) : (
            !project.coverImage && (
              <section className="flex flex-col items-center gap-6 border-t border-border-strong px-6 pt-12 text-center">
                <div className="flex max-w-[30em] flex-col gap-2">
                  <h2 className="type-card">No screenshots yet</h2>
                  <p className="text-pretty text-[15px] leading-relaxed text-fg-muted">
                    {project.title} has nothing to show on screen yet. Screens will appear here
                    once there is a build to capture.
                  </p>
                </div>
              </section>
            )
          )}

          <Link
            href={`/projects/${nextProject.slug}`}
            aria-label={`Next project: ${nextProject.title}`}
            className="card-link flex items-center justify-between gap-6 rounded-card border border-border bg-surface px-6 py-6 card-shadow hover:bg-surface-soft sm:px-8"
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-[13px] leading-normal text-fg-subtle">Next project</p>
              <p className="type-item">{nextProject.title}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </Container>
      </article>
      <Footer />
    </>
  );
}

interface CaseStudySectionProps {
  title: string;
  content: string;
}

/**
 * One case-study section. Content where every line starts with a bullet
 * is rendered as a real list, with a leading "Label:" set in bold.
 */
function CaseStudySection({ title, content }: CaseStudySectionProps) {
  const lines = content.split("\n").filter((line) => line.trim().length > 0);
  const isBulletList =
    lines.length > 0 &&
    lines.every(
      (line) => line.trim().startsWith("•") || line.trim().startsWith("-"),
    );

  return (
    <Reveal as="section">
      <h2 className="type-item">{title}</h2>
      {isBulletList ? (
        <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 text-base leading-relaxed text-fg-muted marker:text-fg-subtle">
          {lines.map((line) => {
            const clean = line.replace(/^[•\-]\s*/, "");
            const colonIndex = clean.indexOf(":");
            return (
              <li key={line}>
                {colonIndex > -1 ? (
                  <>
                    <strong className="font-semibold text-fg">
                      {clean.slice(0, colonIndex)}:
                    </strong>
                    {clean.slice(colonIndex + 1)}
                  </>
                ) : (
                  clean
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-fg-muted">
          {content}
        </p>
      )}
    </Reveal>
  );
}
