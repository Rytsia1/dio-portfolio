import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Cloud } from "@/components/pixel/Cloud";
import { Mascot } from "@/components/pixel/Mascot";
import { Decor } from "@/components/pixel/Decor";
import { profile } from "@/data/profile";

// ---------------------------------------------------------------------------
// CSS animation — server-rendered, zero JS dependency
// ---------------------------------------------------------------------------
// Defined at module scope (string evaluated once, not per-render).
//
// Scoped to `#top` (the section's existing id) so the `.hero-in` class
// name cannot accidentally style elements outside the hero.
//
// React 19 automatically hoists `<style>` elements rendered in Server
// Components to the document `<head>`, deduplicating identical content
// across renders.
//
// `animation-fill-mode: both` applies the `from` state before the delay
// expires and holds the `to` state after the animation completes.
//
// The `prefers-reduced-motion` media query disables the animation entirely
// for users who have opted out of motion in their OS settings, restoring
// instant visibility with no transform or opacity side-effects.
const HERO_ANIM_CSS = `
  @keyframes hero-in {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  #top .hero-in {
    animation: hero-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @media (prefers-reduced-motion: reduce) {
    #top .hero-in { animation: none; }
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Hero — pure Server Component, above the fold, zero client JavaScript.
 *
 * ── Why not <Reveal> here? ────────────────────────────────────────────────
 *
 * `<Reveal>` is designed for below-fold scroll-triggered animations. Using
 * it for above-fold LCP content creates three problems:
 *
 *   1. framer-motion enters the critical JS path. Even with LazyMotion,
 *      the component shells and React hydration overhead are downloaded
 *      before the LCP element is interactive.
 *
 *   2. framer-motion writes `opacity:0` as an inline style during the
 *      client-side animated phase. If the LCP element is already in the
 *      viewport at mount time, there is a brief but measurable frame where
 *      it disappears then reappears — this shows up as a CLS/FCP regression
 *      in Web Vitals traces.
 *
 *   3. `<Reveal>`'s `isMounted` gate renders a plain div on the server,
 *      but the moment `useEffect` fires, it swaps to an `m.div` with
 *      `opacity:0`. For below-fold content this swap is invisible; for
 *      the hero heading (the page's LCP candidate) the swap can be seen.
 *
 * ── What this component does instead ─────────────────────────────────────
 *
 *   • Renders fully static HTML — every word is present in the server
 *     response before any JS downloads (FCP safe, LCP safe, SEO safe).
 *
 *   • Injects a CSS `@keyframes` rule via a server-rendered `<style>`.
 *     The animation begins as soon as the browser parses the HTML stream
 *     and applies styles — well before React hydration or any script runs.
 *
 *   • Staggers each element using Tailwind's arbitrary `[animation-delay:N]`
 *     utility. All positioning and layout remain in Tailwind classes → no
 *     CLS (the CSS `animation` property does not trigger layout reflow).
 *
 *   • The `prefers-reduced-motion` media query in the CSS turns off the
 *     animation entirely for users who have opted out.
 *
 * ── Result ────────────────────────────────────────────────────────────────
 *
 *   No `"use client"` directive  → zero bytes of JS for the Hero section.
 *   Content in static HTML       → FCP / LCP measured from first paint.
 *   CSS animation                → entrance plays before hydration begins.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/*
       * Scoped keyframe definition. React 19 hoists this to <head>.
       * The string is a module-level constant — evaluated once, not
       * recreated on each render.
       */}
      <style>{HERO_ANIM_CSS}</style>

      {/* ── Static pixel-art decoration — no animation ─────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-12 flex justify-between px-6 sm:px-12"
      >
        <Cloud size="md" variant={1} className="opacity-95" />
        <Cloud size="sm" variant={2} className="hidden opacity-90 sm:block" />
        <Cloud size="lg" variant={3} className="hidden opacity-90 md:block" />
      </div>

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

      {/* ── Staggered CSS entrance ─────────────────────────────────────── */}
      {/*
       * Each element carries the `hero-in` animation class plus Tailwind's
       * arbitrary `[animation-delay:Nms]` utility. The delays mirror the
       * original framer-motion stagger (× 1000 → ms):
       *   badge   → 0 ms
       *   h1      → 50 ms
       *   role    → 100 ms
       *   tagline → 150 ms
       *   CTAs    → 200 ms
       *   socials → 250 ms
       *   scroll  → 300 ms
       */}
      <Container className="relative flex min-h-[80vh] flex-col justify-center py-16 sm:py-20 md:py-24">

        {/* 1 — Availability badge ---------------------------------------- */}
        <p className="hero-in mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-fg-muted backdrop-blur sm:mb-6 [animation-delay:0ms]">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          Open to engineering opportunities
        </p>

        {/* 2 — Name (LCP candidate) -------------------------------------- */}
        <h1
          id="hero-heading"
          className="hero-in text-balance headline-display text-fg [animation-delay:50ms]"
        >
          {profile.name}
        </h1>

        {/* 3 — Role ------------------------------------------------------ */}
        <p className="hero-in mt-4 text-lg font-semibold text-accent sm:text-xl [animation-delay:100ms]">
          {profile.role}
          <span className="ml-2 text-fg-muted">
            — building systems, exploring the craft.
          </span>
        </p>

        {/* 4 — Tagline --------------------------------------------------- */}
        <p className="hero-in mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg [animation-delay:150ms]">
          {profile.tagline}
        </p>

        {/* 5 — Primary CTAs ---------------------------------------------- */}
        <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row [animation-delay:200ms]">
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

        {/* 6 — Social links ---------------------------------------------- */}
        <ul className="hero-in mt-8 flex flex-wrap items-center gap-2 [animation-delay:250ms]">
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

        {/* 7 — Scroll indicator ------------------------------------------ */}
        <div className="hero-in mt-10 hidden items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-fg-subtle sm:flex [animation-delay:300ms]">
          <span aria-hidden className="block h-px w-12 bg-border-strong" />
          Scroll
        </div>
      </Container>

      {/* ── Mascot — Hero placement ────────────────────────────────────────
       *
       * This is the ONE fully-interactive mascot instance on the page.
       * It tracks the cursor (head parallax) and bobs/tilts with scroll.
       *
       * A second, distinct "sleeping" instance appears in the Contact
       * section at the bottom of the page — see Contact.tsx.
       * The Footer no longer renders a mascot to avoid a third duplicate.
       */}
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
