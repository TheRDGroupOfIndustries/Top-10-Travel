"use server";

import { db } from "@/core/client/db";
import { HelpDesk } from "@prisma/client";
import { revalidatePath } from "next/cache";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const createHelpDeskAction = async (
  values: Pick<HelpDesk, "title"|"description">
) => {
  //   const validatedFields = FormSchema.safeParse(values);
  const session = await getSessionorRedirect();

  try {
    await db.helpDesk.create({
      data: {
        ...values,
        status:"PENDING",
        user: { connect: { id: session.user.id } },
      },
    });
    // revalidatePath("/account/helpdesk");

    return { success: "Helpdesk created Succesfully." };
  } catch (_error) {
    return { error: "Failed creating helpdesk." };
  }
};
