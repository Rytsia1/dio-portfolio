import { cn } from "@/lib/cn";

interface CloudProps {
  /** Visual size of the cloud. */
  size?: "sm" | "md" | "lg";
  /** Visual variant. */
  variant?: 1 | 2 | 3;
  className?: string;
  /** Optional aria-label for screen readers. */
  ariaLabel?: string;
}

/**
 * Decorative pixel-art cloud, drawn as inline SVG so it stays crisp
 * at any size and never depends on external image files.
 *
 * Three shapes are available so the clouds around the page feel like
 * a small, slightly varied family.
 */
export function Cloud({
  size = "md",
  variant = 1,
  className,
  ariaLabel,
}: CloudProps) {
  const dims =
    size === "lg"
      ? { w: 144, h: 72 }
      : size === "sm"
        ? { w: 72, h: 36 }
        : { w: 108, h: 54 };

  // Pixel grid: 8 wide x 4 tall, each cell = 18px at md.
  const cell = dims.w / 24;
  const base = "#ffffff";
  const shadow = "#dbe9f4";

  // Each variant is a 24x12 bitmask-ish rect list, hand-tuned to look
  // like a chunky pixel cloud.
  const cells =
    variant === 1
      ? [
          // Top bumps
          [6, 0],
          [7, 0],
          [10, 0],
          [11, 0],
          [12, 0],
          [16, 0],
          [17, 0],
          // Second row
          [5, 1],
          [6, 1],
          [7, 1],
          [8, 1],
          [9, 1],
          [10, 1],
          [11, 1],
          [12, 1],
          [13, 1],
          [15, 1],
          [16, 1],
          [17, 1],
          [18, 1],
          // Middle (widest)
          [3, 2],
          [4, 2],
          [5, 2],
          [6, 2],
          [7, 2],
          [8, 2],
          [9, 2],
          [10, 2],
          [11, 2],
          [12, 2],
          [13, 2],
          [14, 2],
          [15, 2],
          [16, 2],
          [17, 2],
          [18, 2],
          [19, 2],
          [20, 2],
          // Bottom row
          [4, 3],
          [5, 3],
          [6, 3],
          [7, 3],
          [8, 3],
          [9, 3],
          [10, 3],
          [11, 3],
          [12, 3],
          [13, 3],
          [14, 3],
          [15, 3],
          [16, 3],
          [17, 3],
          [18, 3],
          [19, 3],
        ]
      : variant === 2
        ? [
            // Slightly different silhouette
            [4, 0],
            [5, 0],
            [9, 0],
            [10, 0],
            [11, 0],
            [15, 0],
            [16, 0],
            [3, 1],
            [4, 1],
            [5, 1],
            [6, 1],
            [7, 1],
            [8, 1],
            [9, 1],
            [10, 1],
            [11, 1],
            [12, 1],
            [14, 1],
            [15, 1],
            [16, 1],
            [17, 1],
            [18, 1],
            [2, 2],
            [3, 2],
            [4, 2],
            [5, 2],
            [6, 2],
            [7, 2],
            [8, 2],
            [9, 2],
            [10, 2],
            [11, 2],
            [12, 2],
            [13, 2],
            [14, 2],
            [15, 2],
            [16, 2],
            [17, 2],
            [18, 2],
            [19, 2],
            [3, 3],
            [4, 3],
            [5, 3],
            [6, 3],
            [7, 3],
            [8, 3],
            [9, 3],
            [10, 3],
            [11, 3],
            [12, 3],
            [13, 3],
            [14, 3],
            [15, 3],
            [16, 3],
            [17, 3],
            [18, 3],
          ]
        : [
            // Tall, narrow cloud
            [8, 0],
            [9, 0],
            [10, 0],
            [14, 0],
            [15, 0],
            [16, 0],
            [7, 1],
            [8, 1],
            [9, 1],
            [10, 1],
            [11, 1],
            [13, 1],
            [14, 1],
            [15, 1],
            [16, 1],
            [17, 1],
            [5, 2],
            [6, 2],
            [7, 2],
            [8, 2],
            [9, 2],
            [10, 2],
            [11, 2],
            [12, 2],
            [13, 2],
            [14, 2],
            [15, 2],
            [16, 2],
            [17, 2],
            [18, 2],
            [19, 2],
            [6, 3],
            [7, 3],
            [8, 3],
            [9, 3],
            [10, 3],
            [11, 3],
            [12, 3],
            [13, 3],
            [14, 3],
            [15, 3],
            [16, 3],
            [17, 3],
            [18, 3],
          ];

  return (
    <svg
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      width={dims.w}
      height={dims.h}
      viewBox="0 0 24 12"
      shapeRendering="crispEdges"
      className={cn("block", className)}
    >
      {/* Subtle bottom shadow row */}
      {cells
        .filter(([, y]) => y === 3)
        .map(([x, y], i) => (
          <rect
            key={`s-${i}`}
            x={x}
            y={y + 1}
            width={1}
            height={0.4}
            fill={shadow}
          />
        ))}
      {/* Cloud body */}
      {cells.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={1}
          height={1}
          fill={base}
        />
      ))}
      {/* A tiny highlight pixel to feel handcrafted */}
      <rect x={5} y={2} width={1} height={1} fill="#ffffff" />
    </svg>
  );
}
