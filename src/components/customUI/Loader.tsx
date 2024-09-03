"use client";
import React, { useEffect, useRef } from "react";

const Loader = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.top = "-100%";
      }
    }, 4000);
  }, []);

  useEffect(() => {
    const words = ["Dmc", "Hotel"];
    let currentWordIndex = 0;

    const intervalId = setInterval(() => {
      if (textRef.current) {
        textRef.current.innerHTML = words[currentWordIndex];
        currentWordIndex++;

        // Stop the interval when the last word "Hotel" is displayed
        if (currentWordIndex >= words.length) {
          clearInterval(intervalId);
        }
      }
    }, 1500); // Adjust the delay (in milliseconds) between each word here

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div
      id="loader"
      ref={loaderRef}
      className="h-[100vh] flex items-center justify-center w-full transition-all duration-700 z-50 top-0 fixed bg-black"
    >
      <div className="sm:text-6xl py-4 text-4xl animate-load bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 font-bold">
        Travel Top 10&nbsp;
        <span ref={textRef} className="">
          Agency
        </span>
      </div>
    </div>
  );
};

export default Loader;
