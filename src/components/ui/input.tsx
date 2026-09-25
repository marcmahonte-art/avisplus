import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Champs de formulaire Avis+ — DESIGN_SYSTEM_AVIS_PLUS.md §29.
 * Hauteur 48–52px, bordure 1px, rayon 10px, focus jaune/or avec halo.
 */

const FIELD_BASE =
  "w-full rounded-[10px] border border-avis-border bg-white px-3.5 text-body text-avis-black " +
  "placeholder:text-avis-muted/70 transition-colors duration-fast ease-out " +
  "focus:border-avis-primary focus:outline-none focus:ring-[3px] focus:ring-avis-primary/15 " +
  "disabled:cursor-not-allowed disabled:bg-avis-soft disabled:text-avis-muted";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/** Enveloppe commune : label 14px/600, indication et message d'erreur. */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-body-sm font-semibold text-avis-black">
        {label}
        {required ? (
          <span className="ml-1 text-avis-error" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-body-sm font-normal text-avis-muted">(facultatif)</span>
        )}
      </label>
      {children}
      {error ? (
        <p className="text-caption text-avis-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-caption text-avis-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(FIELD_BASE, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea className={cn(FIELD_BASE, "min-h-[104px] resize-y py-3", className)} {...props} />
  );
}

export function Select({ className, children, ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn(FIELD_BASE, "h-12 pr-10", className)} {...props}>
      {children}
    </select>
  );
}

/** Groupe de boutons radio présenté sous forme de cartes sélectionnables. */
export function RadioCardGroup({
  name,
  options,
  defaultValue,
  className,
}: {
  name: string;
  options: { value: string; label: string; description?: string }[];
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)} role="radiogroup">
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-md border border-avis-border bg-white p-4 transition-colors duration-fast ease-out",
            "hover:border-avis-primary/60 has-[:checked]:border-avis-primary has-[:checked]:bg-avis-primary-light/50",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            className="mt-0.5 size-4 shrink-0 accent-avis-primary"
          />
          <span className="min-w-0">
            <span className="block text-body-sm font-semibold text-avis-black">
              {option.label}
            </span>
            {option.description ? (
              <span className="mt-0.5 block text-caption text-avis-muted">
                {option.description}
              </span>
            ) : null}
          </span>
        </label>
      ))}
    </div>
  );
}

/** Case à cocher alignée, utilisée notamment par la checklist d'installation (§29). */
export function CheckboxField({
  id,
  label,
  defaultChecked,
  className,
}: {
  id: string;
  label: string;
  defaultChecked?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md border border-avis-border bg-white px-4 py-3 transition-colors duration-fast ease-out",
        "hover:border-avis-primary/60 has-[:checked]:border-avis-primary has-[:checked]:bg-avis-primary-light/40",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 shrink-0 accent-avis-primary"
      />
      <span className="text-body-sm font-medium text-avis-black">{label}</span>
    </label>
  );
}
