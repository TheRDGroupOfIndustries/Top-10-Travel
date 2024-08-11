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
    <div>
   <div className="relative">
  <h1 className="relative z-10 font-bold text-center text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-[#FCAE1D] to-[#F3F3F3]">
    Help-desk
  </h1>
  <div className="absolute inset-0 z-50 mx-auto p-[2vh] rounded-full w-[70px] h-[10vh] bg-[#FCAE1D] blur-2xl opacity-70 "></div>
</div>


        <Tabs
      defaultValue="new"
      className="flex mt-5 flex-col items-center justify-start min-h-[80%]"
    >
      <TabsList className="w-full *:flex-1 bg-[#F3F3F3]">
        <TabsTrigger className="" value="new">Create Helpdesk</TabsTrigger>
        <TabsTrigger value="prev">Previous Queries</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="new">
        <HelpDeskForm />
      </TabsContent>
      <TabsContent className="w-full" value="prev">
        <PreviousHelpdesk helpdesks={helpdesks} />
      </TabsContent>
    </Tabs>
    </div>
  
  );
};
export default RequestPage;
