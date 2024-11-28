"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { ClientReference, KeyPersonnel, PastProject } from "@prisma/client";
export const createKeyPersonAction = async ({
  agencyId,
  dmcId,
  data,
  id,
}: {
  agencyId?: string;
  dmcId?: string;
  data: Pick<
    KeyPersonnel,
    "name" | "position" | "specialization" | "yearsOfExperience"
  >;
  id?: string;
}) => {
  const session = await getSessionorRedirect();

  try {
    let count = 0;
    if (agencyId) {
      count = await db.keyPersonnel.count({ where: { agencyId } });
    } else {
      count = await db.keyPersonnel.count({ where: { dmcId } });
    }
    if (count >= 5) return { error: "Can Only Add upto 5 Key Persons." };

    if (agencyId) {
      if (!id)
        await db.agency.update({
          where: { id: agencyId },
          data: { keyPersonnel: { create: { ...data } } },
        });
      else
        await db.agency.update({
          where: { id: agencyId },
          data: {
            keyPersonnel: { update: { where: { id }, data: { ...data } } },
          },
        });
    } else if (dmcId) {
      if (!id)
        await db.dMC.update({
          where: { id: dmcId },
          data: { keyPersonnel: { create: { ...data } } },
        });
      else
        await db.dMC.update({
          where: { id: dmcId },
          data: {
            keyPersonnel: { update: { where: { id }, data: { ...data } } },
          },
        });
    }
    revalidatePath("/dashboard/" + (agencyId?.toString() ?? dmcId));
    return { success: "Key Person Added Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
