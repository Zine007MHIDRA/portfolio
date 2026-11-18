export default function Loading() {
  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-center px-5 sm:px-8 lg:px-12"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10">
        <p className="font-mono-editorial text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          Loading portfolio
        </p>
        <p className="mt-4 text-base sm:text-lg text-[var(--ink)]">
          Fetching public repositories and activity for @Zine007MHIDRA...
        </p>
      </div>
    </div>
  );
}
