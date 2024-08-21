"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Reviews } from "@prisma/client";
import { headers } from "next/headers";

export const createReviewAction = async ({
  values,
  info,
}: {
  values: Pick<Reviews, "review" | "name" | "rating">;
  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };
}) => {
  const session = await getSessionorRedirect();
  let config: any;
  if (info.type === "Agency")
    config = { Agency: { connect: { id: info.agencyId } } };
  else if (info.type === "Dmc")
    config = { Dmc: { connect: { id: info.dmcId } } };
  else config = { Hotel: { connect: { id: info.hotelId } } };
  try {
    await db.$transaction(async (tx) => {
      const res = await tx.reviews.create({
        data: {
          ...values,
          ...config,
          user: { connect: { id: session.user.id } },
        },
        select: { id: true },
      });
      const condition =
        info.type === "Agency"
          ? { agencyId: info.agencyId }
          : info.type === "Dmc"
          ? { dmcId: info.dmcId }
          : { hotelId: info.hotelId };
      const { _avg } = await tx.reviews.aggregate({
        where: condition,
        _avg: { rating: true },
      });

      if (_avg.rating) {
        if (info.type === "Agency")
          await tx.agency.update({
            where: { id: info.agencyId },
            data: { rating: _avg.rating, reviews: { increment: 1 } },
          });
        else if (info.type === "Dmc")
          await tx.dMC.update({
            where: { id: info.dmcId },
            data: { rating: _avg.rating, reviews: { increment: 1 } },
          });
        else
          await tx.hotel.update({
            where: { id: info.hotelId },
            data: { rating: _avg.rating, reviews: { increment: 1 } },
          });
      }
    });

    return { success: "Review added successfully." };
  } catch (error: any) {
    return {
      error: error.message?.includes("Unique constraint failed")
        ? "You can only add one review."
        : "Failed to add your review.",
    };
  }
};
