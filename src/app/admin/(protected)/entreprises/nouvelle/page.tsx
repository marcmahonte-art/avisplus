import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BusinessEditor } from "@/components/admin/business-editor";
import { AdminPageHeader } from "@/components/admin/stat-card";
import { getBusinessCategories } from "@/lib/data";

export const metadata: Metadata = { title: "Nouvelle entreprise" };

/** Création d'une entreprise — cahier des charges §23. */
export default async function AdminNouvelleEntreprisePage() {
  const categories = await getBusinessCategories();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/admin/entreprises"
          className="inline-flex items-center gap-2 text-body-sm font-medium text-avis-text transition-colors duration-fast hover:text-avis-black"
        >
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          Toutes les entreprises
        </Link>
      </div>

      <AdminPageHeader
        title="Nouvelle entreprise"
        description="Renseignez l'identité du commerce, ses coordonnées et son lien d'avis Google. La page digitale est générée à partir de ces informations."
      />

      <div className="max-w-4xl">
        <BusinessEditor categories={categories} />
      </div>
    </div>
  );
}
