import { NextResponse } from "next/server";
import QRCode from "qrcode";

import { getQrCodes } from "@/lib/data";
import { publicPageUrl } from "@/lib/utils";

/**
 * GET /api/qr — génération de QR Code — cahier des charges §26.
 *
 * Paramètres :
 * - `data`   : contenu encodé (par défaut : l'URL publique d'une entreprise)
 * - `slug`   : alternative à `data`, construit l'URL publique depuis le slug
 * - `format` : `svg` (défaut, recommandé pour l'impression) ou `png`
 * - `size`   : taille en pixels pour le PNG (défaut 512)
 * - `download` : `1` pour forcer le téléchargement
 *
 * ⚠️ Règle importante (§26) : régénérer graphiquement le QR Code ne doit **jamais**
 * changer l'URL publique. Ce endpoint se contente d'encoder l'URL existante.
 */

/** Couleurs Avis+ appliquées au QR Code. */
const QR_COLORS = {
  dark: "#050505",
  light: "#FFFFFF",
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const slug = searchParams.get("slug");
  const explicitData = searchParams.get("data");

  // Résolution du contenu à encoder.
  let targetUrl = explicitData ?? "";

  if (!targetUrl && slug) {
    const qrCodes = await getQrCodes();
    const known = qrCodes.find((qr) => qr.slug === slug);
    targetUrl = known?.targetUrl ?? publicPageUrl(slug);
  }

  if (!targetUrl) {
    return NextResponse.json(
      {
        error:
          "Aucune donnée à encoder. Fournissez `data` ou `slug` (ex. /api/qr?slug=le-terroir).",
      },
      { status: 400 },
    );
  }

  // Sécurité : on n'encode que des URL absolues ou des chemins internes.
  if (!/^https?:\/\//.test(targetUrl) && !targetUrl.startsWith("/")) {
    return NextResponse.json(
      { error: "La donnée à encoder doit être une URL absolue ou un chemin interne." },
      { status: 400 },
    );
  }

  const format = (searchParams.get("format") ?? "svg").toLowerCase();
  const size = Math.min(Math.max(Number(searchParams.get("size") ?? 512) || 512, 128), 2048);
  const asDownload = searchParams.get("download") === "1";

  const fileName = `qr-${slug ?? "avisplus"}`;

  const headers = new Headers({
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  });

  if (asDownload) {
    headers.set(
      "Content-Disposition",
      `attachment; filename="${fileName}.${format === "png" ? "png" : "svg"}"`,
    );
  }

  if (format === "png") {
    const buffer = await QRCode.toBuffer(targetUrl, {
      type: "png",
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: QR_COLORS,
    });

    headers.set("Content-Type", "image/png");
    return new NextResponse(new Uint8Array(buffer), { headers });
  }

  const svg = await QRCode.toString(targetUrl, {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
    color: QR_COLORS,
  });

  headers.set("Content-Type", "image/svg+xml; charset=utf-8");
  return new NextResponse(svg, { headers });
}
