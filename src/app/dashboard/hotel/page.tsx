import HotelDashboard from "@/components/dashboard/hotel/HotelDasboard";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { notFound } from "next/navigation";
import DashboardForAdminHotel from "./DashboardForAdminHotel";

const oneHotelData = async (userId: string) => {
  const hotel = await db.hotel.findFirst({
    where: { userId: userId },
    include: {
      socialMediaLinks: true,
      Reviews: true,
    },
  });
  return { hotel };
};

const getAllHotelsByAdmin = async () => {
  const hotels = await db.hotel.findMany({
    where: {
      User: {
        role: "ADMIN", // Filter by users with the 'ADMIN' role
      },
    },
    include: {
      socialMediaLinks: true,
      Reviews: true,
    },
  });
  return { hotels };
};

const getReviewsOfOneHotel = async (hotelId: string) => {
  return await db.reviews.findMany({
    where: { hotelId },
  });
};

const HotelDashboardPage = async () => {
  const session = await getSessionorRedirect();
  if (session.user.role === "USER" || session.user.role === "Influencer") {
    const { hotel } = await oneHotelData(session?.user.id);
    if (!hotel) return notFound();

    return <HotelDashboard data={hotel} reviews={hotel.Reviews} />;
  }
  if (session.user.role === "ADMIN") {
    const { hotels } = await getAllHotelsByAdmin();
    
    return <DashboardForAdminHotel data={hotels} />;
  }
};

export default HotelDashboardPage;
