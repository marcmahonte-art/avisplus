"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckboxField, Field, Input, RadioCardGroup, Select, Textarea } from "@/components/ui/input";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Formulaire de commande — cahier des charges §18.
 *
 * Aucune création de compte n'est demandée (§3). À la validation, la commande est
 * transmise à `/api/commandes`, qui renvoie une référence unique de la forme
 * `AV-2026-0001`, puis le client est redirigé vers la page de confirmation.
 *
 * En V1, la route API génère la référence côté serveur sans persistance ; avec Supabase,
 * seul le corps de cette route changera (insertion dans `orders` et `order_items`).
 */

const INSTALLATION_OPTIONS = [
  {
    value: "OUAGADOUGOU",
    label: "Installation à Ouagadougou",
    description: "Un technicien vient poser et tester votre support.",
  },
  {
    value: "RETRAIT",
    label: "Retrait",
    description: "Vous récupérez votre support à notre atelier.",
  },
  {
    value: "LIVRAISON",
    label: "Livraison",
    description: "Nous vous livrons, vous installez vous-même.",
  },
  {
    value: "AUTRE_VILLE",
    label: "Autre ville",
    description: "Nous étudions la faisabilité et le délai avec vous.",
  },
];

export function OrderForm({
  products,
  defaultProductSlug,
  defaultQuantity,
}: {
  products: Product[];
  defaultProductSlug?: string;
  defaultQuantity?: number;
}) {
  const router = useRouter();

  const initialProduct =
    products.find((product) => product.slug === defaultProductSlug) ?? products[0];

  const [productId, setProductId] = useState(initialProduct?.id ?? "");
  const [quantity, setQuantity] = useState(
    defaultQuantity && defaultQuantity > 0 ? Math.min(defaultQuantity, 50) : 1,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const product = products.find((item) => item.id === productId) ?? initialProduct;
  const total = product ? product.price * quantity : 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      productId,
      productName: product?.name ?? "",
      quantity,
      unitPrice: product?.price ?? 0,
      totalAmount: total,
    };

    setSubmitting(true);

    try {
      const response = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("La commande n'a pas pu être enregistrée.");
      }

      const data: { reference: string } = await response.json();
      router.push(`/commander/confirmation?ref=${encodeURIComponent(data.reference)}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 1 — Informations client */}
      <Card className="p-6 sm:p-8">
        <SectionTitle step={1} title="Vos informations" />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Nom de l'entreprise" htmlFor="entreprise" required>
            <Input
              id="entreprise"
              name="businessName"
              required
              autoComplete="organization"
              placeholder="Ex. Le Terroir"
            />
          </Field>

          <Field label="Nom du responsable" htmlFor="responsable" required>
            <Input
              id="responsable"
              name="customerName"
              required
              autoComplete="name"
              placeholder="Ex. Ibrahim Compaoré"
            />
          </Field>

          <Field label="Téléphone" htmlFor="telephone" required>
            <Input
              id="telephone"
              name="customerPhone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="Ex. +226 70 00 00 00"
            />
          </Field>

          <Field label="Numéro WhatsApp" htmlFor="whatsapp" required>
            <Input
              id="whatsapp"
              name="customerWhatsapp"
              type="tel"
              required
              placeholder="Ex. +226 70 00 00 00"
            />
          </Field>

          <Field label="Email" htmlFor="email" className="sm:col-span-2">
            <Input
              id="email"
              name="customerEmail"
              type="email"
              autoComplete="email"
              placeholder="Ex. contact@monentreprise.bf"
            />
          </Field>
        </div>
      </Card>

      {/* 2 — Localisation du client */}
      <Card className="p-6 sm:p-8">
        <SectionTitle step={2} title="Où êtes-vous situé ?" />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Ville" htmlFor="ville" required>
            <Input id="ville" name="city" required defaultValue="Ouagadougou" />
          </Field>

          <Field label="Quartier" htmlFor="quartier" required>
            <Input id="quartier" name="district" required placeholder="Ex. Zone du Bois" />
          </Field>

          <Field label="Adresse" htmlFor="adresse" className="sm:col-span-2" required>
            <Input
              id="adresse"
              name="address"
              required
              placeholder="Ex. Avenue Charles de Gaulle, face à la pharmacie"
            />
          </Field>
        </div>
      </Card>

      {/* 3 — Produit */}
      <Card className="p-6 sm:p-8">
        <SectionTitle step={3} title="Votre support" />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Produit" htmlFor="produit" required>
            <Select
              id="produit"
              name="productSlug"
              value={product?.slug ?? ""}
              onChange={(event) => {
                const next = products.find((item) => item.slug === event.target.value);
                setProductId(next?.id ?? "");
              }}
            >
              {products.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name} — {formatPrice(item.price)}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Quantité" htmlFor="quantite" required>
            <Input
              id="quantite"
              name="quantity"
              type="number"
              min={1}
              max={50}
              required
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
            />
          </Field>
        </div>

        {/* Options du produit sélectionné */}
        {product && product.options.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {product.options.map((option) => (
              <Field key={option.name} label={option.name} htmlFor={`option-${option.name}`}>
                <Select id={`option-${option.name}`} name={`option_${option.name}`}>
                  {option.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </Field>
            ))}
          </div>
        ) : null}

        {/* Récapitulatif du prix */}
        <p className="mt-6 flex items-baseline justify-between rounded-md bg-avis-soft px-4 py-3.5">
          <span className="text-body-sm text-avis-muted">
            Total estimé ({quantity} × {product ? formatPrice(product.price) : "—"})
          </span>
          <span className="text-h4 text-avis-black">{formatPrice(total)}</span>
        </p>
        <p className="mt-2 text-caption text-avis-muted">
          Aucun paiement en ligne n&apos;est demandé maintenant. Nous confirmons le montant et le
          mode de règlement avec vous.
        </p>
      </Card>

      {/* 4 — Informations digitales */}
      <Card className="p-6 sm:p-8">
        <SectionTitle
          step={4}
          title="Vos informations digitales"
          description="Ces liens alimenteront votre page Avis+. Vous pourrez les modifier plus tard sans changer votre QR Code."
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="Lien pour laisser un avis Google"
            htmlFor="google"
            className="sm:col-span-2"
            hint="Le lien de votre fiche Google (bouton « Demander des avis »)."
          >
            <Input
              id="google"
              name="googleReviewUrl"
              type="url"
              placeholder="https://g.page/r/…/review"
            />
          </Field>

          <Field label="Facebook" htmlFor="facebook">
            <Input id="facebook" name="facebook" type="url" placeholder="https://facebook.com/…" />
          </Field>

          <Field label="Instagram" htmlFor="instagram">
            <Input
              id="instagram"
              name="instagram"
              type="url"
              placeholder="https://instagram.com/…"
            />
          </Field>

          <Field label="TikTok" htmlFor="tiktok">
            <Input id="tiktok" name="tiktok" type="url" placeholder="https://tiktok.com/@…" />
          </Field>

          <Field label="Numéro WhatsApp de l'entreprise" htmlFor="whatsapp-entreprise">
            <Input
              id="whatsapp-entreprise"
              name="businessWhatsapp"
              type="tel"
              placeholder="Ex. +226 70 00 00 00"
            />
          </Field>

          <Field label="Lien Google Maps" htmlFor="maps">
            <Input id="maps" name="googleMapsUrl" type="url" placeholder="https://maps.app.goo.gl/…" />
          </Field>

          <Field label="Site web" htmlFor="site">
            <Input id="site" name="websiteUrl" type="url" placeholder="https://monentreprise.bf" />
          </Field>

          <Field label="Autres liens" htmlFor="autres" className="sm:col-span-2">
            <Textarea
              id="autres"
              name="otherLinks"
              placeholder="YouTube, LinkedIn, menu en PDF… un lien par ligne."
            />
          </Field>
        </div>

        <div className="mt-5">
          <CheckboxField
            id="logo-envoye"
            label="Je vous enverrai mon logo par WhatsApp après la commande"
          />
        </div>
      </Card>

      {/* 5 — Installation */}
      <Card className="p-6 sm:p-8">
        <SectionTitle step={5} title="Installation" />

        <div className="mt-6">
          <RadioCardGroup
            name="installationMode"
            options={INSTALLATION_OPTIONS}
            defaultValue="OUAGADOUGOU"
          />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Quartier d'installation" htmlFor="quartier-install">
            <Input
              id="quartier-install"
              name="installationDistrict"
              placeholder="Ex. Koulouba"
            />
          </Field>

          <Field label="Adresse d'installation" htmlFor="adresse-install">
            <Input id="adresse-install" name="installationAddress" placeholder="Rue, repère…" />
          </Field>

          <Field label="Indication complémentaire" htmlFor="indication" className="sm:col-span-2">
            <Textarea
              id="indication"
              name="installationNotes"
              placeholder="Étage, horaires d'ouverture, personne à contacter sur place…"
            />
          </Field>
        </div>
      </Card>

      {/* 6 — Notes et validation */}
      <Card className="p-6 sm:p-8">
        <SectionTitle step={6} title="Un détail à nous préciser ?" />

        <div className="mt-6">
          <Field label="Message" htmlFor="notes">
            <Textarea
              id="notes"
              name="notes"
              placeholder="Couleur souhaitée, délai particulier, plusieurs établissements…"
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <CheckboxField
            id="conditions"
            label="J'accepte qu'Avis+ me contacte par téléphone ou WhatsApp pour confirmer ma commande."
          />

          {error ? (
            <p
              role="alert"
              className="rounded-md bg-avis-error-bg px-4 py-3 text-body-sm font-medium text-avis-error-text"
            >
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={submitting}
            icon={<Send size={20} strokeWidth={1.8} aria-hidden="true" />}
            className={cn("sm:w-auto sm:self-start")}
          >
            Envoyer ma commande
          </Button>

          <p className="text-caption text-avis-muted">
            Aucun compte à créer. Vous recevrez une référence de commande immédiatement.
          </p>
        </div>
      </Card>
    </form>
  );
}

function SectionTitle({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-avis-black text-body-sm font-semibold text-white">
        {step}
      </span>
      <div className="min-w-0">
        <h2 className="text-h4 text-avis-black">{title}</h2>
        {description ? (
          <p className="mt-1 text-body-sm text-avis-text">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
