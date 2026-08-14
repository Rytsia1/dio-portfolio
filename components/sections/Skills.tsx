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
      id="skills"
      eyebrow="Skills"
      title="What I work with."
      description="A working set of languages, frameworks, and tools — grouped by where they show up in my projects."
      className="border-t border-border"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, idx) => (
          <Reveal
            key={category.id}
            delay={idx * 0.04}
            className="rounded-2xl border border-border bg-surface p-6 card-shadow-soft transition-shadow hover:card-shadow"
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