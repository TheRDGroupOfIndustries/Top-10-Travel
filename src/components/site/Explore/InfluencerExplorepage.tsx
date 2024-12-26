"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";
import ListDataInfluencer from "./NewDesign/ListDataInfluencer";
import { HomeContext } from "@/hooks/context/HomeContext";
import HomeCardsSkeleton from "@/components/reusable/HomeCardsSkeleton";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";


interface Item {
  state: string;
  image: string;
}

type Data = {
  image: string;
  id: string;
  name: string;
  country: string;
  state: string;
  description: string;
  speciality: string;
  state_priority: number;
}[];
const InfluencerExploreMore = ({ data }: { data: Data }) => {
  const searchParams = useSearchParams();
  const queryCountry = searchParams.get("queryCountry");
  const queryCity = searchParams.get("queryCity");

  

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCity, setSelectedCity] = useState("");

  
  const [city, setCity] = useState([]);
  const [cardIsLoading, setCardIsLoading] = useState(true);
  const naviagte = useRouter();


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
    setCardIsLoading(true);
    setCity([]);

    const fetchData = async () => {
      const response = await axios.get(
        `/api/topten?role=Influencer&country=${selectedCountry}`
      );
      setCity(response.data.result);
      setCardIsLoading(false);
    };

    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    
    if (queryCity && queryCountry) {
      console.log(queryCity, queryCountry);
      setSelectedCountry(queryCountry as string);
      setSelectedCity(queryCity as string);
    }
  }, []);

  useEffect(()=>{
    document.getElementById("scrollList")?.scrollIntoView({ behavior: "smooth" });
  },[selectedCountry,selectedCity])


  return (
    <div>
      <ListingHero
        countriesData={countriesData}
        // title={`TOP TRAVEL INFLUENCERS`}
        title={`TOP TRAVEL INFLUENCERS ${
          selectedCountry && ", " + selectedCountry.toUpperCase()
        }${selectedCity && "-" + selectedCity.toUpperCase()}`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedCity}
        setSelectedState={setSelectedCity}
      />


        <div className="w-full mt-[40px] grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3 px-7">
            {city.map((item:Item, i) => {
              if (i > 11) return;

              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedCity(item.state);
                    // naviagte.push(`/Influencers`); 
                    document.getElementById("scrollList")?.scrollIntoView({ behavior: "smooth" });
                    
                  }}
                  className="relative flex items-end  justify-center shadow cursor-pointer hover:-translate-y-1 transform-all duration-300 w-full h-48 border border-1 rounded-lg"
                >
                  <img
                    src={`${item.image}`}
                    alt={`Background image of agency card`}
                    className="absolute object-cover rounded-lg h-full w-full -z-10"
                  />
                  <div className="w-[95%] p-2 m-2 space-y-0.5 h-16 bg-white/80 backdrop-blur-sm rounded-lg">
                    <p className="font-bold text-lg text-slate-800">{item.state}</p>
                    <p className="uppercase text-sm font-semibold tracking-wide text-slate-700">
                      {selectedCountry}
                    </p>
                  </div>
                </div>
              );
            })}

            {cardIsLoading &&
              Array.from({ length: 12 }).map((_, i: number) => (
                <HomeCardsSkeleton index={i} key={i} />
              ))}
          </div>


      

      {selectedCity === "" || !selectedCity ? null : ( <ListDataInfluencer
        selectedCountry={selectedCountry}
        selectedState={selectedCity}
        data={filteredData}
        title={`ok`}
      />)}
    </div>
  );
};

export default InfluencerExploreMore;
