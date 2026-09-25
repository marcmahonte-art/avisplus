/**
 * AVIS+ — Types du domaine.
 *
 * Ces types reflètent le schéma de base de données décrit dans le cahier des charges
 * (CAHIER_DES_CHARGES_AVIS_PLUS_V1.md §30). Ils constituent le contrat entre la couche
 * de données (`src/lib/data.ts`) et l'interface.
 *
 * La V1 s'appuie sur des données mockées. Lors du branchement de Supabase, seules les
 * fonctions de `src/lib/data.ts` devront être réécrites : aucun composant n'importe
 * directement les données mockées.
 */

/* -------------------------------------------------------------------------- */
/* Statuts                                                                     */
/* -------------------------------------------------------------------------- */

/** §22 — Cycle de vie d'une commande. */
export type OrderStatus =
  | "NOUVELLE"
  | "A_CONTACTER"
  | "CONFIRMEE"
  | "EN_PREPARATION"
  | "CONFIGURATION"
  | "INSTALLATION_PROGRAMMEE"
  | "INSTALLEE"
  | "TERMINEE"
  | "ANNULEE"
  | "EN_ATTENTE"
  | "PROBLEME";

/** §38 — Statut de paiement (prévu dès la V1 dans le back-office). */
export type PaymentStatus = "PENDING" | "PARTIAL" | "PAID" | "REFUNDED";

/** §28 — Statuts d'une installation. */
export type InstallationStatus =
  | "A_PLANIFIER"
  | "PLANIFIEE"
  | "EN_COURS"
  | "TERMINEE"
  | "REPORTEE";

/** §27 — Statuts d'une puce NFC. */
export type NfcStatus =
  | "NON_CONFIGURE"
  | "CONFIGURE"
  | "TESTE"
  | "INSTALLE"
  | "A_REPROGRAMMER";

/** §23 — Statut d'une entreprise / de sa page digitale. */
export type BusinessStatus = "ACTIVE" | "INACTIVE" | "BROUILLON";

/** §26 — Statut d'un QR Code. */
export type QrStatus = "ACTIF" | "REVOQUE";

/** §25 — Templates de page digitale. */
export type PageTemplate = "restaurant" | "beaute" | "boutique" | "hotel" | "professionnel";

/** §12 — Types de produits vendus. */
export type ProductType = "carte" | "plaque" | "sticker" | "pack";

/** §18 — Canaux d'installation proposés à la commande. */
export type InstallationMode =
  | "OUAGADOUGOU"
  | "RETRAIT"
  | "LIVRAISON"
  | "AUTRE_VILLE";

/** §30 — Plateformes sociales gérées. */
export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "whatsapp"
  | "site";

/** §18 / §41 — Événements analytiques trackables. */
export type PageEventType =
  | "PAGE_VIEW"
  | "QR_SCAN"
  | "GOOGLE_CLICK"
  | "FACEBOOK_CLICK"
  | "INSTAGRAM_CLICK"
  | "TIKTOK_CLICK"
  | "WHATSAPP_CLICK"
  | "MAPS_CLICK"
  | "WEBSITE_CLICK"
  | "PHONE_CLICK"
  | "MENU_VIEW"
  | "PRODUCT_CLICK"
  | "SHARE_CLICK"
  | "LANG_SWITCH";

/* -------------------------------------------------------------------------- */
/* Entités                                                                     */
/* -------------------------------------------------------------------------- */

/** §30 — `businesses` */
export interface Business {
  id: string;
  name: string;
  /** Slug unique : détermine l'URL publique `/p/[slug]`. */
  slug: string;
  logoUrl: string | null;
  coverUrl: string | null;
  /** §3 — Accroche courte affichée sous le nom. */
  tagline: string | null;
  description: string | null;
  category: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string;
  /** §8 — Bouton principal de la page digitale. */
  googleReviewUrl: string | null;
  googleMapsUrl: string | null;
  websiteUrl: string | null;
  openingHours: string | null;
  /** §2 — Badge « Entreprise vérifiée ». */
  verified: boolean;
  /** §40 — Indexation Google autorisée par le client. */
  allowIndexing: boolean;
  /** §7 — Note Google affichée sur la page publique (fournie par le commerçant). */
  rating: number | null;
  reviewCount: number | null;
  template: PageTemplate;
  status: BusinessStatus;
  createdAt: string;
  updatedAt: string;
}

/** §30 — `social_links` */
export interface SocialLink {
  id: string;
  businessId: string;
  platform: SocialPlatform;
  url: string;
  label: string;
  enabled: boolean;
  sortOrder: number;
}

/** §30 — `products` (catalogue Avis+) */
export interface Product {
  id: string;
  name: string;
  slug: string;
  /** Accroche courte affichée sur la carte produit. */
  tagline: string;
  description: string;
  /** Longue description pour la page détail. */
  longDescription: string;
  /** Prix en FCFA (entier, sans décimale). */
  price: number;
  currency: "FCFA";
  imageUrl: string;
  gallery: string[];
  type: ProductType;
  /** §12 — Caractéristiques affichées sur la page détail. */
  features: string[];
  /** §12 — Délai indicatif de mise à disposition. */
  leadTime: string;
  /** §12 — Options configurables (couleur, finition…). */
  options: ProductOption[];
  popular: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

/** §18 — Une ligne de commande. */
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  options: Record<string, string>;
}

/** §22 — Étape de la timeline d'une commande. */
export interface OrderTimelineEntry {
  status: OrderStatus;
  at: string;
  note?: string;
}

/** §18 / §30 — `orders` */
export interface Order {
  id: string;
  /** §19 — Référence lisible : AV-2026-0001 */
  reference: string;
  /** Renseigné si l'entreprise a déjà été créée côté back-office. */
  businessId: string | null;
  businessName: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  customerEmail: string | null;
  city: string;
  district: string;
  address: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  currency: "FCFA";
  /** §18 — Informations digitales saisies par le client. */
  digital: OrderDigitalInfo;
  /** §18 — Mode d'installation souhaité. */
  installationMode: InstallationMode;
  notes: string | null;
  items: OrderItem[];
  timeline: OrderTimelineEntry[];
  createdAt: string;
  updatedAt: string;
}

/** §18 — Bloc « Informations digitales » du formulaire de commande. */
export interface OrderDigitalInfo {
  logoUrl: string | null;
  googleReviewUrl: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  whatsapp: string | null;
  googleMapsUrl: string | null;
  websiteUrl: string | null;
  otherLinks: string | null;
}

/** §28 / §29 — `installations` */
export interface Installation {
  id: string;
  orderId: string;
  orderReference: string;
  businessId: string;
  businessName: string;
  scheduledAt: string | null;
  address: string;
  city: string;
  technician: string | null;
  status: InstallationStatus;
  notes: string | null;
  beforePhotoUrl: string | null;
  afterPhotoUrl: string | null;
  /** §29 — Checklist de preuve d'installation. */
  checklist: InstallationChecklist;
  completedAt: string | null;
}

export interface InstallationChecklist {
  qrTested: boolean;
  nfcTested: boolean;
  pageTested: boolean;
  customerInformed: boolean;
}

/** §27 — `nfc_devices` */
export interface NfcDevice {
  id: string;
  businessId: string;
  businessName: string;
  type: string;
  uid: string | null;
  targetUrl: string;
  status: NfcStatus;
  technician: string | null;
  configuredAt: string | null;
  installedAt: string | null;
  notes: string | null;
}

/** §26 — `qr_codes` */
export interface QrCodeRecord {
  id: string;
  businessId: string;
  businessName: string;
  slug: string;
  targetUrl: string;
  format: "PNG" | "SVG";
  status: QrStatus;
  createdAt: string;
}

/** §15 — Réalisation publiée (galerie publique). */
export interface Realisation {
  id: string;
  businessName: string;
  category: string;
  city: string;
  supportType: string;
  imageUrl: string;
  published: boolean;
  installedAt: string;
}

/** §30 — `page_events` */
export interface PageEvent {
  id: string;
  businessId: string;
  eventType: PageEventType;
  createdAt: string;
  deviceType: "mobile" | "tablet" | "desktop";
}

/* -------------------------------------------------------------------------- */
/* Contenu de la page digitale (§5, §6, §7, §12 du prompt page digitale)       */
/* -------------------------------------------------------------------------- */

/** Catégorie de menu / collection / prestation. */
export interface MenuCategory {
  id: string;
  label: string;
}

/** Élément de catalogue : plat, produit ou prestation. */
export interface CatalogItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  popular: boolean;
  badge: string | null;
}

/** §7 — Avis affiché sur la page publique. */
export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: "Google";
}

/** §12 — Contenu éditorial complet d'une page digitale. */
export interface DigitalPageContent {
  businessId: string;
  /** Titre de la section catalogue, adapté au type de commerce. */
  catalogTitle: string;
  catalogSubtitle: string | null;
  categories: MenuCategory[];
  items: CatalogItem[];
  testimonials: Testimonial[];
  /** §8 — Bloc CTA principal. */
  cta: {
    title: string;
    description: string;
    label: string;
    href: string;
  } | null;
  /** §12 — Thème personnalisable par le commerçant. */
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
  };
}

/** Agrégat consommé par la page `/p/[slug]`. */
export interface DigitalPage {
  business: Business;
  socialLinks: SocialLink[];
  content: DigitalPageContent;
}

/* -------------------------------------------------------------------------- */
/* Vues back-office                                                            */
/* -------------------------------------------------------------------------- */

/** §21 — Indicateurs du dashboard. */
export interface DashboardStats {
  ordersToday: number;
  inPreparation: number;
  installationsThisWeek: number;
  activePages: number;
  revenue: number;
  productsSold: number;
  newOrders: number;
  completedOrders: number;
  upcomingInstallations: number;
}
