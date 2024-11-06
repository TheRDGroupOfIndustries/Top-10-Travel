import { db } from "@/core/client/db";
import { NextResponse } from "next/server";

import cloudinary, {
  FOLDER_NAME,
} from "@/core/server/cloudinary/cloudinary_config";
import { UploadApiResponse } from "cloudinary";

interface CloudinaryUploadResult extends UploadApiResponse {
  url: string;
  public_id: string;
}

interface PrivacyPolicyContent {
  content: string;
  imageURL?: string;
  imageId?: string;
}

export async function GET() {
  try {
    // Get the first record or create if doesn't exist
    let about = await db.privacyPolicyContent.findFirst();

    //   if (!about) {
    //     about = await db.aboutContent.create({
    //       data: {
    //         title: 'Default Title',
    //         content: 'Default about content'
    //       }
    //     })
    //   }

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    
    const formData = await request.formData();

    const content = formData.get("content") as string;
    const image = formData.get("image") as File;

    if (!content) {
      return NextResponse.json(
        { error: " content are required" },
        { status: 400 }
      );
    }

    // if (!(image instanceof File)) {
    //   return NextResponse.json(
    //     { error: "Invalid image format" },
    //     { status: 400 }
    //   );
    // }

    const updateData: PrivacyPolicyContent = {
      content: content as string,
    };


    if (image) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader
            .upload_stream(
              { 
                folder: `${FOLDER_NAME}/assets`,
                resource_type: 'auto',
                allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
              },
              (error, result) => {
                if (error || !result) {
                  reject(error || new Error('No upload result'));
                  return;
                }
                resolve(result as CloudinaryUploadResult);
              }
            );
          
            uploadStream.end(buffer);
          
        });

  

        if (result) {
          const existingContent = await db.privacyPolicyContent.findFirst();
          if (existingContent && existingContent.imageId) {
            await cloudinary.v2.uploader.destroy(existingContent.imageId);
          }

          updateData.imageURL = result.url;
          updateData.imageId = result.public_id;
          console.log("imageURL", result.url);
          console.log("imageId", result.public_id);
        }

        const about = await db.privacyPolicyContent.update({
          where: {
            id: "cm2op82kj0001xyfksqwx4wr2",
          },
          data: updateData
        });

        return NextResponse.json(about);
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }


    const about = await db.privacyPolicyContent.update({
      where: {
        id: "cm2op82kj0001xyfksqwx4wr2",
      },
      data: updateData
    });

    return NextResponse.json(about);
  } catch (error) { 
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
