"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const data = [
  { id: 1, num: 1000, title: "Happy Agencies" },
  { id: 2, num: 400, title: "Certified Hotels" },
  { id: 3, num: 200, title: "Reviews" },
];

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 50;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, target]);

  return (
    <span ref={ref} className="text-2xl font-bold">
      {count}+
    </span>
  );
}

function Certification() {
  return (
    <div className="w-full h-[60vh] mt-5 py-5 bg-[#FFC658]">
      <div className="px-2 md:px-3 lg:px-6 xl:px-8 w-full h-full flex flex-col items-center justify-between">
        <h1 className="font-bold md:text-4xl text-xl">Our legacy</h1>
        <div className="w-full grid grid-cols-3 gap-2 md:gap-10 lg:px-40">
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start gap-1"
            >
              <CountUp target={item.num} />
              <h3 className="md:text-2xl text-sm text-center font-bold">
                {item?.title}
              </h3>
            </div>
          ))}
        </div>
        <h2 className="font-bold md:text-4xl text-xl text-center">
          WANT TO GET CERTIFIED?
        </h2>
        <motion.div
          className="bg-black px-5 py-2 rounded-md mt-6 mb-5 mx-auto hover:bg-gray-800 w-fit transition-colors text-white font-bold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={`#`}
          >
            REGISTER
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Certification;
