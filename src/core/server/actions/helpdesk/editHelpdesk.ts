"use server";

import { db } from "@/core/client/db";
import { HelpDesk } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const updateHelpdeskAction = async (
  values: Pick<HelpDesk, "status" | "description" | "id">
) => {
  //   const validatedFields = FormSchema.safeParse(values);
  const session = await getSessionorRedirect();

  if (session.user.role !== "ADMIN")
    return {
      error: "Unauthorized! Admin only",
    };

  try {
    await db.helpDesk.update({
      where: { id: values.id },
      data: {
        status: values.status,
        description: values.description,
      },
    });
    revalidateTag("admin-helpdesk");

    return { success: "Helpdesk updated Succesfully." };
  } catch (_error) {
    return { error: "Failed updating helpdesk." };
  }
};
