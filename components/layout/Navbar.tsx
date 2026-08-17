"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

const navLinkRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.split("#")[1]);
    const sections = ids
      .map((id) => document.getElementById(id as string))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
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

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <Container
        className={cn(
          "flex h-14 items-center justify-between gap-4 rounded-xl border-2 border-border bg-surface/95 px-4 shadow-[2px_2px_0px_0px_rgba(15,27,45,0.12)] sm:px-6 font-mono",
          scrolled ? "border-accent/40 shadow-[3px_3px_0px_0px_rgba(194,65,12,0.2)]" : "",
        )}
      >
        {/* Retro Brand Mark */}
        <Link
          href="/#top"
          aria-label={`${profile.name} - home`}
          className={cn(
            "flex items-center gap-2 rounded px-1.5 py-1 text-sm font-bold tracking-tight text-fg hover:text-accent transition-colors",
            navLinkRing,
          )}
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded border border-fg bg-accent text-[11px] font-mono font-bold text-white shadow-[1px_1px_0px_0px_#0f1b2d]"
          >
            D
          </span>
          <span className="font-mono text-xs uppercase tracking-widest">
            {profile.name.split(" ")[0]}
            <span className="text-accent">_</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = activeId === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "rounded px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors",
                  navLinkRing,
                  isActive
                    ? "bg-accent-soft text-accent border border-accent/40"
                    : "text-fg-muted hover:text-fg hover:bg-surface-soft",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            href={profile.resumeUrl}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            aria-label={profile.resumeLabel}
          >
            <PixelIcon name="file-text" size={12} />
            {profile.resumeLabel}
          </Button>

          <button
            ref={toggleBtnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded border-2 border-fg bg-surface text-fg shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5 lg:hidden",
              navLinkRing,
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <PixelIcon name="close" size={14} />
            ) : (
              <PixelIcon name="menu" size={14} />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <>
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
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative z-50 mt-2 lg:hidden font-mono"
            >
              <Container className="rounded-xl border-2 border-border bg-surface p-3 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.18)]">
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-1"
                >
                  {navItems.map((item) => {
                    const id = item.href.split("#")[1];
                    const isActive = activeId === id;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={false}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                          navLinkRing,
                          isActive
                            ? "border border-accent bg-accent-soft text-accent"
                            : "text-fg-muted hover:bg-surface-soft hover:text-fg",
                        )}
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] text-fg-subtle"
                        >
                          [ {id} ]
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
                    <PixelIcon name="file-text" size={14} />
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