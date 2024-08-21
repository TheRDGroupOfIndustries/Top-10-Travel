"use client";
import { Company, Prisma, Reviews } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import InputWithSave from "../reusable/InputWithSaveCompany";
import { Badge } from "../ui/badge";
import Link from "next/link";
import CompanyDataInputwSave from "../reusable/CompanyDataInputwSave";
import UploadCompanyImage from "../dashboard/UploadCompanyImage";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import UploadCompanyImagesCard from "../dashboard/agency/UploadAgencyImagesCard";

const CompanyDashboard = ({
  data,
  reviews,
}: {
  data: Prisma.CompanyGetPayload<{ include: { companyData: true } }>;
  reviews: Reviews[];
}) => {
  return (
    <div className="space-y-4 mt-5">
      <Card className="border-none bg-[#F3F3F3]">
        <CardContent className="w-full pt-6">
          <div className="w-full h-full flex flex-col md:flex-row items-center md:items-start gap-3">
            <UploadCompanyImage image={data.image ?? ""} />
            <div className="w-full h-full flex flex-col ">
              <InputWithSave
                name="legalName"
                value={data.legalName}
                text="Edit Your legalName..."
                className="text-3xl font-bold text-center my-2 "
              />
              <div className="text-lg md:flex-row flex  flex-wrap items-center justify-center md:justify-start  text-gray-950  md:gap-8 gap-5 my-2">
                <InputWithSave
                  name="country"
                  value={data.country}
                  text="Edit Your country..."
                  className="text-medium text-gray-900 "
                />

                <InputWithSave
                  name="state"
                  value={data.state}
                  text="Edit Your state..."
                  className="text-medium text-gray-900"
                />

                <InputWithSave
                  name="city"
                  value={data.city}
                  text="Edit Your city..."
                  className="text-medium text-gray-900"
                />
              </div>
              <div className="flex md:items-start md:justify-start items-center justify-center gap-2 flex-wrap">
                <Badge className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d11]">
                  Role : {data.companyRole}
                </Badge>
                <Badge className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d11]">
                  Priority : {data.state_priority}
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
                {data.isSuspended && (
                  <Badge
                    className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d11]"
                    variant="destructive"
                    title="Create package to get unsuspended."
                  >
                    Suspended
                  </Badge>
                )}
                {!data.isCertified && (
                  <Badge
                    className="font-medium text-[14px] text-[#FCAE1D] rounded-sm bg-[#fcae1d15]"
                    variant="destructive"
                    title="Contact admin to get certified."
                  >
                    <Link href="/company/request">Uncertified</Link>
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
        <CardContent className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-2 p-2 md:p-5">
          <div className="w-full flex flex-col  gap-2">
            <CompanyDataInputwSave
              name="ownerName"
              value={data.companyData?.ownerName}
              text="Edit Owner Name..."
              minLength={5}
            />
            <CompanyDataInputwSave
              name="agencyGroup"
              value={data.companyData?.agencyGroup}
              text="Edit Your AgencyGroup"
              minLength={5}
            />

            <CompanyDataInputwSave
              name="phone"
              value={data.companyData?.phone}
              type="number"
              text="Edit Your Phone..."
            />
            <CompanyDataInputwSave
              name="abta_number"
              value={data.companyData?.abta_number}
              text="Edit Your abta_number"
              type="number"
            />
            <CompanyDataInputwSave
              name="clia_number"
              value={data.companyData?.clia_number}
              text="Edit Your clia_number"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col md:items-center lg:items-center items-start justify-start gap-2">
            <CompanyDataInputwSave
              name="pincode"
              value={data.companyData?.pincode}
              type="number"
              text="Edit Your Pincode..."
            />
            <CompanyDataInputwSave
              name="companyEmail"
              value={data.companyData?.companyEmail}
              text="Edit Your Company Email..."
              type="email"
            />
            <CompanyDataInputwSave
              name="companyContact"
              value={data.companyData?.companyContact}
              text="Edit Your Company Contact..."
              type="number"
            />

            <CompanyDataInputwSave
              name="iata_number"
              value={data.companyData?.iata_number}
              text="Edit Your iata_number"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col item-center justify-start gap-2">
            <CompanyDataInputwSave
              name="ownerContact"
              value={data.companyData?.ownerContact}
              text="Edit Your Owner Contact..."
              type="number"
            />
            <CompanyDataInputwSave
              name="address"
              value={data.companyData?.address}
              text="Edit Your Address"
              minLength={10}
              maxLength={150}
            />

            <CompanyDataInputwSave
              name="tids_number"
              value={data.companyData?.tids_number}
              text="Edit Your tids_number"
              type="number"
            />
            <CompanyDataInputwSave
              name="business_reg_number"
              value={data.companyData?.business_reg_number}
              text="Edit Your business_reg_number"
              type="number"
            />
          </div>
          <CompanyDataInputwSave
            name="description"
            value={data.companyData?.description}
            text="Edit Your Description..."
            minLength={40}
          />
          <CompanyDataInputwSave
            name="socialLinks"
            value={data.companyData?.socialLinks.join(",")}
            text="Edit Your SocialLinks"
            minLength={5}
          />
        </CardContent>
      </Card>
      <UploadCompanyImagesCard
        companyId={data.id}
        images={data.companyData?.images ?? []}
      />
      <Card className="border-none bg-[#F3F3F3] mt-4">
        <CardHeader className="text-2xl font-semibold">
          Top {reviews.length !== 0 ? reviews.length : null} Reviews :
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
export default CompanyDashboard;
