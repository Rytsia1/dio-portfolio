import { Github, Linkedin, Mail, FileText, Instagram, Twitter } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

// Base64-encoded 32x16 retro pixel-art grass & stepped dirt tile.
// Designed with crisp pixel edges: transparent sky at top -> lime highlights ->
// mid-green grass blades -> dirt teeth -> base earth (#5a3a22) at bottom.
const PIXEL_GRASS_TILE =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAxNiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPiA8cmVjdCB4PSIwIiB5PSIxMCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjYiIGZpbGw9IiM1YTNhMjIiLz4gPHJlY3QgeD0iMCIgeT0iNyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMiIGZpbGw9IiM1YTNhMjIiLz4gPHJlY3QgeD0iMCIgeT0iNSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIiIGhlaWdodD0iMSIgZmlsbD0iIzdkNTAyZiIvPiA8cmVjdCB4PSIzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjE0IiB5PSI3IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjE1IiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjI0IiB5PSI5IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjI4IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjgiIHk9IjExIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjNGQzMDFiIi8+IDxyZWN0IHg9IjIwIiB5PSIxMiIgd2lkdGg9IjIiIGhlaWdodD0iMSIgZmlsbD0iIzRkMzAxYiIvPiA8cmVjdCB4PSIwIiB5PSI0IiB3aWR0aD0iMzIiIGhlaWdodD0iMiIgZmlsbD0iIzZlNDMyNSIvPiA8cmVjdCB4PSIxIiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjNmU0MzI1Ii8+IDxyZWN0IHg9IjciIHk9IjYiIHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMTYiIHk9IjYiIHdpZHRoPSI1IiBoZWlnaHQ9IjEiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMjUiIHk9IjYiIHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMCIgeT0iMyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIGZpbGw9IiMzZDg1MjAiLz4gPHJlY3QgeD0iMCIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgZmlsbD0iIzNkODUyMCIvPiA8cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjExIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjE4IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjIzIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjI5IiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjAiIHk9IjIiIHdpZHRoPSIzMiIgaGVpZ2h0PSIyIiBmaWxsPSIjNWNiODM0Ii8+IDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSIzIiBoZWlnaHQ9IjEiIGZpbGw9IiM1Y2I4MzQiLz4gPHJlY3QgeD0iNyIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxMyIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIyMCIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIyNiIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSI4IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjNWNiODM0Ii8+IDxyZWN0IHg9IjIxIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjNWNiODM0Ii8+IDxyZWN0IHg9IjAiIHk9IjEiIHdpZHRoPSIzIiBoZWlnaHQ9IjEiIGZpbGw9IiM1Y2I4MzQiLz4gPHJlY3QgeD0iNSIgeT0iMSIgd2lkdGg9IjUiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxMiIgeT0iMSIgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxOCIgeT0iMSIgd2lkdGg9IjYiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIyNiIgeT0iMSIgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjYiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMTQiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMjgiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMCIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSI1IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjEyIiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjE4IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjI2IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjAiIHk9IjIiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSIxMSIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSIxNyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSIyNSIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8L3N2Zz4=";

/**
 * Footer — light theme. Pixel-art grass & stepped earth transition,
 * warm brown earth body, mascot illustration, social links, and copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const showInstagram = Boolean(profile.instagramUrl);
  const showTwitter = Boolean(profile.twitterUrl);

  return (
    <footer className="relative mt-12 w-full">
      {/* ── Pixel-art grass & stepped dirt transition border ───────────── */}
      <div
        aria-hidden
        className="w-full h-8 sm:h-10 bg-repeat-x bg-bottom pointer-events-none [image-rendering:pixelated]"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,${PIXEL_GRASS_TILE}")`,
          backgroundSize: "64px 32px",
          imageRendering: "pixelated",
        }}
      />

      {/* ── Dark brown earth body ───────────────────────────────────────── */}
      <div className="bg-earth">
        <Container className="py-10 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-semibold text-white">
                {profile.name}
              </p>
              <p className="mt-1 max-w-md text-sm text-white/75">
                {profile.shortBio}
              </p>
            </div>

            <ul className="flex flex-wrap items-center gap-2">
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
              {showTwitter && (
                <li>
                  <a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Twitter ${profile.twitterHandle} (opens in new tab)`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <Twitter className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              )}
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