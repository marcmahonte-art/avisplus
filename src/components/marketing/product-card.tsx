import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { orderWhatsappLink } from "@/lib/site";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Carte produit — DESIGN_SYSTEM_AVIS_PLUS.md §26.
 * Structure : image → nom → description courte → prix → caractéristiques → [Commander].
 */
export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Card interactive as="article" className={cn("flex flex-col overflow-hidden", className)}>
      {/* Visuel */}
      <Link
        href={`/produits/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-avis-soft"
        aria-label={`Voir la fiche de ${product.name}`}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-slow ease-out hover:scale-[1.03]"
        />
        {product.popular ? (
          <Badge tone="accent" className="absolute left-4 top-4 shadow-sm">
            Le plus demandé
          </Badge>
        ) : null}
      </Link>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h4 text-avis-black">
          <Link href={`/produits/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-body-sm text-avis-text">{product.description}</p>

        <ul className="mt-5 flex flex-col gap-2">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-body-sm text-avis-text">
              <Check
                size={16}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-avis-success"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-price text-avis-black">{formatPrice(product.price)}</span>
          <span className="text-caption text-avis-muted">TTC</span>
        </div>

        <p className="mt-1 text-caption text-avis-muted">Délai indicatif : {product.leadTime}</p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            href={`/commander?produit=${product.slug}`}
            className="flex-1"
            icon={<ShoppingCart size={18} strokeWidth={1.8} aria-hidden="true" />}
          >
            Commander
          </Button>
          <Button href={`/produits/${product.slug}`} variant="secondary" className="flex-1">
            En savoir plus
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** Variante compacte utilisée dans les sélections et le back-office. */
export function ProductCardCompact({ product }: { product: Product }) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-avis-soft">
        <Image src={product.imageUrl} alt={product.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-body-sm font-semibold text-avis-black">{product.name}</p>
        <p className="text-caption text-avis-muted">{formatPrice(product.price)}</p>
      </div>
      <Button
        href={orderWhatsappLink(product.name)}
        variant="ghost"
        size="sm"
        external
        className="shrink-0"
      >
        WhatsApp
      </Button>
    </Card>
  );
}
