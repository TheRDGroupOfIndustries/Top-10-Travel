"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { ClientReference, PastProject } from "@prisma/client";
export const createClientRefAction = async ({
  agencyId,
  dmcId,
  data,
  id,
}: {
  agencyId?: string;
  dmcId?: string;
  data: Pick<
    ClientReference,
    "clientName" | "testimonial" | "contactEmail" | "contactPhone"
  >;
  id?: string;
}) => {
  const session = await getSessionorRedirect();

  try {
    let count = 0;
    if (agencyId) {
      count = await db.clientReference.count({ where: { agencyId } });
    } else {
      count = await db.clientReference.count({ where: { dmcId } });
    }
    if (count >= 5) return { error: "Can Only Add upto 5 client References." };

    if (agencyId) {
      if (!id)
        await db.agency.update({
          where: { id: agencyId },
          data: { clientReferences: { create: { ...data } } },
        });
      else
        await db.agency.update({
          where: { id: agencyId },
          data: {
            clientReferences: { update: { where: { id }, data: { ...data } } },
          },
        });
    } else if (dmcId) {
      if (!id)
        await db.dMC.update({
          where: { id: dmcId },
          data: { clientReferences: { create: { ...data } } },
        });
      else
        await db.dMC.update({
          where: { id: dmcId },
          data: {
            clientReferences: { update: { where: { id }, data: { ...data } } },
          },
        });
    }
    revalidatePath("/dashboard/" + (agencyId?.toString() ?? dmcId));
    return { success: "Past Project Added Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
