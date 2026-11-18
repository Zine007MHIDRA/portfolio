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
  const languageSummary =
    languages.length > 0
      ? languages.map((l) => `${l.name} (${l.count})`).join(", ")
      : "TypeScript, Python";

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="border-t border-[var(--line)] pt-12 sm:pt-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left column: whisper-thin 2-column hairline ledger */}
          <div className="lg:col-span-7">
            <h2
              id="activity-heading"
              className="font-mono-editorial text-[11px] uppercase leading-[1.45] tracking-[0.16em] text-[var(--accent)]"
            >
              <span className="block">GITHUB X</span>
              <span className="block">ACTIVITY</span>
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 font-mono-editorial text-xs text-[var(--ink-soft)]">
              <div className="border-b border-[var(--line)] py-3.5">
                {publicRepos} public repositories
              </div>
              <div className="border-b border-[var(--line)] py-3.5">
                {totalStars} {totalStars === 1 ? "star" : "stars"} earned
              </div>
              <div className="border-b border-[var(--line)] py-3.5">
                {liveDeployments} live deployments
              </div>
              <div className="border-b border-[var(--line)] py-3.5">
                {followers} followers · {following} following
              </div>

              {topStarred.map((repo) => (
                <div key={repo.name} className="border-b border-[var(--line)]">
                  <a
                    href={repo.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center justify-between gap-2 py-2.5 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                  >
                    <span className="truncate">{repo.displayTitle}</span>
                    <span className="shrink-0 text-[var(--ink-faint)]">
                      · {repo.stars} {repo.stars === 1 ? "star" : "stars"}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: stack & collaboration */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <h3 className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                STACK & LANGUAGES
              </h3>
              <p className="mt-3 text-lg sm:text-xl font-medium leading-snug text-[var(--ink)]">
                {languageSummary}
              </p>
            </div>

            <div>
              <h3 className="font-mono-editorial text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                ICEBREAKERS
              </h3>
              <p className="mt-3 text-lg sm:text-xl font-medium leading-snug text-[var(--ink)]">
                {portfolioConfig.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                {portfolioConfig.collaborationNote}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono-editorial text-[11px] uppercase tracking-[0.14em]">
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
      </div>
    </section>
  );
}
