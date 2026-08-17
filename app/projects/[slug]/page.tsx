import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  projects,
} from "@/data/projects";

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
    title: `${project.title} | Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.shortDescription,
      type: "article",
      images: project.coverImage ? [project.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.shortDescription,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

function liveCtaLabel(url: string): string {
  if (url.includes("itch.io")) return "Play on Itch.io";
  if (url.includes("streamlit.app")) return "Open Quant App";
  return "Live Demo";
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-24 sm:pt-28 font-mono">
      {/* Header / Hero */}
      <header className="relative overflow-hidden border-b-2 border-border bg-surface-soft/60">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        />
        <Container className="relative py-12 sm:py-16">
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1 text-xs font-bold text-fg shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5"
            >
              <PixelIcon name="arrow-left" size={12} />
              Back to Projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 font-mono text-xs font-bold uppercase tracking-wider text-accent">
              {`[ ${project.category} // /${project.slug} ]`}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-fg sm:text-5xl">
              {project.title}
            </h1>
          </Reveal>

          {project.tagline && (
            <Reveal delay={0.12}>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
                {project.tagline}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-fg-muted sm:text-base">
              {project.overview}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag emphasis={project.type === "game" ? "game" : "accent"}>
                    {tag}
                  </Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={project.type === "game" ? "arcade" : "primary"}
                  size="lg"
                  aria-label={`${project.title} - ${liveCtaLabel(project.liveUrl)}`}
                >
                  {project.type === "game" ? (
                    <PixelIcon name="gamepad" size={16} />
                  ) : (
                    <PixelIcon name="play" size={14} />
                  )}
                  {liveCtaLabel(project.liveUrl)}
                  <PixelIcon name="external-link" size={14} />
                </Button>
              )}

              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <PixelIcon name="github" size={16} />
                  View Source Code
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Cover Image Showcase */}
      {project.coverImage ? (
        <Container className="my-8">
          <Reveal>
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden border-2 border-border bg-surface shadow-[4px_4px_0px_0px_rgba(15,27,45,0.15)]">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-contain w-full h-full p-4"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </Reveal>
        </Container>
      ) : null}

      {/* Case Study Details */}
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8 space-y-10">
            <CaseStudySection title="[ OVERVIEW ]" content={project.overview} />
            {project.problem && (
              <CaseStudySection title="[ PROBLEM STATEMENT ]" content={project.problem} />
            )}
            {project.solution && (
              <CaseStudySection title="[ PROPOSED SOLUTION ]" content={project.solution} />
            )}
            {project.architecture && (
              <CaseStudySection
                title="[ ARCHITECTURE & SYSTEMS ]"
                content={project.architecture}
              />
            )}
            {project.implementation && (
              <CaseStudySection
                title="[ TECHNICAL IMPLEMENTATION ]"
                content={project.implementation}
              />
            )}
            {project.challenges && (
              <CaseStudySection
                title="[ ENGINEERING CHALLENGES ]"
                content={project.challenges}
              />
            )}
            {project.results && (
              <CaseStudySection title="[ RESULTS & BENCHMARKS ]" content={project.results} />
            )}
            {project.lessons && (
              <CaseStudySection
                title="[ LESSONS LEARNED ]"
                content={project.lessons}
              />
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Highlights panel */}
              <div className="rounded-xl border-2 border-border bg-surface p-5 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.1)]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-border pb-2">
                  [ KEY HIGHLIGHTS ]
                </h2>
                {project.highlights && project.highlights.length > 0 ? (
                  <ul className="mt-3.5 space-y-2.5 text-xs text-fg-muted font-mono">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="pixel-bullet" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-xs text-fg-subtle">
                    No highlights recorded.
                  </p>
                )}
              </div>

              {/* Tech Stack panel */}
              <div className="rounded-xl border-2 border-border bg-surface p-5 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.1)]">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent border-b border-border pb-2">
                  <PixelIcon name="layers" size={13} />
                  [ TECHNOLOGY MATRIX ]
                </h2>
                <ul className="mt-3.5 flex flex-wrap gap-1.5">
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

        {/* Screenshot / Visual Assets Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <Reveal className="mt-14 border-t-2 border-border pt-12 sm:mt-16">
            <div className="mb-6 flex items-center gap-2.5 border-b border-border pb-3">
              <PixelIcon name="images" size={16} className="text-accent" />
              <div>
                <h2 className="font-mono text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  Screenshots & Gameplay Captures
                </h2>
                <p className="mt-1 font-mono text-xs text-fg-muted">
                  Visual assets, HUD interface, and in-game captures from {project.title}.
                </p>
              </div>
            </div>
            <ImageGallery items={project.gallery} />
          </Reveal>
        )}
      </Container>

      {/* Next Project Footer */}
      <Container className="border-t-2 border-border py-12">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between gap-6 rounded-xl border-2 border-border bg-surface p-6 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.1)] transition-all hover:border-accent hover:bg-surface-soft hover:shadow-[4px_4px_0px_0px_rgba(194,65,12,0.3)] active:translate-x-0.5 active:translate-y-0.5"
          aria-label={`Next project: ${nextProject.title}`}
        >
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent">
              [ NEXT CASE STUDY ]
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-fg">
              {nextProject.title}
            </p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded border border-border bg-surface-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors">
            <PixelIcon name="arrow-right" size={14} />
          </span>
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
    <Reveal className="border-b border-border/60 pb-8 last:border-b-0 font-mono">
      <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-accent">
        {title}
      </h2>
      {isBulletList ? (
        <ul className="mt-3.5 space-y-3">
          {lines.map((line, idx) => {
            const clean = line.replace(/^[•\-]\s*/, "");
            const colonIndex = clean.indexOf(":");
            if (colonIndex > -1) {
              const label = clean.slice(0, colonIndex);
              const rest = clean.slice(colonIndex + 1);
              return (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-fg-muted font-mono"
                >
                  <span aria-hidden="true" className="pixel-bullet" />
                  <span>
                    <strong className="font-bold text-fg">{label}:</strong>
                    {rest}
                  </span>
                </li>
              );
            }
            return (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-fg-muted font-mono"
              >
                <span aria-hidden="true" className="pixel-bullet" />
                <span>{clean}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-3 whitespace-pre-line text-xs sm:text-sm leading-relaxed text-fg-muted font-mono">
          {content}
        </p>
      )}
    </Reveal>
  );
}
