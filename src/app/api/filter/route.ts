import { db } from "@/core/client/db";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export const GET = async () => {
  const companies = await db.company.findMany({
    select: { country: true, city: true },
    distinct: ["country", "city"],
  });
  const influencers = await db.influencerData.findMany({
    select: { country: true, state: true },
    distinct: ["country", "state"],
  });
  const allCountries = companies
    .map((c) => c.country)
    .concat(influencers.map((i) => i.country));
  const allCities = companies
    .map((c) => c.city)
    .concat(influencers.map((i) => i.state));
  const countries = Array.from(new Set(allCountries));
  const cities = Array.from(new Set(allCities));
  return NextResponse.json(
    { countries, cities },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};
