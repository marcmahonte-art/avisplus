import { NextResponse } from "next/server";

import { getNextOrderReference } from "@/lib/data";

/**
 * POST /api/commandes — réception d'une commande publique.
 *
 * Cahier des charges §18 et §19 : la commande est enregistrée et une référence unique
 * au format `AV-2026-0001` est renvoyée au client, qui n'a créé aucun compte.
 *
 * ⚠️ V1 (données de démonstration) : la commande n'est pas encore persistée.
 * Avec Supabase, cette route insérera une ligne dans `orders` (et ses `order_items`)
 * via le client serveur, puis déclenchera la notification email à l'équipe (§39).
 */

/** Champs obligatoires du formulaire de commande. */
const REQUIRED_FIELDS = [
  "businessName",
  "customerName",
  "customerPhone",
  "customerWhatsapp",
  "city",
  "district",
  "address",
] as const;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Le corps de la requête est invalide." },
      { status: 400 },
    );
  }

  // Validation minimale côté serveur : le formulaire peut être contourné.
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = payload[field];
    return typeof value !== "string" || value.trim() === "";
  });

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: "Certains champs obligatoires sont manquants.",
        fields: missing,
      },
      { status: 422 },
    );
  }

  const quantity = Number(payload.quantity ?? 1);
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 50) {
    return NextResponse.json(
      { error: "La quantité doit être comprise entre 1 et 50." },
      { status: 422 },
    );
  }

  const reference = await getNextOrderReference();

  // TODO(Supabase) : insérer la commande en base et notifier l'équipe (§30, §39).
  return NextResponse.json(
    {
      reference,
      status: "NOUVELLE",
      message: "Commande reçue. Notre équipe vous contacte sur WhatsApp pour confirmer.",
    },
    { status: 201 },
  );
}

/** GET — renvoie la prochaine référence disponible (utile pour les tests et le back-office). */
export async function GET() {
  const reference = await getNextOrderReference();
  return NextResponse.json({ nextReference: reference });
}
