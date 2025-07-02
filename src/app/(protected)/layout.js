import { checkAuth } from "@/app/middleware/authMiddleware";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const auth = await checkAuth();
  if (!auth.ok) {
    redirect("/login");
  }

  return <>{children}</>;
}
