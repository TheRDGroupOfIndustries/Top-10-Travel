import { db } from "@/core/client/db";
import { $Enums } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 180;

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  let country = searchParams.get("country");
  const role = searchParams.get("role") as $Enums.CompanyRole;
  let city = searchParams.get("city")?.trim();
  if (!country)
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  const companies = await db.company.findMany({
    where: {
      country,
      companyRole: role,
      city: city || {},
      isCertified:true,
      isSuspended: false,
    },
    select: {
      id: true,
      legalName: true,
      image: true,
      methodology: true,
      rating: true,
      reviews: true,
      country: true,
      city: true,
    },
    orderBy: { priority: "desc" },
    take: 10,
  });
  // console.log(companies);
  return NextResponse.json(
    { result: companies },
    {
      headers: {
        "Cache-Control": "public, max-age=180, stale-while-revalidate=60",
      },
    }
  );
};
