import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { skillCategories } from "@/data/skills";

/**
 * Skills — light theme. White cards on the sky-blue background, soft
 * shadows, orange eyebrow labels.
 */
export function Skills() {
  return (
    <Section
      id="stack"
      eyebrow="Engineering Stack"
      title="What I build with."
      description="Technologies grouped by domain — the tools I reach for when building backend systems, quantitative models, and full-stack applications."
      className="border-t border-border"
    >
      <div className="flex flex-wrap justify-center gap-6">
        {skillCategories.map((category, idx) => (
          <Reveal
            key={category.id}
            delay={idx * 0.04}
            className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333333%-16px)] rounded-2xl border border-border bg-surface p-6 card-shadow-soft transition-shadow hover:card-shadow"
          >
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight text-fg">
                {category.title}
              </h3>
              <span
                aria-hidden
                className="font-mono text-[10px] text-fg-subtle"
              >
                0{idx + 1}
              </span>
            </div>
            {category.description && (
              <p className="mb-5 text-sm text-fg-muted">
                {category.description}
              </p>
            )}
            <ul className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <Tag emphasis={skill.emphasis}>{skill.name}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}