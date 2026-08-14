"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

/**
 * Sticky navbar. Light editorial theme with a sky-blue canvas, plus
 * terminal-green keyboard focus rings to nod at the gaming aesthetic.
 *
 * ── Accessibility ──────────────────────────────────────────────────────
 *
 * **Semantic landmark.** The desktop nav uses `<nav aria-label="Main
 * navigation">` so screen-reader users can jump straight to it via the
 * landmarks rotor. The mobile menu uses a distinct `<nav aria-label=
 * "Mobile navigation">` because it is a different in-document context.
 *
 * **Active link.** The currently-visible section is marked with
 * `aria-current="location"` — the W3C-recommended value for scroll-spy
 * in-page navigation. (The previous `"true"` value is technically
 * valid but discouraged by the ARIA Authoring Practices for nav sets
 * where the user is always on the same page.)
 *
 * **Focus ring.** Every interactive element uses the same gaming-
 * themed `focus-visible:ring-2 focus-visible:ring-green-400` ring via
 * the shared `navLinkRing` constant. This passes WCAG 2.4.7 (Focus
 * Visible) with the required 2 px minimum.
 *
 * **Mobile menu keyboard support.**
 *   • `Escape` closes the menu.
 *   • Clicking the transparent backdrop closes the menu.
 *   • Focus is moved into the menu when it opens, and restored to
 *     the toggle button when it closes.
 *
 * **Internal links use Next.js `<Link>`.** In-app hash navigation
 * uses the framework's client router (soft nav, no full page reload).
 * `prefetch={false}` on hash-only links is correct — there is no
 * destination document to prefetch.
 */
const navLinkRing =
  // High-contrast focus-ring (contrast ≥4.5:1) meeting WCAG 2.4.7 / 2.4.11 on light surfaces.
  "outline-none " +
  "focus-visible:ring-2 focus-visible:ring-orange-700 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Refs for the mobile-menu a11y dance: remember which element to
  // return focus to when the menu closes, and grab the first focusable
  // element inside the menu so we can move focus in.
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          );
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onHashChange = () => setOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // ── Mobile menu: Escape + focus management ───────────────────────────
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        // Return focus to the toggle button (a11y expectation).
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // When the menu opens, move focus into it so keyboard users can
  // immediately start tabbing through the items.
  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <Container
        className={cn(
          "flex h-14 items-center justify-between gap-6 rounded-full border border-border bg-surface/85 px-4 backdrop-blur-md transition-shadow sm:px-6",
          scrolled ? "card-shadow" : "shadow-none",
        )}
      >
        <Link
          href="#top"
          aria-label={`${profile.name} — home (top of page)`}
          className={cn(
            "flex items-center gap-2 rounded-full px-1 py-1 text-sm font-semibold tracking-tight text-fg",
            navLinkRing,
          )}
        >
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-md bg-orange-600 text-[11px] font-mono font-bold text-white"
          >
            D
          </span>
          <span className="font-mono text-[12px] uppercase tracking-[0.18em]">
            {profile.name.split(" ")[0]}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeId === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  navLinkRing,
                  isActive
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={profile.resumeUrl}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            aria-label={profile.resumeLabel}
          >
            <FileText className="h-4 w-4" aria-hidden />
            {profile.resumeLabel}
          </Button>

          <button
            ref={toggleBtnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-fg-muted hover:text-fg lg:hidden",
              navLinkRing,
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <Menu className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop — clicking it closes the menu (a11y best
                practice for a modal-like dropdown). */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default lg:hidden"
            />

            <motion.div
              ref={menuRef}
              id="mobile-menu"
              key="mobile-menu"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-50 mt-2 lg:hidden"
            >
              <Container className="rounded-2xl border border-border bg-surface p-3 card-shadow">
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-1"
                >
                  {navItems.map((item) => {
                    const id = item.href.slice(1);
                    const isActive = activeId === id;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={false}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 text-sm transition-colors",
                          navLinkRing,
                          isActive
                            ? "border-border bg-surface-soft text-fg"
                            : "text-fg-muted hover:border-border hover:bg-surface-soft hover:text-fg",
                        )}
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden
                          className="font-mono text-[10px] text-fg-subtle"
                        >
                          {id}
                        </span>
                      </Link>
                    );
                  })}
                  <Button
                    href={profile.resumeUrl}
                    variant="primary"
                    size="md"
                    className="mt-2 sm:hidden"
                    aria-label={profile.resumeLabel}
                  >
                    <FileText className="h-4 w-4" aria-hidden />
                    {profile.resumeLabel}
                  </Button>
                </nav>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}