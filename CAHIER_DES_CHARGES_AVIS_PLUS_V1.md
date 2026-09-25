# AVIS+ — Cahier des charges fonctionnel et technique
## Nouvelle version — Plateforme de supports NFC/QR + pages digitales d'entreprise

**Version : 1.0**  
**Date : septembre 2026**  
**Cible : Burkina Faso — lancement initial à Ouagadougou puis extension nationale**

---

# 1. Vision du projet

Avis+ devient une plateforme simple de vente et de gestion de supports physiques connectés destinés aux entreprises, commerces et professionnels.

Le produit principal n'est plus un SaaS complexe nécessitant un compte client. Avis+ fonctionne comme une combinaison :

- catalogue de produits ;
- commande en ligne ;
- configuration par l'équipe Avis+ ;
- installation chez le client ;
- page digitale personnalisée ;
- QR Code et NFC reliés à cette page.

### Proposition de valeur

> **Avis+ — Votre entreprise, un seul scan.**

Une plaque, une carte ou un sticker Avis+ permet à un client de scanner un QR Code ou d'approcher son téléphone d'une puce NFC pour accéder à la page digitale de l'entreprise.

Cette page peut proposer :

- avis Google ;
- réseaux sociaux ;
- WhatsApp ;
- téléphone ;
- Google Maps ;
- site web ;
- autres liens utiles.

Le client final n'a pas besoin de créer un compte Avis+.

---

# 2. Principe général

Le fonctionnement cible est :

```text
CLIENT PROFESSIONNEL
       |
       | commande
       v
   SITE AVIS+
       |
       v
 COMMANDE REÇUE
       |
       v
ÉQUIPE AVIS+
       |
       +--> crée le profil digital
       +--> génère l'URL
       +--> génère le QR Code
       +--> configure la puce NFC
       +--> prépare le support
       |
       v
 INSTALLATION CHEZ LE CLIENT
       |
       v
CARTE / PLAQUE / STICKER
       |
       +--> QR Code
       |
       +--> NFC
       |
       v
PAGE DIGITALE AVIS+
       |
       +-----------------------------+
       |        |        |           |
       v        v        v           v
    Google   Réseaux  WhatsApp    Maps/Site
```

---

# 3. Objectifs

## 3.1 Objectifs business

- Vendre des supports NFC + QR personnalisés.
- Fournir une installation locale.
- Simplifier la présence digitale des entreprises.
- Créer une page digitale par entreprise.
- Éviter la complexité d'un SaaS au lancement.
- Générer progressivement des revenus complémentaires grâce aux packs, personnalisations et services.

## 3.2 Objectifs produit

- Aucun compte obligatoire pour le client professionnel.
- Parcours de commande court.
- Gestion centralisée depuis un back-office.
- Une URL stable par entreprise.
- Un QR Code stable.
- Une puce NFC stable.
- Possibilité de modifier les liens sans remplacer le support physique.
- Interface mobile-first pour la page publique.

---

# 4. Positionnement

Avis+ ne doit pas être présenté uniquement comme un produit de collecte d'avis.

Positionnement recommandé :

> **Avis+ est une identité digitale physique pour les entreprises.**

Le support physique devient une passerelle entre le commerce physique et les services numériques de l'entreprise.

### Exemple

Un restaurant possède une plaque :

```text
Avis+
Le Délice

[ QR CODE ]  [ NFC ]

Un seul scan.
Retrouvez-nous en ligne.
```

Le scan ouvre :

```text
avisplus.bf/p/le-delice
```

La page contient :

- Laisser un avis Google
- Facebook
- Instagram
- TikTok
- WhatsApp
- Google Maps
- Site web
- Téléphone

---

# 5. Produits de lancement

La V1 doit rester limitée.

## 5.1 Carte Avis+

Carte au format carte de visite.

Fonctions :

- QR Code ;
- NFC ;
- logo ;
- nom de l'entreprise ;
- URL Avis+.

Cible :

- commerciaux ;
- coiffeurs ;
- livreurs ;
- artisans ;
- vendeurs ;
- indépendants.

---

## 5.2 Plaque Avis+

Support principal.

Utilisation :

- comptoir ;
- réception ;
- restaurant ;
- salon ;
- boutique ;
- hôtel ;
- cabinet ;
- agence.

Caractéristiques :

- QR Code ;
- NFC ;
- personnalisation ;
- support vertical ou mural selon modèle.

---

## 5.3 Sticker Avis+

Version autocollante.

Utilisation :

- vitrine ;
- caisse ;
- emballage ;
- véhicule ;
- menu ;
- comptoir.

---

## 5.4 Pack Commerce

Exemple :

- 1 plaque ;
- 2 cartes ;
- personnalisation ;
- configuration ;
- création de page digitale ;
- installation.

Le contenu et le prix définitifs sont administrables depuis le back-office.

---

# 6. Fonctionnement du QR Code

Le QR Code ne doit pas pointer directement vers Google.

Il doit pointer vers une URL Avis+ stable :

```text
https://avisplus.bf/p/le-delice
```

Cette URL redirige ou affiche la page digitale du client.

Avantage :

- le client ne change jamais son QR Code ;
- les liens peuvent être modifiés ;
- les réseaux sociaux peuvent être remplacés ;
- de nouvelles fonctionnalités peuvent être ajoutées ;
- les statistiques peuvent être ajoutées ultérieurement.

---

# 7. Fonctionnement NFC

La puce NFC doit contenir la même URL que le QR Code :

```text
https://avisplus.bf/p/le-delice
```

Le comportement attendu :

```text
Approche du smartphone
        ↓
Détection NFC
        ↓
Ouverture de l'URL
        ↓
Page digitale Avis+
```

La programmation NFC est réalisée par Avis+ avant l'installation.

Prévoir une fonction de reprogrammation en cas de besoin.

---

# 8. Page digitale publique

Route :

```text
/p/[slug]
```

Exemples :

```text
/p/le-delice
/p/salon-awa
/p/garage-wend-kuni
```

## 8.1 Contenu

La page doit pouvoir afficher :

- logo ;
- nom ;
- catégorie ;
- description ;
- photo de couverture optionnelle ;
- bouton Google Avis ;
- réseaux sociaux ;
- WhatsApp ;
- téléphone ;
- Google Maps ;
- site web ;
- autres liens ;
- horaires optionnels ;
- adresse ;
- mentions légales optionnelles.

---

# 9. Exemple de page

```text
┌─────────────────────────────┐
│          [ LOGO ]           │
│                             │
│        LE DÉLICE            │
│      Restaurant & Grill     │
│                             │
│      Ouagadougou, BF        │
│                             │
│ ┌─────────────────────────┐ │
│ │ ⭐ LAISSER UN AVIS      │ │
│ │        GOOGLE           │ │
│ └─────────────────────────┘ │
│                             │
│       RETROUVEZ-NOUS        │
│                             │
│   Facebook  Instagram TikTok│
│                             │
│ ┌─────────────────────────┐ │
│ │ 💬 Nous contacter       │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 📍 Voir sur Google Maps │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🌐 Notre site web       │ │
│ └─────────────────────────┘ │
│                             │
│          AVIS+              │
└─────────────────────────────┘
```

---

# 10. Règle importante concernant les avis

Avis+ doit faciliter la demande d'avis authentiques.

Le produit ne doit pas promettre :

- des avis positifs garantis ;
- une note Google garantie ;
- une augmentation garantie du classement Google.

Éviter les mécanismes destinés à filtrer les clients satisfaits vers Google et les clients insatisfaits vers un canal privé uniquement.

Le bouton Google doit permettre au client de partager librement son expérience.

---

# 11. Site public Avis+

## 11.1 `/`

Page d'accueil.

Sections :

1. Hero
2. Présentation du concept
3. Comment ça marche
4. Produits
5. Exemple de page digitale
6. Avantages
7. Entreprises équipées
8. FAQ
9. CTA
10. Footer

CTA principaux :

- Commander
- Voir les produits
- Commander sur WhatsApp

---

# 12. Page `/produits`

Catalogue.

Chaque produit possède :

- photo ;
- nom ;
- description ;
- prix ;
- caractéristiques ;
- options ;
- délai indicatif ;
- bouton Commander.

Filtres éventuels :

- Carte ;
- Plaque ;
- Sticker ;
- Packs.

---

# 13. Page `/produits/[slug]`

Exemple :

```text
/produits/plaque-avis-plus
```

Contenu :

- galerie ;
- description ;
- dimensions ;
- NFC ;
- QR Code ;
- personnalisation ;
- installation ;
- prix ;
- quantité ;
- bouton Commander.

---

# 14. Page `/comment-ca-marche`

Présenter le parcours :

```text
1. Vous commandez
       ↓
2. Nous créons votre page
       ↓
3. Nous configurons votre QR/NFC
       ↓
4. Nous préparons votre support
       ↓
5. Nous venons l'installer
       ↓
6. Vos clients scannent
```

---

# 15. Page `/realisations`

Galerie des supports installés.

Chaque réalisation peut afficher :

- photo ;
- entreprise ;
- catégorie ;
- ville ;
- type de support.

Prévoir une validation avant publication.

---

# 16. Page `/faq`

Questions :

- Comment fonctionne le NFC ?
- Dois-je installer une application ?
- Dois-je créer un compte ?
- Puis-je modifier mon Instagram ?
- Le QR Code peut-il changer ?
- Que se passe-t-il si je change de numéro ?
- Combien coûte l'installation ?
- Le support fonctionne-t-il avec Android ?
- Le support fonctionne-t-il avec iPhone ?
- Puis-je avoir plusieurs cartes ?
- Puis-je changer de fiche Google ?
- Que se passe-t-il si mon support est endommagé ?

---

# 17. Page `/contact`

Informations :

- téléphone ;
- WhatsApp ;
- email ;
- zone d'intervention ;
- formulaire ;
- horaires.

---

# 18. Page `/commander`

Formulaire de commande sans création de compte.

## Informations client

- nom de l'entreprise ;
- nom du responsable ;
- téléphone ;
- WhatsApp ;
- email optionnel ;
- ville ;
- quartier ;
- adresse.

## Produit

- produit ;
- quantité ;
- options ;
- couleur ;
- finition.

## Informations digitales

- logo ;
- lien Google Avis ;
- Facebook ;
- Instagram ;
- TikTok ;
- WhatsApp ;
- Google Maps ;
- site web ;
- autres liens.

## Installation

```text
○ Installation à Ouagadougou
○ Retrait
○ Livraison
○ Autre ville
```

Adresse d'installation :

```text
Quartier
Adresse
Indication complémentaire
```

Bouton :

> **Envoyer ma commande**

---

# 19. Confirmation de commande

Après validation :

```text
Commande reçue !

Merci pour votre commande Avis+.

Référence :
AV-2026-0001

Notre équipe vous contactera sur WhatsApp
pour confirmer les informations et
programmer l'installation.
```

Actions :

- WhatsApp ;
- retour accueil.

Pas besoin de créer un compte.

---

# 20. Back-office

Route :

```text
/admin
```

Seuls les administrateurs Avis+ peuvent y accéder.

## Menu

```text
Dashboard
Commandes
Entreprises
Pages digitales
Produits
Installations
Clients
QR Codes
NFC
Réalisations
Paramètres
```

---

# 21. Dashboard admin

Afficher :

- commandes nouvelles ;
- commandes en préparation ;
- installations à venir ;
- commandes terminées ;
- chiffre d'affaires ;
- produits vendus ;
- pages actives.

Exemple :

```text
Commandes aujourd'hui       8
En préparation              4
Installations cette semaine 6
Pages actives              127
```

---

# 22. Gestion des commandes

Statuts :

```text
NOUVELLE
↓
À CONTACTER
↓
CONFIRMÉE
↓
EN PRÉPARATION
↓
CONFIGURATION
↓
INSTALLATION PROGRAMMÉE
↓
INSTALLÉE
↓
TERMINÉE
```

Statuts secondaires :

```text
ANNULÉE
EN ATTENTE
PROBLÈME
```

Chaque commande possède une timeline.

---

# 23. Gestion des entreprises

Fiche :

```text
Entreprise
Logo
Nom
Slug
Téléphone
WhatsApp
Email
Ville
Adresse
Catégorie
Statut
Date de création
```

Actions :

- modifier ;
- désactiver ;
- prévisualiser ;
- ouvrir la page publique ;
- générer QR ;
- télécharger QR ;
- configurer NFC.

---

# 24. Gestion de la page digitale

Éditeur simple.

Sections :

### Identité

- logo ;
- nom ;
- description ;
- image.

### Contact

- téléphone ;
- WhatsApp ;
- email.

### Localisation

- adresse ;
- Google Maps.

### Réseaux

- Facebook ;
- Instagram ;
- TikTok ;
- YouTube ;
- LinkedIn.

### Avis

- URL Google Avis.

### Site

- URL site web.

### Apparence

- couleur principale ;
- couleur secondaire ;
- style de bouton ;
- modèle.

Bouton :

> **Enregistrer**

Et :

> **Prévisualiser**

---

# 25. Templates de pages

V1 : un template principal.

V2 :

```text
Template Restaurant
Template Salon
Template Hôtel
Template Boutique
Template Professionnel
```

Toutes les pages utilisent les mêmes données.

---

# 26. QR Code

Pour chaque entreprise :

```text
slug unique
        ↓
URL publique
        ↓
QR Code
```

Fonctions admin :

- générer ;
- télécharger PNG ;
- télécharger SVG ;
- copier URL ;
- prévisualiser ;
- régénérer si nécessaire.

Attention : régénérer graphiquement le QR ne doit pas changer l'URL publique.

---

# 27. NFC

Fiche NFC :

```text
Entreprise
URL
Type de puce
UID si disponible
Statut
Date de programmation
Technicien
```

Statuts :

```text
NON CONFIGURÉ
CONFIGURÉ
TESTÉ
INSTALLÉ
À REPROGRAMMER
```

---

# 28. Installation

Chaque installation contient :

- entreprise ;
- commande ;
- adresse ;
- date ;
- heure ;
- technicien ;
- téléphone ;
- statut ;
- commentaire ;
- photo avant ;
- photo après.

Statuts :

```text
À PLANIFIER
PLANIFIÉE
EN COURS
TERMINÉE
REPORTÉE
```

---

# 29. Preuve d'installation

Après installation :

- photo du support ;
- photo de l'emplacement ;
- test QR ;
- test NFC ;
- validation.

Le technicien peut cliquer :

```text
☑ QR testé
☑ NFC testé
☑ Page testée
☑ Client informé
```

Puis :

> **Installation terminée**

---

# 30. Base de données

## `businesses`

```text
id
name
slug
logo_url
cover_url
description
category
phone
whatsapp
email
address
city
google_review_url
google_maps_url
website_url
status
created_at
updated_at
```

## `social_links`

```text
id
business_id
platform
url
enabled
sort_order
created_at
updated_at
```

## `products`

```text
id
name
slug
description
price
currency
image_url
type
active
created_at
updated_at
```

## `orders`

```text
id
reference
business_id
customer_name
customer_phone
customer_whatsapp
customer_email
city
address
status
total_amount
notes
created_at
updated_at
```

## `order_items`

```text
id
order_id
product_id
quantity
unit_price
options
```

## `installations`

```text
id
order_id
business_id
scheduled_at
address
city
technician
status
notes
before_photo_url
after_photo_url
completed_at
```

## `digital_pages`

La page peut être directement liée à `businesses`, mais une table séparée est préférable si plusieurs versions/templates sont prévus.

```text
id
business_id
template
theme
is_active
created_at
updated_at
```

## `nfc_devices`

```text
id
business_id
type
uid
target_url
status
configured_at
installed_at
notes
```

## `qr_codes`

```text
id
business_id
target_url
format
status
created_at
```

## `page_events`

```text
id
business_id
event_type
created_at
user_agent
device_type
```

Événements possibles :

```text
PAGE_VIEW
GOOGLE_CLICK
FACEBOOK_CLICK
INSTAGRAM_CLICK
TIKTOK_CLICK
WHATSAPP_CLICK
MAPS_CLICK
WEBSITE_CLICK
PHONE_CLICK
```

---

# 31. Architecture technique

## Frontend

- Next.js
- App Router
- React
- TypeScript
- Tailwind CSS
- composants UI modernes
- responsive mobile-first

## Backend

- Supabase
- PostgreSQL
- Storage
- Auth uniquement pour les administrateurs

## QR

Bibliothèque QR Code compatible SVG/PNG.

## NFC

Programmation physique réalisée lors de la préparation des commandes.

Le système web stocke la destination NFC.

---

# 32. Routes

```text
/
 /produits
 /produits/[slug]
 /comment-ca-marche
 /realisations
 /faq
 /contact
 /commander

 /p/[slug]

 /admin
 /admin/login
 /admin/dashboard
 /admin/commandes
 /admin/commandes/[id]
 /admin/entreprises
 /admin/entreprises/[id]
 /admin/pages
 /admin/pages/[id]
 /admin/produits
 /admin/installations
 /admin/qr
 /admin/nfc
 /admin/realisations
 /admin/parametres
```

---

# 33. Authentification

## Client

Aucune authentification.

## Administrateur

Connexion sécurisée via Supabase Auth.

Prévoir :

- email ;
- mot de passe ;
- reset password ;
- protection des routes `/admin`.

V2 éventuellement :

- rôles ;
- technicien ;
- opérateur ;
- administrateur.

---

# 34. Responsive

La page publique doit être pensée d'abord pour téléphone.

Breakpoints :

```text
Mobile
Tablet
Desktop
```

La page `/p/[slug]` doit être particulièrement rapide.

Le contenu doit tenir dans une largeur confortable de téléphone sans donner l'impression d'une application complexe.

---

# 35. Performance

Objectifs :

- chargement rapide ;
- images optimisées ;
- lazy loading ;
- peu de JavaScript côté client ;
- page publique optimisée pour mobile ;
- QR → page en quelques secondes même avec une connexion mobile moyenne.

---

# 36. Design system

L'identité Avis+ doit être :

- professionnelle ;
- moderne ;
- locale mais pas folklorique ;
- simple ;
- rassurante ;
- facilement imprimable.

Palette de départ possible :

```text
Vert foncé
Blanc cassé
Jaune/or
Noir
Gris clair
```

Le logo fourni pourra servir de référence visuelle.

Éviter une interface trop chargée.

---

# 37. WhatsApp

WhatsApp est un canal commercial important.

CTA :

```text
Commander sur WhatsApp
```

Le bouton doit générer un message prérempli :

```text
Bonjour Avis+, je souhaite commander
le produit : Plaque Avis+.

Nom de mon entreprise :
Ville :
Quantité :
```

Pour une page client :

```text
https://wa.me/226XXXXXXXX
```

avec message prérempli optionnel.

---

# 38. Paiement

V1 :

Le système peut fonctionner sans paiement en ligne obligatoire.

Commande :

```text
Commande
↓
Confirmation WhatsApp
↓
Paiement
↓
Production
↓
Installation
```

Le back-office doit toutefois prévoir :

```text
payment_status

PENDING
PARTIAL
PAID
REFUNDED
```

Les moyens de paiement disponibles au lancement pourront être configurés selon les solutions effectivement retenues par Avis+.

---

# 39. Notifications

V1 :

- notification email à l'équipe ;
- confirmation affichée au client ;
- contact WhatsApp manuel.

V2 :

- WhatsApp automatisé ;
- SMS ;
- notifications internes ;
- rappel d'installation.

---

# 40. SEO

Pages publiques indexables si le client le souhaite.

Exemple :

```text
avisplus.bf/p/le-delice
```

SEO :

- title ;
- description ;
- Open Graph ;
- image ;
- données structurées lorsque pertinentes ;
- URL propre.

Prévoir une option :

```text
Indexation Google :
☑ Autoriser
```

---

# 41. Analytics

V1 :

- visites ;
- clics sur les boutons.

V2 :

- statistiques détaillées ;
- appareils ;
- évolution mensuelle ;
- comparaison des clics ;
- export.

Ne pas afficher de données personnelles inutiles.

---

# 42. Gestion des données

Le système doit limiter les données collectées.

Pour la page publique :

- uniquement les informations nécessaires à l'entreprise.

Pour les commandes :

- coordonnées nécessaires à la livraison/installation.

Prévoir :

- suppression ;
- désactivation ;
- export administratif si nécessaire.

---

# 43. Modèle économique

Le lancement peut reposer sur :

### Vente de produits

- Carte NFC ;
- Plaque NFC ;
- Sticker ;
- Packs.

### Services

- personnalisation ;
- installation ;
- livraison ;
- remplacement ;
- reprogrammation ;
- création de page digitale.

### Évolution possible

- profil digital avancé ;
- statistiques ;
- multi-sites ;
- gestion de plusieurs établissements.

Le modèle initial ne nécessite pas d'abonnement client obligatoire.

---

# 44. MVP — ce qui doit absolument être développé

## Public

- accueil ;
- produits ;
- détail produit ;
- commande ;
- contact ;
- FAQ ;
- page digitale `/p/[slug]`.

## Admin

- connexion ;
- dashboard ;
- commandes ;
- entreprises ;
- pages digitales ;
- produits ;
- QR Codes ;
- installations.

## Physique

- génération QR ;
- URL stable ;
- préparation NFC ;
- test ;
- installation.

---

# 45. Ce qui ne doit PAS être développé en V1

Ne pas développer au lancement :

- application mobile ;
- compte client ;
- abonnement obligatoire ;
- marketplace ;
- système de récompenses ;
- USSD ;
- IA ;
- CRM complexe ;
- chat interne ;
- programme de fidélité ;
- dashboard client complexe ;
- automatisation WhatsApp avancée ;
- système multi-pays.

Ces éléments pourront être ajoutés après validation commerciale.

---

# 46. Roadmap

## Phase 1 — MVP

```text
Catalogue
+
Commandes
+
Back-office
+
Pages digitales
+
QR
+
NFC
+
Installation
```

## Phase 2

```text
Statistiques
+
Templates
+
WhatsApp automatisé
+
Paiement en ligne
```

## Phase 3

```text
Espace client optionnel
+
Multi-établissements
+
Analytics avancés
+
Gestion d'équipe
```

## Phase 4

```text
Extension nationale
+
Partenaires
+
Revendeurs
+
Autres pays
```

---

# 47. Critères d'acceptation

Le projet V1 est considéré comme fonctionnel lorsque :

### Commande

- un visiteur peut commander sans compte ;
- une référence unique est créée ;
- la commande arrive dans le back-office ;
- son statut peut être modifié.

### Page digitale

- chaque entreprise possède une URL unique ;
- la page fonctionne sur mobile ;
- les liens sont administrables ;
- la page peut être désactivée.

### QR

- le QR ouvre la bonne page ;
- le QR peut être téléchargé ;
- changer un lien social ne nécessite pas de nouveau QR.

### NFC

- la puce ouvre la bonne URL ;
- le statut de configuration est enregistré ;
- l'installation peut être marquée comme terminée.

### Installation

- une date peut être planifiée ;
- un technicien peut être affecté ;
- le résultat peut être documenté.

---

# 48. Expérience cible

Le parcours doit pouvoir être résumé ainsi :

> **Vous commandez.**
>
> **Nous créons votre page.**
>
> **Nous configurons votre QR et votre NFC.**
>
> **Nous préparons votre support.**
>
> **Nous venons l'installer.**
>
> **Vos clients scannent.**

---

# 49. Message marketing principal

## Avis+

### Votre entreprise, un seul scan.

**Avis Google • Réseaux sociaux • WhatsApp • Google Maps • Site web**

> Une plaque. Une carte. Un scan.  
> Votre présence digitale toujours à portée de téléphone.

CTA :

**Commander mon support**

---

# 50. Prompt de réalisation OpenCode

Construire une plateforme web complète nommée **Avis+** avec Next.js App Router, React, TypeScript, Tailwind CSS et Supabase.

Le projet doit respecter le cahier des charges suivant :

1. Avis+ est une plateforme de vente de supports physiques NFC + QR Code.
2. Aucun compte client professionnel n'est requis en V1.
3. Le client commande via un formulaire.
4. L'équipe Avis+ gère les commandes depuis `/admin`.
5. Chaque entreprise possède une page digitale publique `/p/[slug]`.
6. Le QR Code et la puce NFC d'un support pointent vers cette URL Avis+.
7. Les liens de la page sont modifiables sans changer le QR Code.
8. La page peut afficher Google Avis, Facebook, Instagram, TikTok, WhatsApp, téléphone, Google Maps et site web.
9. Le back-office permet de gérer entreprises, commandes, produits, pages, QR, NFC et installations.
10. Supabase doit gérer PostgreSQL, Storage et Auth administrateur.
11. Le système doit être responsive et mobile-first.
12. Le code doit être modulaire, typé et maintenable.
13. Les données sensibles doivent être protégées avec les politiques RLS adaptées.
14. Les routes publiques `/p/[slug]` doivent être rapides.
15. Ne pas construire de compte client, application mobile ou SaaS complexe en V1.
16. Prévoir une architecture permettant d'ajouter ultérieurement statistiques, templates, paiement et espace client.

Avant de coder :
- analyser la structure du projet ;
- proposer l'architecture ;
- identifier les dépendances ;
- créer le schéma Supabase ;
- définir les routes ;
- définir les composants réutilisables ;
- puis implémenter progressivement.

Ne pas créer de fonctionnalités non demandées.
Ne pas remplacer le fonctionnement simple par une architecture SaaS complexe.
