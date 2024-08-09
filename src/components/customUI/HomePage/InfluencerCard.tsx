import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getValidUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaYoutube, FaFacebook, FaLink } from "react-icons/fa6";

const getIconFromName = (str: string) => {
  const host = str.toLowerCase();
  if (host.includes("instagram"))
    return <FaInstagram className="text-xl md:text-2xl text-pink-600" />;
  else if (host.includes("youtube"))
    return <FaYoutube className="text-xl md:text-2xl text-red-600" />;
  else if (host.includes("facebook"))
    return <FaFacebook className="text-xl md:text-2xl text-blue-600" />;
  else return <FaLink className="text-xl md:text-2xl text-gray-600" />;
};

function InfluencerCard({ data }: { data: any }) {
  return (
    <Card className="w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-lg">
      <div className="relative h-52">
        <Image
          layout="fill"
          objectFit="cover"
          alt={`${data.name} - Influencer`}
          src={getValidUrl(data.image)}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <h2 className="absolute bottom-4 left-4 text-xl md:text-2xl font-bold text-white">
          {data.name}
        </h2>
      </div>
      <CardContent className="p-4">
        <p className="text-gray-700 mb-4 text-sm md:text-base text-left line-clamp-3">
          {data.description}
        </p>
        <p className="text-gray-500 text-sm md:text-base text-left font-semibold mb-4">
          {data.speciality}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {data.socialLinks.map((link: string) => {
              try {
                const url = new URL(link);
                const name = url.hostname;
                return (
                  <Link
                    key={url.href}
                    href={url.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    {getIconFromName(name)}
                  </Link>
                );
              } catch (error) {
                return null;
              }
            })}
          </div>
          <Link
            href={`/Influencers/${data.id}`}
            className="px-4 py-1 bg-white text-black border border-black/50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm  font-medium"
          >
            More
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfluencerCard;
