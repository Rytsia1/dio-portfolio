import { cn } from "@/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "card" | "pixel-block" | "image";
}

/**
 * Retro-themed pixel skeleton loader with stepped 8-bit pulse animation
 * and dithered scanline effect to prevent layout shifts.
 */
export function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: "rounded-sm bg-border/60",
    card: "rounded-lg border-2 border-border bg-surface-soft p-5",
    "pixel-block": "bg-fg-muted/20 border border-border-strong [image-rendering:pixelated]",
    image: "aspect-video w-full rounded-lg bg-surface-soft border border-border flex items-center justify-center",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pixel-pulse select-none overflow-hidden relative",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Retro scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,27,45,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-70" />
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-border bg-surface p-5 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.08)]">
      <div className="flex items-center justify-between gap-2 mb-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-6" />
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/60">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-14 rounded" />
      </div>
    </div>
  );
}
