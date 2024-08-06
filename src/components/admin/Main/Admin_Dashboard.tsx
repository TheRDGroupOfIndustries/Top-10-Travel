"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function AdminDashboard({ user, company, influencer } : {user:number,company:number,influencer:number}) {
  return (
    <div className="w-full flex flex-col flex-wrap items-start justify-center gap-5 sm:flex-row mt-5">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <Card className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1">
          <CardHeader className="flex flex-col items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <CardDescription>No. of User Registered</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {user}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="flex flex-col lg:max-w-md" x-chunk="charts-02-chunk-1">
          <CardHeader className="flex flex-col items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <CardDescription>No. of Company Registered</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {company}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="flex flex-col lg:max-w-md" x-chunk="charts-03-chunk-1">
          <CardHeader className="flex flex-col items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <CardDescription>No. of Influencer Registered</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {influencer}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
