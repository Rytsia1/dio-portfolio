/**
 * Type definitions for the portfolio.
 *
 * The site is content-driven: every section reads from a typed data
 * file in `data/`, so the UI never has to know about hard-coded strings.
 *
 * Only fields that have a verified source are populated. Anything
 * missing is left undefined or marked `TODO:` in the data file — never
 * invented.
 *
 * ── Project type hierarchy ────────────────────────────────────────────
 *
 * Projects use inheritance + a discriminated union:
 *
 *   BaseProject                 shared fields (slug, title, tags, …)
 *     ├─ GameProject            type: "game" + engine / assetsTools / coreMechanics
 *     └─ WebProject             type: "web"  (game-only fields forbidden via `never`)
 *
 *   ProjectItem = GameProject | WebProject
 *
 * The `type` literal is the discriminator: narrowing on `project.type`
 * (switch / if) gives full type safety in renderers — e.g. only a
 * `GameProject` can be passed to `GameProjectCard`.
 */

/** A category used to group projects in detail and for filter labels. */
export type ProjectCategory =
  | "Full-Stack Engineering"
  | "Full-Stack Web Development"
  | "Quantitative Finance"
  | "Software Engineering"
  | "Game Technology"
  | "Game Development"
  | "Mobile Game Development"
  | "Machine Learning"
  | "Data Science & Fintech";

/** A single screenshot in a project's detail-page gallery. */
export interface GalleryImage {
  /** Path in /public, e.g. "/projects/wacky-whackers/screen1.png" */
  src: string;
  /** Accessible alt text (also used as the card / lightbox title). */
  alt: string;
  /** Optional one-line caption shown under the image. */
  caption?: string;
}

/**
 * Fields shared by every project, regardless of type.
 *
 * Naming map vs. a generic CMS-style schema:
 *   id          → `slug` (unique id *and* URL segment)
 *   description → `shortDescription` (cards) + `overview` (detail page)
 *   link        → `githubUrl` / `liveUrl`
 *   imageUrl    → `thumbnail` (cards) + `coverImage` (detail hero) + `gallery`
 */
export interface BaseProject {
  /** URL slug used in /projects/[slug] — doubles as the unique id. */
  slug: string;
  /** Display title */
  title: string;
  /** Optional short tagline shown under the title on the detail-page hero. */
  tagline?: string;
  /** One-sentence summary used in cards */
  shortDescription: string;
  /** Long-form description used on the detail page */
  overview: string;
  /** Category label, free-form */
  category: ProjectCategory;
  /** Year shown on the card and detail hero. Prefer ISO YYYY. */
  year?: string;
  /** Optional one-line note about the user's role on the project. */
  role?: string;
  /** Optional achievement badge text (e.g. "KMIPN 2025 Finalist"). */
  achievement?: string;
  /** Technologies shown as tags — the "tech stack" of the project. */
  tags: string[];
  /** Optional GitHub URL */
  githubUrl?: string;
  /** Optional live demo URL */
  liveUrl?: string;
  /** Optional path to a thumbnail in /public, e.g. "/projects/portfolio-optimizer.png" */
  thumbnail?: string;
  /**
   * Optional cover image (path in /public) rendered prominently at the
   * top of the case-study page, e.g. "/projects/wacky-whackers/cover.png".
   */
  coverImage?: string;
  /**
   * Optional screenshot gallery rendered as a responsive grid with a
   * lightbox preview at the bottom of the case-study page.
   */
  gallery?: GalleryImage[];
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

/**
 * A game development project.
 *
 * `engine` and `coreMechanics` are required — a game project without
 * them is a modelling error, so the type system rejects it. These
 * fields power the "Tech Stack" panel in `GameProjectCard`.
 */
export interface GameProject extends BaseProject {
  /** Discriminator for the ProjectItem union. */
  type: "game";
  /**
   * Game engine used.
   * Examples: "Unity", "Godot 4", "Unity 2022 LTS"
   */
  engine: string;
  /**
   * 3-D / 2-D asset creation tools.
   * Examples: ["3ds Max 2018", "Blender 4"]
   */
  assetsTools?: string[];
  /**
   * Core gameplay mechanics or design pillars.
   * Examples: ["Procedural Generation", "Turn-Based Combat"]
   */
  coreMechanics: string[];
}

/**
 * A standard software / web project (full-stack, quant, tooling, …).
 *
 * Game-only fields are explicitly set to `never` so a `WebProject`
 * can never accidentally carry game metadata — this keeps the union
 * strictly separated and makes `project.type` narrowing exhaustive.
 */
export interface WebProject extends BaseProject {
  /** Discriminator for the ProjectItem union. */
  type: "web";
  engine?: never;
  assetsTools?: never;
  coreMechanics?: never;
}

/** Any project — narrow on `type` to access type-specific fields. */
export type ProjectItem = GameProject | WebProject;

/**
 * @deprecated Legacy alias kept only so the old flat `components/*.tsx`
 * files (pending deletion) keep compiling. New code must use
 * `ProjectItem`, `GameProject`, or `WebProject`.
 */
export type Project = ProjectItem;

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
  /**
   * Set to true for international exchange or study-abroad entries.
   * Drives a distinct globe-icon node, sky-blue card treatment, and
   * an "International Exchange" badge in the Timeline component.
   */
  isInternational?: boolean;
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
  /**
   * Set to true for international exchange or study-abroad entries.
   * Drives a distinct globe-icon node, sky-blue card treatment, and
   * an "International Exchange" badge in the Timeline component.
   */
  isInternational?: boolean;
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
  /**
   * When true, this achievement is surfaced as a top-tier result
   * (national / international scale). UI components may use this flag
   * to apply distinct styling — e.g. a glowing border, a "Featured"
   * pip badge, or an elevated background — independently of the
   * `hero` layout flag.
   */
  isFeatured?: boolean;
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
  /** Optional Twitter / X profile. */
  twitterUrl?: string;
  twitterHandle?: string;
  /** Optional — only included if it fits the professional design. */
  instagramUrl?: string;
  instagramHandle?: string;
  /** Path to resume PDF in /public. */
  resumeUrl: string;
  /** Display label for the resume link */
  resumeLabel: string;
}