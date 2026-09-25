"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button, IconButton } from "@/components/ui/button";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Header du site public — DESIGN_SYSTEM_AVIS_PLUS.md §19 et §20.
 * Logo à gauche, navigation centrée, CTA à droite. Sur mobile : logo + menu.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Empêche le défilement de l'arrière-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-avis-border/70 bg-white/90 backdrop-blur-md">
      <div className="avis-container flex h-[72px] items-center justify-between gap-6 lg:h-[88px]">
        <Link href="/" aria-label="Avis+ — retour à l'accueil" className="shrink-0">
          <Logo size="md" />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-block py-1 text-nav transition-colors duration-fast ease-out",
                    isActive(item.href)
                      ? "text-avis-black"
                      : "text-avis-text hover:text-avis-black",
                  )}
                >
                  {item.label}
                  {/* §20 — Indicateur d'élément actif : trait jaune/or de 2px */}
                  {isActive(item.href) ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-avis-primary"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/commander"
            size="md"
            icon={<ShoppingCart size={18} strokeWidth={1.8} aria-hidden="true" />}
            className="hidden sm:inline-flex"
          >
            Commander
          </Button>

          {/* §19 — Mobile : logo + menu */}
          <IconButton
            label={open ? "Fermer le menu" : "Ouvrir le menu"}
            variant="ghost"
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? (
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
            )}
          </IconButton>
        </div>
      </div>

      {/* Panneau mobile */}
      {open ? (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 animate-fade-in overflow-y-auto border-t border-avis-border bg-white px-5 pb-8 pt-6 lg:hidden"
        >
          <nav aria-label="Navigation principale (mobile)">
            <ul className="flex flex-col gap-1">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-[52px] items-center rounded-md px-4 text-body font-medium transition-colors duration-fast ease-out",
                      isActive(item.href)
                        ? "bg-avis-primary-light text-avis-black"
                        : "text-avis-text hover:bg-avis-soft hover:text-avis-black",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button
            href="/commander"
            size="lg"
            fullWidth
            className="mt-6"
            icon={<ShoppingCart size={20} strokeWidth={1.8} aria-hidden="true" />}
          >
            Commander
          </Button>
        </div>
      ) : null}
    </header>
  );
}
