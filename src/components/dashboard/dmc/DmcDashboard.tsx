"use client";
import { Prisma, Reviews } from "@prisma/client";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import UpdateClientReferences from "../updateClientReferences";
import UpdateKeyPersonnel from "../updateKeyPersons";
import UpdatePastProjects from "../updatePastProjects";
import UpdateSocialMediaLinks from "../updateSocialMediaLinks";
import InputWithSave from "./InputWithSaveDmc";
import UploadCompanyImagesCard from "./UploadDmcImagesCard";

const DmcDashboard = ({
  data,
  reviews,
}: {
  data: Prisma.DMCGetPayload<{
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
                id={data.id}
                hideLabel
                text="Edit Your Agency Name"
                className="text-3xl font-bold text-center my-2 "
              />
              <div className="text-lg md:flex-row flex  flex-wrap items-center justify-center md:justify-start  text-gray-950  md:gap-8 gap-5 my-2">
                <InputWithSave
                  name="country"
                  id={data.id}
                  value={data.country}
                  text="Country"
                  className="text-medium text-gray-900 "
                />

                <InputWithSave
                  name="city"
                  id={data.id}
                  value={data.city}
                  text="City"
                  className="text-medium text-gray-900"
                />
              </div>
              <div className="flex md:items-start md:justify-start items-center justify-center gap-2 flex-wrap">
                {/* <Badge className="font-medium text-[14px] text-mainColor rounded-sm bg-slate-700">
                  Priority : {data.city_priority}
                </Badge>
                <Badge className="font-medium text-[14px] text-mainColor rounded-sm bg-slate-700">
                  City Priority : {data.priority}
                </Badge>
                <Badge className="font-medium text-[14px] text-mainColor rounded-sm bg-slate-700">
                  Ratings : {data.rating.toFixed(1)}
                </Badge>
                <Badge className="font-medium text-[14px] text-mainColor rounded-sm bg-slate-700">
                  Total Reviews : {data.reviews}
                </Badge> */}
                {!data.isCertified && (
                  <Badge
                    className="font-medium text-[14px] text-mainColor rounded-sm bg-slate-700"
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
          <span className="text-mainColor p-3">Details</span>
        </CardTitle>
        <CardContent className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 p-2 md:p-5">
          <div className="w-full flex flex-col gap-2">
            <InputWithSave
              name="contactPerson"
              value={data.contactPerson}
              id={data.id}
              text="Edit Owner Name"
              minLength={5}
            />
            <InputWithSave
              name="contactEmail"
              value={data.contactEmail}
              text="Edit Contact Email"
              id={data.id}
              minLength={5}
              type="email"
            />

            <InputWithSave
              name="contactPhoneNumber"
              value={data.contactPhoneNumber}
              id={data.id}
              type="number"
              text="Edit Contact Phone Number"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <InputWithSave
              name="address"
              value={data.address}
              text="Edit Your Address"
              id={data.id}
              minLength={10}
              maxLength={150}
            />

            <InputWithSave
              name="country"
              value={data.country}
              id={data.id}
              text="Edit Your country"
            />
            <InputWithSave
              id={data.id}
              name="city"
              value={data.city}
              text="Edit Your city"
            />
          </div>
          <div className="w-full flex flex-col item-center justify-start gap-2">
            <InputWithSave
              name="companyRegistrationNumber"
              id={data.id}
              value={data.companyRegistrationNumber}
              text="Edit Your company Registration Number"
            />
            <InputWithSave
              name="description"
              value={data.description}
              text="Edit Your Description"
              minLength={40}
              id={data.id}
            />
          </div>
        </CardContent>
      </Card>
      <UploadCompanyImagesCard companyId={data.id} images={data.images ?? []} />
      <UpdateSocialMediaLinks
        links={data.socialMediaLinks[0]}
        socialMediaLinkId={data.socialMediaLinks[0].id}
        info={{ type: "Dmc", dmcId: data.id }}
      />
      <UpdatePastProjects
        initProjects={data.pastProjects}
        info={{ type: "Dmc", dmcId: data.id }}
      />
      <UpdateClientReferences
        initProjects={data.clientReferences}
        info={{ type: "Dmc", dmcId: data.id }}
      />
      <UpdateKeyPersonnel
        initProjects={data.keyPersonnel}
        info={{ type: "Dmc", dmcId: data.id }}
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
export default DmcDashboard;
