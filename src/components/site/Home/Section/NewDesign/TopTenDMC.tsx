"use client";
import HomeCards from "@/components/reusable/HomeCards";
import HomeCardsSkeleton from "@/components/reusable/HomeCardsSkeleton";
import HomeCompanySkeleton from "@/components/reusable/HomeCompanySkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { cn, getValidUrl } from "@/lib/utils";
import { DMCHotelApiResult } from "@/types/homeApiType";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { PiCityBold } from "react-icons/pi";

interface Item {
  city: string;
  image: string;
}

const CarouselCard = ({ dmc }: { dmc: DMCHotelApiResult }) => (
  <motion.div
    initial={{
      opacity: 0,
    }}
    whileInView={{
      opacity: 1,
    }}
    transition={{
      duration: 0.5,
      delay: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.6,
    }}
    viewport={{ once: true }}
    className="flex flex-col md:hover:-translate-y-2 w-full duration-300 transition-all h-full"
  >
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 bg-mainColor w-[80%] h-[70%] rounded-lg"></div>
      <div className="absolute bottom-0 right-0 w-[95%] h-[95%] rounded-lg overflow-hidden">
        <Image
          fill
          src={getValidUrl(dmc.images[0] ?? dmc.images[1])}
          alt={dmc.name}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
    <div className="flex-grow flex flex-col items-start justify-center gap-2 p-3">
      <h2 className="text-lg font-bold text-black line-clamp-1">{dmc.name}</h2>
      <span className="text-sm font-semibold text-mainColor">
        {"★".repeat(Math.round(dmc.rating))} {dmc.reviews} Reviews
      </span>
      <p className="text-sm line-clamp-3">{dmc.methodology}</p>
      <Link
        href={`/DMC/${dmc.id}`}
        className="mt-auto border border-gray-900 text-sm cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
      >
        View More
      </Link>
    </div>
  </motion.div>
);

const TopTenDMC = () => {
  const { selectedCountry, allCities, setSelectedCity, selectedCity, visible } =
    useContext(HomeContext);

  const [city, setCity] = useState([]);
  const [cardIsLoading,  setCardIsLoading] = useState(true);

  const { data, isLoading }: { data: DMCHotelApiResult[]; isLoading: boolean } =
    useAxios({
      url: `/api/home?country=${selectedCountry}&city=${selectedCity}&role=DMC`,
      selectedCity,
      selectedCountry,
    });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/topten?role=DMC&country=${selectedCountry}`
      );
      setCity(response.data.result);
      setCardIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <section
      className={cn(
        "w-full mt-10 px-2 md:px-3 lg:px-6 xl:px-8",
        visible.DMC ? "" : "hidden"
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
            {`TOP 10 DMC${
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

        {selectedCity === "" || !selectedCity ? (
          <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3">
            {city.map((item: Item, i) => {
              if (i > 11) return;

              return (
                <HomeCards
                  key={i}
                  country={selectedCountry}
                  city={(item as any).city}
                  // city={item}

                  setSelectedCity={setSelectedCity}
                  role={"DMC"}
                  image={`${item.image}`}
                />
              );
            })}

            {cardIsLoading &&
              Array.from({ length: 12 }).map((_, i: number) => (
                <HomeCardsSkeleton key={i} />
              ))}
          </div>
        ) : (
          <>
            <Carousel
              opts={{
                align: "start",
              }}
              // plugins={[
              //   Autoplay({
              //     delay: 2000,
              //     stopOnInteraction: false,
              //     stopOnMouseEnter: true,
              //   }),
              // ]}
              className="w-full hidden sm:block"
            >
              {/* <div className="absolute -top-7 right-10">
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </div> */}

              <CarouselContent className="-ml-2 grid gap-y-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-7 md:-ml-4">
                {/* <CarouselContent className="-ml-2 my-7 md:-ml-4"> */}
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
                    // data.slice(0, 10).map((dmc) => (
                    <CarouselItem
                      key={dmc.id}
                      className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <CarouselCard dmc={dmc} />
                    </CarouselItem>
                  ))
                ) : (
                  <div className="w-full text-center justify-self-center py-10">
                    No DMCs found
                  </div>
                )}
              </CarouselContent>
            </Carousel>

            <div className="block sm:hidden">
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
                      className="flex flex-col items-center justify-center gap-5 w-[80%] h-full sm:w-[70vw]"
                    >
                      <CarouselCard dmc={dmc} />
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-10">No DMCs found</div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/DMC`}
                onClick={() => {
                  window.localStorage.setItem("DMC-Country", selectedCountry);
                  window.localStorage.setItem("DMC-State", selectedCity);
                }}
              >
                <motion.div
                  className="bg-black px-5 py-2 rounded-md mt-6 mb-5 mx-auto hover:bg-gray-800 w-fit transition-colors text-white font-bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  View more
                </motion.div>
              </Link>

              <motion.div
                onClick={() => {
                  setSelectedCity("");

                  const element = document.getElementById("toNavigate");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth", // Smooth scrolling
                      // block: "nearest", // Align to the top of the element
                    });
                  }
                }}
                className="bg-black px-5 py-2 cursor-pointer rounded-md mt-6 mb-5 mx-auto hover:bg-gray-800 w-fit transition-colors text-white font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Back To Cities
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TopTenDMC;
