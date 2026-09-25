import { Clock, Globe, MapPin, Phone } from "lucide-react";

import type { Business } from "@/lib/types";

/**
 * Section informations du commerce — prompt « page digitales premium » §10.
 * Adresse, téléphone, horaires, site web et bouton d'itinéraire.
 */
export function BusinessInfo({ business }: { business: Business }) {
  const rows: { icon: React.ReactNode; label: string; value: React.ReactNode }[] = [];

  if (business.address || business.city) {
    rows.push({
      icon: <MapPin size={18} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />,
      label: "Adresse",
      value: [business.address, business.city].filter(Boolean).join(", "),
    });
  }

  if (business.phone) {
    rows.push({
      icon: <Phone size={18} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />,
      label: "Téléphone",
      value: (
        <a
          href={`tel:${business.phone.replace(/\s/g, "")}`}
          className="underline-offset-2 hover:underline"
        >
          {business.phone}
        </a>
      ),
    });
  }

  if (business.openingHours) {
    rows.push({
      icon: <Clock size={18} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />,
      label: "Horaires",
      value: business.openingHours,
    });
  }

  if (business.websiteUrl) {
    rows.push({
      icon: <Globe size={18} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />,
      label: "Site web",
      value: (
        <a
          href={business.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
        >
          {business.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </a>
      ),
    });
  }

  if (rows.length === 0) return null;

  return (
    <section aria-labelledby="infos-titre" className="px-5">
      <h2 id="infos-titre" className="text-h4 text-avis-black">
        Informations
      </h2>

      <dl className="mt-4 flex flex-col divide-y divide-avis-border overflow-hidden rounded-xl border border-avis-border bg-white">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3 px-4 py-3.5">
            <span className="mt-0.5 shrink-0">{row.icon}</span>
            <dt className="w-20 shrink-0 text-body-sm text-avis-muted">{row.label}</dt>
            <dd className="min-w-0 flex-1 text-body-sm font-medium text-avis-black">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {business.googleMapsUrl ? (
        <a
          href={business.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-pill border border-avis-border bg-white text-body-sm font-semibold text-avis-black transition-colors duration-fast hover:bg-avis-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2"
        >
          <MapPin size={18} strokeWidth={1.8} aria-hidden="true" />
          Voir l&apos;itinéraire
        </a>
      ) : null}
    </section>
  );
}
