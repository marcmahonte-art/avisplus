import type { Metadata } from "next";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq";
import { Container, Section, SectionHeading } from "@/components/ui/section";

/** Page FAQ — cahier des charges §16. */

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "NFC, QR Code, modification de vos liens, installation, compatibilité Android et iPhone : toutes les réponses sur les supports Avis+.",
};

export default function FaqPage() {
  return (
    <>
      <Section size="sm" background="soft">
        <Container>
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout ce qu'il faut savoir"
            description="Si votre question n'est pas dans la liste, écrivez-nous sur WhatsApp : nous répondons en général dans la journée."
          />
        </Container>
      </Section>

      <FaqSection withHeading={false} />
      <CtaSection />
    </>
  );
}
