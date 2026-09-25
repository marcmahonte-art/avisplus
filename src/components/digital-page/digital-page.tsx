import { BusinessHero } from "@/components/digital-page/business-hero";
import { BusinessInfo } from "@/components/digital-page/business-info";
import { Catalog } from "@/components/digital-page/catalog";
import { DigitalFooter } from "@/components/digital-page/digital-footer";
import { PrimaryCta } from "@/components/digital-page/primary-cta";
import { QuickActions } from "@/components/digital-page/quick-actions";
import { Reviews } from "@/components/digital-page/reviews";
import { SocialLinks } from "@/components/digital-page/social-links";
import type { DigitalPage } from "@/lib/types";

/**
 * Assemblage de la page digitale publique — prompt « page digitales premium » §13.
 *
 * L'ordre des sections s'adapte au template du commerce :
 * - restaurant : hero → actions → menu → avis → réseaux → informations
 * - beauté     : hero → actions → prestations → avis → réseaux → rendez-vous → informations
 * - boutique   : hero → actions → collections → avis → réseaux → WhatsApp → localisation
 * - hôtel      : hero → actions → chambres → avis → réseaux → réservation → localisation
 * - professionnel : hero → actions → prestations → avis → réseaux → informations
 */
export function DigitalPageView({ page }: { page: DigitalPage }) {
  const { business, socialLinks, content } = page;

  const showCtaBeforeInfo = business.template === "boutique" || business.template === "hotel";
  const showReviewsAfterCatalog = business.template !== "professionnel";

  return (
    <div className="mx-auto w-full max-w-digital pb-4 lg:max-w-digital-lg">
      <BusinessHero business={business} />

      <div className="mt-6 flex flex-col gap-9">
        <QuickActions business={business} socialLinks={socialLinks} />

        <Catalog
          content={content}
          template={business.template}
          businessName={business.name}
          whatsappNumber={business.whatsapp}
        />

        {showReviewsAfterCatalog ? (
          <Reviews business={business} testimonials={content.testimonials} />
        ) : null}

        {showCtaBeforeInfo && content.cta ? <PrimaryCta cta={content.cta} /> : null}

        <SocialLinks links={socialLinks} />

        {!showReviewsAfterCatalog ? (
          <Reviews business={business} testimonials={content.testimonials} />
        ) : null}

        <BusinessInfo business={business} />

        {!showCtaBeforeInfo && content.cta ? <PrimaryCta cta={content.cta} /> : null}
      </div>

      <div className="mt-10">
        <DigitalFooter businessName={business.name} />
      </div>
    </div>
  );
}
