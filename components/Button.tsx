import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;

/**
 * Polymorphic button-styled link. Everything in the portfolio that looks
 * like a button is an anchor (`<a>`) — there's no form-based interactivity
 * on the site, so a link is the correct primitive.
 *
 * Visual style: light theme, sky-blue canvas.
 *   primary   — orange pill (the main CTA).
 *   secondary — white card with a soft border.
 *   ghost     — borderless, navy text.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors transition-shadow focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-white hover:bg-accent-strong shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_10px_24px_-14px_rgba(255,107,53,0.55)]",
    secondary:
      "border border-border-strong bg-surface text-fg hover:bg-surface-soft hover:border-accent/40",
    ghost:
      "border border-transparent text-fg-muted hover:text-fg hover:bg-surface",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3.5 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-sm sm:text-base",
  };

  return (
    <a
      {...rest}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
