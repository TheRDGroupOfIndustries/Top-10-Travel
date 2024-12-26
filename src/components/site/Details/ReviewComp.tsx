"use client";

import ReviewDialog from "@/components/company/ReviewForm/ReviewFormDialog";
import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/core/client/db";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image"; // Adjust import based on your setup
import { useEffect, useState } from "react";
// Adjust import based on your setup

type Review = {
  id: string;
  name: string;
  rating: number;
  review: string;
  userId: string;
  createdAt: Date | null;
  user: {
    image: string | null;
  };
};
function ReviewsComponent({
  name,
  info,
}: {
  name: string;

  info:
    | { type: "Agency"; agencyId: string; agencyName: string }
    | { type: "Dmc"; dmcId: string; dmcName: string }
    | { type: "Hotel"; hotelId: string; hotelName: string };
}) {
  // Sample reviews data

  const itemsPerPage = 2; // Number of reviews per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  // Calculate pagination
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const { data: session, status } = useSession();
  const [yourComments, setYourComments] = useState(false);
  type UserRole = {
    Agency: { name: string; isCertified: boolean, images: string[] }[];
    Dmc: { name: string; isCertified: boolean, images: string[] }[];
  };
  
  const [userRole, setUserRole] = useState<UserRole>({
    Agency: [],
    Dmc: [],
  });


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
  const revalidate = (info: any) => {
    axios
      .get(
        `/api/reviews?type=${info.type}&id=${
          info.agencyId || info.dmcId || info.hotelId
        }`
      )
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((error) => {
        console.error("Failed to revalidate reviews: ", error);
      });
  };
  useEffect(() => {
    const controller = new AbortController();

    async function fetchReviews(info: any) {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `/api/reviews?type=${info.type}&id=${
            info.agencyId || info.dmcId || info.hotelId
          }`,
          { signal: controller.signal }
        );
        setReviews(res.data.reviews);

        const yourComments = res.data.reviews.filter(
          (review: Review) => review.userId === session?.user.id
        )

        if (yourComments.length > 0) {
          setYourComments(true);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Something went wrong: ", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false); // Ensure loading state is updated if the request was not aborted
        }
      }
    }

    fetchReviews(info);

    // Cleanup function to abort the request on unmount or when info changes
    return () => {
      controller.abort();
    };
  }, [info]);

  useEffect(() => {
    const getuserRole = async () => {
      const userRole = await axios.get(`/api/agency?id=${session?.user.id}`)
      // console.log(userRole.data.userRole.Agency)
      setUserRole((prev) => ({
        ...prev,
        Agency: userRole.data.userRole.Agency,
        Dmc: userRole.data.userRole.Dmc
      }));
      console.log(userRole.data.userRole.Agency)
    }
    if (session) {
      getuserRole();
    }
  }, [session])


  return (
    <div className="flex flex-col shadow shadow-black/50 rounded-lg gap-8 py-12 sm:px-8 px-4">
      <h4 className="font-medium leading-6 text-[32px]">Recommendations</h4>

      {/* Display current reviews */}
      {reviews.length === 0 && !isLoading && (
        <h2 className="font-bold text-lg">No Recommendations.</h2>
      )}
      {isLoading && reviews.length === 0 && (
        <>
          <ReviewLoader />
          <ReviewLoader />
        </>
      )}
      {currentReviews.map((review) => (
        <div
          key={review.id}
          className="filter drop-shadow-md shadow-md sm:px-4 sm:py-4 px-2 py-3 rounded-2xl lg:px-6 lg:py-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              {/* Reviewer image */}
              {/* <div className="h-[48px] w-[48px] rounded-full relative"> */}
              {/* {
                userRole.Agency.length > 0 && userRole.Agency[0].images.length > 0 && (
                  <Image
                    src={userRole.Agency[0]?.images[0] ?? "/stockUser.png"}
                    alt="Review img"
                    className="object-cover rounded-full"
                    layout="fill"
                  />
                )
              }
              {
                userRole.Dmc.length > 0 && userRole.Dmc[0].images.length > 0 && (
                  <Image
                    src={userRole.Dmc[0]?.images[0] ?? "/stockUser.png"}
                    alt="Review img"
                    className="object-cover rounded-full"
                    layout="fill"
                  />
                )
              } */}
              {/* </div> */}
              {/* Reviewer information */}
              <div className="flex flex-col justify-center px-2">
                <div className="font-medium xl:leading-6 leading-4 xl:text-2xl text-xl">
                
                  {review.name}
                </div>
                {/* Star rating component */}
                <StarRating
                  color="#FCAE1D"
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
            <div className="font-medium text-sm leading-[21px] mt-2">
              {review.review}
            </div>
          </div>
        </div>
      ))}      <div className="flex items-center justify-between">
        {/* Pagination */}
        {reviews.length > 2 ? (
          <div className="flex justify-end gap-2">
            <Button
              size={"icon"}
              onClick={prevPage}
              className={`rounded-lg ${
                currentPage === 1
                  ? "bg-mainColor cursor-not-allowed"
                  : "bg-mainColor hover:bg-mainColorSecondary"
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
                  ? "bg-mainColor cursor-not-allowed"
                  : "bg-mainColor hover:bg-mainColorSecondary"
              }`}
              disabled={
                currentPage === Math.ceil(reviews.length / itemsPerPage)
              }
            >
              <ChevronRight />
            </Button>
          </div>
        ) : null}


        {userRole.Agency.length > 0 && (
          <ReviewDialog revalidate={revalidate} info={info} name={name} yourComments={yourComments} userName={userRole.Agency[0].name} />
        )}
      
        {userRole.Dmc.length > 0 && (
          <ReviewDialog revalidate={revalidate} info={info} name={name} yourComments={yourComments} userName={userRole.Dmc[0].name} />
        )}
      </div>
    </div>
  );
}

const ReviewLoader = () => {
  return (
    <div className="filter drop-shadow-md shadow-md sm:px-4 sm:py-4 px-2 py-3 rounded-2xl lg:px-6 lg:py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          {/* Reviewer image */}
          <div className="sm:h-[66px] h-[48px] w-[48px] rounded-full sm:w-[66px] relative">
            <Skeleton className="w-full h-full" />
          </div>
          {/* Reviewer information */}
          <div className="flex flex-col justify-center px-2">
            <Skeleton className="h-8 w-full" />
            {/* Star rating component */}
            <StarRating
              color="#949494"
              maxRating={5}
              className="mt-2"
              readOnly={true}
              size={16}
              showNumber={true}
              defaultRating={5}
            />
          </div>
        </div>
        {/* Review content */}
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-2/3 h-8" />
      </div>
    </div>
  );
};
export default ReviewsComponent;
