import { Badge } from "@/components/ui/badge";
import { Request } from "@prisma/client";

const PreviousRequests = ({ requests }: { requests: Request[] }) => {
  return (
    <div className="p-2 border rounded space-y-2">
      {requests.map((request) => (
        <div
          className="border p-4 rounded-md"
          key={request.id}
        >
          <h3>{request.message}</h3>
          <Badge
          className="text-sm mt-2"
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
