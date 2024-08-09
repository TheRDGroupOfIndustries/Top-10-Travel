import PreviousRequests from "@/components/companydashboard/request/PreviousRequests";
import RequestForm from "@/components/companydashboard/request/RequestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

const RequestPage = async () => {
    const session = await getSessionorRedirect()
    const company = await db.company.findUnique({where:{userId: session.user.id}, select:{id:true}})
    const requests = await db.request.findMany({where:{companyId:company?.id}})

  return (
    <Tabs
      defaultValue="new"
      className="flex flex-col items-center justify-center h-[calc(100vh-200px)]"
    >
      <TabsList className="w-full max-w-md *:flex-1">
        <TabsTrigger value="new">Create Request</TabsTrigger>
        <TabsTrigger value="prev">Previous Requests</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full max-w-md" value="new">
        <RequestForm />
      </TabsContent>
      <TabsContent className="w-full max-w-md"  value="prev"><PreviousRequests requests={requests} /></TabsContent>
    </Tabs>
  );
};
export default RequestPage;
