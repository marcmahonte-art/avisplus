"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { orderWhatsappLink } from "@/lib/site";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

/** Galerie produit avec vignettes — cahier des charges §13. */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.gallery.length > 0 ? product.gallery : [product.imageUrl];
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-avis-border bg-avis-soft">
        <Image
          src={active}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover"
        />
        {product.popular ? (
          <span className="absolute left-4 top-4 rounded-pill bg-avis-primary px-3 py-1 text-caption font-semibold text-avis-black shadow-sm">
            Le plus demandé
          </span>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 flex gap-3">
          {images.map((image) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(image)}
                aria-label={`Afficher le visuel ${images.indexOf(image) + 1} de ${product.name}`}
                aria-pressed={active === image}
                className={cn(
                  "relative size-20 overflow-hidden rounded-md border-2 transition-colors duration-fast ease-out",
                  active === image ? "border-avis-primary" : "border-avis-border hover:border-avis-black/30",
                )}
              >
                <Image src={image} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Bloc d'achat : sélection de la quantité et boutons de commande — §13.
 * Aucune création de compte n'est requise (cahier des charges §3).
 */
export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="rounded-xl border border-avis-border bg-avis-soft p-6">
      <div className="flex items-baseline gap-2">
        <span className="text-price text-avis-black">{formatPrice(product.price)}</span>
        <span className="text-caption text-avis-muted">l&apos;unité, TTC</span>
      </div>

      <p className="mt-1 text-caption text-avis-muted">Délai indicatif : {product.leadTime}</p>

      {/* Quantité */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-body-sm font-semibold text-avis-black">Quantité</span>
        <div className="inline-flex items-center rounded-pill border border-avis-border bg-white">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Diminuer la quantité"
            className="flex size-11 items-center justify-center rounded-l-pill text-avis-black transition-colors duration-fast hover:bg-avis-soft disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          <span
            aria-live="polite"
            className="min-w-10 text-center text-body font-semibold text-avis-black"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(50, value + 1))}
            aria-label="Augmenter la quantité"
            className="flex size-11 items-center justify-center rounded-r-pill text-avis-black transition-colors duration-fast hover:bg-avis-soft"
          >
            <Plus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-4 flex items-baseline justify-between border-t border-avis-border pt-4">
        <span className="text-body-sm text-avis-muted">Total estimé</span>
        <span className="text-h4 text-avis-black">{formatPrice(product.price * quantity)}</span>
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          href={`/commander?produit=${product.slug}&quantite=${quantity}`}
          size="lg"
          fullWidth
          icon={<ShoppingCart size={20} strokeWidth={1.8} aria-hidden="true" />}
        >
          Commander
        </Button>
        <Button
          href={orderWhatsappLink(product.name, quantity)}
          size="lg"
          variant="secondary"
          fullWidth
          external
        >
          Commander sur WhatsApp
        </Button>
      </div>

      <p className="mt-4 text-center text-caption text-avis-muted">
        Aucun compte à créer. Nous vous rappelons pour confirmer.
      </p>
    </div>
  );
}
