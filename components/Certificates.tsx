"use client";

import { useMemo, useState } from "react";
import { Award, ChevronDown, ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { certificates } from "@/data/certificates";
import type { Certificate, CertificateCategory } from "@/types/portfolio";
import { cn } from "@/lib/cn";

const VISIBLE_LIMIT = 6;

/**
 * Preferred display order. Any category that appears in the data but
 * isn't listed here is appended in the order it first appears, so the
 * grouping is forward-compatible with new categories.
 */
const CATEGORY_ORDER: CertificateCategory[] = [
  "Game Design",
  "Cloud",
  "Programming",
  "Data",
  "Finance",
  "Other",
];

/**
 * Certificates — light theme. White horizontal cards, soft shadows,
 * "View all" disclosure. Marked `"use client"` only for the disclosure.
 */
export function Certificates() {
  const [showAll, setShowAll] = useState(false);

  const { grouped, orderedCategories } = useMemo(
    () => groupByCategory(certificates),
    [],
  );

  const visibleCount = showAll ? certificates.length : VISIBLE_LIMIT;
  const hasOverflow = certificates.length > VISIBLE_LIMIT;

  return (
    <Section
      id="certificates"
      eyebrow="Certificates"
      title="Certificates."
      description="Selected professional certificates. Grouped by category and ordered by relevance."
      className="border-t border-border"
    >
      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-8 text-center">
          <Award
            className="mx-auto h-6 w-6 text-fg-subtle"
            aria-hidden
          />
          <p className="mt-4 text-sm text-fg-muted">
            No certificates added yet. Populate{" "}
            <code className="font-mono text-fg">
              data/certificates.ts
            </code>{" "}
            with your real credentials.
          </p>
          <p className="mt-2 text-xs text-fg-subtle">
            Each entry can include a credential URL and an image — the
            section gracefully handles missing fields.
          </p>
        </div>
      ) : (
        <>
          {orderedCategories.map((category, idx) => {
            const list = grouped[category];
            if (!list || list.length === 0) return null;
            const remaining = Math.max(0, list.length - visibleCount);
            const displayed = list.slice(0, visibleCount);
            return (
              <div key={category} className="mb-8 last:mb-0">
                <div className="mb-4 flex items-end justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-fg-subtle">
                    {category}
                  </h3>
                  <span className="font-mono text-[10px] text-fg-subtle">
                    {list.length} item{list.length === 1 ? "" : "s"}
                  </span>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {displayed.map((cert) => (
                    <li key={cert.id}>
                      <CertificateRow certificate={cert} />
                    </li>
                  ))}
                </ul>
                {!showAll &&
                  remaining > 0 &&
                  idx === 0 && (
                    <p className="mt-3 text-xs text-fg-subtle">
                      + {remaining} more in this category
                    </p>
                  )}
              </div>
            );
          })}

          {hasOverflow && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm text-fg-muted transition-colors",
                  "hover:border-accent/40 hover:bg-surface-soft hover:text-fg card-shadow-soft",
                )}
                aria-expanded={showAll}
              >
                {showAll ? "Show fewer" : "View all certificates"}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    showAll && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </div>
          )}
        </>
      )}
    </Section>
  );
}

function CertificateRow({
  certificate,
}: {
  certificate: Certificate;
}) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-all hover:border-accent/40 card-shadow-soft hover:card-shadow">
      <span
        aria-hidden
        className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent-soft text-accent"
      >
        <Award className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">
          {certificate.title}
        </p>
        <p className="mt-0.5 text-xs text-fg-muted">
          {certificate.provider}
          {certificate.date && (
            <>
              <span aria-hidden> · </span>
              <span className="text-fg-subtle">{certificate.date}</span>
            </>
          )}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Tag>{certificate.category}</Tag>
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-fg-muted transition-colors hover:text-fg"
              aria-label={`${certificate.title} — credential (opens in new tab)`}
            >
              <span>Credential</span>
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Group certificates by category, building the bucket map dynamically
 * from the data so the function is robust to new categories being added
 * to the `CertificateCategory` union later. Returns the bucket map and
 * a stable display order: first the categories in `CATEGORY_ORDER` (in
 * that order), then any unknown categories in the order they first
 * appear in the data.
 */
function groupByCategory(
  list: Certificate[],
): {
  grouped: Record<string, Certificate[]>;
  orderedCategories: string[];
} {
  const grouped: Record<string, Certificate[]> = {};
  const seen: string[] = [];
  for (const c of list) {
    if (!grouped[c.category]) {
      grouped[c.category] = [];
      seen.push(c.category);
    }
    grouped[c.category].push(c);
  }

  const ordered: string[] = [];
  for (const cat of CATEGORY_ORDER) {
    if (grouped[cat]) ordered.push(cat);
  }
  for (const cat of seen) {
    if (!ordered.includes(cat)) ordered.push(cat);
  }
  return { grouped, orderedCategories: ordered };
}
