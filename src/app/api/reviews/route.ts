import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const type = request.nextUrl.searchParams.get("type");
  const id = request.nextUrl.searchParams.get("id");

  if (!type || !id)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  let reviews: {
    id: string;
    name: string;
    rating: number;
    review: string;
    createdAt: Date | null;
    user: { image: string | null };
  }[] = [];

  if (type === "Agency") {
    reviews = await db.reviews.findMany({
      where: { agencyId: id, approved: true },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        userId: true,
        createdAt: true,
        user: { select: { image: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (type === "Dmc") {
    reviews = await db.reviews.findMany({
      where: { dmcId: id, approved: true },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        createdAt: true,
        user: { select: { image: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (type === "Hotel") {
    reviews = await db.reviews.findMany({
      where: { hotelId: id, approved: true },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        createdAt: true,
        user: { select: { image: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return NextResponse.json({ reviews });
};
