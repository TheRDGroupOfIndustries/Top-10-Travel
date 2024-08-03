"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { SquareArrowUpRight } from "lucide-react";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import HomeCompanySkeleton from "@/components/reusable/HomeCompanySkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HomeContext } from "@/hooks/context/HomeContext";
import { cn } from "@/lib/utils";

const CarouselCard = ({ hotel }: { hotel: any }) => (
  <div className="h-72 rounded-lg overflow-hidden relative">
    <div className="w-full h-full absolute inset-0 bg-black/30">
      <div className="absolute bottom-0 w-full flex items-center justify-between p-3">
        <div className="flex flex-col items-start">
          <h2 className="text-sm sm:text-base font-bold text-white truncate w-32 sm:w-40 md:w-48">
            {hotel?.legalName}
          </h2>
          <span className="text-lg sm:text-xl font-bold text-white">
            {Array.from({ length: Math.round(hotel?.rating) }).map(
              (_, ind) => "★"
            )}
          </span>
        </div>
        <Link
          href={`/companies/${hotel.id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <SquareArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Link>
      </div>
    </div>
    <Image
      src={hotel?.image!}
      alt={hotel?.legalName}
      width={400}
      height={500}
      className="w-full h-full object-cover object-center"
    />
  </div>
);

function TopTenHotels() {
  const {
    selectedCountry,
    selectedCity,

    visible,
  } = useContext(HomeContext);
  const { data, isLoading } = useAxios({
    url: `/api/home?country=${selectedCountry}&city=${selectedCity}&role=HOTEL`,
  });

  return (
    <main
      className={cn(
        "w-full mt-5 px-2 md:px-3 lg:px-6 xl:px-8",
        visible.HOTEL ? "" : "hidden"
      )}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl sm:text-4xl font-bold text-center">
          TOP 10 HOTELS
        </h1>
        <p className="text-base sm:text-lg text-center mb-8">
          Experience Hassle-Free Room Hunting with Our Comprehensive listing
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
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
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <HomeCompanySkeleton role="HOTEL" />
                </CarouselItem>
              ))
            ) : data && data.length > 0 ? (
              data.slice(0, 10).map((hotel) => (
                <CarouselItem
                  key={hotel.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CarouselCard hotel={hotel} />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-2 md:pl-4 basis-full">
                <div className="h-72 flex items-center justify-center">
                  <p className="text-lg font-semibold">No hotels available</p>
                </div>
              </CarouselItem>
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
                  <HomeCompanySkeleton role="HOTEL" />
                </div>
              ))
            ) : data && data.length > 0 ? (
              data.slice(0, 10).map((hotel) => (
                <div
                  key={hotel.id}
                  className="flex flex-col items-center justify-center gap-5"
                >
                  <CarouselCard hotel={hotel} />
                </div>
              ))
            ) : (
              <div className="h-72 flex items-center justify-center">
                <p className="text-lg font-semibold">No hotels available</p>
              </div>
            )}
          </div>
        </div>
        <Link
          href={`/Hotels`}
          className="bg-black px-5 py-2 text-white font-bold rounded-full w-fit mt-6 mb-10 mx-auto hover:bg-gray-800 transition-colors"
        >
          View more
        </Link>
      </div>
    </main>
  );
}

export default TopTenHotels;
