"use client";
import HomeCards from "@/components/reusable/HomeCards";
import HomeCardsSkeleton from "@/components/reusable/HomeCardsSkeleton";
import HomeCompanySkeleton from "@/components/reusable/HomeCompanySkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { cn, getValidUrl } from "@/lib/utils";
import { AgencyApiResult } from "@/types/homeApiType";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useContext, useEffect, useState } from "react";
import { set } from "zod";

const CarouselCard = ({ agency }: { agency: AgencyApiResult }) => (
  <motion.div
    initial={{
      opacity: 0,
      // y: -100, // its optional... [I d k the codebase properly, so not playing too much...]
    }}
    whileInView={{
      opacity: 1,
      //  y: 0,
    }}
    transition={{
      duration: 0.5,
      delay: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.6,
    }}
    viewport={{ once: true }}
    className="flex md:hover:-translate-y-2 duration-300 transition-all w-full flex-col h-full"
  >
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 bg-mainColor w-[80%] h-[70%] rounded-lg"></div>
      <div className="absolute bottom-0 right-0 w-[95%] h-[95%] rounded-lg overflow-hidden">
        <img
          src={getValidUrl(agency.images[0] ?? agency.images[1])}
          alt={agency.name}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
    <div className="flex-grow flex flex-col items-start justify-center gap-2 p-3">
      <h2 className="text-lg font-bold text-black line-clamp-1">
        {agency.name}
      </h2>
      <span className="text-sm font-semibold text-mainColor">
        {"★".repeat(Math.round(agency.rating))} {agency.reviews} Reviews
      </span>
      <p className="text-sm line-clamp-3">{agency.methodology}</p>
      <Link
        href={`/Agency/${agency.id}`}
        className="mt-auto border border-gray-900 text-sm cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
      >
        View More
      </Link>
    </div>
  </motion.div>
);

interface Item {
  city: string;
  image: string;
}

const TopTenAgencies = () => {
  const { selectedCountry, selectedCity, setSelectedCity, allCities, visible } =
    useContext(HomeContext);

  const [city, setCity] = useState([]);
  const [cardIsLoading, setCardIsLoading] = useState(true);
  const [openCarousel, setOpenCarousel] = useState("");

  const naviagte = useRouter();

  const { data, isLoading }: { data: AgencyApiResult[]; isLoading: boolean } =
    useAxios({
      url: `/api/home?country=${selectedCountry}&city=${selectedCity}&role=Agency`,
      selectedCity,
      selectedCountry,
    });

  useEffect(() => {
    setCardIsLoading(true);
    setCity([]);

    const fetchData = async () => {
      const response = await axios.get(
        `/api/topten?role=Agency&country=${selectedCountry}`
      );
      setCity(response.data.result);
      setCardIsLoading(false);
    };

    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    setOpenCarousel(selectedCity);
  }, [selectedCity]);

  return (
    <section
      className={cn(
        "w-full mt-10 px-2 md:px-3 lg:px-6 xl:px-8",
        visible.AGENCY ? "" : "hidden"
      )}
    >
      <div
        id="TopTenAgencies"
        className="w-full flex flex-col items-center justify-center gap-4 scroll-my-14"
      >
        <h1 className="text-xl lg:overflow-hidden sm:text-4xl font-bold text-center ">
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

        {openCarousel === "" || !openCarousel || true ? (
          <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3">
            {city.map((item: Item, i) => {
              if (i > 11) return;

              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedCity((item as any).city);
                    naviagte.push(
                      `/Agency?queryCity=${
                        (item as any).city
                      }&queryCountry=${selectedCountry}`
                    );
                  }}
                  className="relative flex items-end  justify-center shadow cursor-pointer hover:-translate-y-1 transform-all duration-300 w-full h-48 border border-1 rounded-lg"
                >
                  <img
                    src={`${item.image}`}
                    alt={`Background image of agency card`}
                    className="absolute object-cover rounded-lg h-full w-full -z-10"
                  />
                  <div className="w-[95%] p-2 m-2 space-y-0.5 h-16 bg-white/80 backdrop-blur-sm rounded-lg">
                    <p className="font-bold text-lg text-slate-800">
                      {(item as any).city}
                    </p>
                    <p className="uppercase text-sm font-semibold tracking-wide text-slate-700">
                      {selectedCountry}
                    </p>
                  </div>
                </div>
              );
            })}

            {cardIsLoading &&
              Array.from({ length: 12 }).map((_, i: number) => (
                <HomeCardsSkeleton index={i} key={i} />
              ))}
          </div>
        ) : (
          <>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full hidden sm:block"
            >
              <CarouselContent className="-ml-2 grid gap-y-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-7 md:-ml-4">
                {/* <CarouselContent className="-ml-2 my-7 md:-ml-4"> */}
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i: number) => (
                    <CarouselItem
                      key={i}
                      className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <HomeCompanySkeleton role="AGENCY" />
                    </CarouselItem>
                  ))
                ) : data && data.length > 0 ? (
                  data.slice(0, 10).map((agency) => (
                    // data.slice(0, 10).map((agency) => (
                    <CarouselItem
                      key={agency.id}
                      className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <CarouselCard agency={agency} />
                    </CarouselItem>
                  ))
                ) : (
                  <div className="w-full justify-self-center text-center py-10">
                    No agencies found
                  </div>
                )}
              </CarouselContent>
            </Carousel>

            <div className="block sm:hidden w-full">
              <div className="w-full flex flex-col items-center justify-center gap-5">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-[80%] sm:w-[50vw] flex h-full flex-col items-center justify-center gap-5"
                    >
                      <HomeCompanySkeleton role="AGENCY" />
                    </div>
                  ))
                ) : data && data.length > 0 ? (
                  data.slice(0, 10).map((agency) => (
                    <div
                      key={agency.id}
                      className="flex flex-col items-center justify-center gap-5 w-[80%] h-full sm:w-[70vw]"
                    >
                      <CarouselCard agency={agency} />
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-10">
                    No agencies found
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/Agency`}
                onClick={() => {
                  window.localStorage.setItem(
                    "Agency-Country",
                    selectedCountry
                  );
                  window.localStorage.setItem("Agency-State", selectedCity);
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
                  setOpenCarousel("");
                  const element = document.getElementById("toNavigate");
                  if (element) {
                    element.scrollIntoView({
                      // behavior: "smooth", // Smooth scrolling
                      block: "nearest", // Align to the top of the element
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

export default TopTenAgencies;
