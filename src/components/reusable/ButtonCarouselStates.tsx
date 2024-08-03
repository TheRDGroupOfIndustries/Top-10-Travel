"use client";
import ButtonFancy from "@/components/reusable/ButtonFancy";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import IndiaStates from "@/lib/indiaState.json";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const ButtonCarouselStates = () => {
  const current = useSearchParams().get("state") ?? "Uttar Pradesh";
  const states = useMemo(
    () => Object.keys(IndiaStates).filter((state) => state !== current),
    [current]
  );
  const pathname = usePathname();
  return (
    <Carousel className="md:w-[90%] w-[100%] m-auto my-5">
      <CarouselContent>
        <CarouselItem className="basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
          <div className="w-[100%] m-auto">
            <ButtonFancy
              className={" border-black bg-black h-[50px] text-white"}
            >
              {current && current.length > 15
                ? current.substring(0, 15) + "..."
                : current}
            </ButtonFancy>
          </div>
        </CarouselItem>
        {states.map((el, index) => (
          <CarouselItem
            className="basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            key={el}
          >
            <Link
              className="p-1"
              href={pathname.split("?")[0] + "?state=" + el}
              scroll={false}
            >
              <ButtonFancy
                className={
                  "bg-white border-black hover:bg-[#35392A] h-[50px] hover:text-white opacity-60 hover:opacity-100"
                }
              >
                {el.length > 15 ? el.substring(0, 15) + "..." : el}
              </ButtonFancy>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-10 md:block hidden" />
      <CarouselNext className="-right-10 md:block hidden" />
    </Carousel>
  );
};
export default ButtonCarouselStates;
