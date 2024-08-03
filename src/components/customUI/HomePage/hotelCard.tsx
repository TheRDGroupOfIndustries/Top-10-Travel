import { HomeApiResult } from "@/types/homeApiType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HotelCard({ data }: { data: HomeApiResult[0] }) {
  return (
    <div>
      <div className="p-1 relative">
        <Image
          src={data.image!}
          height={400}
          width={300}
          alt="Travel agency"
          className="w-full h-[24rem] object-cover rounded-xl brightness-75"
        />
        <div className="absolute bottom-4 p-4 w-full text-white">
          <h2 className="text-3xl font-bold w-auto">{data.legalName}</h2>
          <span className="text-white text-xl">
            {Array.from({ length: Math.round(data.rating) }).map(
              (_, ind) => "★"
            )}{" "}
            {data.reviews}
          </span>
        </div>
        <Link href={`/companies/${data.legalName}`}>
        <button className="px-4 py-2 bottom-4 right-4 absolute backdrop-blur-md rounded-full text-white">
          View more &rarr;
        </button>
        </Link>
      </div>
    </div>
  );
}

export default HotelCard;
