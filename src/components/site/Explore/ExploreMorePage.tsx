"use client";

import React, { useEffect, useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";
import { usePathname } from "next/navigation";

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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const pathname = usePathname();

  const filteredData = data?.filter((item) => {
    if (selectedCountry && selectedState) {
      return item.country === selectedCountry && item.city === selectedState;
    } else if (selectedCountry) {
      return item.country === selectedCountry;
    } else if (selectedState) {
      return item.city === selectedState;
    }
    return true;
  });

  const countriesData = useMemo(
    () => Array.from(data.map((d) => ({ country: d.country, state: d.city }))),
    [data]
  );

  useEffect(() => {
    let country;
    let state;

    if (pathname.includes("/Agency")) {
      country = window.localStorage.getItem("Agency-Country");
      state = window.localStorage.getItem("Agency-State");
    }
    if (pathname.includes("/Hotels")) {
      country = window.localStorage.getItem("Hotels-Country");
      state = window.localStorage.getItem("Hotels-State");
    }
    if (pathname.includes("/DMC")) {
      country = window.localStorage.getItem("DMC-Country");
      state = window.localStorage.getItem("DMC-State");
    }

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
        title={`TOP TRAVEL ${role}`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />

      <ListData
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        role={role}
        data={filteredData}
      />
    </div>
  );
};

export default ExploreMore;
