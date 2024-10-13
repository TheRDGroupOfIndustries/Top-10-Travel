// import { db } from "@/core/client/db";
// import { NextResponse } from "next/server";

// export const revalidate = 3600;

// // Define a type for the data structure
// interface LocationData {
//   country: string;
//   city: string;
// }

// // Utility function to capitalize the first letter of each word
// const capitalizeFirstLetter = (str: string) => {
//   return str
//     .toLowerCase()
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export const GET = async () => {
//   const agencyPromise = db.agency.findMany({
//     where: { isCertified: true },
//     select: { country: true, city: true },
//   });
//   const dmcPromise = db.dMC.findMany({
//     where: { isCertified: true },
//     select: { country: true, city: true },
//   });
//   const hotelPromise = db.hotel.findMany({
//     where: { isCertified: true },
//     select: { country: true, city: true },
//   });

//   const influencerPromise = db.influencerData.findMany({
//     select: { country: true, state: true },
//     distinct: ["country", "state"],
//   });

//   const [agencies, dmcs, hotels, influencers] = await Promise.all([
//     agencyPromise,
//     dmcPromise,
//     hotelPromise,
//     influencerPromise,
//   ]);

//   // Normalize influencer data (rename "state" to "city" to match the structure)
//   const combined: LocationData[] = agencies
//     .concat(dmcs, hotels)
//     .concat(influencers.map((i) => ({ country: i.country, city: i.state })));

//   // Group cities by country
//   const groupedByCountry = combined.reduce<Record<string, string[]>>(
//     (acc, { country, city }) => {
//       const formattedCountry = capitalizeFirstLetter(country);
//       const formattedCity = capitalizeFirstLetter(city);

//       if (!acc[formattedCountry]) {
//         acc[formattedCountry] = [];
//       }

//       acc[formattedCountry].push(formattedCity);
//       return acc;
//     },
//     {}
//   );

//   // Sort the cities in each country and remove duplicates
//   Object.keys(groupedByCountry).forEach((country) => {
//     groupedByCountry[country] = Array.from(
//       new Set(groupedByCountry[country])
//     ).sort((a, b) => a.localeCompare(b));
//   });

//   // Sort countries alphabetically
//   const sortedCountries = Object.keys(groupedByCountry)
//     .sort((a, b) => a.localeCompare(b))
//     .reduce<Record<string, string[]>>((acc, country) => {
//       acc[country] = groupedByCountry[country];
//       return acc;
//     }, {});

//   return NextResponse.json({ countries: sortedCountries });
// };

import { db } from "@/core/client/db";
import { NextResponse } from "next/server";

// Define a type for the data structure
interface LocationData {
  country: string;
  city: string;
}

// Utility function to capitalize the first letter of each word
const capitalizeFirstLetter = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Handler to fetch and filter based on query parameters
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  // Get query params (AGENCY, HOTEL, DMC, Influencer)
  const isAgencyVisible = searchParams.get("AGENCY") === "true";
  const isHotelVisible = searchParams.get("HOTEL") === "true";
  const isDmcVisible = searchParams.get("DMC") === "true";
  const isInfluencerVisible = searchParams.get("Influencer") === "true";

  let data: LocationData[] = [];

  // Fetch data for only the visible property
  if (isAgencyVisible) {
    const agencies = await db.agency.findMany({
      where: { isCertified: true },
      select: { country: true, city: true },
    });
    data = agencies;
  } else if (isHotelVisible) {
    const hotels = await db.hotel.findMany({
      where: { isCertified: true },
      select: { country: true, city: true },
    });
    data = hotels;
  } else if (isDmcVisible) {
    const dmcs = await db.dMC.findMany({
      where: { isCertified: true },
      select: { country: true, city: true },
    });
    data = dmcs;
  } else if (isInfluencerVisible) {
    const influencers = await db.influencerData.findMany({
      select: { country: true, state: true },
      distinct: ["country", "state"],
    });
    // Normalize influencer data (rename "state" to "city" to match the structure)
    data = influencers.map((i) => ({ country: i.country, city: i.state }));
  }

  // Group cities by country
  const groupedByCountry = data.reduce<Record<string, string[]>>(
    (acc, { country, city }) => {
      const formattedCountry = capitalizeFirstLetter(country);
      const formattedCity = capitalizeFirstLetter(city);

      if (!acc[formattedCountry]) {
        acc[formattedCountry] = [];
      }

      acc[formattedCountry].push(formattedCity);
      return acc;
    },
    {}
  );

  // Sort the cities in each country and remove duplicates
  Object.keys(groupedByCountry).forEach((country) => {
    groupedByCountry[country] = Array.from(
      new Set(groupedByCountry[country])
    ).sort((a, b) => a.localeCompare(b));
  });

  // Sort countries alphabetically
  const sortedCountries = Object.keys(groupedByCountry)
    .sort((a, b) => a.localeCompare(b))
    .reduce<Record<string, string[]>>((acc, country) => {
      acc[country] = groupedByCountry[country];
      return acc;
    }, {});

  return NextResponse.json({ countries: sortedCountries });
};
