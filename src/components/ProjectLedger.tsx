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
  sectionIndex: string;
  projects: PortfolioProject[];
  startNumber?: number;
  emptyMessage?: string;
  onResetFilter?: () => void;
}

export function ProjectLedger({
  id,
  sectionLabel,
  sectionIndex,
  projects,
  startNumber = 1,
  emptyMessage,
  onResetFilter,
}: ProjectLedgerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isAmbientPaused } = useMotionPreferences();

  useEffect(() => {
    if (prefersReducedMotion || isAmbientPaused) return;
    if (!containerRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>("[data-parallax-title]");
      titles.forEach((el, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          el,
          { xPercent: -3.5 * direction },
          {
            xPercent: 4.5 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("article") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.65,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects, prefersReducedMotion, isAmbientPaused]);

  return (
    <section
      id={id}
      ref={containerRef}
      aria-label={sectionLabel}
      className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-5 border-b border-[var(--line)]">
        <h2 className="font-mono-editorial text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          {sectionLabel} ({projects.length})
        </h2>
        <span className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          {sectionIndex}
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="border-b border-[var(--line)] py-12 text-left">
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
        <div>
          {projects.map((project, idx) => {
            const num = String(startNumber + idx).padStart(2, "0");
            const starLabel = `${project.stars} ${project.stars === 1 ? "star" : "stars"}`;

            return (
              <article
                key={project.name}
                className="group border-b border-[var(--line)] py-8 sm:py-11 lg:py-14 transition-colors duration-200 hover:border-[var(--line-strong)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                  <span>
                    {num} / {project.category}
                  </span>
                  <span>
                    {project.stars > 0 ? `${starLabel} · ` : ""}
                    {project.liveUrl ? "Live deployment · " : "Repository · "}
                    {project.pushedYear}
                  </span>
                </div>

                {/* Overflow clipped locally on the title wrapper so desktop horizontal scrub never leaks horizontal scroll (R-03). */}
                <div className="mt-3 overflow-x-clip">
                  <h3 className="font-display text-[clamp(3.2rem,11vw,8.75rem)] uppercase leading-[0.9] tracking-[0.01em] break-words">
                    <a
                      href={project.liveUrl ?? project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-parallax-title
                      className="inline-block text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
                    >
                      {project.displayTitle}
                    </a>
                  </h3>
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-2xl">
                    {project.summary ? (
                      <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--ink-muted)]">
                        {project.summary}
                      </p>
                    ) : (
                      <p className="font-mono-editorial text-xs uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                        Public {project.language} project on GitHub
                        {project.liveUrl ? " with live deployment" : ""}
                      </p>
                    )}

                    {project.topics.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Repository topics">
                        {project.topics.map((topic) => (
                          <li
                            key={topic}
                            className="border border-[var(--line)] px-2.5 py-1 font-mono-editorial text-[11px] uppercase tracking-[0.12em] text-[var(--ink-muted)]"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    {project.liveUrl && (
                      <RollingPill
                        href={project.liveUrl}
                        label="Live demo"
                        variant="outline"
                        external
                        ariaLabel={`Open live demo for ${project.displayTitle}`}
                      />
                    )}
                    <RollingPill
                      href={project.repoUrl}
                      label="View repository"
                      variant="subtle"
                      external
                      ariaLabel={`View GitHub repository for ${project.displayTitle}`}
                    />
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
