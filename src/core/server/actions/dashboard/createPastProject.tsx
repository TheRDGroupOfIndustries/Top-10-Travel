"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { PastProject } from "@prisma/client";
export const createPastProject = async ({
  agencyId,
  dmcId,
  data,
}: {
  agencyId?: string;
  dmcId?: string;
  data: Pick<
    PastProject,
    "clientName" | "description" | "projectName" | "year"
  >;
}) => {
  const session = await getSessionorRedirect();

  try {
    let count = 0;
    if(agencyId){
        count = await db.pastProject.count({where:{agencyId}})
    }else{
        count = await db.pastProject.count({where:{dmcId}})
    }
    if(count>=5) return {error:"Can Only Add upto 5 past Projects"};
    
    if (agencyId) {
      await db.agency.update({
        where: { id: agencyId },
        data: { pastProjects: { create: { ...data } } },
      });
    } else if (dmcId) {
      await db.dMC.update({
        where: { id: dmcId },
        data: { pastProjects: { create: { ...data } } },
      });
    }
    revalidatePath("/dashboard/" + agencyId ?? dmcId);
    return { success: "Past Project Added Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
