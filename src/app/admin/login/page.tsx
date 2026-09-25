import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Card } from "@/components/ui/card";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/app/admin/login/login-form";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

/**
 * Page de connexion au back-office — cahier des charges §33.
 *
 * ⚠️ V1 provisoire : les identifiants de démonstration sont préremplis pour faciliter
 * la prise en main. Ils doivent être retirés (et l'authentification remplacée par
 * Supabase Auth) avant toute mise en production.
 */
export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin/dashboard");
  }

  const demoEmail = process.env.ADMIN_EMAIL ?? "admin@avisplus.bf";
  const demoPassword = process.env.ADMIN_PASSWORD ?? "avisplus2026";

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <Link href="/" aria-label="Avis+ — retour au site public">
            <Logo size="lg" />
          </Link>
          <p className="mt-3 text-body-sm text-avis-muted">Espace équipe Avis+</p>
        </div>

        <Card className="mt-8 p-6 sm:p-8">
          <h1 className="text-h3 text-avis-black">Connexion</h1>
          <p className="mt-2 text-body-sm text-avis-text">
            Accès réservé à l&apos;équipe Avis+. Les commandes, entreprises, pages digitales et
            installations se gèrent depuis cet espace.
          </p>

          <div className="mt-6">
            <LoginForm demoEmail={demoEmail} demoPassword={demoPassword} />
          </div>
        </Card>

        <div className="mt-5 flex items-start gap-2.5 rounded-md bg-avis-warning-bg px-4 py-3.5">
          <ShieldAlert
            size={18}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-avis-warning-text"
            aria-hidden="true"
          />
          <p className="text-caption text-avis-warning-text">
            <strong className="font-semibold">Environnement de démonstration.</strong> Les
            identifiants sont préremplis et l&apos;authentification définitive (Supabase Auth)
            sera activée avec la base de données.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:text-avis-black"
          >
            <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
            Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
