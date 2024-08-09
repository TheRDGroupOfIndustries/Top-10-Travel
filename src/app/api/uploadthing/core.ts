import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:");
 
      console.log("file url", file.url);
 
    
    }),
} 
export type OurFileRouter = typeof ourFileRouter;