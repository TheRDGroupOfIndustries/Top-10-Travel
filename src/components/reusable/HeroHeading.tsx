import { cn } from "@/lib/utils";
import React from "react";

const HeroHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "lg:text-4xl text-xl lg:tracking-wide text-center font-bold xl:pt-40 lg:pt-36 md:pt-32 sm:pt-28 pt-20 xl:leading-[86px] lg:leading-[60px] leading-[56px] xl:pb-12 lg:pb-10 md:pb-8 sm:pb-6 pb-4",
        className
      )}
    >
      {title}
    </div>
  );
};

export default HeroHeading;
