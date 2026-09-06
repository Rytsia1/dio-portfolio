import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

/**
 * BeyondTheCode — personal narrative section.
 *
 * Communicates the progression:
 *   Game Technology → Software Engineering → Computational Systems → Quantitative Finance
 *
 * Purpose: explain why this background is a strength, not a gap.
 * The game design origin is framed as the root of systems-thinking,
 * not as something to hide.
 *
 * Tone: concrete and technical. No inspirational clichés.
 */
export function BeyondTheCode() {
  return (
    <Section
      id="beyond"
      eyebrow="Beyond the Code"
      title="How I got here."
      className="relative border-t border-border"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Narrative text */}
        <Reveal className="space-y-5 text-base leading-relaxed text-fg-muted lg:col-span-7">
        <p>
            I started in Game Technology at the Electronic Engineering
            Polytechnic Institute of Surabaya, where I learned to think
            in terms of systems, constraints, and iteration. Building
            games taught me how seemingly simple interactions can depend
            on carefully designed logic, data, and performance.
          </p>
          <p>
            That way of thinking gradually led me beyond game
            development. I began building full-stack applications,
            working with backend systems, databases, and financial data.
            During a 10-day software production internship at Shandong
            University of Science and Technology, I built a financial
            management platform from scratch using Java, Spring Boot,
            and Vue.
          </p>
          <p>
            From there, I became increasingly interested in quantitative
            computing. I explored portfolio optimization, Monte Carlo
            simulation, and risk analytics through projects such as
            Portfolio Optimizer and Actura.
          </p>
          <p>
            Game technology is still an important part of how I think
            about software. I simply enjoy applying that
            systems-oriented mindset to new problems — especially those
            involving computation, data, and financial systems.
          </p>
        </Reveal>

        {/* Stat block */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Stat label="Current focus" value="Software Engineering · Quantitative Finance" />
            <Stat
              label="Interests"
              value="Quant Computing · Fintech · Data · Games"
            />
            <Stat
              label="Education"
              value="D4 Game Technology · PENS"
            />
            <Stat label="Based in" value={profile.location ?? "Indonesia"} />
          </dl>

          {/* Progression timeline */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5 card-shadow-soft">
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              Progression
            </p>
            <ol className="space-y-2">
              {[
                "Game Technology",
                "Software Engineering",
                "Computational Systems",
                "Quantitative Finance",
              ].map((step, i, arr) => (
                <li key={step} className="flex items-center gap-2.5 text-sm">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className={i === arr.length - 1 ? "font-medium text-fg" : "text-fg-muted"}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 card-shadow-soft">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-fg">{value}</dd>
    </div>
  );
}
