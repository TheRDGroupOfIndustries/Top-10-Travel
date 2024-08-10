"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";

export function AdminDashboard({
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
  const chartData = [
    { category: "Users", total: user, link: "/admin/users" },
    { category: "Companies", total: company, link: "/admin/companies" },
    { category: "Influencers", total: influencer, link: "/admin" },
    { category: "Packages", total: packages, link: "/admin" },
    { category: "Helpdesk", total: helpdesk, link: "/admin/helpdesk" },
    { category: "Reviews", total: reviews, link: "/admin/report" },
  ];

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-4 mt-5">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {chartData.map((item) => (
          <Link href={item.link} key={item.category}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.category}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.total}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div> */}

      <Card className="col-span-4 bg-[#F3F3F3]">
        <CardHeader>
          <CardTitle className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#fcaf1e] via-[#fed78f] to-[#fcaf1e]">
            Total Statistics
          </CardTitle>
          <CardDescription className="font-medium text-sm text-[#ca8c18]">
            Overview of key metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mb-5">
          <ChartContainer config={chartConfig} className="w-full h-[65vh] p-0">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="#FCAF1E" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Overall metrics <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Displaying total counts for key categories
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
