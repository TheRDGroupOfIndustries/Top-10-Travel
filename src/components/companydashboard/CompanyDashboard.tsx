"use client";
import { Company, Reviews } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import Image from "next/image";
import InputWithSave from "../reusable/InputWithSave";
import { Badge } from "../ui/badge";

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
            <Image
              src={data.image!}
              alt={data.legalName}
              width={300}
              height={180}
              className="rounded-md"
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Top {reviews.length} Reviews:</CardHeader>
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
        </CardContent>
      </Card>
    </div>
  );
};
export default CompanyDashboard;
