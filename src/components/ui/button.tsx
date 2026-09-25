import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Bouton Avis+ — DESIGN_SYSTEM_AVIS_PLUS.md §17, §18, §30.
 *
 * - `primary`   : CTA principal, fond jaune/or
 * - `secondary` : fond blanc bordé, pour les actions secondaires
 * - `ghost`     : sans fond, pour les actions discrètes
 * - `dark`      : fond noir, pour les blocs à fort contraste
 * - `whatsapp`  : action WhatsApp
 * - `danger`    : action destructive
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "dark"
  | "whatsapp"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-avis-primary text-avis-black hover:bg-avis-primary-hover active:bg-avis-primary-dark shadow-sm",
  secondary:
    "bg-white text-avis-black border border-avis-border hover:bg-avis-soft active:bg-avis-border/60",
  ghost: "bg-transparent text-avis-black hover:bg-avis-soft active:bg-avis-border/50",
  dark: "bg-avis-black text-white hover:bg-avis-black/90 active:bg-avis-black",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1EBE5A] active:bg-[#199C4A] shadow-sm",
  danger: "bg-avis-error text-white hover:bg-[#B91C1C] active:bg-[#991B1B]",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-body-sm gap-1.5",
  md: "h-11 px-5 text-body-sm gap-2",
  lg: "h-[52px] px-6 text-body gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-pill font-semibold transition-colors duration-fast ease-out " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Occupe toute la largeur disponible (§28 : boutons de page digitale). */
  fullWidth?: boolean;
  /** Icône affichée à gauche du libellé (§18). */
  icon?: ReactNode;
  /** Icône affichée à droite du libellé. */
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
  /** §30 — État de chargement : désactive le bouton et affiche un indicateur. */
  loading?: boolean;
}

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type AnchorProps = CommonProps & {
  href: string;
  /** Ouvre le lien dans un nouvel onglet (liens externes : WhatsApp, Maps…). */
  external?: boolean;
};

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    icon,
    iconRight,
    className,
    children,
    loading,
  } = props;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {loading ? (
        <Loader2 className="size-[18px] animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={loading || undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    fullWidth: _f,
    icon: _i,
    iconRight: _ir,
    className: _c,
    children: _ch,
    loading: _l,
    ...buttonProps
  } = props as ButtonProps;

  return (
    <button className={classes} disabled={loading || buttonProps.disabled} {...buttonProps}>
      {content}
    </button>
  );
}

/** §38 — Bouton composé uniquement d'une icône : `aria-label` obligatoire. */
export function IconButton({
  label,
  children,
  className,
  variant = "ghost",
  ...props
}: Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "aria-label"> & {
  label: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-fast ease-out",
        VARIANTS[variant],
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avis-primary focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
