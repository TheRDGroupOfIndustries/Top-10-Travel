import { db } from "@/core/client/db";
import ReviewsComponent from "./ReviewComp";

type Info =
  | { type: "Agency"; agencyId: string }
  | { type: "Dmc"; dmcId: string }
  | { type: "Hotel"; hotelId: string };

const ReviewSSR = async ({ name, info }: { name: string; info: Info }) => {
  let reviews: {
    id: string;
    name: string;
    rating: number;
    review: string;
    createdAt: Date | null;
  }[] = [];
  if (info.type === "Agency") {
    reviews = await db.reviews.findMany({
      where: { agencyId: info.agencyId },
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
  } else if (info.type === "Dmc") {
    reviews = await db.reviews.findMany({
      where: { dmcId: info.dmcId },
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
  } else {
    reviews = await db.reviews.findMany({
      where: { hotelId: info.hotelId },
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

  return (
    <ReviewsComponent
      name={name}
      info={info}
      reviews={reviews}
    />
  );
};

export default ReviewSSR;
