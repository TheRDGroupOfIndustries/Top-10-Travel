import React from "react";
import { Skeleton } from "../ui/skeleton";

const HomeCompanySkeleton = ({
  role,
}: {
  role: "AGENCY" | "DMC" | "HOTEL";
}) => {
  if (role === "HOTEL") {
    return (
      <div className="h-72 rounded-lg overflow-hidden relative">
        <Skeleton className="w-full h-full absolute inset-0" />
        <div className="absolute bottom-0 w-full flex items-center justify-between p-3">
          <div className="flex flex-col items-start">
            <Skeleton className="h-4 w-32 sm:w-40 md:w-48 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-full">
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden">
          <Skeleton className="absolute top-0 left-0 w-[80%] h-[70%] rounded-lg" />
          <Skeleton className="absolute bottom-0 right-0 w-[95%] h-[95%] rounded-lg" />
        </div>
        <div className="flex-grow flex flex-col items-start justify-center gap-2 p-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-1/3 mt-auto" />
        </div>
      </div>
    );
  }
};

export default HomeCompanySkeleton;
