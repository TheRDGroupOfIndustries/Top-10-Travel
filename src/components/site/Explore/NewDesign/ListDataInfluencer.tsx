"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillHandIndexThumbFill } from "react-icons/bs";
import { TbMapPin, TbPhoneCall } from "react-icons/tb";

type Data = {
  image: string;
  id: string;
  name: string;
  country: string;
  state: string;
  description: string;
  speciality: string;
  state_priority: number;
}[];

function ListDataInfluencer({
  data,
  selectedCountry,
  selectedState,
  title
}: {
  data: Data;
  selectedCountry: string;
  selectedState: string;
  title: string
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.sort((a, b) => {
    // If both have city_priority, compare them
    if (a.state_priority !== undefined && b.state_priority !== undefined) {
      // Treat 0 as the lowest priority (last)
      if (a.state_priority === 0) return 1;
      if (b.state_priority === 0) return -1;

      // Otherwise, compare city priorities normally
      return a.state_priority - b.state_priority;
    }

    // Items with non-zero state_priority come first
    if (a.state_priority !== undefined && a.state_priority !== 0) return -1;
    if (b.state_priority !== undefined && b.state_priority !== 0) return 1;

    // If no city_priority, maintain original order
    return 0;
  }).slice(indexOfFirstItem, indexOfLastItem);

  

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry, selectedState]);

  return (
    <main id='scrollList' className="w-full pt-14 px-2 md:px-3 lg:px-6 xl:px-8">
      <h1 className="md:text-2xl lg:text-3xl font-cinzel md:text-start text-balance text-center text-xl font-bold text-black">
          <motion.span
            className="inline-block uppercase"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            {`${title}${
              selectedCountry && " " + selectedCountry.toUpperCase()
            }${selectedState && "-" + selectedState.toUpperCase()}`}
          </motion.span>
        </h1>
      <div className="w-full flex flex-col gap-10">
        {currentItems?.map((item, index: number) => (
          // <motion.div
          //   initial={{ opacity: 0, translateY: -150 }}
          //   whileInView={{ opacity: 1, translateY: 0 }}
          //   transition={{ duration: 0.4, delay: index * 0.15 }}
          //   viewport={{ once: true }}
          //   key={item.name}
          //   className="w-full lg:h-60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden shadow shadow-black/60"
          // >
          //   <div className="lg:w-[30%] w-full lg:h-full h-60 overflow-hidden">
          //     <Image
          //       src={getValidUrl(item.image ?? "")}
          //       alt={`image-${item?.name}`}
          //       width={300}
          //       height={300}
          //       className="w-full h-full object-cover"
          //     />
          //   </div>
          //   <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-3 py-2 px-5">
          //     <div className="w-full flex items-center justify-between">
          //       <h1 className="text-2xl font-semibold">{item?.name}</h1>
          //       <Button
          //         asChild
          //         size="sm"
          //         className="bg-mainColor hover:bg-mainColorSecondary text-black rounded"
          //       >
          //         <Link
          //           href={`/Influencers/${item?.id}`}
          //           className="md:text-sm font-medium text-xs"
          //         >
          //           View Profile
          //         </Link>
          //       </Button>
          //     </div>
          //     <p className="text-sm">{`${item?.state}, ${item?.country}`}</p>

          //     <p className="text-sm">{`${item?.speciality}`}</p>

          //     <div className="flex flex-col gap-1">
          //       <span className="text-xl">Introduction</span>
          //       <p className="text-sm line-clamp-3 lg:line-clamp-4">
          //         {item?.description}
          //       </p>
          //     </div>
          //   </div>
          // </motion.div>

          <Link href={`/Influencers/${item.id}`} key={item.id}>
            <motion.div
              initial={{ opacity: 0, translateY: -150 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative w-full cursor-pointer lg:h-60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-3 shadow shadow-black/30"
            >
              <div className="lg:w-[30%] relative w-full lg:h-full h-60 rounded-lg overflow-hidden">
                {currentPage === 1 && (
                  <div className="absolute h-full">
                    <Image
                      src={`/rankPngs/${index + 1}.png`}
                      alt="ranks logo"
                      // objectFit="contain"
                      className="object-cover object-left w-full h-full"
                      width={3182}
                      height={2000}
                    />
                  </div>
                )}

                <Image
                  src={item?.image}
                  alt={`travel image`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-2 md:p-1 px-3 pb-3">
                <h1 className="text-2xl line-clamp-1 font-semibold">
                  {item?.name}
                </h1>
                {/* <div className="absolute z-20 top-4 right-4 lg:p-2 p-1 rounded-full cursor-pointer border-slate-300 bg-white/60 backdrop-blur-lg border-2">
                  <RiHeart3Line className="text-slate-500 size-6" /> */}
                {/* Heart with Fill is <RiHeart3Fill /> */}
                {/* </div> */}

                <div>{item.speciality}</div>

                <div className="flex gap-1 items-center">
                  <TbMapPin className="text-slate-400 text-sm md:text-lg" />
                  <div className="text-sm md:text-lg text-slate-400 leading-none">
                    {item?.country}, {item?.state}
                  </div>
                </div>

                <p className="text-sm line-clamp-2">{item?.description}</p>

                <div className="flex mt-auto mb-1 w-full gap-2 justify-start">
                  <Button className="h-full xs:text-lg text-base flex bg-white text-mainColor border-mainColor border-[2px] rounded-md hover:bg-mainColor hover:text-white">
                    <span>Enquire now</span>
                    <TbPhoneCall size={20} className="stroke-2 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {data?.length > itemsPerPage && (
        <div className="mt-8 flex justify-center gap-4">
          <Button
            size={"icon"}
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0 });
            }}
            disabled={currentPage === 1}
            className="bg-mainColor hover:bg-mainColorSecondary text-black"
          >
            <ChevronLeft />
          </Button>
          <span className="self-center">
            Page {currentPage} of {Math.ceil(data?.length / itemsPerPage)}
          </span>
          <Button
            size={"icon"}
            onClick={() => {
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(data?.length / itemsPerPage))
              );
              window.scrollTo({ top: 0 });
            }}
            disabled={currentPage === Math.ceil(data?.length / itemsPerPage)}
            className="bg-mainColor hover:bg-mainColorSecondary text-black"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </main>
  );
}

export default ListDataInfluencer;
