"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const HeroHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        type: "spring",
      }}
      className={cn(
        "lg:text-4xl md:text-3xl sm:text-2xl text-xl lg:tracking-wide text-center font-bold xl:pt-40 lg:pt-36 md:pt-32 sm:pt-28 pt-20 xl:leading-[86px] lg:leading-[60px] leading-[56px] xl:pb-12 lg:pb-10 md:pb-8 sm:pb-6 pb-4",
        className
      )}
    >
      {title}
    </motion.div>
  );
};

export default HeroHeading;
