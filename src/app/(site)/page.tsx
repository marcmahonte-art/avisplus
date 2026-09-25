import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, QrCode, ScanLine, Sparkles } from "lucide-react";

import { Hero } from "@/components/marketing/hero";
import { FeatureStrip } from "@/components/marketing/feature-strip";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection, HowItWorks } from "@/components/marketing/faq";
import { ProductCard } from "@/components/marketing/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getPopularProducts, getRealisations } from "@/lib/data";
import { contactWhatsappLink } from "@/lib/site";
import { formatDate } from "@/lib/utils";

/**
 * Page d'accueil — cahier des charges §11.
 * Ordre des sections : Hero → concept → comment ça marche → produits → exemple de page
 * digitale → avantages → entreprises équipées → FAQ → CTA.
 */
export default async function HomePage() {
  const [products, realisations] = await Promise.all([
    getPopularProducts(3),
    getRealisations({ publishedOnly: true }),
  ]);

  return (
    <>
      <Hero />
      <FeatureStrip />

      {/* 2 — Présentation du concept */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Le concept"
                title="Une identité digitale physique pour votre entreprise"
                description="Avis+ n'est pas seulement un outil de collecte d'avis. C'est une passerelle entre votre commerce et vos services numériques."
              />

              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "Un support physique avec QR Code et puce NFC",
                  "Une page digitale stable à votre nom",
                  "Des liens modifiables sans remplacer le support",
                  "Aucun compte ni application pour vos clients",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-avis-primary-light">
                      <Check size={13} strokeWidth={2.5} className="text-avis-primary-dark" aria-hidden="true" />
                    </span>
                    <span className="text-body text-avis-text">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <Button
                  href="/comment-ca-marche"
                  variant="secondary"
                  size="lg"
                  iconRight={<ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />}
                >
                  Voir comment ça marche
                </Button>
              </div>
            </div>

            {/* Schéma du parcours */}
            <Card className="p-6 sm:p-8">
              <ol className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-avis-black">
                    <QrCode size={20} strokeWidth={1.8} className="text-white" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-body font-semibold text-avis-black">
                      Votre support
                    </span>
                    <span className="mt-1 block text-body-sm text-avis-text">
                      Plaque, carte ou sticker avec QR Code et puce NFC.
                    </span>
                  </span>
                </li>

                <li aria-hidden="true" className="ml-5 h-6 w-px bg-avis-border" />

                <li className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-avis-primary">
                    <ScanLine size={20} strokeWidth={1.8} className="text-avis-black" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-body font-semibold text-avis-black">
                      Un seul scan
                    </span>
                    <span className="mt-1 block text-body-sm text-avis-text">
                      Votre client scanne ou approche son téléphone, sans application.
                    </span>
                  </span>
                </li>

                <li aria-hidden="true" className="ml-5 h-6 w-px bg-avis-border" />

                <li className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-avis-primary-light">
                    <Sparkles size={20} strokeWidth={1.8} className="text-avis-primary-dark" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-body font-semibold text-avis-black">
                      Votre page digitale
                    </span>
                    <span className="mt-1 block text-body-sm text-avis-text">
                      Avis Google, réseaux sociaux, WhatsApp, itinéraire et site web.
                    </span>
                  </span>
                </li>
              </ol>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 3 — Comment ça marche */}
      <HowItWorks />

      {/* 4 — Produits */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Nos produits"
            title="Des supports simples, prêts à installer"
            description="Carte, plaque, sticker ou pack complet : choisissez le format adapté à votre commerce."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              href="/produits"
              size="lg"
              variant="secondary"
              iconRight={<ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />}
            >
              Voir tout le catalogue
            </Button>
          </div>
        </Container>
      </Section>

      {/* 5 — Exemple de page digitale */}
      <Section background="soft">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-avis-border bg-white shadow-lg">
                <Image
                  src="/images/demo-page-digitale.png"
                  alt="Exemple de page digitale Avis+ affichée sur un téléphone"
                  width={680}
                  height={1200}
                  sizes="340px"
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionHeading
                align="left"
                eyebrow="Exemple de page"
                title="Ce que vos clients voient après le scan"
                description="Une page rapide, pensée pour le téléphone : votre logo, vos coordonnées, votre bouton d'avis Google, vos réseaux et votre itinéraire."
              />

              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "Chargement rapide, même en connexion mobile moyenne",
                  "Bouton d'avis Google en évidence",
                  "Réseaux sociaux, WhatsApp et itinéraire en un tap",
                  "Modifiable à tout moment, sans changer le QR Code",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-avis-primary-light">
                      <Check size={13} strokeWidth={2.5} className="text-avis-primary-dark" aria-hidden="true" />
                    </span>
                    <span className="text-body text-avis-text">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/p/le-terroir"
                  size="lg"
                  iconRight={<ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />}
                >
                  Voir un exemple réel
                </Button>
                <Button
                  href={contactWhatsappLink("la création de ma page digitale")}
                  size="lg"
                  variant="secondary"
                  external
                  icon={<MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />}
                >
                  Poser une question
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6 — Avantages */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Pourquoi Avis+"
            title="Vous commandez, nous nous occupons du reste"
            description="Aucune compétence technique requise. Nous configurons, nous installons et nous restons joignables."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Vos liens restent modifiables",
                description:
                  "Vous changez d'Instagram ou de numéro ? Nous mettons à jour la page. Le support physique reste valable.",
              },
              {
                title: "Un QR Code qui ne change jamais",
                description:
                  "Le QR Code pointe vers une adresse Avis+ stable. Vous n'avez jamais à réimprimer vos supports.",
              },
              {
                title: "Installation locale",
                description:
                  "Un technicien Avis+ vient poser le support chez vous et teste le scan et le NFC devant vous.",
              },
              {
                title: "Avis authentiques",
                description:
                  "Nous facilitons la demande d'avis. Nous ne filtrons pas les clients et ne promettons aucune note.",
              },
              {
                title: "Sans compte ni application",
                description:
                  "Ni vous ni vos clients n'avez besoin de créer un compte ou d'installer quoi que ce soit.",
              },
              {
                title: "Service après-vente",
                description:
                  "Support endommagé, changement de fiche Google, reprogrammation NFC : nous restons disponibles.",
              },
            ].map((advantage) => (
              <Card key={advantage.title} interactive className="p-6">
                <h3 className="text-h4 text-avis-black">{advantage.title}</h3>
                <p className="mt-2.5 text-body-sm text-avis-text">{advantage.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7 — Entreprises équipées */}
      <Section background="soft">
        <Container>
          <SectionHeading
            eyebrow="Nos réalisations"
            title="Des entreprises déjà équipées"
            description="Restaurants, salons, boutiques, pharmacies et hôtels nous font confiance à Ouagadougou."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.slice(0, 3).map((realisation) => (
              <Card key={realisation.id} interactive className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-avis-soft">
                  <Image
                    src={realisation.imageUrl}
                    alt={`Support Avis+ installé chez ${realisation.businessName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-body font-semibold text-avis-black">
                    {realisation.businessName}
                  </p>
                  <p className="mt-1 text-body-sm text-avis-muted">
                    {realisation.category} · {realisation.city}
                  </p>
                  <p className="mt-3 text-caption text-avis-muted">
                    {realisation.supportType} · {formatDate(realisation.installedAt)}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              href="/realisations"
              size="lg"
              variant="secondary"
              iconRight={<ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />}
            >
              Voir toutes les réalisations
            </Button>
          </div>
        </Container>
      </Section>

      {/* 8 — FAQ */}
      <FaqSection limit={6} />

      {/* 9 — CTA */}
      <CtaSection />

      {/* Lien vers la démonstration des trois pages digitales */}
      <Section size="sm">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="avis-eyebrow">Exemples de pages digitales</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { slug: "le-terroir", label: "Le Terroir — Restaurant" },
                { slug: "belle-et-moi", label: "Belle & Moi — Salon" },
                { slug: "le-coin-mode", label: "Le Coin Mode — Boutique" },
              ].map((demo) => (
                <Link
                  key={demo.slug}
                  href={`/p/${demo.slug}`}
                  className="inline-flex min-h-11 items-center rounded-pill border border-avis-border bg-white px-4 text-body-sm font-medium text-avis-black transition-colors duration-fast hover:border-avis-black/30 hover:bg-avis-soft"
                >
                  {demo.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
