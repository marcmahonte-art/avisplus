import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";

import { CategoryFilter } from "@/components/ui/category-filter";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { getBusinessesGroupedByCategory } from "@/lib/data";
import type { Business } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Entreprises" };

/** Gestion des entreprises — cahier des charges §23. */
export default async function AdminEntreprisesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const groups = await getBusinessesGroupedByCategory();

  const activeCategoryId = groups.some((group) => group.category.id === categorie)
    ? categorie
    : undefined;

  const visibleGroups = activeCategoryId
    ? groups.filter((group) => group.category.id === activeCategoryId)
    : groups;

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

      {/* Classement par catégorie — référentiel `categorie.md` */}
      <CategoryFilter
        items={groups.map((group) => ({
          category: group.category,
          count: group.businesses.length,
        }))}
        activeCategoryId={activeCategoryId}
        basePath="/admin/entreprises"
      />

      {visibleGroups.length > 0 ? (
        <div className="flex flex-col gap-8">
          {visibleGroups.map((group) => (
            <section key={group.category.id} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-h4 text-avis-black">{group.category.label}</h2>
                  <p className="mt-0.5 text-caption text-avis-muted">
                    {group.category.description}
                  </p>
                </div>
                <p className="text-body-sm font-medium text-avis-text">
                  {group.businesses.length}{" "}
                  {group.businesses.length > 1 ? "entreprises" : "entreprise"}
                </p>
              </div>

              <DataTable
                columns={columns}
                rows={group.businesses}
                emptyMessage="Aucune entreprise dans cette catégorie."
              />
            </section>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-avis-border bg-avis-soft px-6 py-14 text-center text-body text-avis-muted">
          Aucune entreprise enregistrée pour le moment.
        </p>
      )}
    </div>
  );
}
