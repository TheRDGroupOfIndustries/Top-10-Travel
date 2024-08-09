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
  { title: "No. of User Registered", link: "/admin/users" },
  { title: "No. of Company Registered", link: "/admin/companies" },
  { title: "No. of Influencer Registered", link: "/admin/users" },
  { title: "No. of Packages Created", link: "/admin/companies" },
  { title: "No. of Helpdesk Resolved", link: "/admin/helpdesk" },
  { title: "No. of Reviews Posted", link: "/admin/report" },
];

function AdminDashboard({
  user,
  company,
  influencer,
  packages,
  helpdesk,
  reviews,
}: {
  user: number;
  company: number;
  influencer: number;
  packages: number;
  helpdesk: number;
  reviews: number;
}) {
  const values = [user, company, influencer, packages, helpdesk, reviews];

  return (
    <div className="w-full flex items-start justify-center mt-5">
      <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {dashboardItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className=""
          >
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{item.title}</CardDescription>
                <CardTitle className="text-4xl">{values[index]}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
