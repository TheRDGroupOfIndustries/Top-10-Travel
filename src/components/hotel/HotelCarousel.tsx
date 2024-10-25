"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SquareArrowUpRight } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { cn, getValidUrl } from "@/lib/utils";
import HomeCompanySkeleton from "@/components/reusable/HomeCompanySkeleton";
import HomeCards from "@/components/reusable/HomeCards";

interface DMCHotelApiResult {
  id: string;
  name: string;
  rating: number;
  images: string[];
}

interface CarouselCardProps {
  hotel: DMCHotelApiResult;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ hotel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{
      duration: 0.5,
      delay: 0.4,
      ease: "easeInOut",
    }}
    viewport={{ once: true }}
    className="h-48 rounded-xl overflow-hidden hover:shadow-lg duration-300 transition-all relative"
  >
    <div className="w-full h-full absolute inset-0 bg-black/30">
      <div className="absolute bottom-0 w-full flex items-center justify-between p-3">
        <div className="flex flex-col items-start">
          <h2 className="text-sm font-bold text-white truncate w-32 sm:w-40">
            {hotel?.name}
          </h2>
          <span className="text-lg font-bold text-white">
            {Array.from({ length: Math.round(hotel?.rating || 0) }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </span>
        </div>
        <Link
          href={`/Hotels/${hotel.id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <SquareArrowUpRight className="h-5 w-5 text-white" />
        </Link>
      </div>
    </div>
    <Image
      src={getValidUrl(hotel.images[0] ?? hotel.images[1])}
      alt={hotel?.name || "Hotel Image"}
      width={400}
      height={300}
      className="w-full h-full object-cover object-center"
    />
  </motion.div>
);

const HotelCarousel: React.FC = () => {
  const {
    selectedCountry,
    selectedCity,
    setSelectedCity,
    allCities,
    visible
  } = useContext(HomeContext);

  const { data, isLoading } = useAxios({
    url: `/api/home?country=${selectedCountry}&city=${selectedCity}&role=Hotel`,
    selectedCity,
    selectedCountry,
  }) as { data: DMCHotelApiResult[] | undefined; isLoading: boolean };

  const handleBackToCities = () => {
    setSelectedCity("");
    const element = document.getElementById("toNavigate");
    element?.scrollIntoView({ block: "nearest" });
  };

  if (!visible.HOTEL) return null;

  const renderCarouselContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full">
              <HomeCompanySkeleton role="HOTEL" />
            </div>
          ))}
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="w-full h-48 flex items-center justify-center">
          <p className="text-lg font-semibold">No hotels available</p>
        </div>
      );
    }

    // Create groups of 6 hotels for the carousel
    const hotelGroups = [];
    for (let i = 0; i < data.length; i += 6) {
      hotelGroups.push(data.slice(i, i + 6));
    }

    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        {hotelGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="w-full px-4">
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              {group.map((hotel, index) => (
                <div key={index} className="w-full">
                  <CarouselCard hotel={hotel} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <main className="w-full mt-10 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {!selectedCity ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-6 object-cover gap-4">
            {allCities.slice(0, 12).map((city: string, i: number) => (
              <HomeCards
                key={i}
                country={selectedCountry}
                city={city}
                setSelectedCity={setSelectedCity}
                role="Hotel"
                image={`/image${i + 1}.jpg`}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="w-full">
              {renderCarouselContent()}
            </div>

            <div className="flex gap-4">
              <Link 
                href="/Hotels"
                onClick={() => {
                  window.localStorage.setItem("Hotels-Country", selectedCountry);
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
                onClick={handleBackToCities}
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
};

export default HotelCarousel;