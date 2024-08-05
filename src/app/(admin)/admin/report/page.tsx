import AdminReport from "@/components/admin/Main/AdminReport";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";

const getReportData = unstable_cache(
  async () => {
    return await db.company.findMany({
      select: {
        legalName: true,
        companyRole: true,
        reviews: true,
        image: true,
        id: true,
        priority: true,
        country: true,
        city: true,
        state_priority: true,
        rating: true,
        company_reviews: true,
      },
      orderBy:{priority:"desc"}
    });
  },
  undefined,
  { tags: ["admin-report"], revalidate: 300 }
);
export type ReportData = Awaited<ReturnType<typeof getReportData>>;

const ReportPage = async () => {
  const reportData = await getReportData();

  return <AdminReport report={reportData} />;
};
export default ReportPage;
