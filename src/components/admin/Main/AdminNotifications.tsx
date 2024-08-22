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
import { Bell } from "lucide-react";
import { unstable_cache } from "next/cache";
import AdminNotificationButtons from "./AdminNotificationButtons";

const getRequests = unstable_cache(
  async () => {
    return await db.request.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
  },
  undefined,
  { tags: ["admin-requests"], revalidate: 60 }
);

const AdminNotifications = async () => {
  const requests = await getRequests();

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
            Requests ({requests.length})
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {requests.map((req) => (
            <div
              className="flex flex-col p-2 gap-1 bg-secondary hover:bg:secondary/80"
              key={req.id}
            >
              <p><strong>UserId:</strong>{req.userId}</p>
              {req.message}
              <AdminNotificationButtons userId={req.userId} id={req.id} />
            </div>
          ))}
          {requests.length === 0 && (
            <DropdownMenuItem>No Requests pending</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {requests.length > 0 ? (
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
export default AdminNotifications;
