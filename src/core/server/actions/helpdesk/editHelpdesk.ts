"use server";

import { db } from "@/core/client/db";
import { HelpDesk } from "@prisma/client";
import { revalidatePath } from "next/cache";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const updateHelpdeskStatus = async (
  id: string,
  values: Pick<HelpDesk, "status">
) => {
  //   const validatedFields = FormSchema.safeParse(values);
  const session = await getSessionorRedirect();

  try {
    await db.helpDesk.update({
      where: { id },
      data: {
        status: values.status,
      },
    });
    // revalidatePath("/account/helpdesk");

    return { success: "Helpdesk updated Succesfully." };
  } catch (_error) {
    return { error: "Failed updating helpdesk." };
  }
};
