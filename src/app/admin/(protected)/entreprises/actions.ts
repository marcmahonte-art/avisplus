"use server";

import { revalidatePath } from "next/cache";

/**
 * Server actions du back-office — entreprises et pages digitales.
 *
 * ⚠️ V1 (données de démonstration) : la validation est réelle, la persistance ne l'est
 * pas encore. Avec Supabase, `saveBusiness` exécutera un `upsert` sur `businesses`
 * et `saveSocialLink` un `update` sur `social_links` (§30).
 */

export interface BusinessActionState {
  ok: boolean;
  message: string | null;
}

/** Enregistre une entreprise (création ou mise à jour). */
export async function saveBusiness(
  _previousState: BusinessActionState,
  formData: FormData,
): Promise<BusinessActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (!name || !slug || !category || !city) {
    return {
      ok: false,
      message: "Le nom, le slug, la catégorie et la ville sont obligatoires.",
    };
  }

  // Le slug définit l'URL publique : il doit rester compatible avec une URL.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return {
      ok: false,
      message:
        "Le slug ne peut contenir que des lettres minuscules, des chiffres et des tirets (ex. « le-terroir »).",
    };
  }

  const businessId = String(formData.get("businessId") ?? "");

  // TODO(Supabase) : upsert dans `businesses`, puis revalidation des routes concernées.
  revalidatePath("/admin/entreprises");
  if (businessId) revalidatePath(`/admin/entreprises/${businessId}`);

  return {
    ok: true,
    message: `« ${name} » préparé pour l'enregistrement. La persistance sera activée avec la base de données.`,
  };
}

/** Enregistre les liens sociaux d'une entreprise. */
export async function saveSocialLink(
  _previousState: BusinessActionState,
  formData: FormData,
): Promise<BusinessActionState> {
  const businessId = String(formData.get("businessId") ?? "");
  const platform = String(formData.get("platform") ?? "");
  const url = String(formData.get("url") ?? "").trim();

  if (!businessId || !platform) {
    return { ok: false, message: "Lien social incomplet." };
  }

  if (url && !/^https?:\/\//.test(url)) {
    return { ok: false, message: "L'URL doit commencer par http:// ou https://." };
  }

  revalidatePath(`/admin/entreprises/${businessId}`);

  return {
    ok: true,
    message: "Lien préparé. La persistance sera activée avec la base de données.",
  };
}
