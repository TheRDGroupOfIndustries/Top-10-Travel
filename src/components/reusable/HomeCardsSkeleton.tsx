"use client";
import { db } from "@/core/client/db";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";

const HomeCardsSkeleton = ({key}:{key:number}) => {
  

  return (
    <div
        key={key}
      className="relative flex items-end  justify-center shadow cursor-pointer hover:-translate-y-1 transform-all duration-300 w-full h-48 border border-1 rounded-lg bg-gray-300"
    >
      
      
    </div>
  );
};

export default HomeCardsSkeleton;
