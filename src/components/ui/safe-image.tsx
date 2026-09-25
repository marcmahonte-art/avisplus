"use client";

import { useState } from "react";
import Image from "next/image";

import { cn, initials } from "@/lib/utils";

/**
 * Image tolérante aux erreurs.
 *
 * Utilisée pour les visuels de catalogue : si l'image est absente ou ne se charge pas,
 * on affiche une vignette de remplacement aux couleurs Avis+ plutôt qu'une image cassée.
 * Le rendu reste ainsi correct même avec des données de démonstration incomplètes.
 */
export function SafeImage({
  src,
  alt,
  fallbackLabel,
  className,
  sizes,
  fill = true,
  width,
  height,
  priority,
}: {
  src: string | null;
  alt: string;
  /** Texte ou nom utilisé pour générer le monogramme de remplacement. */
  fallbackLabel: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        aria-label={alt}
        role="img"
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-avis-primary-light via-avis-bg-accent to-avis-soft",
          className,
        )}
      >
        <span className="text-h3 font-bold tracking-tight text-avis-primary-dark/70">
          {initials(fallbackLabel)}
        </span>
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...(fill ? { fill: true } : { width: width ?? 800, height: height ?? 600 })}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
