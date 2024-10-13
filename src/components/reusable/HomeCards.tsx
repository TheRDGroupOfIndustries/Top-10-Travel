"use client";
import { db } from "@/core/client/db";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";

const HomeCards = ({
  country,
  city,
  role,
  setSelectedCity,
  image,
}: {
  country: string;
  city: string;
  setSelectedCity: (val: string) => void;
  role: string;
  image: string;
}) => {
  // const data = useAxios({
  //   url: `/api/image?country=${country}&city=${city}&role=${role}`,
  //   selectedCity: city,
  //   selectedCountry: country,
  // });

  // console.log(data);

  return (
    <div
      onClick={() => {
        setSelectedCity(city);
        const element = document.getElementById("toNavigate"); // Replace 'element-id' with the actual id of your target element
        if (element) {
          element.scrollIntoView({
            behavior: "smooth", // Smooth scrolling
            block: "nearest", // Align to the top of the element
          });
        }
      }}
      className="relative flex items-end justify-center shadow cursor-pointer p-2 hover:-translate-y-1 transform-all duration-300 w-full h-48 border border-1 rounded-lg"
    >
      <Image
        fill
        src={image}
        alt={`Background image of ${role} card`}
        className="absolute object-cover rounded-lg -z-10"
      />
      <div className="w-[95%] p-2 space-y-0.5 h-16 bg-white/80 backdrop-blur-sm rounded-lg">
        <p className="font-bold text-lg text-slate-800">{city}</p>
        <p className="uppercase text-sm font-semibold tracking-wide text-slate-700">
          {country}
        </p>
      </div>
    </div>
  );
};

export default HomeCards;
