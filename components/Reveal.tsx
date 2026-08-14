"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Lazy feature loader
// ---------------------------------------------------------------------------
// Declared at module scope so every <Reveal> instance shares the same
// function reference. framer-motion uses this reference as a cache key,
// and the browser's dynamic-import registry ensures the chunk is fetched
// exactly once per page session regardless of how many instances exist.
//
// `domAnimation` = the minimal framer-motion feature bundle covering:
//   • opacity / transform / basic CSS transitions
//   • whileInView / IntersectionObserver viewport detection
// Intentionally excludes drag, layout animations, and inertia (domMax),
// keeping the lazy chunk as small as possible.
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

// Stable cubic-bezier — extracted to avoid allocating a new array each render.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------------------
// Client-detection store (useSyncExternalStore)
// ---------------------------------------------------------------------------
// All three functions are module-level constants so their references are
// stable across all renders and across all Reveal instances on the page.
//
// useSyncExternalStore is the React-idiomatic way to hold different server
// and client snapshot values without triggering a hydration mismatch:
//
//   getServerSnapshot → returned during SSR AND during the very first client
//     render (the hydration pass), so the DOM React produces on the client
//     matches the HTML the server already sent.
//
//   getClientSnapshot → returned for every render after hydration is
//     confirmed. Switching from false → true causes one synchronous
//     re-render that upgrades the static branch to the animated branch.
//
// This approach avoids the setState-inside-useEffect pattern flagged by
// @eslint-react/hooks-extra/no-direct-set-state-in-use-effect, while
// giving every Reveal instance on the page the exact same transition tick
// (concurrent-mode safe — no tearing between sibling Reveal nodes).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const subscribe = (_: () => void) => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type As = "div" | "ul" | "ol" | "li" | "section";

interface RevealProps {
  children: ReactNode;
  /** Extra Tailwind classes forwarded to the wrapper element. */
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Semantic HTML element to render. Defaults to "div". */
  as?: As;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Viewport-triggered fade + slide-up entrance animation.
 *
 * ── Bundle optimisation ───────────────────────────────────────────────────
 *
 * Before:  import { motion } from "framer-motion"
 *   `motion` pre-bundles every feature (drag, layout, inertia …) into
 *   the initial JS chunk, increasing parse/eval time even for features that
 *   are never used on a given page.
 *
 * After:   import { LazyMotion, m } from "framer-motion"
 *   `m` components are tiny shells that delegate feature resolution to a
 *   parent `LazyMotion`. The `domAnimation` bundle is code-split into a
 *   separate async chunk that loads after the critical path has rendered,
 *   so it never blocks First Contentful Paint.
 *
 * ── SSR / FCP guarantee ──────────────────────────────────────────────────
 *
 * framer-motion serialises `initial` props as inline styles during SSR.
 * A naïve implementation would ship `opacity:0` in the static HTML —
 * hiding content from crawlers and hurting FCP scores.
 *
 * The `isClient` gate (powered by useSyncExternalStore) keeps a plain
 * semantic element active for:
 *   (a) the server render        → content fully visible in static HTML
 *   (b) the hydration render     → matches server HTML exactly; no
 *                                  mismatch, no console warning
 *
 * After hydration React switches to the client snapshot (true), triggering
 * one synchronous re-render that mounts the animated branch. At that point:
 *   • Elements below the fold    → start at opacity:0, but are off-screen;
 *                                  they animate in as the user scrolls.
 *   • Elements already in view   → whileInView fires immediately on mount,
 *                                  so the animation plays at once.
 *
 * ── Accessibility ────────────────────────────────────────────────────────
 *
 * useReducedMotion permanently holds the static branch, stripping all
 * framer-motion overhead for users who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  // ── Static branch ─────────────────────────────────────────────────────────
  // Active on the server, during the hydration pass, and permanently for
  // users who prefer reduced motion. Children are always fully visible here.
  if (!isClient || reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // ── Animated branch (client-only, post-hydration) ─────────────────────────
  // LazyMotion strict mode ensures no full `motion.*` components slip through
  // the tree accidentally (acts as a tree-shaking guard).
  const motionProps = {
    initial:     { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: "-60px" } as const,
    transition:  { duration: 0.55, delay, ease: EASE },
    className:   cn(className),
  };

  // Resolve the correct m.* element before the JSX return so LazyMotion
  // wraps a single child with no conditional rendering inside it.
  const inner = (() => {
    switch (as) {
      case "ul":      return <m.ul      {...motionProps}>{children}</m.ul>;
      case "ol":      return <m.ol      {...motionProps}>{children}</m.ol>;
      case "li":      return <m.li      {...motionProps}>{children}</m.li>;
      case "section": return <m.section {...motionProps}>{children}</m.section>;
      default:        return <m.div     {...motionProps}>{children}</m.div>;
    }
  })();

  return (
    <LazyMotion features={loadFeatures} strict>
      {inner}
    </LazyMotion>
  );
}
