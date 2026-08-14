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
 * Small pixel-art objects used as decorative punctuation around the
 * page. Always `aria-hidden` (decorative, not informative).
 *
 * All shapes are drawn on a 16x16 grid so they scale crisply.
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

const STAR = (
  <>
    <rect x={7} y={1} width={2} height={2} fill="#ff6b35" />
    <rect x={3} y={5} width={10} height={2} fill="#ff6b35" />
    <rect x={2} y={6} width={12} height={1} fill="#ff6b35" />
    <rect x={4} y={9} width={2} height={2} fill="#ff6b35" />
    <rect x={10} y={9} width={2} height={2} fill="#ff6b35" />
  </>
);

const PLANT = (
  <>
    {/* Pot */}
    <rect x={4} y={11} width={8} height={4} fill="#5a3a22" />
    <rect x={4} y={10} width={8} height={1} fill="#3d2616" />
    {/* Stem */}
    <rect x={7} y={6} width={2} height={5} fill="#6cc04a" />
    {/* Leaves */}
    <rect x={5} y={4} width={2} height={2} fill="#6cc04a" />
    <rect x={9} y={3} width={2} height={2} fill="#6cc04a" />
    <rect x={6} y={2} width={3} height={2} fill="#6cc04a" />
  </>
);

const TERMINAL = (
  <>
    {/* Body */}
    <rect x={2} y={3} width={12} height={9} fill="#0f1b2d" />
    <rect x={3} y={4} width={10} height={7} fill="#ffffff" />
    {/* Prompt lines */}
    <rect x={4} y={6} width={1} height={1} fill="#ff6b35" />
    <rect x={6} y={6} width={2} height={1} fill="#0f1b2d" />
    <rect x={9} y={6} width={3} height={1} fill="#0f1b2d" />
    <rect x={4} y={8} width={1} height={1} fill="#ff6b35" />
    <rect x={6} y={8} width={4} height={1} fill="#0f1b2d" />
    {/* Stand */}
    <rect x={6} y={12} width={4} height={1} fill="#0f1b2d" />
    <rect x={4} y={13} width={8} height={1} fill="#0f1b2d" />
  </>
);

const CONTROLLER = (
  <>
    {/* D-pad */}
    <rect x={3} y={7} width={2} height={2} fill="#0f1b2d" />
    <rect x={2} y={6} width={2} height={2} fill="#0f1b2d" />
    <rect x={4} y={5} width={2} height={2} fill="#0f1b2d" />
    {/* Body */}
    <rect x={5} y={5} width={6} height={6} fill="#0f1b2d" />
    <rect x={6} y={6} width={4} height={4} fill="#ff6b35" />
    {/* Buttons */}
    <rect x={11} y={6} width={1} height={1} fill="#ffffff" />
    <rect x={12} y={7} width={1} height={1} fill="#ffffff" />
    <rect x={11} y={8} width={1} height={1} fill="#ffffff" />
  </>
);

const COIN = (
  <>
    <rect x={5} y={2} width={6} height={1} fill="#ff8657" />
    <rect x={4} y={3} width={8} height={1} fill="#ff8657" />
    <rect x={3} y={4} width={10} height={8} fill="#ff6b35" />
    <rect x={4} y={12} width={8} height={1} fill="#ff8657" />
    <rect x={5} y={13} width={6} height={1} fill="#ff8657" />
    {/* Highlight */}
    <rect x={5} y={4} width={1} height={1} fill="#ffd2bd" />
    <rect x={5} y={5} width={1} height={1} fill="#ffd2bd" />
  </>
);

const CHART = (
  <>
    {/* Axis */}
    <rect x={2} y={2} width={1} height={11} fill="#0f1b2d" />
    <rect x={2} y={13} width={11} height={1} fill="#0f1b2d" />
    {/* Bars */}
    <rect x={4} y={9} width={2} height={4} fill="#ff6b35" />
    <rect x={7} y={6} width={2} height={7} fill="#0f1b2d" />
    <rect x={10} y={4} width={2} height={9} fill="#ff6b35" />
  </>
);

const BOOK = (
  <>
    {/* Cover */}
    <rect x={3} y={2} width={10} height={12} fill="#ff6b35" />
    <rect x={3} y={2} width={2} height={12} fill="#0f1b2d" />
    {/* Pages */}
    <rect x={5} y={3} width={7} height={1} fill="#ffffff" />
    <rect x={5} y={5} width={7} height={1} fill="#ffffff" />
    <rect x={5} y={7} width={7} height={1} fill="#ffffff" />
    <rect x={5} y={9} width={5} height={1} fill="#ffffff" />
    <rect x={5} y={11} width={7} height={1} fill="#ffffff" />
  </>
);

const TROPHY = (
  <>
    {/* Cup */}
    <rect x={4} y={2} width={8} height={2} fill="#ff6b35" />
    <rect x={3} y={3} width={10} height={5} fill="#ff6b35" />
    <rect x={4} y={8} width={8} height={1} fill="#ff6b35" />
    {/* Handles */}
    <rect x={2} y={4} width={1} height={3} fill="#ff6b35" />
    <rect x={13} y={4} width={1} height={3} fill="#ff6b35" />
    {/* Stem + base */}
    <rect x={6} y={9} width={4} height={2} fill="#ff8657" />
    <rect x={4} y={11} width={8} height={3} fill="#ff8657" />
    {/* Star on cup */}
    <rect x={7} y={5} width={2} height={2} fill="#ffffff" />
  </>
);

const GEAR = (
  <>
    <rect x={6} y={2} width={4} height={2} fill="#0f1b2d" />
    <rect x={2} y={6} width={2} height={4} fill="#0f1b2d" />
    <rect x={12} y={6} width={2} height={4} fill="#0f1b2d" />
    <rect x={6} y={12} width={4} height={2} fill="#0f1b2d" />
    <rect x={3} y={3} width={2} height={2} fill="#0f1b2d" />
    <rect x={11} y={3} width={2} height={2} fill="#0f1b2d" />
    <rect x={3} y={11} width={2} height={2} fill="#0f1b2d" />
    <rect x={11} y={11} width={2} height={2} fill="#0f1b2d" />
    {/* Inner ring */}
    <rect x={5} y={5} width={6} height={6} fill="#0f1b2d" />
    <rect x={6} y={6} width={4} height={4} fill="#ff6b35" />
    <rect x={7} y={7} width={2} height={2} fill="#0f1b2d" />
  </>
);

const ARROW = (
  <>
    <rect x={2} y={7} width={9} height={2} fill="#ff6b35" />
    <rect x={9} y={4} width={3} height={2} fill="#ff6b35" />
    <rect x={11} y={6} width={1} height={4} fill="#ff6b35" />
    <rect x={9} y={10} width={3} height={2} fill="#ff6b35" />
  </>
);

const SHAPES: Record<DecorKind, React.ReactNode> = {
  star: STAR,
  plant: PLANT,
  terminal: TERMINAL,
  controller: CONTROLLER,
  coin: COIN,
  chart: CHART,
  book: BOOK,
  trophy: TROPHY,
  gear: GEAR,
  arrow: ARROW,
};
