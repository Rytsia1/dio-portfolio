import { Cloud } from "@/components/pixel/Cloud";

/**
 * Ambient background cloud system.
 *
 * Renders multiple pixel-art clouds positioned along the left and right
 * viewport margins across the full scrollable document height.
 *
 * - Non-intrusive: pointer-events-none, absolute inset-0, z-[-10].
 * - Subtle: Opacities between 40% and 80% to keep content cards legible.
 * - Desynchronized: Varied drift speeds (slow, medium, fast) and variants.
 * - Responsive: Peripheral clouds hidden on small screens to prevent clutter.
 */
export function CloudBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none"
    >
      {/* ── Top section / Hero transition (~8% - 18%) ──────────────────── */}
      <div className="absolute left-[2%] top-[6%] hidden sm:block">
        <Cloud size="md" variant={1} opacity={0.75} drift="slow" />
      </div>
      <div className="absolute right-[3%] top-[14%] hidden md:block">
        <Cloud size="lg" variant={2} opacity={0.65} drift="medium" />
      </div>

      {/* ── Upper-mid / About & Timeline (~24% - 36%) ──────────────────── */}
      <div className="absolute left-[3%] top-[25%] hidden lg:block">
        <Cloud size="sm" variant={3} opacity={0.55} drift="fast" />
      </div>
      <div className="absolute right-[2%] top-[34%] hidden sm:block">
        <Cloud size="md" variant={1} opacity={0.70} drift="slow" />
      </div>

      {/* ── Mid section / Skills & Projects (~44% - 58%) ───────────────── */}
      <div className="absolute left-[1%] top-[45%] hidden md:block">
        <Cloud size="lg" variant={2} opacity={0.60} drift="medium" />
      </div>
      <div className="absolute right-[4%] top-[56%] hidden lg:block">
        <Cloud size="sm" variant={3} opacity={0.65} drift="fast" />
      </div>

      {/* ── Lower-mid / Experience & Achievements (~66% - 78%) ──────────── */}
      <div className="absolute left-[2%] top-[68%] hidden sm:block">
        <Cloud size="md" variant={1} opacity={0.70} drift="slow" />
      </div>
      <div className="absolute right-[2%] top-[78%] hidden md:block">
        <Cloud size="lg" variant={2} opacity={0.55} drift="medium" />
      </div>

      {/* ── Bottom section / Certificates & Contact (~86% - 94%) ────────── */}
      <div className="absolute left-[3%] top-[88%] hidden lg:block">
        <Cloud size="sm" variant={3} opacity={0.60} drift="fast" />
      </div>
      <div className="absolute right-[4%] top-[93%] hidden sm:block">
        <Cloud size="md" variant={1} opacity={0.65} drift="slow" />
      </div>
    </div>
  );
}
