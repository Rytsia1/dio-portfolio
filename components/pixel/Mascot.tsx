import { cn } from "@/lib/cn";

interface MascotProps {
  size?: number;
  className?: string;
  /** Always hidden from screen readers by default — decorative. */
  ariaHidden?: boolean;
}

/**
 * Pixel-art "developer at a desk" mascot — performance-optimised SVG.
 *
 * Rendering strategy
 * ──────────────────
 * The original had 19 individual <rect> elements, including two rects
 * with sub-pixel coordinates (y=11.5, height=0.5) that can silently
 * break shapeRendering="crispEdges" in some rasterisers.
 *
 * This version uses 9 <path> elements. Same-colour pixels are merged
 * into a single compound path string. Where the paint order matters
 * (foreground colour overlaps a background colour), paths are kept
 * separate and emitted in the correct sequence.
 *
 * Key layering constraints preserved from the original:
 *   • Eyes + smile (dark) must render after the face (skin).
 *   • Laptop screen (orange, y=11–12) must render after the cream shirt
 *     front (y=10–12) because the two regions overlap.
 *   • Laptop base (dark, y=13) renders after the hands (skin, y=13) —
 *     they occupy adjacent x ranges so paint order is actually
 *     irrelevant, but the sequence mirrors the original for clarity.
 *   • Screen detail lines (white) render last, on top of the orange screen.
 *
 * Sub-pixel fix: the original y=11.5 / height=0.5 screen details are
 * snapped to y=12 / height=1 — integer coordinates that crispEdges can
 * round predictably across all browsers.
 *
 * Grid: 16 × 16 units.
 * shapeRendering="crispEdges" disables anti-aliasing.
 * Server Component — zero client JS.
 */
export function Mascot({
  size = 96,
  className,
  ariaHidden = true,
}: MascotProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={cn("block", className)}
    >
      {/*
       * Paint order — 9 paths, bottom to top:
       *
       *  1  #0f1b2d  hair (rows 2–3)
       *  2  #f4c89a  face (rows 4–7)
       *  3  #0f1b2d  eyes + smile on top of face
       *  4  #ff6b35  shirt collar (row 9) + side sleeves (rows 10–12)
       *  5  #ffede3  shirt front panel (rows 10–12, centre columns)
       *  6  #f4c89a  arms (rows 10–12) + hands (row 13)
       *  7  #0f1b2d  laptop hinge (row 13) + base (row 14)
       *  8  #ff6b35  laptop screen (rows 11–12, on top of shirt front)
       *  9  #ffffff  screen code-line details (row 12, integer coords)
       */}

      {/* 1 — Hair */}
      <path
        fill="#0f1b2d"
        d="M4,2h8v1h-8z M3,3h10v1h-10z"
      />

      {/* 2 — Face */}
      <path fill="#f4c89a" d="M4,4h8v4h-8z" />

      {/* 3 — Eyes + smile (on top of face) */}
      {/* Smile cols 6-9 merged into one 4-wide run */}
      <path
        fill="#0f1b2d"
        d="M6,5h1v1h-1z M9,5h1v1h-1z M6,7h4v1h-4z"
      />

      {/* 4 — Shirt collar + side sleeves */}
      <path
        fill="#ff6b35"
        d="M3,9h10v1h-10z M3,10h2v3h-2z M11,10h2v3h-2z"
      />

      {/* 5 — Shirt front (cream centre panel, no x overlap with sleeves) */}
      <path fill="#ffede3" d="M5,10h6v3h-6z" />

      {/* 6 — Arms + hands (x positions don't overlap shirt or laptop base) */}
      <path
        fill="#f4c89a"
        d="M2,10h1v3h-1z M13,10h1v3h-1z M2,13h2v1h-2z M12,13h2v1h-2z"
      />

      {/* 7 — Laptop hinge row + base (adjacent to hands, no x overlap) */}
      <path
        fill="#0f1b2d"
        d="M4,13h8v1h-8z M3,14h10v1h-10z"
      />

      {/* 8 — Laptop screen: orange overlay on top of cream shirt front */}
      <path fill="#ff6b35" d="M5,11h6v2h-6z" />

      {/* 9 — Screen code-line details (y=12 integer, crispEdges-safe) */}
      <path fill="#ffffff" d="M6,12h1v1h-1z M8,12h2v1h-2z" />
    </svg>
  );
}
