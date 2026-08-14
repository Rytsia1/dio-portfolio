import { GraduationCap, Briefcase, Trophy, Globe } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { cn } from "@/lib/cn";

/**
 * Career & education timeline — light theme. White cards, soft shadows,
 * blue/orange accent dots, mono labels.
 *
 * Entries sourced from `Experience` with `isInternational: true` receive
 * a distinct visual treatment:
 *   - Globe icon on the timeline node instead of the default Briefcase
 *   - Sky-blue node border and fill
 *   - Sky-tinted card border, gradient background, and "International
 *     Exchange" pill badge
 *
 * All other entries render with the standard kind-based colour scheme.
 */
type TimelineKind = "education" | "experience" | "achievement";

interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  date: string;
  title: string;
  subtitle: string;
  description?: string;
  url?: string;
  /**
   * Mirrors `Experience.isInternational`. When true the entry receives
   * a globe-icon node and sky-blue card styling to immediately signal
   * global academic exposure to the reader.
   */
  isInternational?: boolean;
}

const ICONS: Record<TimelineKind, typeof GraduationCap> = {
  education: GraduationCap,
  experience: Briefcase,
  achievement: Trophy,
};

const KIND_LABEL: Record<TimelineKind, string> = {
  education: "Education",
  experience: "Experience",
  achievement: "Achievement",
};

/** Node icon + colour for standard (non-international) entries. */
const KIND_ACCENT: Record<TimelineKind, string> = {
  education: "bg-accent-soft text-accent border-accent/30",
  experience: "bg-surface-soft text-fg border-border",
  achievement: "bg-accent-soft text-accent border-accent/30",
};

export function Timeline() {
  const entries: TimelineEntry[] = [
    ...education.map<TimelineEntry>((e) => ({
      id: `edu-${e.id}`,
      kind: "education",
      date: e.startDate || e.endDate,
      title: e.degree,
      subtitle: e.institution,
      description: e.notes,
      url: e.url,
    })),
    ...experiences.map<TimelineEntry>((e) => ({
      id: `exp-${e.id}`,
      kind: "experience",
      date: e.startDate,
      title: e.role,
      subtitle: e.organization,
      description: e.description,
      url: e.url,
      isInternational: e.isInternational,
    })),
    ...achievements
      .filter((a) => a.hero)
      .map<TimelineEntry>((a) => ({
        id: `ach-${a.id}`,
        kind: "achievement",
        date: a.date ?? "9999",
        title: a.title,
        subtitle: a.issuer ?? a.subtitle ?? "",
        description: a.description,
        url: a.url,
      })),
  ];

  entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <Section
      id="timeline"
      eyebrow="Career & Education"
      title="How I've evolved."
      description="A single timeline spanning education, professional experience, and key milestones — most recent first."
      className="border-t border-border"
    >
      {entries.length === 0 ? (
        <p className="text-fg-muted">
          No timeline entries yet. Populate{" "}
          <code className="font-mono text-fg">data/experience.ts</code>{" "}
          and{" "}
          <code className="font-mono text-fg">data/education.ts</code>.
        </p>
      ) : (
        <ol className="relative space-y-8 border-l-2 border-dashed border-border-strong pl-6 sm:pl-10">
          {entries.map((entry, idx) => {
            const Icon = ICONS[entry.kind];

            return (
              <Reveal
                as="li"
                key={entry.id}
                delay={idx * 0.04}
                className="relative"
              >
                {/* ── Timeline node ───────────────────────────────────── */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-9.25 grid h-9 w-9 place-items-center rounded-full border sm:-left-12.25",
                    entry.isInternational
                      ? "border-sky-300 bg-sky-50 text-sky-600"
                      : KIND_ACCENT[entry.kind],
                  )}
                >
                  {entry.isInternational ? (
                    <Globe className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </span>

                {/* ── Entry card ──────────────────────────────────────── */}
                <article
                  className={cn(
                    "rounded-2xl border p-5 card-shadow-soft",
                    entry.isInternational
                      ? "border-sky-200 bg-linear-to-br from-sky-50/60 to-surface"
                      : "border-border bg-surface",
                  )}
                >
                  <header className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      {/* Kind label + optional international badge */}
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                          {KIND_LABEL[entry.kind]}
                        </p>

                        {entry.isInternational && (
                          <span
                            className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-700"
                            aria-label="International exchange programme"
                          >
                            <Globe className="h-2.5 w-2.5" aria-hidden />
                            International Exchange
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1 text-base font-semibold tracking-tight text-fg">
                        {entry.title}
                      </h3>

                      <p className="mt-1 text-sm text-fg-muted">
                        {entry.url ? (
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-fg"
                          >
                            {entry.subtitle}
                          </a>
                        ) : (
                          <span>{entry.subtitle}</span>
                        )}
                      </p>
                    </div>

                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
                      {formatYear(entry.date)}
                    </span>
                  </header>

                  {entry.description && (
                    <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                      {entry.description}
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </ol>
      )}
    </Section>
  );
}

function formatYear(raw: string): string {
  if (!raw) return "";
  if (/^\d{4}/.test(raw)) return raw.slice(0, 4);
  return raw;
}
