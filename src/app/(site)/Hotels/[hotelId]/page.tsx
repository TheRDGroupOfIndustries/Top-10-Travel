import Details from "@/components/site/Details/Details";
import { db } from "@/core/client/db";
import { notFound } from "next/navigation";

const HotelPage = async ({ params }: { params: { hotelId: string } }) => {
  const hotel = await db.hotel.findUnique({
    where: {
      id: params.hotelId,
      isCertified: true,
    },
    select: {
      id: true,
      country: true,
      city: true,
      images: true,
      methodology: true,
      name: true,
      reviews: true,
      rating: true,
      description: true,
      address: true,
      socialMediaLinks: true,
      // companyData: {
      //   select: {
      //     description: true,
      //     images: true,
      //     pincode: true,
      //     address: true,
      //     phone: true,
      //     socialLinks: true,
      //   },
      // },
    },
  });

  if (!hotel) return notFound();
  // console.log(company);

  return (
    <div>
      <Details data={hotel} role={"Hotel"} />
    </div>
  );
};

export default HotelPage;
