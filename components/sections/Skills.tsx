import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { PixelIcon, type PixelIconName } from "@/components/pixel/PixelIcon";
import { skillCategories } from "@/data/skills";

const CATEGORY_ICONS: Record<string, PixelIconName> = {
  "game-design-development": "gamepad",
  "programming-languages": "code",
  "full-stack-web": "layers",
  "data-tools": "terminal",
  "soft-skills": "star",
};

/**
 * Skills & Technical Inventory.
 * Game Developer & Systems Engineer Skill Matrix.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Inventory"
      title="Engineering Stack & Skill Tree"
      description="Languages, game engines, framework ecosystems, and numerical tooling applied across my projects."
      className="border-t-2 border-border"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {skillCategories.map((category, idx) => {
          const iconName = CATEGORY_ICONS[category.id] ?? "code";
          return (
            <Reveal
              key={category.id}
              delay={idx * 0.04}
              className="rounded-xl border-2 border-border bg-surface p-5 sm:p-6 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.12)] hover:border-accent transition-colors font-mono"
            >
              <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded bg-surface-soft border border-border text-accent">
                    <PixelIcon name={iconName} size={14} />
                  </span>
                  <h3 className="font-mono text-sm font-bold tracking-tight text-fg">
                    {category.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] font-bold text-fg-subtle"
                >
                  [ 0{idx + 1} ]
                </span>
              </div>

              {category.description && (
                <p className="mb-4 font-mono text-xs leading-relaxed text-fg-muted">
                  {category.description}
                </p>
              )}

              <ul className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <Tag
                      emphasis={
                        skill.emphasis === "accent"
                          ? "accent"
                          : category.id === "game-design-development"
                            ? "game"
                            : "default"
                      }
                    >
                      {skill.name}
                    </Tag>
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