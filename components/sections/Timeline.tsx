import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PixelIcon, type PixelIconName } from "@/components/pixel/PixelIcon";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { cn } from "@/lib/cn";

type TimelineKind = "education" | "experience" | "achievement";

interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  date: string;
  title: string;
  subtitle: string;
  description?: string;
  url?: string;
  isInternational?: boolean;
}

const KIND_ICONS: Record<TimelineKind, PixelIconName> = {
  education: "graduation",
  experience: "briefcase",
  achievement: "trophy",
};

const KIND_LABEL: Record<TimelineKind, string> = {
  education: "Education",
  experience: "Experience",
  achievement: "Milestone",
};

/**
 * Career & Academic Timeline.
 * Quest log / progression rail with pixel badges and verified milestones.
 */
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
      isInternational: e.isInternational,
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
      eyebrow="Progression Log"
      title="Evolution & Milestones"
      description="Chronological record of education, engineering roles, and competitive milestones."
      className="border-t-2 border-border"
    >
      {entries.length === 0 ? (
        <p className="text-fg-muted font-mono text-sm">
          No timeline entries registered.
        </p>
      ) : (
        <ol className="relative space-y-8 border-l-2 border-dashed border-border-strong pl-6 sm:pl-10">
          {entries.map((entry, idx) => {
            const iconName = entry.isInternational
              ? "globe"
              : KIND_ICONS[entry.kind];

            return (
              <Reveal
                as="li"
                key={entry.id}
                delay={idx * 0.04}
                className="relative"
              >
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[37px] grid h-8 w-8 place-items-center rounded border-2 border-fg bg-surface text-fg shadow-[2px_2px_0px_0px_#0f1b2d] sm:-left-[49px]",
                    entry.isInternational && "border-sky-700 bg-sky-100 text-sky-800",
                  )}
                >
                  <PixelIcon name={iconName} size={14} />
                </span>

                {/* Entry card */}
                <article
                  className={cn(
                    "rounded-xl border-2 p-5 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.12)] font-mono",
                    entry.isInternational
                      ? "border-sky-300 bg-sky-50/70"
                      : "border-border bg-surface",
                  )}
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                          [ {KIND_LABEL[entry.kind]} ]
                        </p>

                        {entry.isInternational && (
                          <span
                            className="inline-flex items-center gap-1 rounded border border-sky-300 bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-800"
                            aria-label="International exchange programme"
                          >
                            <PixelIcon name="globe" size={10} />
                            International
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1 text-base font-bold tracking-tight text-fg">
                        {entry.title}
                      </h3>

                      <p className="mt-0.5 text-xs text-fg-muted font-semibold">
                        {entry.url ? (
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {entry.subtitle}
                          </a>
                        ) : (
                          <span>{entry.subtitle}</span>
                        )}
                      </p>
                    </div>

                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-fg-subtle">
                      [ {formatYear(entry.date)} ]
                    </span>
                  </header>

                  {entry.description && (
                    <p className="mt-3.5 text-xs leading-relaxed text-fg-muted font-mono sm:text-sm">
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