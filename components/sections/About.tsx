import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Decor } from "@/components/pixel/Decor";
import { PixelIcon, type PixelIconName } from "@/components/pixel/PixelIcon";
import { profile } from "@/data/profile";

/**
 * Developer Profile & Technical Dossier.
 * RPG character spec sheet layout displaying technical background and systems mindset.
 */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="Profile & Background"
      title="Systems Thinking: Game Tech to Software Engineering"
      description="Bridging interactive game systems with high-precision enterprise software and quantitative models."
      className="relative border-t-2 border-border"
    >
      <Decor
        kind="star"
        size={24}
        className="absolute right-8 top-8 hidden lg:block opacity-60"
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Dossier: Narrative Breakdown */}
        <Reveal className="lg:col-span-7">
          <div className="rounded-xl border-2 border-border bg-surface p-6 sm:p-8 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.14)] space-y-4 font-mono text-sm leading-relaxed text-fg-muted sm:text-base">
            <div className="flex items-center gap-2 border-b border-border pb-3 text-xs font-bold text-accent uppercase tracking-wider">
              <PixelIcon name="terminal" size={14} />
              [ LOG: ORIGIN & METHODOLOGY ]
            </div>

            <p>
              I studied Game Technology at Politeknik Elektronika Negeri
              Surabaya (PENS), where I built deep intuition for state machines,
              game loops, spatial simulation, and user-centric systems.
              During my early projects, I engineered serious and educational
              games, reaching the national finals of KMIPN 2025 and the Top 60
              of Gameseed 2025.
            </p>

            <p>
              Designing games requires strict performance budgets, deterministic
              logic, and immediate user feedback. These exact constraints
              naturally translate to backend systems and financial computing.
              During my Software Production Internship at Shandong University of
              Science and Technology, I built a full-stack personal bookkeeping
              platform (Spring Boot, Java 25, MyBatis, MySQL, Vue 3) with
              high-precision monetary math to completely prevent floating-point
              drift.
            </p>

            <p>
              My work now spans full-stack software architecture and quantitative
              finance, implementing Modern Portfolio Theory, Monte Carlo
              simulations, and numerical options pricing directly from
              mathematical first principles.
            </p>
          </div>
        </Reveal>

        {/* Right Dossier: RPG Dev Attributes & Spec Matrix */}
        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="rounded-xl border-2 border-border bg-surface p-6 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.14)] font-mono">
            <div className="flex items-center gap-2 border-b border-border pb-3 text-xs font-bold text-accent uppercase tracking-wider">
              <PixelIcon name="code" size={14} />
              [ PLAYER SPECIFICATIONS ]
            </div>

            <div className="mt-4 space-y-3.5">
              <SpecRow
                icon="sword"
                label="Primary Role"
                value={profile.role}
              />
              <SpecRow
                icon="graduation"
                label="Education"
                value="D4 Game Technology · PENS"
              />
              <SpecRow
                icon="layers"
                label="Core Stack"
                value="Java · Python · C# · TypeScript · Unity"
              />
              <SpecRow
                icon="shield"
                label="Domains"
                value="Game Tech · FinTech · Quant Finance · Full-Stack"
              />
              <SpecRow
                icon="map-pin"
                label="Location"
                value={profile.location ?? "Indonesia (Open to Remote / Relocation)"}
              />
              <SpecRow
                icon="star"
                label="Availability"
                value="Open for Software & Game Engineering"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function SpecRow({
  icon,
  label,
  value,
}: {
  icon: PixelIconName;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded border border-border bg-surface-soft p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
        <PixelIcon name={icon} size={12} />
        {label}
      </div>
      <div className="mt-1 text-xs font-semibold text-fg sm:text-sm">
        {value}
      </div>
    </div>
  );
}