import type { Experience } from "@/types/portfolio";

/**
 * Professional experience, in reverse-chronological order.
 *
 * Source: provided CV. Only verified facts are populated — no
 * fabricated responsibilities, metrics, or technologies.
 */
export const experiences: Experience[] = [
  {
    id: "geech-2024-2025",
    role: "Junior Game Designer",
    organization: "Game for Education and Cultural Heritage",
    // TODO: Replace with the exact start / end months (e.g. "2024-06", "2025-08").
    startDate: "2024",
    endDate: "2025",
    location: "Surabaya, Indonesia",
    description:
      "Designed and built science-based educational games for elementary and middle-school students, contributing to the game design document, gameplay testing, and performance optimisation.",
    responsibilities: [
      "Developed the Game Design Document (GDD) for science-based educational games.",
      "Ran gameplay testing sessions and iterated on mechanics based on feedback.",
      "Worked on performance optimisation to keep the experience smooth on target hardware.",
    ],
    technologies: ["Unity", "C#", "Game Design"],
  },
  {
    id: "sdust-exchange-2026",
    role: "Student Exchange — Computer Software Engineering",
    organization: "Shandong University of Science and Technology",
    startDate: "2026-03",
    endDate: "2026-07",
    location: "Qingdao, China",
    description:
      "One-semester student exchange in Computer Software Engineering — exposure to Chinese-language software engineering coursework and a Chinese university engineering environment.",
    url: "https://www.sdust.edu.cn/",
  },
  {
    id: "software-production-internship-2026",
    role: "Software Production Intern",
    organization: "TODO: Replace with the actual host organisation",
    // TODO: Replace with the actual start / end months.
    startDate: "TODO: Start date",
    endDate: "TODO: End date",
    // TODO: Replace with the actual location.
    location: "TODO: Location",
    description:
      "TODO: One-sentence description of the role. Book-it-quick was developed as a project during this internship — see the Projects section for the case study.",
    responsibilities: [
      "TODO: First responsibility",
      "TODO: Second responsibility",
      "TODO: Third responsibility",
    ],
    technologies: [
      "Spring Boot",
      "MyBatis",
      "Vue",
      "Element Plus",
      "MySQL",
      "Axios",
      "BCrypt",
      "Token Auth",
      "Apache ECharts",
    ],
  },
];
