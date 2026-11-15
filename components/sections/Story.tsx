import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

// On the sky, link hovers use accent-strong: plain accent is 4.4:1 there.
const textLink =
  "underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong";

const stack = [
  { label: "Languages", items: "Python, Java, TypeScript, JavaScript, C#, SQL" },
  { label: "Frameworks", items: "FastAPI, Spring Boot, Vue 3, Streamlit, Unity, Godot" },
  {
    label: "Data and infrastructure",
    items: "NumPy, SciPy, Plotly, ECharts, MySQL, SQLite, Docker",
  },
];

const experience: {
  role: string;
  org: string;
  href?: string;
  when: string;
  current?: boolean;
  note: string;
}[] = [
  {
    role: "AI Full-Stack Developer Apprenticeship",
    org: "Asah by Dicoding",
    href: "https://www.dicoding.com/asah",
    when: "Now",
    current: true,
    note: "Building web applications and integrating LLM APIs into backend services on the Dicoding and GoTo learning path.",
  },
  {
    role: "Google Student Ambassador",
    org: "Google",
    href: "https://googlestudentambassador.id/",
    when: "Now",
    current: true,
    note: "Running campus developer workshops and peer study groups on Google technologies at PENS.",
  },
  {
    role: "Exchange student, Software Engineering",
    org: "Shandong University of Science and Technology, Qingdao",
    when: "Mar-Jul 2026",
    note: "One-semester exchange. Built Book-it-quick in a 10-day software production module.",
  },
  {
    role: "Junior Game Designer",
    org: "GECH Surabaya",
    when: "2024-Jan 2025",
    note: "Simulation state machines, battle math and player state flow.",
  },
];

const recognition: { title: string; note: ReactNode }[] = [
  {
    title: "Gameseed 2025, top 60 of 122 teams",
    note: (
      <>
        With the Unity game{" "}
        <Link href="/projects/wacky-whackers" className={textLink}>
          Wacky Whackers
        </Link>
        .
      </>
    ),
  },
  {
    title: "KMIPN 2025 finalist",
    note: (
      <>
        With the co-op simulation game{" "}
        <Link href="/projects/makan-siang-bergizi" className={textLink}>
          Makan Siang Bergizi
        </Link>
        .
      </>
    ),
  },
  {
    title: "SDUST Exchange Award, 2026",
    note: "Scholarship for a semester of Software Engineering at Shandong University of Science and Technology, China.",
  },
  {
    title: "Temasek ITE SCALE Programme Award, 2025",
    note: "Temasek Foundation scholarship for a technical and leadership exchange in Singapore.",
  },
];

/**
 * Background: how the work moved from games to quant tools, then stack,
 * experience and recognition as plain rows on the sky. No cards here:
 * nothing in this section is a single clickable thing.
 */
export function Story() {
  return (
    <section id="story" className="scroll-mt-24 pb-24">
      <Container className="flex flex-col gap-10">
        <h2 className="type-section text-balance">From game systems to quant tools</h2>

        <div className="grid items-start gap-12 lg:grid-cols-[56fr_44fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <p className="max-w-[34em] text-pretty text-lg leading-relaxed text-fg-muted">
              Game Technology taught me programming through simulation loops, state machines and
              probability math. The parts I enjoyed most were data modelling, system logic and
              numerical simulation, so I followed them into backend and quantitative software.
            </p>

            <div className="flex flex-col gap-4">
              <h3 className="type-item">Stack</h3>
              <dl className="flex flex-col gap-3">
                {stack.map((row) => (
                  <div key={row.label} className="flex flex-wrap gap-x-6 gap-y-0.5">
                    <dt className="w-40 shrink-0 text-sm font-semibold leading-[1.7]">{row.label}</dt>
                    <dd className="type-data min-w-0 flex-1 basis-64 leading-[1.7] text-fg-muted">
                      {row.items}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="type-item">Experience</h3>
            <ul className="flex flex-col">
              {experience.map((job) => (
                <li
                  key={job.role}
                  className="flex flex-col gap-1 border-t border-border-strong py-4 last:pb-0"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-semibold leading-snug">{job.role}</h4>
                    <p
                      className={cn(
                        "type-data shrink-0",
                        job.current ? "text-accent-strong" : "text-fg-subtle",
                      )}
                    >
                      {job.when}
                    </p>
                  </div>
                  <p className="text-sm leading-[1.55]">
                    {job.href ? (
                      <a
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${job.org} (opens in new tab)`}
                        className={textLink}
                      >
                        {job.org}
                      </a>
                    ) : (
                      job.org
                    )}
                  </p>
                  <p className="text-sm leading-[1.55] text-fg-muted">{job.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <h3 className="type-item">Recognition</h3>
          <ul className="grid gap-x-16 md:grid-cols-2">
            {recognition.map((item) => (
              <li key={item.title} className="flex flex-col gap-1 border-t border-border-strong py-4">
                <p className="font-semibold leading-snug">{item.title}</p>
                <p className="text-sm leading-[1.55] text-fg-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
