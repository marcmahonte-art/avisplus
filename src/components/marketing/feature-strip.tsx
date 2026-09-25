import { MapPin, Settings, ShieldCheck, Zap } from "lucide-react";

import { Container } from "@/components/ui/section";
import { FEATURE_STRIP } from "@/lib/mock/operations";

/** §24 — Bandeau d'avantages affiché sous le Hero. */

const ICONS = {
  zap: Zap,
  shield: ShieldCheck,
  settings: Settings,
  mappin: MapPin,
} as const;

export function FeatureStrip() {
  return (
    <section className="border-y border-avis-border bg-white">
      <Container>
        <ul className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          {FEATURE_STRIP.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <li key={feature.title} className="flex flex-col items-center text-center">
                <span className="flex size-11 items-center justify-center rounded-full border border-avis-border bg-white">
                  <Icon size={20} strokeWidth={1.8} className="text-avis-black" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-body font-semibold text-avis-black">{feature.title}</h3>
                <p className="mt-1.5 max-w-[15rem] text-body-sm text-avis-muted">
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
