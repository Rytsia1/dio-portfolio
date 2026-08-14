import type { SkillCategory } from "@/types/portfolio";

/**
 * Skills, grouped by domain.
 *
 * Only technologies actually represented in the project, experience,
 * or education data are listed. The order is intentional — it mirrors
 * the career narrative: software engineering first, then the
 * specialisations (frontend, backend, game development, quantitative
 * finance, data/ML), then day-to-day tooling.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    description:
      "Primary languages used across projects, coursework, and professional work.",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "C#" },
      { name: "JavaScript" },
      { name: "TypeScript", emphasis: "accent" },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Building interfaces that are fast and accessible.",
    skills: [
      { name: "React" },
      { name: "Next.js", emphasis: "accent" },
      { name: "Vue" },
      { name: "Element Plus" },
      { name: "Tailwind CSS" },
      { name: "Axios" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server-side systems, APIs, and data persistence.",
    skills: [
      { name: "Spring Boot" },
      { name: "MyBatis" },
      { name: "Node.js" },
      { name: "REST APIs" },
      { name: "MySQL" },
      { name: "Token-based Auth" },
      { name: "BCrypt" },
    ],
  },
  {
    id: "game-development",
    title: "Game Development",
    description:
      "Engines, scripting, and the systems-thinking side of building games.",
    skills: [
      { name: "Unity" },
      { name: "Godot" },
      { name: "GDScript" },
      { name: "C#" },
      { name: "Game Design" },
      { name: "Gameplay Systems" },
      { name: "Level Design" },
      { name: "Procedural Generation" },
    ],
  },
  {
    id: "quantitative-finance",
    title: "Quantitative Finance",
    description:
      "Theoretical foundations and numerical methods used in finance.",
    skills: [
      { name: "Modern Portfolio Theory" },
      { name: "Portfolio Optimization" },
      { name: "Efficient Frontier" },
      { name: "Sharpe Ratio" },
      { name: "Options Pricing" },
      { name: "Black–Scholes" },
      { name: "Monte Carlo Simulation" },
      { name: "Numerical Methods" },
    ],
  },
  {
    id: "data-ml",
    title: "Data / ML",
    description: "Working with data and exploring machine learning.",
    skills: [
      { name: "Python" },
      { name: "Data Analysis" },
      { name: "Machine Learning" },
      { name: "Apache ECharts" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Day-to-day development, deployment, and collaboration tools.",
    skills: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "Azure" },
    ],
  },
];
