import { portfolioConfig } from "@/data/portfolio-config";
import type { LanguageStat, PortfolioProject } from "@/lib/github";

interface GitHubActivityGridProps {
  publicRepos: number;
  totalStars: number;
  liveDeployments: number;
  followers: number;
  following: number;
  languages: LanguageStat[];
  topStarred: PortfolioProject[];
}

export function GitHubActivityGrid({
  publicRepos,
  totalStars,
  liveDeployments,
  followers,
  following,
  languages,
  topStarred,
}: GitHubActivityGridProps) {
  const summaryStats = [
    { label: "Public Repositories", value: String(publicRepos) },
    { label: "Stars Earned", value: String(totalStars) },
    { label: "Live Deployments", value: String(liveDeployments) },
    { label: "Followers / Following", value: `${followers} / ${following}` },
  ];

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-5 border-b border-[var(--line)]">
        <p className="font-mono-editorial text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          GITHUB X ACTIVITY
        </p>
        <span className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          03 / 04 · PUBLIC METRICS
        </span>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left column: verified GitHub tabular ledger */}
        <div className="lg:col-span-7">
          <h2 id="activity-heading" className="sr-only">
            GitHub Activity and Repository Ledger
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[var(--line)]">
            {summaryStats.map((stat) => (
              <div
                key={stat.label}
                className="border-r border-b border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6"
              >
                <p className="font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                  {stat.label}
                </p>
                <p className="font-display mt-2 text-5xl sm:text-6xl leading-none text-[var(--ink)]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)] pb-3 border-b border-[var(--line)]">
              Repository highlights
            </h3>

            <ul className="divide-y divide-[var(--line)] border-b border-[var(--line)]">
              {topStarred.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-wrap items-center justify-between gap-3 py-4 min-h-[48px] text-sm sm:text-[15px] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span className="font-medium">
                      {repo.displayTitle}{" "}
                      <span className="font-mono-editorial text-[11px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                        · {repo.language}
                      </span>
                    </span>
                    <span className="font-mono-editorial text-xs uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                      {repo.stars} {repo.stars === 1 ? "star" : "stars"}
                      {repo.liveUrl ? " · live ↗" : " ↗"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: stack breakdown & collaboration focus */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div className="border-t border-[var(--line)] pt-6">
            <h3 className="font-mono-editorial text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              CORE STACK
            </h3>
            {languages.length > 0 ? (
              <ul className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-center justify-between py-3.5 text-sm sm:text-base"
                  >
                    <span className="text-[var(--ink)]">{lang.name}</span>
                    <span className="font-mono-editorial text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                      {lang.count} {lang.count === 1 ? "repo" : "repos"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[var(--ink-muted)]">
                TypeScript and Python across public repositories.
              </p>
            )}
          </div>

          <div className="border-t border-[var(--line)] pt-6">
            <h3 className="font-mono-editorial text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              COLLABORATION
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink)]">
              {portfolioConfig.collaborationNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 font-mono-editorial text-xs uppercase tracking-[0.14em]">
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="min-h-[44px] inline-flex items-center text-[var(--ink)] underline underline-offset-4 decoration-[var(--line-strong)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
              >
                {portfolioConfig.email}
              </a>
              <a
                href={portfolioConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
