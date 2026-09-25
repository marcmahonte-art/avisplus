import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { FAQ_ITEMS, HOW_IT_WORKS_STEPS } from "@/lib/mock/operations";
import { contactWhatsappLink } from "@/lib/site";

/** §14 — Parcours Avis+ en six étapes. */
export function HowItWorks({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <Section background="soft" id="comment-ca-marche">
      <Container>
        {withHeading ? (
          <SectionHeading
            eyebrow="Comment ça marche ?"
            title="De la commande à l'installation, on s'occupe de tout"
            description="Six étapes simples. Vous n'avez rien à préparer, rien à installer et aucun compte à créer."
          />
        ) : null}

        <ol className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li key={step.step} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-avis-black text-body-sm font-semibold text-white">
                  {step.step}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-r from-avis-border to-transparent"
                />
              </div>
              <h3 className="mt-5 text-h4 text-avis-black">{step.title}</h3>
              <p className="mt-2 text-body-sm text-avis-text">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            href="/commander"
            size="lg"
            iconRight={<ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />}
          >
            Commander mon support
          </Button>
          <Button href="/produits" size="lg" variant="secondary">
            Voir les produits
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/**
 * §16 — FAQ.
 * Construite sur `<details>` : entièrement accessible et fonctionnelle sans JavaScript.
 */
export function FaqSection({
  withHeading = true,
  limit,
  background = "white",
}: {
  withHeading?: boolean;
  limit?: number;
  background?: "white" | "soft";
}) {
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;

  return (
    <Section background={background} id="faq">
      <Container size="narrow">
        {withHeading ? (
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout ce qu'il faut savoir avant de commander"
            description="Une question qui n'est pas ici ? Écrivez-nous sur WhatsApp, nous répondons rapidement."
          />
        ) : null}

        <div className="mt-12 flex flex-col divide-y divide-avis-border border-y border-avis-border">
          {items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-body font-semibold text-avis-black transition-colors duration-fast hover:text-avis-primary-dark [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="shrink-0 text-avis-muted transition-transform duration-normal ease-out group-open:rotate-180"
                />
              </summary>
              <p className="pb-5 pr-8 text-body-sm text-avis-text">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={contactWhatsappLink("vos supports Avis+")} variant="secondary" external>
            Poser une autre question
          </Button>
        </div>
      </Container>
    </Section>
  );
}
