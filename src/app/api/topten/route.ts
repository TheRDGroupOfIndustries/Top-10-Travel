import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  let country = searchParams.get("country");
  const role = searchParams.get("role") as
    | "DMC"
    | "Agency"
    | "Hotel"
    | "Influencer";

  if (!country)
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });

  if (role === "Agency") {
    const data = await db.topTenAgencyCity.findMany({
      where: { country },
      select: {
        id: true,
        image: true,
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
      // where : {country},
      select: {
        id: true,
        image: true,
        country: true,
      },
      orderBy: {
        order: "asc",
      },
      distinct: ["country"],
    });
    return NextResponse.json({ result: data });
  } else if (role === "Hotel") {
    const data = await db.topTenHotelCity.findMany({
      // where : {country},
      select: {
        id: true,
        image: true,
        city: true,
        country: true,
      },
      orderBy: {
        order: "asc",
      },
      // distinct: ["city"],
    });
    return NextResponse.json({ result: data });
  } else if (role === "Influencer") {
    const data = await db.topTenInfluencerCity.findMany({
      where: { country },
      select: {
        id: true,
        image: true,
        state: true,
      },
      orderBy: {
        order: "asc",
      },
      distinct: ["state"],
    });
    return NextResponse.json({ result: data });
  } else {
    // console.log(companies);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
};

export const PUT = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const body = await request.json();
  const cityOrder = body.cityOrder;

  const role = searchParams.get("role") as
    | "DMC"
    | "Agency"
    | "Hotel"
    | "Influencer";

  if (role === "Agency") {
    try {
      await db.topTenAgencyCity.updateMany({
        where: {
          country: cityOrder[0].country,
        },
        data: { order: -1 },
      });

      for (const city of cityOrder) {
        await db.topTenAgencyCity.upsert({
          where: { city: city.city, country: city.country },
          update: { order: city.order },
          create: city,
        });
      }

      await db.topTenAgencyCity.deleteMany({
        where: { order: -1, country: cityOrder[0].country },
      });
      return NextResponse.json(
        { message: "Agency data processed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } else if (role === "DMC") {
    try {
      await db.topTenDMCCity.updateMany({
        data: { order: -1 },
      });

      for (const city of cityOrder) {
        await db.topTenDMCCity.upsert({
          where: { country: city.country },
          update: { order: city.order },
          create: city,
        });
      }

      await db.topTenDMCCity.deleteMany({
        where: { order: -1 },
      });
      return NextResponse.json(
        { message: "DMC data processed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } else if (role === "Hotel") {
    try {
      await db.topTenHotelCity
        .updateMany({
          data: { order: -1 },
        })
        .then(async () => {
          for (const city of cityOrder) {
            await db.topTenHotelCity.upsert({
              where: { country: city.country },
              update: { order: city.order, city: city.city },
              create: city,
            });
          }
        })
        .then(async () => {
          await db.topTenHotelCity.deleteMany({
            where: { order: -1  },
          });
        });

      return NextResponse.json(
        { message: "Hotel data processed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } else if (role === "Influencer") {
    try {
      await db.topTenInfluencerCity.updateMany({
        where: {
          country: cityOrder[0].country,
        },
        data: { order: -1 },
      });

      for (const city of cityOrder) {
        await db.topTenInfluencerCity.upsert({
          where: { state: city.city, country: city.country },
          update: { order: city.order },
          create: {
            state: city.city,
            image: city.image || "",
            country: city.country,
            order: city.order,
          },
        });
      }

      await db.topTenInfluencerCity.deleteMany({
        where: { order: -1, country: cityOrder[0].country },
      });
      return NextResponse.json(
        { message: "Influencer data processed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
};