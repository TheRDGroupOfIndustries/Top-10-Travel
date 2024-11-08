import { NextResponse } from 'next/server';
import { db } from '@/core/client/db';

export const dynamic = 'force-dynamic';  // Ensures dynamic behavior for this route

const fetchDashboardData = async () => {
  const [
    userCount,
    agencyCount,
    influencerCount,
    dmcCount,
    hotelCount,
    resolvedHelpdeskCount,
    reviewsCount,
    aboutContent,
  ] = await Promise.all([
    db.user.count(),
    db.agency.count(),
    db.influencerData.count(),
    db.dMC.count(),
    db.hotel.count(),
    db.helpDesk.count({ where: { status: "RESOLVED" } }),
    db.reviews.count(),
    db.aboutContent.findFirst(),
  ]);

  return {
    user: userCount,
    agency: agencyCount,
    influencer: influencerCount,
    dmc: dmcCount,
    hotel: hotelCount,
    helpdesk: resolvedHelpdeskCount,
    reviews: reviewsCount,
    aboutContent,
  };
};

export async function GET() {
  try {
    const data = await fetchDashboardData();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
