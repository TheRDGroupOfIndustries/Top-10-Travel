import Link from "next/link";
// modified the tailwind css of this
import { FaPersonHiking } from "react-icons/fa6";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineHotel, MdOutlineTravelExplore } from "react-icons/md";

const GetStarted = async () => {
  return (
    <div className="relative h-screen font-sans">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-mainColor"></div>
      <div className="flex items-center justify-center h-full z-30 relative  ">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-[1px] text-center ">
          <h2 className="text-2xl font-bold mb-6">Continue using</h2>
          <Link href="agency">
            <button className="w-full md:lg:w-[30vw] bg-mainColor hover:bg-mainColorSecondary transition-colors rounded-xl p-3 flex items-center justify-left mb-2">
              <span className="mr-2">
                <MdOutlineTravelExplore className="text-2xl" />
              </span>
              Continue as Agency
            </button>
          </Link>
          <Link href="dmc">
            <button className="w-full md:lg:w-[30vw] bg-mainColor hover:bg-mainColorSecondary transition-colors rounded-xl p-3 flex items-center justify-left mb-2">
              <span className="mr-2">
                <FaRegMap className="text-2xl" />
              </span>
              Continue as DMC
            </button>
          </Link>
          <Link href="hotel">
            <button className="w-full md:lg:w-[30vw] bg-mainColor hover:bg-mainColorSecondary transition-colors rounded-xl p-3 flex items-center justify-left mb-2">
              <span className="mr-2">
                <MdOutlineHotel className="text-2xl" />
              </span>
              Continue as Hotel
            </button>
          </Link>
          <Link href="influencer">
            <button className="w-full md:lg:w-[30vw] bg-mainColor hover:bg-mainColorSecondary transition-colors rounded-xl p-3 flex items-center justify-left mb-2">
              <span className="mr-2">
                <FaPersonHiking className="text-2xl" />
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
            <button className=" font-bold w-full bg-white border border-mainColor rounded-xl p-3 flex items-center text-mainColor justify-left">
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
