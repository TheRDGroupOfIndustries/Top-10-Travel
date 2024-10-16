"use client";

import React, { useEffect, useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";
import ListDataInfluencer from "./NewDesign/ListDataInfluencer";

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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const filteredData = data?.filter((item) => {
    if (selectedCountry && selectedState) {
      return item.country === selectedCountry && item.state === selectedState;
    } else if (selectedCountry) {
      return item.country === selectedCountry;
    } else if (selectedState) {
      return item.state === selectedState;
    }
    return true;
  });

  const countriesData = useMemo(
    () => Array.from(data.map((d) => ({ country: d.country, state: d.state }))),
    [data]
  );

  
  useEffect(() => {
    const country = window.localStorage.getItem("Influencers-Country");
    const state = window.localStorage.getItem("Influencers-State");
    
    if (country) {
      setSelectedCountry(country);
    }

    if (state) {
      setSelectedState(state);
    }
  }, []);


  return (
    <div>
      <ListingHero
        countriesData={countriesData}
        title={`TOP TRAVEL INFLUENCERS`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />

      <ListDataInfluencer
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        data={filteredData}
      />
    </div>
  );
};

export default InfluencerExploreMore;
