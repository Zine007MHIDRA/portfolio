"use client";

import { useCallback, useEffect, useState } from "react";
import { portfolioConfig } from "@/data/portfolio-config";
import { RollingPill } from "@/components/RollingPill";

const MARQUEE_PHRASES = [
  "LET'S TALK",
  "LET'S COLLABORATE",
  "SAY HELLO",
  "WANNA BUILD SOMETHING?",
];

export function ContactMarqueeFooter({
  login,
  profileUrl,
}: {
  login: string;
  profileUrl: string;
}) {
  const [copiedField, setCopiedField] = useState<"email" | "handle" | null>(null);
  const [liveClock, setLiveClock] = useState<string>("-- : --");

  useEffect(() => {
    const formatNow = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setLiveClock(`${hh} : ${mm}`);
    };

    formatNow();
    const timer = window.setInterval(formatNow, 15000);
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

  return (
    <footer id="contact" className="mx-auto max-w-[1440px] px-4 pt-12 pb-10 sm:px-6 lg:px-10">
      <div className="border-t border-[var(--line)] pt-16 sm:pt-24 lg:pt-32">
        <p className="max-w-lg text-2xl sm:text-[32px] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
          Got a question, proposal or project or want to work together on something? Feel free to
          reach out.
        </p>

        {/* Full-bleed clickable marquee shifting cleanly to warm amber on hover/focus */}
        <a
          href={`mailto:${portfolioConfig.email}`}
          aria-label={`Email ${portfolioConfig.displayName} at ${portfolioConfig.email}`}
          className="group mt-10 block border-y border-[var(--line)] py-6 sm:py-8 overflow-x-clip text-[var(--ink-soft)] hover:text-[var(--marquee-hover)] focus-visible:text-[var(--marquee-hover)] transition-colors duration-300"
        >
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((dupIndex) => (
              <div key={dupIndex} className="flex shrink-0 items-center">
                {MARQUEE_PHRASES.map((phrase) => (
                  <span
                    key={`${dupIndex}-${phrase}`}
                    className="inline-flex items-center font-display font-medium uppercase leading-none text-[clamp(3rem,7.2vw,6.25rem)]"
                  >
                    <span>{phrase}</span>
                    <span className="mx-6 sm:mx-10 opacity-45">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </a>

        {/* Minimalist copy-to-clipboard contact line */}
        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-2">
          <button
            type="button"
            onClick={() => copyValue(portfolioConfig.email, "email")}
            className="min-h-[44px] inline-flex items-center text-xl sm:text-2xl font-medium tracking-[-0.02em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          >
            {copiedField === "email" ? `Copied ${portfolioConfig.email}` : portfolioConfig.email}
          </button>

          <button
            type="button"
            onClick={() => copyValue(`@${login}`, "handle")}
            className="min-h-[44px] inline-flex items-center font-mono-editorial text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            {copiedField === "handle" ? `Copied @${login}` : `Copy @${login}`}
          </button>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {copiedField === "email" ? `Copied ${portfolioConfig.email} to clipboard.` : ""}
          {copiedField === "handle" ? `Copied @${login} to clipboard.` : ""}
        </div>

        {/* Compact editorial footer bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-[var(--line)] pt-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <RollingPill
              href={profileUrl}
              label="GITHUB"
              variant="outline"
              external
              className="font-mono-editorial text-[11px] uppercase tracking-[0.14em] px-4"
            />
            <RollingPill
              href={portfolioConfig.linkedinUrl}
              label="LINKEDIN"
              variant="outline"
              external
              className="font-mono-editorial text-[11px] uppercase tracking-[0.14em] px-4"
            />
            <RollingPill
              href={`${profileUrl}?tab=repositories`}
              label="REPOSITORIES"
              variant="outline"
              external
              className="font-mono-editorial text-[11px] uppercase tracking-[0.14em] px-4"
            />
            <RollingPill
              href={`mailto:${portfolioConfig.email}`}
              label="EMAIL"
              variant="subtle"
              className="font-mono-editorial text-[11px] uppercase tracking-[0.14em] px-4"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
            <span>LOCAL · {liveClock}</span>
            <a
              href="#top"
              className="min-h-[44px] inline-flex items-center text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
