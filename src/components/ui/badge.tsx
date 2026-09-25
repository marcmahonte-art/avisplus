import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { BadgeTone } from "@/lib/status";

/**
 * Badge Avis+ — DESIGN_SYSTEM_AVIS_PLUS.md §31.
 * Les tons fonctionnels ne doivent jamais devenir des couleurs de branding.
 */

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-avis-soft text-avis-muted",
  success: "bg-avis-success-bg text-avis-success-text",
  warning: "bg-avis-warning-bg text-avis-warning-text",
  error: "bg-avis-error-bg text-avis-error-text",
  info: "bg-blue-50 text-blue-700",
  accent: "bg-avis-primary-light text-avis-primary-dark",
};

interface BadgeProps {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = "neutral", icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption font-semibold",
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** §2 — Badge « Entreprise vérifiée » de la page digitale. */
export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill bg-white/95 px-2.5 py-1 text-caption font-semibold text-avis-black shadow-sm backdrop-blur",
        className,
      )}
    >
      <svg viewBox="0 0 20 20" className="size-3.5 fill-avis-success" aria-hidden="true">
        <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm4.03 6.28-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 1 1 1.06 1.06Z" />
      </svg>
      Entreprise vérifiée
    </span>
  );
}
