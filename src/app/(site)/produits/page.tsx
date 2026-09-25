import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/marketing/cta-section";
import { ProductCard } from "@/components/marketing/product-card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getProducts } from "@/lib/data";
import { PRODUCT_FILTERS } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

/** Catalogue produits — cahier des charges §12. */

export const metadata: Metadata = {
  title: "Nos produits",
  description:
    "Cartes, plaques et stickers NFC + QR Code Avis+. Personnalisation, configuration et installation incluses à Ouagadougou.",
};

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeType = PRODUCT_FILTERS.some((filter) => filter.value === type) ? type : "all";

  const allProducts = await getProducts();
  const products =
    activeType && activeType !== "all"
      ? allProducts.filter((product) => product.type === activeType)
      : allProducts;

  return (
    <>
      <Section size="sm" background="soft">
        <Container>
          <SectionHeading
            eyebrow="Catalogue"
            title="Choisissez votre support Avis+"
            description="Tous nos supports incluent le QR Code, la puce NFC, la création de votre page digitale et la configuration. L'installation est comprise sur Ouagadougou pour les plaques et les packs."
          />
        </Container>
      </Section>

      <Section size="sm">
        <Container>
          {/* Filtres par type de produit (§12) */}
          <nav aria-label="Filtrer les produits">
            <ul className="avis-scroll-x -mx-5 flex gap-2 px-5 md:mx-0 md:flex-wrap md:px-0">
              {PRODUCT_FILTERS.map((filter) => {
                const active = filter.value === activeType;
                return (
                  <li key={filter.value} className="shrink-0">
                    <Link
                      href={filter.value === "all" ? "/produits" : `/produits?type=${filter.value}`}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-pill border px-5 text-body-sm font-medium transition-colors duration-fast ease-out",
                        active
                          ? "border-avis-black bg-avis-black text-white"
                          : "border-avis-border bg-white text-avis-text hover:border-avis-black/30 hover:text-avis-black",
                      )}
                    >
                      {filter.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {products.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-lg border border-dashed border-avis-border bg-avis-soft px-6 py-14 text-center text-body text-avis-muted">
              Aucun produit dans cette catégorie pour le moment.
            </p>
          )}

          {/* Réassurance */}
          <div className="mt-14 grid gap-6 rounded-xl border border-avis-border bg-avis-soft p-6 sm:grid-cols-3 sm:p-8">
            {[
              {
                title: "Personnalisation incluse",
                description: "Votre logo, vos couleurs et le message de votre choix.",
              },
              {
                title: "Configuration incluse",
                description: "Page digitale, QR Code et puce NFC préparés par nos équipes.",
              },
              {
                title: "Installation possible",
                description: "Un technicien se déplace et teste tout devant vous.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-body font-semibold text-avis-black">{item.title}</h3>
                <p className="mt-1.5 text-body-sm text-avis-text">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
