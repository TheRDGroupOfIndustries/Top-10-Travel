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

type Data = {
  id: string;
  reviews: number;
  legalName: string;
  image: string | null;
  country: string;
  city: string;
  rating: number;
  methodology: string | null;
}[];
function ListData({}: // role,
// data,
// isLoading,
{
  // role: "AGENCY" | "HOTEL" | "DMC" | "Influencers";
  // data: Data;
  // isLoading: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="w-full mt-14 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="w-full flex flex-col gap-10">
        {/* {currentItems?.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, translateY: -150 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            viewport={{ once: true }}
            key={item.legalName}
            className="w-full lg:h-60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 shadow shadow-black/60"
          >
            <div className="lg:w-[30%] w-full lg:h-full h-60 rounded-lg overflow-hidden">
              <Image
                src={getValidUrl(item.image ?? "")}
                alt={`image-${item.legalName}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-3 p-1">
              <div className="w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{item?.legalName}</h1>
                <Button
                  asChild
                  size={"sm"}
                  className="bg-colorAll hover:bg-[#fcaf1ed0] text-black rounded"
                >
                  <Link
                    href={`/companies/${item.id}`}
                    className="md:text-sm font-medium text-xs"
                  >
                    View More
                  </Link>
                </Button>
              </div>
              <p className="text-sm">{`${item?.city}, ${item?.country}`}</p>
              <div className="flex gap-2">
                <StarRating
                  maxRating={5}
                  color="#734E03"
                  readOnly={true}
                  defaultRating={item?.rating}
                  size={14}
                />
                <span className="text-sm">{`${item?.reviews} reviews`}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl">Methodology</span>
                <p className="text-sm line-clamp-3 lg:line-clamp-4">
                  {item?.methodology}
                </p>
              </div>
            </div>
          </motion.div>
        ))} */}

        <motion.div
          initial={{ opacity: 0, translateY: -150 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          // transition={{ duration: 0.4, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="w-full lg:h-60 my-20 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 shadow shadow-black/30"
        >
          <div className="lg:w-[30%] w-full lg:h-full h-60 rounded-lg overflow-hidden">
            <Image
              src={"/right-herosec-img.jpeg"}
              alt={`travel image`}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-3 p-1">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Travel Agency</h1>
              <div className="lg:p-2 p-1 rounded-full cursor-pointer border-slate-300 border-2">
                <RiHeart3Line className="text-slate-500 size-6" />
                {/* Heart with Fill is <RiHeart3Fill /> */}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex gap-1 items-center">
                <StarRating
                  maxRating={5}
                  color="#FCAE1D"
                  readOnly={true}
                  showNumber={false}
                  defaultRating={3}
                  size={14}
                />
                <div className="text-xs p-[2px] text-white rounded-lg bg-[#FFA500]">
                  3.4
                </div>
              </div>
              <span className="text-slate-600 text-sm">
                <span className="font-bold">80</span>&nbsp;reviews
              </span>
            </div>

            <div className="flex gap-1 items-center">
              <TbMapPin className="text-slate-400" />
              <div className="text-lg text-slate-400 leading-none">
                India, Delhi
              </div>
            </div>

            <p className="text-sm line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              voluptatibus temporibus labore laboriosam et deserunt officiis
              cupiditate? Qui, quibusdam molestias. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sed vel ut porro. Tempora,
              doloremque amet. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nobis a nam aliquid quam?
            </p>

            <Button className="text-xl group bg-[#FFEF9E] text-colorAll hover:bg-colorAll hover:text-[#FFEF9E]">
              <span>Call Us</span>
              <TbPhoneCall size={20} className="stroke-2 ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
      {/* {data?.length > itemsPerPage && (
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
      )} */}
    </main>
  );
}

export default ListData;
