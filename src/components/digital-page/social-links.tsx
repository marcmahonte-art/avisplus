import { Globe } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/brand/social-icons";
import type { SocialLink } from "@/lib/types";

/**
 * Section réseaux sociaux — prompt « page digitales premium » §9.
 * Seuls les réseaux réellement configurés par le commerçant sont affichés.
 */

const PLATFORM_ICONS = {
  facebook: { Icon: FacebookIcon, color: "text-[#1877F2]" },
  instagram: { Icon: InstagramIcon, color: "text-[#E1306C]" },
  tiktok: { Icon: TikTokIcon, color: "text-avis-black" },
  whatsapp: { Icon: WhatsAppIcon, color: "text-[#25D366]" },
  youtube: { Icon: Globe, color: "text-avis-error" },
  linkedin: { Icon: Globe, color: "text-[#0A66C2]" },
  site: { Icon: Globe, color: "text-avis-info" },
} as const;

export function SocialLinks({ links }: { links: SocialLink[] }) {
  if (links.length === 0) return null;

  return (
    <section aria-labelledby="reseaux-titre" className="px-5">
      <h2 id="reseaux-titre" className="text-center text-caption font-semibold uppercase tracking-[0.18em] text-avis-muted">
        Suivez-nous
      </h2>

      <ul className="mt-4 flex flex-wrap justify-center gap-3">
        {links.map((link) => {
          const { Icon, color } = PLATFORM_ICONS[link.platform];
          return (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} — s'ouvre dans un nouvel onglet`}
                title={link.label}
                className="flex size-12 items-center justify-center rounded-full border border-avis-border bg-white transition-[transform,box-shadow] duration-fast ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2"
              >
                <Icon size={22} className={color} />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
