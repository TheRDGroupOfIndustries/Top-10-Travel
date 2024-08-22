import AdminReport from "@/components/admin/Main/AdminReport";
import { db } from "@/core/client/db";
import { revalidateTag, unstable_cache } from "next/cache";

const getReportData = unstable_cache(
  async () => {
    const agency = await db.agency.findMany({
      select: {
        name: true,
        reviews: true,
        images: true,
        id: true,
        priority: true,
        country: true,
        city: true,
        city_priority: true,
        rating: true,
        Reviews: true,
      },
      orderBy: { priority: "desc" },
    });
    const dmc = await db.dMC.findMany({
      select: {
        name: true,
        reviews: true,
        images: true,
        id: true,
        priority: true,
        country: true,
        city: true,
        city_priority: true,
        rating: true,
        Reviews: true,
      },
      orderBy: { priority: "desc" },
    });
    const hotel = await db.hotel.findMany({
      select: {
        name: true,
        reviews: true,
        images: true,
        id: true,
        priority: true,
        country: true,
        city: true,
        city_priority: true,
        rating: true,
        Reviews: true,
      },
      orderBy: { priority: "desc" },
    });
    // console.log("called");
    return agency
      .map((a) => ({ ...a, type: "Agency" }))
      .concat(
        dmc.map((d) => ({ ...d, type: "Dmc" })),
        hotel.map((h) => ({ ...h, type: "Hotel" }))
      );
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
