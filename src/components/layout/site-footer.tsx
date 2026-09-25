import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/section";
import { FOOTER_NAV, SITE, contactWhatsappLink } from "@/lib/site";

/** Pied de page du site public — DESIGN_SYSTEM_AVIS_PLUS.md §19 (minimal). */
export function SiteFooter() {
  return (
    <footer className="border-t border-avis-border bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Identité */}
          <div>
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-body-sm text-avis-text">
              {SITE.tagline} Supports NFC + QR Code et pages digitales pour les entreprises du
              Burkina Faso.
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-body-sm text-avis-text">
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 transition-colors duration-fast hover:text-avis-black"
                >
                  <Phone size={16} strokeWidth={1.8} aria-hidden="true" className="text-avis-muted" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors duration-fast hover:text-avis-black"
                >
                  <MessageCircle
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="text-avis-muted"
                  />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors duration-fast hover:text-avis-black"
                >
                  <Mail size={16} strokeWidth={1.8} aria-hidden="true" className="text-avis-muted" />
                  {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-avis-muted"
                />
                <span>{SITE.serviceArea}</span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-body-sm font-semibold text-avis-black">{group.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-avis-text transition-colors duration-fast hover:text-avis-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-avis-border pt-6 text-caption text-avis-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Avis+. Tous droits réservés. {SITE.city}, {SITE.country}.
          </p>
          <p>
            Avis+ facilite la demande d&apos;avis authentiques. Aucun avis positif ni classement
            Google n&apos;est garanti.
          </p>
        </div>
      </Container>
    </footer>
  );
}
