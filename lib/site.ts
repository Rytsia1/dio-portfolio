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
 * Set `NEXT_PUBLIC_SITE_URL` in the hosting provider's environment
 * variables (e.g. `https://diostania.my.id`). On Netlify the build's `URL`
 * variable is used as a fallback; local/dev builds use a placeholder.
 *
 * Keeping this in one file means changing the canonical domain, name,
 * role, or description is a one-line edit instead of a multi-file
 * find-and-replace.
 */
// Canonical origin: explicit env var first, then the primary site URL that
// Netlify injects into every build (`URL`), then a local-dev placeholder.
const PLACEHOLDER_URL = "https://example.com";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  PLACEHOLDER_URL
).replace(/\/+$/, "");

// Fail a production build (Netlify or Vercel) instead of shipping sitemap /
// OG / canonical URLs that point at the placeholder domain.
const isProductionBuild =
  process.env.CONTEXT === "production" || process.env.VERCEL_ENV === "production";
if (isProductionBuild && siteUrl === PLACEHOLDER_URL) {
  throw new Error(
    "Site URL is not configured. Set NEXT_PUBLIC_SITE_URL in the hosting provider's environment variables.",
  );
}

export const siteConfig = {
  name: "Dio Stania Adinata",
  role: "Software Engineer · Quantitative Finance & Computational Systems",
  description:
    "Portfolio of Dio Stania Adinata — Software Engineer specialising in quantitative finance, computational systems, and full-stack engineering. Explore projects in financial modeling, Monte Carlo simulation, risk analytics, and production software.",
  url: siteUrl,
} as const;

/** Convenience type for consumers that need to type against the config. */
export type SiteConfig = typeof siteConfig;