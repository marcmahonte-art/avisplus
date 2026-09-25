"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { CategorySelect } from "@/components/admin/category-select";
import { saveBusiness, type BusinessActionState } from "@/app/admin/(protected)/entreprises/actions";
import type { BusinessCategoryDef } from "@/lib/categories";
import type { Business } from "@/lib/types";

const INITIAL: BusinessActionState = { ok: false, message: null };

/**
 * Éditeur de page digitale — cahier des charges §24.
 * Sections : identité, contact, localisation, réseaux, avis, site, apparence.
 */
export function BusinessEditor({
  business,
  categories,
}: {
  business?: Business;
  categories: readonly BusinessCategoryDef[];
}) {
  const [state, formAction, pending] = useActionState(saveBusiness, INITIAL);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {business ? <input type="hidden" name="businessId" value={business.id} /> : null}

      {/* Identité */}
      <Card className="p-6">
        <h2 className="text-h4 text-avis-black">Identité</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Nom de l'entreprise" htmlFor="biz-name" required>
            <Input id="biz-name" name="name" required defaultValue={business?.name ?? ""} />
          </Field>

          <Field
            label="Slug (URL)"
            htmlFor="biz-slug"
            required
            hint="Définit /p/[slug]. Modifier le slug change l'URL publique et invalide les QR existants."
          >
            <Input id="biz-slug" name="slug" required defaultValue={business?.slug ?? ""} />
          </Field>

          <CategorySelect
            categories={categories}
            defaultCategoryId={business?.categoryId}
            defaultSubcategory={business?.subcategory}
          />

          <Field label="Template de page" htmlFor="biz-template" required>
            <Select id="biz-template" name="template" defaultValue={business?.template ?? "professionnel"}>
              <option value="restaurant">Restaurant</option>
              <option value="beaute">Beauté / Salon</option>
              <option value="boutique">Boutique</option>
              <option value="hotel">Hôtel</option>
              <option value="professionnel">Professionnel</option>
            </Select>
          </Field>

          <Field label="Accroche" htmlFor="biz-tagline" className="sm:col-span-2">
            <Input
              id="biz-tagline"
              name="tagline"
              defaultValue={business?.tagline ?? ""}
              placeholder="Ex. Une cuisine authentique au goût du terroir."
            />
          </Field>

          <Field label="Description" htmlFor="biz-description" className="sm:col-span-2">
            <Textarea
              id="biz-description"
              name="description"
              defaultValue={business?.description ?? ""}
              placeholder="Quelques lignes présentant l'activité."
            />
          </Field>
        </div>
      </Card>

      {/* Contact */}
      <Card className="p-6">
        <h2 className="text-h4 text-avis-black">Contact</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Field label="Téléphone" htmlFor="biz-phone">
            <Input id="biz-phone" name="phone" type="tel" defaultValue={business?.phone ?? ""} />
          </Field>
          <Field label="WhatsApp" htmlFor="biz-whatsapp">
            <Input
              id="biz-whatsapp"
              name="whatsapp"
              type="tel"
              defaultValue={business?.whatsapp ?? ""}
            />
          </Field>
          <Field label="Email" htmlFor="biz-email">
            <Input id="biz-email" name="email" type="email" defaultValue={business?.email ?? ""} />
          </Field>
        </div>
      </Card>

      {/* Localisation */}
      <Card className="p-6">
        <h2 className="text-h4 text-avis-black">Localisation</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Ville" htmlFor="biz-city" required>
            <Input id="biz-city" name="city" required defaultValue={business?.city ?? "Ouagadougou"} />
          </Field>
          <Field label="Adresse" htmlFor="biz-address">
            <Input id="biz-address" name="address" defaultValue={business?.address ?? ""} />
          </Field>
          <Field label="Lien Google Maps" htmlFor="biz-maps">
            <Input
              id="biz-maps"
              name="googleMapsUrl"
              type="url"
              defaultValue={business?.googleMapsUrl ?? ""}
            />
          </Field>
          <Field label="Horaires" htmlFor="biz-hours">
            <Input
              id="biz-hours"
              name="openingHours"
              defaultValue={business?.openingHours ?? ""}
              placeholder="Ex. Tous les jours · 11h – 23h"
            />
          </Field>
        </div>
      </Card>

      {/* Avis et site */}
      <Card className="p-6">
        <h2 className="text-h4 text-avis-black">Avis Google et site web</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label="URL Google Avis"
            htmlFor="biz-review"
            className="sm:col-span-2"
            hint="Le bouton principal de la page digitale pointe vers cette URL."
          >
            <Input
              id="biz-review"
              name="googleReviewUrl"
              type="url"
              defaultValue={business?.googleReviewUrl ?? ""}
            />
          </Field>
          <Field label="Site web" htmlFor="biz-website">
            <Input
              id="biz-website"
              name="websiteUrl"
              type="url"
              defaultValue={business?.websiteUrl ?? ""}
            />
          </Field>
          <Field label="Statut de la page" htmlFor="biz-status">
            <Select id="biz-status" name="status" defaultValue={business?.status ?? "BROUILLON"}>
              <option value="ACTIVE">Active (visible publiquement)</option>
              <option value="BROUILLON">Brouillon</option>
              <option value="INACTIVE">Désactivée</option>
            </Select>
          </Field>
        </div>
      </Card>

      {/* Apparence et indexation */}
      <Card className="p-6">
        <h2 className="text-h4 text-avis-black">Apparence et indexation</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Field label="Couleur principale" htmlFor="biz-primary">
            <Input
              id="biz-primary"
              name="primaryColor"
              type="text"
              defaultValue="#FFB82E"
              placeholder="#FFB82E"
            />
          </Field>
          <Field label="Couleur secondaire" htmlFor="biz-accent">
            <Input id="biz-accent" name="accentColor" type="text" defaultValue="#C98200" />
          </Field>
          <Field label="Indexation Google" htmlFor="biz-indexing">
            <Select
              id="biz-indexing"
              name="allowIndexing"
              defaultValue={business?.allowIndexing ? "true" : "false"}
            >
              <option value="true">Autoriser l&apos;indexation</option>
              <option value="false">Ne pas indexer</option>
            </Select>
          </Field>
        </div>
      </Card>

      {state.message ? (
        <p
          role="status"
          className={
            state.ok
              ? "rounded-md bg-avis-warning-bg px-4 py-3 text-body-sm font-medium text-avis-warning-text"
              : "rounded-md bg-avis-error-bg px-4 py-3 text-body-sm font-medium text-avis-error-text"
          }
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          size="lg"
          loading={pending}
          icon={<Save size={20} strokeWidth={1.8} aria-hidden="true" />}
        >
          Enregistrer
        </Button>
        {business ? (
          <Button href={`/p/${business.slug}`} size="lg" variant="secondary" external>
            Prévisualiser la page
          </Button>
        ) : null}
      </div>
    </form>
  );
}
