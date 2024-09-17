import HotelForm from "@/components/hotel/HotelForm";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { redirect } from "next/navigation";

const AgencyLoginPage = async () => {
  const session = await getSessionorRedirect();

  if (session.user.role === "USER" || session.user.role === "Influencer") {
    const agency = await db.hotel.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (agency) return redirect(`/dashboard/hotel`);
  }

  return <HotelForm />;
};
export default AgencyLoginPage;
