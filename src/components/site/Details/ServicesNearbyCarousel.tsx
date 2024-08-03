"use client";

import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function ServicesNearbyCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 15 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card className="rounded-2xl overflow-hidden">
                <CardContent className="flex relative aspect-[160/209] items-center justify-center ">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                  <Image
                    alt="nearby services"
                    src={
                      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }
                    layout="fill"
                    className="object-cover bg-no-repeat brightness-75 hover:brightness-90"
                  />
                  {/* <div className="w-full absolute inset-0 hover:bg-transparent bg-black h-full opacity-15"></div> */}
                  <div className="absolute bottom-24 left-5 text-white font-bold lg:text-2xl md:text-xl sm:text-lg text-base">
                    <div>Hotel Name</div>
                    <div className="lg:block hidden">
                      <StarRating
                        defaultRating={4}
                        color="white"
                        maxRating={5}
                        size={18}
                        readOnly={true}
                      />
                    </div>
                    <div className="lg:hidden mt-2 block">
                      <StarRating
                        defaultRating={4}
                        color="white"
                        maxRating={5}
                        size={14}
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <Button className="absolute bg-white/30 backdrop-blur-sm bottom-2 lg:right-4 right-2 lg:text-base text-sm rounded-full">
                    View More <ArrowRight size={14} />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default ServicesNearbyCarousel;
