import { db } from "@/core/client/db";
import ReviewsComponent from "./ReviewComp";

type Info =
  | { type: "Agency"; agencyId: string }
  | { type: "Dmc"; dmcId: string }
  | { type: "Hotel"; hotelId: string };

const ReviewSSR = async ({ name, info }: { name: string; info: Info }) => {
 
  return (
    <ReviewsComponent
      name={name}
      info={info}
    />
  );
};

export default ReviewSSR;
