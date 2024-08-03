"use client";

import React, { useMemo, useState } from "react";
import ListingHero from "./NewDesign/ListingHero";
import ListData from "./NewDesign/ListData";
import ListDataInfluencer from "./NewDesign/ListDataInfluencer";

type Data = {
  id: string;
  reviews: number;
  legalName: string;
  image: string | null;
  country: string;
  state: string;
  rating: number;
  methodology: string | null;
}[];
const ExploreMore = ({
  data,
  role,
  isLoading,
}: {
  data: Data;
  role: "AGENCY" | "HOTEL" | "DMC";
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
        title={`TOP TRAVEL ${role}`}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />

      <ListData
        isLoading={isLoading}
        role={role}
        data={filteredData}
      />
    </div>
  );
};

export default ExploreMore;

// "use client";

// import HeroFullImage from "@/components/reusable/HeroFullImage";
// import HeroHeading from "@/components/reusable/HeroHeading";
// import ListingHeading from "@/components/reusable/ListingHeading";
// import ListSection from "@/components/reusable/ListSection";
// import type { StaticImageData } from "next/image";
// import { useParams, useSearchParams } from "next/navigation";
// import ListingHero from "./NewDesign/ListingHero";
// import ListData from "./NewDesign/ListData";

// const ExploreMore = ({
//   data,
//   role,
//   image,
// }: {
//   data: any;
//   role: "AGENCY" | "HOTEL" | "DMC" | "Influencers";
//   image: StaticImageData;
// }) => {
//   const current = useParams().country;
//   const state = useSearchParams().get("state");
//   // const state = params.state as string;

//   console.log(data);

//   let locationToPass;
//   if (role === "DMC" || role === "Influencers") {
//     locationToPass = current;
//   } else {
//     locationToPass = state;
//   }

//   return (
//     <div>
//       {/* <HeroHeading title={`TOP 10 ${role} in ${locationToPass}`} /> */}
//       {/* <HeroFullImage image={image} /> */}
//       {/* <ListingHeading title={`${locationToPass}: ALL CITIES`} /> */}
//       {/* <ListSection data={data} role={role} /> */}
//       <ListingHero
//         title={`TOP TRAVEL ${role}`}
//         countries={["India", "USA", "Pakistan"]}
//       />
//       <ListData role={role} />
//     </div>
//   );
// };

// export default ExploreMore;
