import type { Metadata } from "next";
import Image from "next/image";
import { Plus } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Produits" };

/** Gestion du catalogue produits — cahier des charges §30 (`products`). */
export default async function AdminProduitsPage() {
  const products = await getProducts({ includeInactive: true });

  const columns: DataTableColumn<Product>[] = [
    {
      key: "product",
      header: "Produit",
      render: (product) => (
        <span className="flex items-center gap-3">
          <span className="relative size-11 shrink-0 overflow-hidden rounded-md bg-avis-soft">
            <Image
              src={product.imageUrl}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-avis-black">{product.name}</span>
            <span className="block text-caption text-avis-muted">/produits/{product.slug}</span>
          </span>
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (product) => <Badge tone="neutral">{product.type}</Badge>,
    },
    {
      key: "price",
      header: "Prix",
      render: (product) => (
        <span className="whitespace-nowrap font-medium text-avis-black">
          {formatPrice(product.price)}
        </span>
      ),
    },
    {
      key: "leadTime",
      header: "Délai",
      render: (product) => (
        <span className="whitespace-nowrap text-avis-text">{product.leadTime}</span>
      ),
    },
    {
      key: "features",
      header: "Caractéristiques",
      render: (product) => (
        <span className="text-body-sm text-avis-muted">{product.features.length} points</span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (product) => (
        <span className="flex flex-wrap gap-1.5">
          <Badge tone={product.active ? "success" : "neutral"}>
            {product.active ? "Actif" : "Inactif"}
          </Badge>
          {product.popular ? <Badge tone="accent">Mis en avant</Badge> : null}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Produits"
        description="Catalogue affiché sur le site public. Les prix sont en FCFA et les délais indicatifs sont visibles par les clients."
        actions={
          <Button href="/admin/produits" icon={<Plus size={18} strokeWidth={1.8} aria-hidden="true" />}>
            Nouveau produit
          </Button>
        }
      />

      <DataTable
        columns={columns}
        rows={products}
        emptyMessage="Aucun produit dans le catalogue."
      />

      <div className="rounded-xl border border-avis-border bg-white p-6">
        <h2 className="text-body font-semibold text-avis-black">Structure du catalogue</h2>
        <p className="mt-2 text-body-sm text-avis-text">
          Chaque produit comporte une galerie, une description longue, des caractéristiques, des
          options (couleur, finition, format) et un délai indicatif. Le contenu et les prix
          définitifs sont administrables depuis cet écran.
        </p>
        <p className="mt-3 rounded-md bg-avis-warning-bg px-4 py-3 text-caption font-medium text-avis-warning-text">
          Mode démonstration : la création et la modification de produits seront persistées avec la
          base de données.
        </p>
      </div>
    </div>
  );
}
