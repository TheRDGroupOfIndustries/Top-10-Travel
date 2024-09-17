"use client";

import AgencyDashboard from "@/components/dashboard/agency/AgencyDashboard";
import DashboardListing from "@/components/dashboard/DashboardListing";

import type { Prisma } from "@prisma/client";
import { useState } from "react";

const DashboardForAdminAgency = ({
  data,
}: {
  data: Prisma.AgencyGetPayload<{
    include: {
      socialMediaLinks: true;
      pastProjects: true;
      clientReferences: true;
      keyPersonnel: true;
      Reviews: true;
    };
  }>[];
  
}) => {
  const [selectedAgency, setSelectedAgency] = useState(data[1]);

  return (
    <>
      <DashboardListing listings={data} type="Agency" setSelectedAgency={setSelectedAgency}  />
      <AgencyDashboard data={selectedAgency} reviews={selectedAgency.Reviews} />
    </>
  );
};
export default DashboardForAdminAgency;
