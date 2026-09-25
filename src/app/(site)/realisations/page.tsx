import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getRealisations } from "@/lib/data";
import { formatDate } from "@/lib/utils";

/** Page « Nos réalisations » — cahier des charges §15. */

export const metadata: Metadata = {
  title: "Nos réalisations",
  description:
    "Découvrez les supports Avis+ installés chez nos clients : restaurants, salons, boutiques, pharmacies et hôtels à Ouagadougou.",
};

export default async function RealisationsPage() {
  // §15 — Seules les réalisations validées sont publiées.
  const realisations = await getRealisations({ publishedOnly: true });

  return (
    <>
      <Section size="sm" background="soft">
        <Container>
          <SectionHeading
            eyebrow="Nos réalisations"
            title="Des entreprises déjà équipées"
            description="Chaque support est personnalisé, installé et testé par nos équipes. Voici quelques exemples d'installations récentes."
          />
        </Container>
      </Section>

      <Section size="sm">
        <Container>
          {realisations.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {realisations.map((realisation) => (
                <li key={realisation.id}>
                  <Card interactive className="h-full overflow-hidden">
                    <div className="relative aspect-[4/3] bg-avis-soft">
                      <Image
                        src={realisation.imageUrl}
                        alt={`Support Avis+ installé chez ${realisation.businessName}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-h4 text-avis-black">{realisation.businessName}</h2>
                        <Badge tone="neutral">{realisation.supportType.split("—")[0].trim()}</Badge>
                      </div>

                      <p className="mt-2 text-body-sm text-avis-text">
                        {realisation.category} · {realisation.supportType}
                      </p>

                      <p className="mt-3 inline-flex items-center gap-1.5 text-caption text-avis-muted">
                        <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
                        {realisation.city} · installé le {formatDate(realisation.installedAt)}
                      </p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-avis-border bg-avis-soft px-6 py-14 text-center text-body text-avis-muted">
              Aucune réalisation publiée pour le moment.
            </p>
          )}
        </Container>
      </Section>

      <CtaSection
        title="Votre entreprise sera la prochaine ?"
        description="Commandez votre support Avis+, nous nous occupons de la page, de la configuration et de l'installation."
      />
    </>
  );
}
