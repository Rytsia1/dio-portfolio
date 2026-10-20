import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  /**
   * "span" renders the same styles without an <a>: a visual-only button
   * for use inside a card that is already a link (no nested anchors).
   */
  as?: "a" | "span";
  children: ReactNode;
  className?: string;
  /**
   * Accessible name for the button. **Required when `children` contains
   * no visible text** (e.g. an icon-only button). Screen readers will
   * announce this string instead of the (often silent) icon.
   *
   * When the button has visible text in `children`, this prop is
   * optional — the visible text is used as the accessible name.
   */
  "aria-label"?: string;
};

type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;

/**
 * Polymorphic button-styled link. Everything in the portfolio that
 * looks like a button is an anchor (`<a>`) — there's no form-based
 * interactivity on the site, so a link is the correct primitive.
 *
 * Visual style: light editorial theme on a sky-blue canvas, with
 * a terminal-green keyboard focus ring that fits the gaming aesthetic.
 *   primary   — orange pill (the main CTA).
 *   secondary — white card with a soft border.
 *   ghost     — borderless, navy text.
 *
 * ── Accessibility ──────────────────────────────────────────────────────
 *
 * **Focus ring.** We *intentionally* do not use `outline-none` alone:
 * WCAG 2.4.7 (Focus Visible) requires a visible focus indicator. The
 * `focus-visible` ring below uses Tailwind's `ring-2` (2 px, meeting the
 * 2 px minimum) in `ring-green-400` (`#4ade80` — terminal green, 3:1
 * contrast against the page background) with a 2 px `ring-offset-bg`
 * gap so the ring is visible on every variant's fill.
 *
 * **Accessible name.** Icon-only buttons MUST pass an `aria-label`. A
 * dev-mode `console.warn` fires in development if the button is
 * icon-only and no `aria-label` is provided. In production the
 * warning is stripped by the `process.env.NODE_ENV` guard.
 */
export function Button({
  variant = "primary",
  size = "md",
  as = "a",
  className,
  children,
  ...rest
}: ButtonProps) {
  // Dev-only a11y guard: catches the "icon-only button with no
  // accessible name" footgun that breaks screen-reader output.
  if (
    process.env.NODE_ENV !== "production" &&
    !rest["aria-label"] &&
    !rest["aria-labelledby"] &&
    !hasVisibleText(children)
  ) {
    console.warn(
      "[Button] Icon-only buttons must have an `aria-label` " +
        "so screen readers can announce their function.",
    );
  }

  const base =
    // Layout
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
    // Motion: colour + press feedback
    "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out " +
    "active:scale-[0.98] " +
    // WCAG 2.4.7 / 2.4.11 — visible focus indicator with high contrast against light surfaces.
    "outline-none " +
    "focus-visible:ring-2 focus-visible:ring-accent " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset " +
    // Disabled: `disabled:` never matches an <a>, so honour aria-disabled too.
    "disabled:opacity-50 disabled:pointer-events-none " +
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    primary:
      // Accent (#c2410c) + white = 5.2:1, accent-strong hover = 7:1 (WCAG AA).
      "bg-accent text-white hover:bg-accent-strong " +
      "shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_10px_24px_-14px_rgba(194,65,12,0.55)]",
    secondary:
      "border border-border-strong bg-surface text-fg " +
      "hover:bg-surface-soft hover:border-accent/50 hover:text-accent-strong",
    ghost:
      "border border-transparent text-fg-muted " +
      "hover:text-fg hover:bg-surface",
    dark:
      "bg-fg text-white hover:bg-accent shadow-[0_10px_24px_-14px_rgba(15,27,45,0.6)]",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3.5 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-sm sm:text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (as === "span") {
    // Visual only: the enclosing card link handles navigation.
    return (
      <span aria-hidden={rest["aria-hidden"]} className={classes}>
        {children}
      </span>
    );
  }

  return (
    <a {...rest} className={classes}>
      {children}
    </a>
  );
}

/**
 * Heuristic: does the button's children contain any visible text?
 * Used by the dev-mode a11y guard. We treat any string of non-whitespace
 * characters as visible text and any React element with non-empty
 * children as visible text. Decorative icons (`aria-hidden` SVGs from
 * lucide-react, etc.) are ignored.
 */
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