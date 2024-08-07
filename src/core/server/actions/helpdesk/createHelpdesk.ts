"use server";

import { db } from "@/core/client/db";
import { HelpDesk } from "@prisma/client";
import { revalidatePath } from "next/cache";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const createHelpDeskAction = async (values: Pick<HelpDesk, "title">) => {
  //   const validatedFields = FormSchema.safeParse(values);
  const session = await getSessionorRedirect();

  try {
    const count = await db.helpDesk.count({
      where: { userId: session.user.id, status: "PENDING" },
    });
    if (count >= 2)
      return {
        error:
          "You cannot have more than 2 pending helpdesks. Wait for admin to resolve before creating a new one.",
      };
      
    await db.helpDesk.create({
      data: {
        ...values,
        description: "",
        status: "PENDING",
        user: { connect: { id: session.user.id } },
      },
    });
    revalidatePath("/company/helpdesk");

    return { success: "Helpdesk created Succesfully." };
  } catch (_error) {
    return { error: "Failed creating helpdesk." };
  }
};
