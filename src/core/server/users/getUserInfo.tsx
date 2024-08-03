import { db } from "@/core/client/db";

export default async function getUserInfo({ email }: { email: string }) {
  try {
    const info = await db.user.findUnique({
      where: { email },
      select: { role: true, id: true },
    });
    return info;
  } catch (err) {
    console.log(err);
    return null;
  }
}
