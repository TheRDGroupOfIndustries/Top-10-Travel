"use client";
import { Agency, Prisma, Reviews } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Image from "next/image";
import InputWithSave from "./InputWithSaveAgency";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import UploadCompanyImagesCard from "./UploadAgencyImagesCard";
import UpdateSocialMediaLinks from "../updateSocialMediaLinks";
import UpdatePastProjects from "../updatePastProjects";
import UpdateClientReferences from "../updateClientReferences";

const AgencyDashboard = ({
  data,
  reviews,
}: {
  data: Prisma.AgencyGetPayload<{
    include: {
      socialMediaLinks: true;
      pastProjects: true;
      clientReferences: true;
      keyPersonnel: true;
    };
  }>;
  reviews: Reviews[];
}) => {
  return (
    <div className="space-y-4 mt-5">
      <Card className="border-none bg-[#F3F3F3]">
        <CardContent className="w-full pt-6">
          <div className="w-full h-full flex flex-col md:flex-row items-center md:items-start gap-3">
            {/* <UploadCompanyImage image={data.image ?? ""} /> */}
            <div className="w-full h-full flex flex-col ">
              <InputWithSave
                name="name"
                value={data.name}
                hideLabel
                text="Edit Your Agency Name"
                className="text-3xl font-bold text-center my-2 "
              />
              <div className="text-lg md:flex-row flex  flex-wrap items-center justify-center md:justify-start  text-gray-950  md:gap-8 gap-5 my-2">
                <InputWithSave
                  name="country"
                  value={data.country}
                  text="Country"
                  className="text-medium text-gray-900 "
                />

                <InputWithSave
                  name="city"
                  value={data.city}
                  text="City"
                  className="text-medium text-gray-900"
                />
              </div>
              <div className="flex md:items-start md:justify-start items-center justify-center gap-2 flex-wrap">
                <Badge className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d11]">
                  Priority : {data.city_priority}
                </Badge>
                <Badge className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d11]">
                  City Priority : {data.priority}
                </Badge>
                <Badge className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d11]">
                  Ratings : {data.rating}
                </Badge>
                <Badge className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d11]">
                  Total Reviews : {data.reviews}
                </Badge>
                {!data.isCertified && (
                  <Badge
                    className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d15]"
                    variant="destructive"
                    title="Contact admin to get certified."
                  >
                    <Link href="/dashboard/request">Uncertified</Link>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-none bg-[#F3F3F3] px-2 py-4">
        <CardTitle className="text-center text-[25px] md:text-left font-semibold font-sans">
          <span className="text-[#FCAE1D] p-3">Company</span>Details
        </CardTitle>
        <CardContent className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 p-2 md:p-5">
          <div className="w-full flex flex-col gap-2">
            <InputWithSave
              name="contactPerson"
              value={data.contactPerson}
              text="Edit Owner Name"
              minLength={5}
            />
            <InputWithSave
              name="contactEmail"
              value={data.contactEmail}
              text="Edit Contact Email"
              minLength={5}
              type="email"
            />

            <InputWithSave
              name="contactPhoneNumber"
              value={data.contactPhoneNumber}
              type="number"
              text="Edit Contact Phone Number"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <InputWithSave
              name="address"
              value={data.address}
              text="Edit Your Address"
              minLength={10}
              maxLength={150}
            />

            <InputWithSave
              name="country"
              value={data.country}
              text="Edit Your country"
            />
            <InputWithSave
              name="city"
              value={data.city}
              text="Edit Your city"
            />
          </div>
          <div className="w-full flex flex-col item-center justify-start gap-2">
            <InputWithSave
              name="companyRegistrationNumber"
              value={data.companyRegistrationNumber}
              text="Edit Your company Registration Number"
            />
            <InputWithSave
              name="description"
              value={data.description}
              text="Edit Your Description"
              minLength={40}
            />
          </div>
        </CardContent>
      </Card>
      <UploadCompanyImagesCard
        companyId={data.id}
        images={data.images ?? []}
      />
      <UpdateSocialMediaLinks
        links={data.socialMediaLinks[0]}
        socialMediaLinkId={data.socialMediaLinks[0].id}
        info={{ type: "Agency", agencyId: data.id }}
      />
      <UpdatePastProjects
        initProjects={data.pastProjects}
        info={{ type: "Agency", agencyId: data.id }}
      />
      <UpdateClientReferences
        initProjects={data.clientReferences}
        info={{ type: "Agency", agencyId: data.id }}
      />
      <Card className="border-none bg-[#F3F3F3] mt-4">
        <CardHeader className="text-2xl font-semibold">
          <div>
            <span className="text-[#FCAE1D]">Top</span>
            {reviews.length !== 0 ? reviews.length : null} Reviews :
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review.id}>
              <h2 className="text-xl font-bold">
                {review.name}{" "}
                <span className="ml-2">
                  {"★".repeat(Math.round(review.rating))}
                </span>
              </h2>
              <p>{review.review}</p>
            </div>
          ))}
          {reviews.length === 0 && (
            <h2 className="text-lg font-semibold">No Reviews to show.</h2>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default AgencyDashboard;
