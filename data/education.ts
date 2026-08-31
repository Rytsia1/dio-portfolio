import type { Education } from "@/types/portfolio";

/**
 * Education history. Source: verified CV data.
 */
export const education: Education[] = [
  {
    id: "pens-d4-game-technology",
    degree: "D4 Game Technology",
    institution: "Electronic Engineering Polytechnic Institute of Surabaya",
    startDate: "2023-07",
    endDate: "Present",
    location: "Surabaya, Indonesia",
    notes:
      "Four-year diploma program focused on the technical and design foundations of game development: programming, game systems, level design, and the production pipeline that turns a concept into a playable build.",
    url: "https://www.pens.ac.id/",
  },
  {
    id: "sdust-exchange-2026",
    degree: "Student Exchange, Computer Software Engineering",
    institution: "Shandong University of Science and Technology",
    startDate: "2026-03",
    endDate: "2026-07",
    location: "Qingdao, China",
    notes:
      "International student exchange in Computer Software Engineering, studying software engineering in a cross-cultural academic environment at an internationally recognised Chinese university.",
    url: "https://www.sdust.edu.cn/",
    isInternational: true,
  },
  {
    id: "ite-scale-exchange-2025",
    degree: "Student Exchange",
    institution: "Institute of Technical Education",
    startDate: "2025-09",
    endDate: "2025-10",
    location: "Singapore",
    notes:
      "International exchange at the Institute of Technical Education (ITE), Singapore; recipient of the Temasek Foundation Award for ITE SCALE Programme 2025.",
    url: "https://www.ite.edu.sg/",
    isInternational: true,
  },
];