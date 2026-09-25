import type { Product } from "@/lib/types";

/**
 * AVIS+ — Catalogue produits.
 *
 * ⚠️ Données de démonstration (V1). Les prix sont en FCFA et seront administrables
 * depuis `/admin/produits` une fois Supabase branché (cahier des charges §12, §30).
 */
export const PRODUCTS: Product[] = [
  {
    id: "prd_carte",
    name: "Carte Avis+",
    slug: "carte-avis-plus",
    tagline: "Le format carte de visite, toujours dans la poche.",
    description:
      "Une carte au format carte de visite avec QR Code et puce NFC. Idéale pour les commerciaux, artisans et indépendants.",
    longDescription:
      "La Carte Avis+ tient dans un portefeuille et remplace vos cartes de visite papier. Votre client scanne le QR Code ou approche son téléphone : il arrive directement sur votre page digitale, où il peut laisser un avis Google, vous écrire sur WhatsApp ou trouver votre boutique.\n\nNous imprimons votre logo, votre nom et l'adresse de votre page. Nous programmons ensuite la puce NFC avec la même adresse : le QR Code et le NFC mènent toujours au même endroit, et vous pouvez modifier vos liens plus tard sans changer de carte.",
    price: 7500,
    currency: "FCFA",
    imageUrl: "/images/carte-nfc-avis.webp",
    gallery: ["/images/carte-nfc-avis.webp", "/images/presentation-noir-nfc-qr.png"],
    type: "carte",
    features: [
      "Format carte de visite (85 × 55 mm)",
      "QR Code imprimé à votre nom",
      "Puce NFC NTAG213 programmée",
      "Impression de votre logo incluse",
      "Page digitale créée par Avis+",
      "Modifiable sans remplacer la carte",
    ],
    leadTime: "2 à 3 jours ouvrés",
    options: [
      { name: "Finition", values: ["Mate", "Brillante"] },
      { name: "Couleur", values: ["Noir", "Blanc", "Personnalisée"] },
    ],
    popular: false,
    active: true,
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-20T08:00:00.000Z",
  },
  {
    id: "prd_plaque",
    name: "Plaque Avis+",
    slug: "plaque-avis-plus",
    tagline: "Le support principal, posé sur votre comptoir.",
    description:
      "Une plaque stable à poser sur un comptoir ou à fixer au mur. Le support le plus demandé par les restaurants, salons et boutiques.",
    longDescription:
      "La Plaque Avis+ est notre support le plus complet. Elle se pose sur un comptoir, une caisse ou une réception, et attire naturellement le regard de vos clients au moment où ils règlent.\n\nElle réunit le QR Code et la puce NFC sur une seule face, avec votre logo et le message de votre choix. Nous l'installons nous-mêmes chez vous et nous testons le scan et le NFC devant vous, pour être sûrs que tout fonctionne avant de partir.",
    price: 25000,
    currency: "FCFA",
    imageUrl: "/images/presentation-noir-nfc-qr.png",
    gallery: [
      "/images/presentation-noir-nfc-qr.png",
      "/images/support-noir.webp",
      "/images/support-details-techniques.png",
    ],
    type: "plaque",
    features: [
      "Format A5, support stable",
      "QR Code + puce NFC",
      "Personnalisation complète (logo, couleurs)",
      "Base bois naturel ou support noir",
      "Installation et test sur place inclus",
      "Nettoyage facile, résistant à l'usage quotidien",
    ],
    leadTime: "3 à 5 jours ouvrés",
    options: [
      { name: "Base", values: ["Bois naturel", "Noir mat", "Blanc"] },
      { name: "Orientation", values: ["Verticale", "Murale"] },
    ],
    popular: true,
    active: true,
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-22T08:00:00.000Z",
  },
  {
    id: "prd_sticker",
    name: "Sticker Avis+",
    slug: "sticker-avis-plus",
    tagline: "Autocollant, pour les vitrines et les emballages.",
    description:
      "Version autocollante et discrète. À coller sur une vitrine, une caisse, un menu, un emballage ou un véhicule.",
    longDescription:
      "Le Sticker Avis+ se colle là où vos clients passent : vitrine, caisse, menu, carton d'emballage ou véhicule de livraison. Il fonctionne exactement comme la plaque — QR Code et NFC — mais sans occuper d'espace.\n\nNous fournissons plusieurs formats dans un même lot pour que vous puissiez équiper plusieurs emplacements de votre commerce.",
    price: 5000,
    currency: "FCFA",
    imageUrl: "/images/supports-personnalises.webp",
    gallery: ["/images/supports-personnalises.webp", "/images/presentation-bois-nfc-qr.png"],
    type: "sticker",
    features: [
      "Autocollant résistant, usage intérieur et extérieur",
      "QR Code + puce NFC intégrée",
      "Plusieurs formats par lot",
      "Idéal vitrine, caisse et emballage",
      "Personnalisable à vos couleurs",
    ],
    leadTime: "1 à 2 jours ouvrés",
    options: [
      { name: "Format", values: ["Rond 50 mm", "Carré 60 mm", "Rectangulaire 80 × 50 mm"] },
    ],
    popular: false,
    active: true,
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-20T08:00:00.000Z",
  },
  {
    id: "prd_pack",
    name: "Pack Commerce",
    slug: "pack-commerce",
    tagline: "Tout équiper d'un coup, installation comprise.",
    description:
      "1 plaque, 2 cartes, 1 sticker, la personnalisation, la configuration NFC et l'installation. Le pack le plus complet.",
    longDescription:
      "Le Pack Commerce est pensé pour un commerce qui veut tout mettre en place en une seule fois. Vous recevez une plaque pour le comptoir, deux cartes pour vos commerciaux et un sticker pour votre vitrine.\n\nNous nous occupons de tout : création de votre page digitale, personnalisation de vos supports, programmation des puces NFC, tests et installation chez vous. Vous n'avez rien à préparer.",
    price: 45000,
    currency: "FCFA",
    imageUrl: "/images/presentation-bois-nfc-qr.png",
    gallery: [
      "/images/presentation-bois-nfc-qr.png",
      "/images/presentation-noir-nfc-qr.png",
      "/images/telephone-scan.png",
    ],
    type: "pack",
    features: [
      "1 plaque A5 + 2 cartes + 1 sticker",
      "Personnalisation complète incluse",
      "Création de votre page digitale",
      "Configuration QR Code et NFC",
      "Installation et test sur place",
      "Économie de 12 500 FCFA par rapport à l'achat séparé",
    ],
    leadTime: "3 à 5 jours ouvrés",
    options: [
      { name: "Base de plaque", values: ["Bois naturel", "Noir mat"] },
      { name: "Couleur de carte", values: ["Noir", "Blanc"] },
    ],
    popular: true,
    active: true,
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-24T08:00:00.000Z",
  },
];

/** §5 — Catégories de filtrage du catalogue public. */
export const PRODUCT_FILTERS = [
  { value: "all", label: "Tous les produits" },
  { value: "carte", label: "Cartes" },
  { value: "plaque", label: "Plaques" },
  { value: "sticker", label: "Stickers" },
  { value: "pack", label: "Packs" },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
