import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, QrCode, Sparkles, Truck } from "lucide-react";

import { NfcIcon } from "@/components/brand/social-icons";
import { CtaSection } from "@/components/marketing/cta-section";
import {
  ProductGallery,
  ProductPurchasePanel,
} from "@/components/marketing/product-detail-parts";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { getProductBySlug, getProductSlugs, getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

/** Fiche produit — cahier des charges §13. */

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Produit introuvable" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Avis+`,
      description: product.description,
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProduitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const others = allProducts.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <>
      <Section size="sm">
        <Container>
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-caption text-avis-muted">
              <li>
                <Link href="/" className="hover:text-avis-black">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} strokeWidth={2} />
              </li>
              <li>
                <Link href="/produits" className="hover:text-avis-black">
                  Nos produits
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} strokeWidth={2} />
              </li>
              <li className="font-medium text-avis-black">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <ProductGallery product={product} />

            <div>
              <h1 className="text-h1-sm md:text-h1">{product.name}</h1>
              <p className="mt-4 text-body text-avis-text md:text-body-lg">{product.tagline}</p>

              {/* Caractéristiques principales */}
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      strokeWidth={2.2}
                      className="mt-0.5 shrink-0 text-avis-success"
                      aria-hidden="true"
                    />
                    <span className="text-body-sm text-avis-text">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Options disponibles */}
              {product.options.length > 0 ? (
                <div className="mt-8 flex flex-col gap-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <p className="text-body-sm font-semibold text-avis-black">{option.name}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <li
                            key={value}
                            className="rounded-pill border border-avis-border bg-white px-3 py-1.5 text-caption text-avis-text"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-8">
                <ProductPurchasePanel product={product} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Description détaillée et points techniques */}
      <Section size="sm" background="soft">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-h3 text-avis-black">Description</h2>
              {product.longDescription.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-4 text-body text-avis-text">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Card className="p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-avis-primary-light">
                  <QrCode size={18} strokeWidth={1.8} className="text-avis-primary-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-body font-semibold text-avis-black">QR Code stable</h3>
                <p className="mt-1 text-body-sm text-avis-text">
                  Le QR Code pointe vers une adresse Avis+ qui ne change jamais. Vos liens, eux,
                  restent modifiables.
                </p>
              </Card>

              <Card className="p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-avis-primary-light">
                  <NfcIcon size={18} className="text-avis-primary-dark" />
                </span>
                <h3 className="mt-3 text-body font-semibold text-avis-black">Puce NFC intégrée</h3>
                <p className="mt-1 text-body-sm text-avis-text">
                  Programmable et reprogrammable par nos équipes, sans remplacer le support.
                </p>
              </Card>

              <Card className="p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-avis-primary-light">
                  <Sparkles size={18} strokeWidth={1.8} className="text-avis-primary-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-body font-semibold text-avis-black">Personnalisation</h3>
                <p className="mt-1 text-body-sm text-avis-text">
                  Votre logo, vos couleurs et le message de votre choix, imprimés avec soin.
                </p>
              </Card>

              <Card className="p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-avis-primary-light">
                  <Truck size={18} strokeWidth={1.8} className="text-avis-primary-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-body font-semibold text-avis-black">Installation</h3>
                <p className="mt-1 text-body-sm text-avis-text">
                  Délai indicatif : {product.leadTime}. Installation à Ouagadougou ou retrait en
                  boutique.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Autres produits */}
      {others.length > 0 ? (
        <Section size="sm">
          <Container>
            <h2 className="text-h3 text-avis-black">Vous pourriez aussi aimer</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {others.map((other) => (
                <li key={other.id}>
                  <Card interactive className="h-full p-5">
                    <h3 className="text-body font-semibold text-avis-black">
                      <Link href={`/produits/${other.slug}`} className="hover:underline">
                        {other.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-body-sm text-avis-text">{other.description}</p>
                    <p className="mt-4 text-body font-bold text-avis-black">
                      {formatPrice(other.price)}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaSection />
    </>
  );
}
