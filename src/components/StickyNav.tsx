import { portfolioConfig } from "@/data/portfolio-config";
import { RollingPill } from "@/components/RollingPill";

export function StickyNav({ login }: { login: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(16,17,15,0.92)] backdrop-blur-md">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10"
      >
        <div className="flex items-center gap-4 sm:gap-7 min-w-0">
          <a
            href="#top"
            aria-label={`${portfolioConfig.displayName}, back to top`}
            className="font-mono-editorial text-[11px] font-medium uppercase leading-[1.15] tracking-[0.14em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors shrink-0"
          >
            <span className="hidden sm:block">
              {portfolioConfig.navNameLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <span className="sm:hidden">ZINE MHIDRA</span>
          </a>

          <div className="hidden md:block font-mono-editorial text-[11px] uppercase leading-[1.45] tracking-[0.14em] text-[var(--ink-muted)] truncate">
            <p className="text-[var(--ink)]">{portfolioConfig.role}</p>
            <p>@{login}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#selected-work"
            className="hidden sm:inline-flex items-center min-h-[44px] px-3 font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            Selected Work
          </a>
          <a
            href="#activity"
            className="hidden md:inline-flex items-center min-h-[44px] px-3 font-mono-editorial text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            Activity
          </a>
          <RollingPill
            href="#contact"
            label="CONTACT"
            variant="outline"
            className="font-mono-editorial text-[11px] uppercase tracking-[0.14em] px-4 sm:px-5"
          />
        </div>
      </nav>
    </header>
  );
}
