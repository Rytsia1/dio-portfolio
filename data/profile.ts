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
  role: "Game Designer & Software Engineer",
  tagline:
    "I design player-centric game systems and build robust software — bridging interactive media with rigorous software engineering.",
  shortBio:
    "Detail-oriented Game Designer bridging interactive media with rigorous software engineering principles. Demonstrated success in designing scalable gameplay systems and functional prototypes, earning finalist placements in national competitions. Leverages technical expertise in Python, C++, and cross-platform development within Unity to build robust, player-centric game architectures.",
  // Based in Indonesia.
  location: "Indonesia",
  email: "mailto:dioadinata520@gmail.com",
  emailDisplay: "dioadinata520@gmail.com",
  githubUrl: "https://github.com/Rytsia1",
  githubHandle: "@Rytsia1",
  linkedinUrl: "https://www.linkedin.com/in/dioadinata",
  linkedinHandle: "in/dioadinata",
  twitterUrl: "https://x.com/distania_9",
  twitterHandle: "@distania_9",
  // Instagram is included because the user confirmed it — but the
  // Hero/Footer only show it where it fits (it's a personal channel,
  // not a professional one). See Footer.tsx for the conditional render.
  instagramUrl: "https://www.instagram.com/distania_9",
  instagramHandle: "@distania_9",
  // TODO: Drop the real resume PDF in /public and keep this path.
  resumeUrl: "/resume.pdf",
  resumeLabel: "Download Resume",
};