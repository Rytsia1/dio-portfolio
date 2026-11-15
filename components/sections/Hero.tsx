import { ArrowDown } from "lucide-react";
import { Cloud } from "@/components/pixel/Cloud";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

const practice = [
  {
    title: "Quantitative systems",
    focus:
      "Stochastic simulation, Modern Portfolio Theory and actuarial valuation with VaR and CVaR risk metrics.",
  },
  {
    title: "Backend and web systems",
    focus:
      "REST APIs, relational data models and web frontends with FastAPI, Spring Boot, Vue 3 and SQL.",
  },
  {
    title: "Data and computation",
    focus: "DAG dependency evaluation, exact decimal arithmetic for money and vectorized NumPy.",
  },
  {
    title: "Game technology",
    focus: "Gameplay state machines, turn-based battle logic and simulation loops in Unity C#.",
  },
];

/**
 * Hero: the name, one sentence, two buttons, and the areas of practice
 * set directly on the sky. The pixel clouds sit in the padding above and
 * below the content, never behind text.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-32 pt-12 sm:pt-18">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud size="lg" variant={2} drift="reverse" className="absolute left-[54%] top-2 max-md:hidden" />
        <Cloud size="xl" variant={1} drift="slow" className="absolute bottom-7 right-[7%]" />
        <Cloud size="md" variant={3} drift="medium" opacity={0.75} className="absolute bottom-14 left-[30%] max-sm:hidden" />
        <Cloud size="sm" variant={1} drift="slow" opacity={0.7} className="absolute bottom-5 left-[4%]" />
      </div>

      <Container className="relative grid gap-12 lg:grid-cols-[58fr_42fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6 pt-2">
          <h1 className="type-display max-w-[7.4em] text-balance">{profile.name}</h1>
          <p className="max-w-[34em] text-pretty text-lg leading-relaxed text-fg-muted">
            {profile.tagline} Open to internships and junior roles.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="#work" size="lg" icon="end">
              View work
              <ArrowDown className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Contact
            </Button>
          </div>
        </div>

        <ul className="flex flex-col">
          {practice.map((item) => (
            <li key={item.title} className="border-t border-border-strong py-5 last:pb-0">
              <h2 className="type-item">{item.title}</h2>
              <p className="mt-1 text-sm leading-[1.55] text-fg-muted">{item.focus}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
