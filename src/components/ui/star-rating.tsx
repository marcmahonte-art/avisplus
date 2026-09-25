import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Affichage d'une note sur 5.
 *
 * ⚠️ Cahier des charges §10 : les notes affichées sur les pages publiques doivent
 * provenir d'avis réels. Ce composant ne fait que restituer la note fournie par le
 * commerçant ou récupérée depuis une source autorisée.
 */
export function StarRating({
  rating,
  size = 16,
  className,
  label,
}: {
  rating: number;
  size?: number;
  className?: string;
  /** Description accessible ; sans elle, la note est annoncée en texte. */
  label?: string;
}) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={label ?? `Note de ${rating} sur 5`}
    >
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = rounded >= index;
        const half = !filled && rounded >= index - 0.5;

        return (
          <span key={index} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              strokeWidth={1.6}
              className="absolute inset-0 text-avis-border"
              aria-hidden="true"
            />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? size / 2 : size }}
                aria-hidden="true"
              >
                <Star
                  size={size}
                  strokeWidth={1.6}
                  className="fill-avis-primary text-avis-primary"
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
