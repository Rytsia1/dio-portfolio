import type { Experience } from "@/types/portfolio";

/**
 * Professional experience, in reverse-chronological order.
 *
 * Source: provided CV. Only verified facts are populated — no
 * fabricated responsibilities, metrics, or technologies.
 *
 * International exchanges are academic entries, so they live in
 * `data/education.ts` (flagged with `isInternational: true`) rather
 * than here.
 */
export const experiences: Experience[] = [
  {
    id: "asah-dicoding-2026",
    role: "AI Full-Stack Developer Apprenticeship",
    organization: "Asah led by Dicoding",
    startDate: "2026-08",
    endDate: "Present",
    responsibilities: [
      "Selected for Asah, an AI full-stack developer apprenticeship program led by Dicoding.",
      "Building production-oriented full-stack applications with integrated AI capabilities across the stack.",
      "Completing rigorous professional technical and soft skills training for future career development.",
    ],
    technologies: ["Python", "AI / Machine Learning", "Full-Stack Web Development"],
  },
  {
    id: "geech-2024-2025",
    role: "Junior Game Designer",
    organization: "Game for Education and Cultural Heritage",
    startDate: "2024-06",
    endDate: "2025-01",
    location: "Surabaya, Indonesia",
    description:
      "Designed science-based educational games for elementary and middle-school students, contributing from the game design document through gameplay testing and performance optimisation.",
    responsibilities: [
      "Developed a comprehensive Game Design Document (GDD) covering mechanics, systems, and content for science-based educational games.",
      "Conducted gameplay testing sessions and iterated on mechanics based on player feedback.",
      "Optimized game performance to keep the experience smooth on target hardware.",
    ],
    technologies: ["Unity", "C#", "Game Design"],
  },
];