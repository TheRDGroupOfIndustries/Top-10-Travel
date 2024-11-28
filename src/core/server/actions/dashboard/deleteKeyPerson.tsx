"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
export const deleteKeyPersonAction = async ({
  id,
  agencyId,
  dmcId,
}: {
  id: string;
  agencyId?: string;
  dmcId?: string;
}) => {
  const session = await getSessionorRedirect();

  try {
    await db.keyPersonnel.delete({
      where: {
        id,
        agencyId,
        dmcId,
      },
    });
    revalidatePath("/dashboard/" + (agencyId?.toString() ?? dmcId));
    return { success: "Key Person Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
