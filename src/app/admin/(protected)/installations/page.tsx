import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPlus, Check, MapPin, User } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card, DetailRow } from "@/components/ui/card";
import { getInstallations } from "@/lib/data";
import type { Installation } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Installations" };

/** Suivi des installations — cahier des charges §28 et §29. */

const CHECKLIST_LABELS: { key: keyof Installation["checklist"]; label: string }[] = [
  { key: "qrTested", label: "QR testé" },
  { key: "nfcTested", label: "NFC testé" },
  { key: "pageTested", label: "Page testée" },
  { key: "customerInformed", label: "Client informé" },
];

export default async function AdminInstallationsPage() {
  const installations = await getInstallations();

  const upcoming = installations.filter((installation) =>
    ["A_PLANIFIER", "PLANIFIEE", "EN_COURS"].includes(installation.status),
  );
  const past = installations.filter((installation) =>
    ["TERMINEE", "REPORTEE"].includes(installation.status),
  );

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Installations"
        description="Planification, affectation des techniciens et preuve d'installation (photos, tests QR et NFC)."
        actions={
          <Button href="/admin/installations" icon={<CalendarPlus size={18} strokeWidth={1.8} aria-hidden="true" />}>
            Planifier une installation
          </Button>
        }
      />

      {/* À venir */}
      <section>
        <h2 className="mb-4 text-h4 text-avis-black">
          À venir ({upcoming.length})
        </h2>

        {upcoming.length > 0 ? (
          <ul className="grid gap-4 lg:grid-cols-2">
            {upcoming.map((installation) => (
              <li key={installation.id}>
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-body font-semibold text-avis-black">
                        {installation.businessName}
                      </h3>
                      <p className="mt-0.5 text-caption text-avis-muted">
                        Commande{" "}
                        <Link
                          href={`/admin/commandes/${installation.orderId}`}
                          className="text-avis-info hover:underline"
                        >
                          {installation.orderReference}
                        </Link>
                      </p>
                    </div>
                    <StatusBadge kind="installation" status={installation.status} />
                  </div>

                  <dl className="mt-4 flex flex-col divide-y divide-avis-border">
                    <DetailRow
                      label="Date prévue"
                      value={
                        installation.scheduledAt ? (
                          formatDateTime(installation.scheduledAt)
                        ) : (
                          <span className="text-avis-muted">À définir</span>
                        )
                      }
                    />
                    <DetailRow
                      label="Technicien"
                      value={
                        installation.technician ?? (
                          <span className="text-avis-muted">À affecter</span>
                        )
                      }
                    />
                    <DetailRow
                      label="Adresse"
                      value={
                        <span className="inline-flex items-start gap-1.5">
                          <MapPin
                            size={14}
                            strokeWidth={1.8}
                            className="mt-0.5 shrink-0 text-avis-muted"
                            aria-hidden="true"
                          />
                          {installation.address}, {installation.city}
                        </span>
                      }
                    />
                  </dl>

                  {installation.notes ? (
                    <p className="mt-4 rounded-md bg-avis-soft px-4 py-3 text-body-sm text-avis-text">
                      {installation.notes}
                    </p>
                  ) : null}
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <Card className="px-6 py-12 text-center">
            <p className="text-body-sm text-avis-muted">Aucune installation à venir.</p>
          </Card>
        )}
      </section>

      {/* Historique */}
      <section>
        <h2 className="mb-4 text-h4 text-avis-black">Historique ({past.length})</h2>

        <ul className="flex flex-col gap-4">
          {past.map((installation) => (
            <li key={installation.id}>
              <Card className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-body font-semibold text-avis-black">
                      {installation.businessName}
                    </h3>
                    <p className="mt-0.5 text-caption text-avis-muted">
                      {installation.orderReference} ·{" "}
                      {installation.completedAt
                        ? `terminée le ${formatDateTime(installation.completedAt)}`
                        : "non terminée"}
                    </p>
                  </div>
                  <StatusBadge kind="installation" status={installation.status} />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-1.5 text-caption text-avis-muted">
                      <User size={13} strokeWidth={1.8} aria-hidden="true" />
                      Technicien
                    </p>
                    <p className="mt-1 text-body-sm text-avis-black">
                      {installation.technician ?? "Non renseigné"}
                    </p>
                  </div>

                  {/* §29 — Preuve d'installation */}
                  <div>
                    <p className="text-caption text-avis-muted">Preuve d&apos;installation</p>
                    <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1.5">
                      {CHECKLIST_LABELS.map((item) => {
                        const done = installation.checklist[item.key];
                        return (
                          <li
                            key={item.key}
                            className={
                              done
                                ? "inline-flex items-center gap-1.5 text-body-sm font-medium text-avis-success-text"
                                : "inline-flex items-center gap-1.5 text-body-sm text-avis-muted"
                            }
                          >
                            <Check
                              size={14}
                              strokeWidth={2.4}
                              aria-hidden="true"
                              className={done ? "text-avis-success" : "text-avis-border"}
                            />
                            {item.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
