import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  
  let country = searchParams.get("country");
  const role = searchParams.get("role") as "DMC" | "Agency" | "Hotel";

  if (!country)
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  

  
  

  if (role === "Agency") {
    const data = await db.agency.findMany({
      where: { country },
      select: {
        id: true,
        city: true,
      },
      distinct: ['city'],
    });
    return NextResponse.json({ result: data });
  } else if (role === "DMC") {
    const data = await db.dMC.findMany({
      where: { country },
        select: {
            id: true,
            city: true,
          },
          distinct: ['city'],
    });
    return NextResponse.json({ result: data });
  } else if (role === "Hotel") {
    const data = await db.hotel.findMany({
      where: { country },
        select: {
            id: true,
            city: true,
          },
          distinct: ['city'],
    });
    return NextResponse.json(
      { result: data },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } else {
    // console.log(companies);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
};
