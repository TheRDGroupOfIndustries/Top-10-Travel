import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { CountUp } from "../Home/Section/GetCertification/certification";
import { useEffect } from "react";

const dashboardData = unstable_cache(
  async () => {
    const [user, agency, influencer, dmc, hotel, helpdesk, reviews, aboutContent] =
      await Promise.all([
        db.user.count(),
        db.agency.count(),
        db.influencerData.count(),
        db.dMC.count(),
        db.hotel.count(),
        db.helpDesk.count({ where: { status: "RESOLVED" } }),
        db.reviews.count(),
        db.aboutContent.findFirst(),
      ]);
    return { user, agency, influencer, dmc, hotel, helpdesk, reviews, aboutContent };
  },
  undefined,
  { tags: ["admin-dashboard"], revalidate: 300 }
);

const AboutusComp = async () => {
  const { user, agency, influencer, dmc, hotel, helpdesk, reviews, aboutContent } =
    await dashboardData();
  return (
    <div className="relative flex flex-col gap-5 lg:gap-5 lg:flex-row justify-between px-6 md:px-12 lg:px-[6%] py-20">
      <div id="toNavigate" className="absolute bottom-44 left-0 h-[0.5px] w-[0.5px]"></div>
      <div className="w-full h-full lg:h-[40rem] flex flex-col gap-8 px-3 py-8 shadow-sm rounded-2xl bg-slate-100">
        <div className="uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-mainColor to-mainColorSecondary font-semibold text-2xl">
          About us
        </div>
        <div className="text-slate-850 font-semibold text-4xl lg:text-5xl">
          {aboutContent?.title}
        </div>
        <div className="text-slate-800 mt-auto xl:text-lg">
          {aboutContent?.content}
        </div>
      </div>

      <div className="w-full h-[40rem] overflow-hidden rounded-2xl shadow-sm bg-slate-100">
        <div className="relative rounded-2xl h-1/2 w-full">
          <Image
            src={aboutContent?.imageURL || ""}
            className="rounded-2xl"
            alt={"travel image"}
            fill
          />
        </div>

        <div className="grid h-1/2 w-full grid-cols-2 gap-4 py-4 px-4">
          <div className="bg-slate-200 flex flex-col p-6 items-center justify-center xs:items-start xs:justify-start rounded-2xl w-full">
            <div className="font-bold text-4xl xs:text-5xl text-slate-850">
              <CountUp target={user} className="font-bold" />
            </div>
            <div className="text-lg xs:text-xl font-semibold text-slate-700">
              Visitors
            </div>
          </div>

          <div className="bg-slate-200 flex flex-col p-6 items-center justify-center xs:items-start xs:justify-start rounded-2xl w-full">
            <div className="font-bold text-4xl xs:text-5xl text-slate-850">
              <CountUp target={agency} className="font-bold" />
            </div>
            <div className="text-lg xs:text-xl font-semibold text-slate-700">
              Agencies
            </div>
          </div>

          <div className="bg-slate-200 flex flex-col p-6 items-center justify-center xs:items-start xs:justify-start rounded-2xl w-full">
            <div className="font-bold text-4xl xs:text-5xl text-slate-850">
              <CountUp target={dmc} className="font-bold" />
            </div>
            <div className="text-lg xs:text-xl font-semibold text-slate-700">
              Dmcs
            </div>
          </div>

          <div className="bg-slate-200 flex flex-col p-6 items-center justify-center xs:items-start xs:justify-start rounded-2xl w-full">
            <div className="font-bold text-4xl xs:text-5xl text-slate-850">
              <CountUp target={hotel} className="font-bold" />
            </div>
            <div className="text-lg xs:text-xl font-semibold text-slate-700">
              Hotels
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutusComp;
