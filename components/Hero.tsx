import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Cloud } from "@/components/pixel/Cloud";
import { Mascot } from "@/components/pixel/Mascot";
import { Decor } from "@/components/pixel/Decor";
import { profile } from "@/data/profile";

/**
 * Hero — light editorial design. Sky-blue canvas, white CTAs, orange
 * accent on the role, pixel-art clouds and a mascot for personality.
 * Same content as before — only the styling is updated.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Pixel-art clouds drifting in the sky */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-12 flex justify-between px-6 sm:px-12"
      >
        <Cloud size="md" variant={1} className="opacity-95" />
        <Cloud size="sm" variant={2} className="hidden opacity-90 sm:block" />
        <Cloud size="lg" variant={3} className="hidden opacity-90 md:block" />
      </div>

      {/* Small pixel-art decorations */}
      <Decor
        kind="star"
        size={24}
        className="absolute right-16 top-40 hidden sm:block"
      />
      <Decor
        kind="star"
        size={20}
        className="absolute left-12 top-64 hidden sm:block"
      />

      <Container className="relative flex min-h-[calc(100vh-6rem)] flex-col justify-center py-24 sm:py-32">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-fg-muted backdrop-blur">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
            Open to engineering opportunities
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1
            id="hero-heading"
            className="text-balance headline-display text-fg"
          >
            <span>{profile.name}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 text-lg font-semibold text-accent sm:text-xl">
            {profile.role}
            <span className="ml-2 text-fg-muted">— building systems, exploring the craft.</span>
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              aria-label="View featured projects"
            >
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href={profile.resumeUrl}
              variant="secondary"
              size="lg"
              aria-label={profile.resumeLabel}
            >
              <Download className="h-4 w-4" aria-hidden />
              {profile.resumeLabel}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <ul className="mt-10 flex flex-wrap items-center gap-2">
            <li>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3.5 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg card-shadow-soft"
                aria-label={`GitHub ${profile.githubHandle} (opens in new tab)`}
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3.5 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg card-shadow-soft"
                aria-label={`LinkedIn ${profile.linkedinHandle} (opens in new tab)`}
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.email}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3.5 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg card-shadow-soft"
                aria-label="Send email"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-16 hidden items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-fg-subtle sm:flex"
        >
          <span aria-hidden className="block h-px w-12 bg-border-strong" />
          Scroll
        </Reveal>
      </Container>

      {/* Mascot in the bottom corner */}
      <Mascot
        size={120}
        className="absolute bottom-10 right-6 hidden md:block"
      />
    </section>
  );
}
