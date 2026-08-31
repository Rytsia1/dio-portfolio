import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PixelIcon } from "@/components/pixel/PixelIcon";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b-2 border-border font-mono">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <Container className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
          [ 404: QUEST TARGET NOT FOUND ]
        </p>
        <h1 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-fg sm:text-5xl">
          Project Not Found
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-muted font-mono sm:text-base">
          The requested project record or case study does not exist in the database.
          It may have been migrated or the URL query is invalid.
        </p>
        <div className="mt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded border-2 border-fg bg-accent px-4 py-2 text-sm font-bold text-white shadow-[2px_2px_0px_0px_#0f1b2d] active:translate-x-0.5 active:translate-y-0.5 hover:bg-accent-strong transition-colors"
          >
            <PixelIcon name="arrow-left" size={14} />
            Return to Projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
