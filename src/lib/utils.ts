import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes Tailwind en résolvant les conflits. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** §26 — Formatage des prix en FCFA (séparateur d'espace insécable, sans décimale). */
export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(value).replace(/\u202f|\u00a0/g, " ")} FCFA`;
}

/** Formate une date au format français court (ex. « 24 sept. 2026 »). */
export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Formate une date et une heure (ex. « 24 sept. 2026 · 14:30 »). */
export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return `${formatDate(date)} · ${new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)}`;
}

/**
 * §27 — Transforme un nom d'entreprise en slug d'URL.
 * « Le Délice » → « le-delice »
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** §26 — URL publique stable d'une entreprise. Jamais régénérée, même si le QR est refait. */
export function publicPageUrl(slug: string, baseUrl?: string): string {
  const base = baseUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://avisplus.bf";
  return `${base.replace(/\/$/, "")}/p/${slug}`;
}

/** Tronque un texte proprement sur un mot. */
export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, value.lastIndexOf(" ", max))}…`;
}

/** Initiales utilisées par les avatars de secours. */
export function initials(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
