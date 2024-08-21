import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getServersession from "@/core/utils/getServerSession";
import { ThemeButton } from "@/components/reusable/ThemeButton";
import BreadcrumbLinks from "../admin/Breadcrumb/BreadcrumbLinks";
import SmallScreenSidebar from "../reusable/SmallScreenSidebar";
import CompanyEnquiries from "./CompanyEnquiries";

async function CompanyHeader() {
  const session = await getServersession();
  return (
    <div className="w-full lg:px-4 px-2 py-1 bg-white rounded-lg sticky text-[#7F7F7F] z-50 top-0">
      <div className="w-full lg:h-14 flex flex-col sm:flex-row lg:items-center items-start justify-between gap-3">
        <div className="pt-2 flex items-center md:gap-4 gap-2 lg:pt-0">
          <SmallScreenSidebar />
          <BreadcrumbLinks />
        </div>
        <div className="flex flex-row-reverse lg:flex-row items-center lg:justify-center justify-between gap-3">
          <div className="relative cursor-pointer">
            <CompanyEnquiries />
          </div>
          <div className="flex items-center justify-center gap-1">
            <Avatar className="w-9 h-9">
              <AvatarImage src={session?.user.image} />
              <AvatarFallback>
                {session?.user?.name
                  .split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <span className="text-[15px] font-medium text-black ">
                {session?.user.name}
              </span>
              <span className="text-[11px]  text-[#00000070] font-light">
                {session?.user.role}
              </span>
            </div>
          </div>
          {/* <ThemeButton /> */}
        </div>
      </div>
    </div>
  );
}

export default CompanyHeader;
