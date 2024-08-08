"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const dashboardItems = [
  { title: "No. of User Registered", value: 0, link: "/admin/users" },
  { title: "No. of Company Registered", value: 0, link: "/admin/companies" },
  { title: "No. of Influencer Registered", value: 0, link: " " },
];

function AdminDashboard({
  user,
  company,
  influencer,
}: {
  user: number;
  company: number;
  influencer: number;
}) {
  const values = [user, company, influencer];

  return (
    <div className="w-full flex items-start justify-center  mt-5">
      <div className="w-full grid gap-5 grid-cols-12">
        {dashboardItems.map((item, index) => (
          <Link href={item.link} key={index} className="col-span-12 ">
            <Card
              className="w-full group"
              x-chunk={`charts-0${index + 1}-chunk-1`}
            >
              <CardHeader className="flex flex-row justify-between items-center gap-4 py-10 ">
                <CardDescription className=" md:text-xl text-base group-hover:font-bold transition-all duration-300 ease-in-out">
                  {item.title}
                </CardDescription>
                <CardTitle className=" md:text-3xl text-xl tabular-nums">
                  {values[index]}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
