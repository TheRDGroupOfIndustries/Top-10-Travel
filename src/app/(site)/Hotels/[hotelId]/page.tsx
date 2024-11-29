import Details from "@/components/site/Details/Details";
import { db } from "@/core/client/db";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const HotelPage = async ({ params }: { params: { hotelId: string } }) => {
  console.log("params", params);
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
      contactPhoneNumber: true,
      address: true,
      socialMediaLinks: true,
      services: true,
      specialization: true,
      // promotionalVideoUpload: true,
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

  console.log("hotel id", hotel);

  if (!hotel) return notFound();
  // console.log(company);

  return (
    <div>
      <Details
        data={hotel}
        info={{ type: "Hotel", hotelId: hotel.id }}
      />
    </div>
  );
};

export default HotelPage;
