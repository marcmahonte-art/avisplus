import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { orderWhatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Bloc CTA de fin de page — DESIGN_SYSTEM_AVIS_PLUS.md §43.
 * Fond noir pour un contraste fort, libellés de CTA explicites.
 */
export function CtaSection({
  title = "Prêt à équiper votre entreprise ?",
  description = "Nous créons votre page, nous configurons votre QR et votre NFC, nous préparons votre support et nous venons l'installer.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-avis-black py-16 md:py-20 lg:py-24", className)}>
      <Container>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-h2-sm text-white md:text-h2">{title}</h2>
            <p className="mt-4 text-body text-white/70 md:text-body-lg">{description}</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
            <Button
              href="/commander"
              size="lg"
              iconRight={<ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />}
            >
              Commander
            </Button>
            <Button
              href={orderWhatsappLink()}
              size="lg"
              variant="dark"
              external
              className="border border-white/20"
              icon={<MessageCircle size={20} strokeWidth={1.8} aria-hidden="true" />}
            >
              Commander sur WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
