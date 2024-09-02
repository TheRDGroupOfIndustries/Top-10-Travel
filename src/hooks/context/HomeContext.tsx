"use client";

import React, { createContext, ReactNode, useState } from "react";

type Homecontext = {
  visible: {
    DMC: boolean;
    AGENCY: boolean;
    HOTEL: boolean;
    Influencer: boolean;
  };
  toggleVisible: (tag: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => void;
  selectedCountry: string;
  selectedCity: string;
  setCountry: (country: string) => void;
  setCity: (state: string) => void;
  allCities: string[];
  allCountries: string[];
  updateAllData: (data: any) => void;
};

export const HomeContext = createContext<Homecontext>({} as Homecontext);

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState({
    AGENCY: true,
    DMC: false,
    HOTEL: false,
    Influencer: false,
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [allCities, setAllCities] = useState<string[]>([]);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [data, setData] = useState<any>();

  const updateAllData = (data: any) => {
    setData(data);
    const countries = Object.keys(data);
    Object.keys(data);
    setAllCountries(countries);
    setSelectedCountry("India");
    setAllCities(data["India"]);
  };

  // const toggleVisible = (tag: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => {
  //   setVisible((prev) => {
  //     const allOthersFalse = Object.keys(prev)
  //       .filter((key) => key !== tag)
  //       .every((key) => !prev[key as typeof tag]);

  //     // If all others are false, do not toggle the current one
  //     if (allOthersFalse) {
  //       return prev;
  //     }

  //     return { ...prev, [tag]: !prev[tag] };
  //   });
  // };

  const toggleVisible = (tag: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => {
    setVisible({
      DMC: tag === "DMC",
      AGENCY: tag === "AGENCY",
      HOTEL: tag === "HOTEL",
      Influencer: tag === "Influencer",
    });
  };

  const setCountry = (country: string) => {
    setSelectedCountry(country);
    if (data) setAllCities([...data[country]]);
    setSelectedCity("");
  };
  const setCity = (city: string) => {
    setSelectedCity(city);
  };
  return (
    <HomeContext.Provider
      value={{
        visible,
        toggleVisible,
        selectedCountry,
        selectedCity,
        setCountry,
        setCity,
        allCities,
        allCountries,
        updateAllData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
