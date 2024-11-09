"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";
import ListDataInfluencer from "./NewDesign/ListDataInfluencer";
import { HomeContext } from "@/hooks/context/HomeContext";

type Data = {
  image: string;
  id: string;
  name: string;
  country: string;
  state: string;
  description: string;
  speciality: string;
}[];
const InfluencerExploreMore = ({ data }: { data: Data }) => {
  // const [selectedCountry, setSelectedCountry] = useState("");
  // const [selectedState, setSelectedState] = useState("");

  const { selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, allCities, visible } =
  useContext(HomeContext);

  const filteredData = data?.filter((item) => {
    if (selectedCountry && selectedCity) {
      return item.country === selectedCountry && item.state === selectedCity;
    } else if (selectedCountry) {
      return item.country === selectedCountry;
    } else if (selectedCity) {
      return item.state === selectedCity;
    }
    return true;
  });

  const countriesData = useMemo(
    () => Array.from(data.map((d) => ({ country: d.country, state: d.state }))),
    [data]
  );

  
  useEffect(() => {
    
    
    
      setSelectedCountry(selectedCountry);
    

    
      setSelectedCity(selectedCity);
    
  }, []);


  return (
    <div>
      <ListingHero
        countriesData={countriesData}
        title={`TOP TRAVEL INFLUENCERS`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedCity}
        setSelectedState={setSelectedCity}
      />

      <ListDataInfluencer
        selectedCountry={selectedCountry}
        selectedState={selectedCity}
        data={filteredData}
      />
    </div>
  );
};

export default InfluencerExploreMore;
