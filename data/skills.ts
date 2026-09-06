import type { SkillCategory } from "@/types/portfolio";

/**
 * Engineering stack, grouped by domain.
 *
 * Order: Core languages → Backend/Systems → Quantitative Computing
 *        → Frontend → Game Technology
 *
 * Soft skills are intentionally omitted — they are demonstrated
 * through the Experience and Achievements sections, not listed here.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "core",
    title: "Core",
    description:
      "Primary programming languages used across projects, internships, and coursework.",
    skills: [
      { name: "Python", emphasis: "accent" },
      { name: "Java", emphasis: "accent" },
      { name: "TypeScript", emphasis: "accent" },
      { name: "SQL", emphasis: "accent" },
      { name: "C#" },
    ],
  },
  {
    id: "backend-systems",
    title: "Backend & Systems",
    description:
      "Server-side frameworks, APIs, databases, and containerization.",
    skills: [
      { name: "FastAPI", emphasis: "accent" },
      { name: "Spring Boot", emphasis: "accent" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MyBatis" },
      { name: "Docker" },
      { name: "JWT & Auth" },
    ],
  },
  {
    id: "quantitative-computing",
    title: "Quantitative Computing",
    description:
      "Numerical methods, financial modeling, simulation, and risk analytics.",
    skills: [
      { name: "NumPy", emphasis: "accent" },
      { name: "Pandas", emphasis: "accent" },
      { name: "SciPy", emphasis: "accent" },
      { name: "Monte Carlo Simulation" },
      { name: "Optimization (SLSQP)" },
      { name: "Risk Analytics (VaR/CVaR)" },
      { name: "Streamlit" },
      { name: "Plotly" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description:
      "UI frameworks and tooling used in full-stack and web projects.",
    skills: [
      { name: "Vue 3", emphasis: "accent" },
      { name: "React / Next.js" },
      { name: "Tailwind CSS" },
      { name: "ECharts / Plotly" },
    ],
  },
  {
    id: "game-technology",
    title: "Game Technology",
    description:
      "Engine, language, and design patterns from my game development background.",
    skills: [
      { name: "Unity", emphasis: "accent" },
      { name: "C#" },
      { name: "Gameplay Systems" },
      { name: "Procedural Generation" },
      { name: "Multiplayer Sync" },
    ],
  },
];