import HelpDeskForm from "@/components/companydashboard/helpdesk/HelpdeskForm";
import PreviousHelpdesk from "@/components/companydashboard/helpdesk/PreviousHelpdesk";
import PreviousRequests from "@/components/companydashboard/request/PreviousRequests";
import RequestForm from "@/components/companydashboard/request/RequestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

const RequestPage = async () => {
  const session = await getSessionorRedirect();
  const helpdesks = await db.helpDesk.findMany({
    where: { userId: session.user.id },
  });

  return (
    <Tabs
      defaultValue="new"
      className="flex mt-5 flex-col items-center justify-start min-h-[80%]"
    >
      <TabsList className="w-full *:flex-1">
        <TabsTrigger value="new">Create Helpdesk</TabsTrigger>
        <TabsTrigger value="prev">Previous Queries</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="new">
        <HelpDeskForm />
      </TabsContent>
      <TabsContent className="w-full" value="prev">
        <PreviousHelpdesk helpdesks={helpdesks} />
      </TabsContent>
    </Tabs>
  );
};
export default RequestPage;
