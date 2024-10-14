"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { HomeContext } from "@/hooks/context/HomeContext";
import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";

const data = [
  { id: 1, num: 1000, title: "Happy Agencies" },
  { id: 2, num: 400, title: "Certified Hotels" },
  { id: 3, num: 200, title: "Reviews" },
];

export function CountUp({
  target,
  className,
}: {
  target: number;
  className?: string;
}) {
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
      className={className ? className : "lg:text-2xl text-md font-bold"}
    >
      {count}+
    </span>
  );
}

function Certification() {
  const session = useSession();
  const { isSticky, setSticky } = useContext(HomeContext);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (elementRef.current) {
      const elementTop = elementRef.current.getBoundingClientRect().top;
      // Check if the element has touched the top of the window
      // setSticky(elementTop <= 0);
      if (elementTop <= 300) setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={elementRef} className="w-full h-auto mt-16 py-5 bg-mainColor">
      <div className="px-3 lg:px-6 xl:px-8 w-full h-full flex flex-col items-center justify-between">
        <h1 className="font-bold text-white md:text-4xl lg:text-[35px] text-xl my-3 lg:my-6">
          Our legacy
        </h1>
        <div className="w-full grid text-white grid-cols-3 gap-2 md:gap-10 lg:px-28">
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
        <h2 className="font-bold text-white md:text-3xl text-2xl lg:text-4xl font-serif text-center  my-3 lg:my-10">
          WANT TO GET CERTIFIED?
        </h2>
        {session.status !== "authenticated" ? (
          <motion.div
            onClick={() => signIn("google")}
            className="bg-white px-5 lg:px-6 cursor-pointer py-3 lg:mt-2 mb-2 mx-auto hover:bg-slate-100 w-fit transition-colors lg:text-lg text-black 
            font-bold rounded-[40px]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            REGISTER
          </motion.div>
        ) : (
          <Link href="/auth/get-started">
            <motion.div
              className="bg-white px-5 lg:px-6 cursor-pointer py-3 lg:mt-2 mb-2 mx-auto hover:bg-slate-100 w-fit transition-colors lg:text-lg text-black font-bold rounded-[40px]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              REGISTER
            </motion.div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Certification;
