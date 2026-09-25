import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Conteneur Avis+ — DESIGN_SYSTEM_AVIS_PLUS.md §34.
 * max-width 1280px, padding 20px mobile / 24px tablette / 32px desktop.
 */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  /** `narrow` pour les contenus éditoriaux, `wide` pour les grilles pleine largeur. */
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-6 lg:px-8",
        size === "default" && "max-w-container",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[1440px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Section verticale avec espacement cohérent (§14 : 64px à 96px). */
export function Section({
  children,
  className,
  background = "white",
  size = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  background?: "white" | "soft" | "accent" | "dark";
  size?: "sm" | "default" | "lg";
  id?: string;
}) {
  const backgrounds = {
    white: "bg-white",
    soft: "bg-avis-soft",
    accent: "bg-avis-bg-accent",
    dark: "bg-avis-black text-white",
  } as const;

  const sizes = {
    sm: "py-12 md:py-16",
    default: "py-16 md:py-20 lg:py-24",
    lg: "py-20 md:py-24 lg:py-30",
  } as const;

  return (
    <section
      id={id}
      className={cn(backgrounds[background], sizes[size], className)}
    >
      {children}
    </section>
  );
}

/**
 * Titre de section — §4 (eyebrow) et §3 (H2).
 * L'eyebrow peut contenir un `+` mis en valeur avec la couleur accent.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <p className="avis-eyebrow">{eyebrow}</p> : null}
      <Tag className="max-w-3xl text-h2-sm md:text-h2">{title}</Tag>
      {description ? (
        <p className="max-w-2xl text-body text-avis-text md:text-body-lg">{description}</p>
      ) : null}
    </div>
  );
}

/** Séparateur horizontal discret. */
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-avis-border", className)} />;
}
