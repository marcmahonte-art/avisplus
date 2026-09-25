import Link from "next/link";

import type { BusinessCategoryDef } from "@/lib/categories";
import { cn } from "@/lib/utils";

/**
 * Filtre par catégorie, partagé par le back-office et le site public.
 *
 * Les catégories proviennent du référentiel `categorie.md` : seules celles qui
 * contiennent au moins un élément sont proposées, avec leur compteur.
 * Le filtre est porté par l'URL (`?categorie=...`), donc partageable et
 * compatible avec le rendu serveur — aucun JavaScript nécessaire.
 */
export interface CategoryFilterItem {
  category: BusinessCategoryDef;
  /** Nombre d'éléments rattachés à cette catégorie. */
  count: number;
}

export function CategoryFilter({
  items,
  activeCategoryId,
  basePath,
  allLabel = "Toutes",
  ariaLabel = "Filtrer par catégorie",
}: {
  items: CategoryFilterItem[];
  activeCategoryId?: string;
  basePath: string;
  allLabel?: string;
  ariaLabel?: string;
}) {
  const total = items.reduce((sum, item) => sum + item.count, 0);

  const itemClass = (active: boolean) =>
    cn(
      "inline-flex min-h-10 items-center gap-1.5 rounded-pill border px-4 text-body-sm font-medium transition-colors duration-fast ease-out",
      active
        ? "border-avis-black bg-avis-black text-white"
        : "border-avis-border bg-white text-avis-text hover:border-avis-black/30 hover:text-avis-black",
    );

  return (
    <nav aria-label={ariaLabel}>
      <ul className="avis-scroll-x -mx-1 flex gap-2 px-1 md:mx-0 md:flex-wrap md:px-0">
        <li className="shrink-0">
          <Link
            href={basePath}
            aria-current={!activeCategoryId ? "true" : undefined}
            className={itemClass(!activeCategoryId)}
          >
            {allLabel}
            <span className={cn(!activeCategoryId ? "text-white/70" : "text-avis-muted")}>
              {total}
            </span>
          </Link>
        </li>

        {items.map(({ category, count }) => {
          const active = category.id === activeCategoryId;
          return (
            <li key={category.id} className="shrink-0">
              <Link
                href={`${basePath}?categorie=${category.id}`}
                aria-current={active ? "true" : undefined}
                className={itemClass(active)}
              >
                {category.label}
                <span className={cn(active ? "text-white/70" : "text-avis-muted")}>{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
