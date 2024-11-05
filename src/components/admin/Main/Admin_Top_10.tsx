"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HomeContext } from "@/hooks/context/HomeContext";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import TopTenAgencies from "./components/TopTenAgencies";
import TopTenDMC from "./components/TopTenDMC";
import TopTenHotels from "./components/TopTenHotels";

const AdminTop10 = () => {
  const {
    visible,
    selectedCity,
    setCity,
    selectedCountry,
    setCountry,
    allCities,
    allCountries,
    updateAllData,
  } = useContext(HomeContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();

        // Ensure visible is an object with keys and boolean values
        Object.keys(visible).forEach((key: string) => {
          if (visible[key as keyof typeof visible]) {
            params.append(key, "true");
          }
        });

        const res = await axios.get<{ countries: string[] }>("/api/filter", {
          params: params,
        });

        updateAllData(res.data.countries);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [visible]);
  return (
    <Card className="bg-[#f3f3f3]">
      <CardHeader>
        <CardTitle className="lg:text-3xl md:text-2xl text-xl font-semibold">
          <p>
            Top 10<span className="text-mainColor">City</span>
          </p>
          <p className="md:text-base text-sm mt-1">
            This is the Top 10 page.
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>

        {/* Filter */}
      {/* <div className="md:max-w-3xl sm:max-w-sm xs:max-w-[320px] max-w-fit max-h-fit xs:h-12 sm:h-14 flex flex-col xs:flex-row gap-1 py-1 items-center justify-between rounded-lg px-1 xs:px-3 bg-gray-200">
            <div className="flex items-center lg:gap-5 md:gap-2 xs:gap-1 gap-2">
              <Select
                value={selectedCountry}
                onValueChange={(val) => setCountry(val)}
              >
                <SelectTrigger className="lg:w-[280px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {allCountries
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((country) => (
                      <SelectItem key={country} value={country}>
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
                <SelectTrigger className="lg:w-[280px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {allCities
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                // onClick={handleFind}
                className="bg-mainColor hover:bg-mainColor xs:hover:bg-mainColorSecondary inline-flex items-center text-xs xs:text-sm lg:gap-2 px-2 xs:py-0.5"
              >
                <SearchIcon className="xs:w-5 xs:h-5 w-4 h-4" />
                Search
              </Button>
            </div>
          </div> */}
        
      </CardContent>
      <CardContent>
        <TopTenAgencies/>
      </CardContent>
      <CardContent>
        <TopTenDMC/>
      </CardContent>
      <CardContent>
        <TopTenHotels/>
      </CardContent>
    </Card>
  );
};

export default AdminTop10;
