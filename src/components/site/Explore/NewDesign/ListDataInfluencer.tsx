"use client";

import SkeletonListData from "@/components/reusable/SkeletonListData";
import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import type { InfluencerData } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { TbMapPin, TbPhoneCall } from "react-icons/tb";
import { RiHeart3Line } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Data = {
  image: string;
  id: string;
  name: string;
  country: string;
  state: string;
  description: string;
  speciality: string;
}[];

function ListDataInfluencer({
  data,
  selectedCountry,
  selectedState,
}: {
  data: Data;
  selectedCountry: string;
  selectedState: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry, selectedState]);

  return (
    <main className="w-full mt-14 px-2 md:px-3 lg:px-6 xl:px-8">
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
          //         className="bg-colorAll hover:bg-[#fcaf1ed0] text-black rounded"
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
              <div className="lg:w-[30%] w-full lg:h-full h-60 rounded-lg overflow-hidden">
                <Image
                  src={item?.image}
                  alt={`travel image`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-3 md:p-1 px-3 pb-3">
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">{item?.name}</h1>
                </div>
                <div className="absolute z-20 top-4 right-4 lg:p-2 p-1 rounded-full cursor-pointer border-slate-300 bg-white/60 backdrop-blur-lg border-2">
                  <RiHeart3Line className="text-slate-500 size-6" />
                  {/* Heart with Fill is <RiHeart3Fill /> */}
                </div>

                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    {item.speciality}
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <TbMapPin className="text-slate-400 text-sm md:text-lg" />
                  <div className="text-sm md:text-lg text-slate-400 leading-none">
                    {item?.country}, {item?.state}
                  </div>
                </div>

                <p className="text-sm line-clamp-3">{item?.description}</p>

                <Button className="text-xl group bg-[#FFEF9E] text-colorAll hover:bg-colorAll hover:text-[#FFEF9E]">
                  <span>Call Us</span>
                  <TbPhoneCall size={20} className="stroke-2 ml-1" />
                </Button>
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
            className="bg-colorAll hover:bg-[#fcaf1ed0] text-black"
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
            className="bg-colorAll hover:bg-[#fcaf1ed0] text-black"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </main>
  );
}

export default ListDataInfluencer;
