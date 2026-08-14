/**
 * Single source of truth for the deployed origin.
 *
 * `NEXT_PUBLIC_SITE_URL` must be set in the deployment environment
 * (Vercel project settings → Environment Variables) to the canonical
 * https URL with no trailing slash, e.g. `https://rytsia1.dev`.
 *
 * Consumed by:
 *   - `app/layout.tsx`        → `metadata.metadataBase`, OG `url`
 *   - `app/sitemap.ts`        → every sitemap entry's `url`
 *   - `app/robots.ts`         → `sitemap:` reference
 *
 * Keeping this in one file means changing the canonical domain is a
 * one-line edit instead of a multi-file find-and-replace.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
