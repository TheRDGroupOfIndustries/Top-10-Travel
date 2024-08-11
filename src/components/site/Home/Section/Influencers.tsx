"use client";
import InfluencerCarousel from "@/components/reusable/InfluencerCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/core/client/db";
import { InfluencerData } from "@prisma/client";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { motion } from "framer-motion";

type Data =
  | {
      id: string;
      name: string;
      image: string;
      description: string;
      speciality: string;
      socialLinks: string[];
      country: string;
      state: string;
    }[]
  | null;
const Influencers = () => {
  const {
    selectedCountry,
    selectedCity,

    visible,
  } = useContext(HomeContext);
  const { data, isLoading } = useAxios({
    url: `/api/influencers?country=${selectedCountry}&city=${selectedCity}`,
  });

  return (
    <main
      className={cn(
        "w-full px-2 md:px-3 lg:px-6 xl:px-8",
        visible.Influencer ? "" : "hidden"
      )}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl lg:overflow-hidden sm:text-4xl font-bold text-center">
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            {`TOP 10 INFLUENCERS${
              selectedCountry && ", " + selectedCountry.toUpperCase()
            }${selectedCity && "-" + selectedCity.toUpperCase()}`}
          </motion.span>
        </h1>
        <p className="text-base sm:text-lg text-center mb-8">
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            Experience Hassle-Free Room Hunting with Our Comprehensive listing
          </motion.span>
        </p>
        <div
          className={cn(
            "w-full",
            isLoading ? "flex md:flex-row flex-col gap-2" : ""
          )}
        >
          {isLoading && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="md:h-96 h-64 md:w-1/3 w-full rounded-lg overflow-hidden relative"
                >
                  <Skeleton className="w-full h-full absolute inset-0 bg-slate-200" />
                </div>
              ))}
            </>
          )}
          {!isLoading && <InfluencerCarousel data={data as Data} />}
        </div>

        <Link href={`/Influencers`}>
          <motion.div
            className="bg-black px-5 py-2 rounded-md mt-6 mb-5 mx-auto hover:bg-gray-800 w-fit transition-colors text-white font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View more
          </motion.div>
        </Link>
      </div>
    </main>
  );
};

export default Influencers;
