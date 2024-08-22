"use client";

import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { getValidUrl } from "@/lib/utils";
import { TbMapPin, TbPhoneCall } from "react-icons/tb";
import { RiHeart3Line } from "react-icons/ri";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetIconByTag } from "@/components/reusable/TagIcons";
import { useRouter } from "next/navigation";

type Data = {
  id: string;
  reviews: number;
  name: string;
  images: string[] | null;
  country: string;
  city: string;
  rating: number;
  methodology: string | null;
  services?: string[];
  specialization?: string[];
  tags?: string[];
}[];

function ListData({
  role,
  data,
}: {
  role: "Agency" | "Hotels" | "DMC";
  data: Data;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const router = useRouter();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  let hotelData: Data = [];

  if (role === "Hotels") {
    data.map((item) => {
      const array = item?.services?.concat(item?.specialization!);
      const newTags = new Set(array);
      // @ts-ignore
      hotelData?.push({ ...item, tags: [...newTags] });
    });
  }

  return (
    <main className="w-full mt-14 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="w-full flex flex-col gap-10">
        {role !== "Hotels" &&
          currentItems?.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, translateY: -150 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              onClick={() => {
                router.push(`/${role}/${item.id}`);
              }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative w-full cursor-pointer lg:h-60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 shadow shadow-black/30"
            >
              <div className="lg:w-[30%] w-full lg:h-full h-60 rounded-lg overflow-hidden">
                <Image
                  src={item?.images?.[0] || "/stockPhoto.jpg"}
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
                <div className="absolute z-20 top-4 right-4 lg:p-2 p-1 rounded-full cursor-pointer border-slate-300 bg-white/60 border-2">
                  <RiHeart3Line className="text-slate-500 size-6" />
                  {/* Heart with Fill is <RiHeart3Fill /> */}
                </div>

                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <StarRating
                      maxRating={5}
                      color="#FCAE1D"
                      readOnly={true}
                      showNumber={false}
                      defaultRating={item?.rating}
                      size={16}
                    />
                    <div className="text-sm p-[2px] text-white rounded-lg bg-[#FFA500]">
                      {item?.rating}
                    </div>
                  </div>
                  <span className="text-slate-600 text-[16px]">
                    <span className="font-bold">{item.reviews}</span>
                    &nbsp;reviews
                  </span>
                </div>

                <div className="flex gap-1 items-center">
                  <TbMapPin className="text-slate-400 text-sm md:text-lg" />
                  <div className="text-sm md:text-lg text-slate-400 leading-none">
                    {item?.country}, {item?.city}
                  </div>
                </div>

                <p className="text-sm line-clamp-3">{item?.methodology}</p>

                <Button className="text-xl group bg-[#FFEF9E] text-colorAll hover:bg-colorAll hover:text-[#FFEF9E]">
                  <span>Call Us</span>
                  <TbPhoneCall size={20} className="stroke-2 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}

        {role === "Hotels" &&
          hotelData?.map((item, i) => (
            <div
              key={item.name}
              onClick={() => {
                router.push(`/${role}/${item.id}`);
              }}
              className="relative w-full cursor-pointer lg:h-60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 shadow shadow-black/30"
            >
              <div className="lg:w-[30%] w-full lg:h-full h-60 rounded-lg overflow-hidden">
                <Image
                  src={item?.images?.[0] || "/stockPhoto.jpg"}
                  alt={`image-${item.name}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-3 p-1">
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">{item?.name}</h1>
                </div>
                <div className="flex gap-1 items-center">
                  <TbMapPin className="text-slate-400 text-sm md:text-lg" />
                  <div className="text-sm md:text-lg text-slate-400 leading-none">
                    {item?.country}, {item?.city}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <StarRating
                      maxRating={5}
                      color="#FCAE1D"
                      readOnly={true}
                      showNumber={false}
                      defaultRating={item?.rating}
                      size={16}
                    />
                    <div className="text-sm p-[2px] text-white rounded-lg bg-[#FFA500]">
                      {item?.rating}
                    </div>
                  </div>
                  <span className="text-slate-600 text-[16px]">
                    <span className="font-bold">{item.reviews}</span>
                    &nbsp;reviews
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {item?.tags?.map((tag, i) =>
                    i <= 3 ? (
                      <div
                        className="lg:text-sm text-xs flex lg:font-semibold uppercase items-center gap-1 border-slate-400 border-[1px] bg-slate-100 rounded-lg px-2 lg:py-1 py-0.5"
                        key={tag}
                      >
                        <GetIconByTag
                          tag={tag}
                          className="lg:text-sm text-xs"
                        />
                        {tag}
                      </div>
                    ) : null
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {/* <span className="text-xl">Methodology</span> */}
                  <p className="text-sm line-clamp-3">{item?.methodology}</p>
                </div>
              </div>
            </div>
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

export default ListData;
