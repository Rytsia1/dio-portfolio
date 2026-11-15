"use client";

import { useState } from "react";
import { Cloud } from "@/components/pixel/Cloud";
import { buttonClass } from "@/components/ui/Button";
import { ProjectCard, type ProjectCardData } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/cn";

interface ProjectBrowserProps {
  projects: ProjectCardData[];
  /** Categories in display order. */
  categories: string[];
}

/**
 * Search box and category filter over the project archive, with an empty
 * state when nothing matches. Search looks at the title, summary,
 * category and tags, so a stack name like "NumPy" finds its projects.
 */
export function ProjectBrowser({ projects, categories }: ProjectBrowserProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = projects.filter(
    (p) =>
      (!category || p.category === category) &&
      (!q ||
        [p.title, p.shortDescription, p.category, ...p.tags].join(" ").toLowerCase().includes(q)),
  );

  const filters = [
    { label: "All", value: null, count: projects.length },
    ...categories.map((c) => ({
      label: c,
      value: c as string | null,
      count: projects.filter((p) => p.category === c).length,
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="flex w-full max-w-[21rem] flex-col gap-2">
          <label htmlFor="project-search" className="text-sm font-semibold">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            autoComplete="off"
            placeholder="Try NumPy or Unity"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-full border border-border-strong bg-surface px-5 text-[15px] text-fg placeholder:text-fg-subtle"
          />
        </div>

        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const active = filter.value === category;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(filter.value)}
                className={cn(
                  "inline-flex h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98]",
                  active
                    ? "border-fg bg-fg text-surface"
                    : "border-border-strong bg-surface text-fg hover:border-fg",
                )}
              >
                {filter.label}
                <span className="type-data opacity-80">{filter.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="text-sm tabular-nums text-fg-muted">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      {shown.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} heading="h2" eager={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-6 px-6 py-18 text-center">
          <Cloud size="lg" variant={2} opacity={1} />
          <div className="flex max-w-[30em] flex-col gap-2">
            <h2 className="type-card">No projects match that search</h2>
            <p className="text-pretty text-[15px] leading-relaxed text-fg-muted">
              Nothing in {category ?? "any category"} mentions &ldquo;{query.trim()}&rdquo;. Try a
              stack name like Python or Unity, or clear the search to see everything.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
            className={buttonClass({ variant: "secondary" })}
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
