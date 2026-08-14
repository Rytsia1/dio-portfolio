import type { SkillCategory } from "@/types/portfolio";

/**
 * Skills, grouped by domain.
 *
 * Only technologies actually represented in the project, experience,
 * or education data are listed. The order mirrors the career
 * narrative: game design & development first (the specialisation),
 * then programming languages, full-stack web development, data and
 * day-to-day tooling, and finally soft skills.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "game-design-development",
    title: "Game Design & Development",
    description:
      "Engines, design craft, and the systems-thinking side of building games.",
    skills: [
      { name: "Game Design", emphasis: "accent" },
      { name: "Unity", emphasis: "accent" },
      { name: "Godot" },
      { name: "C#" },
      { name: "Gameplay Systems" },
      { name: "Level Design" },
      { name: "3ds Max 2018" },
      { name: "Procedural Generation" },
    ],
  },
  {
    id: "programming-languages",
    title: "Programming Languages",
    description:
      "Primary languages used across projects, coursework, and professional work.",
    skills: [
      { name: "Python", emphasis: "accent" },
      { name: "C++" },
      { name: "C#" },
      { name: "Java" },
      { name: "TypeScript" },
      { name: "SQL" },
    ],
  },
  {
    id: "full-stack-web",
    title: "Full-Stack Web Development",
    description:
      "End-to-end web systems — interfaces, APIs, and data persistence.",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Vue" },
      { name: "Spring Boot" },
      { name: "Node.js" },
      { name: "MySQL" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "data-tools",
    title: "Data & Tools",
    description:
      "Data apps, visualisation, and day-to-day development tooling.",
    skills: [
      { name: "Streamlit" },
      { name: "Pandas" },
      { name: "Apache ECharts" },
      { name: "Git" },
      { name: "Docker" },
      { name: "Linux" },
    ],
  },
  {
    id: "soft-skills",
    title: "Soft Skills",
    description: "How I work with teams and communicate ideas.",
    skills: [
      { name: "Communication" },
      { name: "Teamwork" },
      { name: "Problem Solving" },
      { name: "Team Leadership" },
      { name: "Public Speaking" },
    ],
  },
];