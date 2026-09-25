import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Carte d'indicateur du dashboard — cahier des charges §21. */
export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  tone = "default",
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  tone?: "default" | "accent" | "success";
  className?: string;
}) {
  const tones = {
    default: "bg-avis-soft text-avis-black",
    accent: "bg-avis-primary-light text-avis-primary-dark",
    success: "bg-avis-success-bg text-avis-success-text",
  } as const;

  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-body-sm text-avis-muted">{label}</p>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            tones[tone],
          )}
        >
          <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>

      <p className="mt-3 text-[30px] font-bold leading-none tracking-tight text-avis-black">
        {value}
      </p>

      {hint ? <p className="mt-2 text-caption text-avis-muted">{hint}</p> : null}
    </Card>
  );
}

/** Conteneur de page du back-office : titre, description et actions. */
export function AdminPageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-avis-border pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="text-h2-sm text-avis-black md:text-h2">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-body-sm text-avis-text">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
