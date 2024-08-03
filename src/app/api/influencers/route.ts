import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 180;

export const GET = async (request: NextRequest) => {
  //   console.log(await db.influencerData.findMany());
  const { searchParams } = new URL(request.url);
  let country = searchParams.get("country");
  if (!country)
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  let city = searchParams.get("city")?.trim();
  const data = await db.influencerData.findMany({
    where: {
      country: country,
      state: city || {},
    },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      speciality: true,
      socialLinks: true,
      country: true,
      state: true,
    },
    orderBy: { priority: "desc" },
    take: 10,
  });

  return NextResponse.json(
    { result: data },
    {
      headers: {
        "Cache-Control": "public, max-age=180, stale-while-revalidate=60",
      },
    }
  );
};
