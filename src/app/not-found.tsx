import { ArrowRight, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

/** Page 404 — également utilisée quand une page digitale est introuvable ou désactivée. */
export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center bg-white">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-avis-soft">
            <Search size={26} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />
          </span>

          <p className="avis-eyebrow mt-6">Erreur 404</p>

          <h1 className="mt-3 text-h2-sm text-avis-black md:text-h2">Page introuvable</h1>

          <p className="mt-4 max-w-lg text-body text-avis-text">
            Cette page n&apos;existe pas ou n&apos;est plus disponible. Si vous avez scanné un
            support Avis+, la page du commerce a peut-être été désactivée.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/"
              size="lg"
              icon={<Home size={20} strokeWidth={1.8} aria-hidden="true" />}
            >
              Retour à l&apos;accueil
            </Button>
            <Button
              href="/produits"
              size="lg"
              variant="secondary"
              iconRight={<ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />}
            >
              Voir nos produits
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
