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

interface termsContent {
  content: string;
  imageURL?: string;
  imageId?: string;
}

export async function GET() {
  try {
    // Get the first record or create if doesn't exist
    let about = await db.termsContent.findFirst();

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

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const content = formData.get("content") as string;
    const image = formData.get("image") as File;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Check if there's an existing termsContent entry
    let existingContent = await db.termsContent.findFirst();
    const updateData: Partial<termsContent> = { content };

    if (image) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
              folder: `${FOLDER_NAME}/assets`,
              resource_type: "auto",
              allowed_formats: ["jpg", "jpeg", "png", "gif"]
            },
            (error, result) => {
              if (error || !result) {
                reject(error || new Error("No upload result"));
                return;
              }
              resolve(result as CloudinaryUploadResult);
            }
          );
          uploadStream.end(buffer);
        });

        if (result) {
          if (existingContent && existingContent.imageId) {
            // Delete the previous image if it exists
            await cloudinary.v2.uploader.destroy(existingContent.imageId);
          }

          updateData.imageURL = result.url;
          updateData.imageId = result.public_id;
        }
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    if (!updateData.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }
    // Update or create the termsContent record
    const about = existingContent
      ? await db.termsContent.update({
          where: { id: existingContent.id },
          data: updateData
        })
      : await db.termsContent.create({
          data: updateData as termsContent
        });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating terms content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
