import Image from "next/image";
import { MapPin } from "lucide-react";

import { VerifiedBadge } from "@/components/ui/badge";
import { ShareButton } from "@/components/digital-page/share-button";
import type { Business } from "@/lib/types";
import { cn, initials } from "@/lib/utils";

/**
 * Hero de la page digitale — prompt « page digitales premium » §2.
 * Photo de couverture, logo circulaire qui dépasse, nom, catégorie, localisation,
 * badge « Entreprise vérifiée », bouton de partage.
 */
export function BusinessHero({ business }: { business: Business }) {
  return (
    <header className="relative">
      {/* Couverture */}
      <div className="relative h-44 w-full overflow-hidden bg-avis-black sm:h-52">
        {business.coverUrl ? (
          <>
            <Image
              src={business.coverUrl}
              alt={`Photo de couverture de ${business.name}`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 560px"
              className="object-cover"
            />
            {/* §2 — Voile léger pour garantir la lisibilité des commandes superposées */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-avis-black via-avis-black to-avis-primary-dark"
          />
        )}

        {/* Commandes superposées */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-end gap-2 p-3">
          <ShareButton businessName={business.name} />
        </div>
      </div>

      {/* Identité */}
      <div className="px-5">
        <div className="-mt-11 flex flex-col items-center text-center">
          {/* Logo circulaire qui dépasse du bas de la couverture */}
          <div className="relative size-[88px] overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
            {business.logoUrl ? (
              <Image
                src={business.logoUrl}
                alt={`Logo de ${business.name}`}
                fill
                sizes="88px"
                className="object-cover"
              />
            ) : (
              <span
                className="flex size-full items-center justify-center bg-avis-black text-2xl font-bold tracking-tight text-white"
                aria-hidden="true"
              >
                {initials(business.name)}
              </span>
            )}
          </div>

          <h1 className="mt-3.5 text-h3 text-avis-black sm:text-[28px]">{business.name}</h1>

          <p className="mt-1 text-body-sm font-medium text-avis-text">{business.category}</p>

          <p className="mt-2 inline-flex items-center gap-1.5 text-body-sm text-avis-muted">
            <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
            {business.city}
            {business.address ? `, ${business.address}` : ""}
          </p>

          {business.verified ? <VerifiedBadge className="mt-3" /> : null}
        </div>

        {/* §3 — Accroche et description courte */}
        {business.tagline ? (
          <p className="mt-5 text-center text-body font-semibold text-avis-black">
            {business.tagline}
          </p>
        ) : null}

        {business.description ? (
          <p className={cn("mt-2 text-center text-body-sm text-avis-text")}>
            {business.description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
