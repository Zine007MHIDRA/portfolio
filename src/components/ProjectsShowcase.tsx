"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { PortfolioProject } from "@/lib/github";
import { ProjectLedger } from "@/components/ProjectLedger";

interface ProjectsShowcaseProps {
  displayName: string;
  publicRepos: number;
  liveDeployments: number;
  profileUrl: string;
  featuredProjects: PortfolioProject[];
  additionalProjects: PortfolioProject[];
}

type FilterKey = "all" | "TypeScript" | "Python" | "live";

export function ProjectsShowcase({
  displayName,
  publicRepos,
  liveDeployments,
  profileUrl,
  featuredProjects,
  additionalProjects,
}: ProjectsShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filterCounts = useMemo(() => {
    const ts = additionalProjects.filter((p) => p.language === "TypeScript").length;
    const py = additionalProjects.filter((p) => p.language === "Python").length;
    const live = additionalProjects.filter((p) => Boolean(p.liveUrl)).length;
    return {
      all: additionalProjects.length,
      TypeScript: ts,
      Python: py,
      live,
    };
  }, [additionalProjects]);

  const filteredAdditional = useMemo(() => {
    if (activeFilter === "all") return additionalProjects;
    if (activeFilter === "live") return additionalProjects.filter((p) => Boolean(p.liveUrl));
    return additionalProjects.filter((p) => p.language === activeFilter);
  }, [additionalProjects, activeFilter]);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: `All (${filterCounts.all})` },
    { key: "TypeScript", label: `TypeScript (${filterCounts.TypeScript})` },
    { key: "Python", label: `Python (${filterCounts.Python})` },
    { key: "live", label: `Live demos (${filterCounts.live})` },
  ];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % filters.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + filters.length) % filters.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = filters.length - 1;
    setActiveFilter(filters[nextIndex].key);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <>
      <ProjectLedger
        id="selected-work"
        sectionLabel="Selected Work"
        totalFeaturedCount={featuredProjects.length + additionalProjects.length}
        projects={featuredProjects}
      />

      {/* Open negative-space editorial statement matching the reference cadence */}
      <section
        aria-labelledby="archive-heading"
        className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
      >
        <div className="lg:pl-[28%] max-w-4xl">
          <p className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
            PUBLIC REPOSITORIES
          </p>

          <h2
            id="archive-heading"
            className="mt-4 font-semibold tracking-[-0.03em] leading-[1.12] text-[clamp(1.65rem,3.3vw,2.75rem)] text-[var(--ink)]"
          >
            {displayName} shares {publicRepos} public repositories on GitHub, with {liveDeployments}{" "}
            live deployments.
          </h2>

          <a
            href={`${profileUrl}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-bold uppercase tracking-[-0.02em] leading-[1.1] text-[clamp(1.65rem,3.3vw,2.75rem)] text-[var(--accent)] hover:opacity-85 transition-opacity"
          >
            <span>VIEW ALL PROJECTS</span>
            <span aria-hidden="true" className="text-[0.75em]">
              ↗
            </span>
          </a>

          <div
            role="tablist"
            aria-label="Filter additional repositories"
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--line)] pt-5"
          >
            {filters.map((item, index) => {
              const selected = activeFilter === item.key;
              return (
                <button
                  key={item.key}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  aria-controls="more-projects"
                  onClick={() => setActiveFilter(item.key)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`min-h-[44px] inline-flex items-center px-1 font-mono-editorial text-[11px] uppercase tracking-[0.15em] border-b-2 transition-colors ${
                    selected
                      ? "border-[var(--accent)] text-[var(--ink)] font-medium"
                      : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div id="more-projects-panel" role="tabpanel">
        <ProjectLedger
          id="more-projects"
          sectionLabel="More Builds"
          projects={filteredAdditional}
          emptyMessage="No additional repositories match this filter."
          onResetFilter={() => setActiveFilter("all")}
        />
      </div>
    </>
  );
}
