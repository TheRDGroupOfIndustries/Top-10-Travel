import { db } from "@/core/client/db";
import cloudinary, {
  FOLDER_NAME,
} from "@/core/server/cloudinary/cloudinary_config";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";


export interface CloudinaryUploadResult extends UploadApiResponse {
  url: string;
  public_id: string;
}

export interface AboutContent {
  title: string;
  content: string;
  imageURL?: string;
  imageId?: string;
}

export async function GET() {
  try {
    // Get the first record or create if doesn't exist
    let about = await db.aboutContent.findFirst();

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Check if a record already exists
    let existingContent = await db.aboutContent.findFirst();

    // Check for unique title if creating a new record
    // const titleExists = await db.aboutContent.findFirst({
    //   where: { title },
    // });
    // if (titleExists && (!existingContent || existingContent.id !== titleExists.id)) {
    //   return NextResponse.json(
    //     { error: "A record with this title already exists." },
    //     { status: 400 }
    //   );
    // }

    // Prepare update data
    const updateData: Partial<AboutContent> = { title, content };

    if (image) {
      // Optional: Validate image size/type
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB limit
      if (image.size > maxSizeInBytes) {
        return NextResponse.json(
          { error: "Image size exceeds 5MB limit." },
          { status: 400 }
        );
      }

      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
              folder: `${FOLDER_NAME}/assets`,
              resource_type: "auto",
              allowed_formats: ["jpg", "jpeg", "png", "gif"],
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
          // If there's an existing image, delete it
          if (existingContent && existingContent.imageId) {
            await cloudinary.v2.uploader.destroy(existingContent.imageId);
          }

          // Update image fields
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

    // Update or create the record
    const about = existingContent
      ? await db.aboutContent.update({
          where: { id: existingContent.id },
          data: updateData,
        })
      : await db.aboutContent.create({
          data: updateData as AboutContent,
        });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}

