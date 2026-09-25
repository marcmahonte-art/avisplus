import { Globe, Phone } from "lucide-react";

import {
  FacebookIcon,
  GoogleIcon,
  GoogleMapsIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/brand/social-icons";
import type { Business, SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Actions rapides de la page digitale — prompt « page digitales premium » §4.
 *
 * Le CTA principal est le bouton d'avis Google, en couleur accent Avis+.
 * Les actions secondaires sont présentées en grille, avec une cible tactile
 * confortable (min-height 52px, §28 du design system).
 */

interface ActionItem {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function QuickActions({
  business,
  socialLinks,
}: {
  business: Business;
  socialLinks: SocialLink[];
}) {
  const secondary: ActionItem[] = [];

  if (business.whatsapp) {
    secondary.push({
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}`,
      icon: <WhatsAppIcon size={20} className="text-[#25D366]" />,
    });
  }

  if (business.googleMapsUrl) {
    secondary.push({
      key: "maps",
      label: "Itinéraire",
      href: business.googleMapsUrl,
      icon: <GoogleMapsIcon size={20} className="text-[#EA4335]" />,
    });
  }

  if (business.phone) {
    secondary.push({
      key: "phone",
      label: "Appeler",
      href: `tel:${business.phone.replace(/\s/g, "")}`,
      icon: <Phone size={20} strokeWidth={1.8} className="text-avis-black" />,
    });
  }

  // Réseaux sociaux déclarés par le commerçant uniquement (§9 du prompt).
  for (const link of socialLinks) {
    if (link.platform === "instagram") {
      secondary.push({
        key: link.id,
        label: "Instagram",
        href: link.url,
        icon: <InstagramIcon size={20} className="text-[#E1306C]" />,
      });
    } else if (link.platform === "facebook") {
      secondary.push({
        key: link.id,
        label: "Facebook",
        href: link.url,
        icon: <FacebookIcon size={20} className="text-[#1877F2]" />,
      });
    } else if (link.platform === "tiktok") {
      secondary.push({
        key: link.id,
        label: "TikTok",
        href: link.url,
        icon: <TikTokIcon size={20} className="text-avis-black" />,
      });
    } else if (link.platform === "site" && business.websiteUrl) {
      secondary.push({
        key: link.id,
        label: "Site web",
        href: link.url,
        icon: <Globe size={20} strokeWidth={1.8} className="text-avis-info" />,
      });
    }
  }

  return (
    <section aria-label="Actions rapides" className="px-5">
      {/* CTA principal : avis Google */}
      {business.googleReviewUrl ? (
        <a
          href={business.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-pill bg-avis-primary px-6",
            "text-body font-semibold text-avis-black shadow-sm transition-colors duration-fast ease-out",
            "hover:bg-avis-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2",
          )}
        >
          <GoogleIcon size={20} />
          Laisser un avis Google
        </a>
      ) : null}

      {/* Actions secondaires */}
      {secondary.length > 0 ? (
        <ul className="mt-3 grid grid-cols-2 gap-3">
          {secondary.map((action) => (
            <li key={action.key}>
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex min-h-[52px] items-center justify-center gap-2.5 rounded-pill border border-avis-border bg-white px-4",
                  "text-body-sm font-semibold text-avis-black transition-colors duration-fast ease-out",
                  "hover:border-avis-border/60 hover:bg-avis-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2",
                )}
              >
                {action.icon}
                {action.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
