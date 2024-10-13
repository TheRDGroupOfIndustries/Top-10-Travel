"use client";
import React from "react";
import { RWebShare } from "react-web-share";
import { Button } from "../ui/button";

function ShareButton() {
  // Get the current URL dynamically
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <RWebShare
      data={{
        text: "Share Link With Others",
        url: shareUrl,
        title: "Share",
      }}
      onClick={() => console.log("shared successfully!")}
    >
      <Button
        className="border-black h-full w-1/3 border-[1px] rounded-full sm:text-xl min-[421px]:text-base text-xs font-medium transform hover:-translate-y-1 transition duration-200 hover:shadow-md hover:bg-white"
        variant="outline"
      >
        Share
      </Button>
    </RWebShare>
  );
}

export default ShareButton;
