import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PixelIcon } from "@/components/pixel/PixelIcon";
import { achievements } from "@/data/achievements";
import type { Achievement } from "@/types/portfolio";
import { cn } from "@/lib/cn";

/**
 * Achievements Unlocked & Competition Milestones.
 * Authentic retro trophy showcase with verified records.
 */
export function Achievements() {
  const heroes = achievements.filter((a) => a.hero);
  const rest = achievements.filter((a) => !a.hero);

  return (
    <Section
      id="achievements"
      eyebrow="Trophy Room"
      title="Achievements Unlocked"
      description="Verified competition placements, national hackathons, and institutional recognition."
      className="border-t-2 border-border"
    >
      {achievements.length === 0 ? (
        <p className="text-fg-muted font-mono text-sm">
          No achievements registered.
        </p>
      ) : (
        <>
          {/* Major National / International Trophies (2-column spotlight) */}
          {heroes.length > 0 && (
            <div className="mb-8 sm:mb-10">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <PixelIcon name="trophy" size={14} />
                [ MAJOR COMPETITIVE PLACEMENTS ]
              </div>
              <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {heroes.map((a, idx) => (
                  <Reveal as="li" key={a.id} delay={idx * 0.05} className="h-full">
                    <HeroAchievementCard achievement={a} />
                  </Reveal>
                ))}
              </ul>
            </div>
          )}

          {/* Standard Verified Milestones (2-column matrix) */}
          {rest.length > 0 && (
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-fg-subtle">
                <PixelIcon name="award" size={14} />
                [ ADDITIONAL VERIFIED MILESTONES ]
              </div>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {rest.map((a, idx) => (
                  <Reveal as="li" key={a.id} delay={idx * 0.04} className="h-full">
                    <StandardAchievementCard achievement={a} />
                  </Reveal>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Section>
  );
}

function HeroAchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-border bg-surface p-6 sm:p-7 font-mono shadow-[3px_3px_0px_0px_rgba(15,27,45,0.14)]",
        "hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(194,65,12,0.3)] transition-all",
      )}
    >
      <div className="flex items-start justify-between border-b border-border pb-3">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded border-2 border-fg bg-accent text-white shadow-[2px_2px_0px_0px_#0f1b2d]"
        >
          <PixelIcon name="trophy" size={16} />
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-fg-subtle">
          [ {achievement.date ?? "VERIFIED"} ]
        </span>
      </div>

      <p className="mt-5 font-mono text-xl font-bold uppercase tracking-tight text-fg sm:text-2xl">
        {achievement.badge ?? achievement.title}
      </p>

      {achievement.subtitle && (
        <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-accent">
          {achievement.subtitle}
        </p>
      )}

      {achievement.description && (
        <p className="mt-4 text-xs leading-relaxed text-fg-muted font-mono sm:text-sm">
          {achievement.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-6 text-xs text-fg-subtle border-t border-border/60 mt-5">
        <span className="font-bold text-fg-muted">{achievement.issuer ?? ""}</span>
        {achievement.url && (
          <a
            href={achievement.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-accent hover:underline"
            aria-label={`${achievement.title} record (opens in new tab)`}
          >
            <span>Record</span>
            <PixelIcon name="external-link" size={11} />
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
        "group flex h-full flex-col rounded-xl border-2 border-border bg-surface p-5 font-mono shadow-[2px_2px_0px_0px_rgba(15,27,45,0.1)]",
        "hover:border-accent hover:shadow-[3px_3px_0px_0px_rgba(194,65,12,0.25)] transition-all",
      )}
    >
      <div className="flex items-start justify-between border-b border-border/70 pb-2.5">
        <span
          aria-hidden="true"
          className="grid h-7 w-7 place-items-center rounded border border-border bg-surface-soft text-accent"
        >
          <PixelIcon name="award" size={14} />
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-fg-subtle">
          [ {achievement.category} ]
        </span>
      </div>

      <h3 className="mt-3 text-sm font-bold tracking-tight text-fg sm:text-base">
        {achievement.title}
      </h3>

      {achievement.description && (
        <p className="mt-2 text-xs leading-relaxed text-fg-muted font-mono">
          {achievement.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-4 text-xs text-fg-subtle border-t border-border/60 mt-4">
        <span>{achievement.issuer ?? achievement.date ?? ""}</span>
        {achievement.url && (
          <a
            href={achievement.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
            aria-label={`${achievement.title} details (opens in new tab)`}
          >
            <span>Details</span>
            <PixelIcon name="external-link" size={10} />
          </a>
        )}
      </div>
    </article>
  );
}