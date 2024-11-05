import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";
  
export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

  const role = searchParams.get("role") as "DMC" | "Agency" | "Hotel";

  if (role === "Agency") {
    const data = await db.topTenAgencyCity.findMany({
        select: {
            id: true,
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

    
    for (let i = 0; i < cityOrder.length; i++) {
        await db.topTenAgencyCity.updateMany({
          where: {
            city: cityOrder[i].city,
          },
          data: {
            order: cityOrder[i].order,
          },
        });
      }


  } else if (role === "DMC") {
    for (let i = 0; i < cityOrder.length; i++) {
        await db.topTenDMCCity.updateMany({
          where: {
            city: cityOrder[i].city,
          },
          data: {
            order: cityOrder[i].order,
          },
        });
      }
  } else if (role === "Hotel") {
    for (let i = 0; i < cityOrder.length; i++) {
        await db.topTenHotelCity.updateMany({
          where: {
            city: cityOrder[i].city,
          },
          data: {
            order: cityOrder[i].order,
          },
        });
      }
  } else {
    // console.log(companies);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

}

