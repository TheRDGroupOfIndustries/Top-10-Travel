"use client";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
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
import { cn, getValidUrl } from "@/lib/utils";

const CarouselCard = ({ agency }: { agency: any }) => (
  <div className="flex flex-col h-full">
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 bg-[#FCAF1E] w-[80%] h-[70%] rounded-lg"></div>
      <div className="absolute bottom-0 right-0 w-[95%] h-[95%] rounded-lg overflow-hidden">
        <Image
          src={getValidUrl(agency.image)}
          alt={agency.legalName}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
    <div className="flex-grow flex flex-col items-start justify-center gap-2 p-3">
      <h2 className="text-lg font-bold text-black line-clamp-1">
        {agency.legalName}
      </h2>
      <span className="text-sm font-semibold text-yellow-500">
        {"★".repeat(Math.round(agency.rating))} {agency.reviews} Reviews
      </span>
      <p className="text-sm line-clamp-3">{agency.methodology}</p>
      <Link
        href={`/companies/${agency.id}`}
        className="mt-auto border border-gray-900 text-sm cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
      >
        View More
      </Link>
    </div>
  </div>
);

const TopTenAgencies = () => {
  const { selectedCountry, selectedCity, visible } = useContext(HomeContext);
  const { data, isLoading } = useAxios({
    url: `/api/home?country=${selectedCountry}&city=${selectedCity}&role=AGENCY`,
  });

  return (
    <section
      className={cn(
        "w-full mt-10 px-2 md:px-3 lg:px-6 xl:px-8",
        visible.AGENCY ? "" : "hidden"
      )}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl lg:overflow-hidden sm:text-4xl font-bold text-center">
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            {`TOP 10 AGENCIES${
              selectedCountry && ", " + selectedCountry.toUpperCase()
            }${selectedCity && "-" + selectedCity.toUpperCase()}`}
          </motion.span>
        </h1>
        <p className="text-base sm:text-lg text-center mb-8">
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            Experience Hassle-Free Room Hunting with Our Comprehensive Listing
          </motion.span>
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
                  <HomeCompanySkeleton role="AGENCY" />
                </CarouselItem>
              ))
            ) : data && data.length > 0 ? (
              data.slice(0, 10).map((agency) => (
                <CarouselItem
                  key={agency.id}
                  className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CarouselCard agency={agency} />
                </CarouselItem>
              ))
            ) : (
              <div className="w-full text-center py-10">No agencies found</div>
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
                  <HomeCompanySkeleton role="AGENCY" />
                </div>
              ))
            ) : data && data.length > 0 ? (
              data.slice(0, 10).map((agency) => (
                <div
                  key={agency.id}
                  className="flex flex-col items-center justify-center gap-5"
                >
                  <CarouselCard agency={agency} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10">No agencies found</div>
            )}
          </div>
        </div>
        <motion.div
          className="bg-black px-5 py-2 rounded-md mt-6 mb-5 mx-auto hover:bg-gray-800 w-fit transition-colors text-white font-bold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href={`/Agency`}>View more</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopTenAgencies;
