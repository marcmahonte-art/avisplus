"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

import { SafeImage } from "@/components/ui/safe-image";
import type { CatalogItem, DigitalPageContent, PageTemplate } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Section catalogue de la page digitale — prompt « page digitales premium » §5 et §6.
 *
 * - Restaurants et boutiques : grille de cartes avec photo, prix et bouton « + ».
 * - Salons, garages et hôtels : liste de prestations (le visuel est facultatif).
 * - Les catégories sont filtrables horizontalement, sans rechargement.
 */
export function Catalog({
  content,
  template,
  businessName,
  whatsappNumber,
}: {
  content: DigitalPageContent;
  template: PageTemplate;
  businessName: string;
  whatsappNumber: string | null;
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const items = useMemo(
    () =>
      activeCategory === "all"
        ? content.items
        : content.items.filter((item) => item.categoryId === activeCategory),
    [activeCategory, content.items],
  );

  if (content.items.length === 0) return null;

  // Les prestations de service sont présentées en liste, les produits en cartes.
  const asList = template === "beaute" || template === "professionnel" || template === "hotel";

  return (
    <section aria-labelledby="catalogue-titre" className="px-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="catalogue-titre" className="text-h4 text-avis-black">
          {content.catalogTitle}
        </h2>
      </div>
      {content.catalogSubtitle ? (
        <p className="mt-1 text-body-sm text-avis-muted">{content.catalogSubtitle}</p>
      ) : null}

      {/* Catégories — §5 : défilement horizontal sur mobile */}
      {content.categories.length > 2 ? (
        <div className="avis-scroll-x -mx-5 mt-4 px-5">
          <ul className="flex w-max gap-2" role="tablist" aria-label="Filtrer par catégorie">
            {content.categories.map((category) => {
              const active = category.id === activeCategory;
              return (
                <li key={category.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "min-h-10 rounded-pill border px-4 text-body-sm font-medium transition-colors duration-fast ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2",
                      active
                        ? "border-avis-black bg-avis-black text-white"
                        : "border-avis-border bg-white text-avis-text hover:border-avis-black/30 hover:text-avis-black",
                    )}
                  >
                    {category.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {/* Éléments */}
      {asList ? (
        <ul className="mt-5 flex flex-col divide-y divide-avis-border overflow-hidden rounded-lg border border-avis-border bg-white">
          {items.map((item) => (
            <ServiceRow key={item.id} item={item} whatsappNumber={whatsappNumber} />
          ))}
        </ul>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <ProductTile item={item} businessName={businessName} whatsappNumber={whatsappNumber} />
            </li>
          ))}
        </ul>
      )}

      {items.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-avis-border bg-avis-soft px-4 py-8 text-center text-body-sm text-avis-muted">
          Aucun élément dans cette catégorie pour le moment.
        </p>
      ) : null}
    </section>
  );
}

/** Carte produit compacte, adaptée à l'affichage mobile sur deux colonnes. */
function ProductTile({
  item,
  businessName,
  whatsappNumber,
}: {
  item: CatalogItem;
  businessName: string;
  whatsappNumber: string | null;
}) {
  const orderHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
        `Bonjour ${businessName}, je souhaite commander : ${item.name}.`,
      )}`
    : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-avis-border bg-white">
      <div className="relative aspect-square w-full overflow-hidden bg-avis-soft">
        <SafeImage
          src={item.imageUrl}
          alt={item.name}
          fallbackLabel={item.name}
          sizes="(max-width: 640px) 45vw, 260px"
          className="object-cover"
        />
        {item.badge ? (
          <span className="absolute left-2 top-2 rounded-pill bg-avis-primary px-2 py-0.5 text-caption font-semibold text-avis-black shadow-sm">
            {item.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-body-sm font-semibold leading-snug text-avis-black">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-caption text-avis-muted">{item.description}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <span className="text-body-sm font-bold text-avis-black">{formatPrice(item.price)}</span>
          {orderHref ? (
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Commander ${item.name} sur WhatsApp`}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-avis-primary text-avis-black transition-colors duration-fast hover:bg-avis-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2"
            >
              <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Ligne de prestation, pour les commerces de service. */
function ServiceRow({
  item,
  whatsappNumber,
}: {
  item: CatalogItem;
  whatsappNumber: string | null;
}) {
  const href = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
        `Bonjour, je souhaite prendre rendez-vous pour : ${item.name}.`,
      )}`
    : null;

  return (
    <li>
      <a
        href={href ?? undefined}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className={cn(
          "flex items-center gap-3 px-4 py-4 transition-colors duration-fast ease-out",
          href && "hover:bg-avis-soft",
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-body-sm font-semibold text-avis-black">{item.name}</span>
            {item.badge ? (
              <span className="rounded-pill bg-avis-primary-light px-2 py-0.5 text-caption font-semibold text-avis-primary-dark">
                {item.badge}
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-caption text-avis-muted">{item.description}</span>
        </span>

        <span className="shrink-0 text-right">
          <span className="block text-body-sm font-bold text-avis-black">
            {formatPrice(item.price)}
          </span>
          {href ? (
            <ArrowRight
              size={16}
              strokeWidth={1.8}
              className="ml-auto mt-1 text-avis-muted"
              aria-hidden="true"
            />
          ) : null}
        </span>
      </a>
    </li>
  );
}
