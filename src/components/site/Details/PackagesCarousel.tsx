"use client";

import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Package } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const PackageCard = ({ data }: { data: Package }) => {
  return (
    <Card className="w-full min-h-[520px] rounded-xl max-w-sm mx-auto transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 md:h-72">
        <img
          alt={`${data.title} - Package`}
          src={data.image}
          className="rounded-t-xl w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <h2 className="absolute bottom-4 left-4 text-xl md:text-2xl font-bold text-white">
          {data.title}
        </h2>
      </div>
      <CardContent className="p-4">
        <p className="text-gray-700 mb-4 text-sm md:text-base text-left line-clamp-3">
          {data.desc}
        </p>
        <p className="text-gray-500 text-sm md:text-base text-left font-semibold mb-4">
          <span className="text-xl font-bold text-black">${data.price}</span>{" "}
          {data.duration}
        </p>
        <p className="text-gray-500 text-sm md:text-base text-left font-semibold mb-4">
          {data.amenities.map((amenity, ind) => (
            <span key={ind} className="">
              {amenity}
              {ind !== data.amenities.length - 1 && ", "}
            </span>
          ))}
        </p>
        {/* <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {data.socialLinks.map((link: string) => {
              try {
                const url = new URL(link);
                const name = url.hostname;
                return (
                  <Link
                    key={url.href}
                    href={url.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    {getIconFromName(name)}
                  </Link>
                );
              } catch (error) {
                return null;
              }
            })}
          </div> */}

        {/* </div> */}
      </CardContent>
    </Card>
  );
};
function PackagesCarousel({ packages }: { packages: Package[] }) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {packages.map((p) => (
          <CarouselItem
            key={p.id}
            className="basis-full md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <PackageCard data={p} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default PackagesCarousel;
