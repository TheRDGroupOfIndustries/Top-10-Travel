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
        className="border-black border-[1px] rounded-full text-xl leading-6 font-medium transform hover:-translate-y-1 hover:bg-white transition duration-200 hover:shadow-md"
        variant="outline"
      >
        Share Link
      </Button>
    </RWebShare>
  );
}

export default ShareButton;
