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
        className="flex-1 border-black border-[1px] py-3 rounded-full text-xl leading-6 font-medium"
        variant="outline"
      >
        Share Link
      </Button>
    </RWebShare>
  );
}

export default ShareButton;
