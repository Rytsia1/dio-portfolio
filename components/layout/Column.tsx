import { ReactNode } from "react";

type ColumnRole = "anchor" | "texture" | "variety";

interface ColumnProps {
  children: ReactNode;
  role: ColumnRole;
  className?: string;
}

export function Column({ children, role, className = "" }: ColumnProps) {
  // Mobile unwrap order: anchor (1), variety (2), texture (3).
  // IMPORTANT: Reset to lg:order-none on desktop so JSX order controls left/right zig-zag!
  const mobileOrderClass = {
    anchor: "order-1 lg:order-none",
    variety: "order-2 lg:order-none",
    texture: "order-3 lg:order-none",
  }[role];

  // Default widths for 3-column boards (~44% / ~22% / ~34%)
  const defaultWidthClass = {
    anchor: "lg:w-[44%] shrink-0",
    texture: "lg:w-[22%] shrink-0",
    variety: "lg:w-[34%] shrink-0 flex-1",
  }[role];

  const hasCustomWidth = className.includes("lg:w-") || className.includes("lg:flex-");

  return (
    <div
      className={`flex flex-col gap-5 lg:gap-6 h-full ${mobileOrderClass} ${hasCustomWidth ? "" : defaultWidthClass} ${className}`}
    >
      {children}
    </div>
  );
}
