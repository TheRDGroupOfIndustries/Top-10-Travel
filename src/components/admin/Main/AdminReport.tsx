"use client";
import { useState } from "react";
import { ReportData } from "@/app/(admin)/admin/report/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import AdminReportDownload from "./AdminReportDownload";
import { Input } from "@/components/ui/input";

const AdminReport = ({ report }: { report: ReportData }) => {
  const [search, setSearch] = useState("");

  // Filter report data based on search input
  const filteredReport = report.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const getValidUrl = (url: string) => {
    if (url.startsWith("/")) return url;
    try {
      const u = new URL(url);
      return u.href;
    } catch (error) {
      return "/UploadImage.jpg";
    }
  };

  return (
    <div className="space-y-6 mt-5">
      <Card className="bg-[#f3f3f3]">
        <CardHeader>
          <CardTitle className="lg:text-3xl md:text-2xl text-xl font-semibold">
            <p>
              Company <span className="text-[#fcaf1e]">Report</span>
            </p>
            <p className="md:text-base text-sm mt-1">
              <span className="font-bold my-4">{filteredReport.length}</span>{" "}
              total listings
            </p>
          </CardTitle>
          <CardDescription className="font-medium text-sm text-[#36454F]">
            See report for all the companies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminReportDownload report={filteredReport} />
        </CardContent>
        <CardContent>
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm focus-visible:ring-none focus-visible:ring-0 bg-[#fbfbfb]"
          />
        </CardContent>
      </Card>

      {filteredReport.map((company) => (
        <Card
          key={company.id}
          className="bg-[#f3f3f3]"
        >
          <CardHeader className="flex flex-col sm:flex-row gap-8 md:gap-24 items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="font-bold my-4 text-center sm:text-left">
                {company.name} ({company.type})
              </CardTitle>
              <div className="text-sm flex items-center sm:items-start gap-2 flex-wrap mt-4 max-w-sm lg:max-w-lg">
                <Badge className="text-[#FCAE1D] font-semibold bg-[#fcae1d11]">
                  Total reviews: {company.reviews}
                </Badge>
                <Badge className="text-[#FCAE1D] font-semibold bg-[#fcae1d11]">
                  Rating: {company.rating}
                </Badge>
                <Badge className="text-[#FCAE1D] font-semibold bg-[#fcae1d11]">
                  Country Priority: {company.priority}
                </Badge>
                <Badge className="text-[#FCAE1D] font-semibold bg-[#fcae1d11]">
                  City Priority: {company.city_priority}
                </Badge>
                <Badge className="text-[#FCAE1D] font-semibold bg-[#fcae1d11]">
                  Country : {company.country}
                </Badge>
                <Badge className="text-[#FCAE1D] font-semibold bg-[#fcae1d11]">
                  City : {company.city}
                </Badge>
              </div>
            </div>
            <Image
              src={getValidUrl(company.images[0] ?? "")}
              width={200}
              height={100}
              alt={company.name}
              className="rounded-md object-cover"
            />
          </CardHeader>
          <CardContent>
            <h2 className="mb-1">All Reviews:</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#c2c2c2] hover:bg-[#c2c2c2] text-white">
                  <TableHead className="text-white">Review Id</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Review</TableHead>
                  <TableHead className="text-white">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {company.Reviews.map((review) => (
                  <TableRow
                    key={review.id}
                    className="hover:bg-[#dbdbdb]"
                  >
                    <TableCell>{review.id}</TableCell>
                    <TableCell>{review.name}</TableCell>
                    <TableCell className="min-w-[200px] md:w-[300px]">
                      {review.review}
                    </TableCell>
                    <TableCell>
                      {review.createdAt &&
                        new Date(review.createdAt).toDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminReport;
