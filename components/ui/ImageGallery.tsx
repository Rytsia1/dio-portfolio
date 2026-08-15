"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types/portfolio";

interface ImageGalleryProps {
  /** Screenshot list rendered as a grid; each item opens in the lightbox. */
  items: GalleryImage[];
}

/**
 * Responsive screenshot grid with a modal lightbox preview.
 *
 * ── Why a Client Component? ─────────────────────────────────────────────
 * The case-study page is an async Server Component (great for SSG), but a
 * lightbox needs local state (open index) and global side-effects (body
 * scroll-lock, keyboard listeners). This component is the small client
 * island that owns exactly that interactivity — the rest of the page
 * stays server-rendered.
 *
 * ── Accessibility ───────────────────────────────────────────────────────
 *   • Grid items are real `<button>` elements (keyboard + screen-reader
 *     friendly) with descriptive `aria-label`s.
 *   • The lightbox is a `role="dialog"` / `aria-modal="true"` overlay.
 *   • `Escape` closes, `ArrowLeft` / `ArrowRight` navigate.
 *   • Focus moves to the close button on open and returns to the
 *     triggering thumbnail on close.
 */
export function ImageGallery({ items }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = activeIndex !== null;
  const active = isOpen ? items[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) =>
        current === null
          ? current
          : (current + delta + items.length) % items.length,
      );
    },
    [items.length],
  );

  // Side-effects while the lightbox is open: lock body scroll, move focus
  // into the dialog, and bind keyboard controls. The cleanup restores
  // everything — including focus to the thumbnail that opened the dialog.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [isOpen, close, step]);

  return (
    <>
      {/* Thumbnail grid — card containers with hover zoom */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
              aria-label={`${item.alt} — open full-size preview`}
              className="group block w-full overflow-hidden rounded-xl border border-border bg-surface text-left card-shadow-soft transition-colors hover:border-accent/40"
            >
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="block border-t border-border px-3.5 py-2.5">
                <span className="block text-sm font-medium text-fg">
                  {item.alt}
                </span>
                {item.caption && (
                  <span className="mt-0.5 block text-xs leading-relaxed text-fg-subtle">
                    {item.caption}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox modal — backdrop click / Escape closes, arrows navigate */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.alt} — full-size preview`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-fg/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <div
            className="relative flex h-[80vh] w-full max-w-5xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/15">
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
            </div>

            {/* Caption + counter */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {active.alt}
                </p>
                {active.caption && (
                  <p className="mt-0.5 truncate text-xs text-white/70">
                    {active.caption}
                  </p>
                )}
              </div>
              <p className="shrink-0 font-mono text-xs text-white/60">
                {(activeIndex ?? 0) + 1} / {items.length}
              </p>
            </div>

            {/* Close */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close image preview"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-fg/60 text-white backdrop-blur transition-colors hover:bg-fg/80"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            {/* Prev / next — only meaningful with multiple screenshots */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-fg/60 text-white backdrop-blur transition-colors hover:bg-fg/80"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-fg/60 text-white backdrop-blur transition-colors hover:bg-fg/80"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

