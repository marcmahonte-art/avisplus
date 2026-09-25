import Image from "next/image";
import { MapPin, Share2, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { orderWhatsappLink } from "@/lib/site";

/**
 * Hero de la page d'accueil — DESIGN_SYSTEM_AVIS_PLUS.md §21, §22, §23.
 * Layout desktop 50/50 : texte à gauche, visuel produit à droite.
 */

const HERO_FEATURES = [
  { icon: Star, label: "Avis Google" },
  { icon: Share2, label: "Réseaux sociaux" },
  { icon: MapPin, label: "Contact & localisation" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Halo d'accent discret derrière le visuel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 hidden h-[680px] w-[680px] rounded-full bg-avis-primary-light blur-3xl lg:block"
      />
      <div
        aria-hidden="true"
        className="avis-grid-pattern pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Colonne texte */}
          <div className="animate-fade-up">
            {/* §4 — Eyebrow : le « + » utilise la couleur accent */}
            <p className="avis-eyebrow">
              PLUS D&apos;AVIS <span className="text-avis-primary">+</span> PLUS DE VISIBILITÉ
            </p>

            <h1 className="mt-5 text-display-xs md:text-display-sm lg:text-display">
              Faites découvrir votre entreprise sur Google
            </h1>

            <p className="mt-6 max-w-xl text-body text-avis-text md:text-body-lg">
              Facilitez à vos clients le partage de leur expérience grâce à nos cartes et plaques
              NFC + QR Code. Un seul scan et ils arrivent sur votre page : avis Google, réseaux
              sociaux, WhatsApp, itinéraire et site web.
            </p>

            {/* Features courtes */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {HERO_FEATURES.map((feature) => (
                <li key={feature.label} className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full border border-avis-border bg-white">
                    <feature.icon
                      size={16}
                      strokeWidth={1.8}
                      className="text-avis-black"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-body-sm font-medium text-avis-black">{feature.label}</span>
                </li>
              ))}
            </ul>

            {/* CTA principal + secondaire */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="/produits"
                size="lg"
                icon={<ShoppingCart size={20} strokeWidth={1.8} aria-hidden="true" />}
              >
                Voir nos produits
              </Button>
              <Button
                href={orderWhatsappLink()}
                size="lg"
                variant="secondary"
                external
                icon={
                  <svg viewBox="0 0 24 24" className="size-5 fill-[#25D366]" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.3-1.96 1.35-.54.06-1.05.24-3.53-.73-2.99-1.18-4.88-4.25-5.03-4.45-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39.01.56.01.18 0 .42-.07.66.5.24.58.83 2.03.9 2.18.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.65-.07.17-.2.74-.87.94-1.17.2-.3.39-.25.66-.15.27.1 1.71.81 2.01.96.3.15.5.22.57.35.07.12.07.72-.17 1.4Z" />
                  </svg>
                }
              >
                Commander sur WhatsApp
              </Button>
            </div>

            <p className="mt-5 text-caption text-avis-muted">
              Configuration et installation incluses · Ouagadougou et environs
            </p>
          </div>

          {/* Colonne visuelle */}
          <div className="relative animate-fade-up animation-delay-100">
            <div className="relative mx-auto max-w-[520px]">
              <div className="overflow-hidden rounded-2xl border border-avis-border bg-avis-soft shadow-lg">
                <Image
                  src="/images/hero-produit.png"
                  alt="Plaque Avis+ avec QR Code et puce NFC, et sa page digitale affichée sur un téléphone"
                  width={1080}
                  height={1080}
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="h-auto w-full"
                />
              </div>

              {/* Badge flottant : note Google */}
              <div className="absolute -left-3 top-8 hidden items-center gap-2.5 rounded-lg border border-avis-border bg-white px-3.5 py-2.5 shadow-md sm:flex">
                <span className="flex size-9 items-center justify-center rounded-full bg-avis-primary-light">
                  <Star size={18} strokeWidth={1.8} className="text-avis-primary-dark" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-body-sm font-semibold text-avis-black">
                    Avis Google
                  </span>
                  <span className="block text-caption text-avis-muted">Un seul scan</span>
                </span>
              </div>

              {/* Badge flottant : NFC */}
              <div className="absolute -bottom-4 right-2 hidden items-center gap-2.5 rounded-lg border border-avis-border bg-white px-3.5 py-2.5 shadow-md sm:flex">
                <span className="flex size-9 items-center justify-center rounded-full bg-avis-black">
                  <svg viewBox="0 0 24 24" className="size-4 stroke-white" fill="none" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 8.5a8 8 0 0 0 0 7M10 6.5a12 12 0 0 0 0 11M14 4.5a16 16 0 0 0 0 15" />
                  </svg>
                </span>
                <span className="leading-tight">
                  <span className="block text-body-sm font-semibold text-avis-black">NFC + QR</span>
                  <span className="block text-caption text-avis-muted">Sans application</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
