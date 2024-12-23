import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import InfluencerCard from "../customUI/HomePage/InfluencerCard";
import Autoplay from "embla-carousel-autoplay";

function InfluencerCarousel({
  data,
}: {
  data:
    | {
        id: string;
        name: string;
        image: string;
        description: string;
        speciality: string;
        socialLinks: string[];
        country: string;
        state: string;
      }[]
    | null;
}) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full"
    >
      {/* <div className="absolute -top-7 right-10">
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </div>
       */}

      <div className="hidden my-7 gap-y-4 sm:grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full mx-auto">
        {data && data.length > 0 ? (
          data.slice(0, 10).map((inf) => (
            <CarouselItem
              key={inf.id}
              className="sm:basis-1/2 my-4 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="w-full">
                <InfluencerCard data={inf} />
              </div>
            </CarouselItem>
          ))
        ) : (
          <div className="w-full text-center py-10">No Influencers found</div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:hidden">
        {data && data.length > 0 ? (
          data.slice(0, 10).map((inf) => (
            <CarouselItem key={inf.id} className="p-0">
              <div className="p-1 w-full">
                <InfluencerCard data={inf} />
              </div>
            </CarouselItem>
          ))
        ) : (
          <div className="w-full text-center py-10">No Influencers found</div>
        )}
      </div>
    </Carousel>
  );
}

export default InfluencerCarousel;
