"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";
import { usePathname } from "next/navigation";
import { HomeContext } from "@/hooks/context/HomeContext";

type Data = {
  id: string;
  reviews: number;
  name: string;
  images: string[] | null;
  country: string;
  city: string;
  rating: number;
  methodology: string | null;
}[];
const ExploreMore = ({
  data,
  role,
}: {
  data: Data;
  role: "Agency" | "Hotels" | "DMC";
}) => {
  // const [selectedCountryy, setSelectedCountry] = useState("");
  // const [selectedState, setSelectedState] = useState("");
  const pathname = usePathname();

  const { selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, allCities, visible } =
  useContext(HomeContext);
  // console.log("data",data);


  const filteredData = data?.filter((item) => {
    if (selectedCountry && selectedCity) {
      return item.country === selectedCountry && item.city === selectedCity;
    } else if (selectedCountry) {
      return item.country === selectedCountry;
    } else if (selectedCity) {
      return item.city === selectedCity;
    }
    return true;
  });

  const countriesData = useMemo(
    () => Array.from(data.map((d) => ({ country: d.country, state: d.city }))),
    [data]
  );

  useEffect(() => {
    

    
      setSelectedCountry( selectedCountry);
    

  
      setSelectedCity( selectedCity);
    
  }, []);


  return (
    <div>
      <ListingHero
        countriesData={countriesData}
        title={`TOP TRAVEL ${role}`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedCity}
        setSelectedState={setSelectedCity}
      />

      <ListData
        selectedCountry={selectedCountry}
        selectedState={selectedCity}
        role={role}
        data={filteredData}
      />
    </div>
  );
};

export default ExploreMore;
