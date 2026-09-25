import {
  BUSINESSES,
  DIGITAL_CONTENTS,
  EMPTY_DIGITAL_CONTENT,
  SOCIAL_LINKS,
} from "@/lib/mock/businesses";
import {
  BUSINESS_CATEGORIES,
  getCategoryById,
  type BusinessCategoryDef,
} from "@/lib/categories";
import { PRODUCTS } from "@/lib/mock/products";
import {
  FAQ_ITEMS,
  FEATURE_STRIP,
  HOW_IT_WORKS_STEPS,
  INSTALLATIONS,
  NFC_DEVICES,
  ORDERS,
  PAGE_EVENTS,
  QR_CODES,
  REALISATIONS,
} from "@/lib/mock/operations";
import type {
  Business,
  CatalogItem,
  DashboardStats,
  DigitalPage,
  Installation,
  NfcDevice,
  Order,
  OrderStatus,
  PageEvent,
  Product,
  QrCodeRecord,
  Realisation,
  SocialLink,
} from "@/lib/types";

/**
 * AVIS+ — Couche d'accès aux données.
 *
 * Toutes les pages passent par ces fonctions. Elles sont volontairement `async` afin
 * qu'aucun composant n'ait à changer lorsque Supabase remplacera les données mockées
 * (cahier des charges §31, §50 point 10) : il suffira de réécrire les corps de fonctions
 * pour interroger PostgreSQL au lieu des tableaux de `src/lib/mock`.
 */

/* -------------------------------------------------------------------------- */
/* Entreprises et pages digitales                                              */
/* -------------------------------------------------------------------------- */

/** Liste les entreprises, éventuellement filtrées par statut. */
export async function getBusinesses(options?: {
  status?: Business["status"];
}): Promise<Business[]> {
  const list = options?.status
    ? BUSINESSES.filter((business) => business.status === options.status)
    : BUSINESSES;
  return [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

/** Récupère une entreprise par son identifiant. */
export async function getBusinessById(id: string): Promise<Business | null> {
  return BUSINESSES.find((business) => business.id === id) ?? null;
}

/**
 * §8 — Récupère la page digitale publique par slug.
 * Renvoie `null` si l'entreprise n'existe pas ou n'est pas active : la route
 * `/p/[slug]` affiche alors une 404.
 */
export async function getDigitalPageBySlug(slug: string): Promise<DigitalPage | null> {
  const business = BUSINESSES.find((item) => item.slug === slug);
  if (!business || business.status !== "ACTIVE") return null;

  const socialLinks = SOCIAL_LINKS.filter(
    (link) => link.businessId === business.id && link.enabled,
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  const content = DIGITAL_CONTENTS[business.id] ?? {
    ...EMPTY_DIGITAL_CONTENT,
    businessId: business.id,
  };

  return { business, socialLinks, content };
}

/** Liste les slugs publics (utilisé par `generateStaticParams`). */
export async function getPublicSlugs(): Promise<string[]> {
  return BUSINESSES.filter((business) => business.status === "ACTIVE").map(
    (business) => business.slug,
  );
}

/** §23 — Réseaux sociaux d'une entreprise, pour l'éditeur du back-office. */
export async function getSocialLinks(businessId: string): Promise<SocialLink[]> {
  return SOCIAL_LINKS.filter((link) => link.businessId === businessId).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

/* -------------------------------------------------------------------------- */
/* Catégories d'activité                                                       */
/* -------------------------------------------------------------------------- */

/** Un groupe de classement : une catégorie et les entreprises qui lui sont rattachées. */
export interface CategoryGroup {
  category: BusinessCategoryDef;
  businesses: Business[];
}

/**
 * Référentiel complet des catégories (`categorie.md`).
 * Passe par cette fonction plutôt que d'importer la constante : lors du branchement
 * de Supabase, le référentiel pourra devenir une table éditable.
 */
export async function getBusinessCategories(): Promise<readonly BusinessCategoryDef[]> {
  return BUSINESS_CATEGORIES;
}

/** Nombre d'entreprises par identifiant de catégorie. */
export async function getCategoryCounts(options?: {
  status?: Business["status"];
}): Promise<Record<string, number>> {
  const businesses = await getBusinesses(options);
  return businesses.reduce<Record<string, number>>((acc, business) => {
    const key = business.categoryId || "non-classee";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

/**
 * §23 — Entreprises regroupées par catégorie, dans l'ordre du référentiel.
 * Seules les catégories contenant au moins une entreprise sont retournées.
 * Les entreprises dont la catégorie est inconnue sont regroupées en fin de liste.
 */
export async function getBusinessesGroupedByCategory(options?: {
  status?: Business["status"];
}): Promise<CategoryGroup[]> {
  const businesses = await getBusinesses(options);

  const groups = BUSINESS_CATEGORIES.map((category) => ({
    category,
    businesses: businesses.filter((business) => business.categoryId === category.id),
  })).filter((group) => group.businesses.length > 0);

  // Entreprises dont la catégorie ne correspond à aucune entrée du référentiel.
  const orphans = businesses.filter((business) => !getCategoryById(business.categoryId));
  if (orphans.length > 0) {
    groups.push({
      category: {
        id: "non-classee",
        label: "Non classées",
        description: "Entreprises à rattacher à une catégorie du référentiel.",
        priority: "C",
        subcategories: [],
      },
      businesses: orphans,
    });
  }

  return groups;
}

/* -------------------------------------------------------------------------- */
/* Catalogue                                                                   */
/* -------------------------------------------------------------------------- */

/** Liste les produits actifs du catalogue Avis+. */
export async function getProducts(options?: { includeInactive?: boolean }): Promise<Product[]> {
  const list = options?.includeInactive
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.active);
  return list;
}

/** Récupère un produit par son slug (page détail publique). */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return PRODUCTS.find((product) => product.slug === slug && product.active) ?? null;
}

/** Liste les slugs produits (utilisé par `generateStaticParams`). */
export async function getProductSlugs(): Promise<string[]> {
  return PRODUCTS.filter((product) => product.active).map((product) => product.slug);
}

/** Produits mis en avant sur la page d'accueil et le catalogue. */
export async function getPopularProducts(limit = 3): Promise<Product[]> {
  const popular = PRODUCTS.filter((product) => product.active && product.popular);
  const others = PRODUCTS.filter((product) => product.active && !product.popular);
  return [...popular, ...others].slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Commandes                                                                   */
/* -------------------------------------------------------------------------- */

/** Liste les commandes, de la plus récente à la plus ancienne. */
export async function getOrders(options?: { status?: OrderStatus }): Promise<Order[]> {
  const list = options?.status
    ? ORDERS.filter((order) => order.status === options.status)
    : ORDERS;
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** Récupère une commande par identifiant ou par référence lisible. */
export async function getOrder(idOrReference: string): Promise<Order | null> {
  return (
    ORDERS.find(
      (order) => order.id === idOrReference || order.reference === idOrReference,
    ) ?? null
  );
}

/**
 * §19 — Génère la prochaine référence de commande au format `AV-2026-0001`.
 * En V1 la numérotation est locale ; avec Supabase, la séquence sera gérée côté base.
 */
export async function getNextOrderReference(): Promise<string> {
  const year = new Date().getFullYear();
  const numbers = ORDERS.map((order) => {
    const match = /^AV-\d{4}-(\d{4})$/.exec(order.reference);
    return match ? Number(match[1]) : 0;
  });
  const next = (numbers.length ? Math.max(...numbers) : 0) + 1;
  return `AV-${year}-${String(next).padStart(4, "0")}`;
}

/* -------------------------------------------------------------------------- */
/* Installations, NFC et QR                                                    */
/* -------------------------------------------------------------------------- */

/** §28 — Liste les installations, les plus récentes d'abord. */
export async function getInstallations(): Promise<Installation[]> {
  return [...INSTALLATIONS].sort((a, b) => {
    const aDate = a.scheduledAt ?? a.completedAt ?? "";
    const bDate = b.scheduledAt ?? b.completedAt ?? "";
    return bDate.localeCompare(aDate);
  });
}

/** §27 — Liste les puces NFC suivies par Avis+. */
export async function getNfcDevices(): Promise<NfcDevice[]> {
  return [...NFC_DEVICES].sort((a, b) => a.businessName.localeCompare(b.businessName, "fr"));
}

/** §26 — Liste les QR Codes émis. */
export async function getQrCodes(): Promise<QrCodeRecord[]> {
  return [...QR_CODES].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** §15 — Réalisations, publiées ou non. */
export async function getRealisations(options?: { publishedOnly?: boolean }): Promise<Realisation[]> {
  const list = options?.publishedOnly
    ? REALISATIONS.filter((item) => item.published)
    : REALISATIONS;
  return [...list].sort(
    (a, b) => new Date(b.installedAt).getTime() - new Date(a.installedAt).getTime(),
  );
}

/* -------------------------------------------------------------------------- */
/* Analytics                                                                   */
/* -------------------------------------------------------------------------- */

/** §41 — Événements d'une entreprise sur une période glissante (en jours). */
export async function getPageEvents(options?: {
  businessId?: string;
  days?: number;
}): Promise<PageEvent[]> {
  const days = options?.days ?? 30;
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  return PAGE_EVENTS.filter((event) => {
    if (options?.businessId && event.businessId !== options.businessId) return false;
    return new Date(event.createdAt).getTime() >= since;
  });
}

/** §41 — Compte les événements par type, pour les graphiques du dashboard. */
export async function getEventCounts(businessId?: string): Promise<Record<string, number>> {
  const events = await getPageEvents({ businessId });
  return events.reduce<Record<string, number>>((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] ?? 0) + 1;
    return acc;
  }, {});
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                   */
/* -------------------------------------------------------------------------- */

/** §21 — Indicateurs affichés sur `/admin/dashboard`. */
export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const endOfWeek = startOfDay + 7 * 24 * 60 * 60 * 1000;

  const counted = ORDERS.filter((order) => order.status !== "ANNULEE");

  return {
    ordersToday: ORDERS.filter(
      (order) => new Date(order.createdAt).getTime() >= startOfDay,
    ).length,
    newOrders: ORDERS.filter((order) => order.status === "NOUVELLE").length,
    inPreparation: ORDERS.filter((order) =>
      ["CONFIRMEE", "EN_PREPARATION", "CONFIGURATION"].includes(order.status),
    ).length,
    installationsThisWeek: INSTALLATIONS.filter((installation) => {
      const date = installation.scheduledAt ?? installation.completedAt;
      if (!date) return false;
      const time = new Date(date).getTime();
      return time >= startOfDay && time <= endOfWeek;
    }).length,
    upcomingInstallations: INSTALLATIONS.filter((installation) =>
      ["A_PLANIFIER", "PLANIFIEE", "EN_COURS"].includes(installation.status),
    ).length,
    activePages: BUSINESSES.filter((business) => business.status === "ACTIVE").length,
    completedOrders: ORDERS.filter((order) => order.status === "TERMINEE").length,
    revenue: counted.reduce((sum, order) => sum + order.totalAmount, 0),
    productsSold: counted.reduce(
      (sum, order) => sum + order.items.reduce((qty, item) => qty + item.quantity, 0),
      0,
    ),
  };
}

/* -------------------------------------------------------------------------- */
/* Contenus éditoriaux du site public                                          */
/* -------------------------------------------------------------------------- */

export async function getFaqItems() {
  return FAQ_ITEMS;
}

export async function getFeatureStrip() {
  return FEATURE_STRIP;
}

export async function getHowItWorksSteps() {
  return HOW_IT_WORKS_STEPS;
}

/* -------------------------------------------------------------------------- */
/* Aides au rendu                                                              */
/* -------------------------------------------------------------------------- */

/**
 * §5 — Regroupe les éléments de catalogue par catégorie pour l'affichage filtré.
 * La catégorie `all` renvoie l'intégralité des éléments.
 */
export function filterCatalogItems(items: CatalogItem[], categoryId: string): CatalogItem[] {
  if (categoryId === "all") return items;
  return items.filter((item) => item.categoryId === categoryId);
}
