"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

/**
 * Sticky pill navbar. Three links fit at every width, so there is no
 * mobile menu: below `sm` only the name is hidden (it stays in the
 * accessible name of the home link).
 *
 * The section in view is marked with `aria-current="location"`, the
 * recommended value for scroll-spy navigation within one page.
 */
export function Navbar() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.split("#")[1]))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-50 pt-4">
      <Container>
        <nav
          aria-label="Main"
          className="pointer-events-auto flex h-15 items-center justify-between gap-2 rounded-full border border-border bg-surface p-2 card-shadow-soft"
        >
          <Link
            href="/#top"
            className="flex h-11 items-center gap-2.5 rounded-full pl-1 pr-4 text-[15px] font-semibold text-fg"
          >
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-full bg-accent-fill text-base font-extrabold text-on-accent"
            >
              D
            </span>
            <span className="max-sm:sr-only">{profile.name}</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.href.split("#")[1];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-surface-soft text-fg"
                      : "text-fg-muted hover:bg-surface-soft hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </Container>
    </header>
  );
}
