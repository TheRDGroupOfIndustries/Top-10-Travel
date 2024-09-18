"use client";

import AgencyDashboard from "@/components/dashboard/agency/AgencyDashboard";
import DashboardListingAgency from "@/components/dashboard/DashboardListingAgency";
import DashboardListing from "@/components/dashboard/DashboardListingAgency";

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
  const [selectedAgency, setSelectedAgency] = useState(data[0]);

  return (
    <>
      <DashboardListingAgency
        listings={data}
        setSelectedAgency={setSelectedAgency}
      />
      <AgencyDashboard data={selectedAgency} reviews={selectedAgency.Reviews} />
    </>
  );
};
export default DashboardForAdminAgency;
