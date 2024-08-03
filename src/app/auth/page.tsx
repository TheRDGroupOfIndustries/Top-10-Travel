import GoogleLogin from "@/components/site/auth/GoogleLogin";
import getServerSession from "@/core/utils/getServerSession";
import { redirect } from "next/navigation";

// modified the tailwind css of this
const GetStarted = async ({ searchParams }: { searchParams: any }) => {
  const session = await getServerSession();
  if (session) return redirect("/auth/get-started");
  const error = searchParams.error;

  return (
    <div className="relative h-screen font-sans">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#]"></div>
      <div className="flex items-center justify-center h-full z-30 relative  ">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-[1px] text-center ">
          {error && (
            <strong className="text-xl text-red-500">
              {error} Please Try Again
            </strong>
          )}
          <h2 className="text-2xl font-bold mb-6">Continue using</h2>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};
export default GetStarted;
