import { Badge } from "@/components/ui/badge";
import { HelpDesk, Request } from "@prisma/client";

const PreviousHelpdesk = ({ helpdesks }: { helpdesks: HelpDesk[] }) => {
  return (
    <div className="p-2  rounded space-y-2 bg-background">
      {helpdesks.map((helpdesk) => (
        <div
          className="bg-[#F3F3F3] p-4 rounded-md"
          key={helpdesk.id}
        >
          <h3 className="font-semibold text-lg">{helpdesk.title}</h3>
          {helpdesk.status === "RESOLVED" && (
            <>
              <p className="text-[#FCAE1D]">Description:</p>
              <p className="text-foreground/80  ">{helpdesk.description}</p>
            </>
          )}
          <Badge
            className="text-sm mt-2 border-[#FCAE1D] border-2 rounded-full"
            variant={helpdesk.status === "PENDING" ? "default" : "secondary"}
          >
            {helpdesk.status}
          </Badge>
        </div>
      ))}
      {helpdesks.length === 0 && (
        <h2 className="text-lg font-semibold">
          No Previews helpdesks to show.
        </h2>
      )}
    </div>
  );
};
export default PreviousHelpdesk;
