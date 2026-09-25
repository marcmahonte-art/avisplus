import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Le back-office n'est jamais indexé par les moteurs de recherche. */
export const metadata: Metadata = {
  title: {
    default: "Back-office",
    template: "%s · Avis+ Back-office",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-avis-soft">{children}</div>;
}
