"use client";
import ButtonFancy from "@/components/reusable/ButtonFancy";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import { DotIcon } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

const filterArr = [
  "All",
  "India",
  "USA",
  "Australia",
  "China",
  "Russia",
  "Sweden",
  "Dubai",
  "Africa",
];

const ButtonCarousel = () => {
  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);
  // const leftRef = useRef<HTMLButtonElement>(null);
  // const rightRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);
  return (
    <Carousel className="w-[80%] m-auto my-20">
      <CarouselContent>
        {filterArr.map((el, index) => (
          <CarouselItem className="basis-1/6" key={index}>
            <div className="p-1">
              <ButtonFancy
                className={
                  "bg-white border-black hover:bg-[#35392A] h-[50px] hover:text-white"
                }
              >
                {el}
              </ButtonFancy>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <div className="py-2 flex items-center justify-center text-center text-sm text-muted-foreground">
        {Array.from({ length: count }).map((_, ind) => {
          return (
            <span
              key={ind}
              onClick={() => {
                if (current + 1 < ind) rightRef.current?.click();
                else leftRef.current?.click();
              }}
            >
              <DotIcon
                className={cn(
                  "w-8 h-8",
                  current - 1 === ind ? "bg-red-400" : ""
                )}
              />
            </span>
          );
        })}
      </div> */}
      <CarouselPrevious
      // ref={leftRef}
      // className="left-0 top-1/2 -translate-y-1/2 border-black"
      />
      <CarouselNext
      // ref={rightRef}
      // className="right-0 top-1/2 -translate-y-1/2 border-black"
      />
    </Carousel>
  );
};
export default ButtonCarousel;
