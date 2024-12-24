import { db } from "@/core/client/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }
  
  try {
    const userRole = await db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Agency: true,
        Dmc: true,
      },
    });

    if (!userRole) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ userRole });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
