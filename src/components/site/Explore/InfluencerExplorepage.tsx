"use client";

import React, { useMemo, useState } from "react";
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
    speciality:string
}[];
const InfluencerExploreMore = ({
  data,
  isLoading,
}: {
  data: Data;
  isLoading: boolean;
}) => {
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
        isLoading={isLoading}
        data={filteredData}
      />
    </div>
  );
};

export default InfluencerExploreMore;
