import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Carte Avis+ — DESIGN_SYSTEM_AVIS_PLUS.md §25.
 * Fond blanc, bordure 1px, rayon 20px, padding 24px, hover très léger.
 */

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Active l'effet de survol (translation + ombre subtile). */
  interactive?: boolean;
  as?: "div" | "article" | "section" | "li";
}

export function Card({ children, className, interactive = false, as = "div" }: CardProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "rounded-xl border border-avis-border bg-white",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-normal ease-out hover:-translate-y-0.5 hover:border-avis-border/80 hover:shadow-md",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** En-tête de carte avec titre et description optionnelle. */
export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h3 className="text-h4 text-avis-black">{title}</h3>
        {description ? (
          <p className="mt-1 text-body-sm text-avis-text">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/** Ligne de statistique compacte, utilisée dans les fiches du back-office. */
export function DetailRow({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4 py-2", className)}>
      <dt className="shrink-0 text-body-sm text-avis-muted">{label}</dt>
      <dd className="min-w-0 text-right text-body-sm font-medium text-avis-black">{value}</dd>
    </div>
  );
}
