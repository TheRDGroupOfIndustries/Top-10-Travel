import { db } from "@/core/client/db";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export const GET = async () => {
  const agencyPromise = db.agency.findMany({
    where: { isCertified: true },
    select: { country: true, city: true },
  });
  const dmcPromise = db.dMC.findMany({
    where: { isCertified: true },
    select: { country: true, city: true },
  });
  const hotelPromise = db.hotel.findMany({
    where: { isCertified: true },
    select: { country: true, city: true },
  });

  const influencerPromise = db.influencerData.findMany({
    select: { country: true, state: true },
    distinct: ["country", "state"],
  });
  const [agencies, dmcs, hotels, influencers] = await Promise.all([
    agencyPromise,
    dmcPromise,
    hotelPromise,
    influencerPromise,
  ]);

  const combined: any = agencies.concat(
    dmcs,
    hotels,
    influencers.map((i) => ({ country: i.country, city: i.state }))
  );

  const groupedByCountry = combined.reduce(
    (acc: any, { country, city }: any) => {
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(city);
      return acc;
    },
    {}
  );
  Object.keys(groupedByCountry).forEach(
    (country) =>
      (groupedByCountry[country] = Array.from(
        new Set(groupedByCountry[country])
      ))
  );
  return NextResponse.json({ countries: groupedByCountry });
};
