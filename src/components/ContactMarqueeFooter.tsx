"use client";

import { useCallback, useEffect, useState } from "react";
import { portfolioConfig } from "@/data/portfolio-config";
import { RollingPill } from "@/components/RollingPill";
import { useMotionPreferences } from "@/components/SmoothScrollProvider";

const MARQUEE_PHRASES = [
  { text: "LET'S TALK", stroke: false },
  { text: "LET'S COLLABORATE", stroke: true },
  { text: "SAY HELLO", stroke: false },
  { text: "BUILD IN PUBLIC", stroke: true },
];

export function ContactMarqueeFooter({
  login,
  profileUrl,
}: {
  login: string;
  profileUrl: string;
}) {
  const { prefersReducedMotion, isAmbientPaused, userEnabledMotion, toggleAmbientMotion } =
    useMotionPreferences();
  const [copiedField, setCopiedField] = useState<"email" | "handle" | null>(null);
  const [liveClock, setLiveClock] = useState<string>("-- : --");

  useEffect(() => {
    const formatNow = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setLiveClock(`${hh} : ${mm} : ${ss}`);
    };

    formatNow();
    const timer = window.setInterval(formatNow, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const copyValue = useCallback(async (value: string, field: "email" | "handle") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2400);
    } catch {
      // Fallback copy for restricted browser contexts.
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2400);
    }
  }, []);

  const marqueePaused = isAmbientPaused || (prefersReducedMotion && !userEnabledMotion);

  return (
    <footer id="contact" className="border-t border-[var(--line)] pt-14 sm:pt-20 pb-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono-editorial text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
            CONTACT
          </p>
          <span className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
            04 / 04 · GET IN TOUCH
          </span>
        </div>

        <p className="mt-5 max-w-2xl text-lg sm:text-2xl leading-snug text-[var(--ink)]">
          Have a project, role, or technical problem to build together? Reach out directly by email
          or LinkedIn.
        </p>
      </div>

      {/* Full-bleed infinite editorial marquee with accessible pause toggle (R-39) */}
      <div className="mt-10 border-y border-[var(--line)] py-6 sm:py-8 overflow-x-clip">
        <div
          className={`marquee-track ${marqueePaused ? "is-paused" : ""} ${
            userEnabledMotion ? "motion-user-enabled" : ""
          }`}
          aria-hidden="true"
        >
          {[0, 1].map((dupIndex) => (
            <div key={dupIndex} className="flex shrink-0 items-center">
              {MARQUEE_PHRASES.map((phrase) => (
                <span
                  key={`${dupIndex}-${phrase.text}`}
                  className="inline-flex items-center font-display text-[clamp(3.25rem,8vw,6.75rem)] uppercase leading-none tracking-[0.02em]"
                >
                  <span className={phrase.stroke ? "display-stroke" : "text-[var(--ink)]"}>
                    {phrase.text}
                  </span>
                  <span className="mx-6 sm:mx-10 text-[var(--ink-faint)]">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Interactive contact actions + explicit marquee pause control */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <RollingPill
              onClick={() => copyValue(portfolioConfig.email, "email")}
              label={
                copiedField === "email"
                  ? `Copied ${portfolioConfig.email}`
                  : `Copy ${portfolioConfig.email}`
              }
              variant="accent"
            />
            <RollingPill
              href={`mailto:${portfolioConfig.email}`}
              label="Send email"
              variant="outline"
            />
            <RollingPill
              onClick={() => copyValue(`@${login}`, "handle")}
              label={copiedField === "handle" ? `Copied @${login}` : `Copy @${login}`}
              variant="subtle"
            />
          </div>

          <button
            type="button"
            onClick={toggleAmbientMotion}
            aria-pressed={marqueePaused}
            className="min-h-[44px] rounded-full border border-[var(--line)] px-4 font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-colors"
          >
            {marqueePaused ? "Play marquee" : "Pause marquee"}
          </button>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {copiedField === "email" ? `Copied ${portfolioConfig.email} to clipboard.` : ""}
          {copiedField === "handle" ? `Copied @${login} to clipboard.` : ""}
        </div>

        {/* Footer links + live clock */}
        <div className="mt-12 flex flex-col gap-6 border-t border-[var(--line)] pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            <RollingPill href={profileUrl} label="GITHUB" variant="outline" external />
            <RollingPill
              href={portfolioConfig.linkedinUrl}
              label="LINKEDIN"
              variant="outline"
              external
            />
            <RollingPill
              href={`${profileUrl}?tab=repositories`}
              label="REPOSITORIES"
              variant="outline"
              external
            />
            <RollingPill href="#selected-work" label="SELECTED WORK" variant="subtle" />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
            <span>LOCAL TIME · {liveClock}</span>
            <a
              href="#top"
              className="min-h-[44px] inline-flex items-center text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6 font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
          <p>{portfolioConfig.displayName} · Built with Next.js, Lenis & GSAP</p>
          <p>Editorial layout inspired by Isaac Fayemi & Oluwadare Oluwaseyi</p>
        </div>
      </div>
    </footer>
  );
}
