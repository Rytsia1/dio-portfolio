import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Button, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { requireProject } from "@/data/projects";

// Measured in Actura's own benchmark suite; see `results` in data/projects.ts.
const benchmarks = [
  { value: "0.07 s", label: "10,000 Monte Carlo paths" },
  { value: "0.80 s", label: "100,000 paths" },
  { value: "0.12 s", label: "10,000-policy valuation" },
];

/**
 * Selected work: Actura as the one dark panel, then two supporting
 * projects as cards, then the link to the full archive.
 */
export function Work() {
  const actura = requireProject("actura");
  const supporting = [requireProject("portfolio-optimizer"), requireProject("book-it-quick")];

  return (
    <section id="work" className="scroll-mt-24 pb-24">
      {/* Old links to /#projects still land here. */}
      <span id="projects" className="sr-only" />

      <Container className="flex flex-col gap-8">
        <h2 className="type-section">Selected work</h2>

        <div className="flex flex-col gap-6">
          <article className="grid items-center gap-3 rounded-card bg-panel p-3 card-shadow lg:grid-cols-[42fr_58fr]">
            <div className="flex flex-col gap-6 p-5">
              <div className="flex flex-col gap-3">
                <p className="type-label text-panel-accent">Flagship</p>
                <h3 className="type-card text-panel-fg">{actura.title}</h3>
                <p className="text-pretty text-[15px] leading-relaxed text-panel-muted">
                  An open-source actuarial valuation platform. It evaluates life-insurance cash
                  flows as a DAG and reports a Monte Carlo liability distribution.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <dl className="flex flex-wrap gap-x-8 gap-y-4">
                  {benchmarks.map((item) => (
                    <div key={item.label} className="flex flex-col-reverse gap-0.5">
                      <dt className="text-[13px] leading-normal text-panel-subtle">{item.label}</dt>
                      <dd className="font-mono text-[22px] font-semibold leading-tight tabular-nums text-panel-fg">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-[13px] leading-normal text-panel-subtle">
                  Median of 3 runs on a Ryzen 7 7735HS with 16 GB RAM.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/projects/${actura.slug}`}
                  aria-label={`Case study: ${actura.title}`}
                  className={buttonClass({ icon: "end", className: "focus-visible:outline-panel-accent" })}
                >
                  Case study
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                {actura.githubUrl && (
                  <Button
                    href={actura.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="panel"
                    icon="start"
                    aria-label={`Code: ${actura.title} on GitHub (opens in new tab)`}
                    className="focus-visible:outline-panel-accent"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    Code
                  </Button>
                )}
              </div>
            </div>

            {actura.coverImage && (
              <Image
                src={actura.coverImage}
                alt="Actura blueprint builder: a node graph of insurance cash flows feeding a valuation node"
                width={1024}
                height={575}
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
                className="h-auto w-full rounded-sm"
              />
            )}
          </article>

          <div className="grid gap-6 md:grid-cols-2">
            {supporting.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <div>
          <Link href="/projects" className={buttonClass({ variant: "secondary", icon: "end" })}>
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
