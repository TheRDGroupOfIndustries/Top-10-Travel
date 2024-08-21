import { db } from "@/core/client/db";
import ReviewsComponent from "./ReviewComp";

const ReviewSSR = async ({
  name,
  companyId,
  role,
}: {
  name: string;
  companyId: string;
  role: "Agency" | "DMC" | "Hotel";
}) => {
  let reviews;

  if (role === "Agency") {
    reviews = await db.reviews.findMany({
      where: { agencyId: companyId },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (role === "Hotel") {
    reviews = await db.reviews.findMany({
      where: { hotelId: companyId },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (role === "DMC") {
    reviews = await db.reviews.findMany({
      where: { dmcId: companyId },
      select: {
        id: true,
        name: true,
        rating: true,
        review: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  console.log(reviews)

  return (
    <ReviewsComponent name={name} companyId={companyId} reviews={reviews!} />
  );
};

export default ReviewSSR;
