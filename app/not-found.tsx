import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Rendered by Next.js when a project slug doesn't match any entry in
 * `data/projects.ts`. Kept on-brand and minimal.
 */
export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <Container className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-strong">
          404
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl">
          Project not found
        </h1>
        <p className="mt-4 max-w-xl text-base text-fg-muted sm:text-lg">
          The project you&apos;re looking for doesn&apos;t exist on this
          site. It may have been renamed, or the link could be wrong.
        </p>
        <div className="mt-8">
          <Link
            href="/#projects"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:bg-accent-strong active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
