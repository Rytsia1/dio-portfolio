import { Code2, Database, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Focus — "What I Focus On" section.
 *
 * Three concise focus area cards answering the question:
 * "What kind of engineering problems does this person like solving?"
 *
 * Deliberately avoids generic skill lists. Each card describes a
 * problem domain, not a list of tools.
 */

const FOCUS_AREAS = [
  {
    id: "quant-computing",
    icon: TrendingUp,
    label: "Quantitative Computing",
    description:
      "Financial modeling, Monte Carlo simulation, constrained optimization, risk analytics (VaR, CVaR), numerical computing, and statistical analysis. Building software that turns mathematical models into interactive, measurable tools.",
    keywords: ["Monte Carlo", "Optimization", "Risk Analytics", "Numerical Methods"],
  },
  {
    id: "software-engineering",
    icon: Code2,
    label: "Software Engineering",
    description:
      "Backend systems, REST API design, relational databases, authentication, and performance-oriented architecture. Building software that is correct, maintainable, and suited for production workflows.",
    keywords: ["APIs", "Databases", "Authentication", "Architecture"],
  },
  {
    id: "data-systems",
    icon: Database,
    label: "Data & Computational Systems",
    description:
      "Data ingestion, processing pipelines, visualization, and building software around computationally intensive workloads. Making complex data legible through well-designed interfaces.",
    keywords: ["Data Processing", "Visualization", "Pipelines", "Analysis"],
  },
] as const;

export function Focus() {
  return (
    <Section
      id="focus"
      eyebrow="What I Focus On"
      title="Engineering problems I like solving."
      description="Core problem domains where my technical interests converge: quantitative modeling, backend engineering, and computational data systems."
      className="border-t border-border"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {FOCUS_AREAS.map((area, idx) => {
          const Icon = area.icon;
          return (
            <Reveal
              key={area.id}
              delay={idx * 0.06}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 card-shadow-soft transition-shadow hover:card-shadow"
            >
              {/* Icon + label */}
              <div className="mb-5 flex items-start justify-between">
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent"
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[10px] text-fg-subtle"
                >
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-base font-semibold tracking-tight text-fg">
                {area.label}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                {area.description}
              </p>

              {/* Keyword chips */}
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Related topics">
                {area.keywords.map((kw) => (
                  <li
                    key={kw}
                    className="rounded-full border border-border bg-surface-soft px-2.5 py-0.5 font-mono text-[10px] text-fg-subtle"
                  >
                    {kw}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
