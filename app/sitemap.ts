import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/projects";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Static sitemap. The home page is the primary entry; project detail
 * pages are added dynamically from the projects data.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  const projects: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [home, ...projects];
}
