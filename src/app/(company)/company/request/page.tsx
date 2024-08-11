import PreviousRequests from "@/components/companydashboard/request/PreviousRequests";
import RequestForm from "@/components/companydashboard/request/RequestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

const RequestPage = async () => {
  const session = await getSessionorRedirect();
  const company = await db.company.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  const requests = await db.request.findMany({
    where: { companyId: company?.id },
  });

  return (
    <div>
       <div className="relative">
  <h1 className="relative z-10 font-bold text-center text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-[#FCAE1D] to-[#F3F3F3]">
    Request 
  </h1>
  <div className="absolute inset-0 z-50 mx-auto p-[2vh] rounded-full w-[70px] h-[10vh] bg-[#FCAE1D] blur-2xl opacity-70 "></div>
</div>
<Tabs
      defaultValue="new"
      className="flex flex-col items-center justify-start mt-5 min-h-[80%] "
    >
      <TabsList className="w-full *:flex-1 bg-[#F3F3F3]">
        <TabsTrigger value="new">Create Request</TabsTrigger>
        <TabsTrigger value="prev">Previous Requests</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="new">
        <RequestForm />
      </TabsContent>
      <TabsContent className="w-full" value="prev">
        <PreviousRequests requests={requests} />
      </TabsContent>
    </Tabs>
    </div>
   
  );
};
export default RequestPage;
