"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HomeContext } from "@/hooks/context/HomeContext";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useContext, useMemo } from "react";

function SearchingAndFilter() {
  const {
    visible,
    selectedCity,
    setCity,
    selectedCountry,
    setCountry,
    toggleVisible,
    allCities,
    allCountries,
  } = useContext(HomeContext);

  const toggle = (key: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => {
    toggleVisible(key);
  };
  const handleFind = () => {
    window.scrollTo({
      top: window.innerHeight + 150,
      behavior: "smooth",
    });
  };
  return (
    <div className="grid z-20 text-black justify-center w-full mx-auto relative bottom-0 text-center font-Lato py-10">
      <div className="p-2 px-3 bg-white w-[200px] md:w-[300px] rounded-t-xl m-auto border-2 border-gray-600 border-b-0">
        <h1 className="font-bold">FIND YOUR TOP 10</h1>
      </div>
      <div className="text-center border-2 border-gray-700 px-6 md:px-10 py-4 flex flex-col md:flex-row w-[300px] sm:w-[450px] gap-5 md:w-full xl:w-[80vw] bg-white shadow-lg rounded-xl md:rounded-b-xl  sm:rounded-xl min-h-fit justify-center items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2">
          <Select
            value={selectedCountry}
            onValueChange={(val) => setCountry(val)}
          >
            <SelectTrigger className="w-full md:min-w-[200px]">
              <strong>DMC :</strong>
              <SelectValue placeholder="Countries" />
            </SelectTrigger>
            <SelectContent>
              {allCountries.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedCity}
            onValueChange={(val) => {
              setCity(val);
            }}
          >
            <SelectTrigger className="w-full md:min-w-[200px]">
              <SelectValue placeholder="cities" />
            </SelectTrigger>
            <SelectContent>
              {allCities.map((city) => (
                <SelectItem
                  key={city}
                  value={city}
                >
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ul className="flex gap-2 md:gap-5 flex-wrap md:flex-nowrap justify-center md:justify-between items-center">
          <li>
            <Button
              className={cn(
                visible.AGENCY
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground"
                  : ""
              )}
              onClick={() => toggle("AGENCY")}
              variant="ghost"
            >
              Agencies
            </Button>
          </li>
          <li>
            <Button
              className={cn(
                visible.HOTEL
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground"
                  : ""
              )}
              onClick={() => toggle("HOTEL")}
              variant="ghost"
            >
              Hotels
            </Button>
          </li>
          <li>
            <Button
              className={cn(
                visible.DMC
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground"
                  : ""
              )}
              onClick={() => toggle("DMC")}
              variant="ghost"
            >
              DMC&apos;s
            </Button>
          </li>

          <li>
            <Button
              className={cn(
                visible.Influencer
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground"
                  : ""
              )}
              onClick={() => toggle("Influencer")}
              variant="ghost"
            >
              Influencers
            </Button>
          </li>
        </ul>
        <Button
          onClick={handleFind}
          className="px-8 py-4 inline-flex items-center justify-center gap-2 rounded-full w-full md:w-fit"
        >
          <SearchIcon />
          FIND
        </Button>
      </div>
    </div>
  );
}

export default SearchingAndFilter;
