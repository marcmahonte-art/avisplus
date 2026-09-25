import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Eye } from "lucide-react";

import { CategoryFilter } from "@/components/ui/category-filter";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Badge } from "@/components/ui/badge";
import { getBusinessesGroupedByCategory, getPageEvents } from "@/lib/data";
import type { Business } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Pages digitales" };

/** Gestion des pages digitales — cahier des charges §24. */
export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;

  const [groups, events] = await Promise.all([
    getBusinessesGroupedByCategory(),
    getPageEvents(),
  ]);

  // Le filtre n'accepte qu'une catégorie réellement présente dans les données.
  const activeCategoryId = groups.some((group) => group.category.id === categorie)
    ? categorie
    : undefined;

  const visibleGroups = activeCategoryId
    ? groups.filter((group) => group.category.id === activeCategoryId)
    : groups;

  const viewsByBusiness = events.reduce<Record<string, number>>((acc, event) => {
    if (event.eventType === "PAGE_VIEW") {
      acc[event.businessId] = (acc[event.businessId] ?? 0) + 1;
    }
    return acc;
  }, {});

  const columns: DataTableColumn<Business>[] = [
    {
      key: "name",
      header: "Page",
      render: (business) => (
        <span>
          <Link
            href={`/admin/pages/${business.id}`}
            className="block font-semibold text-avis-black hover:underline"
          >
            {business.name}
          </Link>
          <span className="block text-caption text-avis-muted">
            /p/{business.slug} · template {business.template}
          </span>
        </span>
      ),
    },
    {
      key: "category",
      header: "Classement",
      render: (business) => (
        <span className="flex flex-col items-start gap-1">
          <Badge tone="neutral">{business.subcategory ?? "Catégorie seule"}</Badge>
        </span>
      ),
    },
    {
      key: "views",
      header: "Visites (30 j)",
      render: (business) => (
        <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-avis-black">
          <Eye size={14} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />
          {viewsByBusiness[business.id] ?? 0}
        </span>
      ),
    },
    {
      key: "indexing",
      header: "Indexation",
      render: (business) => (
        <span className="text-body-sm text-avis-text">
          {business.allowIndexing ? "Autorisée" : "Désactivée"}
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
        title="Pages digitales"
        description="Une page par entreprise, accessible à une URL stable. Modifier une page ne change jamais le QR Code ni la puce NFC."
      />

      {/* Classement par catégorie — référentiel `categorie.md` */}
      <CategoryFilter
        items={groups.map((group) => ({
          category: group.category,
          count: group.businesses.length,
        }))}
        activeCategoryId={activeCategoryId}
        basePath="/admin/pages"
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
                  {group.businesses.length > 1 ? "pages" : "page"}
                </p>
              </div>

              <DataTable
                columns={columns}
                rows={group.businesses}
                emptyMessage="Aucune page dans cette catégorie."
              />
            </section>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-avis-border bg-avis-soft px-6 py-14 text-center text-body text-avis-muted">
          Aucune page digitale pour le moment.
        </p>
      )}

      <div className="rounded-xl border border-avis-border bg-white p-6">
        <h2 className="text-body font-semibold text-avis-black">
          Exemples de pages publiques
        </h2>
        <p className="mt-1.5 text-body-sm text-avis-text">
          Les trois démonstrations demandées au cahier des charges sont consultables directement.
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {[
            { slug: "le-terroir", label: "Le Terroir — Restauration" },
            { slug: "belle-et-moi", label: "Belle & Moi — Beauté" },
            { slug: "le-coin-mode", label: "Le Coin Mode — Mode" },
          ].map((demo) => (
            <li key={demo.slug}>
              <Link
                href={`/p/${demo.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-avis-border px-4 text-body-sm font-medium text-avis-black transition-colors duration-fast hover:bg-avis-soft"
              >
                {demo.label}
                <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
