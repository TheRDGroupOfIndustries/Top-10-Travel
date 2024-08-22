import EnquireDialog from "@/components/company/EnquireDialogwButton/EnquireDialog";
import { getIconFromName } from "@/components/reusable/Icons";
import PhoneCallButton from "@/components/reusable/PhoneCallButton";
import ShareButton from "@/components/reusable/shareButton";
import StarRating from "@/components/reusable/StarRating";
import { GetIconByTag } from "@/components/reusable/TagIcons";
import { Button } from "@/components/ui/button";
import { getValidUrl } from "@/lib/utils";
import type { PastProject, SocialMediaLinks } from "@prisma/client";
import Link from "next/link";
import { TbMapPin } from "react-icons/tb";
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
  images: string[];
  specializedTravelTypes?: string[];
  primaryServices?: string[];
  specialization?: string[];
  coreServices?: string[];
  services?: string[];
  socialMediaLinks: SocialMediaLinks[];
  promotionalVideoUpload?: string;
  pastProjects?: PastProject[];
};

const Details = ({
  data,
  info,
}: {
  data: CompanyType;
  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };
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
    <div className="mb-10 mt-20">
      {/* <HeroHeading title={data?.name} className="uppercase" /> */}
      <div className="px-2 md:px-3 lg:px-6 xl:px-8">
        <div className="w-full flex xl:gap-12 gap-6 pb-16 border-b-black border-b-[1px]">
          <div className="w-full flex flex-col gap-10 flex-1">
            <div className="grid gap-4">
              {/* Main Image */}
              <div className="relative rounded-lg w-full h-64 md:h-96 lg:h-[450px]">
                {data.promotionalVideoUpload ? (
                  <video
                    src={data.promotionalVideoUpload}
                    className="w-full h-full border rounded-lg"
                    controls
                  ></video>
                ) : (
                  <AnimatedImage
                    src={getValidUrl(data?.images[0] ?? "")}
                    alt="main image"
                    fill
                    className="rounded-lg object-cover"
                  />
                )}
              </div>

              {/* Grid of Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-4 sm:gap-4 gap-2">
                {data.images.slice(1).map(
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
                        />
                      </div>
                    )
                )}
              </div>
            </div>

            {/* <div className="w-full flex flex-wrap items-center justify-between gap-1">
              {data.socialMediaLinks.map((link, index) =>
                socialPlatforms.map((platform) => {
                  const url = link[platform as keyof SocialMediaLinks];
                  if (url) {
                    return (
                      <Button
                        key={`${platform}-${index}`}
                        className="rounded-full"
                        variant="outline"
                      >
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center gap-2"
                        >
                          {getIconFromName(url)}
                        </Link>
                      </Button>
                    );
                  }
                  return null;
                })
              )}
            </div> */}

            <div className="rounded-md flex lg:hidden flex-col gap-4 py-10 sm:px-8 px-4 shadow shadow-black/50">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[32px] font-bold leading-tight xl:leading-6">
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

                <StarRating
                  color="#734E03"
                  maxRating={5}
                  readOnly={true}
                  size={18}
                  showNumber={true}
                  defaultRating={data?.rating}
                />
              </div>

              <div className="flex w-full">
                <p className="text-base leading-[22px] text-justify font-medium">
                  {data?.methodology}
                </p>
              </div>

              <div className="w-full flex flex-wrap items-center justify-between gap-1">
                {data.socialMediaLinks.map((link, index) =>
                  socialPlatforms.map((platform) => {
                    const url = link[platform as keyof SocialMediaLinks];
                    if (url) {
                      return (
                        <Button
                          key={`${platform}-${index}`}
                          className="rounded-full hover:bg-white border-black"
                          variant="outline"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center gap-2"
                          >
                            {getIconFromName(url)}
                          </Link>
                        </Button>
                      );
                    }
                    return null;
                  })
                )}
              </div>

              <div className="flex gap-1 py-4 w-full flex-grow">
                <PhoneCallButton phoneNumber="1234567890" />
                <EnquireDialog
                  images={data?.images}
                  name={data?.name}
                  className="flex-1 border-black border-[1px] py-3 rounded-full text-xl leading-6 font-medium"
                  info={info}
                />
                <ShareButton />
              </div>
            </div>

            {/* {data?.companyData?.socialLinks.map((link) => (
              <div
                key={`banner-${link}`}
                className="h-[250px] cursor-pointer lg:hidden rounded-2xl overflow-hidden relative"
              >
                <Link
                  href={link}
                  target="_blank"
                  className="w-full h-full flex items-center gap-2"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    layout="fill"
                    className="object-cover"
                    alt="Hotel room image"
                  />
                  <div className="absolute inset-0 bg-black/80 opacity-50"></div>
                  <div className="w-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[47px]">
                    {getIconFromName(link, false, "w-full h-full text-white")}
                  </div>
                </Link>
              </div>
            ))} */}

            <div className="flex flex-col gap-4 sm:px-0 px-2">
              <div className="flex flex-row flex-wrap gap-1">
                {TAGS.map((tag: string) => (
                  <div
                    key={tag}
                    className="bg-slate-100 flex gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full"
                  >
                    <GetIconByTag tag={tag} />
                    <span>{tag}</span>
                  </div>
                ))}

                {/* {info.type === "Agency" && (
                  <>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <MdOutlineCardTravel />
                      <span>Travel Planning</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <FaPeopleGroup />
                      <span>Consulting</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <MdAttachMoney />
                      <span>Luxury</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <GiMountainRoad />
                      <span>Adventure</span>
                    </div>
                  </>
                )}
                {info.type === "Dmc" && (
                  <>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <MdEventAvailable />
                      <span>Event Management</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <FaPeopleGroup />
                      <span>Tour Packages</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <MdOutlineCardTravel />
                      <span>Corporate Events</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <GiSunbeams />
                      <span>Cultural Tours</span>
                    </div>
                  </>
                )}
                {info.type === "Hotel" && (
                  <>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <MdAttachMoney />
                      <span>Luxury Rooms</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <PiHairDryerBold />
                      <span>Spa Services</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <MdRoomService />
                      <span>Room Service</span>
                    </div>
                    <div className="bg-slate-100 flex items-center gap-1 border-[2px] border-slate-400 font-semibold uppercase px-2 py-1.5 md:text-base text-sm rounded-full">
                      <MdEventAvailable />
                      <span>Event Hosting</span>
                    </div>
                  </>
                )} */}
              </div>

              <div className="text-justify text-base leading-6 font-medium">
                {data?.description}
              </div>
              {data.pastProjects && (
                <PastProjects pastProjects={data.pastProjects} />
              )}
            </div>

            <div className="lg:hidden">
              <ReviewSSR name={data?.name} info={info} />
            </div>
          </div>

          <div className="flex-1 lg:flex hidden flex-col gap-5 max-w-[509px]">
            <div className="rounded-md lg:flex hidden flex-col xl:gap-10 lg:gap-6 xl:py-16 lg:py-10 xl:px-8 lg:px-4 shadow shadow-black/50">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[32px] font-bold leading-tight xl:leading-6">
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

                <StarRating
                  color="#734E03"
                  maxRating={5}
                  readOnly={true}
                  size={18}
                  showNumber={true}
                  defaultRating={data?.rating}
                />
              </div>

              <div className="flex w-full">
                <p className="text-base leading-[22px] text-justify font-medium">
                  {data.methodology}
                </p>
              </div>

              <div className="w-full flex flex-wrap items-center justify-between gap-1">
                {data.socialMediaLinks.map((link, index) =>
                  socialPlatforms.map((platform) => {
                    const url = link[platform as keyof SocialMediaLinks];
                    if (url) {
                      return (
                        <Button
                          key={`${platform}-${index}`}
                          className="rounded-full hover:bg-white border-black"
                          variant="outline"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center gap-2"
                          >
                            {getIconFromName(url)}
                          </Link>
                        </Button>
                      );
                    }
                    return null;
                  })
                )}
              </div>

              <div className="flex gap-1 py-4 w-full flex-grow">
                <PhoneCallButton phoneNumber="1234567890" />
                <EnquireDialog
                  images={data?.images}
                  name={data?.name}
                  className="flex-1 border-black border-[1px] py-3 rounded-full text-xl leading-6 font-medium"
                  info={info}
                />
                <ShareButton />
              </div>
            </div>

            <ReviewSSR name={data?.name} info={info} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
