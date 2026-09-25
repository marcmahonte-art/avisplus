import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Copy, Download, ExternalLink, QrCode, Radio } from "lucide-react";

import { BusinessEditor } from "@/components/admin/business-editor";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card, DetailRow } from "@/components/ui/card";
import { getBusinessById, getBusinessCategories, getQrCodes, getSocialLinks } from "@/lib/data";
import { getCategoryLabel } from "@/lib/categories";
import { PLATFORM_LABELS } from "@/lib/status";
import { formatDate, publicPageUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "Fiche entreprise" };

/** Fiche entreprise et éditeur de page digitale — cahier des charges §23 et §24. */
export default async function AdminEntrepriseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusinessById(id);

  if (!business) {
    notFound();
  }

  const [socialLinks, qrCodes, categories] = await Promise.all([
    getSocialLinks(business.id),
    getQrCodes(),
    getBusinessCategories(),
  ]);

  const businessQr = qrCodes.filter((qr) => qr.businessId === business.id);
  const pageUrl = publicPageUrl(business.slug);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/admin/entreprises"
          className="inline-flex items-center gap-2 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:text-avis-black"
        >
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          Toutes les entreprises
        </Link>
      </div>

      <AdminPageHeader
        title={business.name}
        description={`${business.category} · ${business.city} · créée le ${formatDate(business.createdAt)}`}
        actions={
          <>
            <StatusBadge kind="business" status={business.status} />
            <Button href={`/p/${business.slug}`} size="md" variant="secondary" external>
              Voir la page
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-6">
          <BusinessEditor business={business} categories={categories} />

          {/* Réseaux sociaux */}
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Réseaux sociaux</h2>
            <p className="mt-1 text-body-sm text-avis-text">
              Seuls les réseaux activés apparaissent sur la page publique.
            </p>

            {socialLinks.length > 0 ? (
              <ul className="mt-4 flex flex-col divide-y divide-avis-border">
                {socialLinks.map((link) => (
                  <li key={link.id} className="flex items-center justify-between gap-4 py-3">
                    <span className="min-w-0">
                      <span className="block text-body-sm font-medium text-avis-black">
                        {PLATFORM_LABELS[link.platform]}
                      </span>
                      <span className="block truncate text-caption text-avis-muted">{link.url}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <StatusBadge
                        kind="business"
                        status={link.enabled ? "ACTIVE" : "INACTIVE"}
                      />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ouvrir ${PLATFORM_LABELS[link.platform]}`}
                        className="inline-flex size-9 items-center justify-center rounded-full text-avis-muted transition-colors duration-fast hover:bg-avis-soft hover:text-avis-black"
                      >
                        <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-body-sm text-avis-muted">
                Aucun réseau social configuré pour cette entreprise.
              </p>
            )}
          </Card>
        </div>

        {/* Colonne latérale : URL, QR, NFC */}
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">URL publique stable</h2>
            <p className="mt-2 text-body-sm text-avis-text">
              C&apos;est cette adresse qui est encodée dans le QR Code et dans la puce NFC. Elle ne
              doit jamais changer.
            </p>

            <p className="mt-4 break-all rounded-md bg-avis-soft px-4 py-3 text-body-sm font-medium text-avis-black">
              {pageUrl}
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <Button href={pageUrl} variant="secondary" external fullWidth icon={<ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />}>
                Ouvrir la page publique
              </Button>
              <Button
                href={`/api/qr?data=${encodeURIComponent(pageUrl)}&format=png`}
                variant="ghost"
                external
                fullWidth
                icon={<Download size={18} strokeWidth={1.8} aria-hidden="true" />}
              >
                Télécharger le QR Code (PNG)
              </Button>
            </div>

            <p className="mt-3 flex items-center gap-2 text-caption text-avis-muted">
              <Copy size={13} strokeWidth={1.8} aria-hidden="true" />
              Sélectionnez l&apos;adresse ci-dessus pour la copier.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Support et configuration</h2>

            <dl className="mt-4 flex flex-col divide-y divide-avis-border">
              <DetailRow label="Catégorie" value={getCategoryLabel(business.categoryId)} />
              <DetailRow label="Sous-catégorie" value={business.subcategory ?? "—"} />
              <DetailRow label="Slug" value={business.slug} />
              <DetailRow label="Template" value={business.template} />
              <DetailRow label="Indexation Google" value={business.allowIndexing ? "Autorisée" : "Désactivée"} />
              <DetailRow
                label="Note Google"
                value={business.rating ? `${business.rating} / 5` : "—"}
              />
              <DetailRow label="Nombre d'avis" value={business.reviewCount ?? "—"} />
              <DetailRow
                label="QR Codes émis"
                value={businessQr.length > 0 ? businessQr.length : "Aucun"}
              />
            </dl>

            <div className="mt-5 flex flex-col gap-2">
              <Button
                href={`/admin/qr?entreprise=${business.slug}`}
                variant="secondary"
                fullWidth
                icon={<QrCode size={18} strokeWidth={1.8} aria-hidden="true" />}
              >
                Gérer les QR Codes
              </Button>
              <Button
                href="/admin/nfc"
                variant="secondary"
                fullWidth
                icon={<Radio size={18} strokeWidth={1.8} aria-hidden="true" />}
              >
                Configurer la puce NFC
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Actions</h2>
            <p className="mt-2 text-body-sm text-avis-text">
              Désactiver une entreprise masque sa page publique sans supprimer les données : le QR
              Code et la puce continuent de fonctionner dès la réactivation.
            </p>
            <p className="mt-3 rounded-md bg-avis-warning-bg px-4 py-3 text-caption font-medium text-avis-warning-text">
              Mode démonstration : les actions de modification seront persistées avec la base de
              données.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
