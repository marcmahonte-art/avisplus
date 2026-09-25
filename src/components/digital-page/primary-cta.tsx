import { ArrowRight } from "lucide-react";

import type { DigitalPageContent } from "@/lib/types";

/**
 * Bloc CTA principal de la page digitale — prompt « page digitales premium » §8.
 * Contenu alimenté par le commerçant (`content.cta`).
 */
export function PrimaryCta({ cta }: { cta: NonNullable<DigitalPageContent["cta"]> }) {
  return (
    <section className="px-5">
      <div className="overflow-hidden rounded-xl bg-avis-black px-5 py-7 text-center">
        <h2 className="text-h4 text-white">{cta.title}</h2>
        <p className="mx-auto mt-2 max-w-xs text-body-sm text-white/70">{cta.description}</p>

        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill bg-avis-primary px-6 text-body-sm font-semibold text-avis-black transition-colors duration-fast hover:bg-avis-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2 focus-visible:ring-offset-avis-black"
        >
          {cta.label}
          <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
