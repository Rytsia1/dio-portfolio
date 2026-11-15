import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Cloud } from "@/components/pixel/Cloud";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MissingPath } from "@/components/ui/MissingPath";

export const metadata: Metadata = { title: "Page not found" };

/**
 * Shown for unmatched URLs and when a project slug has no entry in
 * `data/projects.ts`. Says which address failed and offers two ways on.
 */
export default function NotFound() {
  return (
    <>
      <section className="flex flex-1 items-center py-16">
        <Container className="grid items-center gap-12 lg:grid-cols-[58fr_42fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <h1 className="type-display text-balance">Page not found</h1>
            <p className="max-w-[32em] text-pretty text-lg leading-relaxed text-fg-muted">
              <MissingPath /> The link may be mistyped, or the project it pointed to was
              renamed.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/" className={buttonClass({ size: "lg", icon: "start" })}>
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back home
              </Link>
              <Link href="/projects" className={buttonClass({ variant: "secondary", size: "lg" })}>
                All projects
              </Link>
            </div>
          </div>

          <div aria-hidden className="relative h-70 max-lg:hidden">
            <Cloud
              size="xl"
              variant={1}
              drift="slow"
              opacity={1}
              className="absolute left-[6%] top-14 h-auto w-[22.5rem] max-w-[86%]"
            />
            <Cloud size="md" variant={3} drift="medium" opacity={0.8} className="absolute left-[52%] top-50" />
            <Cloud size="sm" variant={2} drift="reverse" opacity={0.7} className="absolute right-[4%] top-1" />
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
