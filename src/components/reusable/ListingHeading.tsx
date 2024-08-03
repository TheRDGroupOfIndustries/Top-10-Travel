import { ArrowDown, Grid2X2, MoveDown } from "lucide-react";
import React from "react";

const ListingHeading = ({ title }: { title: string }) => {
  return (
    <div className="xl:mx-10 lg:mx-8 md:mx-5 sm:mx-3 mx-1 xl:pb-6 lg:pb-5 md:pb-4 sm:pb-3 pb-2 px-1 border-stone-400 border-b-2 flex justify-between items-end mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14">
      <div className="xl:text-[55px] lg:text-5xl md:text-4xl text-32xl font-bold">
        {title}
      </div>

      <div className="md:flex hidden items-end gap-2 lg:gap-3 xl:gap-4">
        <Grid2X2
          className="xl:h-10 lg:inline-block hidden xl:w-10 lg:h-9 lg:w-9 md:h-8 md:w-8"
          fill="#1C1C1C"
          stroke="#fff"
        />
        <div className="flex items-end pb-1">
          <p className="text-base font-bold">FROM EXPENSIVE TO CHEAP</p>
          <div className="pb-1">
            <MoveDown className="xl:h-6 xl:w-6 lg:h-5 lg:w-5 md:h-4 md:w-4 " />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <ArrowDown className="h-8 w-8 sm:h-10 sm:w-10" />
      </div>
    </div>
  );
};

export default ListingHeading;
