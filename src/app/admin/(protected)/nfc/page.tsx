import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Wifi } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader, StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Card } from "@/components/ui/card";
import { getNfcDevices } from "@/lib/data";
import { NFC_STATUS_META } from "@/lib/status";
import type { NfcDevice } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "NFC" };

/** Suivi des puces NFC — cahier des charges §27. */
export default async function AdminNfcPage() {
  const devices = await getNfcDevices();

  const columns: DataTableColumn<NfcDevice>[] = [
    {
      key: "business",
      header: "Entreprise",
      render: (device) => (
        <Link
          href={`/admin/entreprises/${device.businessId}`}
          className="font-semibold text-avis-black hover:underline"
        >
          {device.businessName}
        </Link>
      ),
    },
    {
      key: "type",
      header: "Type de puce",
      render: (device) => <span className="text-body-sm text-avis-text">{device.type}</span>,
    },
    {
      key: "uid",
      header: "UID",
      render: (device) => (
        <span className="font-mono text-caption text-avis-text">
          {device.uid ?? <span className="text-avis-muted">Non relevé</span>}
        </span>
      ),
    },
    {
      key: "target",
      header: "URL programmée",
      render: (device) => (
        <span className="break-all text-body-sm text-avis-text">{device.targetUrl}</span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (device) => <StatusBadge kind="nfc" status={device.status} />,
    },
    {
      key: "technician",
      header: "Technicien",
      render: (device) => (
        <span className="text-body-sm text-avis-text">
          {device.technician ?? <span className="text-avis-muted">—</span>}
          {device.configuredAt ? (
            <span className="block text-caption text-avis-muted">
              Programmé le {formatDate(device.configuredAt)}
            </span>
          ) : null}
        </span>
      ),
    },
  ];

  const counts = devices.reduce<Record<string, number>>((acc, device) => {
    acc[device.status] = (acc[device.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="NFC"
        description="Suivi des puces NFC programmées par Avis+. Chaque puce contient la même URL que le QR Code de l'entreprise."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Puces suivies"
          value={devices.length}
          icon={Radio}
          hint="Toutes entreprises confondues"
        />
        <StatCard
          label="Non configurées"
          value={counts.NON_CONFIGURE ?? 0}
          icon={Wifi}
          hint="À programmer avant installation"
        />
        <StatCard
          label="Configurées ou testées"
          value={(counts.CONFIGURE ?? 0) + (counts.TESTE ?? 0)}
          icon={Radio}
          tone="accent"
        />
        <StatCard
          label="Installées"
          value={counts.INSTALLE ?? 0}
          icon={Radio}
          tone="success"
        />
      </div>

      <DataTable
        columns={columns}
        rows={devices}
        emptyMessage="Aucune puce NFC enregistrée."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-body font-semibold text-avis-black">Statuts d&apos;une puce</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {Object.entries(NFC_STATUS_META).map(([status, meta]) => (
              <li key={status} className="flex items-center gap-3">
                <StatusBadge kind="nfc" status={status as NfcDevice["status"]} />
                <span className="text-body-sm text-avis-muted">{meta.label}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-body font-semibold text-avis-black">Reprogrammation</h2>
          <p className="mt-2 text-body-sm text-avis-text">
            Une puce peut être reprogrammée à tout moment sans remplacer le support physique.
            Comme pour le QR Code, la reprogrammation ne change pas l&apos;URL publique : c&apos;est
            toujours la même adresse Avis+ qui est inscrite.
          </p>
          <p className="mt-3 rounded-md bg-avis-warning-bg px-4 py-3 text-caption font-medium text-avis-warning-text">
            Mode démonstration : la mise à jour des statuts NFC sera persistée avec la base de
            données.
          </p>
        </Card>
      </div>
    </div>
  );
}
