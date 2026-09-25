"use client";

import { useState } from "react";
import { Copy, Download, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";

/**
 * Générateur de QR Code — cahier des charges §26.
 *
 * Aperçu en direct via `/api/qr`. Le QR Code encode l'URL publique de l'entreprise :
 * le régénérer ne change jamais cette URL, il ne fait que redessiner le même contenu.
 */
export function QrGenerator({
  businesses,
  initialSlug,
}: {
  businesses: { slug: string; name: string; url: string }[];
  initialSlug?: string;
}) {
  const [slug, setSlug] = useState(initialSlug ?? businesses[0]?.slug ?? "");
  const [format, setFormat] = useState<"svg" | "png">("svg");
  const [copied, setCopied] = useState(false);

  const selected = businesses.find((business) => business.slug === slug);
  const targetUrl = selected?.url ?? "";

  const previewSrc = `/api/qr?slug=${encodeURIComponent(slug)}&format=svg`;
  const downloadSrc = `/api/qr?slug=${encodeURIComponent(slug)}&format=${format}&download=1`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Le presse-papiers peut être indisponible : l'URL reste visible à l'écran.
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col gap-5">
        <Field label="Entreprise" htmlFor="qr-business">
          <Select
            id="qr-business"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          >
            {businesses.map((business) => (
              <option key={business.slug} value={business.slug}>
                {business.name} — /p/{business.slug}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="URL encodée"
          htmlFor="qr-url"
          hint="Cette adresse ne doit jamais changer, sinon les supports déjà imprimés cesseraient de fonctionner."
        >
          <Input id="qr-url" value={targetUrl} readOnly />
        </Field>

        <Field label="Format de téléchargement" htmlFor="qr-format">
          <Select
            id="qr-format"
            value={format}
            onChange={(event) => setFormat(event.target.value as "svg" | "png")}
          >
            <option value="svg">SVG — recommandé pour l&apos;impression</option>
            <option value="png">PNG — pour le web et les réseaux sociaux</option>
          </Select>
        </Field>

        <div className="flex flex-wrap gap-3">
          <Button
            href={downloadSrc}
            external
            icon={<Download size={18} strokeWidth={1.8} aria-hidden="true" />}
          >
            Télécharger le QR Code
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCopy}
            icon={<Copy size={18} strokeWidth={1.8} aria-hidden="true" />}
          >
            {copied ? "URL copiée" : "Copier l'URL"}
          </Button>
        </div>
      </div>

      {/* Aperçu */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-avis-border bg-white p-6">
        {slug ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt={`QR Code de ${selected?.name ?? slug}`}
              width={220}
              height={220}
              className="size-[220px]"
            />
            <p className="mt-4 flex items-center gap-2 text-body-sm font-semibold text-avis-black">
              <QrCode size={16} strokeWidth={1.8} aria-hidden="true" />
              {selected?.name}
            </p>
            <p className="mt-1 break-all text-center text-caption text-avis-muted">{targetUrl}</p>
          </>
        ) : (
          <p className="text-body-sm text-avis-muted">
            Sélectionnez une entreprise pour générer son QR Code.
          </p>
        )}
      </div>
    </div>
  );
}
