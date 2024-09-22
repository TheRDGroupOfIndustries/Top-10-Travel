"use client";

import { Button } from "@/components/ui/button";
import { PastProject } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const PastProjects = ({ pastProjects }: { pastProjects: PastProject[] }) => {
  const itemsPerPage = 1; // Number of reviews per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = pastProjects.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(pastProjects.length / itemsPerPage)) {
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
      <h4 className="font-medium leading-6 text-[32px]">Past Projects</h4>

      {/* Display current reviews */}
      {pastProjects.length === 0 && (
        <h2 className="font-bold text-lg">No past projects to show.</h2>
      )}
      {currentReviews.map(
        (review) =>
          review.projectName !== "" && (
            <div
              key={review.id}
              className="filter drop-shadow-md shadow-md sm:px-4 sm:py-4 px-2 py-3 rounded-2xl lg:px-6 lg:py-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  {/* Reviewer information */}
                  <div className="flex flex-col justify-center px-2">
                    <div className="font-medium xl:leading-6 leading-4 xl:text-2xl text-xl">
                      {review.projectName}
                    </div>
                    <div className="font-medium text-lg text-muted-foreground">
                      for {review.clientName}
                    </div>
                  </div>
                </div>
                {/* Review content */}
                <div className="font-medium text-sm leading-[21px] p-2">
                  {review.description}
                </div>
              </div>
            </div>
          )
      )}
      <div className="flex items-center justify-between">
        {/* Pagination */}
        {pastProjects.length > 1 ? (
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
                currentPage === Math.ceil(pastProjects.length / itemsPerPage)
                  ? "bg-mainColor cursor-not-allowed"
                  : "bg-mainColor hover:bg-mainColorSecondary"
              }`}
              disabled={
                currentPage === Math.ceil(pastProjects.length / itemsPerPage)
              }
            >
              <ChevronRight />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default PastProjects;
