import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { BackToTopButton } from "@/components/ui/BackToTopButton";

// Base64-encoded 32x16 retro pixel-art grass & stepped dirt tile.
// Designed with crisp pixel edges: transparent sky at top -> lime highlights ->
// mid-green grass blades -> dirt teeth -> base earth (#5a3a22) at bottom.
const PIXEL_GRASS_TILE =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAxNiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPiA8cmVjdCB4PSIwIiB5PSIxMCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjYiIGZpbGw9IiM1YTNhMjIiLz4gPHJlY3QgeD0iMCIgeT0iNyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMiIGZpbGw9IiM1YTNhMjIiLz4gPHJlY3QgeD0iMCIgeT0iNSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIiIGhlaWdodD0iMSIgZmlsbD0iIzdkNTAyZiIvPiA8cmVjdCB4PSIzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjE0IiB5PSI3IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjE1IiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjI0IiB5PSI5IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjI4IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjN2Q1MDJmIi8+IDxyZWN0IHg9IjgiIHk9IjExIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjNGQzMDFiIi8+IDxyZWN0IHg9IjIwIiB5PSIxMiIgd2lkdGg9IjIiIGhlaWdodD0iMSIgZmlsbD0iIzRkMzAxYiIvPiA8cmVjdCB4PSIwIiB5PSI0IiB3aWR0aD0iMzIiIGhlaWdodD0iMiIgZmlsbD0iIzZlNDMyNSIvPiA8cmVjdCB4PSIxIiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjNmU0MzI1Ii8+IDxyZWN0IHg9IjciIHk9IjYiIHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMTYiIHk9IjYiIHdpZHRoPSI1IiBoZWlnaHQ9IjEiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMjUiIHk9IjYiIHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiM2ZTQzMjUiLz4gPHJlY3QgeD0iMCIgeT0iMyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIGZpbGw9IiMzZDg1MjAiLz4gPHJlY3QgeD0iMCIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgZmlsbD0iIzNkODUyMCIvPiA8cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjExIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjE4IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjIzIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjI5IiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIiBmaWxsPSIjM2Q4NTIwIi8+IDxyZWN0IHg9IjAiIHk9IjIiIHdpZHRoPSIzMiIgaGVpZ2h0PSIyIiBmaWxsPSIjNWNiODM0Ii8+IDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSIzIiBoZWlnaHQ9IjEiIGZpbGw9IiM1Y2I4MzQiLz4gPHJlY3QgeD0iNyIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxMyIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIyMCIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIyNiIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSI4IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjNWNiODM0Ii8+IDxyZWN0IHg9IjIxIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjNWNiODM0Ii8+IDxyZWN0IHg9IjAiIHk9IjEiIHdpZHRoPSIzIiBoZWlnaHQ9IjEiIGZpbGw9IiM1Y2I4MzQiLz4gPHJlY3QgeD0iNSIgeT0iMSIgd2lkdGg9IjUiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxMiIgeT0iMSIgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxOCIgeT0iMSIgd2lkdGg9IjYiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIyNiIgeT0iMSIgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0iIzVjYjgzNCIvPiA8cmVjdCB4PSIxIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjYiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMTQiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMjgiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iMCIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSI1IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjEyIiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjE4IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjI2IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSIjOGFlMzVkIi8+IDxyZWN0IHg9IjAiIHk9IjIiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiM4YWUzNWQiLz4gPHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSIxMSIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSIxNyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8cmVjdCB4PSIyNSIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMSIgZmlsbD0iIzhhZTM1ZCIvPiA8L3N2Zz4=";

/**
 * Footer — light theme earth ground.
 * Seamlessly connects under the pinned contact bar with pixel grass border,
 * warm brown earth body, copyright, and navigation anchor.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full">
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
      <div className="bg-earth pt-6 pb-12">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#ffd2bd]">▪◡▪</span>
                <p className="text-base font-bold text-white tracking-wide">
                  {profile.name}
                </p>
              </div>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80 font-mono">
                Software Engineer · Quantitative Finance · Game Technology
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-white/80">
              <span className="text-[#ffd2bd]">INDONESIA</span>
              <span className="text-white/30">/</span>
              <BackToTopButton className="group inline-flex items-center gap-1 rounded-full px-2 py-1 text-white hover:text-[#ffd2bd] transition-colors duration-200 font-semibold focus-visible:outline-[#ffd2bd]" />
            </div>
          </div>

          <div className="mt-8 border-t border-white/15 pt-5 font-mono text-[11px] text-white/70">
            <p>© {year} {profile.name}. All rights reserved.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}