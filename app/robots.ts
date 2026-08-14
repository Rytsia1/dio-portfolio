import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt — allow all well-behaved crawlers and point them at the
 * generated sitemap.
 *
 * `MetadataRoute.Robots` in Next.js 16 only accepts `rules` and
 * `sitemap`; the previous `host:` field is not part of the typed
 * schema and is ignored by all modern crawlers, so it has been
 * removed. Canonicalisation is handled via the OG `url` and the
 * `metadataBase` in `app/layout.tsx`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
