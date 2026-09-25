import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, ExternalLink, MousePointerClick } from "lucide-react";

import { BusinessEditor } from "@/components/admin/business-editor";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card, DetailRow } from "@/components/ui/card";
import { getBusinessById, getBusinessCategories, getEventCounts } from "@/lib/data";
import { EVENT_LABELS } from "@/lib/status";
import { publicPageUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "Éditeur de page digitale" };

/** Éditeur de page digitale — cahier des charges §24. */
export default async function AdminPageEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusinessById(id);

  if (!business) {
    notFound();
  }

  const counts = await getEventCounts(business.id);
  const categories = await getBusinessCategories();
  const totalClicks = Object.entries(counts)
    .filter(([type]) => type !== "PAGE_VIEW")
    .reduce((sum, [, value]) => sum + value, 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-2 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:text-avis-black"
        >
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          Toutes les pages digitales
        </Link>
      </div>

      <AdminPageHeader
        title={`Page de ${business.name}`}
        description="Contenu, apparence et indexation de la page publique."
        actions={
          <>
            <StatusBadge kind="business" status={business.status} />
            <Button href={`/p/${business.slug}`} size="md" variant="secondary" external>
              Prévisualiser
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <BusinessEditor business={business} categories={categories} />

        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Adresse publique</h2>
            <p className="mt-3 break-all rounded-md bg-avis-soft px-4 py-3 text-body-sm font-medium text-avis-black">
              {publicPageUrl(business.slug)}
            </p>
            <p className="mt-3 text-caption text-avis-muted">
              Cette adresse est encodée dans le QR Code et la puce NFC. Elle reste valable même si
              vous modifiez les liens de la page.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Activité (30 derniers jours)</h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-avis-soft px-4 py-3">
                <p className="flex items-center gap-1.5 text-caption text-avis-muted">
                  <Eye size={13} strokeWidth={1.8} aria-hidden="true" />
                  Visites
                </p>
                <p className="mt-1 text-h4 text-avis-black">{counts.PAGE_VIEW ?? 0}</p>
              </div>
              <div className="rounded-lg bg-avis-soft px-4 py-3">
                <p className="flex items-center gap-1.5 text-caption text-avis-muted">
                  <MousePointerClick size={13} strokeWidth={1.8} aria-hidden="true" />
                  Interactions
                </p>
                <p className="mt-1 text-h4 text-avis-black">{totalClicks}</p>
              </div>
            </div>

            {Object.keys(counts).length > 0 ? (
              <dl className="mt-4 flex flex-col divide-y divide-avis-border">
                {Object.entries(counts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, value]) => (
                    <DetailRow
                      key={type}
                      label={EVENT_LABELS[type as keyof typeof EVENT_LABELS] ?? type}
                      value={value}
                    />
                  ))}
              </dl>
            ) : (
              <p className="mt-4 text-body-sm text-avis-muted">
                Aucun événement enregistré sur cette période.
              </p>
            )}

            <p className="mt-4 border-t border-avis-border pt-4 text-caption text-avis-muted">
              Les statistiques détaillées (appareils, évolution mensuelle, export) sont prévues en
              phase 2 (§41).
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Rappel</h2>
            <p className="mt-2 text-body-sm text-avis-text">
              Modifier le <strong className="font-semibold text-avis-black">slug</strong> change
              l&apos;adresse publique : les QR Codes et les puces NFC déjà imprimés ne
              fonctionneraient plus. Préférez la désactivation à la suppression.
            </p>
            <div className="mt-4">
              <Button href={`/admin/qr?entreprise=${business.slug}`} variant="secondary" fullWidth>
                Voir les QR Codes associés
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
