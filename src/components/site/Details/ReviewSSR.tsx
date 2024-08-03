import { db } from "@/core/client/db";
import ReviewsComponent from "./ReviewComp";

const ReviewSSR = async ({
  name,
  companyId,
}: {
  name: string;
  companyId: string;
}) => {
  const reviews = await db.reviews.findMany({
    where: { companyId },
    select: { id: true, name: true, rating: true, review: true },
  });
  return (
    <ReviewsComponent
      name={name}
      companyId={companyId}
      reviews={reviews}
    />
  );
};
export default ReviewSSR;
