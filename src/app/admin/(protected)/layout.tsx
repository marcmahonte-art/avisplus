import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getSessionEmail, isAuthenticated, signOut } from "@/lib/auth";

/**
 * Gabarit protégé du back-office — cahier des charges §20 et §33.
 *
 * La garde d'accès est vérifiée ici, côté serveur, avant tout rendu : une requête non
 * authentifiée est redirigée vers `/admin/login` sans jamais voir le contenu.
 *
 * ⚠️ L'authentification de la V1 est provisoire (voir `src/lib/auth.ts`) et sera
 * remplacée par Supabase Auth.
 */
export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const email = await getSessionEmail();

  /** Server action de déconnexion, transmise à la barre latérale. */
  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <AdminSidebar email={email} signOutAction={handleSignOut} />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-8 md:px-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
