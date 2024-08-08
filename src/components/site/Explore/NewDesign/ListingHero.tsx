import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import hero from "@/resources/images/Agency-Hero.png";

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
      setSelectedState("");
    }
  }, [selectedCountry, setSelectedState, countriesData, countries]);

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedState("");
    setStates([]);
  };

  return (
    <div className="w-full  pt-20">
      <div className="h-72 w-full mb-5">
        <Image
          src={hero}
          alt="hero"
          width={1920}
          height={500}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row lg:items-end lg:justify-between items-center justify-end gap-2 px-2 md:px-3 lg:px-6 xl:px-8">
        <h1 className="md:text-2xl md:text-start text-balance text-center text-xl font-bold text-black">
          {`${title}${selectedCountry && ", " + selectedCountry.toUpperCase()}${
            selectedState && "-" + selectedState.toUpperCase()
          }`}
        </h1>
        <div className="flex flex-wrap lg:flex-row items-center justify-center gap-2">
          <span className="text-sm font-medium text-black px-5 py-[10px] bg-[#FFDB80] rounded-lg">
            Filter:
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
                  {countries.map((country) => (
                    <li
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryOpen(false);
                      }}
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
                  {states.map((state) => (
                    <li
                      key={state}
                      onClick={() => {
                        setSelectedState(state);
                        setIsStateOpen(false);
                      }}
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
        </div>
      </div>
    </div>
  );
}

export default ListingHero;
