import React from "react";
import { RWebShare } from "react-web-share";
import { Button } from '../ui/button';

function ShareButton(){
  return (
    <RWebShare
      data={{
        text: "Share Link With Other",
        url: window.location.href,
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
};

export default ShareButton;
