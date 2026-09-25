import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { getBusinesses } from "@/lib/data";
import type { Business } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Entreprises" };

/** Gestion des entreprises — cahier des charges §23. */
export default async function AdminEntreprisesPage() {
  const businesses = await getBusinesses();

  const columns: DataTableColumn<Business>[] = [
    {
      key: "name",
      header: "Entreprise",
      render: (business) => (
        <span>
          <Link
            href={`/admin/entreprises/${business.id}`}
            className="block font-semibold text-avis-black hover:underline"
          >
            {business.name}
          </Link>
          <span className="block text-caption text-avis-muted">{business.category}</span>
        </span>
      ),
    },
    {
      key: "slug",
      header: "URL publique",
      render: (business) => (
        <Link
          href={`/p/${business.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-body-sm text-avis-info hover:underline"
        >
          /p/{business.slug}
          <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      ),
    },
    {
      key: "city",
      header: "Ville",
      render: (business) => <span className="text-avis-text">{business.city}</span>,
    },
    {
      key: "contact",
      header: "Contact",
      render: (business) => (
        <span className="text-avis-text">
          <span className="block text-body-sm">{business.phone ?? "—"}</span>
          <span className="block text-caption text-avis-muted">
            {business.email ?? "Pas d'email"}
          </span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (business) => <StatusBadge kind="business" status={business.status} />,
    },
    {
      key: "updated",
      header: "Mise à jour",
      render: (business) => (
        <span className="whitespace-nowrap text-avis-muted">{formatDate(business.updatedAt)}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Entreprises"
        description="Chaque entreprise possède une page digitale publique à une URL stable. C'est cette URL qui est encodée dans le QR Code et la puce NFC."
        actions={
          <Button
            href="/admin/entreprises/nouvelle"
            icon={<Plus size={18} strokeWidth={1.8} aria-hidden="true" />}
          >
            Nouvelle entreprise
          </Button>
        }
      />

      <DataTable
        columns={columns}
        rows={businesses}
        emptyMessage="Aucune entreprise enregistrée pour le moment."
      />
    </div>
  );
}
