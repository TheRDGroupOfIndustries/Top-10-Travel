import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Bell } from "lucide-react";
import { notFound } from "next/navigation";

const getEnquiries = async (userId: string) => {
  return await db.enquiry.findMany({
    where: { userId },
    select: {
      user: { select: { username: true, email: true } },
      id: true,
      title: true,
      message: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const CompanyEnquiriesDropdown = async () => {
  const session = await getSessionorRedirect();

  const enquiries = await getEnquiries(session.user.id);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Bell className="w-6 h-6 stroke-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] md:w-[400px] lg:w-[550px] h-[450px] ml-6 sm:ml-0 sm:mr-10 overflow-y-auto space-y-2">
          <DropdownMenuLabel className="text-lg">
            Enquiries ({enquiries.length})
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {enquiries.map((enq) => (
            <div
              className="flex w-full flex-col p-2 gap-1 bg-secondary/60 hover:bg:secondary/80"
              key={enq.id}
            >
              <p className="text-sm font-normal text-muted-foreground">
                Enquiry from <strong>{enq.user.username}</strong> (
                {enq.user.email})
              </p>
              <strong className="text-mainColor flex flex-col md:flex-row">
                {enq.title}
              </strong>
              <p className="break-words text-sm">{enq.message}</p>
            </div>
          ))}
          {enquiries.length === 0 && (
            <DropdownMenuItem>No Enquiries available</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {enquiries.length > 0 ? (
        <div className="absolute  top-0 right-0">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
        </div>
      ) : null}
    </>
  );
};
export default CompanyEnquiriesDropdown;
