import AgencyDashboard from "@/components/dashboard/agency/AgencyDashboard";
import HotelDashboard from "@/components/dashboard/hotel/HotelDasboard";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { notFound } from "next/navigation";

const dashboardData = async (userId: string) => {
  const hotel = await db.hotel.findFirst({
    where: { userId: userId },
    include: {
      socialMediaLinks: true,
    },
  });
  return { hotel };
};

const getReviews = async (hotelId: string) => {
  return await db.reviews.findMany({
    where: { hotelId },
  });
};

const HotelDashboardPage = async () => {
  const session = await getSessionorRedirect();
  const { hotel } = await dashboardData(session?.user.id);
  if (!hotel) return notFound();
  const reviews = await getReviews(hotel.id);

  return (
    <HotelDashboard
      reviews={reviews}
      data={hotel}
    />
  );
};
export default HotelDashboardPage;
