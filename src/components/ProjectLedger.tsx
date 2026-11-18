"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PortfolioProject } from "@/lib/github";
import { RollingPill } from "@/components/RollingPill";
import { useMotionPreferences } from "@/components/SmoothScrollProvider";

interface ProjectLedgerProps {
  id?: string;
  sectionLabel: string;
  totalFeaturedCount?: number;
  projects: PortfolioProject[];
  emptyMessage?: string;
  onResetFilter?: () => void;
}

function formatEditorialTitle(name: string): string {
  return name.replace(/[-_]+/g, " ");
}

export function ProjectLedger({
  id,
  sectionLabel,
  totalFeaturedCount,
  projects,
  emptyMessage,
  onResetFilter,
}: ProjectLedgerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isAmbientPaused, userEnabledMotion } = useMotionPreferences();

  useEffect(() => {
    const motionBlocked = isAmbientPaused || (prefersReducedMotion && !userEnabledMotion);
    if (motionBlocked || !containerRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>("[data-parallax-title]");
      titles.forEach((el, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          el,
          { xPercent: -12 * direction },
          {
            xPercent: 14 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("article") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects, prefersReducedMotion, isAmbientPaused, userEnabledMotion]);

  return (
    <section
      id={id}
      ref={containerRef}
      aria-label={sectionLabel}
      className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-10"
    >
      <h2 className="sr-only">
        {sectionLabel} ({projects.length})
      </h2>

      {projects.length === 0 ? (
        <div className="border-y border-[var(--line)] py-14">
          <p className="text-base text-[var(--ink)]">
            {emptyMessage ?? "No public repositories match this view right now."}
          </p>
          {onResetFilter && (
            <div className="mt-4">
              <RollingPill onClick={onResetFilter} label="Show all repositories" variant="outline" />
            </div>
          )}
        </div>
      ) : (
        <div className="border-t border-[var(--line)]">
          {projects.map((project, idx) => {
            const starLabel = `${project.stars} ${project.stars === 1 ? "STAR" : "STARS"}`;
            const titleText = formatEditorialTitle(project.displayTitle);
            const isFirstFeaturedRow = idx === 0 && typeof totalFeaturedCount === "number";

            return (
              <article
                key={project.name}
                className="group border-b border-[var(--line)] transition-colors duration-300 hover:bg-[var(--surface)]"
              >
                <div className="px-2 py-8 sm:px-4 sm:py-11 lg:px-5 lg:py-14">
                  {/* Top whisper-quiet metadata strip */}
                  <div className="flex items-start justify-between gap-4 font-mono-editorial text-[11px] uppercase leading-[1.45] tracking-[0.15em] text-[var(--ink-muted)]">
                    {isFirstFeaturedRow ? (
                      <>
                        <div>
                          <span className="block text-[var(--ink-faint)]">FEATURED</span>
                          <span className="block text-[var(--ink-faint)]">
                            PROJECTS ({totalFeaturedCount})
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block">{project.language} /</span>
                          <span className="block">{starLabel}</span>
                        </div>
                      </>
                    ) : (
                      <div>
                        <span className="block">{project.language} /</span>
                        <span className="block">{starLabel}</span>
                      </div>
                    )}
                  </div>

                  {/* Gliding poster headline clipped locally so desktop scrub never causes horizontal overflow */}
                  <div className="my-5 sm:my-7 overflow-x-clip">
                    <h3 className="font-display font-bold uppercase leading-[0.94] text-[clamp(2.45rem,8.4vw,6.85rem)]">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-parallax-title
                        className="inline-block lg:whitespace-nowrap text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
                      >
                        {titleText}
                      </a>
                    </h3>
                  </div>

                  {/* Whisper-quiet bottom micro-actions keeping the row pure and touch-accessible */}
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono-editorial text-[11px] uppercase tracking-[0.15em]">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View GitHub repository for ${project.displayTitle}`}
                        className="min-h-[44px] inline-flex items-center gap-1.5 text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <span>VIEW / PROJECT</span>
                        <span aria-hidden="true">↗</span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live deployment for ${project.displayTitle}`}
                          className="min-h-[44px] inline-flex items-center gap-1.5 text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors"
                        >
                          <span>LIVE / DEMO</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>

                    {project.summary && (
                      <p className="max-w-lg text-xs sm:text-[13px] leading-relaxed text-[var(--ink-muted)]">
                        {project.summary}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
