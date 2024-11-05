import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";
  
export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

  const role = searchParams.get("role") as "DMC" | "Agency" | "Hotel";

  if (role === "Agency") {
    const data = await db.topTenAgencyCity.findMany({
        select: {
            id: true,
            image:true,
            city: true,
          },
          orderBy: {
            order: "asc",
          },
          distinct: ["city"],
        });
    return NextResponse.json({ result: data });
  } else if (role === "DMC") {
    const data = await db.topTenDMCCity.findMany({
      select: {
        id: true,
            image:true,
            city: true,
      },
      orderBy: {
        order: "asc",
      },
      distinct: ["city"],
    });
    return NextResponse.json({ result: data });
  } else if (role === "Hotel") {
    const data = await db.topTenHotelCity.findMany({
      select: {
        id: true,
            image:true,
            city: true,
      },
      orderBy: {
        order: "asc",
      },
      distinct: ["city"],
    });
    return NextResponse.json(
      { result: data },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } else {
    // console.log(companies);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

}

export const PUT = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const body = await request.json();
  const cityOrder = body.cityOrder;

  const role = searchParams.get("role") as "DMC" | "Agency" | "Hotel";

  if (role === "Agency") {
      try {
          for (const city of cityOrder) {
              await db.topTenAgencyCity.upsert({
                  where: { city: city.city },
                  update: { order: city.order },
                  create: city,
              });
          }
          return NextResponse.json({ message: "Agency data processed successfully" }, { status: 200 });
      } catch (error) {
          console.error("Database error:", error);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
  } else if (role === "DMC") {
      try {
          for (const city of cityOrder) {
              await db.topTenDMCCity.upsert({
                  where: { city: city.city },
                  update: { order: city.order },
                  create: city,
              });
          }
          return NextResponse.json({ message: "DMC data processed successfully" }, { status: 200 });
      } catch (error) {
          console.error("Database error:", error);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
  } else if (role === "Hotel") {
      try {
          for (const city of cityOrder) {
              await db.topTenHotelCity.upsert({
                  where: { city: city.city },
                  update: { order: city.order },
                  create: city,
              });
          }
          return NextResponse.json({ message: "Hotel data processed successfully" }, { status: 200 });
      } catch (error) {
          console.error("Database error:", error);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
  } else {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
};

