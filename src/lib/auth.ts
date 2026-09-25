import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * AVIS+ — Authentification administrateur (V1, provisoire).
 *
 * ⚠️ IMPORTANT — À REMPLACER AVANT TOUTE MISE EN PRODUCTION
 * ---------------------------------------------------------
 * Le cahier des charges §33 prévoit une authentification par **Supabase Auth** :
 * email, mot de passe, réinitialisation et protection des routes `/admin`.
 *
 * En attendant le branchement de la base, cette V1 met en place une session signée
 * (HMAC) alimentée par des identifiants de démonstration. Elle suffit à protéger
 * l'interface pendant le développement, mais **ne doit pas être considérée comme
 * une authentification de production** : il n'y a ni hachage de mot de passe en base,
 * ni gestion multi-utilisateurs, ni réinitialisation.
 *
 * Migration prévue : remplacer `signIn`/`signOut`/`isAuthenticated` par les appels
 * `supabase.auth.signInWithPassword`, `signOut` et `getUser`, sans toucher aux pages.
 */

const COOKIE_NAME = "avis_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 heures

/** Secret de signature de la session. À définir via `ADMIN_SESSION_SECRET`. */
const SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "avisplus-v1-session-secret-a-remplacer";

/** Identifiants de démonstration, surchargeables par variables d'environnement. */
const DEMO_EMAIL = process.env.ADMIN_EMAIL ?? "admin@avisplus.bf";
const DEMO_PASSWORD = process.env.ADMIN_PASSWORD ?? "avisplus2026";

/** Construit le jeton de session signé. */
function createToken(email: string): string {
  const issuedAt = Date.now().toString();
  const payload = `${email}|${issuedAt}`;
  const signature = createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

/** Vérifie un jeton et renvoie l'email associé, ou `null` si le jeton est invalide. */
function verifyToken(token: string | undefined): string | null {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, "base64url").toString();
  } catch {
    return null;
  }

  const expected = createHmac("sha256", SECRET).update(payload).digest("hex");

  // Comparaison à temps constant pour éviter les attaques par mesure de temps.
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return null;

  const [email, issuedAt] = payload.split("|");
  if (!email || !issuedAt) return null;

  // Expiration de la session.
  if (Date.now() - Number(issuedAt) > SESSION_MAX_AGE * 1000) return null;

  return email;
}

/** Indique si la requête courante porte une session administrateur valide. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value) !== null;
}

/** Renvoie l'email de l'administrateur connecté, ou `null`. */
export async function getSessionEmail(): Promise<string | null> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

/**
 * Ouvre une session si les identifiants correspondent.
 * ⚠️ V1 : comparaison directe avec des identifiants de démonstration.
 */
export async function signIn(email: string, password: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== DEMO_EMAIL.toLowerCase() || password !== DEMO_PASSWORD) {
    return false;
  }

  const store = await cookies();
  store.set(COOKIE_NAME, createToken(normalizedEmail), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return true;
}

/** Ferme la session courante. */
export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
