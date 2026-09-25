import Link from "next/link";

import { Logo } from "@/components/brand/logo";

/**
 * Footer minimaliste de la page digitale — prompt « page digitales premium » §11.
 * Rappelle que la page est propulsée par Avis+ et propose les liens de service.
 */
export function DigitalFooter({ businessName }: { businessName: string }) {
  return (
    <footer className="border-t border-avis-border px-5 pb-10 pt-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <Logo size="sm" variant="monochrome" asText={false} />
        <p className="text-caption text-avis-muted">
          Cette page est propulsée par Avis+
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-caption">
          <Link
            href="/contact"
            className="text-avis-muted underline-offset-2 transition-colors hover:text-avis-black hover:underline"
          >
            Signaler un problème
          </Link>
          <span aria-hidden="true" className="text-avis-border">
            ·
          </span>
          <Link
            href="/comment-ca-marche"
            className="text-avis-muted underline-offset-2 transition-colors hover:text-avis-black hover:underline"
          >
            Créer ma page
          </Link>
        </div>

        <p className="mt-4 max-w-xs text-caption text-avis-muted">
          {businessName} · Page mise à jour par l&apos;équipe Avis+.
        </p>
      </div>
    </footer>
  );
}
