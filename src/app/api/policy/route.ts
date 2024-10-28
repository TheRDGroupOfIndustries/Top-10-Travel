import { db } from "@/core/client/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the first record or create if doesn't exist
    let about = await db.privacyPolicyContent.findFirst();

    //   if (!about) {
    //     about = await db.aboutContent.create({
    //       data: {
    //         title: 'Default Title',
    //         content: 'Default about content'
    //       }
    //     })
    //   }

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;

    const about = await db.privacyPolicyContent.update({
      where: {
        id: "cm2op82kj0001xyfksqwx4wr2",
      },
      data: {
        content,
      },
    });

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
