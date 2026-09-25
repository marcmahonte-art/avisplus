import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";

import { OrderForm } from "@/components/marketing/order-form";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getProducts } from "@/lib/data";

/** Page de commande — cahier des charges §18. */

export const metadata: Metadata = {
  title: "Commander",
  description:
    "Commandez votre support Avis+ sans créer de compte. Nous vous contactons sur WhatsApp pour confirmer et planifier l'installation.",
};

export default async function CommanderPage({
  searchParams,
}: {
  searchParams: Promise<{ produit?: string; quantite?: string }>;
}) {
  const [{ produit, quantite }, products] = await Promise.all([
    searchParams,
    getProducts(),
  ]);

  return (
    <>
      <Section size="sm" background="soft">
        <Container>
          <SectionHeading
            eyebrow="Commande"
            title="Commandez votre support Avis+"
            description="Deux minutes suffisent. Aucun compte à créer, aucun paiement en ligne : nous vous rappelons pour confirmer."
          />
        </Container>
      </Section>

      <Section size="sm">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <div>
              <OrderForm
                products={products}
                defaultProductSlug={produit}
                defaultQuantity={quantite ? Number(quantite) : undefined}
              />
            </div>

            {/* Rappel rassurant, collant sur desktop */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Card className="p-6">
                <h2 className="text-h4 text-avis-black">Ce qui se passe ensuite</h2>

                <ol className="mt-5 flex flex-col gap-4">
                  {[
                    "Vous recevez une référence de commande immédiatement.",
                    "Nous vous contactons sur WhatsApp pour confirmer.",
                    "Nous créons votre page digitale et configurons votre QR et votre NFC.",
                    "Nous préparons votre support, puis nous venons l'installer.",
                  ].map((item, index) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-avis-primary-light text-caption font-bold text-avis-primary-dark">
                        {index + 1}
                      </span>
                      <span className="text-body-sm text-avis-text">{item}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex flex-col gap-3 border-t border-avis-border pt-5">
                  {[
                    "Aucun compte à créer",
                    "Aucune application à installer",
                    "Configuration et installation incluses",
                    "Liens modifiables à tout moment",
                  ].map((item) => (
                    <p key={item} className="flex items-start gap-2.5 text-body-sm text-avis-text">
                      <Check
                        size={16}
                        strokeWidth={2.2}
                        className="mt-0.5 shrink-0 text-avis-success"
                        aria-hidden="true"
                      />
                      {item}
                    </p>
                  ))}
                </div>
              </Card>

              <Card className="mt-4 flex items-start gap-3 p-5">
                <ShieldCheck
                  size={20}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-avis-success"
                  aria-hidden="true"
                />
                <p className="text-caption text-avis-text">
                  Nous ne collectons que les informations nécessaires à la fabrication, à la
                  livraison et à l&apos;installation de votre support.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
