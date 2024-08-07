import React from "react";
import { CircleCheckBig } from "lucide-react";
import { MapPin } from "lucide-react";
import { Building } from "lucide-react";
import { NotebookTabs } from "lucide-react";

const icons = [NotebookTabs, MapPin, Building, CircleCheckBig];
interface Bar {
  activeStep: number;
  totalSteps: number;
}

const ProgressBar = ({ activeStep, totalSteps }: Bar) => {
  const progressPercentage = (activeStep / totalSteps) * 100;

  return (
    <div className="relative w-[75%] sm:w-[70%] md:w-[70%] lg:w-[75%] max-w-[500px] mx-auto xl:mt-[8%] lg:mt-[7%] md:mt-[9%] sm:mt-[6%] mt-[11%] px-4 border-red-300">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className=" bg-[#FCB62E] h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2">
        {icons.map((Icon, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{
              position: "absolute",
              left: `${(index / (icons.length - 1)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className={` -mt-[50%] w-fit h-fit p-3 rounded-full flex justify-center items-center ${
                index <= activeStep ? "bg-[#FCB62E]" : "bg-[#ffd79c]"
              } -translate-x-4`}
            >
              <Icon
                className={`mx-auto text-2xl ${
                  index <= activeStep ? "text-white" : "text-white"
                }`}
              />
            </div>
            <div
              className={`text-sm ${
                index <= activeStep ? "text-[#FCB62E]" : "text-gray-500"
              } -translate-x-4`}
            >
              {index === activeStep && (
                <span className="block w-16 text-center">
                  {["Contact", "Address", "Agency", "Confirmation"][index]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
