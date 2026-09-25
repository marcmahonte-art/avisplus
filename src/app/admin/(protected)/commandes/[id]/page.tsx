import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, MessageCircle, Phone } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Card, DetailRow } from "@/components/ui/card";
import { getBusinessById, getOrder } from "@/lib/data";
import { INSTALLATION_MODE_LABELS, ORDER_STATUS_META } from "@/lib/status";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { OrderStatusForm } from "@/app/admin/(protected)/commandes/order-status-form";

export const metadata: Metadata = { title: "Détail de la commande" };

/** Fiche détaillée d'une commande — cahier des charges §22. */
export default async function AdminCommandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  const business = order.businessId ? await getBusinessById(order.businessId) : null;

  const digitalRows: { label: string; value: string | null }[] = [
    { label: "Lien avis Google", value: order.digital.googleReviewUrl },
    { label: "Facebook", value: order.digital.facebook },
    { label: "Instagram", value: order.digital.instagram },
    { label: "TikTok", value: order.digital.tiktok },
    { label: "WhatsApp entreprise", value: order.digital.whatsapp },
    { label: "Google Maps", value: order.digital.googleMapsUrl },
    { label: "Site web", value: order.digital.websiteUrl },
    { label: "Autres liens", value: order.digital.otherLinks },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/admin/commandes"
          className="inline-flex items-center gap-2 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:text-avis-black"
        >
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          Toutes les commandes
        </Link>
      </div>

      <AdminPageHeader
        title={order.reference}
        description={`Commande reçue le ${formatDateTime(order.createdAt)} · ${order.businessName}`}
        actions={
          <>
            <StatusBadge kind="order" status={order.status} />
            <StatusBadge kind="payment" status={order.paymentStatus} />
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Colonne principale */}
        <div className="flex flex-col gap-6">
          {/* Produits commandés */}
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Produits commandés</h2>

            <ul className="mt-4 flex flex-col divide-y divide-avis-border">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 py-3.5">
                  <div className="min-w-0">
                    <p className="text-body-sm font-semibold text-avis-black">
                      {item.quantity} × {item.productName}
                    </p>
                    {Object.keys(item.options).length > 0 ? (
                      <p className="mt-0.5 text-caption text-avis-muted">
                        {Object.entries(item.options)
                          .map(([key, value]) => `${key} : ${value}`)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-body-sm font-medium text-avis-black">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-baseline justify-between border-t border-avis-border pt-4">
              <span className="text-body-sm font-semibold text-avis-black">Total</span>
              <span className="text-h4 text-avis-black">{formatPrice(order.totalAmount)}</span>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Timeline</h2>

            <ol className="mt-5 flex flex-col">
              {order.timeline.map((entry, index) => {
                const isLast = index === order.timeline.length - 1;
                return (
                  <li key={`${entry.status}-${entry.at}`} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={
                          isLast
                            ? "flex size-7 shrink-0 items-center justify-center rounded-full bg-avis-primary"
                            : "flex size-7 shrink-0 items-center justify-center rounded-full bg-avis-soft"
                        }
                      >
                        <Check
                          size={14}
                          strokeWidth={2.4}
                          className={isLast ? "text-avis-black" : "text-avis-muted"}
                          aria-hidden="true"
                        />
                      </span>
                      {!isLast ? (
                        <span aria-hidden="true" className="w-px flex-1 bg-avis-border" />
                      ) : null}
                    </div>

                    <div className={isLast ? "pb-0" : "pb-6"}>
                      <p className="text-body-sm font-semibold text-avis-black">
                        {ORDER_STATUS_META[entry.status].label}
                      </p>
                      <p className="mt-0.5 text-caption text-avis-muted">
                        {formatDateTime(entry.at)}
                      </p>
                      {entry.note ? (
                        <p className="mt-1.5 text-body-sm text-avis-text">{entry.note}</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>

          {/* Informations digitales */}
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Informations digitales</h2>
            <p className="mt-1 text-body-sm text-avis-text">
              Liens à reporter sur la page digitale de l&apos;entreprise.
            </p>

            <dl className="mt-4 flex flex-col divide-y divide-avis-border">
              {digitalRows.map((row) => (
                <DetailRow
                  key={row.label}
                  label={row.label}
                  value={
                    row.value ? (
                      row.value.startsWith("http") ? (
                        <a
                          href={row.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 break-all text-avis-info hover:underline"
                        >
                          {row.value.replace(/^https?:\/\//, "").slice(0, 42)}
                          <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="break-all">{row.value}</span>
                      )
                    ) : (
                      <span className="text-avis-muted">Non renseigné</span>
                    )
                  }
                />
              ))}
            </dl>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="flex flex-col gap-6">
          {/* Changer le statut */}
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Faire avancer la commande</h2>
            <div className="mt-5">
              <OrderStatusForm orderId={order.id} currentStatus={order.status} />
            </div>
          </Card>

          {/* Client */}
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Client</h2>

            <dl className="mt-4 flex flex-col divide-y divide-avis-border">
              <DetailRow label="Entreprise" value={order.businessName} />
              <DetailRow label="Responsable" value={order.customerName} />
              <DetailRow label="Téléphone" value={order.customerPhone} />
              <DetailRow label="WhatsApp" value={order.customerWhatsapp} />
              <DetailRow
                label="Email"
                value={order.customerEmail ?? <span className="text-avis-muted">—</span>}
              />
              <DetailRow label="Ville" value={order.city} />
              <DetailRow label="Quartier" value={order.district} />
              <DetailRow label="Adresse" value={order.address} />
              <DetailRow
                label="Mode d'installation"
                value={INSTALLATION_MODE_LABELS[order.installationMode]}
              />
            </dl>

            <div className="mt-5 flex flex-col gap-2">
              <Button
                href={`https://wa.me/${order.customerWhatsapp.replace(/[^\d]/g, "")}`}
                variant="whatsapp"
                external
                fullWidth
                icon={<MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />}
              >
                Contacter sur WhatsApp
              </Button>
              <Button
                href={`tel:${order.customerPhone.replace(/\s/g, "")}`}
                variant="secondary"
                fullWidth
                icon={<Phone size={18} strokeWidth={1.8} aria-hidden="true" />}
              >
                Appeler
              </Button>
            </div>

            {order.notes ? (
              <p className="mt-5 rounded-md bg-avis-soft px-4 py-3 text-body-sm text-avis-text">
                <span className="block font-semibold text-avis-black">Note du client</span>
                {order.notes}
              </p>
            ) : null}
          </Card>

          {/* Entreprise liée */}
          <Card className="p-6">
            <h2 className="text-h4 text-avis-black">Entreprise</h2>

            {business ? (
              <>
                <p className="mt-3 text-body-sm text-avis-text">
                  La page digitale de cette entreprise est créée.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button href={`/admin/entreprises/${business.id}`} variant="secondary" fullWidth>
                    Ouvrir la fiche entreprise
                  </Button>
                  <Button href={`/p/${business.slug}`} variant="ghost" external fullWidth>
                    Voir la page publique
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="mt-3 text-body-sm text-avis-text">
                  Aucune page digitale n&apos;est encore rattachée à cette commande.
                </p>
                <div className="mt-4">
                  <Button href="/admin/entreprises" variant="secondary" fullWidth>
                    Créer l&apos;entreprise
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
