import { Cloud } from "@/components/pixel/Cloud";

/**
 * Persistent global viewport-wide ambient cloud atmosphere.
 *
 * Rendered with `fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full`
 * so that ambient floating clouds sit directly on top of the sky background and remain
 * constantly visible across the entire vertical scroll of the webpage.
 *
 * - Non-blocking: `pointer-events-none` on all containers and clouds.
 * - Stacking context: `z-0` sits on top of the sky-blue background, behind the main
 *   content cards (`relative z-10`).
 * - Varied motion: Desynchronized looping drift animations (`slow`, `medium`, `fast`, `reverse`).
 * - Responsive: Peripheral clouds adjust and gracefully hide on small devices.
 */
export function CloudBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full select-none"
    >
      {/* ── Top Viewport (~4% - 20%) ──────────────────────────────────── */}
      {/* Upper-left cloud — visible on all screens */}
      <div className="absolute left-[2%] top-[4%] sm:left-[3%] lg:left-[4%]">
        <Cloud size="md" variant={1} opacity={0.75} drift="slow" />
      </div>

      {/* Upper-right cloud — wide header decoration */}
      <div className="absolute right-[3%] top-[11%] sm:right-[4%] lg:right-[5%] hidden sm:block">
        <Cloud size="lg" variant={2} opacity={0.68} drift="medium" />
      </div>

      {/* Upper-mid left — peripheral cloud */}
      <div className="absolute left-[12%] top-[18%] hidden 2xl:block">
        <Cloud size="sm" variant={3} opacity={0.45} drift="reverse" />
      </div>

      {/* ── Upper-Mid Viewport (~24% - 44%) ─────────────────────────────── */}
      {/* Mid-left cloud */}
      <div className="absolute left-[1%] top-[24%] sm:left-[2%] lg:left-[3%] hidden md:block">
        <Cloud size="sm" variant={3} opacity={0.55} drift="fast" />
      </div>

      {/* Mid-right cloud */}
      <div className="absolute right-[2%] top-[34%] sm:right-[3%] lg:right-[4%] hidden sm:block">
        <Cloud size="md" variant={1} opacity={0.70} drift="reverse" />
      </div>

      {/* ── Lower-Mid Viewport (~46% - 66%) ─────────────────────────────── */}
      {/* Center-left large cloud */}
      <div className="absolute left-[2%] top-[46%] sm:left-[3%] lg:left-[4%] hidden lg:block">
        <Cloud size="lg" variant={2} opacity={0.60} drift="slow" />
      </div>

      {/* Lower-center-right cloud */}
      <div className="absolute right-[3%] top-[56%] sm:right-[4%] lg:right-[5%]">
        <Cloud size="sm" variant={3} opacity={0.65} drift="fast" />
      </div>

      {/* ── Lower Viewport (~68% - 94%) ──────────────────────────────────── */}
      {/* Lower-left cloud */}
      <div className="absolute left-[1%] top-[68%] sm:left-[2%] lg:left-[3%] hidden sm:block">
        <Cloud size="md" variant={1} opacity={0.72} drift="medium" />
      </div>

      {/* Lower-right cloud */}
      <div className="absolute right-[2%] top-[78%] sm:right-[3%] lg:right-[4%] hidden md:block">
        <Cloud size="lg" variant={2} opacity={0.58} drift="reverse" />
      </div>

      {/* Deep-lower peripheral right */}
      <div className="absolute right-[14%] top-[82%] hidden 2xl:block">
        <Cloud size="sm" variant={1} opacity={0.45} drift="slow" />
      </div>

      {/* Bottom-left near-footer cloud */}
      <div className="absolute left-[3%] top-[88%] sm:left-[4%] lg:left-[5%] hidden lg:block">
        <Cloud size="sm" variant={3} opacity={0.55} drift="fast" />
      </div>

      {/* Bottom-right near-footer cloud */}
      <div className="absolute right-[3%] top-[93%] sm:right-[4%] lg:right-[5%] hidden sm:block">
        <Cloud size="md" variant={1} opacity={0.68} drift="slow" />
      </div>
    </div>
  );
}
