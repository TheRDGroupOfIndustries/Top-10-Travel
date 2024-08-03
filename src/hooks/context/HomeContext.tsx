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
  updateAllCities: (cities: string[]) => void;
  updateAllCountries: (countries: string[]) => void;
};

export const HomeContext = createContext<Homecontext>({} as Homecontext);

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState({
    DMC: true,
    AGENCY: true,
    HOTEL: true,
    Influencer: true,
  });
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCity, setSelectedCity] = useState("");
  const [allCities, setAllCities] = useState<string[]>([]);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const updateAllCities = (cities: string[]) => {
    setAllCities((prev) => {
      return Array.from(new Set([...prev, ...cities]));
    });
  };
  const updateAllCountries = (countries: string[]) => {
    setAllCountries((prev) => {
      return Array.from(new Set([...prev, ...countries]));
    });
  };
  const toggleVisible = (tag: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => {
    setVisible((prev) => {
      const allOthersFalse = Object.keys(prev)
        .filter((key) => key !== tag)
        .every((key) => !prev[key as typeof tag]);

      // If all others are false, do not toggle the current one
      if (allOthersFalse) {
        return prev;
      }

      return { ...prev, [tag]: !prev[tag] };
    });
  };
  const setCountry = (country: string) => {
    setSelectedCountry(country);
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
        updateAllCities,
        updateAllCountries,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
