"use client";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HomeCompanySkeleton from "@/components/reusable/HomeCompanySkeleton";
import Autoplay from "embla-carousel-autoplay";
import { HomeContext } from "@/hooks/context/HomeContext";
import { cn } from "@/lib/utils";

const CarouselCard = ({ dmc }: { dmc: any }) => (
  <div className="flex flex-col h-full">
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 bg-[#FFDB80] w-[80%] h-[70%] rounded-lg"></div>
      <div className="absolute bottom-0 right-0 w-[95%] h-[95%] rounded-lg overflow-hidden">
        <Image
          src={dmc.image}
          alt={dmc.legalName}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
    <div className="flex-grow flex flex-col items-start justify-center gap-2 p-3">
      <h2 className="text-lg font-bold text-black line-clamp-1">
        {dmc.legalName}
      </h2>
      <span className="text-sm font-semibold text-yellow-500">
        {"★".repeat(Math.round(dmc.rating))} {dmc.reviews} Reviews
      </span>
      <p className="text-sm line-clamp-3">{dmc.methodology}</p>
      <Link
        href={`/companies/${dmc.id}`}
        className="mt-auto border border-gray-900 text-sm cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
      >
        View More
      </Link>
    </div>
  </div>
);

const TopTenDMC = () => {
  const { selectedCountry, selectedCity, visible } = useContext(HomeContext);
  const { data, isLoading } = useAxios({
    url: `/api/home?country=${selectedCountry}&city=${selectedCity}&role=DMC`,
  });

  return (
    <section
      className={cn(
        "w-full mt-5 px-2 md:px-3 lg:px-6 xl:px-8",
        visible.DMC ? "" : "hidden"
      )}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl sm:text-4xl font-bold text-center">
          {`TOP 10 DMC${
            selectedCountry && ", " + selectedCountry.toUpperCase()
          }${selectedCity && "-" + selectedCity.toUpperCase()}`}
        </h1>
        <p className="text-base sm:text-lg text-center mb-8">
          Experience Hassle-Free Room Hunting with Our Comprehensive Listing
        </p>
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full hidden md:block"
        >
          <div className="absolute -top-10 right-10">
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </div>
          <CarouselContent className="-ml-2 md:-ml-4">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <HomeCompanySkeleton role="DMC" />
                </CarouselItem>
              ))
            ) : data && data.length > 0 ? (
              data.slice(0, 10).map((dmc) => (
                <CarouselItem
                  key={dmc.id}
                  className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CarouselCard dmc={dmc} />
                </CarouselItem>
              ))
            ) : (
              <div className="w-full text-center py-10">No DMCs found</div>
            )}
          </CarouselContent>
        </Carousel>
        <div className="block md:hidden">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-5"
                >
                  <HomeCompanySkeleton role="DMC" />
                </div>
              ))
            ) : data && data.length > 0 ? (
              data.slice(0, 10).map((dmc) => (
                <div
                  key={dmc.id}
                  className="flex flex-col items-center justify-center gap-5"
                >
                  <CarouselCard dmc={dmc} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10">No DMCs found</div>
            )}
          </div>
        </div>
        <Link
          href={`/DMC`}
          className="bg-black px-5 py-2 text-white font-bold rounded-full w-fit mt-6 mb-5 mx-auto hover:bg-gray-800 transition-colors"
        >
          View more
        </Link>
      </div>
    </section>
  );
};

export default TopTenDMC;
