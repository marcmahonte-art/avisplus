import type { Metadata } from "next";
import Link from "next/link";

import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { QrGenerator } from "@/components/admin/qr-generator";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Card } from "@/components/ui/card";
import { getBusinesses, getQrCodes } from "@/lib/data";
import type { QrCodeRecord } from "@/lib/types";
import { formatDateTime, publicPageUrl } from "@/lib/utils";

export const metadata: Metadata = { title: "QR Codes" };

/** Gestion des QR Codes — cahier des charges §26. */
export default async function AdminQrPage({
  searchParams,
}: {
  searchParams: Promise<{ entreprise?: string }>;
}) {
  const [{ entreprise }, qrCodes, businesses] = await Promise.all([
    searchParams,
    getQrCodes(),
    getBusinesses(),
  ]);

  const activeBusinesses = businesses
    .filter((business) => business.status === "ACTIVE")
    .map((business) => ({
      slug: business.slug,
      name: business.name,
      url: publicPageUrl(business.slug),
    }));

  const columns: DataTableColumn<QrCodeRecord>[] = [
    {
      key: "business",
      header: "Entreprise",
      render: (qr) => (
        <span>
          <Link
            href={`/admin/entreprises/${qr.businessId}`}
            className="block font-semibold text-avis-black hover:underline"
          >
            {qr.businessName}
          </Link>
          <span className="block text-caption text-avis-muted">/p/{qr.slug}</span>
        </span>
      ),
    },
    {
      key: "target",
      header: "URL encodée",
      render: (qr) => (
        <span className="break-all text-body-sm text-avis-text">{qr.targetUrl}</span>
      ),
    },
    {
      key: "format",
      header: "Format",
      render: (qr) => <span className="text-body-sm text-avis-text">{qr.format}</span>,
    },
    {
      key: "status",
      header: "Statut",
      render: (qr) => <StatusBadge kind="qr" status={qr.status} />,
    },
    {
      key: "created",
      header: "Émis le",
      render: (qr) => (
        <span className="whitespace-nowrap text-avis-muted">{formatDateTime(qr.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Télécharger",
      render: (qr) => (
        <span className="flex gap-2">
          <Link
            href={`/api/qr?slug=${qr.slug}&format=svg&download=1`}
            className="text-body-sm font-medium text-avis-info hover:underline"
          >
            SVG
          </Link>
          <Link
            href={`/api/qr?slug=${qr.slug}&format=png&download=1`}
            className="text-body-sm font-medium text-avis-info hover:underline"
          >
            PNG
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="QR Codes"
        description="Générez, prévisualisez et téléchargez les QR Codes des entreprises. Un QR Code encode toujours l'URL publique stable de la page digitale."
      />

      <Card className="p-6">
        <h2 className="text-h4 text-avis-black">Générateur</h2>
        <p className="mt-1.5 text-body-sm text-avis-text">
          Le QR Code pointe vers une adresse Avis+ qui ne change jamais. Vous pouvez modifier les
          liens de la page autant de fois que nécessaire sans réimprimer le support.
        </p>
        <div className="mt-6">
          <QrGenerator businesses={activeBusinesses} initialSlug={entreprise} />
        </div>
      </Card>

      <section>
        <h2 className="mb-4 text-h4 text-avis-black">QR Codes émis</h2>
        <DataTable
          columns={columns}
          rows={qrCodes}
          emptyMessage="Aucun QR Code émis pour le moment."
        />
      </section>

      <Card className="p-6">
        <h2 className="text-body font-semibold text-avis-black">Règle à retenir</h2>
        <p className="mt-2 text-body-sm text-avis-text">
          Régénérer graphiquement un QR Code ne change pas l&apos;URL publique. En revanche,
          modifier le <strong className="font-semibold text-avis-black">slug</strong> d&apos;une
          entreprise change son URL : les supports déjà installés ne fonctionneraient plus. Pour
          retirer une page, préférez la désactivation.
        </p>
      </Card>
    </div>
  );
}
