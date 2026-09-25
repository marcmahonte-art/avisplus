"use server";

import { redirect } from "next/navigation";

import { signIn } from "@/lib/auth";

/**
 * Server action de connexion au back-office.
 *
 * ⚠️ V1 provisoire : l'authentification s'appuie sur des identifiants de démonstration
 * (`src/lib/auth.ts`). Elle sera remplacée par Supabase Auth (cahier des charges §33).
 */

export interface LoginState {
  error: string | null;
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Renseignez votre email et votre mot de passe." };
  }

  const success = await signIn(email, password);

  if (!success) {
    return { error: "Identifiants incorrects. Vérifiez votre email et votre mot de passe." };
  }

  // La redirection lève une exception interne : elle doit rester hors du try/catch.
  redirect("/admin/dashboard");
}
