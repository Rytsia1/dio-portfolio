import { Briefcase, MapPin } from "lucide-react";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { Reveal } from "@/components/Reveal";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/cn";

/**
 * Experience — light theme. White cards on a dashed left rail, orange
 * accent dot, mono date labels.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked."
      description="Internships, programs, and other professional work — listed most recent first."
      className="border-t border-border"
    >
      {experiences.length === 0 ? (
        <p className="text-fg-muted">
          No experience entries yet. Add some to{" "}
          <code className="font-mono text-fg">data/experience.ts</code>.
        </p>
      ) : (
        <ol className="relative space-y-8 border-l-2 border-dashed border-border-strong pl-6 sm:pl-10">
          {experiences.map((exp, idx) => (
            <Reveal
              as="li"
              key={exp.id}
              delay={idx * 0.04}
              className="relative"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[37px] grid h-9 w-9 place-items-center rounded-full border border-accent/30 bg-accent-soft text-accent sm:-left-[49px]",
                )}
              >
                <Briefcase className="h-3.5 w-3.5" aria-hidden />
              </span>

              <article className="rounded-2xl border border-border bg-surface p-6 card-shadow-soft">
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-fg">
                      {exp.role}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-fg-muted">
                      <Briefcase
                        className="h-3.5 w-3.5 text-fg-subtle"
                        aria-hidden
                      />
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-fg"
                        >
                          {exp.organization}
                        </a>
                      ) : (
                        <span>{exp.organization}</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-xs text-fg-subtle">
                    <p className="font-mono uppercase tracking-[0.18em]">
                      {formatRange(exp.startDate, exp.endDate)}
                    </p>
                    {exp.location && (
                      <p className="mt-1 inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden />
                        {exp.location}
                      </p>
                    )}
                  </div>
                </header>

                {exp.description && (
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    {exp.description}
                  </p>
                )}

                {exp.responsibilities &&
                  exp.responsibilities.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                      {exp.responsibilities.map(
                        (resp: string, ri: number) => (
                          <li key={ri} className="flex gap-2.5">
                            <span
                              aria-hidden
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            <span>{resp}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech: string) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      )}
    </Section>
  );
}

function formatRange(start: string, end: string): string {
  const format = (raw: string): string => {
    if (!raw) return "";
    if (/^\d{4}-\d{2}$/.test(raw)) {
      const [year, month] = raw.split("-");
      const monthIndex = Number(month) - 1;
      const monthName = MONTH_NAMES[monthIndex] ?? month;
      return `${monthName} ${year}`;
    }
    if (/^\d{4}$/.test(raw)) {
      return raw;
    }
    return raw;
  };
  const s = format(start);
  const e = format(end);
  if (!s && !e) return "";
  if (!e) return s;
  if (!s) return e;
  if (s === e) return s;
  return `${s} — ${e}`;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
