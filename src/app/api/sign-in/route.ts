import { v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
    const { paramsToSign } = await request.json() as { paramsToSign: Record<string, string> };
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);
    return new Response(JSON.stringify({ signature }));
}