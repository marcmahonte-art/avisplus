import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Eye } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { getBusinesses, getPageEvents } from "@/lib/data";
import type { Business } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Pages digitales" };

/** Gestion des pages digitales — cahier des charges §24. */
export default async function AdminPagesPage() {
  const [businesses, events] = await Promise.all([getBusinesses(), getPageEvents()]);

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
      key: "tagline",
      header: "Accroche",
      render: (business) => (
        <span className="line-clamp-2 max-w-xs text-body-sm text-avis-text">
          {business.tagline ?? "—"}
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

      <DataTable
        columns={columns}
        rows={businesses}
        emptyMessage="Aucune page digitale pour le moment."
      />

      <div className="rounded-xl border border-avis-border bg-white p-6">
        <h2 className="text-body font-semibold text-avis-black">
          Exemples de pages publiques
        </h2>
        <p className="mt-1.5 text-body-sm text-avis-text">
          Les trois démonstrations demandées au cahier des charges sont consultables directement.
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {[
            { slug: "le-terroir", label: "Le Terroir — Restaurant" },
            { slug: "belle-et-moi", label: "Belle & Moi — Salon" },
            { slug: "le-coin-mode", label: "Le Coin Mode — Boutique" },
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
