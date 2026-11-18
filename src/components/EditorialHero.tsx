"use client";

import { useEffect, useRef } from "react";
import { portfolioConfig } from "@/data/portfolio-config";
import { RollingPill } from "@/components/RollingPill";
import { useMotionPreferences } from "@/components/SmoothScrollProvider";

interface EditorialHeroProps {
  login: string;
  bio: string;
  publicRepos: number;
  liveDeployments: number;
  profileUrl: string;
  hasHeroVideo: boolean;
  hasHeroPoster: boolean;
  source: "live" | "fallback";
}

export function EditorialHero({
  login,
  bio,
  publicRepos,
  liveDeployments,
  profileUrl,
  hasHeroVideo,
  hasHeroPoster,
  source,
}: EditorialHeroProps) {
  const { isAmbientPaused, userEnabledMotion, toggleAmbientMotion, prefersReducedMotion } =
    useMotionPreferences();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (isAmbientPaused || (prefersReducedMotion && !userEnabledMotion)) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        if (isVisible && !isAmbientPaused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isAmbientPaused, prefersReducedMotion, userEnabledMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="mx-auto max-w-[1440px] px-4 pt-5 pb-10 sm:px-6 sm:pt-7 lg:px-10 lg:pb-16"
    >
      <div className="relative overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {hasHeroVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover opacity-55"
              autoPlay={!prefersReducedMotion && !isAmbientPaused}
              loop
              muted
              playsInline
              width={1600}
              height={900}
              poster={hasHeroPoster ? "/media/hero-poster.jpg" : undefined}
            >
              <source src="/media/hero.mp4" type="video/mp4" />
            </video>
          ) : hasHeroPoster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/media/hero-poster.jpg"
              alt=""
              width={1600}
              height={900}
              fetchPriority="high"
              decoding="async"
              className={`h-full w-full object-cover object-right opacity-65 hero-media-drift ${
                isAmbientPaused ? "is-paused" : ""
              } ${userEnabledMotion ? "motion-user-enabled" : ""}`}
            />
          ) : (
            <div className="h-full w-full bg-[var(--surface)]" />
          )}

          {/* Directional scrim guarantees WCAG AA contrast over every pixel behind text (R-25). */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,17,15,0.96) 0%, rgba(16,17,15,0.84) 44%, rgba(16,17,15,0.34) 78%, rgba(16,17,15,0.58) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,17,15,0.52) 0%, rgba(16,17,15,0.12) 45%, rgba(16,17,15,0.92) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[rgba(16,17,15,0.82)] px-4 py-3.5 sm:px-7 lg:px-10">
          <p className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--ink-muted)]">
            <span className="text-[var(--accent)]" aria-hidden="true">
              +{" "}
            </span>
            PROFILE / @{login}
          </p>
          <p className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--ink-muted)]">
            01 / 04 · {source === "live" ? "SYNCED FROM GITHUB" : "CACHED GITHUB SNAPSHOT"}
          </p>
        </div>

        <div className="relative z-10 flex flex-col justify-between px-4 pt-10 pb-8 sm:px-7 sm:pt-14 sm:pb-10 lg:min-h-[660px] lg:px-10 lg:pt-16 lg:pb-12">
          <div>
            <p className="font-mono-editorial text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              {portfolioConfig.stackLabel}
            </p>

            <h1
              id="hero-heading"
              className="font-display mt-5 uppercase leading-[0.88] text-[clamp(3.15rem,9.2vw,7.4rem)]"
            >
              {portfolioConfig.heroTitleLines.map((line) => (
                <span key={line} className="block font-bold text-[var(--ink)]">
                  {line}
                </span>
              ))}
              <span className="display-stroke block font-normal pl-4 sm:pl-12 lg:pl-16">
                {portfolioConfig.heroOutlineLine}
              </span>
            </h1>
          </div>

          <div className="mt-8 sm:mt-10 max-w-2xl">
            <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed text-[var(--ink)]">
              {bio}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <RollingPill href="#selected-work" label="View selected work" variant="accent" />
              <RollingPill href={profileUrl} label="GitHub profile" variant="outline" external />
              <RollingPill
                href={portfolioConfig.linkedinUrl}
                label="LinkedIn"
                variant="subtle"
                external
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] bg-[rgba(16,17,15,0.72)] px-4 py-3 sm:px-7 lg:px-10">
          <p className="font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            Built from public work · {publicRepos} repositories · {liveDeployments} live
          </p>

          <div className="flex items-center gap-4">
            {(hasHeroVideo || hasHeroPoster) && (
              <button
                type="button"
                onClick={toggleAmbientMotion}
                aria-pressed={isAmbientPaused}
                className="min-h-[44px] inline-flex items-center px-2 font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                {isAmbientPaused ? "Resume motion" : "Pause motion"}
              </button>
            )}
            <a
              href="#selected-work"
              className="min-h-[44px] inline-flex items-center font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Scroll to explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
