import type {
  Business,
  DigitalPageContent,
  SocialLink,
  Testimonial,
  CatalogItem,
  MenuCategory,
} from "@/lib/types";

/**
 * AVIS+ — Entreprises et contenus de pages digitales.
 *
 * ⚠️ Données de démonstration (V1).
 * - `le-terroir`, `belle-et-moi` et `le-coin-mode` sont les trois exemples demandés
 *   par le prompt « page digitales premium » (§20).
 * - `le-delice`, `garage-wend-kuni` et `hotel-bangr-weoogo` alimentent le back-office.
 * - Les avis affichés sont fictifs et servent uniquement à la démonstration :
 *   en production, seuls de vrais avis fournis par le commerçant ou issus d'une source
 *   autorisée doivent être affichés (cahier des charges §10, prompt §7).
 */

/* -------------------------------------------------------------------------- */
/* Entreprises                                                                 */
/* -------------------------------------------------------------------------- */

export const BUSINESSES: Business[] = [
  {
    id: "biz_terroir",
    name: "Le Terroir",
    slug: "le-terroir",
    logoUrl: null,
    coverUrl: "/images/demo/cover-terroir.jpg",
    tagline: "Une cuisine authentique au goût du terroir.",
    description:
      "Cuisine burkinabè, grillades au feu de bois et jus naturels préparés chaque matin. Nous recevons sur place, en terrasse et à emporter.",
    category: "Restauration › Grillades",
    categoryId: "restauration",
    subcategory: "Grillades",
    phone: "+226 25 36 41 20",
    whatsapp: "+226 70 41 22 08",
    email: "contact@leterroir.bf",
    address: "Avenue Charles de Gaulle, Zone du Bois",
    city: "Ouagadougou",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJdemo_le_terroir_ouaga",
    googleMapsUrl: "https://maps.google.com/?q=Le+Terroir+Ouagadougou",
    websiteUrl: "https://leterroir.bf",
    openingHours: "Tous les jours · 11h00 – 23h00",
    verified: true,
    allowIndexing: true,
    rating: 4.6,
    reviewCount: 248,
    template: "restaurant",
    status: "ACTIVE",
    createdAt: "2026-06-12T09:00:00.000Z",
    updatedAt: "2026-09-22T10:30:00.000Z",
  },
  {
    id: "biz_belle",
    name: "Belle & Moi",
    slug: "belle-et-moi",
    logoUrl: null,
    coverUrl: "/images/demo/cover-belle-et-moi.jpg",
    tagline: "Votre beauté, notre métier.",
    description:
      "Salon de coiffure et institut de beauté : tresses, tissages, soins du visage et onglerie, sur rendez-vous.",
    category: "Beauté et soins esthétiques › Instituts de beauté",
    categoryId: "beaute",
    subcategory: "Instituts de beauté",
    phone: "+226 25 43 18 77",
    whatsapp: "+226 76 55 90 14",
    email: null,
    address: "Rue 12.34, Koulouba",
    city: "Ouagadougou",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_belle_et_moi",
    googleMapsUrl: "https://maps.google.com/?q=Belle+et+Moi+Ouagadougou",
    websiteUrl: null,
    openingHours: "Mardi – Dimanche · 9h00 – 19h00",
    verified: true,
    allowIndexing: true,
    rating: 4.8,
    reviewCount: 132,
    template: "beaute",
    status: "ACTIVE",
    createdAt: "2026-07-03T09:00:00.000Z",
    updatedAt: "2026-09-19T15:10:00.000Z",
  },
  {
    id: "biz_coinmode",
    name: "Le Coin Mode",
    slug: "le-coin-mode",
    logoUrl: null,
    coverUrl: "/images/demo/cover-le-coin-mode.jpg",
    tagline: "La mode africaine, au juste prix.",
    description:
      "Vêtements en wax et bazin, accessoires en cuir et raphia. Collections homme, femme et enfant renouvelées chaque saison.",
    category: "Mode et habillement › Boutiques de vêtements",
    categoryId: "mode-habillement",
    subcategory: "Boutiques de vêtements",
    phone: "+226 25 30 62 45",
    whatsapp: "+226 74 20 36 91",
    email: null,
    address: "Marché de Gounghin, allée centrale",
    city: "Ouagadougou",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_le_coin_mode",
    googleMapsUrl: "https://maps.google.com/?q=Le+Coin+Mode+Ouagadougou",
    websiteUrl: null,
    openingHours: "Lundi – Samedi · 8h30 – 19h30",
    verified: false,
    allowIndexing: true,
    rating: 4.5,
    reviewCount: 96,
    template: "boutique",
    status: "ACTIVE",
    createdAt: "2026-07-21T09:00:00.000Z",
    updatedAt: "2026-09-18T11:45:00.000Z",
  },
  {
    id: "biz_delice",
    name: "Le Délice",
    slug: "le-delice",
    logoUrl: null,
    coverUrl: "/images/demo/cover-le-delice.jpg",
    tagline: "Votre avis nous compte !",
    description:
      "Restaurant & grill familial : brochettes, poulet bicyclette et poisson braisé, à deux pas du rond-point des Nations Unies.",
    category: "Restauration › Restaurants",
    categoryId: "restauration",
    subcategory: "Restaurants",
    phone: "+226 25 31 07 52",
    whatsapp: "+226 78 12 44 60",
    email: null,
    address: "Rond-point des Nations Unies",
    city: "Ouagadougou",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_le_delice",
    googleMapsUrl: "https://maps.google.com/?q=Le+Delice+Ouagadougou",
    websiteUrl: null,
    openingHours: "Tous les jours · 10h00 – 23h30",
    verified: true,
    allowIndexing: true,
    rating: 4.4,
    reviewCount: 187,
    template: "restaurant",
    status: "ACTIVE",
    createdAt: "2026-05-08T09:00:00.000Z",
    updatedAt: "2026-09-15T08:20:00.000Z",
  },
  {
    id: "biz_wendkuni",
    name: "Garage Wend-Kuni",
    slug: "garage-wend-kuni",
    logoUrl: null,
    coverUrl: "/images/demo/cover-garage-wend-kuni.jpg",
    tagline: "Votre véhicule entre de bonnes mains.",
    description:
      "Mécanique générale, diagnostic électronique, vidange et climatisation. Devis gratuit, travail soigné.",
    category: "Automobile et mobilité › Garages",
    categoryId: "automobile",
    subcategory: "Garages",
    phone: "+226 25 35 88 12",
    whatsapp: "+226 71 09 33 27",
    email: null,
    address: "Route de Bobo, secteur 22",
    city: "Ouagadougou",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_wend_kuni",
    googleMapsUrl: "https://maps.google.com/?q=Garage+Wend+Kuni+Ouagadougou",
    websiteUrl: null,
    openingHours: "Lundi – Samedi · 7h30 – 18h00",
    verified: false,
    allowIndexing: false,
    rating: 4.3,
    reviewCount: 54,
    template: "professionnel",
    status: "ACTIVE",
    createdAt: "2026-08-02T09:00:00.000Z",
    updatedAt: "2026-09-11T16:00:00.000Z",
  },
  {
    id: "biz_hotel",
    name: "Hôtel Bangr-Weoogo",
    slug: "hotel-bangr-weoogo",
    logoUrl: null,
    coverUrl: "/images/demo/cover-hotel-bangr-weoogo.jpg",
    tagline: "Le calme au cœur de la ville.",
    description:
      "Chambres climatisées, salle de conférence, restaurant et piscine. Réservation directe par WhatsApp.",
    category: "Hôtellerie › Hôtels",
    categoryId: "hotellerie",
    subcategory: "Hôtels",
    phone: "+226 25 36 90 00",
    whatsapp: "+226 70 88 41 12",
    email: "resa@bangrweoogo.bf",
    address: "Boulevard de l'Université",
    city: "Ouagadougou",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_bangr_weoogo",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Bangr+Weoogo+Ouagadougou",
    websiteUrl: "https://bangrweoogo.bf",
    openingHours: "Réception ouverte 24h/24",
    verified: true,
    allowIndexing: true,
    rating: 4.5,
    reviewCount: 210,
    template: "hotel",
    status: "BROUILLON",
    createdAt: "2026-08-28T09:00:00.000Z",
    updatedAt: "2026-09-24T09:15:00.000Z",
  },
];

/* -------------------------------------------------------------------------- */
/* Réseaux sociaux                                                             */
/* -------------------------------------------------------------------------- */

export const SOCIAL_LINKS: SocialLink[] = [
  // Le Terroir
  { id: "soc_1", businessId: "biz_terroir", platform: "facebook", label: "Facebook", url: "https://facebook.com/leterroirbf", enabled: true, sortOrder: 1 },
  { id: "soc_2", businessId: "biz_terroir", platform: "instagram", label: "Instagram", url: "https://instagram.com/leterroirbf", enabled: true, sortOrder: 2 },
  { id: "soc_3", businessId: "biz_terroir", platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@leterroirbf", enabled: true, sortOrder: 3 },
  { id: "soc_4", businessId: "biz_terroir", platform: "site", label: "Notre site web", url: "https://leterroir.bf", enabled: true, sortOrder: 4 },

  // Belle & Moi
  { id: "soc_5", businessId: "biz_belle", platform: "facebook", label: "Facebook", url: "https://facebook.com/belleetmoi", enabled: true, sortOrder: 1 },
  { id: "soc_6", businessId: "biz_belle", platform: "instagram", label: "Instagram", url: "https://instagram.com/belleetmoi.bf", enabled: true, sortOrder: 2 },
  { id: "soc_7", businessId: "biz_belle", platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@belleetmoi", enabled: true, sortOrder: 3 },

  // Le Coin Mode
  { id: "soc_8", businessId: "biz_coinmode", platform: "facebook", label: "Facebook", url: "https://facebook.com/lecoinmode", enabled: true, sortOrder: 1 },
  { id: "soc_9", businessId: "biz_coinmode", platform: "instagram", label: "Instagram", url: "https://instagram.com/lecoinmode", enabled: true, sortOrder: 2 },
  { id: "soc_10", businessId: "biz_coinmode", platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@lecoinmode", enabled: true, sortOrder: 3 },

  // Le Délice
  { id: "soc_11", businessId: "biz_delice", platform: "facebook", label: "Facebook", url: "https://facebook.com/ledelicebf", enabled: true, sortOrder: 1 },
  { id: "soc_12", businessId: "biz_delice", platform: "instagram", label: "Instagram", url: "https://instagram.com/ledelicebf", enabled: true, sortOrder: 2 },
  { id: "soc_13", businessId: "biz_delice", platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@ledelicebf", enabled: true, sortOrder: 3 },

  // Garage Wend-Kuni
  { id: "soc_14", businessId: "biz_wendkuni", platform: "facebook", label: "Facebook", url: "https://facebook.com/garagewendkuni", enabled: true, sortOrder: 1 },

  // Hôtel Bangr-Weoogo
  { id: "soc_15", businessId: "biz_hotel", platform: "facebook", label: "Facebook", url: "https://facebook.com/bangrweoogo", enabled: true, sortOrder: 1 },
  { id: "soc_16", businessId: "biz_hotel", platform: "instagram", label: "Instagram", url: "https://instagram.com/bangrweoogo", enabled: true, sortOrder: 2 },
];

/* -------------------------------------------------------------------------- */
/* Contenus de pages digitales                                                 */
/* -------------------------------------------------------------------------- */

function content(partial: DigitalPageContent): DigitalPageContent {
  return partial;
}

const CATEGORY_LABELS = {
  all: { id: "all", label: "Tous" },
};

export const DIGITAL_CONTENTS: Record<string, DigitalPageContent> = {
  /* ------------------------------- Restaurant ------------------------------ */
  biz_terroir: content({
    businessId: "biz_terroir",
    catalogTitle: "Notre menu",
    catalogSubtitle: "Préparé chaque jour avec des produits frais du marché.",
    categories: [
      CATEGORY_LABELS.all,
      { id: "entrees", label: "Entrées" },
      { id: "plats", label: "Plats" },
      { id: "grillades", label: "Grillades" },
      { id: "desserts", label: "Desserts" },
      { id: "boissons", label: "Boissons" },
    ],
    items: [
      { id: "it_1", categoryId: "entrees", name: "Salade de gombo frais", description: "Gombo, tomate, oignon, vinaigrette maison.", price: 2500, imageUrl: "/images/demo/plat-salade-gombo.jpg", popular: false, badge: null },
      { id: "it_2", categoryId: "entrees", name: "Beignets de haricots", description: "Benga croustillant, sauce piment doux.", price: 1000, imageUrl: null, popular: false, badge: null },
      { id: "it_3", categoryId: "plats", name: "Riz gras", description: "Riz mijoté à la tomate, viande de bœuf, légumes.", price: 3000, imageUrl: "/images/demo/plat-riz-gras.jpg", popular: true, badge: "Populaire" },
      { id: "it_4", categoryId: "plats", name: "Tô sauce gombo", description: "Tô de maïs, sauce gombo et viande fumée.", price: 2500, imageUrl: null, popular: false, badge: null },
      { id: "it_5", categoryId: "grillades", name: "Brochette de bœuf", description: "Viande grillée au feu de bois, accompagnement au choix.", price: 6000, imageUrl: "/images/demo/plat-brochettes.jpg", popular: true, badge: "Populaire" },
      { id: "it_6", categoryId: "grillades", name: "Poulet bicyclette grillé", description: "Poulet fermier entier, épices maison, attiéké ou frites.", price: 7500, imageUrl: "/images/demo/plat-poulet-grille.jpg", popular: true, badge: null },
      { id: "it_7", categoryId: "grillades", name: "Capitaine braisé", description: "Poisson entier braisé, sauce yassa, riz parfumé.", price: 8000, imageUrl: "/images/demo/plat-capitaine.jpg", popular: false, badge: null },
      { id: "it_8", categoryId: "desserts", name: "Salade de fruits frais", description: "Mangue, papaye, ananas et banane de saison.", price: 1500, imageUrl: null, popular: false, badge: null },
      { id: "it_9", categoryId: "boissons", name: "Bissap maison", description: "Infusion d'hibiscus, menthe fraîche, peu sucrée.", price: 1000, imageUrl: "/images/demo/boisson-bissap.jpg", popular: true, badge: null },
      { id: "it_10", categoryId: "boissons", name: "Jus de gingembre", description: "Gingembre frais pressé, citron, servi bien frais.", price: 1000, imageUrl: null, popular: false, badge: null },
    ],
    testimonials: [
      { id: "tst_1", author: "Client Google", rating: 5, text: "Le service est rapide et la cuisine délicieuse. Les brochettes sont excellentes, je recommande vivement !", source: "Google" },
      { id: "tst_2", author: "Client Google", rating: 5, text: "Cadre agréable et personnel très accueillant. Le bissap maison vaut le détour.", source: "Google" },
    ],
    cta: {
      title: "Envie de découvrir notre menu ?",
      description: "Passez nous voir ou commandez directement sur WhatsApp.",
      label: "Nous contacter sur WhatsApp",
      href: "https://wa.me/22670412208",
    },
    theme: { primaryColor: "#FFB82E", accentColor: "#C98200", backgroundColor: "#FFFFFF" },
  }),

  /* --------------------------------- Beauté -------------------------------- */
  biz_belle: content({
    businessId: "biz_belle",
    catalogTitle: "Nos prestations",
    catalogSubtitle: "Sur rendez-vous, du mardi au dimanche.",
    categories: [
      CATEGORY_LABELS.all,
      { id: "coiffure", label: "Coiffure" },
      { id: "tresses", label: "Tresses" },
      { id: "soins", label: "Soins" },
      { id: "onglerie", label: "Onglerie" },
    ],
    items: [
      { id: "it_20", categoryId: "coiffure", name: "Coupe + brushing", description: "Shampoing, coupe personnalisée et brushing.", price: 10000, imageUrl: null, popular: false, badge: null },
      { id: "it_21", categoryId: "coiffure", name: "Tissage complet", description: "Pose de tissage, mèches naturelles incluses.", price: 25000, imageUrl: null, popular: true, badge: "Populaire" },
      { id: "it_22", categoryId: "tresses", name: "Tresses collées", description: "Nattes collées au fil, finition soignée.", price: 15000, imageUrl: "/images/demo/salon-tresses.jpg", popular: true, badge: null },
      { id: "it_23", categoryId: "tresses", name: "Nattes rondes", description: "Nattes rondes classiques, tenue longue durée.", price: 20000, imageUrl: null, popular: false, badge: null },
      { id: "it_24", categoryId: "soins", name: "Soin hydratant profond", description: "Masque capillaire, vapeur et massage du crâne.", price: 12000, imageUrl: null, popular: false, badge: null },
      { id: "it_25", categoryId: "soins", name: "Soin visage éclat", description: "Nettoyage, gommage doux et masque hydratant.", price: 15000, imageUrl: "/images/demo/salon-soin-visage.jpg", popular: true, badge: null },
      { id: "it_26", categoryId: "onglerie", name: "Manucure simple", description: "Mise en forme, cuticules et soin des mains.", price: 5000, imageUrl: null, popular: false, badge: null },
      { id: "it_27", categoryId: "onglerie", name: "Vernis semi-permanent", description: "Pose longue tenue, large choix de teintes.", price: 8000, imageUrl: null, popular: false, badge: null },
    ],
    testimonials: [
      { id: "tst_10", author: "Client Google", rating: 5, text: "Mes tresses ont tenu plus de six semaines. Travail propre et salon très accueillant.", source: "Google" },
      { id: "tst_11", author: "Client Google", rating: 5, text: "Le soin visage est un vrai moment de détente. Je repars avec la peau lumineuse.", source: "Google" },
    ],
    cta: {
      title: "Besoin d'un rendez-vous ?",
      description: "Écrivez-nous sur WhatsApp, nous confirmons votre créneau rapidement.",
      label: "Prendre rendez-vous",
      href: "https://wa.me/22676559014",
    },
    theme: { primaryColor: "#FFB82E", accentColor: "#C98200", backgroundColor: "#FFFFFF" },
  }),

  /* -------------------------------- Boutique ------------------------------- */
  biz_coinmode: content({
    businessId: "biz_coinmode",
    catalogTitle: "Nos collections",
    catalogSubtitle: "Nouvelles pièces chaque saison.",
    categories: [
      CATEGORY_LABELS.all,
      { id: "homme", label: "Homme" },
      { id: "femme", label: "Femme" },
      { id: "enfant", label: "Enfant" },
      { id: "accessoires", label: "Accessoires" },
    ],
    items: [
      { id: "it_40", categoryId: "homme", name: "Chemise wax homme", description: "Coupe droite, coton wax imprimé, du S au XXL.", price: 12000, imageUrl: "/images/demo/mode-wax-homme.jpg", popular: true, badge: "Populaire" },
      { id: "it_41", categoryId: "homme", name: "Pantalon chino", description: "Chino coton, ceinture élastique, plusieurs coloris.", price: 14000, imageUrl: null, popular: false, badge: null },
      { id: "it_42", categoryId: "femme", name: "Ensemble bazin femme", description: "Ensemble deux pièces en bazin riche brodé.", price: 25000, imageUrl: "/images/demo/mode-bazin-femme.jpg", popular: true, badge: "Populaire" },
      { id: "it_43", categoryId: "femme", name: "Robe pagne", description: "Robe longue en pagne, coupe ajustée, sur mesure possible.", price: 18000, imageUrl: null, popular: false, badge: null },
      { id: "it_44", categoryId: "enfant", name: "T-shirt coton enfant", description: "Coton doux, imprimé wax, 2 à 12 ans.", price: 5000, imageUrl: null, popular: false, badge: null },
      { id: "it_45", categoryId: "enfant", name: "Ensemble enfant wax", description: "Ensemble chemise et short assortis.", price: 9000, imageUrl: null, popular: false, badge: null },
      { id: "it_46", categoryId: "accessoires", name: "Sac à main raphia", description: "Tressé main, doublure coton, anses cuir.", price: 15000, imageUrl: "/images/demo/mode-sac-raphia.jpg", popular: true, badge: null },
      { id: "it_47", categoryId: "accessoires", name: "Sandales en cuir", description: "Cuir tanné localement, semelle renforcée.", price: 10000, imageUrl: null, popular: false, badge: null },
    ],
    testimonials: [
      { id: "tst_20", author: "Client Google", rating: 5, text: "De beaux tissus et des prix corrects. Le vendeur prend le temps de conseiller.", source: "Google" },
      { id: "tst_21", author: "Client Google", rating: 4, text: "Bon choix en bazin. J'ai fait faire une robe sur mesure, résultat impeccable.", source: "Google" },
    ],
    cta: {
      title: "Découvrez nos collections",
      description: "Passez en boutique ou demandez le catalogue à jour sur WhatsApp.",
      label: "Voir le catalogue sur WhatsApp",
      href: "https://wa.me/22674203691",
    },
    theme: { primaryColor: "#FFB82E", accentColor: "#C98200", backgroundColor: "#FFFFFF" },
  }),

  /* -------------------------------- Le Délice ------------------------------ */
  biz_delice: content({
    businessId: "biz_delice",
    catalogTitle: "Notre menu",
    catalogSubtitle: null,
    categories: [
      CATEGORY_LABELS.all,
      { id: "plats", label: "Plats" },
      { id: "grillades", label: "Grillades" },
      { id: "boissons", label: "Boissons" },
    ],
    items: [
      { id: "it_60", categoryId: "plats", name: "Riz gras", description: "Riz mijoté, viande de bœuf et légumes.", price: 3000, imageUrl: "/images/demo/plat-riz-gras.jpg", popular: true, badge: null },
      { id: "it_61", categoryId: "grillades", name: "Brochette de bœuf", description: "Grillée au feu de bois, accompagnement au choix.", price: 6000, imageUrl: "/images/demo/plat-brochettes.jpg", popular: true, badge: "Populaire" },
      { id: "it_62", categoryId: "boissons", name: "Bissap maison", description: "Hibiscus frais, peu sucré.", price: 1000, imageUrl: "/images/demo/boisson-bissap.jpg", popular: false, badge: null },
    ],
    testimonials: [
      { id: "tst_30", author: "Client Google", rating: 5, text: "Accueil chaleureux, plats généreux. Une valeur sûre dans le quartier.", source: "Google" },
    ],
    cta: {
      title: "Une table à réserver ?",
      description: "Appelez-nous ou écrivez-nous sur WhatsApp.",
      label: "Réserver sur WhatsApp",
      href: "https://wa.me/22678124460",
    },
    theme: { primaryColor: "#FFB82E", accentColor: "#C98200", backgroundColor: "#FFFFFF" },
  }),

  /* ------------------------------ Garage Wend-Kuni ------------------------- */
  biz_wendkuni: content({
    businessId: "biz_wendkuni",
    catalogTitle: "Nos prestations",
    catalogSubtitle: "Devis gratuit avant toute intervention.",
    categories: [
      CATEGORY_LABELS.all,
      { id: "mecanique", label: "Mécanique" },
      { id: "entretien", label: "Entretien" },
      { id: "diagnostic", label: "Diagnostic" },
    ],
    items: [
      { id: "it_80", categoryId: "mecanique", name: "Réparation moteur", description: "Diagnostic puis réparation, pièces d'origine.", price: 35000, imageUrl: null, popular: false, badge: null },
      { id: "it_81", categoryId: "entretien", name: "Vidange complète", description: "Huile, filtres à huile et à air, contrôle des niveaux.", price: 15000, imageUrl: null, popular: true, badge: "Populaire" },
      { id: "it_82", categoryId: "entretien", name: "Recharge climatisation", description: "Contrôle d'étanchéité et recharge de gaz.", price: 20000, imageUrl: null, popular: false, badge: null },
      { id: "it_83", categoryId: "diagnostic", name: "Diagnostic électronique", description: "Lecture des codes défaut et rapport détaillé.", price: 7500, imageUrl: null, popular: false, badge: null },
    ],
    testimonials: [],
    cta: {
      title: "Besoin d'un devis ?",
      description: "Envoyez-nous la photo de votre véhicule ou décrivez la panne.",
      label: "Demander un devis",
      href: "https://wa.me/22671093327",
    },
    theme: { primaryColor: "#FFB82E", accentColor: "#C98200", backgroundColor: "#FFFFFF" },
  }),

  /* ---------------------------- Hôtel Bangr-Weoogo ------------------------- */
  biz_hotel: content({
    businessId: "biz_hotel",
    catalogTitle: "Nos chambres",
    catalogSubtitle: "Tarifs par nuit, petit-déjeuner inclus.",
    categories: [
      CATEGORY_LABELS.all,
      { id: "chambres", label: "Chambres" },
      { id: "services", label: "Services" },
    ],
    items: [
      { id: "it_90", categoryId: "chambres", name: "Chambre standard", description: "Lit double, climatisation, salle de bain privée.", price: 25000, imageUrl: null, popular: false, badge: null },
      { id: "it_91", categoryId: "chambres", name: "Chambre supérieure", description: "Vue jardin, coin salon, minibar.", price: 40000, imageUrl: null, popular: true, badge: "Populaire" },
      { id: "it_92", categoryId: "services", name: "Salle de conférence", description: "Jusqu'à 80 places, équipement audiovisuel.", price: 150000, imageUrl: null, popular: false, badge: null },
    ],
    testimonials: [],
    cta: {
      title: "Réservez votre séjour",
      description: "Réponse immédiate sur WhatsApp, du lundi au dimanche.",
      label: "Réserver maintenant",
      href: "https://wa.me/22670884112",
    },
    theme: { primaryColor: "#FFB82E", accentColor: "#C98200", backgroundColor: "#FFFFFF" },
  }),
};

/** Valeurs de repli pour une entreprise sans contenu éditorial configuré. */
export const EMPTY_DIGITAL_CONTENT: DigitalPageContent = {
  businessId: "",
  catalogTitle: "Nos produits & services",
  catalogSubtitle: null,
  categories: [CATEGORY_LABELS.all],
  items: [],
  testimonials: [],
  cta: null,
  theme: { primaryColor: "#FFB82E", accentColor: "#C98200", backgroundColor: "#FFFFFF" },
};

/** Extrait les avis d'un contenu pour un usage typé. */
export function contentTestimonials(items: Testimonial[]): Testimonial[] {
  return items;
}

/** Extrait les éléments de catalogue d'un contenu pour un usage typé. */
export function contentItems(items: CatalogItem[]): CatalogItem[] {
  return items;
}

/** Extrait les catégories d'un contenu pour un usage typé. */
export function contentCategories(items: MenuCategory[]): MenuCategory[] {
  return items;
}
