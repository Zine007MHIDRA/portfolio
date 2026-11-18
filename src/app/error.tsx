"use client";

import { portfolioConfig } from "@/data/portfolio-config";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex items-center justify-center px-5 sm:px-8"
    >
      <div className="max-w-xl w-full border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10">
        <p className="font-mono-editorial text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          Load error
        </p>
        <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wide mt-3">
          Portfolio view failed to load
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
          Something interrupted rendering the portfolio page. You can retry loading or view the
          repositories directly on GitHub.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="min-h-[44px] px-5 rounded-full bg-[var(--accent)] text-[var(--bg)] text-sm font-medium hover:opacity-90 active:scale-[0.99] transition"
          >
            Try again
          </button>
          <a
            href={portfolioConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-5 rounded-full border border-[var(--line-strong)] text-[var(--ink)] text-sm inline-flex items-center hover:border-[var(--ink)] transition"
          >
            Open GitHub profile ↗
          </a>
        </div>
      </div>
    </main>
  );
}
