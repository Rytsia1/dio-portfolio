import { cn } from "@/lib/cn";

interface CloudProps {
  /** Visual size of the cloud. */
  size?: "sm" | "md" | "lg";
  /** Visual variant — three silhouettes for variety. */
  variant?: 1 | 2 | 3;
  className?: string;
  /** Supply only when the cloud conveys meaning; omit for decoration. */
  ariaLabel?: string;
}

/**
 * Decorative pixel-art cloud — performance-optimised SVG.
 *
 * Rendering strategy
 * ──────────────────
 * The original implementation mapped over a per-variant cell array at
 * render time, emitting one <rect> per pixel (40–62 DOM nodes per cloud,
 * up to ~180 for the three clouds on the hero page).
 *
 * This version encodes every variant as two pre-computed SVG compound
 * path strings (one for the white body, one for the drop-shadow strip).
 * The SVG tree contains exactly 2 <path> elements regardless of cloud
 * size or variant, and all data is resolved at module-import time — zero
 * runtime array mapping.
 *
 * Grid: 24 × 12 units. Adjacent horizontal pixel runs are merged into a
 * single subpath (M x,y h w v 1 h -w z) so the path strings are as
 * short as possible.
 *
 * shapeRendering="crispEdges" disables sub-pixel anti-aliasing on the
 * SVG rasteriser, keeping edges sharp at every rendered size.
 *
 * Server Component — zero client JS.
 */

// ---------------------------------------------------------------------------
// Pre-computed path data
// ---------------------------------------------------------------------------
// Each variant's full body silhouette and drop-shadow are encoded once.
// Notation: M x,y h <width> v 1 h -<width> z   ← one 1-px-tall pixel run.
//
// Variant 1  – wide three-bump cloud
// Variant 2  – slightly narrower, different bump spacing
// Variant 3  – two-peak tall-ish cloud
//
// Shadow: one merged strip at row 4 (bottom row of grid + 1) so it
// hugs the underside of the cloud regardless of variant width.

const CLOUD_PATHS: Record<1 | 2 | 3, { body: string; shadow: string }> = {
  1: {
    // row 0 → runs: 6-7, 10-12, 16-17
    // row 1 → runs: 5-13, 15-18
    // row 2 → run:  3-20  (18 wide)
    // row 3 → run:  4-19  (16 wide)
    body:
      "M6,0h2v1h-2z M10,0h3v1h-3z M16,0h2v1h-2z" +
      " M5,1h9v1h-9z M15,1h4v1h-4z" +
      " M3,2h18v1h-18z" +
      " M4,3h16v1h-16z",
    shadow: "M4,4h16v0.4h-16z",
  },
  2: {
    // row 0 → runs: 4-5, 9-11, 15-16
    // row 1 → runs: 3-12, 14-18
    // row 2 → run:  2-19  (18 wide)
    // row 3 → run:  3-18  (16 wide)
    body:
      "M4,0h2v1h-2z M9,0h3v1h-3z M15,0h2v1h-2z" +
      " M3,1h10v1h-10z M14,1h5v1h-5z" +
      " M2,2h18v1h-18z" +
      " M3,3h16v1h-16z",
    shadow: "M3,4h16v0.4h-16z",
  },
  3: {
    // row 0 → runs: 8-10, 14-16
    // row 1 → runs: 7-11, 13-17
    // row 2 → run:  5-19  (15 wide)
    // row 3 → run:  6-18  (13 wide)
    body:
      "M8,0h3v1h-3z M14,0h3v1h-3z" +
      " M7,1h5v1h-5z M13,1h5v1h-5z" +
      " M5,2h15v1h-15z" +
      " M6,3h13v1h-13z",
    shadow: "M6,4h13v0.4h-13z",
  },
};

const DIMS = {
  sm: { w: 72,  h: 36 },
  md: { w: 108, h: 54 },
  lg: { w: 144, h: 72 },
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Cloud({
  size = "md",
  variant = 1,
  className,
  ariaLabel,
}: CloudProps) {
  const { w, h } = DIMS[size];
  const { body, shadow } = CLOUD_PATHS[variant];

  return (
    <svg
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      width={w}
      height={h}
      viewBox="0 0 24 12"
      shapeRendering="crispEdges"
      className={cn("block", className)}
    >
      {/* Shadow first (below) so body paints over it at the shared edge */}
      <path d={shadow} fill="#dbe9f4" />
      <path d={body}   fill="#ffffff" />
    </svg>
  );
}
