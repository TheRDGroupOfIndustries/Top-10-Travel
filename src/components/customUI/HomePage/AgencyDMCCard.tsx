import { Card, CardContent } from "@/components/ui/card";
import { HomeApiResult } from "@/types/homeApiType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {motion} from "framer-motion";


function AgencyDMCCard({ data }: { data: HomeApiResult[0] }) {
  return (
    <motion.div 
    initial={{
      opacity: 0,
      x: -400,
    }}
    whileInView={{
      opacity: 1,
      x: 0
    }}
    transition={{
      duration: 1.1,
      delay: 0.8,
      ease: 'easeInOut'
    }}
    viewport={{once: false}}
    className="h-fit text-left my-5 md:my-10">
      <Card className="w-[80%] md:w-[70%] lg:w-[90%] m-auto border-none">
        <div className="max-h-fit md:my-2">
          <Image
            src={data.image!}
            height={400}
            width={300}
            alt={data.legalName}
            className="rounded-3xl w-[322px] h-[344px] m-auto object-cover shadow-[rgba(255,219,128,1)_-13px_-13px_1px_2px]"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-1">{data.legalName}</h2>
          <div className="flex items-center text-xs mb-2">
            <span className="text-yellow-500">
              {Array.from({ length: Math.round(data.rating) }).map(
                (_, ind) => "★"
              )}{" "}
              {data.reviews}
            </span>
          </div>
          <p className="text-gray-700 mb-4 w-auto text-sm">
            {data.methodology}
          </p>
          <Link href={`/companies/${data.legalName}`}>
            <button className="px-4 bg-white text-black border border-black rounded-full  hover:bg-gray-300">
              More
            </button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AgencyDMCCard;
