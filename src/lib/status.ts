import type {
  BusinessStatus,
  InstallationStatus,
  NfcStatus,
  OrderStatus,
  PageEventType,
  PaymentStatus,
  QrStatus,
} from "@/lib/types";

/**
 * AVIS+ — Libellés et tons des statuts affichés dans le back-office.
 * Les tons correspondent aux badges du design system (§31).
 */

export type BadgeTone = "neutral" | "success" | "warning" | "error" | "info" | "accent";

interface StatusMeta {
  label: string;
  tone: BadgeTone;
}

/** §22 — Libellés des statuts de commande. */
export const ORDER_STATUS_META: Record<OrderStatus, StatusMeta> = {
  NOUVELLE: { label: "Nouvelle", tone: "info" },
  A_CONTACTER: { label: "À contacter", tone: "warning" },
  CONFIRMEE: { label: "Confirmée", tone: "accent" },
  EN_PREPARATION: { label: "En préparation", tone: "accent" },
  CONFIGURATION: { label: "Configuration", tone: "accent" },
  INSTALLATION_PROGRAMMEE: { label: "Installation programmée", tone: "accent" },
  INSTALLEE: { label: "Installée", tone: "success" },
  TERMINEE: { label: "Terminée", tone: "success" },
  ANNULEE: { label: "Annulée", tone: "error" },
  EN_ATTENTE: { label: "En attente", tone: "warning" },
  PROBLEME: { label: "Problème", tone: "error" },
};

/** §22 — Ordre canonique du cycle de vie, utilisé par la timeline. */
export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "NOUVELLE",
  "A_CONTACTER",
  "CONFIRMEE",
  "EN_PREPARATION",
  "CONFIGURATION",
  "INSTALLATION_PROGRAMMEE",
  "INSTALLEE",
  "TERMINEE",
];

/** §22 — Statuts secondaires, hors flux principal. */
export const ORDER_SECONDARY_STATUSES: OrderStatus[] = [
  "ANNULEE",
  "EN_ATTENTE",
  "PROBLEME",
];

/** §38 — Libellés des statuts de paiement. */
export const PAYMENT_STATUS_META: Record<PaymentStatus, StatusMeta> = {
  PENDING: { label: "Non réglé", tone: "warning" },
  PARTIAL: { label: "Acompte reçu", tone: "accent" },
  PAID: { label: "Payé", tone: "success" },
  REFUNDED: { label: "Remboursé", tone: "neutral" },
};

/** §28 — Libellés des statuts d'installation. */
export const INSTALLATION_STATUS_META: Record<InstallationStatus, StatusMeta> = {
  A_PLANIFIER: { label: "À planifier", tone: "warning" },
  PLANIFIEE: { label: "Planifiée", tone: "info" },
  EN_COURS: { label: "En cours", tone: "accent" },
  TERMINEE: { label: "Terminée", tone: "success" },
  REPORTEE: { label: "Reportée", tone: "error" },
};

/** §27 — Libellés des statuts NFC. */
export const NFC_STATUS_META: Record<NfcStatus, StatusMeta> = {
  NON_CONFIGURE: { label: "Non configuré", tone: "neutral" },
  CONFIGURE: { label: "Configuré", tone: "info" },
  TESTE: { label: "Testé", tone: "accent" },
  INSTALLE: { label: "Installé", tone: "success" },
  A_REPROGRAMMER: { label: "À reprogrammer", tone: "error" },
};

/** §23 — Libellés des statuts d'entreprise. */
export const BUSINESS_STATUS_META: Record<BusinessStatus, StatusMeta> = {
  ACTIVE: { label: "Active", tone: "success" },
  INACTIVE: { label: "Désactivée", tone: "neutral" },
  BROUILLON: { label: "Brouillon", tone: "warning" },
};

/** §26 — Libellés des statuts de QR Code. */
export const QR_STATUS_META: Record<QrStatus, StatusMeta> = {
  ACTIF: { label: "Actif", tone: "success" },
  REVOQUE: { label: "Révoqué", tone: "error" },
};

/** §41 — Libellés lisibles des événements analytiques. */
export const EVENT_LABELS: Record<PageEventType, string> = {
  PAGE_VIEW: "Visites de la page",
  QR_SCAN: "Scans du QR Code",
  GOOGLE_CLICK: "Clics avis Google",
  FACEBOOK_CLICK: "Clics Facebook",
  INSTAGRAM_CLICK: "Clics Instagram",
  TIKTOK_CLICK: "Clics TikTok",
  WHATSAPP_CLICK: "Clics WhatsApp",
  MAPS_CLICK: "Clics itinéraire",
  WEBSITE_CLICK: "Clics site web",
  PHONE_CLICK: "Clics téléphone",
  MENU_VIEW: "Vues du menu",
  PRODUCT_CLICK: "Clics produit",
  SHARE_CLICK: "Partages",
  LANG_SWITCH: "Changements de langue",
};

/** Libellés lisibles des modes d'installation (§18). */
export const INSTALLATION_MODE_LABELS = {
  OUAGADOUGOU: "Installation à Ouagadougou",
  RETRAIT: "Retrait en boutique",
  LIVRAISON: "Livraison",
  AUTRE_VILLE: "Autre ville",
} as const;

/** Libellés lisibles des plateformes sociales. */
export const PLATFORM_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  site: "Site web",
} as const;
