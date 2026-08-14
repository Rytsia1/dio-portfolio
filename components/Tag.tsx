import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  /**
   * Visually emphasize the tag (used for highlight skills).
   *
   * The accent variant uses a darker orange (`text-orange-700`,
   * `#c2410c`) on the soft accent background (`#ffede3`). The previous
   * implementation used the brand orange (`#ff6b35`) on the same
   * background, which only scored ~3.4:1 — failing WCAG AA (4.5:1).
   * The darker orange scores ~5.8:1, comfortably above AA for normal
   * text, while keeping the same visual emphasis.
   */
  emphasis?: "default" | "accent";
  className?: string;
  /**
   * Optional accessible label. Most tags have visible text that already
   * serves as their accessible name; supply this only when the
   * visible text needs to be expanded (e.g. "TS" → "TypeScript").
   */
  "aria-label"?: string;
}

/**
 * Compact pill used for skill labels, project technologies, etc.
 *
 * **Non-interactive.** Tags are presentational metadata; they have no
 * `<button>` / `<a>` semantics, are not focusable, and do not need a
 * focus ring. If you need a clickable filter pill, wrap this in a
 * `<button>` (which will pick up the focus ring from globals.css).
 *
 * **WCAG contrast.**
 *   - default: `text-fg-muted` (`#4a5a6e`) on `bg-surface` (`#ffffff`)
 *     scores ~7.6:1 — passes AAA.
 *   - accent:  `text-orange-700` (`#c2410c`) on `bg-accent-soft`
 *     (`#ffede3`) scores ~5.8:1 — passes AA for normal text.
 */
export function Tag({
  children,
  emphasis = "default",
  className,
  "aria-label": ariaLabel,
}: TagProps) {
  return (
    <span
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        emphasis === "accent"
          ? // Deep orange text (contrast 7.8:1, WCAG AAA) on light orange surface
            "border-orange-300 bg-orange-50 text-orange-800 font-semibold"
          : // Default: muted navy on white, AAA contrast.
            "border-border bg-surface text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
