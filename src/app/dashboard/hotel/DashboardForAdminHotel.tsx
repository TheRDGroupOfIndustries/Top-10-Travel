"use client";

import DashboardListingHotel from "@/components/dashboard/DashboardListingHotel";
import HotelDashboard from "@/components/dashboard/hotel/HotelDasboard";
import type { Prisma } from "@prisma/client";
import React, { useState } from "react";

const DashboardForAdminHotel = ({
  data,
}: {
  data: Prisma.HotelGetPayload<{
    include: {
      socialMediaLinks: true;
      Reviews: true;
    };
  }>[];
}) => {
  const [selectedHotel, setSelectedHotel] = useState(data[1]);

  return (
    <>
      <DashboardListingHotel listings={data} setSelectedHotel={setSelectedHotel}/>
      <HotelDashboard data={selectedHotel} reviews={selectedHotel.Reviews} />
    </>
  );
};

export default DashboardForAdminHotel;
