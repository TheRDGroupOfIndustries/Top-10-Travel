"use server";
import { db } from "@/core/client/db";
import { Reviews } from "@prisma/client";
import { headers } from "next/headers";

const getIp = () => {
  const headersList = headers();
  const forwardedfor = headersList.get("x-forwarded-for");
  if (forwardedfor) {
    return forwardedfor.split(",")[0];
  }
  const realip = headersList.get("x-real-ip");
  if (realip) return realip;
  throw new Error("Client has no IP address.");
};

export const createReviewAction = async (
  values: Pick<Reviews, "review" | "name" | "companyId" | "rating">
) => {
  try {
    const ip = getIp();

    const res = await db.reviews.create({
      data: { ...values, ip },
      select: { id: true },
    });
    const { _avg } = await db.reviews.aggregate({
      where: { companyId: values.companyId },
      _avg: { rating: true },
    });
    if (_avg.rating) {
      await db.company.update({
        where: { id: values.companyId },
        data: { rating: _avg.rating, reviews: { increment: 1 } },
      });
    }
    return { success: "Review added successfully." };
  } catch (error: any) {
    console.log(error.message ?? error);
    return {
      error:
        error.meta.target[0] === "ip"
          ? "You can only add one review."
          : "Failed to add your review.",
    };
  }
};
