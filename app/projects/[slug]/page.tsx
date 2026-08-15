import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Gamepad2,
  Github,
  Images,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImageGallery } from "@/components/ui/ImageGallery";
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
  if (url.includes("itch.io")) return "Play on Itch.io";
  return "Live demo";
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  console.log(`[ProjectPage] Re-rendering slug: ${slug}`);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Adjacent project for "next" navigation, wrapping around the list.
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-24 sm:pt-28">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 opacity-50"
        />
        <Container className="relative py-12 sm:py-16">
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-strong">
              {project.category} ·{" "}
              <span className="text-fg-subtle">/{project.slug}</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl">
              {project.title}
            </h1>
          </Reveal>

          {project.tagline && (
            <Reveal delay={0.12}>
              <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong sm:text-sm">
                {project.tagline}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {project.overview}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  aria-label={`${project.title} — GitHub repository (opens in new tab)`}
                >
                  <Github className="h-4 w-4" aria-hidden />
                  View on GitHub
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  aria-label={`${project.title} — ${liveCtaLabel(project.liveUrl)} (opens in new tab)`}
                >
                  {project.liveUrl.includes("itch.io") && (
                    <Gamepad2 className="h-4 w-4" aria-hidden />
                  )}
                  {liveCtaLabel(project.liveUrl)}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Cover image */}
      {project.coverImage ? (
        <Container>
          <Reveal>
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md my-8">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover w-full h-full"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </Reveal>
        </Container>
      ) : null}

      {/* Case-study body */}
      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <CaseStudySection
              title="Overview"
              content={project.overview}
            />
            {project.problem && (
              <CaseStudySection title="Problem" content={project.problem} />
            )}
            {project.solution && (
              <CaseStudySection title="Solution" content={project.solution} />
            )}
            {project.architecture && (
              <CaseStudySection
                title="Architecture & Core Systems"
                content={project.architecture}
              />
            )}
            {project.implementation && (
              <CaseStudySection
                title="Technical Implementation"
                content={project.implementation}
              />
            )}
            {project.challenges && (
              <CaseStudySection
                title="Challenges"
                content={project.challenges}
              />
            )}
            {project.results && (
              <CaseStudySection title="Results" content={project.results} />
            )}
            {project.lessons && (
              <CaseStudySection
                title="Lessons Learned"
                content={project.lessons}
              />
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border bg-surface p-5 card-shadow-soft">
                <h2 className="text-sm font-semibold text-fg">Highlights</h2>
                {project.highlights && project.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-3 text-sm text-fg-muted">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-fg-subtle">
                    Add highlights in{" "}
                    <code className="font-mono text-fg-muted">
                      data/projects.ts
                    </code>
                    .
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-surface p-5 card-shadow-soft">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
                  <Layers className="h-4 w-4 text-accent-strong" aria-hidden />
                  Tech stack
                </h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Screenshot gallery — dedicated Screenshots & Gameplay section */}
        {project.gallery && project.gallery.length > 0 && (
          <Reveal className="mt-14 border-t border-border pt-12 sm:mt-16">
            <div className="mb-6 flex items-center gap-2.5">
              <Images className="h-5 w-5 text-accent-strong" aria-hidden />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-fg">
                  Screenshots & Gameplay
                </h2>
                <p className="mt-1 text-sm text-fg-muted">
                  Visual assets and in-game captures from {project.title}. Click any image to open the full-resolution preview.
                </p>
              </div>
            </div>
            <ImageGallery items={project.gallery} />
          </Reveal>
        )}
      </Container>

      {/* Next-project footer */}
      <Container className="border-t border-border py-12">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between gap-6 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-soft"
          aria-label={`Next project: ${nextProject.title}`}
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-fg-subtle">
              Next project
            </p>
            <p className="mt-2 text-lg font-semibold text-fg">
              {nextProject.title}
            </p>
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
            aria-hidden
          />
        </Link>
      </Container>
    </article>
  );
}

interface CaseStudySectionProps {
  title: string;
  content: string;
}

function CaseStudySection({ title, content }: CaseStudySectionProps) {
  const lines = content.split("\n").filter((line) => line.trim().length > 0);
  const isBulletList =
    lines.length > 0 &&
    lines.every(
      (line) => line.trim().startsWith("•") || line.trim().startsWith("-"),
    );

  return (
    <Reveal className="mb-10 last:mb-0">
      <h2 className="text-xl font-semibold tracking-tight text-fg">{title}</h2>
      {isBulletList ? (
        <ul className="mt-4 space-y-3.5">
          {lines.map((line, idx) => {
            const clean = line.replace(/^[•\-]\s*/, "");
            const colonIndex = clean.indexOf(":");
            if (colonIndex > -1) {
              const label = clean.slice(0, colonIndex);
              const rest = clean.slice(colonIndex + 1);
              return (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-base leading-relaxed text-fg-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>
                    <strong className="font-semibold text-fg">{label}:</strong>
                    {rest}
                  </span>
                </li>
              );
            }
            return (
              <li
                key={idx}
                className="flex items-start gap-3 text-base leading-relaxed text-fg-muted"
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{clean}</span>
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
