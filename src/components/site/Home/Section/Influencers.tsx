"use client";
import HomeCards from "@/components/reusable/HomeCards";
import HomeCardsSkeleton from "@/components/reusable/HomeCardsSkeleton";
import InfluencerCarousel from "@/components/reusable/InfluencerCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type Data =
  | {
      id: string;
      name: string;
      image: string;
      description: string;
      speciality: string;
      socialLinks: string[];
      country: string;
      state: string;
    }[]
  | null;

  interface Item {
    state: string;
    image: string;
  }

const Influencers = () => {
  const { selectedCountry, selectedCity, setSelectedCity, allCities, visible } =
    useContext(HomeContext);
  const { data, isLoading } = useAxios({
    url: `/api/influencers?country=${selectedCountry}&city=${selectedCity}`,
    selectedCity,
    selectedCountry,
  });

  const [city, setCity] = useState([]);
  const [cardIsLoading, setCardIsLoading] = useState(true);

  const naviagte = useRouter();

  useEffect(() => {
    setCardIsLoading(true);
    setCity([]);

    const fetchData = async () => {
      const response = await axios.get(
        `/api/topten?role=Influencer&country=${selectedCountry}`
      );
      setCity(response.data.result);
      setCardIsLoading(false);
    };

    fetchData();
  }, [selectedCountry]);

  return (
    <main
      className={cn(
        "w-full px-2 md:px-3 lg:px-6 xl:px-8",
        visible.Influencer ? "" : "hidden"
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
            {`TOP 10 INFLUENCERS${
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

        {selectedCity === "" || !selectedCity || true ? (
          <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3">
              {city.map((item: Item, i) => {
              if (i > 11) return;

              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedCity(item.state);
                    naviagte.push('/Influencers'); 
                    
                  }}
                  className="relative flex items-end  justify-center shadow cursor-pointer hover:-translate-y-1 transform-all duration-300 w-full h-48 border border-1 rounded-lg"
                >
                  <img
                    src={`${item.image}`}
                    alt={`Background image of agency card`}
                    className="absolute object-cover rounded-lg h-full w-full -z-10"
                  />
                  <div className="w-[95%] p-2 m-2 space-y-0.5 h-16 bg-white/80 backdrop-blur-sm rounded-lg">
                    <p className="font-bold text-lg text-slate-800">{item.state}</p>
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
            <div
              className={cn(
                "w-full",
                isLoading ? "flex md:flex-row flex-col gap-2" : ""
              )}
            >
              {isLoading && (
                <div>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="md:h-96 h-64 md:w-1/3 w-full rounded-lg overflow-hidden relative"
                    >
                      <Skeleton className="w-full h-full absolute inset-0 bg-slate-200" />
                    </div>
                  ))}
                </div>
              )}
              {!isLoading && <InfluencerCarousel data={data as Data} />}
            </div>

            <div className="flex gap-4">
              <Link 
              href={`/Influencers`}
              onClick={() => {
                window.localStorage.setItem("Influencers-Country", selectedCountry);
                window.localStorage.setItem("Influencers-State", selectedCity);
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
                onClick={() =>{ 
                  setSelectedCity("");
                  
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
};

export default Influencers;
