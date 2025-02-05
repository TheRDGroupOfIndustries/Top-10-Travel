"use client";

import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";

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
  setSelectedCountry: (country: string) => void;
  setCountry: (country: string) => void;
  setCity: (state: string) => void;
  allCities: string[];
  allCountries: string[];
  isSticky: boolean;
  search: boolean;
  setSearch: (val: any) => void;
  setSticky: (val: any) => void;
  updateAllData: (data: any) => void;
  setVisible: (val: any) => void;
  allAgencies: [];
  allDMC: [];
  allHotels: [];
};

export const HomeContext = createContext<Homecontext>({} as Homecontext);

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState({
    AGENCY: true,
    DMC: true,
    HOTEL: true,
    Influencer: true,
  });

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCity, setSelectedCity] = useState("");
  const [allCities, setAllCities] = useState<string[]>([]);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [data, setData] = useState<any>();
  const [search, setSearch] = useState<boolean>(false);
  const [isSticky, setSticky] = useState<boolean>(false);

  const [allAgencies, setAllAgencies] = useState<[]>([]);
  const [allDMC, setAllDMC] = useState<[]>([]);
  const [allHotels, setAllHotels] = useState<[]>([]);

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


//* Dead code
  // useEffect(()=>{
  //   const fatchData =  async () => {

  //     const [agencyDatas, dmcData, hotelData] = await Promise.all([
  //       axios.get(`/api/allcity?role=Agency&country=${selectedCountry}`),
  //       axios.get(`/api/allcity?role=DMC&country=${selectedCountry}`),
  //       axios.get(`/api/allcity?role=Hotel&country=${selectedCountry}`),
  //     ]);

  //     console.log(agencyDatas.data.result);
  //     setAllAgencies(agencyDatas.data.result);
  //     setAllDMC(dmcData.data.result);
  //     setAllHotels(hotelData.data.result);
      
  //   }

  //   fatchData();
  // },[selectedCity, selectedCountry])
  
  return (
    <HomeContext.Provider
      value={{
        visible,
        toggleVisible,
        selectedCountry,
        setSelectedCountry,
        setSelectedCity,
        search,
        setSearch,
        isSticky,
        setSticky,
        selectedCity,
        setCountry,
        setCity,
        allCities,
        allCountries,
        updateAllData,
        setVisible,
        allAgencies,
        allDMC,
        allHotels
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
