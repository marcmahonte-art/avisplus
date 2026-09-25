/**
 * AVIS+ — Configuration globale du site.
 *
 * ⚠️ Les coordonnées ci-dessous sont des valeurs de lancement à remplacer par les
 * coordonnées réelles d'Avis+. Elles peuvent être surchargées sans toucher au code via
 * les variables d'environnement NEXT_PUBLIC_* (voir `.env.example`).
 */

const FALLBACK_PHONE = "+226 70 00 00 00";

/** Numéro WhatsApp au format international, sans espace ni « + » — requis par wa.me. */
const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? FALLBACK_PHONE;
export const WHATSAPP_NUMBER = rawWhatsapp.replace(/[^\d]/g, "");

export const SITE = {
  name: "Avis+",
  /** §49 — Message marketing principal. */
  tagline: "Votre entreprise, un seul scan.",
  description:
    "Avis+ installe votre plaque, votre carte ou votre sticker NFC + QR Code. Un seul scan et vos clients accèdent à votre page digitale : avis Google, réseaux sociaux, WhatsApp, itinéraire et site web.",
  /** §40 — Domaine public utilisé pour les QR codes et les puces NFC. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://avisplus.bf",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contact@avisplus.bf",
  phone: process.env.NEXT_PUBLIC_PHONE ?? FALLBACK_PHONE,
  whatsapp: WHATSAPP_NUMBER,
  city: "Ouagadougou",
  country: "Burkina Faso",
  /** §17 — Zone d'intervention. */
  serviceArea: "Ouagadougou et environs — extension nationale en cours",
  hours: "Lundi – Samedi · 8h00 – 19h00",
  address: "Ouagadougou, Burkina Faso",
} as const;

/** §11 — Navigation principale du site public. */
export const MAIN_NAV = [
  { label: "Accueil", href: "/" },
  { label: "Nos produits", href: "/produits" },
  { label: "Comment ça marche ?", href: "/comment-ca-marche" },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Exemples", href: "/exemples" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** §11 — Navigation secondaire du footer. */
export const FOOTER_NAV = [
  {
    title: "Produits",
    links: [
      { label: "Carte Avis+", href: "/produits/carte-avis-plus" },
      { label: "Plaque Avis+", href: "/produits/plaque-avis-plus" },
      { label: "Sticker Avis+", href: "/produits/sticker-avis-plus" },
      { label: "Pack Commerce", href: "/produits/pack-commerce" },
    ],
  },
  {
    title: "Avis+",
    links: [
      { label: "Comment ça marche ?", href: "/comment-ca-marche" },
      { label: "Nos réalisations", href: "/realisations" },
      { label: "Exemples de pages", href: "/exemples" },
      { label: "Questions fréquentes", href: "/faq" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
  {
    title: "Commander",
    links: [
      { label: "Commander un support", href: "/commander" },
      { label: "Voir les produits", href: "/produits" },
      { label: "Exemple de page", href: "/p/le-terroir" },
      { label: "Espace Avis+", href: "/admin/login" },
    ],
  },
] as const;

/**
 * §37 — Construit un lien WhatsApp avec message prérempli.
 * @param message Message prérempli (encodé automatiquement).
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** §37 — Message prérempli pour une demande de commande. */
export function orderWhatsappLink(productName?: string, quantity?: number): string {
  const lines = [
    "Bonjour Avis+, je souhaite commander",
    productName ? `le produit : ${productName}.` : "un support Avis+.",
    "",
    "Nom de mon entreprise :",
    "Ville :",
    `Quantité : ${quantity ?? ""}`,
  ];
  return whatsappLink(lines.join("\n"));
}

/** §37 — Message prérempli pour une demande générique. */
export function contactWhatsappLink(subject = "votre offre Avis+"): string {
  return whatsappLink(
    `Bonjour Avis+, je vous contacte au sujet de ${subject}. Pouvez-vous m'en dire plus ?`,
  );
}
