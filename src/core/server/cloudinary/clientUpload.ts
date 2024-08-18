"use server"
import getSessionorRedirect from "@/core/utils/getSessionorRedirect"
import cloudinary from "./cloudinary_config"

export async function getSignature() {
    const session = await getSessionorRedirect();

    const timestamp = Math.round(new Date().getTime() / 1000)
  
    const signature = cloudinary.v2.utils.api_sign_request(
      { timestamp, folder: 'next' },
      process.env.API_SECRET!
    )
  
    return { timestamp, signature }
  }
  
  export async function saveToDatabase({ public_id, version, signature }:any) {
    // verify the data
    const session = await getSessionorRedirect();

    const expectedSignature = cloudinary.v2.utils.api_sign_request(
      { public_id, version },
      process.env.API_SECRET!
    )
  
    if (expectedSignature === signature) {
      // safe to write to database
      console.log({ public_id })
    }
  }