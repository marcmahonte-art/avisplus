# Guide — Créer la page digitale d'un client selon sa catégorie

> **À quoi sert ce document.** C'est la fiche de travail à utiliser devant un client.
> Elle relie trois choses : la **catégorie** du commerce, les **informations** à collecter,
> et la **saisie** dans le back-office Avis+. Suivez les étapes dans l'ordre.

---

## ⚠️ État actuel à connaître avant de commencer

| Élément | État |
|---|---|
| Saisie du formulaire, validation, classement par catégorie | ✅ Fonctionnel |
| **Enregistrement en base de données** | ⏳ Non branché — le formulaire valide mais **n'enregistre rien** |
| Upload du logo et de la photo de couverture | ⏳ Non branché |
| Saisie des réseaux sociaux | ⏳ Non branché (affichage seul) |
| Saisie du menu / catalogue / avis clients | ⏳ Non branché |

**Conséquence pratique :** tant que la base de données n'est pas branchée, utilisez ce guide pour
**collecter et préparer** les informations du client. La saisie deviendra réelle dès le branchement.

---

## Étape 1 — Identifier la catégorie et en déduire le template

Un seul choix conditionne toute la page : le **template**. Il détermine l'ordre des sections,
le titre du catalogue et son mode d'affichage.

### Comment choisir la catégorie

1. Demandez au client **son activité principale en un mot** (« restaurant », « salon de coiffure », « garage »).
2. Cherchez ce mot dans le tableau ci-dessous.
3. Si le client a plusieurs activités, retenez **celle qui amène le plus de clients sur place**.

### Tableau de correspondance

| Catégorie | Template à choisir | Titre du catalogue | Affichage | Exemples de sous-catégories |
|---|---|---|---|---|
| **Restauration** | `restaurant` | Notre menu | Grille illustrée | Restaurants, Maquis, Bars, Cafés, Fast-foods, Pâtisseries, Traiteurs |
| **Hôtellerie** | `hotel` | Nos chambres | Liste détaillée | Hôtels, Auberges, Guesthouses, Résidences meublées |
| **Beauté et soins esthétiques** | `beaute` | Nos prestations | Liste détaillée | Salons de coiffure, Barbiers, Instituts, Spas, Ongleries |
| **Mode et habillement** | `boutique` | Nos collections | Grille illustrée | Boutiques de vêtements, Couture, Chaussures, Tissus |
| **Cosmétiques et parfumerie** | `boutique` | Nos collections | Grille illustrée | Parfumeries, Boutiques de cosmétiques, Produits capillaires |
| **Commerces spécialisés** | `boutique` | Nos collections | Grille illustrée | Bijouteries, Opticiens, Fleuristes, Librairies, Mobilier, Téléphonie |
| **Commerce de détail** | `boutique` | Nos collections | Grille illustrée | Supermarchés, Épiceries, Électroménager, Décoration, Jouets |
| **Agriculture et agroalimentaire** | `boutique` | Nos collections | Grille illustrée | Fermes, Coopératives, Boucheries, Produits locaux |
| **Santé** | `professionnel` | Nos prestations | Liste détaillée | Cliniques, Pharmacies, Dentistes, Laboratoires, Vétérinaires |
| **Immobilier** | `professionnel` | Nos prestations | Liste détaillée | Agences, Promoteurs, Gestion locative, Coworking |
| **Automobile et mobilité** | `professionnel` | Nos prestations | Liste détaillée | Garages, Concessionnaires, Lavage, Motos, Auto-écoles |
| **Finance, assurance et juridique** | `professionnel` | Nos prestations | Liste détaillée | Banques, Assurances, Comptables, Avocats, Notaires |
| **Éducation et formation** | `professionnel` | Nos prestations | Liste détaillée | Écoles, Universités, Centres de formation, Écoles de langues |
| **Voyage et tourisme** | `professionnel` | Nos prestations | Liste détaillée | Agences de voyage, Tour-opérateurs, Guides, Billetteries |
| **Événementiel** | `professionnel` | Nos prestations | Liste détaillée | Wedding planners, Décorateurs, Salles, Traiteurs |
| **Communication, médias et création** | `professionnel` | Nos prestations | Liste détaillée | Agences, Graphistes, Studios photo/vidéo, Imprimeries |
| **BTP, construction et habitat** | `professionnel` | Nos prestations | Liste détaillée | Construction, Architectes, Menuiserie, Électricité, Matériaux |
| **Transport, livraison et logistique** | `professionnel` | Nos prestations | Liste détaillée | Transport, Livraison, Coursiers, Déménagement, Taxis |
| **Technologie et numérique** | `professionnel` | Nos prestations | Liste détaillée | Agences web, Développeurs, Infogérance, Réseaux |
| **Services aux particuliers** | `professionnel` | Nos prestations | Liste détaillée | Nettoyage, Pressing, Jardinage, Sécurité, Dépannage |
| **Animaux** | `professionnel` | Nos prestations | Liste détaillée | Vétérinaires, Animaleries, Toilettage, Pension |
| **Loisirs, sport et divertissement** | `professionnel` | Nos prestations | Liste détaillée | Salles de sport, Piscines, Cinémas, Cybercafés |
| **Services professionnels B2B** | `professionnel` | Nos prestations | Liste détaillée | Conseil, RH, Comptabilité, Marketing, Coworking |
| **Associations, ONG et organisations** | `professionnel` | Nos prestations | Liste détaillée | ONG, Associations, Fondations, Centres sociaux |

### Ordre des sections selon le template

| Template | Ordre des blocs sur la page |
|---|---|
| `restaurant` · `beaute` | Bandeau → actions rapides → **catalogue** → avis Google → réseaux sociaux → informations → bouton final |
| `boutique` · `hotel` | Bandeau → actions rapides → **catalogue** → avis Google → bouton final → réseaux sociaux → informations |
| `professionnel` | Bandeau → actions rapides → **catalogue** → réseaux sociaux → avis Google → informations → bouton final |

> Le template `boutique` et `hotel` remontent le bouton d'action avant les réseaux sociaux :
> le visiteur est poussé à agir (WhatsApp, réservation) avant de quitter la page.

---

## Étape 2 — Fiche de collecte client

À remplir **avec le client**, en une seule visite. Durée moyenne : 20 à 30 minutes.

### Bloc 1 — Identité *(tout est obligatoire)*

| À demander | Où le trouver | Exemple |
|---|---|---|
| Nom commercial exact | Enseigne, registre | `Le Terroir` |
| Slug (URL) | À générer depuis le nom | `le-terroir` |
| Catégorie | Tableau de l'étape 1 | `Restauration` |
| Sous-catégorie | Tableau de l'étape 1 | `Grillades` |
| Template | Déduit de la catégorie | `restaurant` |
| Accroche (1 phrase, 10 mots max) | À formuler avec le client | `Une cuisine authentique au goût du terroir.` |
| Description (2–3 phrases) | À rédiger ensemble | Spécialités, particularité, ambiance |

> **Règle du slug** : lettres minuscules, chiffres et tirets uniquement. Pas d'accent, pas d'espace.
> ⚠️ **Le slug définit l'URL gravée dans le QR Code et la puce NFC.** Le choisir une fois, et ne
> plus jamais le changer. En cas d'erreur, désactiver la page plutôt que renommer le slug.

### Bloc 2 — Contact

| À demander | Remarque |
|---|---|
| Téléphone fixe ou mobile | Format international : `+226 …` |
| **WhatsApp** | Indispensable — c'est le canal principal du marché |
| Email | Facultatif |

### Bloc 3 — Localisation

| À demander | Remarque |
|---|---|
| Ville | `Ouagadougou` par défaut |
| Adresse | Rue, quartier, point de repère |
| **Lien Google Maps** | Ouvrir la fiche Google du client → Partager → Copier le lien |
| Horaires | `Lundi – Samedi · 8h00 – 19h00` |

### Bloc 4 — Avis Google *(le plus important commercialement)*

| À demander | Comment l'obtenir |
|---|---|
| **URL « laisser un avis »** | Fiche Google du client → bouton « Demander des avis » → copier le lien court (`g.page/r/…`) |

> ⚠️ **Ne jamais promettre d'avis garantis ni filtrer les clients mécontents.** Le bouton Google
> doit être accessible à tous, sans condition. C'est une obligation légale et une règle Avis+.

Si le client **n'a pas de fiche Google** : c'est une opportunité — proposez de la créer avant
d'installer le support. Sans fiche, le QR n'a nulle part où envoyer le client.

### Bloc 5 — Réseaux sociaux

| À demander | Remarque |
|---|---|
| Facebook, Instagram, TikTok | Récupérer les URL complètes des pages |
| Site web | S'il existe |

### Bloc 6 — Visuels à récupérer

| À demander | Format attendu |
|---|---|
| Logo | PNG transparent si possible |
| Photo de couverture | Photo du lieu ou du produit phare, format paysage |

### Bloc 7 — Contenu du catalogue

C'est ce qui remplit le corps de la page. **Demandez les tarifs** : une page sans prix perd
la moitié de son intérêt.

| Template | Ce qu'on collecte | Quantité conseillée |
|---|---|---|
| `restaurant` | Plats avec prix, classés par catégories (Entrées, Grillades, Boissons) | 8 à 15 plats |
| `hotel` | Types de chambres, prix par nuit, équipements | 3 à 6 chambres |
| `beaute` | Prestations avec durée et prix | 6 à 12 prestations |
| `boutique` | Produits ou collections avec prix | 6 à 20 articles |
| `professionnel` | Services proposés, avec fourchette de prix ou « sur devis » | 4 à 10 services |

---

## Étape 3 — Saisie dans le back-office

**Chemin :** `avisplus-psi.vercel.app/admin/login` → **Pages digitales** → **« Nouvelle page digitale »**

### Correspondance fiche → formulaire

| Section du formulaire | Champs à remplir | Source |
|---|---|---|
| **Identité** | Nom, Slug, Catégorie, Sous-catégorie, Template, Accroche, Description | Bloc 1 |
| **Contact** | Téléphone, WhatsApp, Email | Bloc 2 |
| **Localisation** | Ville, Adresse, Lien Google Maps, Horaires | Bloc 3 |
| **Avis Google et site web** | URL Google Avis, Site web, **Statut** | Blocs 4 et 5 |
| **Apparence et indexation** | Couleur principale, Couleur secondaire, Indexation | À laisser par défaut sauf demande |

### Réglages à ne pas rater

| Réglage | Valeur à mettre | Pourquoi |
|---|---|---|
| **Statut** | `Brouillon` pendant la préparation, puis `Active` | Une page en brouillon renvoie une 404 : rien n'est public tant que ce n'est pas prêt |
| **Indexation Google** | `Autoriser` (sauf refus du client) | Rend la page trouvable dans les recherches |
| **Couleur principale** | `#FFB82E` par défaut | Couleur Avis+ — ne changer que sur demande explicite |
| **Sous-catégorie** | Toujours la remplir | C'est ce qui classe la page dans le bon groupe du back-office |

---

## Étape 4 — Vérifier la page avant de la livrer

Une fois la page active, ouvrez son URL `/p/<slug>` et contrôlez ces 6 points :

1. Le nom et l'accroche s'affichent correctement
2. Le **bouton Google** ouvre bien la page d'avis du client (pas une page générique)
3. Le bouton **WhatsApp** ouvre une conversation avec le bon numéro
4. Les **réseaux sociaux** pointent vers les bonnes pages
5. Le **plan Google Maps** mène au bon emplacement
6. La page s'affiche bien **sur téléphone** (c'est 95 % de l'usage)

> Testez toujours depuis un vrai téléphone, en scannant le QR Code. C'est la seule
> vérification qui compte vraiment.

---

## Étape 5 — Finaliser : QR Code, NFC, installation

| Ordre | Action | Où |
|---|---|---|
| 1 | Générer le QR Code (SVG pour l'impression, PNG pour le web) | `/admin/qr` |
| 2 | Programmer la puce NFC avec la même URL | `/admin/nfc` |
| 3 | Planifier l'installation chez le client | `/admin/installations` |
| 4 | Cocher la checklist : QR testé, NFC testé, page testée, client informé | `/admin/installations` |
| 5 | Prendre une photo avant / après et marquer l'installation terminée | `/admin/installations` |

> **Le QR Code et la puce NFC encodent toujours `/p/<slug>`** — jamais directement Google.
> C'est ce qui permet de modifier la page plus tard sans réimprimer le support.

---

## Annexe A — Quel produit Avis+ proposer

| Catégorie du client | Produit à proposer en priorité |
|---|---|
| Restaurant, Fast-food, Café | Pack Commerce (QR Avis + Menu) |
| Bar, Lounge | Carte ou Plaque (QR Avis + Réseaux sociaux) |
| Boulangerie, Pâtisserie | Pack Commerce (QR Avis + Catalogue) |
| Salon de coiffure, Barbier | Plaque (QR Avis + Services + WhatsApp) |
| Institut de beauté, Spa | Plaque (QR Avis + Services + Réservation) |
| Boutique, Commerce de détail | Pack Commerce (QR Avis + Catalogue + WhatsApp) |
| Hôtel, Résidence | Plaque (QR Avis + Réservation + Réseaux) |
| Pharmacie, Clinique | Plaque (QR Avis + Contact + Maps) |
| Garage, Automobile | Plaque (QR Avis + Services + WhatsApp) |
| Agence immobilière | Plaque (Profil + Catalogue + WhatsApp) |
| École, Centre de formation | Plaque (Profil + Formations + Contact) |
| Salle de sport | Carte (Profil + Services + WhatsApp) |
| Photographe, Studio | Carte (Profil + Portfolio + WhatsApp) |
| ONG, Association | Carte (Profil + Contact) |

**Rappel des tarifs :** Sticker 5 000 · Carte 7 500 · Plaque 25 000 · Pack Commerce 45 000 FCFA.

---

## Annexe B — Message WhatsApp de collecte

À envoyer au client avant la visite :

```text
Bonjour [Nom], c'est [Votre prénom] d'Avis+.

Pour préparer votre page digitale, j'ai besoin de quelques éléments :

1. Le nom exact de votre entreprise
2. Votre numéro WhatsApp
3. Votre adresse et un point de repère
4. Le lien Google pour laisser un avis (je peux vous aider à le trouver)
5. Vos réseaux sociaux (Facebook, Instagram, TikTok)
6. Votre logo et une belle photo de votre commerce
7. Votre menu / vos tarifs / la liste de vos services

Vous pouvez tout m'envoyer ici, ou je passe vous voir.
```

---

## Annexe C — Erreurs à éviter

| Erreur | Conséquence | À faire |
|---|---|---|
| Changer le slug après installation | Le QR Code et la puce NFC ne fonctionnent plus | Désactiver la page au lieu de renommer |
| Laisser la page en `Brouillon` | Le client scanne et tombe sur une 404 | Passer en `Active` **avant** de livrer |
| Oublier le lien d'avis Google | Le bouton principal ne mène nulle part | Le tester depuis un téléphone |
| Promettre des avis garantis | Illégal et contraire à la charte Google | Le bouton reste ouvert à tous |
| Ne pas remplir la sous-catégorie | La page n'apparaît pas dans le bon groupe | Toujours la renseigner |
| Saisir un slug avec accent ou majuscule | URL invalide, rejetée par le formulaire | Minuscules, chiffres et tirets uniquement |
| Ne pas collecter les prix | Page peu utile, client déçu | Demander systématiquement les tarifs |

---

## Fichiers de référence dans le projet

| Fichier | Contenu |
|---|---|
| `categorie.md` | Référentiel complet des catégories et sous-catégories de prospection |
| `src/lib/categories.ts` | Référentiel utilisé par l'application (24 catégories) |
| `src/lib/mock/products.ts` | Produits Avis+ et tarifs |
| `CAHIER_DES_CHARGES_AVIS_PLUS_V1.md` | Spécification fonctionnelle complète |
| `DESIGN_SYSTEM_AVIS_PLUS.md` | Règles visuelles (couleurs, typographie, composants) |
