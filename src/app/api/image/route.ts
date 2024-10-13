import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  let country = searchParams.get("country");
  const role = searchParams.get("role") as "DMC" | "Agency" | "Hotel";
  let city = searchParams.get("city")?.trim();

  if (!country)
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });

  if (role === "Agency") {
    const data = await db.agency.findMany({
      where: { isCertified: true, country, city: city || {} },
      select: {
        images: true,
      },
      orderBy: { priority: "desc" },
    });

    return NextResponse.json({ result: data[0] });
  } else if (role === "DMC") {
    const data = await db.dMC.findFirst({
      where: { isCertified: true, country, city: city || {} },
      select: {
        images: true,
      },
      orderBy: { priority: "desc" },
    });

    return NextResponse.json({ result: data });
  } else if (role === "Hotel") {
    const data = await db.hotel.findMany({
      where: { isCertified: true, country, city: city || {} },
      select: {
        images: true,
      },
      orderBy: { priority: "desc" },
    });

    return NextResponse.json(
      { result: data[0] },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } else {
    // console.log(companies);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
};
