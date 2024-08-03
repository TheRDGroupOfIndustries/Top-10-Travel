import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function getServersession (){
    return await getServerSession(authOptions)
}