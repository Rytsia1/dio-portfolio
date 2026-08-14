import type { Profile } from "@/types/portfolio";

/**
 * Identity and high-level personal data.
 *
 * Source: provided CV. Email, GitHub, LinkedIn, and Instagram are
 * real. Location and resume path are accurate as of the latest update.
 */
export const profile: Profile = {
  name: "Dio Stania Adinata",
  role: "Software Engineer",
  tagline:
    "I build software and explore technology across software engineering, quantitative finance, fintech, and game technology.",
  shortBio:
    "Software engineer with a background in Game Technology and Game Design, currently building across full-stack systems, quantitative finance, and data-driven applications.",
  // Based in Indonesia.
  location: "Indonesia",
  email: "mailto:dioadinata520@gmail.com",
  emailDisplay: "dioadinata520@gmail.com",
  githubUrl: "https://github.com/Rytsia1",
  githubHandle: "@Rytsia1",
  linkedinUrl: "https://www.linkedin.com/in/dioadinata",
  linkedinHandle: "in/dioadinata",
  // Instagram is included because the user confirmed it — but the
  // Hero/Footer only show it where it fits (it's a personal channel,
  // not a professional one). See Footer.tsx for the conditional render.
  instagramUrl: "https://www.instagram.com/distania_9",
  instagramHandle: "@distania_9",
  // TODO: Drop the real resume PDF in /public and keep this path.
  resumeUrl: "/resume.pdf",
  resumeLabel: "Download Resume",
};
