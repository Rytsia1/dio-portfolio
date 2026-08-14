import { Award, ExternalLink, Trophy } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { achievements } from "@/data/achievements";
import type { Achievement } from "@/types/portfolio";
import { cn } from "@/lib/cn";

/**
 * Achievements — light theme. Hero cards for the biggest wins on
 * white, large orange-tinged typography, soft shadows.
 */
export function Achievements() {
  const heroes = achievements.filter((a) => a.hero);
  const rest = achievements.filter((a) => !a.hero);

  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Recognition."
      description="Competitions, milestones, and other notable results — verified and on the record."
      className="border-t border-border"
    >
      {achievements.length === 0 ? (
        <p className="text-fg-muted">
          No achievements yet. Add some to{" "}
          <code className="font-mono text-fg">data/achievements.ts</code>.
        </p>
      ) : (
        <>
          {heroes.length > 0 && (
            <ul className="mb-12 grid gap-5 md:grid-cols-2">
              {heroes.map((a, idx) => (
                <Reveal as="li" key={a.id} delay={idx * 0.05} className="h-full">
                  <HeroAchievementCard achievement={a} />
                </Reveal>
              ))}
            </ul>
          )}

          {rest.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, idx) => (
                <Reveal as="li" key={a.id} delay={idx * 0.05} className="h-full">
                  <StandardAchievementCard achievement={a} />
                </Reveal>
              ))}
            </ul>
          )}
        </>
      )}
    </Section>
  );
}

function HeroAchievementCard({
  achievement,
}: {
  achievement: Achievement;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all sm:p-8",
        "hover:border-accent/40 card-shadow-soft hover:card-shadow",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          aria-hidden
          className="grid h-10 w-10 place-items-center rounded-full border border-accent/30 bg-accent-soft text-accent"
        >
          <Trophy className="h-4 w-4" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
          {achievement.date ?? ""}
        </span>
      </div>

      <p className="mt-10 font-mono text-4xl font-bold uppercase leading-[0.95] tracking-[0.02em] text-fg sm:text-6xl">
        {achievement.badge ?? achievement.title}
      </p>
      {achievement.subtitle && (
        <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {achievement.subtitle}
        </p>
      )}

      {achievement.description && (
        <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-muted">
          {achievement.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-8 text-xs text-fg-subtle">
        <span>{achievement.issuer ?? ""}</span>
        {achievement.url && (
          <a
            href={achievement.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-fg-muted transition-colors hover:text-fg"
            aria-label={`${achievement.title} — learn more (opens in new tab)`}
          >
            <span>Details</span>
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

function StandardAchievementCard({
  achievement,
}: {
  achievement: Achievement;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all",
        "hover:border-accent/40 hover:card-shadow-soft",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full border border-accent/30 bg-accent-soft text-accent"
        >
          <Award className="h-4 w-4" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
          {achievement.category}
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-fg">
        {achievement.title}
      </h3>
      {achievement.description && (
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {achievement.description}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-5 text-xs text-fg-subtle">
        <span>{achievement.issuer ?? achievement.date ?? ""}</span>
        {achievement.url && (
          <a
            href={achievement.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-fg-muted transition-colors hover:text-fg"
            aria-label={`${achievement.title} — learn more (opens in new tab)`}
          >
            <span>Details</span>
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}
