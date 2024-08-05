import EnquireDialog from "@/components/company/EnquireDialogwButton/EnquireDialog";
import HeroHeading from "@/components/reusable/HeroHeading";
import StarRating from "@/components/reusable/StarRating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaInstagram, FaYoutube } from "react-icons/fa6";
import ReviewsComponent from "./ReviewComp";
import ServicesNearbyCarousel from "./ServicesNearbyCarousel";
import { $Enums, Package } from "@prisma/client";
import ReviewSSR from "./ReviewSSR";
import PackagesCarousel from "./PackagesCarousel";
import ShareButton from "@/components/reusable/shareButton";

type CompanyType = {
  reviews: number;
  id: string;
  legalName: string;
  image: string | null;
  country: string;
  state: string;
  companyRole: $Enums.CompanyRole;
  rating: number;
  methodology: string | null;
  city: string;
  companyData: {
    pincode: string;
    description: string | null;
    images: string[];
    address: string;
    phone: string;
    socialLinks: string[];
  } | null;
  packages: Package[];
};

const Details = ({
  data,
  role,
}: {
  data: CompanyType;
  role: "AGENCY" | "HOTEL" | "DMC";
}) => {
  return (
    <div className="mb-10">
      <HeroHeading title={data?.legalName} className="uppercase" />
      <div className="px-2 md:px-3 lg:px-6 xl:px-8">
        <div className="w-full flex xl:gap-12 gap-6 pb-16 border-b-black border-b-[1px]">
          <div className="flex flex-col gap-10 flex-1">
            <div className="grid gap-4">
              {/* Main Image */}
              <div className="relative w-full h-64 md:h-96 lg:h-[450px]">
                <Image
                  className="rounded-lg object-cover"
                  src={data?.image!}
                  alt="main image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Grid of Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-4 sm:gap-4 gap-1">
                {data.companyData?.images.map(
                  (url, ind) =>
                    ind < 4 && (
                      <div
                        key={url + ind}
                        className="relative w-full h-32 sm:h-40"
                      >
                        <Image
                          src={url}
                          className="rounded-lg cursor-pointer object-cover"
                          alt="gallery-image-1"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )
                )}
              </div>
            </div>

            <div className="flex justify-around gap-1">
              <Button
                className="rounded-full flex gap-2 lg:px-6 lg:py-4 md:p-6 p-6"
                variant="outline"
              >
                <FaGoogle size={24} />

                <span className="font-medium sm:inline-block hidden leading-6 text-lg">
                  Google
                </span>
              </Button>
              <Button
                className="rounded-full flex gap-2 lg:px-6 lg:py-4 md:p-6 p-6"
                variant="outline"
              >
                <FaFacebook size={24} />
                <span className="font-medium sm:inline-block hidden leading-6 text-lg">
                  Facebook
                </span>
              </Button>
              <Button
                className="rounded-full flex gap-2 lg:px-6 lg:py-4 md:p-6 p-6"
                variant="outline"
              >
                <FaInstagram size={24} />
                <span className="font-medium sm:inline-block hidden leading-6 text-lg">
                  Instagram
                </span>
              </Button>
              <Button
                className="rounded-full flex gap-2 lg:px-6 lg:py-4 md:p-6 p-6"
                variant="outline"
              >
                <FaYoutube size={24} />
                <span className="font-medium sm:inline-block hidden leading-6 text-lg">
                  Youtube
                </span>
              </Button>
            </div>

            <div className="rounded-2xl flex lg:hidden flex-col gap-6 py-12 sm:px-8 px-4 border-[1px] border-black">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-[32px] font-bold leading-tight sm:leading-6">
                    {data?.legalName}
                  </h3>
                  <p className="text-sm mt-3 leading-4 font-medium">
                    {`${data?.companyData?.address}, ${data?.city}, Pin-${data?.companyData?.pincode}.`}
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
                  name={data?.legalName}
                  className="flex-1 border-black border-[1px] py-3 rounded-full text-xl leading-6 font-medium"
                />

               <ShareButton/>
              </div>
            </div>

            <div className="h-[250px] cursor-pointer lg:hidden rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                className="object-cover"
                alt="Hotel room image"
              />
              <div className="absolute inset-0 bg-black/80 opacity-50"></div>
              <div className="w-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[47px]">
                <Image
                  src="/YouTubeIcon.png"
                  layout="fill"
                  className="object-center"
                  alt="Hotel room image"
                />
              </div>
            </div>

            <div className="flex flex-col gap-10 sm:px-0 px-2">
              <div className="flex flex-col gap-2">
                <div className="uppercase md:text-5xl text-3xl md:leading-[64px] leading-10 font-bold">
                  Description
                </div>
                <div className="text-justify text-base leading-6 font-medium">
                  {data?.companyData?.description}
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              <ReviewSSR name={data?.legalName} companyId={data?.id} />
            </div>
          </div>

          <div className="flex-1 lg:flex hidden flex-col gap-5 max-w-[509px]">
            <div className="rounded-2xl lg:flex hidden flex-col xl:gap-10 lg:gap-6 xl:py-16 lg:py-10 px-8 border-[1px] border-black">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-[32px] font-bold leading-tight xl:leading-6">
                    {data?.legalName}
                  </h3>
                  <p className="text-sm mt-3 leading-4 font-medium">
                    {`${data?.companyData?.address}, ${data?.city}, Pin-${data?.companyData?.pincode}.`}
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
                  name={data?.legalName}
                  className="flex-1 border-black border-[1px] py-3 rounded-full text-xl leading-6 font-medium"
                />
               <ShareButton/>
              </div>
            </div>

            <div className="h-[170px] cursor-pointer rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                className="object-cover"
                alt="Hotel room image"
              />
              <div className="absolute inset-0 bg-black/80 opacity-50"></div>
              <div className="w-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[47px]">
                <Image
                  src="/YouTubeIcon.png"
                  layout="fill"
                  className="object-center"
                  alt="Hotel room image"
                />
              </div>
            </div>

            <ReviewSSR name={data?.legalName} companyId={data?.id} />
          </div>
        </div>
      </div>
      <HeroHeading title="Packages" className="uppercase" />
      <PackagesCarousel packages={data.packages} />
    </div>
  );
};

export default Details;
