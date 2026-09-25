import type { Metadata } from "next";
import Link from "next/link";

import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Card } from "@/components/ui/card";
import { getOrders } from "@/lib/data";
import { ORDER_STATUS_META } from "@/lib/status";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Commandes" };

/** Liste des commandes — cahier des charges §22. */
export default async function AdminCommandesPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;
  const activeStatus = statut && statut in ORDER_STATUS_META ? (statut as OrderStatus) : undefined;

  const orders = await getOrders(activeStatus ? { status: activeStatus } : undefined);
  const allOrders = await getOrders();

  const columns: DataTableColumn<Order>[] = [
    {
      key: "reference",
      header: "Référence",
      render: (order) => (
        <Link
          href={`/admin/commandes/${order.id}`}
          className="font-semibold text-avis-black hover:underline"
        >
          {order.reference}
        </Link>
      ),
    },
    {
      key: "business",
      header: "Entreprise / contact",
      render: (order) => (
        <span className="text-avis-text">
          <span className="block font-medium text-avis-black">{order.businessName}</span>
          <span className="block text-caption text-avis-muted">
            {order.customerName} · {order.customerPhone}
          </span>
        </span>
      ),
    },
    {
      key: "items",
      header: "Produits",
      render: (order) => (
        <span className="text-avis-text">
          {order.items.map((item) => (
            <span key={item.id} className="block text-body-sm">
              {item.quantity} × {item.productName}
            </span>
          ))}
        </span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (order) => (
        <span className="flex flex-col items-start gap-1.5">
          <StatusBadge kind="order" status={order.status} />
          <StatusBadge kind="payment" status={order.paymentStatus} />
        </span>
      ),
    },
    {
      key: "amount",
      header: "Montant",
      className: "text-right",
      render: (order) => (
        <span className="whitespace-nowrap font-medium text-avis-black">
          {formatPrice(order.totalAmount)}
        </span>
      ),
    },
    {
      key: "created",
      header: "Reçue le",
      render: (order) => (
        <span className="whitespace-nowrap text-avis-muted">{formatDate(order.createdAt)}</span>
      ),
    },
  ];

  // Compteurs par statut pour les filtres.
  const counts = allOrders.reduce<Record<string, number>>((acc, order) => {
    acc[order.status] = (acc[order.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Commandes"
        description="Toutes les commandes reçues depuis le site public. Ouvrez une commande pour suivre son cycle de vie."
      />

      {/* Filtres par statut */}
      <nav aria-label="Filtrer les commandes">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href="/admin/commandes"
              aria-current={!activeStatus ? "true" : undefined}
              className={
                !activeStatus
                  ? "inline-flex min-h-10 items-center rounded-pill border border-avis-black bg-avis-black px-4 text-body-sm font-medium text-white"
                  : "inline-flex min-h-10 items-center rounded-pill border border-avis-border bg-white px-4 text-body-sm font-medium text-avis-text transition-colors hover:border-avis-black/30 hover:text-avis-black"
              }
            >
              Toutes ({allOrders.length})
            </Link>
          </li>

          {(Object.keys(ORDER_STATUS_META) as OrderStatus[]).map((status) => {
            const count = counts[status] ?? 0;
            if (count === 0) return null;
            const active = activeStatus === status;

            return (
              <li key={status}>
                <Link
                  href={`/admin/commandes?statut=${status}`}
                  aria-current={active ? "true" : undefined}
                  className={
                    active
                      ? "inline-flex min-h-10 items-center rounded-pill border border-avis-black bg-avis-black px-4 text-body-sm font-medium text-white"
                      : "inline-flex min-h-10 items-center rounded-pill border border-avis-border bg-white px-4 text-body-sm font-medium text-avis-text transition-colors hover:border-avis-black/30 hover:text-avis-black"
                  }
                >
                  {ORDER_STATUS_META[status].label} ({count})
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <DataTable
        columns={columns}
        rows={orders}
        emptyMessage="Aucune commande ne correspond à ce filtre."
      />

      <Card className="p-5">
        <h2 className="text-body font-semibold text-avis-black">Rappel du cycle de vie</h2>
        <p className="mt-2 text-body-sm text-avis-text">
          Nouvelle → À contacter → Confirmée → En préparation → Configuration → Installation
          programmée → Installée → Terminée.
        </p>
        <p className="mt-2 text-caption text-avis-muted">
          Statuts secondaires : annulée, en attente, problème. Chaque changement est journalisé dans
          la timeline de la commande.
        </p>
      </Card>
    </div>
  );
}
