import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type DecorKind =
  | "star"
  | "plant"
  | "terminal"
  | "controller"
  | "coin"
  | "chart"
  | "book"
  | "trophy"
  | "gear"
  | "arrow";

interface DecorProps {
  kind: DecorKind;
  size?: number;
  className?: string;
}

/**
 * Small pixel-art decorations — performance-optimised SVG.
 *
 * Rendering strategy
 * ──────────────────
 * The original implementation used 4–11 individual <rect> elements per
 * shape. This version replaces them with compound SVG <path> elements
 * (one per colour), reducing the SVG tree to 1–4 nodes per shape.
 *
 * How the paths are built:
 *   • Same-colour pixels are merged into a single compound path string.
 *     Adjacent horizontal runs collapse into M x,y h w v 1 h -w z so the
 *     path data is as short as possible.
 *   • Where colours overlap (e.g. the terminal screen text sits on top of
 *     the white screen which itself sits on the dark body), multiple <path>
 *     elements are emitted in the correct bottom-to-top paint order.
 *
 * All shape data lives in static module-level constants evaluated once at
 * import time — zero per-render computation.
 *
 * shapeRendering="crispEdges" disables sub-pixel anti-aliasing.
 * All shapes sit on a 16 × 16 pixel grid.
 * Always aria-hidden (decorative, never informative).
 * Server Component — zero client JS.
 */
export function Decor({ kind, size = 32, className }: DecorProps) {
  return (
    <span
      aria-hidden
      className={cn("inline-block align-middle", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        className="block"
      >
        {SHAPES[kind]}
      </svg>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Shape constants
// ---------------------------------------------------------------------------
// Each constant is pre-composed JSX resolved once at module level.
// Paint order within each constant mirrors the original rect sequence so
// foreground colours always render on top of background colours.

// 1 path — all pixels are #ff6b35
const STAR: ReactNode = (
  <path
    fill="#ff6b35"
    d={
      "M7,1h2v2h-2z" +
      " M3,5h10v2h-10z M2,6h12v1h-12z" +
      " M4,9h2v2h-2z M10,9h2v2h-2z"
    }
  />
);

// 3 paths — green plant (stem + leaves) → dark rim → brown pot body
// The stem (y=6–10) intentionally disappears behind the pot rim at y=10.
const PLANT: ReactNode = (
  <>
    <path
      fill="#6cc04a"
      d="M6,2h3v2h-3z M9,3h2v2h-2z M5,4h2v2h-2z M7,6h2v5h-2z"
    />
    <path fill="#3d2616" d="M4,10h8v1h-8z" />
    <path fill="#5a3a22" d="M4,11h8v4h-8z" />
  </>
);

// 4 paths — dark body + stand → white screen (covers body) →
//           dark text lines (on screen) → orange prompt markers
// The screen text must render after the white screen that it lives on.
const TERMINAL: ReactNode = (
  <>
    <path
      fill="#0f1b2d"
      d="M2,3h12v9h-12z M6,12h4v1h-4z M4,13h8v1h-8z"
    />
    <path fill="#ffffff" d="M3,4h10v7h-10z" />
    <path
      fill="#0f1b2d"
      d="M6,6h2v1h-2z M9,6h3v1h-3z M6,8h4v1h-4z"
    />
    <path fill="#ff6b35" d="M4,6h1v1h-1z M4,8h1v1h-1z" />
  </>
);

// 3 paths — dark d-pad + controller outline → orange body fill → white buttons
const CONTROLLER: ReactNode = (
  <>
    <path
      fill="#0f1b2d"
      d="M4,5h2v2h-2z M2,6h2v2h-2z M3,7h2v2h-2z M5,5h6v6h-6z"
    />
    <path fill="#ff6b35" d="M6,6h4v4h-4z" />
    <path fill="#ffffff" d="M11,6h1v1h-1z M12,7h1v1h-1z M11,8h1v1h-1z" />
  </>
);

// 3 paths — light-orange rims (top + bottom) → orange body → peach highlight
// Rims (y=2-3 and y=12-13) do not overlap the body (y=4-11) so paint
// order between those two groups is arbitrary; highlights must be last.
const COIN: ReactNode = (
  <>
    <path
      fill="#ff8657"
      d="M5,2h6v1h-6z M4,3h8v1h-8z M4,12h8v1h-8z M5,13h6v1h-6z"
    />
    <path fill="#ff6b35" d="M3,4h10v8h-10z" />
    {/* Two adjacent highlight pixels merged into a 1×2 run */}
    <path fill="#ffd2bd" d="M5,4h1v2h-1z" />
  </>
);

// 2 paths — dark axes + mid-bar → orange bars
// Non-overlapping regions, so paint order is arbitrary.
const CHART: ReactNode = (
  <>
    <path fill="#0f1b2d" d="M2,2h1v11h-1z M2,13h11v1h-11z M7,6h2v7h-2z" />
    <path fill="#ff6b35" d="M4,9h2v4h-2z M10,4h2v9h-2z" />
  </>
);

// 3 paths — orange cover → dark spine (overlaps cover at x=3-4) → white page lines
// The spine is the darker binding strip on the left side of the cover.
const BOOK: ReactNode = (
  <>
    <path fill="#ff6b35" d="M3,2h10v12h-10z" />
    <path fill="#0f1b2d" d="M3,2h2v12h-2z" />
    <path
      fill="#ffffff"
      d={
        "M5,3h7v1h-7z M5,5h7v1h-7z M5,7h7v1h-7z" +
        " M5,9h5v1h-5z M5,11h7v1h-7z"
      }
    />
  </>
);

// 3 paths — orange cup + handles → lighter gold stem/base → white star detail
// Cup body and handles share the same colour so they merge into one path.
const TROPHY: ReactNode = (
  <>
    <path
      fill="#ff6b35"
      d={
        "M4,2h8v2h-8z M3,3h10v5h-10z M4,8h8v1h-8z" +
        " M2,4h1v3h-1z M13,4h1v3h-1z"
      }
    />
    <path fill="#ff8657" d="M6,9h4v2h-4z M4,11h8v3h-8z" />
    <path fill="#ffffff" d="M7,5h2v2h-2z" />
  </>
);

// 3 paths — dark teeth + ring body → orange inner ring → dark centre hole
// Three separate dark passes are required because the orange ring sits
// between two dark layers (body outside, hole inside).
const GEAR: ReactNode = (
  <>
    <path
      fill="#0f1b2d"
      d={
        "M6,2h4v2h-4z M2,6h2v4h-2z M12,6h2v4h-2z M6,12h4v2h-4z" +
        " M3,3h2v2h-2z M11,3h2v2h-2z M3,11h2v2h-2z M11,11h2v2h-2z" +
        " M5,5h6v6h-6z"
      }
    />
    <path fill="#ff6b35" d="M6,6h4v4h-4z" />
    <path fill="#0f1b2d" d="M7,7h2v2h-2z" />
  </>
);

// 1 path — all pixels are #ff6b35
const ARROW: ReactNode = (
  <path
    fill="#ff6b35"
    d="M2,7h9v2h-9z M9,4h3v2h-3z M11,6h1v4h-1z M9,10h3v2h-3z"
  />
);

// ---------------------------------------------------------------------------
// Shape registry
// ---------------------------------------------------------------------------

const SHAPES: Record<DecorKind, ReactNode> = {
  star:       STAR,
  plant:      PLANT,
  terminal:   TERMINAL,
  controller: CONTROLLER,
  coin:       COIN,
  chart:      CHART,
  book:       BOOK,
  trophy:     TROPHY,
  gear:       GEAR,
  arrow:      ARROW,
};
