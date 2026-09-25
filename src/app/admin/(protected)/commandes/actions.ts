"use server";

import { revalidatePath } from "next/cache";

import { ORDER_STATUS_META } from "@/lib/status";
import type { OrderStatus } from "@/lib/types";

/**
 * Server actions du back-office — commandes.
 *
 * ⚠️ V1 (données de démonstration) : la validation est réelle mais la persistance ne
 * l'est pas encore. Avec Supabase, `updateOrderStatus` exécutera un `update` sur la
 * table `orders` puis ajoutera une entrée dans la timeline (§22).
 */

export interface ActionState {
  ok: boolean;
  message: string | null;
}

export async function updateOrderStatus(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;

  if (!orderId) {
    return { ok: false, message: "Commande introuvable." };
  }

  if (!ORDER_STATUS_META[status]) {
    return { ok: false, message: "Statut inconnu." };
  }

  // TODO(Supabase) : mettre à jour `orders.status` et journaliser dans la timeline.
  revalidatePath(`/admin/commandes/${orderId}`);

  return {
    ok: true,
    message: `Statut préparé : « ${ORDER_STATUS_META[status].label} ». La persistance sera activée avec la base de données.`,
  };
}
