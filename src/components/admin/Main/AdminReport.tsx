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
    company.legalName.toLowerCase().includes(search.toLowerCase())
  );
  const getValidUrl = (url: any) => {
    try {
      const u = new URL(url);
      return u.href;
    } catch (error) {
      return "/UploadImage.jpg";
    }
  };
  return (
    <div className="space-y-6 mt-5">
      <Card>
        <CardHeader>
          <CardTitle>
            Company Report
            <p className="text-sm">
              <span className="font-bold my-4">{filteredReport.length}</span>{" "}
              total listings
            </p>
          </CardTitle>
          <CardDescription>See report for all the companies.</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminReportDownload report={filteredReport} />
        </CardContent>
        <CardContent>
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm focus-visible:ring-none focus-visible:ring-0"
          />
        </CardContent>
      </Card>

      {filteredReport.map((company) => (
        <Card key={company.id}>
          <CardHeader className="flex flex-col sm:flex-row gap-8 md:gap-24 items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="font-bold my-4 text-center sm:text-left">
                {company.legalName}
              </CardTitle>
              <div className="text-sm flex items-center sm:items-start gap-2 flex-wrap mt-4 max-w-sm lg:max-w-lg">
                <Badge>Total reviews: {company.reviews}</Badge>
                <Badge>Rating: {company.rating}</Badge>
                <Badge>Country Priority: {company.priority}</Badge>
                <Badge>City Priority: {company.state_priority}</Badge>
                <Badge>Country : {company.country}</Badge>
                <Badge>City : {company.city}</Badge>
              </div>
            </div>
            <img
              src={getValidUrl(company.image ?? "")}
              width={200}
              height={100}
              alt={company.legalName}
              className="rounded-md object-cover"
            />
          </CardHeader>
          <CardContent>
            <h2>All Reviews:</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Review Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {company.company_reviews.map((review) => (
                  <TableRow key={review.id}>
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
