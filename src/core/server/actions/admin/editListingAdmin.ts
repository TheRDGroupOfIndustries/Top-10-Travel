"use server";

import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Prisma } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

type Company = {
  isCertified: boolean;
  name: string;
  priority: number;
  city_priority: number;
  methodology: string | null;
  tags: string[];
  city: string;
  country: string;
};

export const editListingAdmin = async ({
  id,
  type,
  data,
}: {
  id: string;
  data: Company;
  type: "Agency" | "Dmc" | "Hotel";
}) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };
  try {
    if (type === "Agency") {
      // If priority is specified, first check for existing priority
      if (data.city_priority > 0) {
        const existingPriorityAgency = await db.agency.findFirst({
          where: {
            city_priority: data.city_priority,
            city: data.city,
            NOT: { id }, // Exclude the current hotel to allow keeping the same priority
          },
        });

        if (existingPriorityAgency) {
          return {
            error: "Priority already exists for another agency in same city",
          };
        }
      }

      // Perform the update with tags
      await db.agency.update({
        where: { id },
        data: {
          ...data,
          tags: {
            set: data.tags.map((tag) => ({ id: tag })),
          },
        },
      });
    } else if (type === "Dmc") {
      if (data.priority > 0) {
        const existingPriorityDmc = await db.dMC.findFirst({
          where: {
            priority: data.priority,
            country: data.country,
            NOT: { id }, // Exclude the current hotel to allow keeping the same priority
          },
        });

        if (existingPriorityDmc) {
          return {
            error: "Priority already exists for another dmc in same country",
          };
        }
      }
      await db.dMC.update({
        where: { id },
        data: {
          ...data,
          tags: {
            set: data.tags.map((tag) => ({ id: tag })),
          },
        },
      });
    } else if (type === "Hotel") {
      if (data.city_priority > 0) {
        const existingPriorityHotel = await db.hotel.findFirst({
          where: {
            city_priority: data.city_priority,
            city: data.city,
            NOT: { id }, // Exclude the current hotel to allow keeping the same priority
          },
        });

        if (existingPriorityHotel) {
          return {
            error: "Priority already exists for another hotel in same city",
          };
        }
      }
      await db.hotel.update({
        where: { id },
        data: {
          ...data,
          tags: {
            set: data.tags.map((tag) => ({ id: tag })),
          },
        },
      });
    }

    revalidateTag(`/admin/${type.toLowerCase()}`);
    return { success: type + " Updated Successfully." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return {
          error: "Company not found. It may have been already deleted.",
        };
      }
    }
    console.error("Error deleting company:", error);
    return { error: "Something went wrong while deleting the company." };
  }
};
