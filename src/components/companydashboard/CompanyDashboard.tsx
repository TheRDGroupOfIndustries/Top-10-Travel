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

const CompanyDashboard = ({
  data,
  reviews,
}: {
  data: Prisma.CompanyGetPayload<{ include: { companyData: true } }>;
  reviews: Reviews[];
}) => {
  return (
    <div className="space-y-4 mt-5">
      <Card>
        <CardContent className="w-full pt-6">
          <div className="w-full h-full flex flex-col md:flex-row items-center md:items-start gap-4">
            <InputWithSave
              name="image"
              value={data.image ?? ""}
              text="Edit your image..."
            />
            <div className="w-full h-full flex flex-col md:gap-12 gap-6">
              <InputWithSave
                name="legalName"
                value={data.legalName}
                text="Edit Your legalName..."
                className="text-3xl font-bold text-center"
              />
              <div className="text-lg md:flex-row flex  flex-wrap items-center justify-center md:justify-start  md:gap-8 gap-5">
                <InputWithSave
                  name="country"
                  value={data.country}
                  text="Edit Your country..."
                />

                <InputWithSave
                  name="state"
                  value={data.state}
                  text="Edit Your state..."
                />

                <InputWithSave
                  name="city"
                  value={data.city}
                  text="Edit Your city..."
                />
              </div>
              <div className="flex md:items-start md:justify-start items-center justify-center gap-2 flex-wrap">
                <Badge className="text-base">Role : {data.companyRole}</Badge>
                <Badge className="text-base">
                  Priority : {data.state_priority}
                </Badge>
                <Badge className="text-base">
                  City Priority : {data.priority}
                </Badge>
                <Badge className="text-base">Ratings : {data.rating}</Badge>
                <Badge className="text-base">
                  Total Reviews : {data.reviews}
                </Badge>
                {data.isSuspended && (
                  <Badge
                    className="text-base"
                    variant="destructive"
                    title="Create package to get unsuspended."
                  >
                    Suspended
                  </Badge>
                )}
                {!data.isCertified && (
                  <Badge
                    className="text-base"
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
      <Card>
        <CardHeader>
          <CardTitle className="text-center md:text-left font-bold">
            Company Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 p-1 md:p-5">
          <div className="flex flex-wrap items-start gap-4 *:min-w-[200px] *:w-full *:md:w-auto">
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
              name="description"
              value={data.companyData?.description}
              text="Edit Your Description..."
              minLength={40}
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
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader className="text-lg font-semibold">
          Top {reviews.length} Reviews:
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
