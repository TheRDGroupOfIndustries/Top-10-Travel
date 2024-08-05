"use server";

import { db } from "@/core/client/db";
import { Notification } from "@prisma/client";
import { revalidatePath } from "next/cache";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const createNotificationAction = async (values: Pick<Notification, "message"|"type"|"companyId">) => {
  const session = await getSessionorRedirect();
  try {
    await db.notification.create({
      data: {
        message:values.message,
        type:values.type,
        company: { connect: { id: values.companyId } },
      },
    });
    // here we need to send email etc...
    return { success: "Notification created Succesfully." };
  } catch (_error) {
    return { error: "Could not send the notification." };
  }
};
