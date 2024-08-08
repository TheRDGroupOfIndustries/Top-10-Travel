"use client";
import { Company, Reviews } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import Image from "next/image";
import InputWithSave from "../reusable/InputWithSaveCompany";
import { Badge } from "../ui/badge";
import Link from "next/link";

const CompanyDashboard = ({
  data,
  reviews,
}: {
  data: Company;
  reviews: Reviews[];
}) => {
  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <InputWithSave
              name="image"
              value={data.image ?? ""}
              text="Edit your image..."
            />
            <div className="flex flex-col h-[180px] justify-between">
              <InputWithSave
                name="legalName"
                value={data.legalName}
                text="Edit Your legalName..."
                className="text-2xl font-bold text-center"
              />
              <div className="flex items-center justify-center md:justify-start  gap-4">
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
              <div className="flex gap-2 flex-wrap">
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
