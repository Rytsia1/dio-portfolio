import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  /** Visually emphasize the tag (used for highlight skills). */
  emphasis?: "default" | "accent";
  className?: string;
}

/**
 * Compact pill used for skill labels, project technologies, etc.
 * Light theme: white card with a soft border, orange tint on emphasis.
 */
export function Tag({ children, emphasis = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        emphasis === "accent"
          ? "border-accent/30 bg-accent-soft text-accent"
          : "border-border bg-surface text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
