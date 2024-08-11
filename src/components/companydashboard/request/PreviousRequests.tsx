import { Badge } from "@/components/ui/badge";
import { Request } from "@prisma/client";

const PreviousRequests = ({ requests }: { requests: Request[] }) => {
  return (
    <div className="p-2  rounded space-y-2 bg-background">
      {requests.map((request) => (
        <div
          className="border-none bg-[#F3F3F3] p-4 rounded-md"
          key={request.id}
        >
          <p className=" text-base leading-relaxed ">{request.message.slice(17)}</p>
          <Badge
          className="text-sm mt-2 border-[#FCAE1D] border-2 rounded-full"
            variant={
              request.status === "ACCEPTED"
                ? "default"
                : request.status === "REJECTED"
                ? "destructive"
                : "secondary"
            }
          >
            {request.status}
          </Badge>
        </div>
      ))}
      {requests.length===0 && <h2 className="text-lg font-semibold">No Previews requests to show.</h2>}
    </div>
  );
};
export default PreviousRequests;
