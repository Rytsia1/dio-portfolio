import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/pixel/Mascot";
import { Decor } from "@/components/pixel/Decor";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { profile } from "@/data/profile";

const HERO_ANIM_CSS = `
  @keyframes hero-in {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  #top .hero-in {
    animation: hero-in 0.4s steps(4) both;
  }
  @media (prefers-reduced-motion: reduce) {
    #top .hero-in { animation: none; }
  }
`;

/**
 * Hero Section. Authentic retro developer HUD & character profile.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <style>{HERO_ANIM_CSS}</style>

      {/* Decorative Pixel Stars */}
      <Decor
        kind="star"
        size={24}
        className="absolute right-16 top-40 hidden sm:block opacity-75"
      />
      <Decor
        kind="star"
        size={20}
        className="absolute left-12 top-64 hidden sm:block opacity-60"
      />

      <Container className="relative flex min-h-[82vh] flex-col justify-center py-12 sm:py-16">
        {/* 1. Status Indicator */}
        <div className="hero-in mb-4 inline-flex w-fit items-center gap-2 rounded border-2 border-fg bg-surface px-3 py-1 font-mono text-xs font-bold text-fg shadow-[2px_2px_0px_0px_#0f1b2d] [animation-delay:0ms]">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 bg-[#6cc04a] animate-pulse"
          />
          {"[ STATUS: READY // OPEN FOR ROLES ]"}
        </div>

        {/* 2. Developer Name */}
        <h1
          id="hero-heading"
          className="hero-in text-balance headline-display text-fg [animation-delay:50ms]"
        >
          {profile.name}
        </h1>

        {/* 3. Role & Specialization */}
        <p className="hero-in mt-3 font-mono text-base font-bold text-accent sm:text-xl [animation-delay:100ms]">
          {profile.role}{" "}
          <span className="text-fg-muted font-normal">
            {"// Game Design · Systems Engineering · Quant"}
          </span>
        </p>

        {/* 4. Tagline */}
        <p className="hero-in mt-4 max-w-2xl font-mono text-sm leading-relaxed text-fg-muted sm:text-base [animation-delay:150ms]">
          {profile.tagline}
        </p>

        {/* 5. Primary CTAs */}
        <div className="hero-in mt-8 flex flex-wrap items-center gap-3 [animation-delay:200ms]">
          <Button
            href="#projects"
            variant="primary"
            size="lg"
            aria-label="View technical projects and games"
          >
            <PixelIcon name="gamepad" size={16} />
            Explore Projects
            <PixelIcon name="arrow-right" size={14} />
          </Button>

          <Button
            href={profile.resumeUrl}
            variant="secondary"
            size="lg"
            aria-label={profile.resumeLabel}
          >
            <PixelIcon name="file-text" size={14} />
            {profile.resumeLabel}
          </Button>
        </div>

        {/* 6. Direct Contact & Social Links */}
        <ul className="hero-in mt-8 flex flex-wrap items-center gap-2.5 [animation-delay:250ms]">
          <li>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded border border-border bg-surface px-3 font-mono text-xs font-bold text-fg-muted shadow-[2px_2px_0px_0px_rgba(15,27,45,0.1)] hover:border-fg hover:text-fg active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              aria-label={`GitHub ${profile.githubHandle} (opens in new tab)`}
            >
              <PixelIcon name="github" size={14} />
              GitHub
            </a>
          </li>
          <li>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded border border-border bg-surface px-3 font-mono text-xs font-bold text-fg-muted shadow-[2px_2px_0px_0px_rgba(15,27,45,0.1)] hover:border-fg hover:text-fg active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              aria-label={`LinkedIn ${profile.linkedinHandle} (opens in new tab)`}
            >
              <PixelIcon name="linkedin" size={14} />
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={profile.email}
              className="inline-flex h-9 items-center gap-2 rounded border border-border bg-surface px-3 font-mono text-xs font-bold text-fg-muted shadow-[2px_2px_0px_0px_rgba(15,27,45,0.1)] hover:border-fg hover:text-fg active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              aria-label="Send email"
            >
              <PixelIcon name="mail" size={14} />
              Email
            </a>
          </li>
        </ul>

        {/* 7. Scroll indicator */}
        <div className="hero-in mt-10 hidden items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-fg-subtle sm:flex [animation-delay:300ms]">
          <span aria-hidden="true" className="block h-0.5 w-10 bg-border-strong" />
          [ SCROLL DOWN ]
        </div>
      </Container>

      {/* Mascot Parallax Instance */}
      <Mascot
        size={120}
        pose="default"
        trackCursor
        reactToScroll
        className="absolute bottom-10 right-6 hidden md:block"
      />
    </section>
  );
}