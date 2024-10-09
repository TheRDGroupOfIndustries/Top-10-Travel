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
  setSelectedCity: (state: string) => void;
  setCountry: (country: string) => void;
  setCity: (state: string) => void;
  allCities: string[];
  allCountries: string[];
  isSticky: boolean;
  setSticky: (val: boolean) => void;
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
  const [isSticky, setSticky] = useState<boolean>(false);

  const updateAllData = (data: any) => {
    setData(data);
    const countries = Object.keys(data);
    setAllCountries(countries);

    // console.log(countries);

    // Determine the default country, either "India" or the first country in the list
    const defaultCountry = countries.includes("India") ? "India" : countries[0];

    // Set the selected country and handle cities after that
    setSelectedCountry(defaultCountry);

    // Use a callback to ensure we fetch cities only after the country is updated
    const allCities = data[defaultCountry];
    setAllCities(allCities);

    // console.log(data);
    // console.log(allCities);

    // Set the default city to the first city in the list of cities for the selected country
    if (allCities.length > 0) {
      // setSelectedCity(allCities[0].trim());
      // .trim() to handle any leading/trailing spaces
      setSelectedCity("");
    }
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
    if (data) {
      const cities = data[country];
      setAllCities([...cities]);
      // setSelectedCity(cities[0].trim()); // Default to the first city of the selected country
      setSelectedCity("");
    }
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
        setSelectedCity,
        isSticky,
        setSticky,
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
