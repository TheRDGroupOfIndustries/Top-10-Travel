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

const getEnquiries = async (companyId: string) => {
  return await db.enquiry.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });
};

const CompanyEnquiriesDropdown = async () => {
  const session = await getSessionorRedirect();
  const company = await db.company.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (!company) return notFound();
  const enquiries = await getEnquiries(company.id);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
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
              className="flex w-full flex-col p-2 gap-1 bg-secondary hover:bg:secondary/80"
              key={enq.id}
            >
              <strong className="text-[#FCAE1D] flex flex-col md:flex-row">
                {enq.name}
                <span className="md:ml-2 text-sm font-normal text-muted-foreground">
                  ({enq.email})
                </span>
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
