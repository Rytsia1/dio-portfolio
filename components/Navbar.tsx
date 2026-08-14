"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

/**
 * Sticky navbar. Light theme: a floating white pill on the sky-blue
 * canvas. Same scroll-spy and mobile menu behaviour as before — only
 * the styling is updated.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

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
          aria-label={`${profile.name} — home`}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-fg"
        >
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-md bg-accent text-[11px] font-mono font-bold text-white"
          >
            D
          </span>
          <span className="font-mono text-[12px] uppercase tracking-[0.18em]">
            {profile.name.split(" ")[0]}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
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
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-fg-muted hover:text-fg lg:hidden"
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
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-2 lg:hidden"
          >
            <Container className="rounded-2xl border border-border bg-surface p-3 card-shadow">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = activeId === id;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 text-sm transition-colors",
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
                    </a>
                  );
                })}
                <Button
                  href={profile.resumeUrl}
                  variant="primary"
                  size="md"
                  className="mt-2 sm:hidden"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  {profile.resumeLabel}
                </Button>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
