import { Github, Linkedin, Mail, FileText, Instagram } from "lucide-react";
import { Container } from "@/components/Container";
import { Mascot } from "@/components/pixel/Mascot";
import { profile } from "@/data/profile";

/**
 * Footer — light theme. Pixel-art grass / earth transition up top,
 * brown earth body, mascot, social links, copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const showInstagram = Boolean(profile.instagramUrl);

  return (
    <footer className="relative mt-12">
      {/* Pixel-art grass transition. Drawn as inline SVG so it always
          stays sharp and never depends on external assets. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-8 -translate-y-full"
      >
        <svg
          viewBox="0 0 100 16"
          preserveAspectRatio="none"
          className="block h-full w-full"
          shapeRendering="crispEdges"
        >
          {/* Earth band */}
          <rect x={0} y={0} width={100} height={4} fill="#5a3a22" />
          {/* Grass blades on top */}
          {Array.from({ length: 50 }).map((_, i) => {
            const x = i * 2;
            const h = (i * 7) % 4;
            return (
              <rect
                key={i}
                x={x}
                y={4 - h}
                width={1}
                height={h}
                fill="#6cc04a"
              />
            );
          })}
        </svg>
      </div>

      <div className="bg-earth">
        <Container className="py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <p className="text-base font-semibold text-white">
                {profile.name}
              </p>
              <p className="mt-1 max-w-md text-sm text-white/75">
                {profile.shortBio}
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-2">
                <li>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub ${profile.githubHandle} (opens in new tab)`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn ${profile.linkedinHandle} (opens in new tab)`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.email}
                    aria-label={`Send email to ${profile.emailDisplay}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.resumeUrl}
                    aria-label={profile.resumeLabel}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <FileText className="h-4 w-4" aria-hidden />
                  </a>
                </li>
                {showInstagram && (
                  <li>
                    <a
                      href={profile.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram ${profile.instagramHandle} (opens in new tab)`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <Instagram className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex justify-end">
              <Mascot size={96} className="opacity-95" />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/15 pt-6 text-xs text-white/65 sm:flex-row sm:items-center">
            <p>© {year} {profile.name}. All rights reserved.</p>
            <p className="font-mono uppercase tracking-[0.18em]">
              Built with Next.js · TypeScript · Tailwind CSS
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
