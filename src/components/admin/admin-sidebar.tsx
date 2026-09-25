"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  CalendarCheck,
  Globe,
  LogOut,
  Menu,
  Package,
  QrCode,
  Radio,
  Settings,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

/**
 * Navigation du back-office — cahier des charges §20.
 * Le menu reprend exactement les entrées prévues au cahier des charges.
 */

const NAV_GROUPS = [
  {
    title: "Pilotage",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
      { label: "Commandes", href: "/admin/commandes", icon: ShoppingBag },
      { label: "Installations", href: "/admin/installations", icon: CalendarCheck },
    ],
  },
  {
    title: "Contenus",
    items: [
      { label: "Entreprises", href: "/admin/entreprises", icon: Building2 },
      { label: "Pages digitales", href: "/admin/pages", icon: Globe },
      { label: "Produits", href: "/admin/produits", icon: Package },
      { label: "Réalisations", href: "/admin/realisations", icon: Sparkles },
    ],
  },
  {
    title: "Supports",
    items: [
      { label: "QR Codes", href: "/admin/qr", icon: QrCode },
      { label: "NFC", href: "/admin/nfc", icon: Radio },
      { label: "Paramètres", href: "/admin/parametres", icon: Settings },
    ],
  },
] as const;

export function AdminSidebar({ email, signOutAction }: { email: string | null; signOutAction: () => Promise<void> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const nav = (
    <nav aria-label="Navigation du back-office" className="flex flex-col gap-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="px-3 text-caption font-semibold uppercase tracking-[0.14em] text-avis-muted">
            {group.title}
          </p>
          <ul className="mt-2 flex flex-col gap-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-10 items-center gap-3 rounded-md px-3 text-body-sm font-medium transition-colors duration-fast ease-out",
                    isActive(item.href)
                      ? "bg-avis-primary-light text-avis-black"
                      : "text-avis-text hover:bg-avis-soft hover:text-avis-black",
                  )}
                >
                  <item.icon
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className={isActive(item.href) ? "text-avis-primary-dark" : "text-avis-muted"}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Barre mobile */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-avis-border bg-white px-4 py-3 lg:hidden">
        <Link href="/admin/dashboard" aria-label="Avis+ — back-office">
          <Logo size="sm" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="inline-flex size-11 items-center justify-center rounded-full text-avis-black transition-colors duration-fast hover:bg-avis-soft"
        >
          {open ? (
            <X size={22} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-[61px] bottom-0 z-40 overflow-y-auto border-t border-avis-border bg-white p-4 lg:hidden">
          {nav}
          <form action={signOutAction} className="mt-6 border-t border-avis-border pt-4">
            <button
              type="submit"
              className="flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:bg-avis-soft hover:text-avis-black"
            >
              <LogOut size={18} strokeWidth={1.8} aria-hidden="true" className="text-avis-muted" />
              Se déconnecter
            </button>
          </form>
        </div>
      ) : null}

      {/* Barre latérale desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-avis-border bg-white lg:flex lg:flex-col">
        <div className="flex h-[88px] items-center border-b border-avis-border px-5">
          <Link href="/admin/dashboard" aria-label="Avis+ — back-office">
            <Logo size="md" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{nav}</div>

        <div className="border-t border-avis-border p-4">
          {email ? (
            <p className="truncate px-1 text-caption text-avis-muted" title={email}>
              {email}
            </p>
          ) : null}
          <form action={signOutAction} className="mt-2">
            <button
              type="submit"
              className="flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:bg-avis-soft hover:text-avis-black"
            >
              <LogOut size={18} strokeWidth={1.8} aria-hidden="true" className="text-avis-muted" />
              Se déconnecter
            </button>
          </form>
          <Link
            href="/"
            className="mt-1 flex min-h-10 items-center gap-3 rounded-md px-3 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:bg-avis-soft hover:text-avis-black"
          >
            <Globe size={18} strokeWidth={1.8} aria-hidden="true" className="text-avis-muted" />
            Voir le site public
          </Link>
        </div>
      </aside>
    </>
  );
}
