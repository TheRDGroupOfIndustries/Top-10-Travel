"use client";

import SkeletonListData from "@/components/reusable/SkeletonListData";
import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import type { InfluencerData } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  isLoading,
}: {
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
        {currentItems?.map((item, index: number) => (
          <div
            key={item.name}
            className="w-full lg:h-72 rounded-lg flex flex-col md:flex-row items-center justify-between gap-5 shadow shadow-black/10"
          >
            <div className="lg:w-[30%] w-full lg:h-full h-60 rounded-lg overflow-hidden">
              <Image
                src={item?.image!}
                alt={`image-${item?.name}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-[70%] w-full h-full rounded-lg overflow-hidden flex flex-col items-start justify-start gap-3 p-1">
              <div className="w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{item?.name}</h1>
              </div>
              <p className="text-sm">{`${item?.state}, ${item?.country}`}</p>

              <p className="text-sm">{`${item?.speciality}`}</p>

              <div className="flex flex-col gap-1">
                <span className="text-xl">Introduction</span>
                <p className="text-sm line-clamp-4">{item?.description}</p>
              </div>
              <Button
                asChild
                className="bg-[#FFDB80] hover:bg-[#ffdb80d0] text-black rounded-xl px-5"
              >
                <Link
                  href={`/Influencers/${item?.id}`}
                  className="md:text-sm font-medium text-xs"
                >
                  View Profile
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {data?.length > itemsPerPage && (
        <div className="mt-8 flex justify-center gap-4">
          <Button
            size={"icon"}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-[#FFDB80] hover:bg-[#ffdb80d0] text-black"
          >
            <ChevronLeft />
          </Button>
          <span className="self-center">
            Page {currentPage} of {Math.ceil(data?.length / itemsPerPage)}
          </span>
          <Button
            size={"icon"}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(data?.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(data?.length / itemsPerPage)}
            className="bg-[#FFDB80] hover:bg-[#ffdb80d0] text-black"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </main>
  );
}

export default ListDataInfluencer;
