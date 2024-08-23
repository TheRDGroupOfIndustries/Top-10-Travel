"use client";

import { useState } from "react";
import Image from "next/image"; // Adjust import based on your setup
import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import ReviewDialog from "@/components/company/ReviewForm/ReviewFormDialog";
import { Reviews } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Adjust import based on your setup

function ReviewsComponent({
  name,
  info,
  reviews,
}: {
  name: string;

  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };

  reviews: {
    id: string;
    name: string;
    rating: number;
    review: string;
    createdAt: Date | null;
    user: {
      image: string | null;
    };
  }[];
}) {
  // Sample reviews data

  const itemsPerPage = 2; // Number of reviews per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const nextPage = () => {
    if (currentPage < Math.ceil(reviews.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col shadow shadow-black/50 rounded-md gap-8 py-12 sm:px-8 px-4">
      <h4 className="font-medium leading-6 text-[32px]">Reviews</h4>

      {/* Display current reviews */}
      {reviews.length === 0 && (
        <h2 className="font-bold text-lg">
          Be the first one to write a review.
        </h2>
      )}
      {currentReviews.map((review) => (
        <div
          key={review.id}
          className="filter drop-shadow-md shadow-md sm:px-4 sm:py-4 px-2 py-3 rounded-2xl lg:px-6 lg:py-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              {/* Reviewer image */}
              <div className="sm:h-[66px] h-[48px] w-[48px] rounded-full sm:w-[66px] relative">
                <Image
                  src={review.user.image ?? "/stockUser.png"}
                  alt="Review img"
                  className="object-cover rounded-full"
                  layout="fill"
                />
              </div>
              {/* Reviewer information */}
              <div className="flex flex-col justify-center px-2">
                <div className="font-medium xl:leading-6 leading-4 xl:text-2xl text-xl">
                  {review.name}
                </div>
                {/* Star rating component */}
                <StarRating
                  color="#734E03"
                  maxRating={5}
                  className="mt-2"
                  readOnly={true}
                  size={16}
                  showNumber={true}
                  defaultRating={review.rating}
                />
              </div>
            </div>
            {/* Review content */}
            <div className="font-medium text-sm leading-[21px]">
              {review.review}
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between">
        {/* Pagination */}
        {reviews.length > 2 ? (
          <div className="flex justify-end gap-2">
            <Button
              size={"icon"}
              onClick={prevPage}
              className={`rounded-lg ${
                currentPage === 1
                  ? "bg-[#fdcb6e] cursor-not-allowed"
                  : "bg-[#FCAE1D] hover:bg-[rgba(252,174,29,0.8)]"
              }`}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </Button>

            <Button
              onClick={nextPage}
              size={"icon"}
              className={`rounded-lg ${
                currentPage === Math.ceil(reviews.length / itemsPerPage)
                  ? "bg-[#fdcb6e] cursor-not-allowed"
                  : "bg-[#FCAE1D] hover:bg-[rgba(252,174,29,0.8)]"
              }`}
              disabled={
                currentPage === Math.ceil(reviews.length / itemsPerPage)
              }
            >
              <ChevronRight />
            </Button>
          </div>
        ) : null}

        {/* Review dialog */}
        <ReviewDialog
          info={info}
          name={name}
        />
      </div>
    </div>
  );
}

export default ReviewsComponent;
