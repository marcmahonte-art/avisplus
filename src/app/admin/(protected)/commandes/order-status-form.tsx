"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Select } from "@/components/ui/input";
import { ORDER_SECONDARY_STATUSES, ORDER_STATUS_FLOW, ORDER_STATUS_META } from "@/lib/status";
import type { OrderStatus } from "@/lib/types";
import { updateOrderStatus, type ActionState } from "@/app/admin/(protected)/commandes/actions";

const INITIAL: ActionState = { ok: false, message: null };

/**
 * Sélecteur de statut d'une commande — cahier des charges §22.
 * Les statuts secondaires (annulée, en attente, problème) sont regroupés en fin de liste.
 */
export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const [state, formAction, pending] = useActionState(updateOrderStatus, INITIAL);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="orderId" value={orderId} />

      <Field label="Statut de la commande" htmlFor="order-status">
        <Select id="order-status" name="status" defaultValue={currentStatus}>
          <optgroup label="Cycle de vie">
            {ORDER_STATUS_FLOW.map((status) => (
              <option key={status} value={status}>
                {ORDER_STATUS_META[status].label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Statuts secondaires">
            {ORDER_SECONDARY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {ORDER_STATUS_META[status].label}
              </option>
            ))}
          </optgroup>
        </Select>
      </Field>

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

      <Button
        type="submit"
        loading={pending}
        icon={<Save size={18} strokeWidth={1.8} aria-hidden="true" />}
        className="self-start"
      >
        Enregistrer le statut
      </Button>
    </form>
  );
}
