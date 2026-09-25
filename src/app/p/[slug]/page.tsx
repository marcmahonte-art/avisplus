import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DigitalPageView } from "@/components/digital-page/digital-page";
import { getDigitalPageBySlug, getPublicSlugs } from "@/lib/data";
import { publicPageUrl } from "@/lib/utils";

/**
 * Page digitale publique — cahier des charges §8 et §32.
 *
 * Route : `/p/[slug]` — c'est l'adresse encodée dans le QR Code et dans la puce NFC.
 * Elle doit rester stable : le contenu peut changer, l'URL jamais.
 *
 * Les pages sont générées statiquement (`generateStaticParams`) pour garantir un
 * chargement quasi instantané après un scan, y compris en connexion mobile moyenne.
 */

/** Pré-génère une page statique par entreprise active. */
export async function generateStaticParams() {
  const slugs = await getPublicSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** §40 — SEO : titre, description, Open Graph et indexation conditionnelle. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDigitalPageBySlug(slug);

  if (!page) {
    return { title: "Page introuvable" };
  }

  const { business } = page;
  const description =
    business.description ?? `${business.name} — ${business.category} à ${business.city}.`;

  return {
    title: business.name,
    description,
    alternates: { canonical: publicPageUrl(business.slug) },
    // §40 — Le commerçant choisit si sa page peut être indexée par Google.
    robots: business.allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "profile",
      title: business.name,
      description,
      url: publicPageUrl(business.slug),
      images: business.coverUrl ? [{ url: business.coverUrl }] : undefined,
    },
  };
}

export default async function DigitalPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getDigitalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const { business } = page;

  // §40 — Données structurées pour les moteurs de recherche.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description ?? undefined,
    image: business.coverUrl ?? undefined,
    telephone: business.phone ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address ?? undefined,
      addressLocality: business.city,
      addressCountry: "BF",
    },
    url: publicPageUrl(business.slug),
    sameAs: page.socialLinks.map((link) => link.url),
    ...(business.rating && business.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: business.rating,
            reviewCount: business.reviewCount,
          },
        }
      : {}),
  };

  return (
    <div className="min-h-dvh bg-avis-soft py-0 lg:py-10">
      <main className="mx-auto w-full overflow-hidden bg-white lg:max-w-digital-lg lg:rounded-2xl lg:border lg:border-avis-border lg:shadow-md">
        <DigitalPageView page={page} />
      </main>

      <script
        type="application/ld+json"
        // Le JSON-LD provient de données maîtrisées (mock puis Supabase), jamais d'une saisie libre.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
