import type { Metadata } from "next";
import { AlertTriangle, Building2, MessageCircle, Palette, ShieldCheck } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/stat-card";
import { Card, DetailRow } from "@/components/ui/card";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Paramètres" };

/** Paramètres généraux — cahier des charges §20 et §43. */
export default function AdminParametresPage() {
  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Paramètres"
        description="Coordonnées Avis+, identité visuelle et état de la configuration technique."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Coordonnées */}
        <Card className="p-6">
          <h2 className="flex items-center gap-2 text-h4 text-avis-black">
            <Building2 size={20} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />
            Coordonnées Avis+
          </h2>

          <dl className="mt-4 flex flex-col divide-y divide-avis-border">
            <DetailRow label="Nom" value={SITE.name} />
            <DetailRow label="Téléphone" value={SITE.phone} />
            <DetailRow label="WhatsApp" value={`+${SITE.whatsapp}`} />
            <DetailRow label="Email" value={SITE.email} />
            <DetailRow label="Ville" value={`${SITE.city}, ${SITE.country}`} />
            <DetailRow label="Zone d'intervention" value={SITE.serviceArea} />
            <DetailRow label="Horaires" value={SITE.hours} />
            <DetailRow label="Domaine public" value={SITE.url} />
          </dl>

          <p className="mt-4 rounded-md bg-avis-soft px-4 py-3 text-caption text-avis-muted">
            Ces valeurs sont lues depuis les variables d&apos;environnement{" "}
            <code className="font-mono">NEXT_PUBLIC_*</code> (voir <code className="font-mono">.env.example</code>).
          </p>
        </Card>

        {/* Identité visuelle */}
        <Card className="p-6">
          <h2 className="flex items-center gap-2 text-h4 text-avis-black">
            <Palette size={20} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />
            Identité visuelle
          </h2>

          <p className="mt-2 text-body-sm text-avis-text">
            Les couleurs et la typographie proviennent du design system Avis+ et sont exposées comme
            tokens Tailwind (<code className="font-mono">avis-*</code>).
          </p>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Accent principal", value: "#FFB82E" },
              { label: "Accent survol", value: "#F4A91F" },
              { label: "Accent clair", value: "#FFF4D8" },
              { label: "Noir", value: "#050505" },
              { label: "Texte", value: "#475569" },
              { label: "Bordure", value: "#E2E8F0" },
            ].map((token) => (
              <li key={token.label} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="size-9 shrink-0 rounded-md border border-avis-border"
                  style={{ backgroundColor: token.value }}
                />
                <span className="min-w-0">
                  <span className="block text-body-sm font-medium text-avis-black">
                    {token.label}
                  </span>
                  <span className="block font-mono text-caption text-avis-muted">
                    {token.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-body-sm text-avis-text">
            Police : <strong className="font-semibold text-avis-black">Inter</strong>, chargée via{" "}
            <code className="font-mono">next/font/google</code>.
          </p>
        </Card>

        {/* Canaux de contact */}
        <Card className="p-6">
          <h2 className="flex items-center gap-2 text-h4 text-avis-black">
            <MessageCircle size={20} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />
            Canaux de contact
          </h2>

          <p className="mt-2 text-body-sm text-avis-text">
            WhatsApp est le canal commercial principal. Tous les boutons « Commander sur WhatsApp »
            génèrent un message prérempli.
          </p>

          <ul className="mt-4 flex flex-col gap-3">
            {[
              "Formulaire de commande en ligne (§18)",
              "Formulaire de contact avec ouverture WhatsApp (§17)",
              "Numéro WhatsApp affiché sur le site et les pages digitales",
              "Email de contact pour les demandes détaillées",
            ].map((item) => (
              <li key={item} className="text-body-sm text-avis-text">
                · {item}
              </li>
            ))}
          </ul>

          <p className="mt-4 rounded-md bg-avis-soft px-4 py-3 text-caption text-avis-muted">
            Phase 2 (§39) : notification email automatique à l&apos;équipe à chaque commande, puis
            WhatsApp automatisé et SMS.
          </p>
        </Card>

        {/* État technique */}
        <Card className="p-6">
          <h2 className="flex items-center gap-2 text-h4 text-avis-black">
            <ShieldCheck size={20} strokeWidth={1.8} className="text-avis-muted" aria-hidden="true" />
            État de la configuration
          </h2>

          <dl className="mt-4 flex flex-col divide-y divide-avis-border">
            <DetailRow label="Frontend" value="Next.js · App Router · TypeScript" />
            <DetailRow label="Styles" value="Tailwind CSS + tokens Avis+" />
            <DetailRow label="Icônes" value="Lucide + SVG de marques" />
            <DetailRow label="QR Code" value="Généré côté serveur (SVG / PNG)" />
            <DetailRow label="Source de données" value="Données de démonstration (V1)" />
            <DetailRow label="Base de données" value="À brancher (Supabase)" />
            <DetailRow label="Authentification" value="Provisoire — Supabase Auth à venir" />
          </dl>

          <div className="mt-5 flex items-start gap-3 rounded-md bg-avis-warning-bg px-4 py-3.5">
            <AlertTriangle
              size={18}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-avis-warning-text"
              aria-hidden="true"
            />
            <p className="text-caption text-avis-warning-text">
              <strong className="font-semibold">Avant mise en production :</strong> brancher
              Supabase (PostgreSQL, Storage, Auth), activer les politiques RLS sur les tables
              publiques et remplacer l&apos;authentification provisoire du back-office.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
