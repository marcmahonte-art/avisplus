import type { Metadata } from "next";
import Image from "next/image";
import { Check, MessageCircle } from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getHowItWorksSteps } from "@/lib/data";
import { orderWhatsappLink } from "@/lib/site";

/** Page « Comment ça marche » — cahier des charges §14. */

export const metadata: Metadata = {
  title: "Comment ça marche ?",
  description:
    "De la commande à l'installation : découvrez les six étapes du parcours Avis+, du QR Code et de la puce NFC jusqu'à votre page digitale.",
};

export default async function CommentCaMarchePage() {
  const steps = await getHowItWorksSteps();

  return (
    <>
      <Section size="sm" background="soft">
        <Container>
          <SectionHeading
            eyebrow="Comment ça marche ?"
            title="Vous commandez, nous nous occupons de tout"
            description="Vous n'avez rien à préparer, rien à configurer et aucun compte à créer. Nous prenons en charge votre page, vos supports et l'installation."
          />
        </Container>
      </Section>

      {/* Les six étapes */}
      <Section>
        <Container>
          <ol className="flex flex-col gap-10">
            {steps.map((step, index) => (
              <li key={step.step}>
                <div className="grid items-start gap-6 md:grid-cols-[auto_1fr] md:gap-10">
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-avis-black text-body-lg font-bold text-white">
                      {step.step}
                    </span>
                    {index < steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="hidden h-full w-px flex-1 bg-avis-border md:ml-6 md:block md:min-h-16"
                      />
                    ) : null}
                  </div>

                  <div className="pb-2">
                    <h2 className="text-h3 text-avis-black">{step.title}</h2>
                    <p className="mt-2 max-w-2xl text-body text-avis-text">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Ce qui est inclus */}
      <Section background="soft">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Inclus dans votre commande"
                title="Tout est compris, sans supplément caché"
              />

              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "La création de votre page digitale Avis+",
                  "La personnalisation du support avec votre logo",
                  "La génération de votre QR Code unique",
                  "La programmation de la puce NFC",
                  "L'installation et le test sur place (Ouagadougou)",
                  "La modification de vos liens à tout moment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-avis-primary-light">
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        className="text-avis-primary-dark"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-body text-avis-text">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/commander" size="lg">
                  Commander mon support
                </Button>
                <Button
                  href={orderWhatsappLink()}
                  size="lg"
                  variant="secondary"
                  external
                  icon={<MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />}
                >
                  Poser une question
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden p-0">
              <Image
                src="/images/presentation-noir-nfc-qr.png"
                alt="Plaque Avis+ avec QR Code et puce NFC, accompagnée de sa page digitale"
                width={1080}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full"
              />
            </Card>
          </div>
        </Container>
      </Section>

      {/* Points de vigilance / transparence */}
      <Section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Notre engagement"
            title="Des avis authentiques, sans promesse trompeuse"
          />
          <div className="mt-8 flex flex-col gap-4">
            <p className="text-body text-avis-text">
              Avis+ facilite la demande d&apos;avis : votre support rend l&apos;accès à votre fiche
              Google immédiat et simple. En revanche, nous ne promettons ni avis positif, ni note
              garantie, ni amélioration garantie de votre classement Google.
            </p>
            <p className="text-body text-avis-text">
              Nous ne mettons pas en place de mécanisme qui orienterait uniquement les clients
              satisfaits vers Google et les autres vers un canal privé. Le bouton Google permet à
              chacun de partager librement son expérience.
            </p>
          </div>
        </Container>
      </Section>

      <FaqSection limit={5} background="soft" />
      <CtaSection />
    </>
  );
}
