import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function getSessionorRedirect() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/auth");
  return session;
}
