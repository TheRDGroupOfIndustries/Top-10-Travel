import { db } from "@/core/client/db";
import cloudinary from "@/core/server/cloudinary/cloudinary_config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json(); // Get data from request body

  if (!id) {
    return NextResponse.json(
      { error: "Badge ID is required" },
      { status: 400 }
    );
  }

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid review ID" }, { status: 400 });
  }

  try {
    const oldBadge = await db.tags.findUnique({
      where: { id },
    });
    await cloudinary.v2.uploader.destroy(oldBadge?.imageId || "");
    await db.tags.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Badge delete successfully" });
  } catch (error) {
    console.error("Error declining review:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
