import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,
  });
  export const FOLDER_NAME = "top10travels";
  
export default cloudinary;