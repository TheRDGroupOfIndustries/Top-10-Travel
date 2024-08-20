import AgencyForm from "@/components/agency/AgencyForm"
import { db } from "@/core/client/db"
import getSessionorRedirect from "@/core/utils/getSessionorRedirect"
import { redirect } from "next/navigation"

const AgencyLoginPage = async() => {
  const session = await getSessionorRedirect()
  const agency = await db.agency.findUnique({where:{userId:session.user.id}, select:{id:true}})
  if(agency) return redirect(`/dashboard/agency`)
  return (
    <AgencyForm />
  )
}
export default AgencyLoginPage