import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 180;

export const GET = async (request: NextRequest) => {

  const data = await db.influencerData.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      state: true,
      country: true,
      priority: true,
      state_priority: true,
      isCertified: true,
      userId: true,
      speciality: true,
    },
})

  return NextResponse.json(
    { result: data },
    {
      headers: {
        "Cache-Control": "public, max-age=180, stale-while-revalidate=60",
      },
    }
  );
};
