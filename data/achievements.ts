import type { Achievement } from "@/types/portfolio";

/**
 * Verified achievements from the CV / portfolio.
 *
 * Array order is intentional — it mirrors the intended render order:
 *   1. Featured (isFeatured: true) — national / international scale wins
 *      rendered as large hero cards with prominent typography.
 *   2. Standard — remaining verified results rendered as compact cards.
 *
 * `hero`      → controls *layout* (large card vs. compact card).
 * `isFeatured`→ controls *styling* (glow, featured pip, elevated bg).
 *               Can be applied independently of `hero` when a result
 *               deserves visual emphasis without the hero layout.
 */
export const achievements: Achievement[] = [
  // ── Featured: national / international scale ──────────────────────────

  {
    id: "gameseed-2025-top-60",
    title: "Gameseed 2025 — Top 60 — Wacky Whackers",
    category: "Competition",
    badge: "Top 60",
    subtitle: "Gameseed 2025",
    description:
      "Reached the Top 60 at Gameseed 2025 with Wacky Whackers, a first-person exploration game with turn-based combat built in Unity.",
    issuer: "Gameseed",
    date: "2025",
    hero: true,
    isFeatured: true,
  },
  {
    id: "kmipn-2025-finalist",
    title: "KMIPN 2025 Finalist — Makan Siang Bergizi",
    category: "Competition",
    badge: "Finalist",
    subtitle: "KMIPN 2025",
    description:
      "Selected as a finalist at KMIPN 2025 with Makan Siang Bergizi, a cooperative two-player online game about nutrition management built in Unity.",
    issuer: "KMIPN",
    date: "2025",
    hero: true,
    isFeatured: true,
  },
  {
    id: "temasek-ite-scale-2025",
    title: "Temasek Foundation Award — ITE SCALE Programme 2025",
    category: "Exchange",
    badge: "Awardee",
    subtitle: "Temasek Foundation · ITE SCALE",
    description:
      "Recipient of the Temasek Foundation Award for the ITE SCALE Programme 2025, an internationally recognised exchange and development initiative.",
    issuer: "Temasek Foundation",
    date: "2025",
    hero: true,
    isFeatured: true,
  },

  // ── Standard: additional verified results ─────────────────────────────
  // Add further achievements below this line. They will render as compact
  // cards beneath the hero row. Set hero: true to promote to the hero grid
  // and isFeatured: true to apply elevated styling.
];
