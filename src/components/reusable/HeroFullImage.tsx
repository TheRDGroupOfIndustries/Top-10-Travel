import Image, { type StaticImageData } from "next/image";
import React from "react";

const HeroFullImage = ({ image }: { image: StaticImageData }) => {
  return (
    <div>
      <div className="flex justify-center  px-2 md:px-3 lg:px-6 xl:px-8 xl:pb-28 lg:pb-24 md:pb-20 sm:pb-16 pb-14">
        <Image
          src={image}
          className="border-[1px] border-black"
          alt="map"
          height={393}
          width={1444}
        />
      </div>
    </div>
  );
};

export default HeroFullImage;
