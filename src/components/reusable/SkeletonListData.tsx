import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonListData = () => {
  return (
    <main className="w-full mt-14 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="w-full flex flex-col gap-10">
        <div className="w-full lg:h-72 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 shadow shadow-black/10">
          <div className="lg:w-[30%] w-full lg:h-full h-60 rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full object-cover bg-slate-200" />
          </div>
          <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-5 p-1">
            <div className="w-full flex items-center justify-between">
              <Skeleton className="w-1/2 h-5 bg-slate-200" />
              <Skeleton className="px-10 py-4 rounded-full bg-slate-200" />
            </div>

            <Skeleton className="w-1/3 h-4 bg-slate-200" />

            <div className="flex w-full gap-2">
              <Skeleton className="w-1/12 h-3 bg-slate-200" />
              <Skeleton className="w-1/12 h-3 bg-slate-200" />
              <Skeleton className="w-1/12 h-3 bg-slate-200" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="w-1/3 h-4 bg-slate-200" />
              <Skeleton className="w-4/5 lg:h-16 h-12 bg-slate-200" />
            </div>
            <Skeleton className="px-10 py-4 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SkeletonListData;
