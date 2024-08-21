import EnquireDialog from "@/components/company/EnquireDialogwButton/EnquireDialog";
import HeroHeading from "@/components/reusable/HeroHeading";
import ShareButton from "@/components/reusable/shareButton";
import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import { getIconFromName } from "@/components/reusable/Icons";
import { getValidUrl } from "@/lib/utils";
import Link from "next/link";
import AnimatedImage from "./AnimatedImage";
import PackagesCarousel from "./PackagesCarousel";
import ReviewSSR from "./ReviewSSR";
import type { SocialMediaLinks } from "@prisma/client";

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
  socialMediaLinks: SocialMediaLinks[];
};

const Details = ({ data, role }: { data: CompanyType, role: "Agency" | "DMC" | "Hotel" }) => {
  const socialPlatforms = [
    "facebook",
    "instagram",
    "linkedin",
    "twitter",
    "youtube",
  ];

  return (
    <div className="mb-10 mt-20">
      {/* <HeroHeading title={data?.name} className="uppercase" /> */}
      <div className="px-2 md:px-3 lg:px-6 xl:px-8">
        <div className="w-full flex xl:gap-12 gap-6 pb-16 border-b-black border-b-[1px]">
          <div className="w-full flex flex-col gap-10 flex-1">
            <div className="grid gap-4">
              {/* Main Image */}
              <div className="relative rounded-lg w-full h-64 md:h-96 lg:h-[450px]">
                <AnimatedImage
                  src={getValidUrl(data?.images[0] ?? "")}
                  alt="main image"
                  fill
                  className="rounded-lg object-cover"
                />
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

            <div className="w-full flex flex-wrap items-center justify-between gap-1">
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
            </div>

            <div className="rounded-md flex lg:hidden flex-col gap-6 py-12 sm:px-8 px-4 shadow shadow-black/50">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="lg:text-[32px] text-2xl font-bold leading-tight sm:leading-6">
                    {data?.name}
                  </h3>
                  <p className="text-sm mt-3 leading-4 font-medium">
                    {`${data?.address}, ${data?.city}.`}
                  </p>
                </div>

                <StarRating
                  color="#734E03"
                  maxRating={5}
                  className="my-4"
                  readOnly={true}
                  size={18}
                  showNumber={true}
                  defaultRating={data?.rating}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-medium text-2xl leading-6">Methodology</h4>
                <p className="text-base leading-[22px] text-justify font-medium">
                  {data?.methodology}
                </p>
              </div>

              <div className="text-2xl leading-6 font-medium">Actions</div>

              <div className="flex gap-1 py-4 w-full flex-grow">
                <EnquireDialog
                  images={data?.images}
                  name={data?.name}
                  className="flex-1 border-black border-[1px] py-3 rounded-full text-xl leading-6 font-medium"
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

            <div className="flex flex-col gap-10 sm:px-0 px-2">
              <div className="flex flex-col gap-2">
                <div className="uppercase md:text-5xl text-3xl md:leading-[64px] leading-10 font-bold">
                  Description
                </div>
                <div className="text-justify text-base leading-6 font-medium">
                  {data?.description}
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              {/* <ReviewSSR name={data?.name} companyId={data?.id} /> */}
            </div>
          </div>

          <div className="flex-1 lg:flex hidden flex-col gap-5 max-w-[509px]">
            <div className="rounded-md lg:flex hidden flex-col xl:gap-10 lg:gap-6 xl:py-16 lg:py-10 xl:px-8 lg:px-4 shadow shadow-black/50">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-[32px] font-bold leading-tight xl:leading-6">
                    {data?.name}
                  </h3>
                  <p className="text-sm mt-3 leading-4 font-medium">
                    {`${data?.address}, ${data?.city}.`}
                  </p>
                </div>

                <StarRating
                  color="#734E03"
                  maxRating={5}
                  className="my-4"
                  readOnly={true}
                  size={18}
                  showNumber={true}
                  defaultRating={data?.rating}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-medium text-2xl leading-6">Methodology</h4>
                <p className="text-base leading-[22px] text-justify font-medium">
                  {data.methodology}
                </p>
              </div>

              <div className="text-2xl leading-6 font-medium">Actions</div>

              <div className="flex gap-1 py-4 w-full flex-grow">
                <EnquireDialog
                  images={data?.images}
                  name={data?.name}
                  className="flex-1 border-black border-[1px] py-3 rounded-full text-xl leading-6 font-medium"
                />
                <ShareButton />
              </div>
            </div>

            <ReviewSSR name={data?.name} companyId={data?.id} role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
