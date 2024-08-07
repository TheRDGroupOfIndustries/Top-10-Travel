import HelpDeskForm from "@/components/companydashboard/helpdesk/HelpdeskForm";
import PreviousHelpdesk from "@/components/companydashboard/helpdesk/PreviousHelpdesk";
import PreviousRequests from "@/components/companydashboard/request/PreviousRequests";
import RequestForm from "@/components/companydashboard/request/RequestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

const RequestPage = async () => {
    const session = await getSessionorRedirect()
    const helpdesks = await db.helpDesk.findMany({where:{userId:session.user.id}})

  return (
    <Tabs
      defaultValue="new"
      className="flex flex-col items-center justify-center h-[calc(100vh-200px)]"
    >
      <TabsList className="w-full max-w-md *:flex-1">
        <TabsTrigger value="new">Create Helpdesk</TabsTrigger>
        <TabsTrigger value="prev">Previous Queries</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full max-w-md" value="new">
        <HelpDeskForm />
      </TabsContent>
      <TabsContent className="w-full max-w-md"  value="prev"><PreviousHelpdesk helpdesks={helpdesks} /></TabsContent>
    </Tabs>
  );
};
export default RequestPage;
