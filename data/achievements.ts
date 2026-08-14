import type { Achievement } from "@/types/portfolio";

/**
 * Verified achievements from the CV / portfolio.
 *
 * The two hero entries (KMIPN 2025 Finalist, Gameseed 2025 Top 60) are
 * rendered as large cards with prominent typography. Other entries fall
 * back to the standard card layout.
 */
export const achievements: Achievement[] = [
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
  },
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
  },
];
