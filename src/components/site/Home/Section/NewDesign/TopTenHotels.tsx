"use client";
import HomeCards from "@/components/reusable/HomeCards";
import HomeCardsSkeleton from "@/components/reusable/HomeCardsSkeleton";
import HomeCompanySkeleton from "@/components/reusable/HomeCompanySkeleton";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { cn, getValidUrl } from "@/lib/utils";
import { DMCHotelApiResult } from "@/types/homeApiType";
import axios from "axios";
import { motion } from "framer-motion";
import { SquareArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Item {
  city: string;
  image: string;
}

const CarouselCard = ({ hotel }: { hotel: DMCHotelApiResult }) => (
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
    className="h-72 rounded-xl overflow-hidden md:hover:-translate-y-2 hover:shadow-lg duration-300 transition-all relative"
  >
    <div className="w-full h-full absolute inset-0 bg-black/30">
      <div className="absolute bottom-0 w-full flex items-center justify-between p-3">
        <div className="flex flex-col items-start">
          <h2 className="text-sm sm:text-base font-bold text-white truncate w-32 sm:w-40 md:w-48">
            {hotel?.name}
          </h2>
          <span className="text-lg sm:text-xl font-bold text-white">
            {Array.from({ length: Math.round(hotel?.rating) }).map(
              (_, ind) => "★"
            )}
          </span>
        </div>
        <Link
          href={`/Hotels/${hotel.id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <SquareArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Link>
      </div>
    </div>
    <Image
      src={getValidUrl(hotel.images[0] ?? hotel.images[1])}
      alt={hotel?.name}
      width={400}
      height={500}
      className="w-full h-full object-cover object-center"
    />
  </motion.div>
);

function TopTenHotels() {
  const { selectedCountry, selectedCity, setSelectedCity, allCities, visible } =
    useContext(HomeContext);
  const { data, isLoading }: { data: DMCHotelApiResult[]; isLoading: boolean } =
    useAxios({
      url: `/api/home?country=${selectedCountry}&city=${selectedCity}&role=Hotel`,
      selectedCity,
      selectedCountry,
    });

  const [city, setCity] = useState([]);
  const [cardIsLoading,  setCardIsLoading] = useState(true);
  const [openCarousel, setOpenCarousel] = useState("");

  const naviagte = useRouter();


  useEffect(() => {
    setCardIsLoading(true);
    setCity([])
    const fetchData = async () => {
      const response = await axios.get(
        `/api/topten?role=Hotel&country=${selectedCountry}`
      );
      setCity(response.data.result);
      setCardIsLoading(false);
    };

    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    setOpenCarousel(selectedCity)
  },[selectedCity]);
  return (
    <main
      className={cn(
        "w-full mt-10 px-2 md:px-3 lg:px-6 xl:px-8",
        visible.HOTEL ? "" : "hidden"
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
            {`TOP 10 HOTELS${
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
            Experience Hassle-Free Room Hunting with Our Comprehensive listing
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
                    naviagte.push('/Hotels'); 
                    
                  }}
                  className="relative flex items-end  justify-center shadow cursor-pointer hover:-translate-y-1 transform-all duration-300 w-full h-48 border border-1 rounded-lg"
                >
                  <img
                    src={`${item.image}`}
                    alt={`Background image of agency card`}
                    className="absolute object-cover rounded-lg h-full w-full -z-10"
                  />
                  <div className="w-[95%] p-2 m-2 space-y-0.5 h-16 bg-white/80 backdrop-blur-sm rounded-lg">
                    <p className="font-bold text-lg text-slate-800">{(item as any).city}</p>
                    <p className="uppercase text-sm font-semibold tracking-wide text-slate-700">
                      {selectedCountry}
                    </p>
                  </div>
                </div>
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
                loop: true,
              }}
              // plugins={[
              // Autoplay({
              //   delay: 3000,
              //   stopOnInteraction: false,
              //   stopOnMouseEnter: true,
              // }),
              // ]}
              className="w-full hidden sm:block"
            >
              {/* <div className="absolute -top-7 right-10">
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </div> */}

              <div className="-ml-2 grid gap-y-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-7 md:-ml-4">
                {/* <CarouselContent className="-ml-2 my-7 md:-ml-4"> */}
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 my-4 lg:basis-1/3 xl:basis-1/4"
                    >
                      <HomeCompanySkeleton role="HOTEL" />
                    </CarouselItem>
                  ))
                ) : data && data.length > 0 ? (
                  data.slice(0, 10).map((hotel, i) => (
                    // data.slice(0, 10).map((hotel) => (
                    <div
                      key={i}
                      className={cn(
                        "pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      )}
                    >
                      <CarouselCard hotel={hotel} />
                    </div>
                  ))
                ) : (
                  <div className="w-full justify-self-center text-center py-10">
                    No Hotels found
                  </div>
                )}
              </div>
            </Carousel>

            <div className="w-full flex justify-center sm:hidden">
              <div className="w-[95%] xs:w-[85%] flex flex-col items-center justify-center gap-5">
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
                  data.slice(0, 10).map((hotel, i) => (
                    // <div key={i} className="h-full w-full">
                    <div key={i} className="h-full w-full">
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
            <div className="flex gap-4">
              <Link
                href={`/Hotels`}
                onClick={() => {
                  window.localStorage.setItem(
                    "Hotels-Country",
                    selectedCountry
                  );
                  window.localStorage.setItem("Hotels-State", selectedCity);
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
    </main>
  );
}

export default TopTenHotels;
