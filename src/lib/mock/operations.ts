import type {
  Installation,
  NfcDevice,
  Order,
  PageEvent,
  QrCodeRecord,
  Realisation,
} from "@/lib/types";

/**
 * AVIS+ — Données d'exploitation (commandes, installations, NFC, QR, réalisations).
 *
 * ⚠️ Données de démonstration (V1) alimentant le back-office `/admin`.
 * Elles seront remplacées par les requêtes Supabase (cahier des charges §30).
 */

/* -------------------------------------------------------------------------- */
/* Commandes                                                                   */
/* -------------------------------------------------------------------------- */

export const ORDERS: Order[] = [
  {
    id: "ord_0008",
    reference: "AV-2026-0008",
    businessId: null,
    businessName: "Pharmacie du Progrès",
    customerName: "Adama Sawadogo",
    customerPhone: "+226 70 12 34 56",
    customerWhatsapp: "+226 70 12 34 56",
    customerEmail: null,
    city: "Ouagadougou",
    district: "Tanghin",
    address: "Avenue de la Résistance, face au marché",
    status: "NOUVELLE",
    paymentStatus: "PENDING",
    totalAmount: 25000,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: "https://search.google.com/local/writereview?placeid=demo_pharmacie",
      facebook: "https://facebook.com/pharmacieduprogres",
      instagram: null,
      tiktok: null,
      whatsapp: "+226 70 12 34 56",
      googleMapsUrl: "https://maps.google.com/?q=Pharmacie+du+Progres+Ouagadougou",
      websiteUrl: null,
      otherLinks: null,
    },
    installationMode: "OUAGADOUGOU",
    notes: "Souhaite une plaque noire mate.",
    items: [
      { id: "oi_1", orderId: "ord_0008", productId: "prd_plaque", productName: "Plaque Avis+", quantity: 1, unitPrice: 25000, options: { Base: "Noir mat", Orientation: "Verticale" } },
    ],
    timeline: [{ status: "NOUVELLE", at: "2026-09-25T07:40:00.000Z", note: "Commande reçue depuis le site." }],
    createdAt: "2026-09-25T07:40:00.000Z",
    updatedAt: "2026-09-25T07:40:00.000Z",
  },
  {
    id: "ord_0007",
    reference: "AV-2026-0007",
    businessId: null,
    businessName: "Boulangerie Wend-Panga",
    customerName: "Salimata Ouédraogo",
    customerPhone: "+226 76 44 21 09",
    customerWhatsapp: "+226 76 44 21 09",
    customerEmail: "wendpanga@gmail.com",
    city: "Ouagadougou",
    district: "Dassasgho",
    address: "Rue 14.28, à côté de la station",
    status: "A_CONTACTER",
    paymentStatus: "PENDING",
    totalAmount: 45000,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: "https://search.google.com/local/writereview?placeid=demo_wend_panga",
      facebook: "https://facebook.com/boulangeriewendpanga",
      instagram: "https://instagram.com/wendpanga",
      tiktok: null,
      whatsapp: "+226 76 44 21 09",
      googleMapsUrl: null,
      websiteUrl: null,
      otherLinks: null,
    },
    installationMode: "OUAGADOUGOU",
    notes: null,
    items: [
      { id: "oi_2", orderId: "ord_0007", productId: "prd_pack", productName: "Pack Commerce", quantity: 1, unitPrice: 45000, options: { "Base de plaque": "Bois naturel", "Couleur de carte": "Noir" } },
    ],
    timeline: [
      { status: "NOUVELLE", at: "2026-09-24T09:10:00.000Z" },
      { status: "A_CONTACTER", at: "2026-09-24T11:25:00.000Z", note: "Appel manqué, relance WhatsApp envoyée." },
    ],
    createdAt: "2026-09-24T09:10:00.000Z",
    updatedAt: "2026-09-24T11:25:00.000Z",
  },
  {
    id: "ord_0006",
    reference: "AV-2026-0006",
    businessId: null,
    businessName: "Salon Grâce Divine",
    customerName: "Grâce Kaboré",
    customerPhone: "+226 74 08 55 31",
    customerWhatsapp: "+226 74 08 55 31",
    customerEmail: null,
    city: "Ouagadougou",
    district: "Gounghin",
    address: "Secteur 12, non loin du lycée",
    status: "CONFIRMEE",
    paymentStatus: "PARTIAL",
    totalAmount: 17500,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: "https://search.google.com/local/writereview?placeid=demo_grace_divine",
      facebook: null,
      instagram: "https://instagram.com/salongracedivine",
      tiktok: null,
      whatsapp: "+226 74 08 55 31",
      googleMapsUrl: null,
      websiteUrl: null,
      otherLinks: null,
    },
    installationMode: "RETRAIT",
    notes: "Acompte de 10 000 FCFA reçu.",
    items: [
      { id: "oi_3", orderId: "ord_0006", productId: "prd_carte", productName: "Carte Avis+", quantity: 1, unitPrice: 7500, options: { Finition: "Mate", Couleur: "Noir" } },
      { id: "oi_4", orderId: "ord_0006", productId: "prd_sticker", productName: "Sticker Avis+", quantity: 2, unitPrice: 5000, options: { Format: "Rond 50 mm" } },
    ],
    timeline: [
      { status: "NOUVELLE", at: "2026-09-23T13:05:00.000Z" },
      { status: "A_CONTACTER", at: "2026-09-23T15:30:00.000Z" },
      { status: "CONFIRMEE", at: "2026-09-24T08:15:00.000Z", note: "Acompte reçu, retrait prévu en boutique." },
    ],
    createdAt: "2026-09-23T13:05:00.000Z",
    updatedAt: "2026-09-24T08:15:00.000Z",
  },
  {
    id: "ord_0005",
    reference: "AV-2026-0005",
    businessId: "biz_terroir",
    businessName: "Le Terroir",
    customerName: "Ibrahim Compaoré",
    customerPhone: "+226 70 41 22 08",
    customerWhatsapp: "+226 70 41 22 08",
    customerEmail: "contact@leterroir.bf",
    city: "Ouagadougou",
    district: "Zone du Bois",
    address: "Avenue Charles de Gaulle",
    status: "INSTALLATION_PROGRAMMEE",
    paymentStatus: "PAID",
    totalAmount: 50000,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_le_terroir_ouaga",
      facebook: "https://facebook.com/leterroirbf",
      instagram: "https://instagram.com/leterroirbf",
      tiktok: "https://tiktok.com/@leterroirbf",
      whatsapp: "+226 70 41 22 08",
      googleMapsUrl: "https://maps.google.com/?q=Le+Terroir+Ouagadougou",
      websiteUrl: "https://leterroir.bf",
      otherLinks: null,
    },
    installationMode: "OUAGADOUGOU",
    notes: "Deux plaques : une au comptoir, une en terrasse.",
    items: [
      { id: "oi_5", orderId: "ord_0005", productId: "prd_plaque", productName: "Plaque Avis+", quantity: 2, unitPrice: 25000, options: { Base: "Bois naturel", Orientation: "Verticale" } },
    ],
    timeline: [
      { status: "NOUVELLE", at: "2026-09-18T10:20:00.000Z" },
      { status: "A_CONTACTER", at: "2026-09-18T14:00:00.000Z" },
      { status: "CONFIRMEE", at: "2026-09-19T09:00:00.000Z" },
      { status: "EN_PREPARATION", at: "2026-09-20T08:30:00.000Z" },
      { status: "CONFIGURATION", at: "2026-09-21T16:45:00.000Z", note: "Page digitale et puces NFC configurées." },
      { status: "INSTALLATION_PROGRAMMEE", at: "2026-09-22T10:30:00.000Z", note: "Installation fixée au 26 septembre à 10h." },
    ],
    createdAt: "2026-09-18T10:20:00.000Z",
    updatedAt: "2026-09-22T10:30:00.000Z",
  },
  {
    id: "ord_0004",
    reference: "AV-2026-0004",
    businessId: "biz_belle",
    businessName: "Belle & Moi",
    customerName: "Awa Traoré",
    customerPhone: "+226 76 55 90 14",
    customerWhatsapp: "+226 76 55 90 14",
    customerEmail: null,
    city: "Ouagadougou",
    district: "Koulouba",
    address: "Rue 12.34",
    status: "INSTALLEE",
    paymentStatus: "PAID",
    totalAmount: 45000,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_belle_et_moi",
      facebook: "https://facebook.com/belleetmoi",
      instagram: "https://instagram.com/belleetmoi.bf",
      tiktok: "https://tiktok.com/@belleetmoi",
      whatsapp: "+226 76 55 90 14",
      googleMapsUrl: "https://maps.google.com/?q=Belle+et+Moi+Ouagadougou",
      websiteUrl: null,
      otherLinks: null,
    },
    installationMode: "OUAGADOUGOU",
    notes: null,
    items: [
      { id: "oi_6", orderId: "ord_0004", productId: "prd_pack", productName: "Pack Commerce", quantity: 1, unitPrice: 45000, options: { "Base de plaque": "Noir mat", "Couleur de carte": "Blanc" } },
    ],
    timeline: [
      { status: "NOUVELLE", at: "2026-09-08T09:45:00.000Z" },
      { status: "CONFIRMEE", at: "2026-09-09T10:10:00.000Z" },
      { status: "EN_PREPARATION", at: "2026-09-11T08:00:00.000Z" },
      { status: "CONFIGURATION", at: "2026-09-12T15:20:00.000Z" },
      { status: "INSTALLATION_PROGRAMMEE", at: "2026-09-14T09:00:00.000Z" },
      { status: "INSTALLEE", at: "2026-09-15T11:40:00.000Z", note: "QR et NFC testés devant la cliente." },
      { status: "TERMINEE", at: "2026-09-16T09:00:00.000Z", note: "Solde encaissé, dossier clôturé." },
    ],
    createdAt: "2026-09-08T09:45:00.000Z",
    updatedAt: "2026-09-16T09:00:00.000Z",
  },
  {
    id: "ord_0003",
    reference: "AV-2026-0003",
    businessId: "biz_coinmode",
    businessName: "Le Coin Mode",
    customerName: "Rasmané Ilboudo",
    customerPhone: "+226 74 20 36 91",
    customerWhatsapp: "+226 74 20 36 91",
    customerEmail: null,
    city: "Ouagadougou",
    district: "Gounghin",
    address: "Marché de Gounghin, allée centrale",
    status: "TERMINEE",
    paymentStatus: "PAID",
    totalAmount: 20000,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_le_coin_mode",
      facebook: "https://facebook.com/lecoinmode",
      instagram: "https://instagram.com/lecoinmode",
      tiktok: "https://tiktok.com/@lecoinmode",
      whatsapp: "+226 74 20 36 91",
      googleMapsUrl: "https://maps.google.com/?q=Le+Coin+Mode+Ouagadougou",
      websiteUrl: null,
      otherLinks: null,
    },
    installationMode: "RETRAIT",
    notes: null,
    items: [
      { id: "oi_7", orderId: "ord_0003", productId: "prd_carte", productName: "Carte Avis+", quantity: 2, unitPrice: 7500, options: { Finition: "Brillante", Couleur: "Noir" } },
      { id: "oi_8", orderId: "ord_0003", productId: "prd_sticker", productName: "Sticker Avis+", quantity: 1, unitPrice: 5000, options: { Format: "Carré 60 mm" } },
    ],
    timeline: [
      { status: "NOUVELLE", at: "2026-08-28T08:30:00.000Z" },
      { status: "CONFIRMEE", at: "2026-08-28T14:00:00.000Z" },
      { status: "EN_PREPARATION", at: "2026-08-29T09:00:00.000Z" },
      { status: "CONFIGURATION", at: "2026-08-29T16:00:00.000Z" },
      { status: "INSTALLEE", at: "2026-08-30T10:00:00.000Z", note: "Retrait en boutique et test sur place." },
      { status: "TERMINEE", at: "2026-08-30T10:30:00.000Z" },
    ],
    createdAt: "2026-08-28T08:30:00.000Z",
    updatedAt: "2026-08-30T10:30:00.000Z",
  },
  {
    id: "ord_0002",
    reference: "AV-2026-0002",
    businessId: "biz_delice",
    businessName: "Le Délice",
    customerName: "Fatimata Zongo",
    customerPhone: "+226 78 12 44 60",
    customerWhatsapp: "+226 78 12 44 60",
    customerEmail: null,
    city: "Ouagadougou",
    district: "Koulouba",
    address: "Rond-point des Nations Unies",
    status: "TERMINEE",
    paymentStatus: "PAID",
    totalAmount: 25000,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJdemo_le_delice",
      facebook: "https://facebook.com/ledelicebf",
      instagram: "https://instagram.com/ledelicebf",
      tiktok: "https://tiktok.com/@ledelicebf",
      whatsapp: "+226 78 12 44 60",
      googleMapsUrl: "https://maps.google.com/?q=Le+Delice+Ouagadougou",
      websiteUrl: null,
      otherLinks: null,
    },
    installationMode: "OUAGADOUGOU",
    notes: null,
    items: [
      { id: "oi_9", orderId: "ord_0002", productId: "prd_plaque", productName: "Plaque Avis+", quantity: 1, unitPrice: 25000, options: { Base: "Bois naturel", Orientation: "Verticale" } },
    ],
    timeline: [
      { status: "NOUVELLE", at: "2026-08-10T09:00:00.000Z" },
      { status: "CONFIRMEE", at: "2026-08-11T09:30:00.000Z" },
      { status: "INSTALLEE", at: "2026-08-14T10:15:00.000Z" },
      { status: "TERMINEE", at: "2026-08-14T11:00:00.000Z" },
    ],
    createdAt: "2026-08-10T09:00:00.000Z",
    updatedAt: "2026-08-14T11:00:00.000Z",
  },
  {
    id: "ord_0001",
    reference: "AV-2026-0001",
    businessId: null,
    businessName: "Cabinet Dentaire Sougrinoma",
    customerName: "Dr. Sougrinoma",
    customerPhone: "+226 25 33 44 55",
    customerWhatsapp: "+226 25 33 44 55",
    customerEmail: "cabinet.sougrinoma@yahoo.fr",
    city: "Ouagadougou",
    district: "Ouaga 2000",
    address: "Immeuble Sougrinoma, 2e étage",
    status: "ANNULEE",
    paymentStatus: "REFUNDED",
    totalAmount: 7500,
    currency: "FCFA",
    digital: {
      logoUrl: null,
      googleReviewUrl: null,
      facebook: null,
      instagram: null,
      tiktok: null,
      whatsapp: "+226 25 33 44 55",
      googleMapsUrl: null,
      websiteUrl: null,
      otherLinks: null,
    },
    installationMode: "LIVRAISON",
    notes: "Client finalement parti sur une autre solution.",
    items: [
      { id: "oi_10", orderId: "ord_0001", productId: "prd_carte", productName: "Carte Avis+", quantity: 1, unitPrice: 7500, options: { Finition: "Mate", Couleur: "Blanc" } },
    ],
    timeline: [
      { status: "NOUVELLE", at: "2026-08-04T08:00:00.000Z" },
      { status: "A_CONTACTER", at: "2026-08-04T10:00:00.000Z" },
      { status: "ANNULEE", at: "2026-08-06T09:00:00.000Z", note: "Annulation à la demande du client." },
    ],
    createdAt: "2026-08-04T08:00:00.000Z",
    updatedAt: "2026-08-06T09:00:00.000Z",
  },
];

/* -------------------------------------------------------------------------- */
/* Installations                                                               */
/* -------------------------------------------------------------------------- */

export const INSTALLATIONS: Installation[] = [
  {
    id: "ins_4",
    orderId: "ord_0005",
    orderReference: "AV-2026-0005",
    businessId: "biz_terroir",
    businessName: "Le Terroir",
    scheduledAt: "2026-09-26T10:00:00.000Z",
    address: "Avenue Charles de Gaulle, Zone du Bois",
    city: "Ouagadougou",
    technician: "Boukary Nikiéma",
    status: "PLANIFIEE",
    notes: "Prévoir deux supports et la perceuse pour la terrasse.",
    beforePhotoUrl: null,
    afterPhotoUrl: null,
    checklist: { qrTested: false, nfcTested: false, pageTested: false, customerInformed: false },
    completedAt: null,
  },
  {
    id: "ins_3",
    orderId: "ord_0004",
    orderReference: "AV-2026-0004",
    businessId: "biz_belle",
    businessName: "Belle & Moi",
    scheduledAt: "2026-09-15T11:00:00.000Z",
    address: "Rue 12.34, Koulouba",
    city: "Ouagadougou",
    technician: "Boukary Nikiéma",
    status: "TERMINEE",
    notes: "Installation sur comptoir d'accueil, sans perçage.",
    beforePhotoUrl: "/images/demo/installation-belle-avant.jpg",
    afterPhotoUrl: "/images/demo/installation-belle-apres.jpg",
    checklist: { qrTested: true, nfcTested: true, pageTested: true, customerInformed: true },
    completedAt: "2026-09-15T11:40:00.000Z",
  },
  {
    id: "ins_2",
    orderId: "ord_0002",
    orderReference: "AV-2026-0002",
    businessId: "biz_delice",
    businessName: "Le Délice",
    scheduledAt: "2026-08-14T10:00:00.000Z",
    address: "Rond-point des Nations Unies",
    city: "Ouagadougou",
    technician: "Salif Ouattara",
    status: "TERMINEE",
    notes: null,
    beforePhotoUrl: null,
    afterPhotoUrl: "/images/presentation-bois-nfc-qr.png",
    checklist: { qrTested: true, nfcTested: true, pageTested: true, customerInformed: true },
    completedAt: "2026-08-14T10:15:00.000Z",
  },
  {
    id: "ins_1",
    orderId: "ord_0003",
    orderReference: "AV-2026-0003",
    businessId: "biz_coinmode",
    businessName: "Le Coin Mode",
    scheduledAt: "2026-08-30T10:00:00.000Z",
    address: "Marché de Gounghin, allée centrale",
    city: "Ouagadougou",
    technician: "Salif Ouattara",
    status: "TERMINEE",
    notes: "Retrait en boutique, aucune installation à domicile.",
    beforePhotoUrl: null,
    afterPhotoUrl: null,
    checklist: { qrTested: true, nfcTested: true, pageTested: true, customerInformed: true },
    completedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "ins_5",
    orderId: "ord_0007",
    orderReference: "AV-2026-0007",
    businessId: "biz_boulangerie",
    businessName: "Boulangerie Wend-Panga",
    scheduledAt: null,
    address: "Rue 14.28, Dassasgho",
    city: "Ouagadougou",
    technician: null,
    status: "A_PLANIFIER",
    notes: "En attente de confirmation du client.",
    beforePhotoUrl: null,
    afterPhotoUrl: null,
    checklist: { qrTested: false, nfcTested: false, pageTested: false, customerInformed: false },
    completedAt: null,
  },
];

/* -------------------------------------------------------------------------- */
/* Puce NFC                                                                    */
/* -------------------------------------------------------------------------- */

export const NFC_DEVICES: NfcDevice[] = [
  { id: "nfc_1", businessId: "biz_terroir", businessName: "Le Terroir", type: "NTAG213 — Plaque", uid: "04:A2:1B:7C:55:30:80", targetUrl: "https://avisplus.bf/p/le-terroir", status: "CONFIGURE", technician: "Boukary Nikiéma", configuredAt: "2026-09-21T16:45:00.000Z", installedAt: null, notes: "Deux puces préparées pour le comptoir et la terrasse." },
  { id: "nfc_2", businessId: "biz_belle", businessName: "Belle & Moi", type: "NTAG213 — Plaque", uid: "04:9F:33:A1:12:04:90", targetUrl: "https://avisplus.bf/p/belle-et-moi", status: "INSTALLE", technician: "Boukary Nikiéma", configuredAt: "2026-09-12T15:20:00.000Z", installedAt: "2026-09-15T11:40:00.000Z", notes: null },
  { id: "nfc_3", businessId: "biz_belle", businessName: "Belle & Moi", type: "NTAG213 — Carte", uid: "04:9F:33:A1:12:05:11", targetUrl: "https://avisplus.bf/p/belle-et-moi", status: "INSTALLE", technician: "Boukary Nikiéma", configuredAt: "2026-09-12T15:22:00.000Z", installedAt: "2026-09-15T11:40:00.000Z", notes: null },
  { id: "nfc_4", businessId: "biz_coinmode", businessName: "Le Coin Mode", type: "NTAG213 — Carte", uid: "04:71:2C:88:63:19:42", targetUrl: "https://avisplus.bf/p/le-coin-mode", status: "INSTALLE", technician: "Salif Ouattara", configuredAt: "2026-08-29T16:00:00.000Z", installedAt: "2026-08-30T10:00:00.000Z", notes: null },
  { id: "nfc_5", businessId: "biz_delice", businessName: "Le Délice", type: "NTAG213 — Plaque", uid: "04:55:AA:02:77:41:08", targetUrl: "https://avisplus.bf/p/le-delice", status: "TESTE", technician: "Salif Ouattara", configuredAt: "2026-08-13T09:30:00.000Z", installedAt: "2026-08-14T10:15:00.000Z", notes: "À re-tester : lecture parfois lente selon le téléphone." },
  { id: "nfc_6", businessId: "biz_hotel", businessName: "Hôtel Bangr-Weoogo", type: "NTAG213 — Plaque", uid: null, targetUrl: "https://avisplus.bf/p/hotel-bangr-weoogo", status: "NON_CONFIGURE", technician: null, configuredAt: null, installedAt: null, notes: "Page en brouillon, ne pas programmer avant validation." },
];

/* -------------------------------------------------------------------------- */
/* QR Codes                                                                    */
/* -------------------------------------------------------------------------- */

export const QR_CODES: QrCodeRecord[] = [
  { id: "qr_1", businessId: "biz_terroir", businessName: "Le Terroir", slug: "le-terroir", targetUrl: "https://avisplus.bf/p/le-terroir", format: "SVG", status: "ACTIF", createdAt: "2026-09-21T16:40:00.000Z" },
  { id: "qr_2", businessId: "biz_belle", businessName: "Belle & Moi", slug: "belle-et-moi", targetUrl: "https://avisplus.bf/p/belle-et-moi", format: "SVG", status: "ACTIF", createdAt: "2026-09-12T15:15:00.000Z" },
  { id: "qr_3", businessId: "biz_coinmode", businessName: "Le Coin Mode", slug: "le-coin-mode", targetUrl: "https://avisplus.bf/p/le-coin-mode", format: "PNG", status: "ACTIF", createdAt: "2026-08-29T15:55:00.000Z" },
  { id: "qr_4", businessId: "biz_delice", businessName: "Le Délice", slug: "le-delice", targetUrl: "https://avisplus.bf/p/le-delice", format: "SVG", status: "ACTIF", createdAt: "2026-08-13T09:25:00.000Z" },
  { id: "qr_5", businessId: "biz_wendkuni", businessName: "Garage Wend-Kuni", slug: "garage-wend-kuni", targetUrl: "https://avisplus.bf/p/garage-wend-kuni", format: "PNG", status: "ACTIF", createdAt: "2026-09-05T11:00:00.000Z" },
];

/* -------------------------------------------------------------------------- */
/* Réalisations                                                                */
/* -------------------------------------------------------------------------- */

export const REALISATIONS: Realisation[] = [
  { id: "rea_1", businessName: "Le Terroir", category: "Restauration › Grillades", categoryId: "restauration", subcategory: "Grillades", city: "Ouagadougou", supportType: "Plaque A5 — base bois", imageUrl: "/images/presentation-bois-nfc-qr.png", published: true, installedAt: "2026-09-22T10:30:00.000Z" },
  { id: "rea_2", businessName: "Belle & Moi", category: "Beauté et soins esthétiques › Instituts de beauté", categoryId: "beaute", subcategory: "Instituts de beauté", city: "Ouagadougou", supportType: "Pack Commerce", imageUrl: "/images/presentation-noir-nfc-qr.png", published: true, installedAt: "2026-09-15T11:40:00.000Z" },
  { id: "rea_3", businessName: "Le Délice", category: "Restauration › Restaurants", categoryId: "restauration", subcategory: "Restaurants", city: "Ouagadougou", supportType: "Plaque A5 — base bois", imageUrl: "/images/totem-avis-google.jpg", published: true, installedAt: "2026-08-14T10:15:00.000Z" },
  { id: "rea_4", businessName: "Le Coin Mode", category: "Mode et habillement › Boutiques de vêtements", categoryId: "mode-habillement", subcategory: "Boutiques de vêtements", city: "Ouagadougou", supportType: "Cartes + sticker", imageUrl: "/images/supports-personnalises.webp", published: true, installedAt: "2026-08-30T10:00:00.000Z" },
  { id: "rea_5", businessName: "Pharmacie du Progrès", category: "Santé › Pharmacies", categoryId: "sante", subcategory: "Pharmacies", city: "Ouagadougou", supportType: "Plaque A5 — noir mat", imageUrl: "/images/support-noir.webp", published: true, installedAt: "2026-07-19T09:00:00.000Z" },
  { id: "rea_6", businessName: "Hôtel Bangr-Weoogo", category: "Hôtellerie › Hôtels", categoryId: "hotellerie", subcategory: "Hôtels", city: "Ouagadougou", supportType: "Plaque murale", imageUrl: "/images/support-details-techniques.png", published: false, installedAt: "2026-09-24T09:15:00.000Z" },
];

/* -------------------------------------------------------------------------- */
/* Événements analytiques (§41)                                                */
/* -------------------------------------------------------------------------- */

export const PAGE_EVENTS: PageEvent[] = [
  { id: "evt_1", businessId: "biz_terroir", eventType: "PAGE_VIEW", createdAt: "2026-09-25T06:12:00.000Z", deviceType: "mobile" },
  { id: "evt_2", businessId: "biz_terroir", eventType: "QR_SCAN", createdAt: "2026-09-25T06:12:00.000Z", deviceType: "mobile" },
  { id: "evt_3", businessId: "biz_terroir", eventType: "GOOGLE_CLICK", createdAt: "2026-09-25T06:13:00.000Z", deviceType: "mobile" },
  { id: "evt_4", businessId: "biz_terroir", eventType: "MENU_VIEW", createdAt: "2026-09-25T06:13:20.000Z", deviceType: "mobile" },
  { id: "evt_5", businessId: "biz_terroir", eventType: "WHATSAPP_CLICK", createdAt: "2026-09-25T06:15:00.000Z", deviceType: "mobile" },
  { id: "evt_6", businessId: "biz_belle", eventType: "PAGE_VIEW", createdAt: "2026-09-25T08:40:00.000Z", deviceType: "mobile" },
  { id: "evt_7", businessId: "biz_belle", eventType: "INSTAGRAM_CLICK", createdAt: "2026-09-25T08:41:00.000Z", deviceType: "mobile" },
  { id: "evt_8", businessId: "biz_coinmode", eventType: "PAGE_VIEW", createdAt: "2026-09-24T17:20:00.000Z", deviceType: "mobile" },
  { id: "evt_9", businessId: "biz_coinmode", eventType: "MAPS_CLICK", createdAt: "2026-09-24T17:22:00.000Z", deviceType: "mobile" },
  { id: "evt_10", businessId: "biz_delice", eventType: "PAGE_VIEW", createdAt: "2026-09-24T12:05:00.000Z", deviceType: "desktop" },
  { id: "evt_11", businessId: "biz_delice", eventType: "GOOGLE_CLICK", createdAt: "2026-09-24T12:06:00.000Z", deviceType: "desktop" },
  { id: "evt_12", businessId: "biz_wendkuni", eventType: "PAGE_VIEW", createdAt: "2026-09-23T09:30:00.000Z", deviceType: "mobile" },
  { id: "evt_13", businessId: "biz_terroir", eventType: "SHARE_CLICK", createdAt: "2026-09-23T19:44:00.000Z", deviceType: "mobile" },
  { id: "evt_14", businessId: "biz_belle", eventType: "PHONE_CLICK", createdAt: "2026-09-23T10:15:00.000Z", deviceType: "mobile" },
  { id: "evt_15", businessId: "biz_terroir", eventType: "PRODUCT_CLICK", createdAt: "2026-09-22T20:02:00.000Z", deviceType: "mobile" },
];

/* -------------------------------------------------------------------------- */
/* Contenus éditoriaux du site public                                          */
/* -------------------------------------------------------------------------- */

/** §14 — Les six étapes du parcours Avis+. */
export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Vous commandez",
    description:
      "Choisissez votre support et remplissez le formulaire en ligne. Aucun compte à créer, cela prend deux minutes.",
  },
  {
    step: 2,
    title: "Nous créons votre page",
    description:
      "Nous construisons votre page digitale avec votre logo, vos réseaux, votre WhatsApp et votre lien d'avis Google.",
  },
  {
    step: 3,
    title: "Nous configurons votre QR et votre NFC",
    description:
      "Le QR Code et la puce NFC reçoivent la même adresse : celle de votre page Avis+, qui ne changera plus.",
  },
  {
    step: 4,
    title: "Nous préparons votre support",
    description:
      "Impression, personnalisation et montage de votre plaque, carte ou sticker dans nos ateliers.",
  },
  {
    step: 5,
    title: "Nous venons l'installer",
    description:
      "Un technicien Avis+ se déplace, installe le support et teste le scan et le NFC devant vous.",
  },
  {
    step: 6,
    title: "Vos clients scannent",
    description:
      "Un seul scan et ils arrivent sur votre page : avis Google, réseaux, WhatsApp, itinéraire.",
  },
] as const;

/** §24 — Bandeau d'avantages sous le Hero. */
export const FEATURE_STRIP = [
  {
    icon: "zap",
    title: "Simple et efficace",
    description: "Un seul scan pour accéder à tout.",
  },
  {
    icon: "shield",
    title: "Matériel de qualité",
    description: "Cartes, plaques et supports NFC + QR Code.",
  },
  {
    icon: "settings",
    title: "Configuration incluse",
    description: "On s'occupe de tout : setup et installation.",
  },
  {
    icon: "mappin",
    title: "Service local",
    description: "Présent partout au Burkina Faso pour vous accompagner.",
  },
] as const;

/** §16 — Questions fréquentes. */
export const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le NFC ?",
    answer:
      "La puce NFC est intégrée dans votre support. Quand un client approche son téléphone de la plaque, de la carte ou du sticker, son navigateur s'ouvre automatiquement sur votre page Avis+. Aucune application à installer, ni pour vous, ni pour lui.",
  },
  {
    question: "Dois-je installer une application ?",
    answer:
      "Non. Le NFC et le QR Code fonctionnent avec l'appareil photo et le navigateur déjà présents sur le téléphone. Vos clients n'ont rien à télécharger.",
  },
  {
    question: "Dois-je créer un compte ?",
    answer:
      "Non. Vous commandez via un simple formulaire et nous vous contactons sur WhatsApp pour confirmer. Aucun compte client n'est nécessaire en V1.",
  },
  {
    question: "Puis-je modifier mon Instagram ?",
    answer:
      "Oui, à tout moment. Vous nous envoyez le nouveau lien et nous le mettons à jour sur votre page. Votre QR Code et votre plaque restent exactement les mêmes.",
  },
  {
    question: "Le QR Code peut-il changer ?",
    answer:
      "Il n'a pas besoin de changer. Le QR Code pointe vers une adresse Avis+ stable (avisplus.bf/p/votre-nom). C'est le contenu de cette page qui évolue, pas le QR Code.",
  },
  {
    question: "Que se passe-t-il si je change de numéro ?",
    answer:
      "Prévenez-nous et nous mettons à jour votre numéro et votre WhatsApp sur votre page. Votre support physique reste valable.",
  },
  {
    question: "Combien coûte l'installation ?",
    answer:
      "L'installation est incluse pour les plaques et les packs sur Ouagadougou. Pour les cartes et stickers, vous pouvez passer les retirer ou nous demander une livraison.",
  },
  {
    question: "Le support fonctionne-t-il avec Android ?",
    answer:
      "Oui. Le NFC et le QR Code fonctionnent avec la grande majorité des téléphones Android équipés du NFC.",
  },
  {
    question: "Le support fonctionne-t-il avec iPhone ?",
    answer:
      "Oui. Depuis l'iPhone 7, le lecteur NFC est intégré et lit automatiquement les puces sans ouvrir d'application.",
  },
  {
    question: "Puis-je avoir plusieurs cartes ?",
    answer:
      "Oui. Toutes vos cartes peuvent pointer vers la même page, ou vers des pages différentes si vous gérez plusieurs établissements. Parlons-en sur WhatsApp.",
  },
  {
    question: "Puis-je changer de fiche Google ?",
    answer:
      "Oui. Si vous changez de fiche Google, communiquez-nous le nouveau lien d'avis : nous le remplaçons sur votre page sans toucher au support.",
  },
  {
    question: "Que se passe-t-il si mon support est endommagé ?",
    answer:
      "Contactez-nous. Nous pouvons remplacer le support et reprogrammer une puce NFC. Votre page et votre QR Code, eux, restent inchangés.",
  },
] as const;
