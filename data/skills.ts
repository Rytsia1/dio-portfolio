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
      { name: "Narrative Design" },
      { name: "Unity", emphasis: "accent" },
      { name: "C#" },
      { name: "Gameplay Systems" },
      { name: "Level Design" },
      { name: "Procedural Generation" },
      { name: "Multiplayer Synchronization" },
    ],
  },
  {
    id: "programming-languages",
    title: "Programming Languages",
    description:
      "Primary languages used across projects, coursework, and professional work.",
    skills: [
      { name: "Python", emphasis: "accent" },
      { name: "Java", emphasis: "accent" },
      { name: "C#" },
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
      { name: "Vue 3", emphasis: "accent" },
      { name: "Spring Boot", emphasis: "accent" },
      { name: "FastAPI" },
      { name: "React / Next.js" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MyBatis" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "data-ai-tools",
    title: "Data, AI & Tools",
    description:
      "Data analysis, quantitative modeling, AI integration, and development tooling.",
    skills: [
      { name: "AI / Machine Learning", emphasis: "accent" },
      { name: "Streamlit" },
      { name: "Pandas & NumPy" },
      { name: "SciPy" },
      { name: "Apache ECharts & Plotly" },
      { name: "Git & Docker" },
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