import { db } from "@/core/client/db";
import getServerSession from "@/core/utils/getServerSession";
import Link from "next/link";
import { redirect } from "next/navigation";
// modified the tailwind css of this
import { FaPersonHiking } from "react-icons/fa6";

const GetStarted = async () => {
  const session = await getServerSession();
  if (!session) return redirect("/auth");
  // const alreadyhaveCompany = await db.company.findUnique({
  //   where: { userId: session.user.id },
  // });

  // // if already have commpany redirect to company dashboard
  // if (alreadyhaveCompany) return redirect("/company");

  return (
    <div className="relative h-screen font-sans">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#FCAF1E]"></div>
      <div className="flex items-center justify-center h-full z-30 relative  ">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-[1px] text-center ">
          <h2 className="text-2xl font-bold mb-6">Continue using</h2>
          <Link href="company">
            <button className="w-full md:lg:w-[30vw] bg-[#FFEBB8]  rounded-xl p-3 flex items-center justify-left mb-2">
              <span className="mr-2">🏢</span>
              Continue as company
            </button>
          </Link>
          <Link href="influencer">
            <button className="w-full md:lg:w-[30vw] bg-[#FFEBB8]  rounded-xl p-3 flex items-center justify-left mb-2">
              <span className="mr-2">
                <FaPersonHiking />
              </span>
              Continue as Influencer
            </button>
          </Link>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-900"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-900">or</span>
            </div>
          </div>
          <Link href="/">
            <button className=" font-bold w-full bg-white border border-[#FCAF1E] rounded-xl p-3 flex items-center text-[#FCAF1E] justify-left">
              <span className="mr-2">➡️</span>
              Skip
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default GetStarted;
