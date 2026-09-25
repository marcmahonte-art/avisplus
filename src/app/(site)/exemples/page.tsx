import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CategoryFilter } from "@/components/ui/category-filter";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getBusinessesGroupedByCategory } from "@/lib/data";

/**
 * Page « Exemples de pages digitales ».
 *
 * Les pages publiées sont classées par catégorie d'activité, selon le référentiel
 * `categorie.md`. Le filtre est porté par l'URL (`?categorie=...`) : chaque vue est
 * partageable et indexable.
 */

export const metadata: Metadata = {
  title: "Exemples de pages digitales",
  description:
    "Restaurants, salons, boutiques, hôtels, garages : découvrez des exemples de pages digitales Avis+ classées par catégorie d'activité.",
};

export default async function ExemplesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;

  // Seules les pages publiées sont montrées, et on écarte le groupe de repli.
  const groups = (await getBusinessesGroupedByCategory({ status: "ACTIVE" })).filter(
    (group) => group.category.id !== "non-classee",
  );

  const activeCategoryId = groups.some((group) => group.category.id === categorie)
    ? categorie
    : undefined;

  const visibleGroups = activeCategoryId
    ? groups.filter((group) => group.category.id === activeCategoryId)
    : groups;

  return (
    <>
      <Section size="sm" background="soft">
        <Container>
          <SectionHeading
            eyebrow="Exemples"
            title="Des pages digitales, classées par métier"
            description="Un seul scan et vos clients accèdent à vos avis Google, votre menu ou catalogue, vos réseaux sociaux, votre itinéraire et WhatsApp. Voici des exemples réels, rangés par catégorie d'activité."
          />
        </Container>
      </Section>

      <Section size="sm">
        <Container>
          <CategoryFilter
            items={groups.map((group) => ({
              category: group.category,
              count: group.businesses.length,
            }))}
            activeCategoryId={activeCategoryId}
            basePath="/exemples"
            allLabel="Tous les métiers"
            ariaLabel="Filtrer les exemples par catégorie"
          />

          {visibleGroups.length > 0 ? (
            <div className="mt-8 flex flex-col gap-12">
              {visibleGroups.map((group) => (
                <section key={group.category.id} className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-avis-border pb-4">
                    <div>
                      <h2 className="text-h3 text-avis-black">{group.category.label}</h2>
                      <p className="mt-1 text-body-sm text-avis-text">
                        {group.category.description}
                      </p>
                    </div>
                    <p className="text-body-sm font-medium text-avis-muted">
                      {group.businesses.length}{" "}
                      {group.businesses.length > 1 ? "exemples" : "exemple"}
                    </p>
                  </div>

                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.businesses.map((business) => (
                      <li key={business.id}>
                        <Card interactive className="h-full overflow-hidden">
                          <Link href={`/p/${business.slug}`} className="block h-full">
                            <div className="relative aspect-[16/10] bg-avis-soft">
                              {business.coverUrl ? (
                                <Image
                                  src={business.coverUrl}
                                  alt={`Aperçu de la page digitale de ${business.name}`}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-cover"
                                />
                              ) : null}
                            </div>

                            <div className="p-6">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="text-h4 text-avis-black">{business.name}</h3>
                                <ArrowUpRight
                                  size={18}
                                  strokeWidth={1.8}
                                  aria-hidden="true"
                                  className="mt-1 shrink-0 text-avis-muted"
                                />
                              </div>

                              {business.tagline ? (
                                <p className="mt-2 text-body-sm text-avis-text">
                                  {business.tagline}
                                </p>
                              ) : null}

                              <div className="mt-4 flex flex-wrap items-center gap-2">
                                <Badge tone="neutral">
                                  {business.subcategory ?? group.category.label}
                                </Badge>
                                <span className="inline-flex items-center gap-1.5 text-caption text-avis-muted">
                                  <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
                                  {business.city}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border border-dashed border-avis-border bg-avis-soft px-6 py-14 text-center text-body text-avis-muted">
              Aucune page publiée dans cette catégorie pour le moment.
            </p>
          )}
        </Container>
      </Section>

      <CtaSection
        title="Votre métier n'est pas dans la liste ?"
        description="Avis+ équipe tous les commerces et professions qui reçoivent des clients. Dites-nous votre activité, nous adaptons la page."
      />
    </>
  );
}
