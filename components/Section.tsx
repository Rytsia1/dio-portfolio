import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/Container";

interface SectionProps {
  /** DOM id used by navbar anchor links (#about, #skills, etc.). */
  id: string;
  /** Optional eyebrow text shown above the heading. */
  eyebrow?: string;
  /** Section heading. */
  title?: string;
  /** Optional supporting paragraph below the heading. */
  description?: string;
  children: ReactNode;
  className?: string;
  /** Removes the default vertical padding — used by the Hero. */
  flush?: boolean;
  /** Use a narrower container (e.g. for prose). */
  narrow?: boolean;
  /** Optional right-aligned slot next to the heading. */
  action?: ReactNode;
}

/**
 * Standard vertical section block with consistent spacing and an
 * optional heading group. Children are rendered inside a `Container`.
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
        flush ? "" : "py-12 md:py-20",
        className,
      )}
    >
      <Container narrow={narrow}>
        {hasHeader && (
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
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
