import { cn } from "@/lib/utils";

type LogoVariant = "color" | "monochrome" | "white";

interface LogoProps {
  /**
   * §9 — Traitement du logo :
   * - `color` : `AVIS` noir, `+` jaune/or (usage par défaut)
   * - `monochrome` : `AVIS` noir, `+` gris
   * - `white` : version pour fonds sombres
   */
  variant?: LogoVariant;
  /** Taille de rendu. */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Affiche « AVIS+ » aux lecteurs d'écran quand le logo est décoratif. */
  asText?: boolean;
}

const SIZES: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

/**
 * Logo Avis+.
 *
 * Construit typographiquement (plutôt qu'en image) pour rester net à toutes les tailles
 * et ne peser aucun octet. Respecte les règles du design system §9 : `AVIS` en noir,
 * `+` en gris ou en jaune/or, jamais de déformation ni d'ombre.
 */
export function Logo({ variant = "color", size = "md", className, asText = true }: LogoProps) {
  const plusColor =
    variant === "color"
      ? "text-avis-primary"
      : variant === "white"
        ? "text-white/60"
        : "text-slate-400";

  const textColor = variant === "white" ? "text-white" : "text-avis-black";

  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline font-bold leading-none tracking-[-0.045em]",
        SIZES[size],
        textColor,
        className,
      )}
      aria-label={asText ? "Avis+" : undefined}
      aria-hidden={asText ? undefined : true}
    >
      AVIS
      <span className={cn("ml-[0.02em]", plusColor)} aria-hidden="true">
        +
      </span>
    </span>
  );
}

/** Signature verticale utilisée dans le footer des pages digitales. */
export function LogoSignature({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Logo size="sm" variant="monochrome" asText={false} />
      <span className="text-caption uppercase tracking-[0.18em] text-avis-muted">
        Cette page est propulsée par Avis+
      </span>
    </div>
  );
}
