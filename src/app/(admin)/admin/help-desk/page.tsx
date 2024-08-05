import HelpDeskDashboard from "@/components/admin/Main/Admin_HelpDesk";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";

const getTickets = unstable_cache(
  async () => {
    const allTickets = await db.helpDesk.findMany();
    let resolved = 0,
      pending = 0;
    allTickets.forEach((ticket) => {
      if (ticket.status === "RESOLVED") resolved++;
      else pending++;
    });
    return { tickets: allTickets, resolved, pending };
  },
  undefined,
  { tags: ["admin-helpdesk"] }
);

async function Page() {
  const { tickets, resolved, pending } = await getTickets();
  return (
    <HelpDeskDashboard
      initialTickets={tickets}
      pending={pending}
      resolved={resolved}
    />
  );
}

export default Page;
