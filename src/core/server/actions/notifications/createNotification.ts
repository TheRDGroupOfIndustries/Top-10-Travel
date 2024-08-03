"use server";

import { db } from "@/core/client/db";
import { Notification } from "@prisma/client";
import { revalidatePath } from "next/cache";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const createNotificationAction = async (values: Pick<Notification, "message"|"type">) => {
  const session = await getSessionorRedirect();
  try {
    await db.notification.create({
      data: {
        ...values,
        company: { connect: { id: session.user.companyId } },
      },
    });
    // here we need to send email etc...
    return { success: "Notification created Succesfully." };
  } catch (_error) {
    return { error: "Could not send the notification." };
  }
};
