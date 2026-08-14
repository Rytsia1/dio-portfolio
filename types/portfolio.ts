/**
 * Type definitions for the portfolio.
 *
 * The site is content-driven: every section reads from a typed data
 * file in `data/`, so the UI never has to know about hard-coded strings.
 *
 * Only fields that have a verified source are populated. Anything
 * missing is left undefined or marked `TODO:` in the data file — never
 * invented.
 */

/** A project "track" — used to group projects on the home page. */
export type ProjectTrack = "software" | "quant" | "game";

/** A category used to group projects in detail and for filter labels. */
export type ProjectCategory =
  | "Full-Stack Engineering"
  | "Quantitative Finance"
  | "Software Engineering"
  | "Game Technology"
  | "Machine Learning";

/** A single featured project. */
export interface Project {
  /** URL slug used in /projects/[slug] */
  slug: string;
  /** Display title */
  title: string;
  /** One-sentence summary used in cards */
  shortDescription: string;
  /** Long-form description used on the detail page */
  overview: string;
  /** Track used to group the project on the home page */
  track: ProjectTrack;
  /** Category label, free-form */
  category: ProjectCategory;
  /** Year shown on the card and detail hero. Prefer ISO YYYY. */
  year?: string;
  /** Optional one-line note about the user's role on the project. */
  role?: string;
  /** Optional achievement badge text (e.g. "KMIPN 2025 Finalist"). */
  achievement?: string;
  /** Technologies shown as tags */
  tags: string[];
  /** Optional GitHub URL */
  githubUrl?: string;
  /** Optional live demo URL */
  liveUrl?: string;
  /** Optional path to a thumbnail in /public, e.g. "/projects/portfolio-optimizer.png" */
  thumbnail?: string;
  /** Whether to surface this project on the home page */
  featured: boolean;
  /** Case-study content (all optional — placeholders are fine). */
  problem?: string;
  solution?: string;
  architecture?: string;
  implementation?: string;
  challenges?: string;
  results?: string;
  lessons?: string;
  /** Optional list of bullet points shown as "Highlights" on the detail page */
  highlights?: string[];
}

/** A single experience entry — internships, jobs, contracts. */
export interface Experience {
  id: string;
  role: string;
  organization: string;
  /** ISO date or free-form string like "Summer 2024". Prefer ISO. */
  startDate: string;
  /** ISO date or "Present". */
  endDate: string;
  location?: string;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  /** Optional link to the organization */
  url?: string;
}

/** A single education entry. */
export interface Education {
  id: string;
  /** e.g. "D4 Game Technology" */
  degree: string;
  /** e.g. "Politeknik Elektronika Negeri Surabaya" */
  institution: string;
  /** ISO YYYY or YYYY-MM, or year-only string. */
  startDate: string;
  /** ISO YYYY or "Present" */
  endDate: string;
  location?: string;
  /** Optional one-paragraph note (no fabricated GPA / awards). */
  notes?: string;
  /** Optional URL to the institution / program */
  url?: string;
}

/** Categories of achievements. */
export type AchievementCategory =
  | "Competition"
  | "Academic"
  | "Exchange"
  | "Internship"
  | "Scholarship"
  | "Other";

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  /** Short description, factual and concise. */
  description?: string;
  /** Optional badge text shown in large typography on hero cards. */
  badge?: string;
  /** Optional subtitle shown below the badge. */
  subtitle?: string;
  /** Optional issuer / organization */
  issuer?: string;
  /** ISO date or year, e.g. "2024" */
  date?: string;
  /** Optional URL */
  url?: string;
  /** When true, this achievement is rendered as a large hero card. */
  hero?: boolean;
}

/** Categories of certificates. */
export type CertificateCategory =
  | "Game Design"
  | "Programming"
  | "Data"
  | "Cloud"
  | "Finance"
  | "Other";

export interface Certificate {
  id: string;
  title: string;
  provider: string;
  category: CertificateCategory;
  /** ISO date or year, e.g. "2024" */
  date?: string;
  /** Optional credential URL — only added if it actually exists. */
  credentialUrl?: string;
  /** Optional path to a certificate image in /public */
  image?: string;
}

/** A single skill item. */
export interface Skill {
  name: string;
  /** Optional accent for visual variety; defaults to base. */
  emphasis?: "default" | "accent";
}

/** A grouped set of skills shown in the Skills section. */
export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  skills: Skill[];
}

/** A single navigation link. */
export interface NavItem {
  label: string;
  href: string;
}

/** Profile / identity data shown in the Hero, About, and Footer. */
export interface Profile {
  name: string;
  role: string;
  /** One-sentence positioning statement. */
  tagline: string;
  /** Short description used in the About section and meta description. */
  shortBio: string;
  location?: string;
  email: string;
  emailDisplay: string;
  githubUrl: string;
  githubHandle: string;
  linkedinUrl: string;
  linkedinHandle: string;
  /** Optional — only included if it fits the professional design. */
  instagramUrl?: string;
  instagramHandle?: string;
  /** Path to resume PDF in /public. */
  resumeUrl: string;
  /** Display label for the resume link */
  resumeLabel: string;
}
