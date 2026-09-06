import type { Profile } from "@/types/portfolio";

/**
 * Identity and high-level personal data.
 *
 * Source: provided CV. Email, GitHub, LinkedIn, Twitter/X, and
 * Instagram are real. Location and resume path are accurate as of
 * the latest update.
 */
export const profile: Profile = {
  name: "Dio Stania Adinata",
  role: "Software Engineer",
  tagline:
    "I build software at the intersection of engineering, quantitative finance, and data-intensive systems.",
  shortBio:
    "Software Engineer with a foundation in game technology and a growing focus on quantitative computing, financial systems, and full-stack engineering. Built quantitative finance tools implementing Modern Portfolio Theory and Monte Carlo risk analytics. Delivered production full-stack systems in Java and Python during an international software internship. National finalist placements in competitive programming events.",
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