"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

/**
 * Shown when a page throws while rendering. It says whose fault it is,
 * what to try, and what to send if trying again does not work.
 */
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
    // A Client Component cannot export metadata, so set the tab title here.
    const previousTitle = document.title;
    document.title = `Something went wrong | ${profile.name}`;
    return () => {
      document.title = previousTitle;
    };
  }, [error]);

  return (
    <>
      <section className="flex flex-1 items-center py-16">
        <Container>
          <div role="alert" className="flex flex-col items-start gap-6">
            <h1 className="type-display max-w-[11em] text-balance">This page failed to load</h1>
            <p className="max-w-[32em] text-pretty text-lg leading-relaxed text-fg-muted">
              The fault is a bug in this site, not your connection. Loading it again usually
              works. If it keeps failing, email me and I will fix it.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => retry()}
                className={buttonClass({ size: "lg", icon: "start" })}
              >
                <RotateCw className="h-4 w-4" aria-hidden />
                Try again
              </button>
              <Link href="/" className={buttonClass({ variant: "secondary", size: "lg" })}>
                Back home
              </Link>
            </div>
            <dl className="flex flex-wrap gap-x-12 gap-y-2 pt-6">
              {error.digest && (
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[13px] text-fg-subtle">Reference to include</dt>
                  <dd className="type-data">{error.digest}</dd>
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <dt className="text-[13px] text-fg-subtle">Email</dt>
                <dd className="type-data">
                  <a
                    href={profile.email}
                    className="underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong"
                  >
                    {profile.emailDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
