import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import StarRating from "./StarRating";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const ListSection = ({
  data,
  role,
}: {
  role: "AGENCY" | "HOTEL" | "DMC" | "Influencers";
  data: any;
}) => {
  const [displayCount, setDisplayCount] = useState(5); // State to manage number of services displayed

  const loadMoreServices = () => {
    setDisplayCount(displayCount + 5); // Load next 5 services
  };

  return (
    <div className="px-2 md:px-3 lg:px-6 xl:px-8 flex flex-col md:gap-0 gap-7 items-center mb-10">
      {data?.slice(0, displayCount).map((service: any, i: number) => (
        <div
          key={service?.legalName || i}
          className="md:w-full md:shadow-none shadow-xl flex md:flex-row flex-col xl:gap-16 lg:gap-8 md:gap-6 gap-1 lg:mx-4 lg:my-4 lg:h-80 md:h-72 sm:w-96 w-80 rounded-xl md:overflow-visible overflow-hidden md:rounded-none"
        >
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="lg:w-96 md:w-80 sm:w-96 w-80 h-[320px] relative"
          >
            <CarouselContent>
              {Array.isArray(service?.images) ? (
                service?.images?.map((img: string, idx: number) => (
                  <CarouselItem
                    key={idx}
                    className="lg:w-96 md:w-80 sm:w-96 w-80 lg:h-[320px] md:h-[276px] h-[320px] relative"
                  >
                    <Image
                      layout="fill"
                      className="object-cover"
                      src={img}
                      alt={`service image ${idx + 1}`}
                    />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="lg:w-96 md:w-80 sm:w-96 w-80 lg:h-[320px] md:h-[276px] h-[320px] relative">
                  <Image
                    layout="fill"
                    className="object-cover"
                    src={service?.image!}
                    alt="service image"
                  />
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>

          <div className="lg:px-2 flex flex-col xl:gap-5 md:gap-6 gap-6 flex-1 md:p-0 p-2">
            <div className="flex md:items-start items-center justify-between">
              <div className="flex flex-col xl:gap-1.5 lg:gap-1 gap-[6px]">
                <h3 className="lg:text-3xl text-2xl xl:leading-[52px] lg:leading-10 leading-8 font-bold">
                  {role === "Influencers" ? service?.name : service?.legalName}
                </h3>
                <p className="font-medium text-sm leading-[10px]">
                  {role === "Influencers"
                    ? service?.speciality
                    : `${service?.city}, ${service?.state}, ${service?.country}.`}
                </p>
              </div>
              <Link
                href={
                  role === "Influencers"
                    ? `/influencers/${service?.name}`
                    : `/companies/${service?.legalName}`
                }
              >
                {role === "Influencers" ? (
                  <Button
                    variant="outline"
                    className="rounded-full lg:inline-block hidden border-slate-500 text-sm leading-4 font-medium xl:px-9 lg:px-6 px-4"
                  >
                    MORE
                  </Button>
                ) : null}
              </Link>
              <div className="md:hidden">
                {role === "Influencers" ? (
                  <span className="text-slate-400 text-sm">
                    {service?.socialId}
                  </span>
                ) : (
                  <StarRating
                    maxRating={5}
                    color="#734E03"
                    readOnly={true}
                    defaultRating={service?.rating}
                    size={14}
                  />
                )}
              </div>
            </div>

            <div className="md:flex items-center hidden xl:gap-4 gap-3">
              {role === "Influencers" ? (
                <div className="text-slate-400 text-lg leading-3">
                  {service?.socialId}
                </div>
              ) : (
                <>
                  {" "}
                  <div className="hidden lg:block">
                    <StarRating
                      maxRating={5}
                      color="#734E03"
                      readOnly={true}
                      defaultRating={service?.rating || 4}
                      size={20}
                      showNumber={false}
                    />
                  </div>
                  <div className="lg:hidden block">
                    <StarRating
                      maxRating={5}
                      color="#734E03"
                      readOnly={true}
                      defaultRating={service?.rating || 4}
                      size={14}
                      showNumber={false}
                    />
                  </div>
                  <p className="font-semibold lg:text-sm lg:leading-4 text-xs leading-3">
                    {service?.reviews || 37} Reviews
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col lg:gap-0 gap-[2px]">
              <p className="font-semibold text-lg xl:leading-10 lg:leading-7 leading-4">
                {role === "Influencers" ? "Intro" : "Description"}
              </p>
              <p className="text-sm font-medium  text-justify">
                <span className="xl:inline hidden">{service.description}</span>
                <Link href="/hotels" className="text-slate-600 text-xs">
                  ...Read more
                </Link>
              </p>
            </div>

            <div className="flex justify-between">
              {role === "Influencers" ? (
                <Button
                  className="border-none text-slate-500"
                  variant="outline"
                >
                  Social Links <ArrowUpRight />
                </Button>
              ) : (
                <Link href={`/companies/${service?.legalName}`}>
                  <Button className="rounded-full bg-mainColor text-black hover:bg-[#fae2a3] text-sm leading-4 font-medium lg:px-9 px-5">
                    Explore
                  </Button>
                </Link>
              )}
              <Link
                href={
                  role === "Influencers"
                    ? `/influencers/${service?.name}`
                    : `/companies/${service?.legalName}`
                }
              >
                {role === "Influencers" ? (
                  <Button
                    variant="outline"
                    className="rounded-full lg:inline-block hidden border-slate-500 text-sm leading-4 font-medium xl:px-9 lg:px-6 px-4"
                  >
                    MORE
                  </Button>
                ) : null}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {data.length > displayCount && ( // Render "View More" button if there are more services to load
        <div className="md:my-16 my-7">
          <button
            onClick={loadMoreServices}
            className="text-center hover:underline hover:text-slate-700 font-medium cursor-pointer uppercase tracking-wide text-sm"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ListSection;
