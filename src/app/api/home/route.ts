import { db } from "@/core/client/db";
import { $Enums } from "@prisma/client";
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
        id: true,
        images: true,
        city: true,
        country: true,
        name: true,
        rating: true,
        reviews: true,
        primaryServices: true,
        yearOfEstablishment: true,
        methodology: true,
      },
      orderBy: { priority: "desc" },
    });
    return NextResponse.json({ result: data });
  } else if (role === "DMC") {
    const data = await db.dMC.findMany({
      where: { isCertified: true, country, city: city || {} },
      select: {
        id: true,
        images: true,
        city: true,
        country: true,
        name: true,
        rating: true,
        reviews: true,
        specialization: true,
        yearOfEstablishment: true,
        methodology: true,
      },
      orderBy: { priority: "desc" },
    });
    return NextResponse.json({ result: data });
  } else if (role === "Hotel") {
    const data = await db.hotel.findMany({
      where: { isCertified: true, country, city: city || {} },
      select: {
        id: true,
        images: true,
        city: true,
        country: true,
        name: true,
        rating: true,
        reviews: true,
        specialization: true,
        yearOfEstablishment: true,
        methodology: true,
      },
      orderBy: { priority: "desc" },
    });
    return NextResponse.json({ result: data });
  } else {
    // console.log(companies);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
};
