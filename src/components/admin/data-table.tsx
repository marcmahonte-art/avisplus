import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Tableau de données du back-office.
 * Volontairement sobre : sur mobile, le tableau défile horizontalement plutôt que
 * de se transformer en cartes, ce qui garde une lecture comparative rapide.
 */

export interface DataTableColumn<T> {
  key: string;
  header: string;
  /** Largeur indicative appliquée à la colonne. */
  className?: string;
  render: (row: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "Aucun élément à afficher.",
  className,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
  className?: string;
}) {
  if (rows.length === 0) {
    return (
      <Card className={cn("px-6 py-14 text-center", className)}>
        <p className="text-body text-avis-muted">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="avis-scroll-x">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Liste des éléments</caption>
          <thead>
            <tr className="border-b border-avis-border bg-avis-soft">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-caption font-semibold uppercase tracking-[0.1em] text-avis-muted",
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-avis-border last:border-b-0 transition-colors duration-fast hover:bg-avis-soft/70"
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-4 py-3.5 align-middle", column.className)}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/** Ligne de tableau générique pour les cas simples. */
export function DataTableEmpty({ children }: { children: ReactNode }) {
  return (
    <Card className="px-6 py-14 text-center">
      <p className="text-body text-avis-muted">{children}</p>
    </Card>
  );
}
