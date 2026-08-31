"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { certificates } from "@/data/certificates";
import type { Certificate, CertificateCategory } from "@/types/portfolio";
import { cn } from "@/lib/cn";

const VISIBLE_LIMIT = 6;

const CATEGORY_ORDER: CertificateCategory[] = [
  "Game Design",
  "Cloud",
  "Programming",
  "Data",
  "Finance",
  "Other",
];

/**
 * Verified Professional Certificates Registry.
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
      eyebrow="Credentials"
      title="Certificates & Verification"
      description="Professional industry certificates and verified educational coursework."
      className="border-t-2 border-border"
    >
      {certificates.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border-strong bg-surface p-8 text-center font-mono">
          <PixelIcon
            name="award"
            size={24}
            className="mx-auto text-fg-subtle"
          />
          <p className="mt-4 text-xs text-fg-muted">
            No credentials currently registered.
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
              <div key={category} className="mb-8 last:mb-0 font-mono">
                <div className="mb-3 flex items-end justify-between border-b border-border pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
                    [ {category} ]
                  </h3>
                  <span className="font-mono text-[10px] font-bold text-fg-subtle">
                    {list.length} item{list.length === 1 ? "" : "s"}
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {displayed.map((cert) => (
                    <li key={cert.id}>
                      <CertificateRow certificate={cert} />
                    </li>
                  ))}
                </ul>
                {!showAll && remaining > 0 && idx === 0 && (
                  <p className="mt-3 text-xs text-fg-subtle font-mono">
                    + {remaining} more credentials in this domain
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
                  "inline-flex items-center gap-2 rounded border-2 border-fg bg-surface px-4 py-2 font-mono text-xs font-bold text-fg shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5",
                  "hover:bg-surface-soft transition-colors",
                )}
                aria-expanded={showAll}
              >
                {showAll ? "Show fewer" : "View all credentials"}
                <PixelIcon
                  name="chevron-down"
                  size={12}
                  className={cn(
                    "transition-transform",
                    showAll && "rotate-180",
                  )}
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
    <div className="group flex items-start gap-3 rounded-lg border-2 border-border bg-surface p-4 font-mono shadow-[2px_2px_0px_0px_rgba(15,27,45,0.1)] transition-all hover:border-accent">
      <span
        aria-hidden="true"
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded border border-border bg-surface-soft text-accent"
      >
        <PixelIcon name="award" size={14} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-fg sm:text-sm">
          {certificate.title}
        </p>
        <p className="mt-0.5 text-[11px] text-fg-muted font-medium">
          {certificate.provider}
          {certificate.date && (
            <span className="text-fg-subtle"> · {certificate.date}</span>
          )}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Tag>{certificate.category}</Tag>
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"
              aria-label={`${certificate.title} credential verification (opens in new tab)`}
            >
              <span>Verify</span>
              <PixelIcon name="external-link" size={10} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

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