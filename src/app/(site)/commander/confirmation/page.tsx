import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { orderWhatsappLink } from "@/lib/site";

/** Confirmation de commande — cahier des charges §19. */

export const metadata: Metadata = {
  title: "Commande reçue",
  description: "Votre commande Avis+ a bien été enregistrée.",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const reference = ref ?? "AV-2026-0000";

  return (
    <Section size="lg">
      <Container size="narrow">
        <Card className="p-8 text-center sm:p-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-avis-success-bg">
            <CheckCircle2
              size={34}
              strokeWidth={1.8}
              className="text-avis-success"
              aria-hidden="true"
            />
          </span>

          <h1 className="mt-6 text-h2-sm text-avis-black md:text-h2">Commande reçue !</h1>

          <p className="mt-4 text-body text-avis-text md:text-body-lg">
            Merci pour votre commande Avis+. Notre équipe vous contactera sur WhatsApp pour
            confirmer les informations et programmer l&apos;installation.
          </p>

          {/* Référence de commande */}
          <div className="mt-8 rounded-xl border border-avis-border bg-avis-soft px-6 py-5">
            <p className="text-caption uppercase tracking-[0.16em] text-avis-muted">
              Votre référence
            </p>
            <p className="mt-2 text-h3 font-bold tracking-tight text-avis-black">{reference}</p>
            <p className="mt-2 text-caption text-avis-muted">
              Conservez cette référence : elle nous permet de retrouver votre dossier.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              href={orderWhatsappLink(undefined, undefined)}
              size="lg"
              variant="whatsapp"
              external
              icon={<MessageCircle size={20} strokeWidth={1.8} aria-hidden="true" />}
            >
              Nous écrire sur WhatsApp
            </Button>
            <Button
              href="/"
              size="lg"
              variant="secondary"
              icon={<Home size={20} strokeWidth={1.8} aria-hidden="true" />}
            >
              Retour à l&apos;accueil
            </Button>
          </div>

          <p className="mt-6 text-body-sm text-avis-muted">
            Vous pouvez aussi préparer votre logo et vos liens :{" "}
            <Link href="/comment-ca-marche" className="font-medium text-avis-black underline">
              voir comment ça marche
            </Link>
            .
          </p>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-caption text-avis-muted">
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          Vous serez contacté sous 24 à 48 heures ouvrées.
        </div>
      </Container>
    </Section>
  );
}
