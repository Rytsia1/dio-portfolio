import { cn } from "@/lib/cn";

interface MascotProps {
  size?: number;
  className?: string;
  /** Decorative — always hidden from screen readers. */
  ariaHidden?: boolean;
}

/**
 * Tiny pixel-art "developer at a desk" mascot. Drawn as inline SVG on
 * a 16x16 pixel grid so it stays crisp at any rendered size.
 *
 * Used 3–5 times around the page (Hero, About, Contact, Footer) as a
 * personal visual signature. Always `aria-hidden` by default — it's
 * decorative, not informative.
 */
export function Mascot({ size = 96, className, ariaHidden = true }: MascotProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={cn("block", className)}
    >
      {/* Hair (dark) */}
      <rect x={4} y={2} width={8} height={1} fill="#0f1b2d" />
      <rect x={3} y={3} width={2} height={1} fill="#0f1b2d" />
      <rect x={11} y={3} width={2} height={1} fill="#0f1b2d" />
      <rect x={4} y={3} width={8} height={1} fill="#0f1b2d" />

      {/* Face (skin) */}
      <rect x={4} y={4} width={8} height={4} fill="#f4c89a" />

      {/* Eyes */}
      <rect x={6} y={5} width={1} height={1} fill="#0f1b2d" />
      <rect x={9} y={5} width={1} height={1} fill="#0f1b2d" />

      {/* Smile */}
      <rect x={6} y={7} width={1} height={1} fill="#0f1b2d" />
      <rect x={7} y={7} width={2} height={1} fill="#0f1b2d" />
      <rect x={9} y={7} width={1} height={1} fill="#0f1b2d" />

      {/* Shirt (orange accent) */}
      <rect x={3} y={9} width={10} height={1} fill="#ff6b35" />
      <rect x={3} y={10} width={2} height={3} fill="#ff6b35" />
      <rect x={11} y={10} width={2} height={3} fill="#ff6b35" />
      <rect x={5} y={10} width={6} height={3} fill="#ffede3" />

      {/* Arms */}
      <rect x={2} y={10} width={1} height={3} fill="#f4c89a" />
      <rect x={13} y={10} width={1} height={3} fill="#f4c89a" />

      {/* Hands on a tiny laptop */}
      <rect x={2} y={13} width={2} height={1} fill="#f4c89a" />
      <rect x={12} y={13} width={2} height={1} fill="#f4c89a" />

      {/* Laptop base */}
      <rect x={3} y={14} width={10} height={1} fill="#0f1b2d" />
      <rect x={4} y={13} width={8} height={1} fill="#0f1b2d" />
      {/* Laptop screen content (orange) */}
      <rect x={5} y={11} width={6} height={2} fill="#ff6b35" />
      <rect x={6} y={11.5} width={1} height={0.5} fill="#ffffff" />
      <rect x={8} y={11.5} width={2} height={0.5} fill="#ffffff" />
    </svg>
  );
}
