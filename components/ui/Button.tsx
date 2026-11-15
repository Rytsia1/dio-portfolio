import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "panel";
type Size = "md" | "lg";

interface ButtonStyle {
  /** primary: the one accent CTA. secondary: outlined. panel: outlined, on the dark flagship card. */
  variant?: Variant;
  /** md is 44px tall, lg is 48px. Both meet the 44px touch target. */
  size?: Size;
  /**
   * Side the icon sits on. That side gets 4px less padding so the label
   * looks centred: an icon carries less visual weight than text.
   */
  icon?: "start" | "end";
  className?: string;
}

const variants: Record<Variant, string> = {
  // on-accent on accent-fill is 5.2:1, on accent-fill-hover 7:1.
  primary: "bg-accent-fill font-semibold text-on-accent hover:bg-accent-fill-hover",
  secondary: "border border-border-strong bg-surface font-medium text-fg hover:border-fg",
  panel: "border border-panel-subtle/50 font-medium text-panel-fg hover:border-panel-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const iconPadding: Record<Size, Record<"start" | "end", string>> = {
  md: { start: "pl-4", end: "pr-4" },
  lg: { start: "pl-5", end: "pr-5" },
};

/**
 * Button classes, for anything that should look like a button but is not
 * an `<a>`: a `<button>`, or a next/link `<Link>`.
 */
export function buttonClass({
  variant = "primary",
  size = "md",
  icon,
  className,
}: ButtonStyle = {}) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.98]",
    // `disabled:` never matches an <a>, so honour aria-disabled too.
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    variants[variant],
    sizes[size],
    icon && iconPadding[size][icon],
    className,
  );
}

type ButtonProps = ButtonStyle & Omit<ComponentPropsWithoutRef<"a">, "className">;

/** Button-styled anchor, for external links, mailto: and in-page hashes. */
export function Button({ variant, size, icon, className, children, ...rest }: ButtonProps) {
  return (
    <a {...rest} className={buttonClass({ variant, size, icon, className })}>
      {children}
    </a>
  );
}
