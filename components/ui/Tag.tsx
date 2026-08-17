import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  emphasis?: "default" | "accent" | "game";
  className?: string;
  "aria-label"?: string;
}

/**
 * Crisp retro pixel metadata tag.
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
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-mono font-medium leading-tight select-none",
        emphasis === "accent" &&
          "border-accent/40 bg-accent-soft text-accent font-bold",
        emphasis === "game" &&
          "border-grass/50 bg-[#eef8ea] text-[#2e681c] font-bold",
        emphasis === "default" &&
          "border-border bg-surface text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}