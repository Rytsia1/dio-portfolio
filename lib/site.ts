/**
 * Single source of truth (SSOT) for site identity, metadata, and SEO.
 *
 * Every SEO-relevant file reads from `siteConfig` — no hard-coded
 * names, roles, descriptions, or URLs in individual SEO files:
 *
 *   - `app/layout.tsx`           → `metadata` (title, description, OG, Twitter)
 *   - `app/sitemap.ts`           → every sitemap entry's `url`
 *   - `app/robots.ts`            → `sitemap:` reference
 *   - `app/opengraph-image.tsx`  → rendered name / role / description
 *
 * `NEXT_PUBLIC_SITE_URL` must be set in the deployment environment
 * (Vercel project settings → Environment Variables) to the canonical
 * https URL with no trailing slash, e.g. `https://dioadinata.dev`.
 * In local/dev builds it falls back to the placeholder below.
 *
 * Keeping this in one file means changing the canonical domain, name,
 * role, or description is a one-line edit instead of a multi-file
 * find-and-replace.
 */
export const siteConfig = {
  name: "Dio Stania Adinata",
  role: "Game Designer & Software Engineer",
  description:
    "Detail-oriented Game Designer bridging interactive media with rigorous software engineering principles.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourwebsite.com",
  links: {
    github: "https://github.com/Rytsia1",
    linkedin: "https://linkedin.com/in/dioadinata",
    twitter: "https://twitter.com/distania_9",
  },
} as const;

/** Convenience type for consumers that need to type against the config. */
export type SiteConfig = typeof siteConfig;