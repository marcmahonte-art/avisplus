import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoVariant = "color" | "monochrome" | "white";

interface LogoProps {
  /**
   * §9 — Traitement du logo :
   * - `color` : logo officiel noir et gris, pour fonds clairs (usage par défaut)
   * - `monochrome` : même fichier, pour les contextes discrets (signature de page digitale)
   * - `white` : version claire, pour fonds sombres
   */
  variant?: LogoVariant;
  /** Taille de rendu. */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Affiche « AVIS+ » aux lecteurs d'écran quand le logo est décoratif. */
  asText?: boolean;
}

/**
 * Dimensions intrinsèques du fichier dans `public/images/` (732 × 192).
 * Le ratio est fixe : la hauteur pilote la largeur, jamais l'inverse.
 */
const RATIO = 732 / 192;

/** Hauteur de rendu en pixels, par taille (alignée sur l'échelle typographique). */
const HAUTEURS: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 20,
  md: 26,
  lg: 34,
  xl: 56,
};

/**
 * Logo Avis+ — image officielle fournie par le client.
 *
 * Le fichier livré comporte 282 px de transparent en haut et 302 px en bas : il a
 * été recadré sur la boîte englobante réelle avant publication dans
 * `public/images/`, afin que le logo s'aligne correctement sur la ligne de texte
 * voisine. Ne pas re-rogner le fichier, ne pas lui ajouter de marge.
 *
 * Les deux variantes sont strictement le même dessin : `logo-avis.png` pour les
 * fonds clairs, `logo-avis-blanc.png` pour les fonds sombres.
 */
export function Logo({ variant = "color", size = "md", className, asText = true }: LogoProps) {
  const hauteur = HAUTEURS[size];
  const largeur = Math.round(hauteur * RATIO);
  const source = variant === "white" ? "/images/logo-avis-blanc.png" : "/images/logo-avis.png";

  return (
    <Image
      src={source}
      alt={asText ? "Avis+" : ""}
      aria-label={asText ? "Avis+" : undefined}
      aria-hidden={asText ? undefined : true}
      width={largeur}
      height={hauteur}
      // Le logo est visible sur presque toutes les pages : il ne doit jamais
      // provoquer de décalage de mise en page pendant le chargement.
      style={{ height: hauteur, width: "auto" }}
      className={cn("block select-none", className)}
    />
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
