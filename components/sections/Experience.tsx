import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/cn";

/**
 * Work Experience Section.
 * Practical development roles and engineering internships.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Work Experience"
      title="Engineering History"
      description="Professional engineering internships, studio programmes, and software development history."
      className="border-t-2 border-border"
    >
      {experiences.length === 0 ? (
        <p className="text-fg-muted font-mono text-sm">
          No experience entries registered.
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
                aria-hidden="true"
                className={cn(
                  "absolute -left-[37px] grid h-8 w-8 place-items-center rounded border-2 border-fg bg-accent text-white shadow-[2px_2px_0px_0px_#0f1b2d] sm:-left-[49px]",
                )}
              >
                <PixelIcon name="briefcase" size={14} />
              </span>

              <article className="rounded-xl border-2 border-border bg-surface p-6 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.12)] font-mono">
                <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-fg sm:text-lg">
                      {exp.role}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-accent">
                      <PixelIcon name="briefcase" size={12} />
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {exp.organization}
                        </a>
                      ) : (
                        <span>{exp.organization}</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-xs text-fg-subtle font-mono">
                    <p className="font-bold uppercase tracking-wider text-fg">
                      [ {formatRange(exp.startDate, exp.endDate)} ]
                    </p>
                    {exp.location && (
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-fg-muted">
                        <PixelIcon name="map-pin" size={10} />
                        {exp.location}
                      </p>
                    )}
                  </div>
                </header>

                {exp.description && (
                  <p className="mt-4 text-xs leading-relaxed text-fg-muted sm:text-sm">
                    {exp.description}
                  </p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mt-4 space-y-2 text-xs text-fg-muted sm:text-sm">
                    {exp.responsibilities.map((resp: string, ri: number) => (
                      <li key={ri} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="pixel-bullet" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
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
  return `${s} to ${e}`;
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