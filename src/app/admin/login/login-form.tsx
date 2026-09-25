"use client";

import { useActionState } from "react";
import { Lock, Mail, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const INITIAL_STATE: LoginState = { error: null };

/** Formulaire de connexion au back-office — cahier des charges §33. */
export function LoginForm({ demoEmail, demoPassword }: { demoEmail: string; demoPassword: string }) {
  const [state, formAction, pending] = useActionState(loginAction, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field label="Email" htmlFor="admin-email" required>
        <div className="relative">
          <Mail
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-avis-muted"
          />
          <Input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={demoEmail}
            placeholder="admin@avisplus.bf"
            className="pl-11"
          />
        </div>
      </Field>

      <Field label="Mot de passe" htmlFor="admin-password" required>
        <div className="relative">
          <Lock
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-avis-muted"
          />
          <Input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            defaultValue={demoPassword}
            placeholder="••••••••"
            className="pl-11"
          />
        </div>
      </Field>

      {state.error ? (
        <p
          role="alert"
          className="rounded-md bg-avis-error-bg px-4 py-3 text-body-sm font-medium text-avis-error-text"
        >
          {state.error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        fullWidth
        loading={pending}
        icon={<LogIn size={20} strokeWidth={1.8} aria-hidden="true" />}
      >
        Se connecter
      </Button>
    </form>
  );
}
