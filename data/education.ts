import type { Education } from "@/types/portfolio";

/**
 * Education history. Source: provided CV. Only verified facts are
 * populated — no fabricated GPA, awards, or activities.
 */
export const education: Education[] = [
  {
    id: "pens-d4-game-technology",
    degree: "D4 Game Technology",
    institution: "Politeknik Elektronika Negeri Surabaya",
    startDate: "2023",
    // TODO: Replace with the actual graduation year.
    endDate: "TODO: Graduation year",
    location: "Surabaya, Indonesia",
    notes:
      "Four-year diploma program focused on the technical and design foundations of game development — programming, game systems, level design, and the production pipeline that turns a concept into a playable build.",
    url: "https://www.pens.ac.id/",
  },
];
