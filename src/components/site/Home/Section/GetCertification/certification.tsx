"use client";

import { signIn, useSession } from "next-auth/react";
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
    <span
      ref={ref}
      className="lg:text-2xl  text-md font-bold"
    >
      {count}+
    </span>
  );
}

function Certification() {
  const { status } = useSession();

  return (
    <div className="w-full h-auto mt-10 py-5 bg-colorAll">
      <div className="px-2 md:px-3 lg:px-6 xl:px-8 w-full h-full flex flex-col items-center justify-between">
        <h1 className="font-bold md:text-4xl lg:text-[35px] text-xl my-3 lg:my-6">
          Our legacy
        </h1>
        <div className="w-full grid grid-cols-3 gap-2 md:gap-10 lg:px-40 ">
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start gap-1"
            >
              <CountUp target={item.num} />
              <h3 className="md:text-2xl lg:text-2xl text-sm text-center font-bold">
                {item?.title}
              </h3>
            </div>
          ))}
        </div>
        <h2 className="font-bold md:text-4xl text-2xl lg:text-[45px] font-serif text-center  my-3 lg:my-10">
          WANT TO GET CERTIFIED?
        </h2>
        <motion.div
          className="bg-black px-5 lg:px-10 lg:py-5 py-2  lg:mt-2 mb-2 mx-auto hover:bg-gray-800 w-fit transition-colors lg:text-[20px] text-[14px] text-white font-bold rounded-[40px]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => {
              if (status !== "authenticated") signIn("google");
            }}
          >
            REGISTER
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Certification;
