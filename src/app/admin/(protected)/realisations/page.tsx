import type { Metadata } from "next";
import Image from "next/image";
import { Eye, EyeOff, Plus } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRealisations } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Réalisations" };

/** Gestion des réalisations publiées — cahier des charges §15. */
export default async function AdminRealisationsPage() {
  const realisations = await getRealisations();

  const published = realisations.filter((item) => item.published);
  const pending = realisations.filter((item) => !item.published);

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Réalisations"
        description="Galerie des supports installés. Une réalisation doit être validée avant d'apparaître sur le site public."
        actions={
          <Button href="/admin/realisations" icon={<Plus size={18} strokeWidth={1.8} aria-hidden="true" />}>
            Ajouter une réalisation
          </Button>
        }
      />

      {/* En attente de validation */}
      {pending.length > 0 ? (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-h4 text-avis-black">
            <EyeOff size={20} strokeWidth={1.8} className="text-avis-warning" aria-hidden="true" />
            En attente de validation ({pending.length})
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((realisation) => (
              <li key={realisation.id}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-[4/3] bg-avis-soft">
                    <Image
                      src={realisation.imageUrl}
                      alt={`Support installé chez ${realisation.businessName}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-body-sm font-semibold text-avis-black">
                        {realisation.businessName}
                      </p>
                      <Badge tone="warning">Non publiée</Badge>
                    </div>
                    <p className="mt-1.5 text-caption text-avis-muted">
                      {realisation.category} · {realisation.supportType}
                    </p>
                    <p className="mt-1 text-caption text-avis-muted">
                      Installé le {formatDate(realisation.installedAt)}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Publiées */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-h4 text-avis-black">
          <Eye size={20} strokeWidth={1.8} className="text-avis-success" aria-hidden="true" />
          Publiées sur le site ({published.length})
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((realisation) => (
            <li key={realisation.id}>
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-avis-soft">
                  <Image
                    src={realisation.imageUrl}
                    alt={`Support installé chez ${realisation.businessName}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-body-sm font-semibold text-avis-black">
                      {realisation.businessName}
                    </p>
                    <Badge tone="success">Publiée</Badge>
                  </div>
                  <p className="mt-1.5 text-caption text-avis-muted">
                    {realisation.category} · {realisation.supportType}
                  </p>
                  <p className="mt-1 text-caption text-avis-muted">
                    {realisation.city} · installé le {formatDate(realisation.installedAt)}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <Card className="p-6">
        <h2 className="text-body font-semibold text-avis-black">Validation avant publication</h2>
        <p className="mt-2 text-body-sm text-avis-text">
          Une réalisation n&apos;est visible sur le site public qu&apos;après validation. Cela
          permet de vérifier l&apos;accord du client, la qualité de la photo et l&apos;absence
          d&apos;informations confidentielles avant publication.
        </p>
      </Card>
    </div>
  );
}
