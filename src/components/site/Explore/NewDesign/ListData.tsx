"use client";

import SkeletonListData from "@/components/reusable/SkeletonListData";
import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { getValidUrl } from "@/lib/utils";

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
function ListData({
  role,
  data,
  isLoading,
}: {
  role: "AGENCY" | "HOTEL" | "DMC" | "Influencers";
  data: Data;
  isLoading: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="w-full mt-14 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="w-full flex flex-col gap-10">
        {currentItems?.map((item, i) => (
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
