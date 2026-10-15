"use client";

import { ArrowUp } from "lucide-react";

/**
 * Scrolls the current page to the top.
 *
 * A button, not a `/#top` link: Next.js ignores a second click on a link
 * whose URL already matches the current one, and on other routes `/#top`
 * would navigate home instead of scrolling. `window.scrollTo` without an
 * explicit `behavior` follows the CSS `scroll-behavior` (smooth by default,
 * instant under `prefers-reduced-motion`).
 */
export function BackToTopButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className={className}
    >
      <span>TOP</span>
      <ArrowUp
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  );
}
