import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/marketing/contact-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { SITE, contactWhatsappLink } from "@/lib/site";

/** Page contact — cahier des charges §17. */

export const metadata: Metadata = {
  title: "Nous contacter",
  description:
    "Téléphone, WhatsApp, email et zone d'intervention d'Avis+. Parlons de votre projet de support NFC + QR Code.",
};

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: "Téléphone",
      value: SITE.phone,
      href: `tel:${SITE.phone.replace(/\s/g, "")}`,
      description: "Du lundi au samedi, 8h – 19h",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: SITE.phone,
      href: contactWhatsappLink(),
      description: "Le plus rapide pour obtenir une réponse",
    },
    {
      icon: Mail,
      label: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      description: "Pour les demandes détaillées",
    },
    {
      icon: MapPin,
      label: "Zone d'intervention",
      value: SITE.city,
      href: undefined,
      description: SITE.serviceArea,
    },
  ];

  return (
    <>
      <Section size="sm" background="soft">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de votre projet"
            description="Une question sur les supports, les délais ou l'installation ? Écrivez-nous, nous répondons rapidement."
          />
        </Container>
      </Section>

      <Section size="sm">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Coordonnées */}
            <div>
              <h2 className="text-h3 text-avis-black">Nos coordonnées</h2>

              <ul className="mt-6 flex flex-col gap-4">
                {channels.map((channel) => {
                  const content = (
                    <>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-avis-primary-light">
                        <channel.icon
                          size={18}
                          strokeWidth={1.8}
                          className="text-avis-primary-dark"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-caption uppercase tracking-[0.14em] text-avis-muted">
                          {channel.label}
                        </span>
                        <span className="mt-0.5 block text-body font-semibold text-avis-black">
                          {channel.value}
                        </span>
                        <span className="mt-0.5 block text-body-sm text-avis-text">
                          {channel.description}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={channel.label}>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-start gap-4 rounded-lg p-2 transition-colors duration-fast hover:bg-avis-soft"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 p-2">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Card className="mt-8 p-5">
                <h3 className="flex items-center gap-2 text-body font-semibold text-avis-black">
                  <Clock size={18} strokeWidth={1.8} aria-hidden="true" />
                  Horaires
                </h3>
                <p className="mt-2 text-body-sm text-avis-text">{SITE.hours}</p>
                <p className="mt-1 text-body-sm text-avis-text">
                  Les installations sont planifiées en semaine, sur rendez-vous.
                </p>
              </Card>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={contactWhatsappLink()} size="lg" variant="whatsapp" external fullWidth>
                  Écrire sur WhatsApp
                </Button>
                <Button href="/commander" size="lg" fullWidth>
                  Commander
                </Button>
              </div>
            </div>

            {/* Formulaire */}
            <Card className="p-6 sm:p-8">
              <h2 className="text-h3 text-avis-black">Envoyez-nous un message</h2>
              <p className="mt-2 text-body-sm text-avis-text">
                Remplissez le formulaire : votre message s&apos;ouvre directement dans WhatsApp.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
