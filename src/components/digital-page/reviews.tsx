import { ArrowRight, Quote } from "lucide-react";

import { GoogleIcon } from "@/components/brand/social-icons";
import { StarRating } from "@/components/ui/star-rating";
import type { Business, Testimonial } from "@/lib/types";

/**
 * Section avis — prompt « page digitales premium » §7.
 *
 * ⚠️ Cahier des charges §10 : Avis+ ne garantit ni avis positif ni note Google.
 * Les avis affichés proviennent exclusivement du commerçant ou d'une source autorisée ;
 * aucun avis n'est généré automatiquement.
 */
export function Reviews({
  business,
  testimonials,
}: {
  business: Business;
  testimonials: Testimonial[];
}) {
  const hasRating = typeof business.rating === "number" && business.rating > 0;
  const hasTestimonials = testimonials.length > 0;

  if (!hasRating && !hasTestimonials) return null;

  return (
    <section aria-labelledby="avis-titre" className="px-5">
      <h2 id="avis-titre" className="text-h4 text-avis-black">
        Ils nous font confiance
      </h2>

      {hasRating ? (
        <div className="mt-4 flex flex-col items-center rounded-xl border border-avis-border bg-avis-soft px-5 py-6 text-center">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[34px] font-bold leading-none tracking-tight text-avis-black">
              {business.rating!.toFixed(1).replace(".", ",")}
            </span>
            <span className="text-body-sm text-avis-muted">/ 5</span>
          </div>

          <StarRating
            rating={business.rating!}
            size={20}
            className="mt-2"
            label={`Note de ${business.rating} sur 5`}
          />

          {business.reviewCount ? (
            <p className="mt-2 text-body-sm text-avis-muted">
              Basé sur {business.reviewCount} avis Google
            </p>
          ) : null}
        </div>
      ) : null}

      {hasTestimonials ? (
        <ul className="mt-4 flex flex-col gap-3">
          {testimonials.slice(0, 2).map((testimonial) => (
            <li
              key={testimonial.id}
              className="rounded-xl border border-avis-border bg-white p-4"
            >
              <Quote
                size={18}
                strokeWidth={1.8}
                className="text-avis-primary"
                aria-hidden="true"
              />
              <p className="mt-2.5 text-body-sm text-avis-text">« {testimonial.text} »</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <StarRating rating={testimonial.rating} size={14} />
                <span className="text-caption text-avis-muted">— {testimonial.author}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {business.googleReviewUrl ? (
        <a
          href={business.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold text-avis-black transition-colors duration-fast hover:text-avis-primary-dark"
        >
          <GoogleIcon size={16} />
          Voir tous les avis Google
          <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </a>
      ) : null}
    </section>
  );
}
