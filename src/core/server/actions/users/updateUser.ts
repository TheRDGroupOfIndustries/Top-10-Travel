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
  }  catch (error: unknown) {
    console.log(error);

      // Check if it's a Prisma unique constraint error
      if (error instanceof Error) {
        if (error.message.includes('Unique constraint failed')) {
            // Extract the field name from the error message
            const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
            const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
    
            return { error: `Failed to Create: A company with this ${fieldName} already exists.` };
        }
        return { error: `Failed to Create: ${error.message}` };
    }
    
  
  
    return { error: "Failed to Create: An unknown error occurred." };
}

}
