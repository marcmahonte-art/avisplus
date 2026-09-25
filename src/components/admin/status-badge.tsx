import { Badge } from "@/components/ui/badge";
import {
  BUSINESS_STATUS_META,
  INSTALLATION_STATUS_META,
  NFC_STATUS_META,
  ORDER_STATUS_META,
  PAYMENT_STATUS_META,
  QR_STATUS_META,
  type BadgeTone,
} from "@/lib/status";
import type {
  BusinessStatus,
  InstallationStatus,
  NfcStatus,
  OrderStatus,
  PaymentStatus,
  QrStatus,
} from "@/lib/types";

/**
 * Badge de statut du back-office — DESIGN_SYSTEM_AVIS_PLUS.md §31.
 * Centralise la correspondance entre un statut métier et son ton visuel.
 */

type StatusKind = "order" | "payment" | "installation" | "nfc" | "business" | "qr";

const META_BY_KIND = {
  order: ORDER_STATUS_META,
  payment: PAYMENT_STATUS_META,
  installation: INSTALLATION_STATUS_META,
  nfc: NFC_STATUS_META,
  business: BUSINESS_STATUS_META,
  qr: QR_STATUS_META,
} as const;

type StatusValue =
  | OrderStatus
  | PaymentStatus
  | InstallationStatus
  | NfcStatus
  | BusinessStatus
  | QrStatus;

export function StatusBadge({
  kind,
  status,
  className,
}: {
  kind: StatusKind;
  status: StatusValue;
  className?: string;
}) {
  const meta = (META_BY_KIND[kind] as Record<string, { label: string; tone: BadgeTone }>)[status];

  if (!meta) {
    return (
      <Badge tone="neutral" className={className}>
        {String(status)}
      </Badge>
    );
  }

  return (
    <Badge tone={meta.tone} className={className}>
      {meta.label}
    </Badge>
  );
}
