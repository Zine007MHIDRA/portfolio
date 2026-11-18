"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import "./preview.css";

type SpeedKey = "snappy" | "balanced" | "slow";

const SPEED_PRESETS: Record<
  SpeedKey,
  { label: string; sweepMs: string; bloomMs: string; charStepMs: string }
> = {
  snappy: {
    label: "Snappy (450ms)",
    sweepMs: "450ms",
    bloomMs: "480ms",
    charStepMs: "12ms",
  },
  balanced: {
    label: "Balanced (650ms)",
    sweepMs: "620ms",
    bloomMs: "700ms",
    charStepMs: "18ms",
  },
  slow: {
    label: "Luxurious (950ms)",
    sweepMs: "920ms",
    bloomMs: "980ms",
    charStepMs: "26ms",
  },
};

const SAMPLE_TITLES = ["INTERACTIVESHOWROOM", "F1LAPSTRATSIM", "ECOM"] as const;

export default function HoverPreviewPage() {
  const [speed, setSpeed] = useState<SpeedKey>("balanced");
  const [sampleTitle, setSampleTitle] = useState<(typeof SAMPLE_TITLES)[number]>(
    "INTERACTIVESHOWROOM"
  );

  const preset = SPEED_PRESETS[speed];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Compact lab top bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <div>
            <p className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
              LOCALHOST PREVIEW LAB
            </p>
            <h1 className="font-display text-lg font-bold tracking-tight sm:text-xl">
              Orange Hover Transition Comparison
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Speed switcher */}
            <div
              role="group"
              aria-label="Transition speed preset"
              className="flex items-center gap-1 rounded-full border border-[var(--line)] p-1"
            >
              {(Object.keys(SPEED_PRESETS) as SpeedKey[]).map((key) => {
                const active = speed === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSpeed(key)}
                    className={`min-h-[36px] rounded-full px-3 font-mono-editorial text-[11px] uppercase tracking-[0.1em] transition-colors ${
                      active
                        ? "bg-[var(--accent)] text-[var(--bg)] font-medium"
                        : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {SPEED_PRESETS[key].label}
                  </button>
                );
              })}
            </div>

            {/* Title length switcher */}
            <div
              role="group"
              aria-label="Sample project title"
              className="flex items-center gap-1 rounded-full border border-[var(--line)] p-1"
            >
              {SAMPLE_TITLES.map((title) => {
                const active = sampleTitle === title;
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setSampleTitle(title)}
                    className={`min-h-[36px] rounded-full px-3 font-mono-editorial text-[11px] uppercase tracking-[0.1em] transition-colors ${
                      active
                        ? "bg-[var(--ink)] text-[var(--bg)] font-medium"
                        : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {title === "INTERACTIVESHOWROOM" ? "LONG" : title}
                  </button>
                );
              })}
            </div>

            <Link
              href="/"
              className="min-h-[44px] inline-flex items-center rounded-full border border-[var(--line-strong)] px-4 font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Hover slowly over each project row below to compare all three options against the current
          baseline. You can also test different speeds and word lengths using the controls above.
        </p>

        <div className="border-t border-[var(--line)]">
          {/* OPTION 1: LIQUID INK SWEEP */}
          <article
            style={{ "--preview-speed": preset.sweepMs } as CSSProperties}
            className="group border-b border-[var(--line)] transition-colors duration-500 hover:bg-[var(--surface)]"
          >
            <div className="px-2 py-8 sm:px-4 sm:py-11 lg:px-5 lg:py-12">
              <div className="flex flex-wrap items-start justify-between gap-4 font-mono-editorial text-[11px] uppercase leading-[1.45] tracking-[0.15em]">
                <div>
                  <span className="inline-block rounded-full border border-[var(--accent)] px-2.5 py-0.5 text-[var(--accent)]">
                    OPTION 1 (RECOMMENDED)
                  </span>
                  <span className="mt-2 block text-[var(--ink-soft)]">
                    LIQUID INK SWEEP / FEATHERED GRADIENT WIPE LEFT-TO-RIGHT ({preset.sweepMs})
                  </span>
                </div>
                <div className="text-right text-[var(--ink-muted)]">
                  <span className="block">TYPESCRIPT /</span>
                  <span className="block">0 STARS</span>
                </div>
              </div>

              <div className="my-5 sm:my-7 overflow-x-clip px-1">
                <h2 className="font-display font-bold uppercase leading-[0.94] text-[clamp(2.45rem,8.4vw,6.85rem)]">
                  <a
                    href="#option-1"
                    onClick={(e) => e.preventDefault()}
                    className="preview-ink-sweep inline-block lg:whitespace-nowrap"
                  >
                    {sampleTitle}
                  </a>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                <span>VIEW / PROJECT ↗</span>
                <span className="text-[var(--ink-faint)]">LIVE / DEMO ↗</span>
              </div>
            </div>
          </article>

          {/* OPTION 2: WARM SILK BLOOM */}
          <article
            style={{ "--preview-speed": preset.bloomMs } as CSSProperties}
            className="group border-b border-[var(--line)] transition-colors duration-700 hover:bg-[var(--surface)]"
          >
            <div className="px-2 py-8 sm:px-4 sm:py-11 lg:px-5 lg:py-12">
              <div className="flex flex-wrap items-start justify-between gap-4 font-mono-editorial text-[11px] uppercase leading-[1.45] tracking-[0.15em]">
                <div>
                  <span className="inline-block rounded-full border border-[var(--line-strong)] px-2.5 py-0.5 text-[var(--ink)]">
                    OPTION 2
                  </span>
                  <span className="mt-2 block text-[var(--ink-soft)]">
                    WARM SILK BLOOM / UNIFORM DECELERATED FADE ON FULL ROW ({preset.bloomMs})
                  </span>
                </div>
                <div className="text-right text-[var(--ink-muted)]">
                  <span className="block">TYPESCRIPT /</span>
                  <span className="block">0 STARS</span>
                </div>
              </div>

              <div className="my-5 sm:my-7 overflow-x-clip px-1">
                <h2 className="font-display font-bold uppercase leading-[0.94] text-[clamp(2.45rem,8.4vw,6.85rem)]">
                  <a
                    href="#option-2"
                    onClick={(e) => e.preventDefault()}
                    className="preview-silk-bloom inline-block lg:whitespace-nowrap"
                  >
                    {sampleTitle}
                  </a>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                <span>VIEW / PROJECT ↗</span>
                <span className="text-[var(--ink-faint)]">LIVE / DEMO ↗</span>
              </div>
            </div>
          </article>

          {/* OPTION 3: LETTER-BY-LETTER WAVE */}
          <article
            style={{ "--char-step": preset.charStepMs } as CSSProperties}
            className="group border-b border-[var(--line)] transition-colors duration-500 hover:bg-[var(--surface)]"
          >
            <div className="px-2 py-8 sm:px-4 sm:py-11 lg:px-5 lg:py-12">
              <div className="flex flex-wrap items-start justify-between gap-4 font-mono-editorial text-[11px] uppercase leading-[1.45] tracking-[0.15em]">
                <div>
                  <span className="inline-block rounded-full border border-[var(--line-strong)] px-2.5 py-0.5 text-[var(--ink)]">
                    OPTION 3
                  </span>
                  <span className="mt-2 block text-[var(--ink-soft)]">
                    LETTER-BY-LETTER WAVE / STAGGERED CHARACTER CASCADE ({preset.charStepMs} PER LETTER)
                  </span>
                </div>
                <div className="text-right text-[var(--ink-muted)]">
                  <span className="block">TYPESCRIPT /</span>
                  <span className="block">0 STARS</span>
                </div>
              </div>

              <div className="my-5 sm:my-7 overflow-x-clip px-1">
                <h2 className="font-display font-bold uppercase leading-[0.94] text-[clamp(2.45rem,8.4vw,6.85rem)]">
                  <a
                    href="#option-3"
                    onClick={(e) => e.preventDefault()}
                    aria-label={sampleTitle}
                    className="preview-wave-link inline-block lg:whitespace-nowrap"
                  >
                    {sampleTitle.split("").map((char, index) => (
                      <span
                        key={`${sampleTitle}-${index}`}
                        aria-hidden="true"
                        style={{ "--char-index": index } as CSSProperties}
                        className="preview-char"
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </a>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                <span>VIEW / PROJECT ↗</span>
                <span className="text-[var(--ink-faint)]">LIVE / DEMO ↗</span>
              </div>
            </div>
          </article>

          {/* BASELINE COMPARISON */}
          <article className="group border-b border-[var(--line)] transition-colors duration-300 hover:bg-[var(--surface)]">
            <div className="px-2 py-8 sm:px-4 sm:py-11 lg:px-5 lg:py-12">
              <div className="flex flex-wrap items-start justify-between gap-4 font-mono-editorial text-[11px] uppercase leading-[1.45] tracking-[0.15em]">
                <div>
                  <span className="inline-block rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[var(--ink-muted)]">
                    CURRENT BASELINE
                  </span>
                  <span className="mt-2 block text-[var(--ink-faint)]">
                    ORIGINAL 200MS SNAP (TEXT-ONLY HOVER)
                  </span>
                </div>
                <div className="text-right text-[var(--ink-muted)]">
                  <span className="block">TYPESCRIPT /</span>
                  <span className="block">0 STARS</span>
                </div>
              </div>

              <div className="my-5 sm:my-7 overflow-x-clip px-1">
                <h2 className="font-display font-bold uppercase leading-[0.94] text-[clamp(2.45rem,8.4vw,6.85rem)]">
                  <a
                    href="#baseline"
                    onClick={(e) => e.preventDefault()}
                    className="inline-block lg:whitespace-nowrap text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
                  >
                    {sampleTitle}
                  </a>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                <span>VIEW / PROJECT ↗</span>
                <span className="text-[var(--ink-faint)]">LIVE / DEMO ↗</span>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
