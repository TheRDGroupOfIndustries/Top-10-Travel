import { db } from "@/core/client/db";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export const GET = async () => {
  const companies = await db.company.findMany({
    where:{isCertified:true, isSuspended:false},
    select: { country: true, city: true },
    distinct: ["country", "city"],
  });
  const influencers = await db.influencerData.findMany({
    select: { country: true, state: true },
    distinct: ["country", "state"],
  });
  const combined: any = companies
    .map((c) => ({ country: c.country, city: c.city }))
    .concat(influencers.map((i) => ({ country: i.country, city: i.state })));

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
  return NextResponse.json(
    { countries: groupedByCountry },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};
