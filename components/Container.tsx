import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** When true, render a slightly narrower container for prose content. */
  narrow?: boolean;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

/**
 * Centered, max-width wrapper. All sections should render their content
 * inside a `Container` so horizontal rhythm stays consistent.
 */
export function Container({
  children,
  className,
  narrow = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
