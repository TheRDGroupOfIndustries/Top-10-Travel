"use server";

import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { $Enums } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function updateUserAction({
  id,
  ...values
}: {
  role: $Enums.Role;
  id: string;
  username: string;
  email: string;
}) {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized! Admin Only" };
  }
  try {
    // if (values.role === "ADMIN")
    //   return { error: "Cannot change user role to admin." };
    if (values.role !== "COMPANY" && values.role !== "ADMIN") {
      const hasCompany = await db.company.findUnique({ where: { userId: id } });
      if (hasCompany)
        return { error: "Cannot update user role while they have a company." };
    }

    const res = await db.user.update({
      where: { id: id },
      data: { ...values },
    });
    revalidatePath("/admin/users");
    return { success: "User updated successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Failed to update user." };
  }
}
