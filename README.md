# Avis+ — Plateforme de supports NFC/QR et pages digitales

> **Votre entreprise, un seul scan.**

Avis+ vend des supports physiques connectés (cartes, plaques, stickers) destinés aux
commerces et professionnels. Chaque support porte un **QR Code** et une **puce NFC** qui
pointent vers une **URL Avis+ stable** (`/p/[slug]`). Cette page digitale regroupe l'avis
Google, les réseaux sociaux, WhatsApp, l'itinéraire et le site web de l'entreprise.

Le client final n'a **aucun compte à créer** et **aucune application à installer**.

---

## Sommaire

- [État du projet](#état-du-projet)
- [Stack technique](#stack-technique)
- [Démarrage rapide](#démarrage-rapide)
- [Routes](#routes)
- [Architecture du code](#architecture-du-code)
- [Design system](#design-system)
- [Données et branchement Supabase](#données-et-branchement-supabase)
- [Sécurité et points de vigilance](#sécurité-et-points-de-vigilance)
- [Scripts](#scripts)

---

## État du projet

Cette version est la **V1 fonctionnelle sur données de démonstration** décrite au cahier
des charges (§44). Tout le parcours est navigable : catalogue, commande, pages digitales
publiques, back-office, génération de QR Codes.

| Domaine | État |
|---|---|
| Site public (accueil, produits, FAQ, contact, commande) | ✅ Fonctionnel |
| Pages digitales `/p/[slug]` (5 entreprises, 3 démos) | ✅ Fonctionnel |
| Back-office `/admin` (10 écrans) | ✅ Fonctionnel |
| Génération de QR Code (SVG / PNG) | ✅ Fonctionnel |
| Persistance des données | ⏳ Données de démonstration en mémoire |
| Supabase (PostgreSQL, Storage, Auth) | ⏳ À brancher |
| Authentification administrateur | ⚠️ Provisoire — voir [Sécurité](#sécurité-et-points-de-vigilance) |

### Trois pages de démonstration

| Entreprise | Template | URL |
|---|---|---|
| Le Terroir | Restaurant | `/p/le-terroir` |
| Belle & Moi | Beauté / Salon | `/p/belle-et-moi` |
| Le Coin Mode | Boutique | `/p/le-coin-mode` |

---

## Stack technique

- **Next.js 15** (App Router) + **React 19** + **TypeScript** en mode strict
- **Tailwind CSS 3.4** avec les tokens Avis+ (`avis-*`)
- **Lucide React** pour les icônes d'interface, SVG officiels pour les marques
- **qrcode** pour la génération de QR Codes côté serveur
- **Inter** chargée via `next/font/google`

---

## Démarrage rapide

```bash
npm install
cp .env.example .env.local   # puis renseignez vos coordonnées
npm run dev                  # http://localhost:3000
```

Back-office de démonstration : <http://localhost:3000/admin>
(identifiants préremplis : `admin@avisplus.bf` / `avisplus2026`)

---

## Routes

### Site public

```text
/                       Accueil (hero, concept, parcours, produits, exemples, FAQ, CTA)
/produits               Catalogue avec filtres par type
/produits/[slug]        Fiche produit (galerie, caractéristiques, quantité, commande)
/comment-ca-marche      Parcours en six étapes
/realisations           Galerie des supports installés
/faq                    Questions fréquentes
/contact                Coordonnées et formulaire
/commander              Formulaire de commande (sans compte)
/commander/confirmation Confirmation et référence AV-2026-XXXX
```

### Pages digitales et API

```text
/p/[slug]               Page digitale publique (QR Code et NFC pointent ici)
/api/qr?slug=…          Génération de QR Code (SVG par défaut, PNG possible)
/api/commandes          Réception d'une commande (POST) — renvoie la référence
```

### Back-office

```text
/admin/login                    Connexion
/admin/dashboard                Indicateurs et activité
/admin/commandes                Liste et filtres par statut
/admin/commandes/[id]           Fiche commande, timeline, changement de statut
/admin/entreprises              Liste des entreprises
/admin/entreprises/[id]         Fiche et éditeur de page digitale
/admin/pages                    Liste des pages digitales et audience
/admin/pages/[id]               Éditeur de contenu et statistiques
/admin/produits                 Catalogue
/admin/installations            Planification et preuve d'installation
/admin/qr                       Générateur et registre des QR Codes
/admin/nfc                      Suivi des puces NFC
/admin/realisations             Galerie et validation avant publication
/admin/parametres               Coordonnées, identité visuelle, état technique
```

---

## Architecture du code

```text
src/
├── app/
│   ├── (site)/              Site public (gabarit avec header et footer)
│   ├── p/[slug]/            Pages digitales publiques
│   ├── admin/               Back-office
│   │   ├── login/           Connexion (hors garde d'accès)
│   │   └── (protected)/     Écrans protégés + barre latérale
│   └── api/                 QR Code et réception des commandes
├── components/
│   ├── brand/               Logo et icônes de marques
│   ├── ui/                  Design system (bouton, carte, badge, champs, note)
│   ├── layout/              Header et footer du site public
│   ├── marketing/           Hero, produits, parcours, FAQ, CTA, formulaires
│   ├── digital-page/        Composants des pages `/p/[slug]`
│   └── admin/               Barre latérale, tableaux, éditeurs
└── lib/
    ├── types.ts             Types du domaine (miroir du schéma §30)
    ├── data.ts              Couche d'accès aux données (async, prête pour Supabase)
    ├── mock/                Données de démonstration
    ├── site.ts              Configuration du site et liens WhatsApp
    ├── status.ts            Libellés et tons des statuts
    ├── auth.ts              Session administrateur (provisoire)
    └── utils.ts             Formatage (prix FCFA, dates, slug, URL publique)
```

**Règle d'architecture** : aucun composant n'importe directement `src/lib/mock`.
Tout passe par `src/lib/data.ts`, dont les fonctions sont `async` — le branchement de
Supabase ne demandera donc aucune modification des composants.

---

## Design system

Les tokens proviennent de `DESIGN_SYSTEM_AVIS_PLUS.md` et sont exposés dans
`tailwind.config.ts` ainsi qu'en variables CSS (`src/app/globals.css`).

| Token | Valeur | Usage |
|---|---|---|
| `avis-black` | `#050505` | Titres, texte principal, logo |
| `avis-text` | `#475569` | Paragraphes, descriptions |
| `avis-muted` | `#64748B` | Métadonnées, labels |
| `avis-border` | `#E2E8F0` | Bordures, séparateurs |
| `avis-primary` | `#FFB82E` | CTA, accents, indicateurs |
| `avis-primary-hover` | `#F4A91F` | État survol des CTA |

- Police : **Inter** (`next/font/google`), échelle `display` → `caption`
- Rayons : boutons en `pill`, cartes de 16 à 20px, champs à 10px
- Ombres très discrètes, animations de 150 à 300 ms en `ease-out`
- Accessibilité : focus toujours visible, cibles tactiles ≥ 44px, `aria-label` sur les
  icônes seules, respect de `prefers-reduced-motion`

---

## Données et branchement Supabase

Les données de démonstration vivent dans `src/lib/mock/` :

| Fichier | Contenu |
|---|---|
| `products.ts` | 4 produits du catalogue (carte, plaque, sticker, pack) |
| `businesses.ts` | 6 entreprises, réseaux sociaux et contenus de pages digitales |
| `operations.ts` | Commandes, installations, puces NFC, QR Codes, réalisations, FAQ |

### Migration vers Supabase

1. Créer les tables du cahier des charges §30 : `businesses`, `social_links`, `products`,
   `orders`, `order_items`, `installations`, `digital_pages`, `nfc_devices`, `qr_codes`,
   `page_events`.
2. Activer les **politiques RLS** : lecture publique limitée aux entreprises au statut
   `ACTIVE`, écriture réservée aux administrateurs authentifiés.
3. Renseigner `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` et
   `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local`.
4. Réécrire le corps des fonctions de `src/lib/data.ts` (elles sont déjà `async`).
5. Remplacer les server actions de `src/app/admin/(protected)/*/actions.ts` (les
   emplacements sont marqués `TODO(Supabase)`).
6. Basculer `src/lib/auth.ts` sur Supabase Auth.

---

## Sécurité et points de vigilance

> ⚠️ **Avant toute mise en production**, ces trois points doivent être traités.

1. **Authentification du back-office** — `src/lib/auth.ts` met en place une session signée
   avec des identifiants de démonstration (`admin@avisplus.bf` / `avisplus2026`, également
   préremplis sur l'écran de connexion). Ce n'est **pas** une authentification de
   production : il n'y a ni hachage en base, ni multi-utilisateurs, ni réinitialisation de
   mot de passe. Le cahier des charges §33 prévoit Supabase Auth.
   → Renseigner `ADMIN_EMAIL`, `ADMIN_PASSWORD` et surtout `ADMIN_SESSION_SECRET`, puis
   migrer vers Supabase Auth.

2. **Persistance** — les actions du back-office valident les données mais ne les
   enregistrent pas encore. Un message d'avertissement est affiché dans l'interface.

3. **Avis et conformité** — le cahier des charges §10 interdit de promettre des avis
   positifs ou une note Google garantie, et de filtrer les clients satisfaits vers Google.
   Les avis affichés sur les pages de démonstration sont **fictifs** : en production, seuls
   de vrais avis fournis par le commerçant ou issus d'une source autorisée doivent être
   affichés.

### Stabilité des URL

Le **slug** d'une entreprise détermine son URL publique, encodée dans le QR Code et la
puce NFC. Modifier un slug invalide tous les supports déjà imprimés. Pour retirer une
page, préférez la désactivation (statut `INACTIVE`) à la suppression.

---

## Scripts

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run start      # Serveur de production
npm run typecheck  # Vérification TypeScript sans émission
```

---

## Crédits

Visuels produits et planches de présentation fournis dans `public/images/`.
Documents de référence : `CAHIER_DES_CHARGES_AVIS_PLUS_V1.md` et
`DESIGN_SYSTEM_AVIS_PLUS.md`.
