import { redirect } from "next/navigation";

/** `/admin` redirige vers le tableau de bord (groupe protégé). */
export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}
