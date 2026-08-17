import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "arcade";
type Size = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;

/**
 * Tactile Retro Pixel Button / Action Link.
 * Styled with crisp solid borders and 8-bit stepped press interactions.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  if (
    process.env.NODE_ENV !== "production" &&
    !rest["aria-label"] &&
    !rest["aria-labelledby"] &&
    !hasVisibleText(children)
  ) {
    console.warn(
      "[Button] Icon-only buttons must have an `aria-label` for accessibility.",
    );
  }

  const base =
    "inline-flex items-center justify-center gap-2 font-mono font-bold select-none cursor-pointer " +
    "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
    "transition-transform duration-75 active:translate-x-[2px] active:translate-y-[2px] " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-white border-2 border-fg shadow-[3px_3px_0px_0px_#0f1b2d] " +
      "hover:bg-accent-strong active:shadow-[1px_1px_0px_0px_#0f1b2d]",
    secondary:
      "bg-surface text-fg border-2 border-fg shadow-[3px_3px_0px_0px_#0f1b2d] " +
      "hover:bg-surface-soft active:shadow-[1px_1px_0px_0px_#0f1b2d]",
    arcade:
      "bg-[#6cc04a] text-fg border-2 border-fg shadow-[3px_3px_0px_0px_#0f1b2d] " +
      "hover:bg-[#5bb339] active:shadow-[1px_1px_0px_0px_#0f1b2d]",
    ghost:
      "bg-transparent text-fg-muted border-2 border-transparent " +
      "hover:text-fg hover:border-border hover:bg-surface active:translate-none",
  };

  const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
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

function hasVisibleText(node: ReactNode): boolean {
  if (node == null || typeof node === "boolean") return false;
  if (typeof node === "string") return node.trim().length > 0;
  if (typeof node === "number") return true;
  if (Array.isArray(node)) return node.some(hasVisibleText);
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return Boolean(props?.children && hasVisibleText(props.children));
  }
  return false;
}