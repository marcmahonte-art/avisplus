import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Gabarit du site public Avis+.
 * Le groupe de routes `(site)` n'apparaît pas dans l'URL : il ne sert qu'à isoler
 * la navigation publique des pages `/p/[slug]` et `/admin`.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
