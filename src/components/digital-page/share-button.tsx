"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

/**
 * Bouton de partage de la page digitale — prompt §2.
 * Utilise l'API Web Share quand elle est disponible, sinon copie le lien.
 */
export function ShareButton({ businessName }: { businessName: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: businessName,
      text: `Découvrez ${businessName} sur Avis+`,
      url,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // L'utilisateur a annulé le partage : aucune action nécessaire.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? "Lien copié" : "Partager cette page"}
      title={copied ? "Lien copié" : "Partager"}
      className="inline-flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition-colors duration-fast hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {copied ? (
        <Check size={18} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Share2 size={18} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  );
}
