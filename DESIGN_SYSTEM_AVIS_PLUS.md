# AVIS+ — Design System

**Version : 1.0**  
**Produit : Avis+**  
**Usage : site public, pages digitales clients et back-office**  
**Référence visuelle : landing page Avis+ générée pour le projet**

---

## 1. Direction artistique

Avis+ doit transmettre une image :

- moderne ;
- professionnelle ;
- minimaliste ;
- fiable ;
- accessible ;
- locale sans être folklorique ;
- orientée service ;
- simple à comprendre en quelques secondes.

L'interface doit privilégier les espaces blancs, les composants arrondis, une hiérarchie typographique forte et des accents jaunes/orange utilisés avec parcimonie.

### Principe visuel

> **Simple, propre, professionnel et immédiatement compréhensible.**

Éviter :

- les interfaces surchargées ;
- les dégradés excessifs ;
- les ombres fortes ;
- les bordures épaisses ;
- les couleurs trop nombreuses ;
- les animations permanentes ;
- les icônes décoratives sans fonction.

---

# 2. Police principale

## Inter

La landing page utilise une typographie sans-serif moderne de type **Inter**.

Inter doit être la police principale de toute la plateforme.

### Installation

Avec Next.js :

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

Puis :

```css
body {
  font-family: var(--font-inter), sans-serif;
}
```

### Pourquoi Inter

Inter est adaptée à :

- interfaces web ;
- tableaux de bord ;
- boutons ;
- formulaires ;
- pages mobiles ;
- chiffres et prix ;
- textes courts ;
- interfaces professionnelles.

---

# 3. Hiérarchie typographique

## Display / Hero

Utilisation :

- titre principal de la landing page ;
- message marketing principal.

```css
font-size: 64px;
line-height: 1.05;
font-weight: 700;
letter-spacing: -0.04em;
```

Desktop :

```text
64px / 67px
700
```

Tablet :

```text
48px / 52px
700
```

Mobile :

```text
38px / 42px
700
```

---

## H1

```text
48px
line-height: 1.1
font-weight: 700
letter-spacing: -0.03em
```

Mobile :

```text
34px
line-height: 1.15
```

---

## H2

```text
36px
line-height: 1.15
font-weight: 700
letter-spacing: -0.025em
```

Mobile :

```text
30px
```

---

## H3

```text
24px
line-height: 1.25
font-weight: 650
```

---

## H4

```text
20px
line-height: 1.3
font-weight: 600
```

---

## Body Large

```text
18px
line-height: 1.65
font-weight: 400
```

Utilisation :

- description Hero ;
- textes importants ;
- introduction de sections.

---

## Body

```text
16px
line-height: 1.6
font-weight: 400
```

---

## Body Small

```text
14px
line-height: 1.5
font-weight: 400
```

---

## Caption

```text
12px
line-height: 1.4
font-weight: 500
```

---

## Navigation

```text
14px
line-height: 1;
font-weight: 500;
```

La navigation doit rester discrète.

---

# 4. Texte accent / Eyebrow

Dans la landing page :

```text
PLUS D’AVIS  +  PLUS DE VISIBILITÉ
```

Style :

```text
font-size: 13px;
font-weight: 600;
letter-spacing: 0.20em;
text-transform: uppercase;
```

Couleur :

```text
#475569
```

Le symbole `+` utilise la couleur accent.

---

# 5. Palette de couleurs

## 5.1 Couleur principale — Noir

```text
#050505
```

Utilisation :

- logo ;
- titres ;
- texte principal ;
- icônes principales ;
- éléments forts.

---

## 5.2 Gris texte

```text
#475569
```

Utilisation :

- paragraphes ;
- descriptions ;
- navigation secondaire ;
- informations complémentaires.

---

## 5.3 Gris secondaire

```text
#64748B
```

Utilisation :

- textes secondaires ;
- labels ;
- métadonnées.

---

## 5.4 Gris clair

```text
#E2E8F0
```

Utilisation :

- bordures ;
- séparateurs ;
- champs ;
- cartes.

---

## 5.5 Gris très clair

```text
#F8FAFC
```

Utilisation :

- fonds secondaires ;
- sections ;
- états hover très légers.

---

## 5.6 Blanc

```text
#FFFFFF
```

Couleur principale du canvas.

La majorité de la landing page doit rester blanche.

---

# 6. Couleur accent Avis+

La landing page utilise un jaune/orange lumineux.

## Primary

```text
#FFB82E
```

Utilisation :

- CTA principal ;
- bouton Commander ;
- éléments actifs ;
- accent du logo ;
- icônes d'action ;
- indicateurs.

---

## Primary Hover

```text
#F4A91F
```

---

## Primary Light

```text
#FFF4D8
```

Utilisation :

- backgrounds d'accent ;
- badges ;
- zones d'information.

---

## Primary Dark

```text
#C98200
```

Utilisation :

- texte sur fond clair si nécessaire ;
- états renforcés.

---

# 7. Couleurs fonctionnelles

## Success

```text
#16A34A
```

## Warning

```text
#F59E0B
```

## Error

```text
#DC2626
```

## Info

```text
#2563EB
```

Les couleurs fonctionnelles ne doivent pas devenir des couleurs de branding.

---

# 8. Couleurs de fond

```text
Background:
#FFFFFF

Background Soft:
#F8FAFC

Background Accent:
#FFF8E8

Surface:
#FFFFFF

Surface Muted:
#F8FAFC
```

---

# 9. Logo Avis+

Le logo est composé de :

```text
AVIS+
```

### Règles

- `AVIS` en noir ;
- `+` en gris dans le traitement monochrome ou en jaune/or dans le traitement couleur ;
- conserver une zone de respiration autour du logo ;
- ne jamais déformer le logo ;
- ne pas ajouter d'ombre ;
- ne pas modifier les proportions.

### Zone de sécurité

Prévoir au minimum :

```text
0.5 × hauteur du logo
```

sur tous les côtés.

---

# 10. Iconographie

## Bibliothèque utilisée

Utiliser **Lucide Icons / lucide-react**.

Installation :

```bash
npm install lucide-react
```

Import :

```tsx
import {
  Star,
  Share2,
  Phone,
  MapPin,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Settings,
  MessageCircle,
  Globe,
  Instagram,
  Facebook,
  Menu,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
```

---

# 11. Style des icônes

Les icônes doivent être :

- linéaires ;
- simples ;
- modernes ;
- cohérentes ;
- sans remplissage excessif.

Configuration standard :

```tsx
<Icon
  size={20}
  strokeWidth={1.8}
/>
```

### Tailles

```text
12px  → très petit
16px  → interface compacte
18px  → standard
20px  → standard principal
24px  → bouton / feature
32px  → feature importante
40px  → icône de section
```

---

# 12. Icônes fonctionnelles recommandées

| Fonction | Icône |
|---|---|
| Avis Google | `Star` |
| Partage / réseaux | `Share2` |
| Téléphone | `Phone` |
| Localisation | `MapPin` |
| Commander | `ShoppingCart` |
| Sécurité | `ShieldCheck` |
| Rapidité | `Zap` |
| Configuration | `Settings` |
| WhatsApp | `MessageCircle` |
| Site web | `Globe` |
| Menu | `Menu` |
| Action | `ArrowRight` |
| Navigation | `ChevronRight` |
| Validation | `Check` |
| QR | `QrCode` |
| NFC | `Radio` / `Wifi` |
| Modifier | `Pencil` |
| Supprimer | `Trash2` |
| Télécharger | `Download` |
| Recherche | `Search` |
| Commandes | `Package` |
| Installation | `MapPin` |
| Calendrier | `CalendarDays` |

---

# 13. Réseaux sociaux

Pour les logos officiels de plateformes sociales, préférer les **SVG officiels ou une bibliothèque dédiée aux brand icons** plutôt que de détourner une icône Lucide générique.

Lucide doit rester la bibliothèque principale pour les icônes d'interface.

Exemple :

```text
Interface :
Lucide

Marques :
Brand Icons / SVG officiel
```

---

# 14. Système d'espacement

Utiliser une échelle basée sur 4px.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
120px
```

### Usage

```text
4   → micro espacement
8   → icon + texte
12  → éléments compacts
16  → padding standard
24  → cartes
32  → blocs
48  → sections internes
64  → sections
80+ → grands espaces Hero
```

La landing page doit conserver beaucoup d'espace blanc.

---

# 15. Border Radius

Le design utilise des formes légèrement arrondies.

```text
xs: 6px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
pill: 9999px
```

### Recommandations

Boutons :

```text
9999px
```

Cartes :

```text
16px à 20px
```

Inputs :

```text
10px à 12px
```

Images :

```text
16px à 24px
```

---

# 16. Ombres

Les ombres doivent rester très discrètes.

## Shadow Small

```css
box-shadow:
  0 1px 2px rgba(15, 23, 42, 0.05);
```

## Shadow Medium

```css
box-shadow:
  0 8px 24px rgba(15, 23, 42, 0.08);
```

## Shadow Large

```css
box-shadow:
  0 20px 50px rgba(15, 23, 42, 0.10);
```

Ne pas utiliser plusieurs ombres simultanément sur le même composant.

---

# 17. Boutons

## Primary Button

Exemple :

```text
🛒 Commander
```

Style :

```text
background: #FFB82E
color: #050505
font-weight: 600
border-radius: 9999px
padding: 14px 24px
```

Hover :

```text
background: #F4A91F
```

---

## Secondary Button

Fond blanc.

```text
background: #FFFFFF
color: #111827
border: 1px solid #E2E8F0
border-radius: 9999px
```

Exemple :

```text
💬 Commander sur WhatsApp
```

---

## Ghost Button

```text
background: transparent
color: #111827
```

Hover :

```text
background: #F8FAFC
```

---

# 18. Boutons avec icône

Icône à gauche :

```text
[ icon ] Texte
```

Espacement :

```text
8px
```

Icône :

```text
18px
```

Ne pas mettre systématiquement une icône si elle n'apporte pas d'information.

---

# 19. Header

Le header doit rester très minimal.

Structure :

```text
┌─────────────────────────────────────────────────────┐
│ AVIS+       Accueil  Produits  Comment ça marche ? │
│                         Réalisations FAQ Contact    │
│                                      [Commander]    │
└─────────────────────────────────────────────────────┘
```

Hauteur recommandée :

```text
80px à 88px
```

Desktop :

- logo à gauche ;
- navigation centrée ;
- CTA à droite.

Mobile :

```text
Logo                       Menu
```

---

# 20. Navigation active

L'élément actif possède :

- texte sombre ;
- petit indicateur jaune/orange sous le lien.

Exemple :

```text
Accueil
───────
```

Indicateur :

```text
2px
```

---

# 21. Hero

Le Hero doit être très aéré.

Layout desktop :

```text
50% texte
50% visuel
```

Contenu :

```text
Eyebrow

Titre principal

Description

Features courtes

CTA principal + CTA secondaire
```

Le visuel produit est placé à droite.

---

# 22. Hero — hiérarchie

Exemple :

```text
PLUS D’AVIS + PLUS DE VISIBILITÉ

Faites découvrir
votre entreprise
sur Google

Facilitez à vos clients...

[ Voir nos produits ]
[ Commander sur WhatsApp ]
```

Le titre est l'élément le plus visible après le logo.

---

# 23. Hero Visual

Le visuel peut montrer :

- plaque Avis+ ;
- QR Code ;
- NFC ;
- smartphone ;
- page digitale.

La composition doit rester réaliste et premium.

Éviter :

- trop de produits ;
- trop de texte ;
- interfaces complexes ;
- décorations inutiles.

---

# 24. Feature strip

Sous le Hero :

```text
Simple et efficace
Matériel de qualité
Configuration incluse
Service local
```

Chaque élément possède :

- une icône ;
- un titre ;
- une courte description.

Exemple :

```text
⚡
Simple et efficace

Un seul scan pour accéder
à tout.
```

---

# 25. Cartes

Style :

```text
background: #FFFFFF
border: 1px solid #E2E8F0
border-radius: 20px
```

Padding :

```text
24px
```

Hover :

- translation verticale très légère ;
- ombre subtile ;
- transition 180–250ms.

---

# 26. Cards produit

Structure :

```text
Image

Nom produit

Courte description

Prix

Caractéristiques

[ Commander ]
```

Prix :

```text
font-size: 28px;
font-weight: 700;
```

Devise :

```text
FCFA
```

---

# 27. Page digitale client `/p/[slug]`

Cette page doit utiliser le même langage visuel mais être plus compacte.

Structure :

```text
Logo

Nom entreprise
Catégorie
Ville

[ ⭐ Avis Google ]

Réseaux sociaux

[ Facebook ]
[ Instagram ]
[ TikTok ]

[ 💬 WhatsApp ]

[ 📍 Google Maps ]

[ 🌐 Site web ]

AVIS+
```

---

# 28. Page digitale — principes

Mobile-first.

Largeur maximale :

```text
480px
```

Padding mobile :

```text
20px
```

Boutons :

```text
width: 100%;
min-height: 52px;
```

Chaque action doit être facilement accessible au doigt.

---

# 29. Formulaires

Inputs :

```text
height: 48px à 52px
border: 1px solid #E2E8F0
border-radius: 10px
padding: 0 14px
```

Focus :

```text
border-color: #FFB82E
box-shadow:
0 0 0 3px rgba(255,184,46,0.15);
```

Labels :

```text
14px
font-weight: 600
```

---

# 30. États

Chaque composant doit prévoir :

```text
default
hover
focus
active
disabled
loading
error
success
```

---

# 31. Badges

### Success

Fond :

```text
#DCFCE7
```

Texte :

```text
#166534
```

### Warning

Fond :

```text
#FEF3C7
```

Texte :

```text
#92400E
```

### Error

Fond :

```text
#FEE2E2
```

Texte :

```text
#991B1B
```

---

# 32. Animations

Les animations doivent être discrètes.

Durées :

```text
Fast: 150ms
Normal: 200ms
Slow: 300ms
```

Easing :

```text
ease-out
```

Effets autorisés :

- fade ;
- translate 4–8px ;
- scale très léger ;
- hover ;
- apparition au scroll.

Éviter :

- rotations permanentes ;
- bouncing ;
- animations longues ;
- effets flashy.

---

# 33. Responsive

## Desktop

```text
≥ 1280px
```

Hero en deux colonnes.

## Tablet

```text
768px – 1279px
```

Réduction des tailles et espacement.

## Mobile

```text
< 768px
```

Tout devient vertical.

Header :

```text
logo + menu
```

Hero :

```text
texte
CTA
visuel
```

Feature strip :

```text
1 colonne ou 2 colonnes
```

---

# 34. Container

Desktop :

```css
max-width: 1280px;
margin: 0 auto;
padding-inline: 32px;
```

Tablet :

```text
24px
```

Mobile :

```text
20px
```

---

# 35. Grilles

Produits desktop :

```text
3 colonnes
```

Tablet :

```text
2 colonnes
```

Mobile :

```text
1 colonne
```

---

# 36. Z-index

```text
base: 0
content: 10
header: 50
dropdown: 100
modal: 200
toast: 300
```

---

# 37. Accessibilité

Obligatoire :

- contraste suffisant ;
- focus visible ;
- navigation clavier ;
- `aria-label` pour les icônes seules ;
- textes alternatifs pour les images ;
- boutons réellement accessibles ;
- taille tactile minimale recommandée de 44px.

---

# 38. Icon Button

Pour les boutons uniquement composés d'une icône :

```tsx
<button
  aria-label="Ouvrir le menu"
>
  <Menu size={20} />
</button>
```

Ne jamais laisser une icône seule sans indication accessible.

---

# 39. Architecture des composants

Structure recommandée :

```text
components/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   └── icon-button.tsx
│
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   └── container.tsx
│
├── marketing/
│   ├── hero.tsx
│   ├── feature-strip.tsx
│   ├── product-card.tsx
│   ├── faq.tsx
│   └── cta.tsx
│
├── digital-page/
│   ├── profile-header.tsx
│   ├── social-links.tsx
│   ├── action-button.tsx
│   └── digital-page.tsx
│
└── admin/
    ├── sidebar.tsx
    ├── stat-card.tsx
    └── data-table.tsx
```

---

# 40. Tokens CSS

Exemple :

```css
:root {
  --color-black: #050505;
  --color-text: #475569;
  --color-muted: #64748b;

  --color-border: #e2e8f0;
  --color-surface: #ffffff;
  --color-surface-soft: #f8fafc;

  --color-primary: #ffb82e;
  --color-primary-hover: #f4a91f;
  --color-primary-light: #fff4d8;
  --color-primary-dark: #c98200;

  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-error: #dc2626;
  --color-info: #2563eb;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-pill: 9999px;
}
```

---

# 41. Tailwind

Les tokens doivent être exposés dans la configuration du projet afin que les développeurs utilisent les tokens Avis+ plutôt que des couleurs arbitraires.

Exemples :

```text
bg-avis-primary
text-avis-black
text-avis-muted
border-avis-border
bg-avis-surface-soft
```

Éviter :

```text
bg-red-500
text-blue-600
```

sauf pour les états fonctionnels lorsqu'ils sont explicitement définis dans le design system.

---

# 42. Règles de contenu

Ton :

- direct ;
- professionnel ;
- simple ;
- rassurant ;
- humain.

Préférer :

> Un seul scan pour accéder à tout.

Plutôt que :

> Une solution révolutionnaire de transformation digitale omnicanale.

Préférer :

> Nous configurons votre support et nous l'installons chez vous.

Plutôt que :

> Une technologie NFC de dernière génération.

---

# 43. CTA principaux

Vocabulaire recommandé :

```text
Commander
Voir nos produits
Commander sur WhatsApp
Découvrir Avis+
Voir comment ça marche
```

Éviter des CTA vagues :

```text
Cliquez ici
En savoir plus
Soumettre
```

lorsqu'un libellé plus précis est possible.

---

# 44. Règle d'or du design Avis+

Chaque écran doit répondre rapidement à trois questions :

### 1. Qu'est-ce que c'est ?

**Un support NFC + QR pour votre entreprise.**

### 2. Comment ça fonctionne ?

**Un scan → votre page digitale.**

### 3. Que dois-je faire ?

**Commander.**

Si un écran ne permet pas de comprendre cela facilement, il doit être simplifié.

---

# 45. Résumé des choix

| Élément | Choix |
|---|---|
| Police | Inter |
| Icônes UI | Lucide / lucide-react |
| Icônes marques | SVG/Brand Icons officiels |
| Couleur principale | `#FFB82E` |
| Noir | `#050505` |
| Texte | `#475569` |
| Muted | `#64748B` |
| Bordure | `#E2E8F0` |
| Fond | `#FFFFFF` |
| Fond soft | `#F8FAFC` |
| Radius boutons | `9999px` |
| Radius cartes | `16–20px` |
| Style | Minimal / Premium / Local |
| Layout | Beaucoup d'espace blanc |
| Responsive | Mobile-first |
| Animation | Subtile |
| UI | Simple et fonctionnelle |

---

# 46. Règle finale

**Avis+ doit avoir l'apparence d'un service professionnel moderne, pas d'une application compliquée.**

Le design doit donner l'impression que :

> **Avis+ s'occupe de tout.**

Le client commande.

Avis+ configure.

Avis+ installe.

Le client utilise.

