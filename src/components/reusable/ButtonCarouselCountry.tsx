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
import Countries from "@/lib/countries.json";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const ButtonCarouselCountry = () => {
  const current = useParams().country;
  const state = useSearchParams().get("state");
  const countries = useMemo(
    () => Countries.filter((c) => c.name !== current),
    [current]
  );

  return (
    <div className="">
      <Carousel className="w-[92%] mx-auto flex items-center justify-between mt-6">
        <CarouselContent className="">
          <CarouselItem className="basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
            <div className="w-[100%] mx-auto">
              <ButtonFancy
                className={" border-black bg-black h-[50px] text-white"}
              >
                {current}
              </ButtonFancy>
            </div>
          </CarouselItem>
          {countries.map((el, index) => (
            <CarouselItem
              className="basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              key={el.code}
            >
              <div className="p-1">
                <Link href={el.name} scroll={false}>
                  <ButtonFancy
                    className={
                      "bg-white border-black hover:bg-[#35392A] h-[50px] hover:text-white opacity-60 hover:opacity-100 overflow-hidden"
                    }
                  >
                    {el.name}
                  </ButtonFancy>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-10 md:block hidden" />
        <CarouselNext className="-right-10 md:block hidden" />
      </Carousel>
    </div>
  );
};
export default ButtonCarouselCountry;
