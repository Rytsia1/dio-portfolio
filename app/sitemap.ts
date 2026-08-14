import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllProjectSlugs } from "@/data/projects";

/**
 * Static + dynamic sitemap.
 *
 * - The home page (`/`) is the primary entry — priority 1.0.
 * - Each in-page anchor (`/#about`, `/#projects`, …) is emitted as a
 *   separate URL so crawlers that don't run JavaScript can still
 *   discover the sectioned content. They share the home page's
 *   `lastModified` because they don't have their own document.
 * - Each project case-study page (`/projects/[slug]`) is added
 *   dynamically from `data/projects.ts`, so adding a new project to
 *   the data file is the only thing needed to surface it in the
 *   sitemap.
 *
 * `lastModified` is set to the build time. For a static portfolio
 * this is the most honest signal we can give.
 */
type Route = {
  /** Path relative to the site origin. Anchors (`#foo`) are supported. */
  path: `/${string}`;
  /** Crawl priority, 0.0–1.0. */
  priority: number;
  /** Hint to crawlers about how often this URL changes. */
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: readonly Route[] = [
  { path: "/",            priority: 1.0, changeFrequency: "monthly" },
  { path: "/#about",      priority: 0.9, changeFrequency: "monthly" },
  { path: "/#timeline",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/#skills",     priority: 0.8, changeFrequency: "monthly" },
  { path: "/#projects",   priority: 0.9, changeFrequency: "weekly"  },
  { path: "/#experience", priority: 0.7, changeFrequency: "monthly" },
  { path: "/#achievements", priority: 0.7, changeFrequency: "monthly" },
  { path: "/#certificates", priority: 0.6, changeFrequency: "monthly" },
  { path: "/#contact",    priority: 0.9, changeFrequency: "yearly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const topLevel: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const projects: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [...topLevel, ...projects];
}
