"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { PortfolioProject } from "@/lib/github";
import { ProjectLedger } from "@/components/ProjectLedger";
import { RollingPill } from "@/components/RollingPill";

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
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
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
        sectionIndex="02 / 04 · FEATURED BUILDS"
        projects={featuredProjects}
        startNumber={1}
      />

      {/* Editorial break between flagship builds and full public archive */}
      <section
        aria-labelledby="archive-heading"
        className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="border-y border-[var(--line)] bg-[var(--surface)] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                PUBLIC ARCHIVE
              </p>
              <h2
                id="archive-heading"
                className="font-display mt-3 text-[clamp(3rem,8vw,6rem)] uppercase leading-[0.9] text-[var(--ink)]"
              >
                PUBLIC REPOSITORIES
              </h2>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[var(--ink-muted)]">
                {displayName} maintains {publicRepos} public repositories on GitHub, including{" "}
                {liveDeployments} live deployed applications across TypeScript and Python.
              </p>
            </div>

            <div className="lg:col-span-5 lg:flex lg:flex-col lg:items-end lg:justify-end gap-5">
              <RollingPill
                href={`${profileUrl}?tab=repositories`}
                label={`Browse all ${publicRepos} repositories`}
                variant="outline"
                external
              />
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Filter additional projects"
            className="mt-8 flex flex-wrap gap-2.5 pt-6 border-t border-[var(--line)]"
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
                  className={`min-h-[44px] rounded-full px-4 py-2 font-mono-editorial text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    selected
                      ? "bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] font-medium"
                      : "bg-transparent text-[var(--ink-muted)] border border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
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
          sectionIndex="02B / 04 · FILTERED ARCHIVE"
          projects={filteredAdditional}
          startNumber={featuredProjects.length + 1}
          emptyMessage="No additional repositories match this filter."
          onResetFilter={() => setActiveFilter("all")}
        />
      </div>
    </>
  );
}
