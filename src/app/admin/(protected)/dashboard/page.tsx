import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  Eye,
  Globe,
  Package,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader, StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDashboardStats, getInstallations, getOrders } from "@/lib/data";
import { EVENT_LABELS } from "@/lib/status";
import { getEventCounts } from "@/lib/data";
import type { Order } from "@/lib/types";
import { formatDate, formatDateTime, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

/** Tableau de bord — cahier des charges §21. */
export default async function AdminDashboardPage() {
  const [stats, orders, installations, eventCounts] = await Promise.all([
    getDashboardStats(),
    getOrders(),
    getInstallations(),
    getEventCounts(),
  ]);

  const recentOrders = orders.slice(0, 6);
  const upcomingInstallations = installations
    .filter((installation) =>
      ["A_PLANIFIER", "PLANIFIEE", "EN_COURS"].includes(installation.status),
    )
    .slice(0, 5);

  const orderColumns: DataTableColumn<Order>[] = [
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
      header: "Entreprise",
      render: (order) => (
        <span className="text-avis-text">
          {order.businessName}
          <span className="block text-caption text-avis-muted">{order.city}</span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (order) => <StatusBadge kind="order" status={order.status} />,
    },
    {
      key: "amount",
      header: "Montant",
      className: "text-right",
      render: (order) => (
        <span className="font-medium text-avis-black">{formatPrice(order.totalAmount)}</span>
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

  const topEvents = Object.entries(eventCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Dashboard"
        description="Vue d'ensemble de l'activité Avis+ : commandes, installations et pages actives."
        actions={
          <>
            <Button href="/admin/commandes" variant="secondary" size="md">
              Toutes les commandes
            </Button>
            <Button href="/admin/installations" size="md">
              Planifier une installation
            </Button>
          </>
        }
      />

      {/* Indicateurs principaux */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Commandes aujourd'hui"
          value={stats.ordersToday}
          icon={ShoppingBag}
          hint={`${stats.newOrders} nouvelle(s) à traiter`}
          tone="accent"
        />
        <StatCard
          label="En préparation"
          value={stats.inPreparation}
          icon={Package}
          hint="Confirmées, en préparation ou en configuration"
        />
        <StatCard
          label="Installations cette semaine"
          value={stats.installationsThisWeek}
          icon={CalendarCheck}
          hint={`${stats.upcomingInstallations} à venir`}
        />
        <StatCard
          label="Pages actives"
          value={stats.activePages}
          icon={Globe}
          hint="Entreprises visibles publiquement"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Chiffre d'affaires"
          value={formatPrice(stats.revenue)}
          icon={Wallet}
          hint="Hors commandes annulées"
          tone="success"
        />
        <StatCard
          label="Produits vendus"
          value={stats.productsSold}
          icon={BarChart3}
          hint="Toutes commandes confondues"
        />
        <StatCard
          label="Commandes terminées"
          value={stats.completedOrders}
          icon={CheckCircle2}
          hint="Dossiers clôturés"
        />
        <StatCard
          label="Commandes reçues (total)"
          value={orders.length}
          icon={Eye}
          hint="Depuis le lancement"
        />
      </div>

      {/* Commandes récentes */}
      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-h4 text-avis-black">Commandes récentes</h2>
          <Link
            href="/admin/commandes"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:text-avis-black"
          >
            Tout voir
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>

        <DataTable columns={orderColumns} rows={recentOrders} />
      </section>

      {/* Installations à venir + analytics */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section>
          <h2 className="mb-4 text-h4 text-avis-black">Installations à venir</h2>

          {upcomingInstallations.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {upcomingInstallations.map((installation) => (
                <li key={installation.id}>
                  <Card className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-body-sm font-semibold text-avis-black">
                        {installation.businessName}
                      </p>
                      <p className="mt-0.5 text-caption text-avis-muted">
                        {installation.scheduledAt
                          ? formatDateTime(installation.scheduledAt)
                          : "Date à définir"}{" "}
                        · {installation.technician ?? "Technicien à affecter"}
                      </p>
                    </div>
                    <StatusBadge kind="installation" status={installation.status} />
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <Card className="px-6 py-10 text-center">
              <p className="text-body-sm text-avis-muted">Aucune installation en attente.</p>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-h4 text-avis-black">Activité des pages digitales</h2>

          <Card className="p-5">
            {topEvents.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {topEvents.map(([eventType, count]) => {
                  const max = topEvents[0][1];
                  const width = Math.max(6, Math.round((count / max) * 100));

                  return (
                    <li key={eventType}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-body-sm text-avis-text">
                          {EVENT_LABELS[eventType as keyof typeof EVENT_LABELS] ?? eventType}
                        </span>
                        <span className="text-body-sm font-semibold text-avis-black">{count}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-avis-soft">
                        <div
                          className="h-full rounded-full bg-avis-primary"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-6 text-center text-body-sm text-avis-muted">
                Aucun événement enregistré sur les 30 derniers jours.
              </p>
            )}

            <p className="mt-5 border-t border-avis-border pt-4 text-caption text-avis-muted">
              Données issues des événements de page (§41). Les statistiques détaillées arriveront en
              phase 2.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
