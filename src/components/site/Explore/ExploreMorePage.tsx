"use client";

import React, { useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";

type Data = {
  id: string;
  reviews: number;
  legalName: string;
  image: string | null;
  country: string;
  city: string;
  rating: number;
  methodology: string | null;
}[];
const ExploreMore = ({}: // data,
// role,
// isLoading,
{
  // data: Data;
  // role: "AGENCY" | "HOTEL" | "DMC";
  // isLoading: boolean;
}) => {
  // const [selectedCountry, setSelectedCountry] = useState("");
  // const [selectedState, setSelectedState] = useState("");

  // const filteredData = data?.filter((item) => {
  //   if (selectedCountry && selectedState) {
  //     return item.country === selectedCountry && item.city === selectedState;
  //   } else if (selectedCountry) {
  //     return item.country === selectedCountry;
  //   } else if (selectedState) {
  //     return item.city === selectedState;
  //   }
  //   return true;
  // });

  // const countriesData = useMemo(
  //   () => Array.from(data.map((d) => ({ country: d.country, state: d.city }))),
  //   [data]
  // );

  return (
    <div>
      {/* <ListingHero
        countriesData={countriesData}
        title={`TOP TRAVEL ${role}`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      /> */}

      <ListData
      // isLoading={isLoading} role={role} data={filteredData}
      />
    </div>
  );
};

export default ExploreMore;
