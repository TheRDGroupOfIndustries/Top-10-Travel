"use client";

import EnquireDialog from "@/components/company/EnquireDialogwButton/EnquireDialog";
import StarRating from "@/components/reusable/StarRating";
import { GetIconByTag } from "@/components/reusable/TagIcons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbMapPin, TbPhoneCall } from "react-icons/tb";

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
  selectedCountry,
  selectedState,
  role,
  data,
}: {
  role: "Agency" | "Hotels" | "DMC";
  selectedCountry: string;
  selectedState: string;
  data: Data;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  let hotelData: Data = [];

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry, selectedState]);

  if (role === "Hotels") {
    currentItems.map((item) => {
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
              initial={{ opacity: 0, translateY: -100 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative w-full lg:h-60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 shadow shadow-black/30"
            >
              <div className="lg:w-[30%] relative w-full lg:h-full h-60 rounded-lg overflow-hidden">
                {currentPage === 1 && (
                  <div className="absolute h-full">
                    <Image
                      src={`/rankPngs/${i + 1}.png`}
                      alt="ranks logo"
                      // objectFit="contain"
                      className="object-cover object-left w-full h-full"
                      width={3182}
                      height={2000}
                    />
                  </div>
                )}

                <Image
                  src={item?.images?.[0] || "/stockPhoto.jpg"}
                  alt={`travel image`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-2 md:p-1 px-3 pb-8">
                <h1 className="text-2xl line-clamp-2 font-semibold">
                  {item?.name}
                </h1>

                {/* <div className="flex gap-3">
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
                      {item?.rating?.toFixed(1)}
                    </div>
                  </div>
                  <span className="text-slate-600 text-[16px]">
                    <span className="font-bold">{item.reviews}</span>
                    &nbsp;reviews
                  </span>
                </div> */}

                <div className="flex gap-1 items-center">
                  <TbMapPin className="text-slate-400 text-sm md:text-lg" />
                  <div className="text-sm md:text-lg text-slate-400 leading-none">
                    {item?.country}, {item?.city}
                  </div>
                </div>

                <p className="text-sm lg:line-clamp-3 line-clamp-2">
                  {item?.methodology}
                </p>

                <div className="flex mt-auto mb-1 w-full gap-2 justify-start">
                  <EnquireDialog
                    images={item?.images || [""]}
                    name={item?.name}
                    type="Listing"
                    info={
                      role === "Agency"
                        ? { type: "Agency", agencyId: item.id }
                        : { type: "Dmc", dmcId: item.id }
                    }
                  />
                  <Link href={`/${role}/${item.id}`}>
                    <Button className="h-full xs:text-lg text-base flex bg-white text-mainColor border-mainColor border-[2px] rounded-md hover:bg-mainColor hover:text-white">
                      View More
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

        {role === "Hotels" &&
          hotelData?.map((item, i) => (
            <Link href={`/${role}/${item.id}`} key={item.id}>
              <motion.div
                initial={{ opacity: 0, translateY: -100 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative w-full cursor-pointer lg:h-60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 shadow shadow-black/30"
              >
                <div className="lg:w-[30%] relative w-full lg:h-full h-60 rounded-lg overflow-hidden">
                  {currentPage === 1 && (
                    <div className="absolute h-full">
                      <Image
                        src={`/rankPngs/${i + 1}.png`}
                        alt="ranks logo"
                        // objectFit="contain"
                        className="object-cover object-left w-full h-full"
                        width={3182}
                        height={2000}
                      />
                    </div>
                  )}
                  <Image
                    src={item?.images?.[0] || "/stockPhoto.jpg"}
                    alt={`image-${item.name}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-2 p-1">
                  <h1 className="text-2xl line-clamp-1 font-semibold">
                    {item?.name}
                  </h1>
                  <div className="flex gap-1 items-center">
                    <TbMapPin className="text-slate-400 text-sm md:text-lg" />
                    <div className="text-sm md:text-lg text-slate-400 leading-none">
                      {item?.country}, {item?.city}
                    </div>
                  </div>

                  {/* <div className="flex gap-3">
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
                        {item?.rating?.toFixed(1)}
                      </div>
                    </div>
                    <span className="text-slate-600 text-[16px]">
                      <span className="font-bold">{item.reviews}</span>
                      &nbsp;reviews
                    </span>
                  </div> */}

                  <div className="flex flex-wrap md:hidden lg:flex items-center gap-2">
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

                  <div className="flex-wrap gap-2 items-center md:flex hidden lg:hidden">
                    {item?.tags?.map((tag, i) =>
                      i <= 1 ? (
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
                    <p className="text-sm line-clamp-2">{item?.methodology}</p>
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

export default ListData;
