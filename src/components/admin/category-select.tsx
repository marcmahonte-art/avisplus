"use client";

import { useState } from "react";

import { Field, Select } from "@/components/ui/input";
import type { BusinessCategoryDef } from "@/lib/categories";

/**
 * Sélecteur de classement d'une entreprise — catégorie puis sous-catégorie.
 *
 * La sous-catégorie dépend de la catégorie choisie : on ne propose que les valeurs
 * du référentiel `categorie.md`. Le libellé complet affiché partout (« Restauration ›
 * Maquis ») est recalculé côté serveur, jamais saisi à la main.
 */
export function CategorySelect({
  categories,
  defaultCategoryId,
  defaultSubcategory,
}: {
  categories: readonly BusinessCategoryDef[];
  defaultCategoryId?: string;
  defaultSubcategory?: string | null;
}) {
  const [categoryId, setCategoryId] = useState(defaultCategoryId ?? "");

  const activeCategory = categories.find((category) => category.id === categoryId);
  const subcategories = activeCategory?.subcategories ?? [];
  const preview = activeCategory
    ? defaultSubcategory && categoryId === defaultCategoryId
      ? `${activeCategory.label} › ${defaultSubcategory}`
      : activeCategory.label
    : null;

  return (
    <>
      <Field label="Catégorie" htmlFor="biz-category" required>
        <Select
          id="biz-category"
          name="categoryId"
          required
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">— Choisir une catégorie —</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Sous-catégorie"
        htmlFor="biz-subcategory"
        hint={
          activeCategory
            ? `${subcategories.length} sous-catégorie${subcategories.length > 1 ? "s" : ""} disponible${subcategories.length > 1 ? "s" : ""} pour « ${activeCategory.label} ».`
            : "Choisissez d'abord une catégorie."
        }
      >
        <Select
          /* La clé force la réinitialisation quand la catégorie change. */
          key={categoryId}
          id="biz-subcategory"
          name="subcategory"
          defaultValue={
            categoryId === defaultCategoryId ? (defaultSubcategory ?? "") : ""
          }
          disabled={!activeCategory}
        >
          <option value="">— Aucune —</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </Select>
      </Field>

      {preview ? (
        <p className="text-caption text-avis-muted sm:col-span-2">
          Classement affiché : <span className="font-medium text-avis-text">{preview}</span>
        </p>
      ) : null}
    </>
  );
}
