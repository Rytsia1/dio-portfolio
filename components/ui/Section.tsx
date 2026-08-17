import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  flush?: boolean;
  narrow?: boolean;
  action?: ReactNode;
}

/**
 * Retro Pixel Section Container.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  flush = false,
  narrow = false,
  action,
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description || action);
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        flush ? "" : "py-12 md:py-18",
        className,
      )}
    >
      <Container narrow={narrow}>
        {hasHeader && (
          <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl font-mono">
              {eyebrow && (
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                  [ {eyebrow} ]
                </p>
              )}
              {title && (
                <h2 className="headline-section text-fg">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-3 text-sm leading-relaxed text-fg-muted font-mono sm:text-base">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}