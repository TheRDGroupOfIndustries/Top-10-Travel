"use client";

import DashboardListingDmc from "@/components/dashboard/DashboardListingDmc";
import DmcDashboard from "@/components/dashboard/dmc/DmcDashboard";

import type { Prisma } from "@prisma/client";
import { useState } from "react";

const DashboardForAdminDmc = ({
  data,
}: {
  data: Prisma.DMCGetPayload<{
    include: {
      socialMediaLinks: true;
      pastProjects: true;
      clientReferences: true;
      keyPersonnel: true;
      Reviews: true;
    };
  }>[];
}) => {
  const [selectedDmc, setSelectedDmc] = useState(data[0]);

  return (
    <>
      <DashboardListingDmc
        listings={data}
        setSelectedDmc={setSelectedDmc}
      />
      <DmcDashboard data={selectedDmc} reviews={selectedDmc.Reviews} />
    </>
  );
};
export default DashboardForAdminDmc;
