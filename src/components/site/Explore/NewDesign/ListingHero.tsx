"use client";

import HotelCarousel from "@/components/hotel/HotelCarousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import AgencyImg from "@/resources/images/Agency-Hero.jpg";
import DMCImg from "@/resources/images/DMC-Hero.jpg";
import HotelsImg from "@/resources/images/Hotels-Hero.jpg";
import InfluencersImg from "@/resources/images/Influencers-Hero.jpg";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AnimatedImage from "../../Details/AnimatedImage";

function ListingHero({
  title,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  countriesData,
}: {
  title: string;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  countriesData: { country: string; state: string }[];
}) {
  const [states, setStates] = useState<string[]>([]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);

  const countries = useMemo(
    () => Array.from(new Set(countriesData.map((d) => d.country))),
    [countriesData]
  );

  const pathname = usePathname();

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c === selectedCountry);

      setStates(
        Array.from(
          new Set(
            countriesData
              .filter((d) => d.country === country)
              .map((d) => d.state)
          )
        )
      );

      let state;

      if (pathname.includes("/Agency")) {
        state = window.localStorage.getItem("Agency-State");
      }
      if (pathname.includes("/Hotels")) {
        state = window.localStorage.getItem("Hotels-State");
      }
      if (pathname.includes("/DMC")) {
        state = window.localStorage.getItem("DMC-State");
      }
      if (pathname.includes("/Influencers")) {
        state = window.localStorage.getItem("Influencers-State");
      }

      if (state) {
        const check = Array.from(
          new Set(
            countriesData
              .filter((d) => d.country === country)
              .map((d) => d.state)
          )
        ).includes(state);
        check ? setSelectedState(state) : setSelectedState("");
      } else {
        setSelectedState("");
      }
    }
  }, [selectedCountry, setSelectedState, countriesData, countries, pathname]);

  const clearFilters = () => {
    // setSelectedCountry("");
    setSelectedState("");
    setStates([]);
  };

  const image =
    pathname === "/Hotels"
      ? HotelsImg
      : pathname === "/Agency"
      ? AgencyImg
      : pathname === "/DMC"
      ? DMCImg
      : pathname === "/Influencers"
      ? InfluencersImg
      : AgencyImg;

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
    if (pathname.includes("/Agency"))
      window.localStorage.setItem("Agency-Country", country);
    if (pathname.includes("/Hotels"))
      window.localStorage.setItem("Hotels-Country", country);
    if (pathname.includes("/DMC"))
      window.localStorage.setItem("DMC-Country", country);
    if (pathname.includes("/Influencers"))
      window.localStorage.setItem("Influencers-Country", country);

    setIsCountryOpen(false);
  };

  const handleStateClick = (state: string) => {
    setSelectedState(state);

    if (pathname.includes("/Agency"))
      window.localStorage.setItem("Agency-State", state);
    if (pathname.includes("/Hotels"))
      window.localStorage.setItem("Hotels-State", state);
    if (pathname.includes("/DMC"))
      window.localStorage.setItem("DMC-State", state);
    if (pathname.includes("/Influencers"))
      window.localStorage.setItem("Influencers-State", state);

    setIsStateOpen(false);
  };

  return (
    <div className="w-full pt-10 mt-[40px]">
      <div className="w-full h-full flex flex-col xl:flex-row xl:items-end xl:justify-between items-center justify-end gap-2 px-2 md:px-3 xl:px-8">
        <h1 className="md:text-2xl lg:text-3xl font-cinzel md:text-start text-balance text-center text-xl font-bold text-black">
          <motion.span
            className="inline-block uppercase"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            {`${title}${
              selectedCountry && ", " + selectedCountry.toUpperCase()
            }${selectedState && "-" + selectedState.toUpperCase()}`}
          </motion.span>
        </h1>
        <motion.div
          // className="inline-block"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
          }}
          viewport={{ once: true }}
          className="flex flex-wrap lg:flex-row items-center justify-center gap-2"
        >
          <span className="text-sm font-medium text-white px-5 py-[10px] bg-mainColor rounded-lg">
            Filter
          </span>
          <div className="relative">
            <button
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="w-[180px] bg-white border border-gray-300 rounded-md px-4 py-2 inline-flex items-center justify-between gap-2 text-black/50 text-sm"
            >
              {selectedCountry || "Select Country"}
              <ChevronDown
                className={`w-5 h-5 stroke-black/50 transition-transform duration-300 ${
                  isCountryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCountryOpen && (
              <ul className="absolute z-10 w-[180px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <ScrollArea className="h-[250px] rounded-md">
                  {countries
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((country) => (
                      <li
                        key={country}
                        onClick={() => handleCountryClick(country)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs"
                      >
                        {country}
                      </li>
                    ))}
                </ScrollArea>
              </ul>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsStateOpen(!isStateOpen)}
              className="w-[180px] bg-white border border-gray-300 rounded-md px-4 py-2 inline-flex items-center justify-between gap-2 text-black/50 text-sm"
            >
              {selectedState || "Select City"}
              <ChevronDown
                className={`w-5 h-5 stroke-black/50 transition-transform duration-300 ${
                  isStateOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isStateOpen && (
              <ul className="absolute z-10 w-[180px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <ScrollArea className="h-[250px] rounded-md">
                  {!states.length && (
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs">
                      No Cities
                    </li>
                  )}
                  {states
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((state) => (
                      <li
                        key={state}
                        onClick={() => handleStateClick(state)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs"
                      >
                        {state}
                      </li>
                    ))}
                </ScrollArea>
              </ul>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="bg-white hover:border-black/50 border-transparent border-[1px] rounded-lg text-black/50 text-sm px-5 py-2"
          >
            Clear
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ListingHero;
