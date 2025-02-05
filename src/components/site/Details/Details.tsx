"use client";
import EnquireDialog from "@/components/company/EnquireDialogwButton/EnquireDialog";
import { getIconFromName } from "@/components/reusable/Icons";
import PhoneCallButton from "@/components/reusable/PhoneCallButton";
import ShareButton from "@/components/reusable/shareButton";
import StarRating from "@/components/reusable/StarRating";
import { GetIconByTag } from "@/components/reusable/TagIcons";
import { getValidUrl } from "@/lib/utils";
import type { PastProject, SocialMediaLinks } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { SiTrustpilot } from "react-icons/si";
import { TbMapPin } from "react-icons/tb";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import AnimatedImage from "./AnimatedImage";
import PastProjects from "./PastProjects";
import ReviewSSR from "./ReviewSSR";

type CompanyType = {
  reviews: number;
  id: string;
  name: string;
  country: string;
  rating: number;
  methodology: string | null;
  city: string;
  description: string | null;
  address: string;
  contactPhoneNumber: string;
  images: string[];
  specializedTravelTypes?: string[];
  internationalCertifications?: string[];
  primaryServices?: string[];
  specialization?: string[];
  coreServices?: string[];
  services?: string[];
  socialMediaLinks: SocialMediaLinks[];
  pastProjects?: PastProject[];
};

const Details = ({
  data,
  info,
}: {
  data: CompanyType;
  info:
    | { type: "Agency"; agencyId: string; agencyName: string }
    | { type: "Dmc"; dmcId: string; dmcName: string }
    | { type: "Hotel"; hotelId: string; hotelName: string };
}) => {
  const socialPlatforms = [
    "facebook",
    "instagram",
    "linkedin",
    "twitter",
    "youtube",
  ];

  let preTags;
  if (info.type === "Dmc") {
    preTags = data?.specialization?.concat(data?.coreServices!);
  } else if (info.type === "Agency") {
    preTags = data?.specializedTravelTypes?.concat(data?.primaryServices!)!;
  } else if (info.type === "Hotel") {
    preTags = data?.services?.concat(data?.specialization!);
  }

  const setOfTags = new Set(preTags);
  // @ts-ignore
  const TAGS: string[] = [...setOfTags];



  return (
    // <ClientSideDetails data={data} info={info} />

    <div className="mb-10 mt-20 text-slate-900">
      <div className="px-2 md:px-3 lg:px-6 xl:px-8">
        <div className="w-full flex xl:gap-12 gap-6 pb-16 border-b-black border-b-[1px]">
          <div className="w-full flex flex-col gap-10 flex-1">
            <DetailsPageImages data={data} />
            <div className="rounded-lg flex lg:hidden flex-col gap-4 py-10 sm:px-8 px-4 shadow shadow-black/50">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl xs:text-2xl sm:text-[32px] text-pretty font-bold leading-snug xl:leading-6">
                    {data?.name}
                  </h3>
                  <div className="text-sm flex items-center leading-4 font-medium">
                    <TbMapPin className="text-slate-400 mr-1 text-sm md:text-lg" />
                    {`${data?.city}, ${data?.country}.`}
                  </div>
                  <p className="text-sm leading-4 font-medium">
                    {`${data?.address}`}
                  </p>
                </div>

                {/* <StarRating
                  color="#FCAE1D"
                  maxRating={5}
                  readOnly={true}
                  size={18}
                  showNumber={true}
                  defaultRating={data?.rating}
                /> */}
              </div>

              <div className="flex w-full">
                <p className="text-base leading-[22px] text-justify font-medium">
                  {data?.methodology}
                </p>
              </div>

              <div className="w-full flex flex-wrap items-center my-2 justify-between gap-1">
                {data?.socialMediaLinks?.map((link, index) =>
                  socialPlatforms?.map((platform) => {
                    const url = link[platform as keyof SocialMediaLinks];
                    if (url) {
                      return (
                        <div
                          key={`${platform}-${index}`}
                          className="hover:bg-white"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center gap-2"
                          >
                            {getIconFromName(url, "text-3xl")}
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })
                )}
              </div>

              <div className="flex gap-2 w-full flex-grow">
                {/* {info?.type !== "Hotel" && (
                  <PhoneCallButton phoneNumber={data?.contactPhoneNumber} />
                )} */}
                <EnquireDialog
                  images={data?.images}
                  name={data?.name}
                  info={info}
                />
                <ShareButton />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:px-0 px-2">
              <div className="flex flex-row flex-wrap gap-2">
                {TAGS?.map((tag: string) => (
                  <div
                    key={tag}
                    className="flex items-center md:gap-2 gap-1.5 border-[1px] border-slate-200 md:py-3 font-light md:px-5 px-4 py-2.5 md:text-base text-sm rounded-lg"
                  >
                    <GetIconByTag tag={tag} className="md:text-3xl text-2xl" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

              <div className="text-justify mb-2 text-base leading-6 font-medium">
                {data?.description}
              </div>

              {data.internationalCertifications && (
                <div className="select-none">
                  <div className="flex gap-1 mb-1.5 items-center">
                    <div>
                      <VscWorkspaceTrusted className="text-mainColor size-5" />
                    </div>

                    <div className="text-slate-800 text-lg">
                      Certifications:
                    </div>
                  </div>

                  {data.internationalCertifications.map((cer, i) => (
                    <div
                      key={i}
                      className="flex ml-3 select-none gap-2.5 items-center mb-1"
                    >
                      <div className="relative h-8 w-8 flex-shrink-0">
                        <AnimatedImage
                          src={
                            cer ===
                            "IATA (International Air Transport Association)"
                              ? "/certifications/IATA.svg"
                              : cer ===
                                "UFTAA (United Federation of Travel Agents' Associations)"
                              ? "/certifications/UFTAA.jpg"
                              : cer ===
                                "ASTA (American Society of Travel Advisors)"
                              ? "/certifications/ASTA.png"
                              : "/certifications/certified.webp"
                          }
                          objectFit="contain"
                          fill
                          alt={`International Certification ${i}`}
                          className="rounded-lg object-contain h-8 w-8 flex-shrink-0"
                        />
                      </div>
                      <div className="text-sm font-medium text-slate-700">
                        {cer}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* {data?.pastProjects && (
                <PastProjects pastProjects={data.pastProjects} />
              )} */}
            </div>

            <div className="lg:hidden">
              {info?.type !== "Hotel" && (
                <ReviewSSR name={data?.name} info={info} />
              )}
            </div>
          </div>

          <div className="flex-1 lg:flex hidden flex-col gap-5 max-w-[509px]">
            <div className="rounded-lg lg:flex hidden flex-col xl:gap-10 lg:gap-6 xl:py-16 lg:py-10 xl:px-8 lg:px-4 shadow shadow-black/50">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[32px] font-bold leading-snug">
                    {data?.name}
                  </h3>
                  <div className="text-sm flex items-center leading-4 font-medium">
                    <TbMapPin className="text-slate-400 mr-1 text-sm md:text-lg" />
                    {`${data?.city}, ${data?.country}.`}
                  </div>
                  <p className="text-sm leading-4 font-medium">
                    {`${data?.address}`}
                  </p>
                </div>

                {/* <StarRating
                  color="#FCAE1D"
                  maxRating={5}
                  readOnly={true}
                  size={18}
                  showNumber={true}
                  defaultRating={data?.rating}
                /> */}
              </div>

              <div className="flex w-full">
                <p className="text-base leading-[22px] text-justify font-medium">
                  {data?.methodology}
                </p>
              </div>

              <div className="w-full flex flex-wrap my-2 items-center justify-between gap-1">
                {data?.socialMediaLinks?.map((link, index) =>
                  socialPlatforms.map((platform) => {
                    const url = link[platform as keyof SocialMediaLinks];
                    if (url) {
                      return (
                        <div
                          key={`${platform}-${index}`}
                          className="hover:bg-white"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center gap-2"
                          >
                            {getIconFromName(url, "text-3xl")}
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })
                )}
              </div>

              <div className="flex gap-2 w-full flex-grow">
                {/* {info?.type !== "Hotel" && (
                  <PhoneCallButton phoneNumber={data?.contactPhoneNumber} />
                )} */}
                <EnquireDialog
                  images={data?.images}
                  name={data?.name}
                  info={info}
                />
                <ShareButton />
              </div>
            </div>

            {info?.type !== "Hotel" && (
              <ReviewSSR name={data?.name} info={info} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

function DetailsPageImages({ data }: { data: CompanyType }) {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div className="grid gap-4">
      {/* Main Image */}
      <div className="relative rounded-lg w-full h-64 md:h-96 lg:h-[450px]">
        <AnimatedImage
          src={getValidUrl(data?.images[imageIndex] ?? "")}
          alt="main image"
          fill
          className="rounded-lg w-full h-full object-cover"
        />
      </div>

      {/* Grid of Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-4 sm:gap-4 gap-2">
        {data?.images?.slice(1).map(
          (url, ind) =>
            ind < 4 && (
              <div
                key={url + ind}
                className="relative rounded-lg w-full h-32 sm:h-40"
              >
                <AnimatedImage
                  src={getValidUrl(url)}
                  alt={`gallery-image-${ind + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  onClick={() => {
                    setImageIndex(ind + 1);
                  }}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
