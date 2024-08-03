import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BreadcrumbLinks from "../Breadcrumb/BreadcrumbLinks";

function AdminHeader() {
  return (
    <div className="w-full lg:px-2">
      <div className="w-full lg:h-14 flex flex-col lg:flex-row lg:items-center items-start justify-between gap-3 border border-black">
        <div className="pt-2 lg:pt-0">
          <BreadcrumbLinks />
        </div>
        <div className="flex flex-row-reverse lg:flex-row items-center lg:justify-center justify-between gap-3">
          <div className=" relative cursor-pointer">
            <Bell className="w-6 h-6 stroke-black" />
            <div className="absolute  top-0 right-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <span className="text-[13px] font-semibold">Saksham Kamboj</span>
              <span className="text-[11px] text-black/70">Owner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
