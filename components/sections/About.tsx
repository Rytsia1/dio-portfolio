import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Decor } from "@/components/pixel/Decor";
import { profile } from "@/data/profile";

/**
 * About — light editorial design. Same content as before (the career
 * transition narrative), only the visual styling is updated.
 */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="From game systems to software systems."
      description={profile.shortBio}
      className="relative border-t border-border"
    >
      <Decor
        kind="star"
        size={20}
        className="absolute right-8 top-8 hidden lg:block"
      />
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-fg-muted lg:col-span-7">
          <p>
            I started in Game Technology at Politeknik Elektronika
            Negeri Surabaya, where I learned to think about systems,
            gameplay, interaction, and user experience. My previous
            portfolio was anchored on educational games — building
            playful, structured experiences for elementary and
            middle-school students as part of a Game for Education
            and Cultural Heritage programme, with two projects
            reaching the finals of KMIPN 2025 and the Top 60 of
            Gameseed 2025.
          </p>
          <p>
            That foundation — modelling a problem, designing a system
            that can be played with, and iterating until it feels
            right — turned out to be exactly what software
            engineering is also asking for. So I started building
            real systems: a full-stack personal bookkeeping platform
            (Spring Boot, MyBatis, Vue, Element Plus, MySQL) during a
            Software Production Internship, and a pair of
            quantitative-finance projects that take Modern Portfolio
            Theory and options pricing seriously enough to implement
            them from numerical first principles.
          </p>
          <p>
            I'm not moving away from game development. It's
            still an important part of how I think. What changed is
            that I've expanded into broader software engineering,
            full-stack systems, and quantitative finance — and I
            continue to explore whatever technical problem is the
            most interesting thing in front of me.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Stat label="Current role" value="Software Engineer" />
            <Stat
              label="Interests"
              value="Software · Quant · FinTech · Games · Data"
            />
            <Stat
              label="Education"
              value="D4 Game Technology · PENS"
            />
            <Stat label="Based in" value={profile.location ?? "—"} />
          </dl>
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