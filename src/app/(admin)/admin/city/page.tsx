"use client";

import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { AgencyApiResult } from "@/types/homeApiType";
import React, { useContext, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

function page() {
    const {
        selectedCity,
        setCity,
        selectedCountry,
        setCountry,
        allCountries,
        allCities
      } = useContext(HomeContext);
      console.log(allCities);
      
      
    return (
    <div className="w-full h-[90%]">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-4xl">City controls</h1>
        <div className="flex gap-4">
        <Select
                value={selectedCountry}
                onValueChange={(val) => setCountry(val)}
              >
                <SelectTrigger className="lg:w-[180px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {allCountries
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedCity}
                onValueChange={(val) => {
                  setCity(val);
                }}
              >
                <SelectTrigger className="lg:w-[180px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select Catogery" />
                </SelectTrigger>
                <SelectContent>
            <SelectItem value={"Hotels"}>
                    Hotels
            </SelectItem>
                </SelectContent>
                </Select>
        </div>
      </div>
    </div>
  );
}

export default page;
