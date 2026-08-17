"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types/portfolio";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { Skeleton } from "@/components/ui/Skeleton";

interface ImageGalleryProps {
  items: GalleryImage[];
}

/**
 * Retro Pixel Screenshot Gallery with Lightbox & Skeleton Loaders.
 */
export function ImageGallery({ items }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
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
      {/* Thumbnail grid */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const isLoaded = loadedMap[item.src];
          return (
            <li key={item.src}>
              <button
                type="button"
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
                aria-label={`${item.alt} - open full resolution screenshot`}
                className="group block w-full overflow-hidden rounded-lg border-2 border-border bg-surface text-left shadow-[2px_2px_0px_0px_rgba(15,27,45,0.12)] transition-all hover:border-accent hover:shadow-[3px_3px_0px_0px_rgba(194,65,12,0.3)] active:translate-x-0.5 active:translate-y-0.5"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-surface-soft">
                  {!isLoaded && (
                    <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                  )}
                  <Image
                    src={item.src}
                    alt={item.alt || "Project screenshot"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    style={{ imageRendering: "pixelated" }}
                    onLoad={() =>
                      setLoadedMap((prev) => ({ ...prev, [item.src]: true }))
                    }
                  />
                </div>
                <div className="border-t border-border px-3.5 py-2.5">
                  <span className="block font-mono text-xs font-bold text-fg">
                    {item.alt}
                  </span>
                  {item.caption && (
                    <span className="mt-0.5 block font-mono text-[11px] leading-relaxed text-fg-muted">
                      {item.caption}
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Lightbox modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.alt} - full preview`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-fg/85 p-4 sm:p-8"
          onClick={close}
        >
          <div
            className="relative flex h-[80vh] w-full max-w-5xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border-2 border-white/20 bg-black/40">
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            {/* Caption + counter */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="min-w-0 font-mono">
                <p className="truncate text-sm font-bold text-white">
                  {active.alt}
                </p>
                {active.caption && (
                  <p className="mt-0.5 truncate text-xs text-white/80">
                    {active.caption}
                  </p>
                )}
              </div>
              <p className="shrink-0 font-mono text-xs font-bold text-white/80">
                [ {(activeIndex ?? 0) + 1} / {items.length} ]
              </p>
            </div>

            {/* Close */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close image preview"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded border-2 border-fg bg-accent text-white shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5"
            >
              <PixelIcon name="close" size={16} />
            </button>

            {/* Prev / next */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded border-2 border-fg bg-surface text-fg shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5"
                >
                  <PixelIcon name="arrow-left" size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded border-2 border-fg bg-surface text-fg shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5"
                >
                  <PixelIcon name="arrow-right" size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
