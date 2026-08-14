"use client";

import { useEffect, useRef } from "react";
import {
  LazyMotion,
  m,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Lazy feature loader
// ---------------------------------------------------------------------------
// Mirrors `components/Reveal.tsx` — a stable module-scope function
// reference so framer-motion uses it as a cache key, and the browser's
// dynamic-import registry ensures the chunk is fetched exactly once
// per page session regardless of how many <Mascot> instances exist.
//
// `domAnimation` is the minimal framer-motion feature bundle: opacity,
// transform, basic CSS transitions, and viewport detection. No drag,
// layout, or inertia — the cheapest chunk that still supports the
// `useScroll` / `MotionValue` machinery this component needs.
//
// Strict mode is what surfaces the "rendered `motion` inside a
// `LazyMotion`" runtime error — the codebase's `<Reveal>` already runs
// in strict mode, so we match it. This guarantees that any future
// `motion.*` slipped into the file fails loudly at dev time instead
// of silently breaking tree-shaking.
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

interface MascotProps {
  /** Rendered size of the SVG in CSS pixels. */
  size?: number;
  className?: string;
  /** Always hidden from screen readers by default — decorative. */
  ariaHidden?: boolean;
  /**
   * Enable mouse-tracking parallax on the head. Defaults to `true`.
   * Auto-disabled on touch devices and when the user has requested
   * reduced motion (regardless of this prop).
   */
  trackCursor?: boolean;
  /**
   * Enable scroll-driven bob + tilt. Defaults to `true`. Auto-disabled
   * when the user has requested reduced motion.
   */
  reactToScroll?: boolean;
}

// ---------------------------------------------------------------------------
// Motion tuning
// ---------------------------------------------------------------------------
// All numbers are in the SVG's local 16×16 coordinate space.

/** Head parallax range (SVG units). ±0.6 ≈ ±0.6 px at the native 16-grid. */
const HEAD_PARALLAX_RANGE = 0.6;

/** Spring config for the head parallax — slightly under-damped for life. */
const HEAD_SPRING = { stiffness: 120, damping: 18, mass: 0.4 } as const;

/** Scroll-driven downward translation (SVG units, top → bottom of page). */
const SCROLL_BOB_RANGE = 8;

/** Scroll-driven rotation (degrees), top → middle → bottom of page. */
const SCROLL_TILT = { from: 0, mid: 1.5, to: -1.5 } as const;

/** Spring config for the scroll bob + tilt. Stiffer so it tracks scroll. */
const SCROLL_SPRING = { stiffness: 90, damping: 22, mass: 0.6 } as const;

/**
 * Pixel-art "developer at a desk" mascot.
 *
 * ── Interaction model ────────────────────────────────────────────────────
 *
 * The SVG is split into three transform layers:
 *   1. Outer `<m.g>` (the whole mascot) — scroll-driven bob + tilt.
 *   2. Inner `<m.g>` "head" (face + eyes + smile) — cursor parallax.
 *      This is the only part that moves in response to the mouse.
 *   3. Static body group — hair, shirt, arms, laptop, screen.
 *
 * ── Performance ──────────────────────────────────────────────────────────
 *
 * The brief's hard constraint is zero re-renders on `mousemove` /
 * `scroll`. We achieve that with:
 *
 *   • `useMotionValue` for `mouseX` / `mouseY` — mutable numeric refs
 *     that update outside the React render cycle.
 *   • `useSpring` + `useTransform` produce *derived* `MotionValue`s
 *     that also live outside React.
 *   • The `mousemove` handler writes to two `MotionValue`s with
 *     `.set(...)` — a numeric update, not a state update. Zero
 *     re-renders.
 *   • `useScroll` returns a `MotionValue<number>` already attached to
 *     Framer's RAF-throttled scroll listener. No `setState`.
 *   • `style={{ willChange: "transform" }}` on the two `m.g` elements
 *     promotes them to their own compositor layers, so the transform
 *     is handled entirely on the GPU. No paint, no layout, no reflow.
 *
 * ── Touch / reduced-motion guards ────────────────────────────────────────
 *
 * Mouse tracking is gated on `(pointer: coarse) === false`. The CSS
 * `pointer` media feature is the W3C-recommended way to detect
 * touch-first devices and correctly excludes 2-in-1 laptops with a
 * fine pointer. As a fallback, `navigator.maxTouchPoints > 0` is also
 * checked.
 *
 * When the user has `prefers-reduced-motion: reduce`, both mouse and
 * scroll motion are skipped — the mascot renders as a static SVG.
 *
 * ── Pixel-art integrity ──────────────────────────────────────────────────
 *
 * `shapeRendering="crispEdges"` is set on the outer `<svg>` (the
 * SVG-equivalent of `image-rendering: pixelated` for inline SVG —
 * CSS `imageRendering` is a no-op on `<svg>` elements). All motion
 * is `transform`-only, which never re-rasterises the path geometry,
 * so pixel edges stay crisp under every animation frame.
 */
export function Mascot({
  size = 96,
  className,
  ariaHidden = true,
  trackCursor = true,
  reactToScroll = true,
}: MascotProps) {
  const reduce = useReducedMotion() ?? false;

  // ── Motion values (off the React render cycle) ──────────────────────

  // Mouse position, normalised to [-1, +1] from the viewport centre.
  // 0 = cursor at centre, ±1 = cursor at the viewport edge.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed versions of the raw mouse coords. The head uses
  // these so it lags the cursor slightly — feels alive, not snappy.
  const headX = useSpring(
    useTransform(
      mouseX,
      [-1, 1] as number[],
      [-HEAD_PARALLAX_RANGE, HEAD_PARALLAX_RANGE] as number[],
    ),
    HEAD_SPRING,
  );
  const headY = useSpring(
    useTransform(
      mouseY,
      [-1, 1] as number[],
      [-HEAD_PARALLAX_RANGE, HEAD_PARALLAX_RANGE] as number[],
    ),
    HEAD_SPRING,
  );

  // Scroll progress 0..1, then mapped to a downward translation and a
  // small tilt. Spring-smoothed so the bob and tilt are silky.
  //
  // Both `useTransform` calls below have their input/output arrays
  // widened to `number[]` — without that, TypeScript would infer the
  // output as a union of literal types (e.g. `0 | 1` for the bob
  // range, `0 | 1.5 | -1.5` for the tilt range), and `useSpring`
  // only accepts `MotionValue<number>`. The runtime values are
  // unchanged.
  const { scrollYProgress } = useScroll();
  const scrollBob = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1] as number[],
      [0, SCROLL_BOB_RANGE] as number[],
    ),
    SCROLL_SPRING,
  );
  const scrollTilt = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5, 1] as number[],
      [SCROLL_TILT.from, SCROLL_TILT.mid, SCROLL_TILT.to] as number[],
    ),
    SCROLL_SPRING,
  );

  // Refs for the transformable groups. Both are static refs (no
  // setter used) — they're just there so React can attach the `m.g`
  // elements to the DOM. `useRef` calls are at the top of the
  // component to satisfy the rules of hooks.
  const mascotGroupRef = useRef<SVGGElement>(null);
  const headGroupRef = useRef<SVGGElement>(null);

  // ── Mouse-tracking effect (fine-pointer devices only) ───────────────
  // We mount-once check the pointer type and only attach the listener
  // if the device actually has a fine pointer (mouse / trackpad).
  useEffect(() => {
    if (reduce || !trackCursor) return;

    // Coarse = touch-first (phones, tablets). Fine = mouse/trackpad.
    // 2-in-1 laptops report fine even when they have a touch digitiser.
    const mq = window.matchMedia("(pointer: coarse)");
    const isCoarsePointer = mq.matches;
    // Fallback for browsers without the pointer media query: assume
    // touch if the device advertises any touch points.
    const isTouchFallback =
      typeof mq.matches !== "boolean" &&
      typeof navigator !== "undefined" &&
      navigator.maxTouchPoints > 0;

    if (isCoarsePointer || isTouchFallback) return;

    const onMove = (e: MouseEvent) => {
      // Normalise to [-1, 1] from the viewport centre.
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      // .set() is a direct numeric write — no React state update.
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, trackCursor, mouseX, mouseY]);

  // ── Render ──────────────────────────────────────────────────────────
  // The whole tree is wrapped in its own `LazyMotion` so the `m.g`
  // components are valid even when this `<Mascot>` is rendered inside
  // another strict-mode `LazyMotion` (e.g. a `<Reveal>`). The strict
  // flag here is what guarantees the `motion` symbol is never used
  // in this file — TypeScript would catch it, and the runtime would
  // throw at dev time.
  return (
    <LazyMotion features={loadFeatures} strict>
      <svg
        aria-hidden={ariaHidden}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        className={cn("block", className)}
        style={{ imageRendering: "pixelated" }}
      >
        {reduce ? (
          // Reduced-motion fallback: a single static <g>. Same 9 paths,
          // same paint order, same coordinates — pixel-perfect match
          // for the no-motion rendering.
          <g ref={mascotGroupRef}>
            {/* 1 — Hair */}
            <path fill="#0f1b2d" d="M4,2h8v1h-8z M3,3h10v1h-10z" />
            {/* 2 — Face */}
            <path fill="#f4c89a" d="M4,4h8v4h-8z" />
            {/* 3 — Eyes + smile */}
            <path
              fill="#0f1b2d"
              d="M6,5h1v1h-1z M9,5h1v1h-1z M6,7h4v1h-4z"
            />
            {/* 4 — Shirt collar + sleeves */}
            <path
              fill="#ff6b35"
              d="M3,9h10v1h-10z M3,10h2v3h-2z M11,10h2v3h-2z"
            />
            {/* 5 — Shirt front */}
            <path fill="#ffede3" d="M5,10h6v3h-6z" />
            {/* 6 — Arms + hands */}
            <path
              fill="#f4c89a"
              d="M2,10h1v3h-1z M13,10h1v3h-1z M2,13h2v1h-2z M12,13h2v1h-2z"
            />
            {/* 7 — Laptop hinge + base */}
            <path
              fill="#0f1b2d"
              d="M4,13h8v1h-8z M3,14h10v1h-10z"
            />
            {/* 8 — Laptop screen */}
            <path fill="#ff6b35" d="M5,11h6v2h-6z" />
            {/* 9 — Screen code-line details */}
            <path fill="#ffffff" d="M6,12h1v1h-1z M8,12h2v1h-2z" />
          </g>
        ) : (
          <>
            {/* Outer group: scroll-driven bob + tilt. The head
                parallax is applied to the inner <m.g>, not here, so
                the body's position is purely a function of scroll. */}
            <m.g
              ref={mascotGroupRef}
              style={{
                x: 0,
                y: reactToScroll ? scrollBob : 0,
                rotate: reactToScroll ? scrollTilt : 0,
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
                willChange: "transform",
              }}
            >
              {/* Body group — static, never moves. */}
              <g>
                {/* 1 — Hair */}
                <path
                  fill="#0f1b2d"
                  d="M4,2h8v1h-8z M3,3h10v1h-10z"
                />
                {/* 4 — Shirt collar + side sleeves */}
                <path
                  fill="#ff6b35"
                  d="M3,9h10v1h-10z M3,10h2v3h-2z M11,10h2v3h-2z"
                />
                {/* 5 — Shirt front */}
                <path fill="#ffede3" d="M5,10h6v3h-6z" />
                {/* 6 — Arms + hands */}
                <path
                  fill="#f4c89a"
                  d="M2,10h1v3h-1z M13,10h1v3h-1z M2,13h2v1h-2z M12,13h2v1h-2z"
                />
                {/* 7 — Laptop hinge + base */}
                <path
                  fill="#0f1b2d"
                  d="M4,13h8v1h-8z M3,14h10v1h-10z"
                />
                {/* 8 — Laptop screen */}
                <path fill="#ff6b35" d="M5,11h6v2h-6z" />
                {/* 9 — Screen code-line details */}
                <path fill="#ffffff" d="M6,12h1v1h-1z M8,12h2v1h-2z" />
              </g>

              {/* Head group — cursor parallax. Wraps the face + the
                  eyes + smile. Sits on top of the body so the face is
                  never obscured. */}
              <m.g
                ref={headGroupRef}
                style={{
                  x: headX,
                  y: headY,
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                  willChange: "transform",
                }}
              >
                {/* 2 — Face */}
                <path fill="#f4c89a" d="M4,4h8v4h-8z" />
                {/* 3 — Eyes + smile (on top of face) */}
                <path
                  fill="#0f1b2d"
                  d="M6,5h1v1h-1z M9,5h1v1h-1z M6,7h4v1h-4z"
                />
              </m.g>
            </m.g>
          </>
        )}
      </svg>
    </LazyMotion>
  );
}
