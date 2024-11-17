import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  
  let country = searchParams.get("country");
  const role = searchParams.get("role") as "DMC" | "Agency" | "Hotel" | "Influencer";

  if (!country)
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  

  
  

  if (role === "Agency") {
    const data = await db.agency.findMany({
      where: { country },
      select: {
        images: true,
        id: true,
        city: true,
      },
      distinct: ['city'],
    });
    return NextResponse.json({ result: data });
  } else if (role === "DMC") {
    const data = await db.dMC.findMany({
      // where: { country },
        select: {
          images: true,
          id: true,
          country: true,
          },
          distinct: ['country'],  
    });
    return NextResponse.json({ result: data });
  } else if (role === "Hotel") {
    const data = await db.hotel.findMany({
      // where: { country },
        select: {
          images: true,
          id: true,
          city: true,
          country: true,
          },
          // distinct: ['country'],
    });

    const groupedData = Object.entries(
      data.reduce((acc: { [key: string]: any }, hotel) => {
        const { country, city, images } = hotel;
        
        if (!acc[country]) {
          acc[country] = {}; // Initialize the country if not present
        }
        
        if (!acc[country][city]) {
          acc[country][city] = { images: new Set() }; // Initialize the city
        }
        
        // Add images to the city
        images.forEach((img) => acc[country][city].images.add(img));
        
        return acc;
      }, {})
    ).map(([country, cities]) => ({
      country,
      cities: Object.entries(cities).map(([name, data]) => ({
        name,
        images: Array.from((data as { images: Set<string> }).images),  // Convert Set back to an array
      })),
    }));
    
    
    return NextResponse.json(
      { result: groupedData },
    );
  }else if (role === "Influencer") {
    const data = await db.influencerData.findMany({
      where: { country },
        select: {
          // images: true,
          id: true,
          state: true,
          },
          distinct: ['state'],
    });
    return NextResponse.json(
      { result: data },
      // { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } else {
    // console.log(companies);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
};
