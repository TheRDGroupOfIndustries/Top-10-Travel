import { db } from '@/core/client/db';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { id } = await req.json(); // Get data from request body

    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ message: 'Invalid review ID' }, { status: 400 });
  }

  try {
    const updatedReview = await db.reviews.update({
      where: { id },
      data: { approved: true },
    });

    if (!updatedReview) {
        return NextResponse.json(
          { error: 'Review not found' },
          { status: 404 }
        );
      }

    return NextResponse.json({ message: 'Review approved successfully' });
  } catch (error) {
    console.error('Error approving review:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
