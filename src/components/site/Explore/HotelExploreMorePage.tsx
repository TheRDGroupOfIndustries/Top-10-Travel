"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { HomeContext } from "@/hooks/context/HomeContext";
import axios from "axios";
import HomeCardsSkeleton from "@/components/reusable/HomeCardsSkeleton";

interface Item {
  city: string;
  image: string;
  country: string;
}

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
const HotelExploreMorePage = ({
  data,
  role,
}: {
  data: Data;
  role: "Agency" | "Hotel" | "DMC";
}) => {
  // const [selectedCountryy, setSelectedCountry] = useState("");
  // const [selectedState, setSelectedState] = useState("");
  const searchParams = useSearchParams();
  const queryCountry = searchParams.get("queryCountry");
  const queryCity = searchParams.get("queryCity");

  

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  // console.log("data",data);

  const [city, setCity] = useState([]);
  const [cardIsLoading, setCardIsLoading] = useState(true);

//   const naviagte = useRouter();


  const filteredData = data?.filter((item) => {
    if (selectedCountry && selectedCity) {
      return item.country === selectedCountry && item.city === selectedCity;
    } 
    
    else if (selectedCountry) {
      return item.country === selectedCountry;
    } 
    
    else if (selectedCity) {
      return item.city === selectedCity;
    }
    return true;
  });

  const countriesData = useMemo(
    () => Array.from(data.map((d) => ({ country: d.country, state: d.city }))),
    [data]
  );

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




  useEffect(() => {
    setCardIsLoading(true);
    setCity([]);

    const fetchData = async () => {
      const response = await axios.get(
        `/api/topten?role=${role}&country=kl`
      );
      setCity(response.data.result);
      setCardIsLoading(false);
    };

    fetchData();
  }, [role]);

  const handleClicked = (city: string, country: string) => {
    setSelectedCity(city);
    setSelectedCountry(country);
  };





  return (

    <div>

      <ListingHero
        countriesData={countriesData}
        title={`TOP TRAVEL ${role}`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedCity}
        setSelectedState={setSelectedCity}
      />

        <div className="w-full mt-[40px] grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3 px-7">
            {city.map((item: Item, i) => {
              if (i > 11) return;

              return (
                <div
                  key={i}
                  onClick={() => handleClicked(item.city, item.country)}
                  className="relative flex items-end  justify-center shadow cursor-pointer hover:-translate-y-1 transform-all duration-300 w-full h-48 border border-1 rounded-lg"
                >
                  <img
                    src={`${item.image}`}
                    alt={`Background image of agency card`}
                    className="absolute object-cover rounded-lg h-full w-full -z-10"
                  />
                  <div className="w-[95%] p-2 m-2 space-y-0.5 h-16 bg-white/80 backdrop-blur-sm rounded-lg">
                    <p className="line-clamp-1 font-bold text-lg text-slate-800">{`${item.city}, ${item.country}`}</p>
                    <p className="uppercase text-sm font-semibold tracking-wide text-slate-700">
                      {item.country}
                    </p>
                  </div>
                </div>
              );
            })}

            {cardIsLoading &&
              Array.from({ length: 12 }).map((_, i: number) => (
                <HomeCardsSkeleton key={i} />
              ))}
          </div>


      {/* <ListingHero
        countriesData={countriesData}
        title={`TOP TRAVEL ${role}`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedCity}
        setSelectedState={setSelectedCity}
      /> */}

    { selectedCountry && selectedCity &&   <ListData
        selectedCountry={selectedCountry}
        selectedState={selectedCity}
        title={`TOP TRAVEL ${role}`}
        role={role}
        data={filteredData}
      />}
    </div>
  );
};

export default HotelExploreMorePage;
