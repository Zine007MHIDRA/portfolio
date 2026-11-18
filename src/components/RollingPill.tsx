"use client";

import type { ReactNode } from "react";

type PillVariant = "accent" | "outline" | "subtle";

interface BaseProps {
  label: string;
  variant?: PillVariant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

interface LinkPillProps extends BaseProps {
  href: string;
  onClick?: never;
  ariaPressed?: never;
}

interface ButtonPillProps extends BaseProps {
  href?: never;
  onClick: () => void;
  ariaPressed?: boolean;
}

export type RollingPillProps = LinkPillProps | ButtonPillProps;

const variantClasses: Record<PillVariant, string> = {
  accent:
    "bg-[var(--accent)] text-[var(--bg)] border border-[var(--accent)] font-medium hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] active:scale-[0.98]",
  outline:
    "bg-transparent text-[var(--ink)] border border-[var(--line-strong)] hover:border-[var(--ink)] hover:bg-[rgba(243,240,232,0.06)] active:scale-[0.98]",
  subtle:
    "bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[#20231e] active:scale-[0.98]",
};

export function RollingPill({
  label,
  variant = "outline",
  external = false,
  className = "",
  ariaLabel,
  href,
  onClick,
  ariaPressed,
}: RollingPillProps) {
  const shared = `roll-trigger inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-[13px] tracking-[0.02em] transition-colors duration-200 select-none ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span className="roll-label">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
      {external && (
        <span aria-hidden="true" className="text-[12px] leading-none opacity-80">
          ↗
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={shared}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={shared}
    >
      {content}
    </button>
  );
}
